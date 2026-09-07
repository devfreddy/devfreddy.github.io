import { useMemo, useState } from 'react'
import './instrument.css'
import './agent-cost.css'

// An agent loop re-sends its whole context every step. That single fact is
// what makes cost grow with the square of the step count, and it's the thing
// people are surprised by after their first month of invoices.

interface Inputs {
  steps: number
  prefix: number
  toolTokens: number
  outTokens: number
  priceIn: number
  priceOut: number
}

const WRITE_MULT = 1.25
const READ_MULT = 0.1

function model(v: Inputs) {
  const { steps: n, prefix: p, toolTokens, outTokens, priceIn, priceOut } = v
  const grow = toolTokens + outTokens

  // Tokens sent as input on step i (1-indexed): the prefix plus everything
  // the loop has said and read so far.
  const ctx = (i: number) => p + (i - 1) * grow

  const totalIn = n * p + (grow * n * (n - 1)) / 2
  const totalOut = n * outTokens

  const cost = (tin: number, tout: number) => (tin * priceIn + tout * priceOut) / 1e6

  // What a step already sent is a cache hit; only the delta is new.
  const fresh = p + (n - 1) * grow
  const cacheRead = (n - 1) * p + (grow * (n - 1) * (n - 2)) / 2
  const cachedCost =
    (fresh * priceIn * WRITE_MULT + cacheRead * priceIn * READ_MULT + totalOut * priceOut) / 1e6

  return {
    ctx,
    totalIn,
    totalOut,
    actual: cost(totalIn, totalOut),
    // The intuition being corrected: "one call times N".
    naive: cost(p * n, totalOut),
    cached: cachedCost,
    lastCtx: ctx(n),
    firstCtx: p,
  }
}

const tok = (n: number) =>
  n >= 1_000_000 ? (n / 1e6).toFixed(2) + 'M' : n >= 1000 ? Math.round(n / 1000) + 'k' : String(n)

const usd = (n: number) =>
  '$' +
  n.toLocaleString('en-US', {
    minimumFractionDigits: n < 1 ? 3 : 2,
    maximumFractionDigits: n < 1 ? 3 : 2,
  })

export default function AgentCost() {
  const [v, setV] = useState<Inputs>({
    steps: 14,
    prefix: 5000,
    toolTokens: 900,
    outTokens: 350,
    priceIn: 3,
    priceOut: 15,
  })
  const [cache, setCache] = useState(false)

  const set = <K extends keyof Inputs>(k: K, n: number) => setV((s) => ({ ...s, [k]: n }))
  const m = useMemo(() => model(v), [v])

  const rows = Array.from({ length: v.steps }, (_, i) => i + 1)
  const total = cache ? m.cached : m.actual

  return (
    <div className="ins">
      <div className="ins__controls">
        <label className="ins__field">
          <span className="ins__label">
            Steps in the loop <span className="ins__value">{v.steps}</span>
          </span>
          <input
            type="range"
            min="1"
            max="40"
            value={v.steps}
            onChange={(e) => set('steps', Number(e.currentTarget.value))}
          />
        </label>

        <label className="ins__field">
          <span className="ins__label">
            System prompt + tools <span className="ins__value">{tok(v.prefix)}</span>
          </span>
          <input
            type="range"
            min="500"
            max="30000"
            step="500"
            value={v.prefix}
            onChange={(e) => set('prefix', Number(e.currentTarget.value))}
          />
        </label>

        <label className="ins__field">
          <span className="ins__label">
            Tool result per step <span className="ins__value">{tok(v.toolTokens)}</span>
          </span>
          <input
            type="range"
            min="0"
            max="8000"
            step="100"
            value={v.toolTokens}
            onChange={(e) => set('toolTokens', Number(e.currentTarget.value))}
          />
        </label>

        <label className="ins__field">
          <span className="ins__label">
            Model output per step <span className="ins__value">{tok(v.outTokens)}</span>
          </span>
          <input
            type="range"
            min="50"
            max="4000"
            step="50"
            value={v.outTokens}
            onChange={(e) => set('outTokens', Number(e.currentTarget.value))}
          />
        </label>

        <label className="ins__field">
          <span className="ins__label">$ / 1M input</span>
          <input
            type="number"
            min="0"
            step="0.25"
            value={v.priceIn}
            onChange={(e) => set('priceIn', Number(e.currentTarget.value) || 0)}
          />
        </label>

        <label className="ins__field">
          <span className="ins__label">$ / 1M output</span>
          <input
            type="number"
            min="0"
            step="0.25"
            value={v.priceOut}
            onChange={(e) => set('priceOut', Number(e.currentTarget.value) || 0)}
          />
        </label>

        <div className="ins__field">
          <span className="ins__label">Prompt caching</span>
          <div className="ins__seg">
            <button type="button" aria-pressed={!cache} onClick={() => setCache(false)}>
              Off
            </button>
            <button type="button" aria-pressed={cache} onClick={() => setCache(true)}>
              On
            </button>
          </div>
        </div>
      </div>

      <dl className="ins__readout">
        <div className="ins__stat">
          <dt>Cost per run</dt>
          <dd>
            {usd(total)}
            {cache && <small>{usd(m.actual)} without caching</small>}
          </dd>
        </div>
        <div className="ins__stat ins__stat--hot">
          <dt>Input tokens billed</dt>
          <dd>
            {tok(m.totalIn)}
            <small>{(m.totalIn / (v.prefix * v.steps)).toFixed(1)}x the prompt itself</small>
          </dd>
        </div>
        <div className="ins__stat">
          <dt>Last step vs first</dt>
          <dd>
            {(m.lastCtx / m.firstCtx).toFixed(1)}x
            <small>
              {tok(m.firstCtx)} &rarr; {tok(m.lastCtx)} in context
            </small>
          </dd>
        </div>
        <div className="ins__stat">
          <dt>1000 runs a day</dt>
          <dd>
            {usd(total * 1000 * 30)}
            <small>per month</small>
          </dd>
        </div>
      </dl>

      <div className="ins__body">
        <ol className="ac__steps">
          {rows.map((i) => {
            const c = m.ctx(i)
            const w = (c / m.lastCtx) * 100
            const prefixShare = (v.prefix / c) * 100
            return (
              <li className="ac__step" key={i}>
                <span className="ac__n">{i}</span>
                <span className="ac__track">
                  <span className="ac__bar" style={{ width: w + '%' }}>
                    <span className="ac__prefix" style={{ width: prefixShare + '%' }} />
                  </span>
                </span>
                <span className="ac__tok">{tok(c)}</span>
              </li>
            )
          })}
        </ol>
        <p className="ac__key">
          <span className="ac__swatch ac__swatch--prefix" /> prompt and tools, re-sent every step
          <span className="ac__swatch ac__swatch--hist" /> conversation so far
        </p>
      </div>

      <p className="ins__note">
        Prices are yours to fill in, not a quote. Caching is modelled the usual way: writing
        the new part of the context costs {WRITE_MULT}x input, reading the part you already
        sent costs {READ_MULT}x. Check your provider's real multipliers before you trust the
        second number.
      </p>
    </div>
  )
}
