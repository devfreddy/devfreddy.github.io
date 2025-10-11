# Hero Section Feature

## Overview
The Hero Section is the first visual element visitors see - an animated, full-screen landing area with a gradient background, animated particles, floating tech icons, and call-to-action buttons.

## What Problem Does This Solve?
Creates an engaging first impression that:
- Immediately communicates professional identity and expertise
- Captures attention with smooth animations and interactive elements
- Guides visitors to key sections of the portfolio
- Establishes visual brand identity

## User Interaction
- Visitors land on a full-screen hero section
- Animated text reveals name and title with stagger effects
- Interactive particle background responds to mouse movement
- Two CTA buttons allow navigation to Experience or About sections
- Scroll indicator prompts users to explore more content
- Banner adjustment ensures proper spacing when construction banner is visible

## Quick Start Examples

### Basic Usage
The Hero Section is automatically rendered on the home page:
```jsx
<HeroSection scrollToSection={scrollToSection} showBanner={showBanner} />
```

### Scroll Functionality
```javascript
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
```

## Configuration Options

### Props
- `scrollToSection: (sectionId: string) => void` - Function to scroll to specific sections
- `showBanner: boolean` - Adjusts top padding when construction banner is visible

### Animation Variants
The component uses multiple animation variants:
- **containerVariants**: Stagger children animations
- **itemVariants**: Fade up animation for text and buttons
- **nameVariants**: Scale and spring animation for the main heading

## Common Use Cases

1. **Landing Page Introduction**
   - Display name, title, and brief description
   - Guide visitors to explore portfolio content

2. **Visual Engagement**
   - Attract attention with particle effects
   - Show technical capabilities through interactive elements

3. **Navigation Gateway**
   - Provide clear CTAs to key portfolio sections
   - Smooth scroll navigation to different areas

## Technical Details

### File Location
`frontend-project/src/components/HeroSection.jsx`

### Key Dependencies
- Chakra UI (Box, VStack, Heading, Text, Button, HStack)
- Framer Motion (motion components and animations)
- ParticleBackground component
- FloatingTechIcons component

### Responsive Design
- Adaptive padding based on banner visibility
- Mobile-friendly button layout with HStack spacing
- Flexible text sizing and spacing
