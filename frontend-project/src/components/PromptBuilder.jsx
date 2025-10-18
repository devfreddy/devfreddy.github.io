import { useState, useMemo, useRef } from 'react'
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
  Flex,
  IconButton,
  createListCollection
} from '@chakra-ui/react'
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem
} from './ui/menu'
import { useColorMode } from './ui/color-mode'
import { Toaster, toaster } from './ui/toaster'
import librarySnippetsData from '../experiments/prompt-builder/snippets.json'
import {
  loadCustomSnippets,
  addCustomSnippet,
  updateCustomSnippet,
  deleteCustomSnippet,
  exportCustomSnippets,
  importCustomSnippets
} from '../experiments/prompt-builder/snippetStorage'
import SnippetModal from './SnippetModal'

const PromptBuilder = () => {
  const { colorMode } = useColorMode()
  const [selectedSnippets, setSelectedSnippets] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [customSnippets, setCustomSnippets] = useState(() => loadCustomSnippets())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSnippet, setEditingSnippet] = useState(null)
  const [expandedSnippet, setExpandedSnippet] = useState(null)
  const fileInputRef = useRef(null)

  // Combine library and custom snippets
  const allSnippets = useMemo(() => {
    return [...librarySnippetsData, ...customSnippets]
  }, [customSnippets])

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(allSnippets.map(s => s.category))
    return ['all', ...Array.from(cats)]
  }, [allSnippets])

  // Filter snippets based on search and category
  const filteredSnippets = useMemo(() => {
    return allSnippets.filter(snippet => {
      const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory, allSnippets])

  // Generate composed prompt
  const composedPrompt = useMemo(() => {
    if (selectedSnippets.length === 0) {
      return '# Custom Claude Prompt\n\nSelect snippets from the library to build your prompt.'
    }

    const header = '# Custom Claude Prompt\n\n*Generated with Prompt Builder*\n\n---\n\n'
    const snippetContents = selectedSnippets
      .map(id => {
        const snippet = allSnippets.find(s => s.id === id)
        return snippet ? snippet.content : ''
      })
      .join('\n\n---\n\n')

    return header + snippetContents
  }, [selectedSnippets, allSnippets])

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
    toaster.create({
      title: 'Copied to clipboard',
      type: 'success',
      duration: 2000
    })
  }

  const handleCreateSnippet = () => {
    setEditingSnippet(null)
    setIsModalOpen(true)
  }

  const handleEditSnippet = (snippet) => {
    setEditingSnippet(snippet)
    setIsModalOpen(true)
  }

  const handleSaveSnippet = (snippetData) => {
    if (editingSnippet) {
      const updated = updateCustomSnippet(editingSnippet.id, snippetData)
      setCustomSnippets(loadCustomSnippets())
      toaster.create({
        title: 'Snippet updated',
        description: `"${snippetData.title}" has been updated`,
        type: 'success',
        duration: 3000
      })
    } else {
      const newSnippet = addCustomSnippet(snippetData)
      setCustomSnippets(loadCustomSnippets())
      toaster.create({
        title: 'Snippet created',
        description: `"${snippetData.title}" has been added to your library`,
        type: 'success',
        duration: 3000
      })
    }
  }

  const handleDeleteSnippet = (snippetId) => {
    if (confirm('Are you sure you want to delete this custom snippet?')) {
      deleteCustomSnippet(snippetId)
      setCustomSnippets(loadCustomSnippets())
      // Remove from selection if selected
      setSelectedSnippets(prev => prev.filter(id => id !== snippetId))
      toaster.create({
        title: 'Snippet deleted',
        type: 'info',
        duration: 2000
      })
    }
  }

  const handleExportSnippets = () => {
    exportCustomSnippets()
    toaster.create({
      title: 'Snippets exported',
      description: 'Your custom snippets have been downloaded',
      type: 'success',
      duration: 3000
    })
  }

  const handleImportSnippets = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      await importCustomSnippets(file)
      setCustomSnippets(loadCustomSnippets())
      toaster.create({
        title: 'Snippets imported',
        description: 'Custom snippets have been added to your library',
        type: 'success',
        duration: 3000
      })
    } catch (error) {
      toaster.create({
        title: 'Import failed',
        description: error.message,
        type: 'error',
        duration: 5000
      })
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
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

              <HStack spacing={2} flexWrap="wrap" justify="space-between">
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

                <HStack spacing={2}>
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={handleCreateSnippet}
                  >
                    + Create Custom Snippet
                  </Button>
                  <MenuRoot>
                    <MenuTrigger asChild>
                      <Button size="sm" variant="outline">
                        Manage Snippets
                      </Button>
                    </MenuTrigger>
                    <MenuContent>
                      <MenuItem value="export" onClick={handleExportSnippets}>
                        Export Custom Snippets
                      </MenuItem>
                      <MenuItem value="import" onClick={() => fileInputRef.current?.click()}>
                        Import Snippets
                      </MenuItem>
                    </MenuContent>
                  </MenuRoot>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleImportSnippets}
                    style={{ display: 'none' }}
                  />
                </HStack>
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

          {/* Preview Section */}
          <Box>
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
                  maxH="300px"
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

          {/* Snippet Library */}
          <Box>
            <Heading size="md" mb={4} color={{ base: 'gray.800', _dark: 'gray.100' }}>
              Snippet Library ({filteredSnippets.length})
            </Heading>
            {filteredSnippets.length === 0 ? (
              <Text color={{ base: 'gray.500', _dark: 'gray.500' }}>
                No snippets found matching your search.
              </Text>
            ) : (
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={2}>
                {filteredSnippets.map(snippet => {
                  const isExpanded = expandedSnippet === snippet.id
                  const isSelected = selectedSnippets.includes(snippet.id)

                  return (
                    <Card.Root
                      key={snippet.id}
                      bg={isSelected
                        ? { base: 'blue.50', _dark: 'blue.950' }
                        : { base: 'white', _dark: 'gray.800' }
                      }
                      borderWidth="1px"
                      borderColor={isSelected
                        ? { base: 'blue.500', _dark: 'blue.400' }
                        : { base: 'gray.200', _dark: 'gray.700' }
                      }
                      _hover={{
                        borderColor: { base: 'blue.400', _dark: 'blue.500' },
                        shadow: 'sm'
                      }}
                      transition="all 0.2s"
                      cursor="pointer"
                      onClick={() => toggleSnippet(snippet.id)}
                    >
                      <Card.Body p={3}>
                        <VStack align="start" spacing={2}>
                          {/* Title Row */}
                          <HStack spacing={3} width="100%" alignItems="center">
                            {/* Title */}
                            <Text
                              fontWeight="semibold"
                              fontSize="sm"
                              color={{ base: 'gray.800', _dark: 'gray.100' }}
                              noOfLines={1}
                              flex={1}
                              lineHeight="1.25rem"
                            >
                              {snippet.title}
                            </Text>

                            {/* Edit/Delete buttons for custom snippets */}
                            {snippet.author === 'custom' && (
                              <HStack spacing={1} flexShrink={0}>
                                <Button
                                  size="xs"
                                  variant="ghost"
                                  colorScheme="blue"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleEditSnippet(snippet)
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="xs"
                                  variant="ghost"
                                  colorScheme="red"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteSnippet(snippet.id)
                                  }}
                                >
                                  Delete
                                </Button>
                              </HStack>
                            )}
                          </HStack>

                          {/* Expanded content */}
                          {isExpanded && (
                            <VStack align="start" spacing={2} width="100%" pt={2} borderTopWidth="1px" borderColor={{ base: 'gray.200', _dark: 'gray.700' }}>
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

                              {/* Content preview */}
                              <Box
                                as="pre"
                                fontSize="xs"
                                fontFamily="mono"
                                p={3}
                                bg={{ base: 'gray.100', _dark: 'gray.900' }}
                                borderRadius="md"
                                width="100%"
                                maxH="200px"
                                overflowY="auto"
                                whiteSpace="pre-wrap"
                                color={{ base: 'gray.700', _dark: 'gray.300' }}
                              >
                                {snippet.content}
                              </Box>
                            </VStack>
                          )}
                        </VStack>
                      </Card.Body>

                      <Card.Footer px={3} py={2}>
                        <HStack justify="space-between" width="100%" alignItems="flex-end">
                          {/* Badges and Reference */}
                          <HStack spacing={2} flex={1} minW={0} alignItems="center">
                            <Badge
                              colorScheme={getCategoryColor(snippet.category)}
                              variant="subtle"
                              fontSize="xs"
                              flexShrink={0}
                            >
                              {formatCategory(snippet.category)}
                            </Badge>

                            {snippet.author === 'custom' && (
                              <Badge colorScheme="purple" variant="subtle" fontSize="xs" flexShrink={0}>
                                Custom
                              </Badge>
                            )}

                            {snippet.reference && (
                              <Text
                                as="a"
                                href={snippet.reference}
                                target="_blank"
                                rel="noopener noreferrer"
                                fontSize="xs"
                                color={{ base: 'blue.600', _dark: 'blue.400' }}
                                _hover={{ textDecoration: 'underline' }}
                                noOfLines={1}
                                onClick={(e) => e.stopPropagation()}
                              >
                                Reference →
                              </Text>
                            )}
                          </HStack>

                          {/* Expand/Collapse button */}
                          <Box
                            onClick={(e) => {
                              e.stopPropagation()
                              setExpandedSnippet(isExpanded ? null : snippet.id)
                            }}
                            cursor="pointer"
                            fontSize="sm"
                            color={{ base: 'gray.500', _dark: 'gray.400' }}
                            _hover={{
                              color: { base: 'gray.700', _dark: 'gray.200' },
                              transform: 'scale(1.15)'
                            }}
                            p={0.5}
                            transition="all 0.2s"
                            lineHeight={1}
                          >
                            {isExpanded ? '▲' : '▼'}
                          </Box>
                        </HStack>
                      </Card.Footer>
                    </Card.Root>
                  )
                })}
              </Grid>
            )}
          </Box>
        </VStack>
      </Container>

      <SnippetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        snippet={editingSnippet}
        onSave={handleSaveSnippet}
      />

      <Toaster />
    </Box>
  )
}

export default PromptBuilder
