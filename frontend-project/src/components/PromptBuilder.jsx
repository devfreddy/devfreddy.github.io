import { useState, useMemo } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  Badge,
  Button,
  Input,
  Grid,
  Flex
} from '@chakra-ui/react'
import { useColorMode } from './ui/color-mode'
import snippetsData from '../experiments/prompt-builder/snippets.json'

const PromptBuilder = () => {
  const { colorMode } = useColorMode()
  const [selectedSnippets, setSelectedSnippets] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(snippetsData.map(s => s.category))
    return ['all', ...Array.from(cats)]
  }, [])

  // Filter snippets based on search and category
  const filteredSnippets = useMemo(() => {
    return snippetsData.filter(snippet => {
      const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  // Generate composed prompt
  const composedPrompt = useMemo(() => {
    if (selectedSnippets.length === 0) {
      return '# Custom Claude Prompt\n\nSelect snippets from the library to build your prompt.'
    }

    const header = '# Custom Claude Prompt\n\n*Generated with Prompt Builder*\n\n---\n\n'
    const snippetContents = selectedSnippets
      .map(id => {
        const snippet = snippetsData.find(s => s.id === id)
        return snippet ? snippet.content : ''
      })
      .join('\n\n---\n\n')

    return header + snippetContents
  }, [selectedSnippets])

  const toggleSnippet = (snippetId) => {
    setSelectedSnippets(prev => {
      if (prev.includes(snippetId)) {
        return prev.filter(id => id !== snippetId)
      } else {
        return [...prev, snippetId]
      }
    })
  }

  const clearSelection = () => {
    setSelectedSnippets([])
  }

  const downloadPrompt = () => {
    const blob = new Blob([composedPrompt], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'claude-prompt.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(composedPrompt)
  }

  const formatCategory = (category) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const getCategoryColor = (category) => {
    const colors = {
      'coding-style': 'blue',
      'project-setup': 'green',
      'code-review': 'purple',
      'testing': 'orange',
      'documentation': 'pink',
      'development-workflow': 'teal'
    }
    return colors[category] || 'gray'
  }

  return (
    <Box bg={{ base: 'white', _dark: 'gray.900' }} minH="100vh">
      <Container maxW="1400px" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box textAlign="center">
            <Heading
              size="2xl"
              mb={4}
              color={{ base: 'gray.800', _dark: 'gray.100' }}
            >
              Prompt Builder
            </Heading>
            <Text
              fontSize="lg"
              color={{ base: 'gray.600', _dark: 'gray.400' }}
              maxW="800px"
              mx="auto"
            >
              Build custom Claude prompts by selecting snippets from our curated library.
              Combine best practices, coding standards, and configuration templates into a single downloadable prompt.
            </Text>
          </Box>

          {/* Search and Filters */}
          <Box>
            <VStack spacing={4} align="stretch">
              <Input
                placeholder="Search snippets by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="lg"
                bg={{ base: 'white', _dark: 'gray.800' }}
                borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
              />

              <HStack spacing={2} flexWrap="wrap">
                {categories.map(category => (
                  <Button
                    key={category}
                    size="sm"
                    variant={selectedCategory === category ? 'solid' : 'outline'}
                    colorScheme={selectedCategory === category ? 'blue' : 'gray'}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {formatCategory(category)}
                  </Button>
                ))}
              </HStack>

              {selectedSnippets.length > 0 && (
                <HStack justify="space-between" p={4} bg={{ base: 'blue.50', _dark: 'blue.950' }} borderRadius="md">
                  <Text fontWeight="medium" color={{ base: 'blue.800', _dark: 'blue.200' }}>
                    {selectedSnippets.length} snippet{selectedSnippets.length !== 1 ? 's' : ''} selected
                  </Text>
                  <HStack spacing={2}>
                    <Button size="sm" onClick={clearSelection} variant="outline" colorScheme="red">
                      Clear All
                    </Button>
                    <Button size="sm" onClick={copyToClipboard} variant="outline" colorScheme="blue">
                      Copy to Clipboard
                    </Button>
                    <Button size="sm" onClick={downloadPrompt} colorScheme="blue">
                      Download Prompt
                    </Button>
                  </HStack>
                </HStack>
              )}
            </VStack>
          </Box>

          {/* Main Content Area */}
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
            {/* Snippet Library */}
            <Box>
              <Heading size="md" mb={4} color={{ base: 'gray.800', _dark: 'gray.100' }}>
                Snippet Library
              </Heading>
              <VStack spacing={3} align="stretch">
                {filteredSnippets.length === 0 ? (
                  <Text color={{ base: 'gray.500', _dark: 'gray.500' }}>
                    No snippets found matching your search.
                  </Text>
                ) : (
                  filteredSnippets.map(snippet => (
                    <Card.Root
                      key={snippet.id}
                      cursor="pointer"
                      onClick={() => toggleSnippet(snippet.id)}
                      bg={selectedSnippets.includes(snippet.id)
                        ? { base: 'blue.50', _dark: 'blue.950' }
                        : { base: 'white', _dark: 'gray.800' }
                      }
                      borderWidth="2px"
                      borderColor={selectedSnippets.includes(snippet.id)
                        ? { base: 'blue.500', _dark: 'blue.400' }
                        : { base: 'gray.200', _dark: 'gray.700' }
                      }
                      _hover={{
                        borderColor: { base: 'blue.400', _dark: 'blue.500' },
                        shadow: 'md'
                      }}
                      transition="all 0.2s"
                    >
                      <Card.Body p={4}>
                        <VStack align="start" spacing={2}>
                          <HStack justify="space-between" width="100%">
                            <Heading size="sm" color={{ base: 'gray.800', _dark: 'gray.100' }}>
                              {snippet.title}
                            </Heading>
                            <Badge
                              colorScheme={getCategoryColor(snippet.category)}
                              variant="subtle"
                              fontSize="xs"
                            >
                              {formatCategory(snippet.category)}
                            </Badge>
                          </HStack>

                          <Text
                            fontSize="sm"
                            color={{ base: 'gray.600', _dark: 'gray.400' }}
                          >
                            {snippet.description}
                          </Text>

                          <HStack spacing={1} flexWrap="wrap">
                            {snippet.tags.map(tag => (
                              <Badge
                                key={tag}
                                colorScheme="gray"
                                variant="subtle"
                                fontSize="xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </HStack>
                        </VStack>
                      </Card.Body>
                    </Card.Root>
                  ))
                )}
              </VStack>
            </Box>

            {/* Preview Pane */}
            <Box position="sticky" top="20px" alignSelf="start">
              <Heading size="md" mb={4} color={{ base: 'gray.800', _dark: 'gray.100' }}>
                Preview
              </Heading>
              <Card.Root bg={{ base: 'gray.50', _dark: 'gray.800' }} borderWidth="1px">
                <Card.Body p={6}>
                  <Box
                    as="pre"
                    whiteSpace="pre-wrap"
                    fontFamily="mono"
                    fontSize="sm"
                    color={{ base: 'gray.700', _dark: 'gray.300' }}
                    maxH="600px"
                    overflowY="auto"
                    css={{
                      '&::-webkit-scrollbar': {
                        width: '8px',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: colorMode === 'dark' ? '#2D3748' : '#E2E8F0',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: colorMode === 'dark' ? '#4A5568' : '#CBD5E0',
                        borderRadius: '4px',
                      },
                    }}
                  >
                    {composedPrompt}
                  </Box>
                </Card.Body>
              </Card.Root>
            </Box>
          </Grid>
        </VStack>
      </Container>
    </Box>
  )
}

export default PromptBuilder
