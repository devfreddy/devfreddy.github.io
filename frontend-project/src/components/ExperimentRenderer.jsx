import { Box, Container, VStack } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import GenerativeArt from './GenerativeArt'
import PromptBuilder from './PromptBuilder'

/**
 * ExperimentRenderer - Renders experiment content with support for multiple layout types
 *
 * Supported layout types:
 * - "default": Standard centered layout with 800px max width (blog-like)
 * - "fullwidth": Full-width layout, no container constraints
 * - "gallery": Gallery/showcase layout optimized for visual content
 * - "showcase": Featured showcase layout with more breathing room
 */
const ExperimentRenderer = ({ content, frontmatter, colorMode }) => {
  const layout = frontmatter?.layout || 'default'
  const maxWidth = frontmatter?.maxWidth || '800px'

  // Helper function to render component tags
  const renderContentWithComponents = (markdown) => {
    const parts = markdown.split(/(<GenerativeArt \/>|<PromptBuilder \/>)/g)

    return parts.map((part, index) => {
      if (part.trim() === '<GenerativeArt />') {
        return <Box key={index} my={8}><GenerativeArt /></Box>
      }
      if (part.trim() === '<PromptBuilder />') {
        return <Box key={index} my={8}><PromptBuilder /></Box>
      }
      if (part.trim()) {
        return (
          <ReactMarkdown key={index} remarkPlugins={[remarkGfm]}>
            {part}
          </ReactMarkdown>
        )
      }
      return null
    })
  }

  const hasComponents = content.split('\n').some(line =>
    line.trim() === '<GenerativeArt />' || line.trim() === '<PromptBuilder />'
  )

  const contentElement = hasComponents
    ? renderContentWithComponents(content)
    : <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>

  // Layout-specific rendering
  switch (layout) {
    case 'fullwidth':
      return (
        <Box className={`experiment-article ${colorMode === 'dark' ? 'dark-mode' : ''}`} w="100%" px={{ base: 4, md: 8 }}>
          {contentElement}
        </Box>
      )

    case 'gallery':
      return (
        <Box className={`experiment-article experiment-gallery ${colorMode === 'dark' ? 'dark-mode' : ''}`} w="100%">
          <VStack spacing={8} align="stretch">
            {contentElement}
          </VStack>
        </Box>
      )

    case 'showcase':
      return (
        <Box
          className={`experiment-article experiment-showcase ${colorMode === 'dark' ? 'dark-mode' : ''}`}
          w="100%"
          px={{ base: 4, md: 12 }}
        >
          <VStack spacing={12} align="stretch">
            {contentElement}
          </VStack>
        </Box>
      )

    case 'default':
    default:
      return (
        <Container
          maxW={maxWidth}
          className={`experiment-article ${colorMode === 'dark' ? 'dark-mode' : ''}`}
        >
          {contentElement}
        </Container>
      )
  }
}

export default ExperimentRenderer
