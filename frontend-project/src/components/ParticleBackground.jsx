import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import * as d3 from 'd3'

const ParticleBackground = () => {
  const svgRef = useRef()

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    const container = svgRef.current.parentElement
    
    const updateDimensions = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      
      svg.attr('width', width).attr('height', height)
      
      const particles = d3.range(60).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 3 + 1
      }))

      svg.selectAll("*").remove()

      const particleNodes = svg.selectAll('circle')
        .data(particles)
        .enter()
        .append('circle')
        .attr('r', d => d.radius)
        .attr('fill', (d, i) => {
          const colors = ['#38B2AC', '#4299E1', '#9F7AEA', '#ED8936', '#48BB78']
          return colors[i % colors.length]
        })
        .attr('opacity', 0.6)

      const links = svg.append('g').selectAll('line')

      const simulation = d3.forceSimulation(particles)
        .force('collision', d3.forceCollide().radius(d => d.radius + 10))
        .on('tick', () => {
          particles.forEach(d => {
            d.x += d.vx
            d.y += d.vy
            
            if (d.x < 0 || d.x > width) d.vx *= -1
            if (d.y < 0 || d.y > height) d.vy *= -1
            
            d.x = Math.max(0, Math.min(width, d.x))
            d.y = Math.max(0, Math.min(height, d.y))
          })

          particleNodes
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)

          const linkData = []
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x
              const dy = particles[i].y - particles[j].y
              const distance = Math.sqrt(dx * dx + dy * dy)
              
              if (distance < 120) {
                linkData.push({
                  source: particles[i],
                  target: particles[j],
                  distance: distance
                })
              }
            }
          }

          links.data(linkData)
            .join('line')
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y)
            .attr('stroke', '#E2E8F0')
            .attr('stroke-opacity', d => Math.max(0, 1 - d.distance / 120))
            .attr('stroke-width', 1)
        })

      let mouseX = width / 2
      let mouseY = height / 2

      svg.on('mousemove', (event) => {
        mouseX = event.offsetX
        mouseY = event.offsetY
        
        particles.forEach(d => {
          const dx = mouseX - d.x
          const dy = mouseY - d.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const force = (100 - distance) / 100 * 0.3
            d.vx += (dx / distance) * force
            d.vy += (dy / distance) * force
          }
        })
      })

      return () => {
        simulation.stop()
      }
    }

    updateDimensions()
    
    const handleResize = () => updateDimensions()
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      width="100%"
      height="100%"
      pointerEvents="auto"
      zIndex="-1"
    >
      <svg
        ref={svgRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </Box>
  )
}

export default ParticleBackground