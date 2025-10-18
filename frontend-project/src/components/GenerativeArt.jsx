import { useRef, useEffect, useState } from 'react'
import './GenerativeArt.css'

const GenerativeArt = () => {
  const canvasRef = useRef(null)
  const [pattern, setPattern] = useState('circles')
  const [colorScheme, setColorScheme] = useState('vibrant')
  const [isDark, setIsDark] = useState(false)

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains('dark') ||
                        document.body.classList.contains('dark') ||
                        window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(isDarkMode)
    }

    checkDarkMode()

    // Listen for changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  // Color schemes
  const colorSchemes = {
    vibrant: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'],
    pastel: ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA', '#E0BBE4'],
    sunset: ['#FF6B9D', '#C44569', '#FFA07A', '#F67280', '#355C7D'],
    ocean: ['#0077BE', '#00A8E8', '#00C9FF', '#66D9EF', '#0099CC'],
    forest: ['#2D5016', '#3A7D44', '#69995D', '#AECFA4', '#D4E7C5'],
    monochrome: ['#000000', '#404040', '#808080', '#BFBFBF', '#FFFFFF']
  }

  const getColors = () => colorSchemes[colorScheme] || colorSchemes.vibrant

  // Pattern generators
  const generateCircles = (ctx, width, height) => {
    const colors = getColors()
    ctx.clearRect(0, 0, width, height)

    // Background
    ctx.fillStyle = isDark ? '#1A202C' : '#FFFFFF'
    ctx.fillRect(0, 0, width, height)

    // Generate overlapping circles
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const radius = Math.random() * 100 + 20
      const color = colors[Math.floor(Math.random() * colors.length)]

      ctx.fillStyle = color + '40' // Add transparency
      ctx.strokeStyle = color
      ctx.lineWidth = 2

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    }
  }

  const generateLines = (ctx, width, height) => {
    const colors = getColors()
    ctx.clearRect(0, 0, width, height)

    // Background
    ctx.fillStyle = isDark ? '#1A202C' : '#FFFFFF'
    ctx.fillRect(0, 0, width, height)

    // Generate flowing lines
    for (let i = 0; i < 30; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)]
      ctx.strokeStyle = color
      ctx.lineWidth = Math.random() * 5 + 1
      ctx.lineCap = 'round'

      ctx.beginPath()
      let x = Math.random() * width
      let y = Math.random() * height
      ctx.moveTo(x, y)

      // Create curved line with multiple points
      for (let j = 0; j < 10; j++) {
        x += (Math.random() - 0.5) * 100
        y += (Math.random() - 0.5) * 100
        ctx.lineTo(x, y)
      }

      ctx.stroke()
    }
  }

  const generateGrid = (ctx, width, height) => {
    const colors = getColors()
    ctx.clearRect(0, 0, width, height)

    // Background
    ctx.fillStyle = isDark ? '#1A202C' : '#FFFFFF'
    ctx.fillRect(0, 0, width, height)

    const cellSize = 60
    const cols = Math.ceil(width / cellSize)
    const rows = Math.ceil(height / cellSize)

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * cellSize
        const y = j * cellSize
        const color = colors[Math.floor(Math.random() * colors.length)]

        // Randomly choose shape
        const shape = Math.floor(Math.random() * 4)

        ctx.fillStyle = color + '80'
        ctx.strokeStyle = color
        ctx.lineWidth = 2

        switch (shape) {
          case 0: // Circle
            ctx.beginPath()
            ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 3, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
            break
          case 1: // Square
            ctx.fillRect(x + 10, y + 10, cellSize - 20, cellSize - 20)
            ctx.strokeRect(x + 10, y + 10, cellSize - 20, cellSize - 20)
            break
          case 2: // Triangle
            ctx.beginPath()
            ctx.moveTo(x + cellSize / 2, y + 10)
            ctx.lineTo(x + cellSize - 10, y + cellSize - 10)
            ctx.lineTo(x + 10, y + cellSize - 10)
            ctx.closePath()
            ctx.fill()
            ctx.stroke()
            break
          case 3: // Diamond
            ctx.beginPath()
            ctx.moveTo(x + cellSize / 2, y + 10)
            ctx.lineTo(x + cellSize - 10, y + cellSize / 2)
            ctx.lineTo(x + cellSize / 2, y + cellSize - 10)
            ctx.lineTo(x + 10, y + cellSize / 2)
            ctx.closePath()
            ctx.fill()
            ctx.stroke()
            break
        }
      }
    }
  }

  const generateWaves = (ctx, width, height) => {
    const colors = getColors()
    ctx.clearRect(0, 0, width, height)

    // Background
    ctx.fillStyle = isDark ? '#1A202C' : '#FFFFFF'
    ctx.fillRect(0, 0, width, height)

    // Generate wave patterns
    for (let i = 0; i < 8; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)]
      ctx.strokeStyle = color + '60'
      ctx.lineWidth = Math.random() * 20 + 5
      ctx.lineCap = 'round'

      ctx.beginPath()

      const amplitude = Math.random() * 100 + 50
      const frequency = Math.random() * 0.02 + 0.005
      const yOffset = (i / 8) * height

      for (let x = 0; x < width; x += 5) {
        const y = Math.sin(x * frequency) * amplitude + yOffset
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
    }
  }

  const generateSpiral = (ctx, width, height) => {
    const colors = getColors()
    ctx.clearRect(0, 0, width, height)

    // Background
    ctx.fillStyle = isDark ? '#1A202C' : '#FFFFFF'
    ctx.fillRect(0, 0, width, height)

    const centerX = width / 2
    const centerY = height / 2
    const numSpirals = 5

    for (let s = 0; s < numSpirals; s++) {
      const color = colors[s % colors.length]
      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.lineCap = 'round'

      ctx.beginPath()

      const angleOffset = (s / numSpirals) * Math.PI * 2

      for (let i = 0; i < 200; i++) {
        const angle = i * 0.1 + angleOffset
        const radius = i * 1.5
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
    }

    // Add dots along spirals
    for (let s = 0; s < numSpirals; s++) {
      const color = colors[s % colors.length]
      const angleOffset = (s / numSpirals) * Math.PI * 2

      for (let i = 0; i < 200; i += 10) {
        const angle = i * 0.1 + angleOffset
        const radius = i * 1.5
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  const generateMondrian = (ctx, width, height) => {
    const colors = getColors()
    ctx.clearRect(0, 0, width, height)

    // Background
    ctx.fillStyle = isDark ? '#1A202C' : '#FFFFFF'
    ctx.fillRect(0, 0, width, height)

    // Recursive subdivision
    const subdivide = (x, y, w, h, depth) => {
      if (depth === 0 || w < 50 || h < 50) {
        // Draw rectangle
        const color = Math.random() > 0.5 ? colors[Math.floor(Math.random() * colors.length)] : (isDark ? '#2D3748' : '#F7FAFC')
        ctx.fillStyle = color
        ctx.fillRect(x, y, w, h)
        ctx.strokeStyle = isDark ? '#4A5568' : '#2D3748'
        ctx.lineWidth = 4
        ctx.strokeRect(x, y, w, h)
        return
      }

      // Randomly choose to split horizontally or vertically
      if (Math.random() > 0.5) {
        // Split horizontally
        const splitPoint = Math.random() * 0.4 + 0.3 // Between 30% and 70%
        const splitY = y + h * splitPoint
        subdivide(x, y, w, h * splitPoint, depth - 1)
        subdivide(x, splitY, w, h * (1 - splitPoint), depth - 1)
      } else {
        // Split vertically
        const splitPoint = Math.random() * 0.4 + 0.3
        const splitX = x + w * splitPoint
        subdivide(x, y, w * splitPoint, h, depth - 1)
        subdivide(splitX, y, w * (1 - splitPoint), h, depth - 1)
      }
    }

    subdivide(0, 0, width, height, 4)
  }

  const generate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    switch (pattern) {
      case 'circles':
        generateCircles(ctx, width, height)
        break
      case 'lines':
        generateLines(ctx, width, height)
        break
      case 'grid':
        generateGrid(ctx, width, height)
        break
      case 'waves':
        generateWaves(ctx, width, height)
        break
      case 'spiral':
        generateSpiral(ctx, width, height)
        break
      case 'mondrian':
        generateMondrian(ctx, width, height)
        break
      default:
        generateCircles(ctx, width, height)
    }
  }

  const downloadArt = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `generative-art-${pattern}-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  useEffect(() => {
    generate()
  }, [pattern, colorScheme, isDark])

  return (
    <div className="generative-art-container">
      <div className="generative-art-controls">
        <h3 className="controls-title">Controls</h3>

        <div className="control-group">
          <label htmlFor="pattern-select">Pattern Type</label>
          <select
            id="pattern-select"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="control-select"
          >
            <option value="circles">Overlapping Circles</option>
            <option value="lines">Flowing Lines</option>
            <option value="grid">Geometric Grid</option>
            <option value="waves">Wave Patterns</option>
            <option value="spiral">Spiral</option>
            <option value="mondrian">Mondrian Style</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="color-select">Color Scheme</label>
          <select
            id="color-select"
            value={colorScheme}
            onChange={(e) => setColorScheme(e.target.value)}
            className="control-select"
          >
            <option value="vibrant">Vibrant</option>
            <option value="pastel">Pastel</option>
            <option value="sunset">Sunset</option>
            <option value="ocean">Ocean</option>
            <option value="forest">Forest</option>
            <option value="monochrome">Monochrome</option>
          </select>
        </div>

        <div className="control-buttons">
          <button onClick={generate} className="btn btn-primary">
            Regenerate
          </button>
          <button onClick={downloadArt} className="btn btn-secondary">
            Download PNG
          </button>
        </div>
      </div>

      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="generative-canvas"
        />
      </div>
    </div>
  )
}

export default GenerativeArt
