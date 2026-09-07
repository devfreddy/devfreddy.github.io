import { useMemo, useState } from 'react'
import './instrument.css'
import './tail-latency.css'

// Monte Carlo, seeded. A fixed seed matters more than it sounds: without it
// every slider tick reshuffles the noise and you can't tell a real change
// from sampling jitter.
// A drag re-runs the whole simulation on every input event, so the work has to
// stay inside a frame. Total draws are capped rather than the trial count, and
// the seed is fixed: without it every tick reshuffles the noise and you can't
// tell a real change from sampling jitter.
const MAX_TRIALS = 20000
const DRAW_BUDGET = 400_000
const Z99 = 2.3263478740408408
const SEED = 0x9e3779b9

const trialsFor = (n: number) =>
  Math.max(5000, Math.min(MAX_TRIALS, Math.round(DRAW_BUDGET / n)))

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Box-Muller produces two normals per sqrt/log/cos. Keeping the second one
// halves the transcendental cost, which is most of the run time here.
function makeGaussian(rnd: () => number) {
  let spare: number | null = null
  return () => {
    if (spare !== null) {
      const s = spare
      spare = null
      return s
    }
    const u = 1 - rnd() // u must not be 0 or the log blows up
    const angle = 2 * Math.PI * rnd()
    const r = Math.sqrt(-2 * Math.log(u))
    spare = r * Math.sin(angle)
    return r * Math.cos(angle)
  }
}

type Mode = 'parallel' | 'sequential'

interface Result {
  sorted: Float64Array
  trials: number
  p50: number
  p95: number
  p99: number
  overSingleP99: number
}

// Latency of one call is lognormal, pinned to the p50 and p99 you give it.
// Real service latency isn't exactly lognormal, but it has the property that
// matters here: a long right tail that a mean can't see.
function simulate(n: number, p50: number, p99: number, mode: Mode): Result {
  const sigma = Math.log(p99 / p50) / Z99
  const trials = trialsFor(n)
  const rnd = mulberry32(SEED)
  const gauss = makeGaussian(rnd)
  const out = new Float64Array(trials)
  let over = 0

  for (let i = 0; i < trials; i++) {
    let agg: number
    if (mode === 'parallel') {
      // exp is monotonic, so the slowest of N lognormal calls is the lognormal
      // of the largest normal draw. One exp per request instead of one per call.
      let z = -Infinity
      for (let k = 0; k < n; k++) {
        const g = gauss()
        if (g > z) z = g
      }
      agg = p50 * Math.exp(sigma * z)
    } else {
      agg = 0
      for (let k = 0; k < n; k++) agg += p50 * Math.exp(sigma * gauss())
    }
    out[i] = agg
    if (agg > p99) over++
  }

  out.sort()
  const q = (p: number) => out[Math.min(trials - 1, Math.floor(p * trials))]
  return {
    sorted: out,
    trials,
    p50: q(0.5),
    p95: q(0.95),
    p99: q(0.99),
    overSingleP99: over / trials,
  }
}

const BINS = 44

function histogram(sorted: Float64Array, max: number) {
  const counts = new Array<number>(BINS).fill(0)
  for (let i = 0; i < sorted.length; i++) {
    const b = Math.min(BINS - 1, Math.floor((sorted[i] / max) * BINS))
    if (b >= 0) counts[b]++
  }
  const peak = Math.max(...counts, 1)
  return { counts, peak }
}

const ms = (n: number) => (n >= 100 ? Math.round(n).toLocaleString() : n.toFixed(1)) + 'ms'
const pct = (n: number) => (n * 100 < 10 ? (n * 100).toFixed(1) : Math.round(n * 100)) + '%'

