---
title: "Generative Art Canvas"
date: "2025-10-18"
excerpt: "An interactive canvas that creates algorithmic art using various generative patterns. Customize colors, switch patterns, and download your creations."
tags: [canvas, generative-art, algorithms, interactive]
status: "active"
---

# Generative Art Canvas

An interactive playground for creating algorithmic art. This experiment explores different pattern generation techniques, from geometric precision to organic flow.

## Try It Out

Use the controls below to switch between different pattern types, choose color schemes, and generate unique artwork. Each click creates something completely new!

<GenerativeArt />

## The Concept

Generative art uses algorithms and randomness to create unique visual pieces. Unlike traditional digital art where every pixel is manually placed, generative art emerges from rules and parameters that guide the creative process.

This experiment showcases six different pattern generation techniques:

### 1. **Overlapping Circles**
Randomly placed circles with varying sizes and transparency create depth and organic composition. The overlapping creates unexpected color combinations and visual interest.

### 2. **Flowing Lines**
Curved lines that meander across the canvas, creating dynamic, flowing compositions. Each line follows a random walk with smooth curves.

### 3. **Geometric Grid**
A structured grid filled with random shapes (circles, squares, triangles, diamonds). This demonstrates how order and chaos can coexist—the grid provides structure while randomness provides variety.

### 4. **Wave Patterns**
Sinusoidal waves layered at different frequencies and amplitudes. This creates rhythmic, hypnotic patterns reminiscent of sound visualizations.

### 5. **Spiral**
Multiple spirals emanating from the center, decorated with dots along their paths. This pattern shows how mathematical formulas (polar coordinates) can create beautiful organic forms.

### 6. **Mondrian Style**
Inspired by Piet Mondrian's abstract compositions, this uses recursive subdivision to create a balanced asymmetric grid. Random colors fill some sections while others remain neutral.

## The Technical Approach

Built with the HTML5 Canvas API and React, this experiment demonstrates:

- **Canvas 2D Context** - Direct pixel manipulation for performance
- **Algorithmic Design** - Each pattern uses mathematical or procedural generation
- **Color Theory** - Six curated color schemes optimized for harmony
- **Responsive Design** - Canvas scales to fit different screen sizes
- **State Management** - React hooks manage pattern and color state
- **Export Functionality** - Canvas API's `toDataURL()` enables PNG downloads

### Key Code Concepts

**Random Walks**: The flowing lines use random walks where each point is determined by the previous point plus a random offset:

```javascript
for (let j = 0; j < 10; j++) {
  x += (Math.random() - 0.5) * 100
  y += (Math.random() - 0.5) * 100
  ctx.lineTo(x, y)
}
```

**Recursive Subdivision** (Mondrian): The canvas is recursively split either horizontally or vertically, creating increasingly smaller rectangles:

```javascript
const subdivide = (x, y, w, h, depth) => {
  if (depth === 0 || w < 50 || h < 50) {
    // Draw final rectangle
    return
  }
  // Split and recurse
}
```

**Parametric Equations** (Spiral): Using polar coordinates to create spirals:

```javascript
const angle = i * 0.1 + angleOffset
const radius = i * 1.5
const x = centerX + Math.cos(angle) * radius
const y = centerY + Math.sin(angle) * radius
```

## Color Schemes

Each color scheme is carefully curated for visual harmony:

- **Vibrant**: Bold, energetic colors for maximum impact
- **Pastel**: Soft, gentle hues for a calming effect
- **Sunset**: Warm oranges and pinks with cool blue accents
- **Ocean**: Cool blues evoking water and sky
- **Forest**: Natural greens creating organic feel
- **Monochrome**: Grayscale for elegant, minimal compositions

The colors are applied with transparency (`+ '40'` for alpha) to create layering effects and visual depth.

## What I Learned

**Randomness is powerful but needs constraints**: Pure randomness creates chaos. The best results come from constraining randomness within rules (grid positions, size ranges, color palettes).

**Performance matters**: Canvas operations can be expensive. Using `clearRect()` instead of redrawing everything, and batching operations improved performance significantly.

**Math creates beauty**: Simple mathematical functions (sine waves, spirals, recursive subdivision) can create surprisingly organic and beautiful results.

**Color harmony is crucial**: Having curated color palettes made a huge difference. Random colors from the full spectrum rarely look good together.

## Ideas for Extension

- **Animation**: Make patterns animate over time
- **User drawing**: Let users add their own elements
- **More algorithms**: Perlin noise, L-systems, fractals
- **3D**: Expand into 3D space with WebGL
- **Sound reactivity**: Make patterns respond to music

## Try Creating Your Own

The beauty of generative art is that there's no "wrong" output—every generation is unique. Try different combinations of patterns and colors to discover compositions you love. Download your favorites!

---

*Tip: Try the Mondrian pattern with the Monochrome color scheme for a classic look, or Spiral with Ocean colors for a hypnotic effect.*