export default function TailLatency() {
  const [n, setN] = useState(20)
  const [p50, setP50] = useState(40)
  const [tail, setTail] = useState(10)
  const [mode, setMode] = useState<Mode>('parallel')

  const singleP99 = p50 * tail
  const res = useMemo(() => simulate(n, p50, singleP99, mode), [n, p50, singleP99, mode])

  // The whole point of the toy, and it needs no simulation: if each call
  // independently has a 1-in-100 chance of exceeding its own p99, then the
  // odds that none of N do is 0.99^N.
  const analytic = 1 - Math.pow(0.99, n)

  const scaleMax = res.sorted[Math.min(res.trials - 1, Math.floor(0.995 * res.trials))]
  const { counts, peak } = useMemo(() => histogram(res.sorted, scaleMax), [res, scaleMax])
  const markerLeft = Math.min(100, (singleP99 / scaleMax) * 100)

  return (
    <div className="ins">
      <div className="ins__controls">
        <label className="ins__field">
          <span className="ins__label">
            Calls per request <span className="ins__value">{n}</span>
          </span>
          <input
            type="range"
            min="1"
            max="60"
            value={n}
            onChange={(e) => setN(Number(e.currentTarget.value))}
          />
        </label>

        <label className="ins__field">
          <span className="ins__label">
            Median call <span className="ins__value">{p50}ms</span>
          </span>
          <input
            type="range"
            min="5"
            max="400"
            step="5"
            value={p50}
            onChange={(e) => setP50(Number(e.currentTarget.value))}
          />
        </label>

        <label className="ins__field">
          <span className="ins__label">
            Tail weight <span className="ins__value">p99 = {tail}x p50</span>
          </span>
          <input
            type="range"
            min="2"
            max="40"
            value={tail}
            onChange={(e) => setTail(Number(e.currentTarget.value))}
          />
        </label>

        <div className="ins__field">
          <span className="ins__label">Shape</span>
          <div className="ins__seg">
            <button
              type="button"
              aria-pressed={mode === 'parallel'}
              onClick={() => setMode('parallel')}
            >
              Fan-out
            </button>
            <button
              type="button"
              aria-pressed={mode === 'sequential'}
              onClick={() => setMode('sequential')}
            >
              Chain
            </button>
          </div>
        </div>
      </div>

      <dl className="ins__readout">
        <div className="ins__stat">
          <dt>One call, p99</dt>
          <dd>{ms(singleP99)}</dd>
        </div>
        <div className="ins__stat ins__stat--hot">
          <dt>Request p99</dt>
          <dd>
            {ms(res.p99)}
            <small>{(res.p99 / singleP99).toFixed(1)}x one call</small>
          </dd>
        </div>
        <div className="ins__stat">
          <dt>Request p50</dt>
          <dd>{ms(res.p50)}</dd>
        </div>
        <div className="ins__stat ins__stat--hot">
          <dt>Slower than one call's p99</dt>
          <dd>
            {pct(res.overSingleP99)}
            {mode === 'parallel' && <small>1 &minus; 0.99^{n} = {pct(analytic)}</small>}
          </dd>
        </div>
      </dl>

      <div className="ins__body">
        <div className="tl__chart" role="img" aria-label={`Distribution of request latency. Median ${ms(res.p50)}, 99th percentile ${ms(res.p99)}.`}>
          <div className="tl__bars">
            {counts.map((c, i) => (
              <span
                key={i}
                className={'tl__bar' + (((i + 0.5) / BINS) * scaleMax > singleP99 ? ' is-hot' : '')}
                style={{ height: Math.max((c / peak) * 100, c > 0 ? 1.5 : 0) + '%' }}
              />
            ))}
          </div>
          <div className="tl__marker" style={{ left: markerLeft + '%' }}>
            <span className="tl__marker-label">one call p99</span>
          </div>
          <div className="tl__axis">
            <span>0</span>
            <span>{ms(scaleMax / 2)}</span>
            <span>{ms(scaleMax)}</span>
          </div>
        </div>
      </div>

      <p className="ins__note">
        Every request the site serves is one draw from this distribution.
        {mode === 'parallel'
          ? ' A fan-out request is only as fast as its slowest call, so the tail of one call becomes the body of the request.'
          : ' A chain adds latencies, so the tail averages out but the median climbs with every step.'}
      </p>
    </div>
  )
}
