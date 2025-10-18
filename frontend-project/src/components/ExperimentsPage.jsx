import { useState, useEffect } from 'react'
import { Box, Container, Heading, Text, VStack, Card, HStack, Badge } from '@chakra-ui/react'
import { useParams, useNavigate, Routes, Route } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import matter from 'gray-matter'
import { useColorMode } from './ui/color-mode'
import GenerativeArt from './GenerativeArt'
import PromptBuilder from './PromptBuilder'
import './ExperimentsPage.css'

// Import all markdown files
const experiments = import.meta.glob('../experiments/*.md', { query: '?raw', import: 'default' })

const ExperimentsPage = () => {
  const navigate = useNavigate()
  const [experimentList, setExperimentList] = useState([])

  useEffect(() => {
    const loadExperiments = async () => {
      const experimentsData = []

      for (const path in experiments) {
        const content = await experiments[path]()
        const { data, content: markdown } = matter(content)
        const slug = path.split('/').pop().replace('.md', '')

        experimentsData.push({
          slug,
          title: data.title || 'Untitled',
          date: data.date || '',
          excerpt: data.excerpt || '',
          tags: data.tags || [],
          status: data.status || 'active', // active, archived, in-progress
          content: markdown,
          frontmatter: data
        })
      }

      // Sort by date, newest first
      experimentsData.sort((a, b) => new Date(b.date) - new Date(a.date))
      setExperimentList(experimentsData)
    }

    loadExperiments()
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return 'No date'

    // Add time to ensure consistent timezone handling
    const date = new Date(dateString + 'T00:00:00')

    if (isNaN(date.getTime())) {
      return 'Invalid Date'
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'green'
      case 'in-progress':
        return 'blue'
      case 'archived':
        return 'gray'
      default:
        return 'blue'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'in-progress':
        return 'In Progress'
      case 'archived':
        return 'Archived'
      default:
        return status
    }
  }

  return (
    <Box pt={20} pb={16} bg={{ base: 'white', _dark: 'gray.900' }} minH="100vh">
      <Container maxW="900px">
        <VStack spacing={12} align="stretch">
          {/* Hero Section */}
          <Box textAlign="center" mb={4}>
            <Heading
              size="3xl"
              mb={6}
              color={{ base: 'gray.800', _dark: 'gray.100' }}
              fontWeight="bold"
              letterSpacing="tight"
            >
              Experiments
            </Heading>
            <Text
              fontSize="xl"
              color={{ base: 'gray.600', _dark: 'gray.400' }}
              maxW="650px"
              mx="auto"
              lineHeight="tall"
            >
              A playground for frontend ideas, prototypes, and creative explorations
            </Text>
          </Box>

          {/* Experiments Grid */}
          {experimentList.length === 0 ? (
            <Box
              textAlign="center"
              py={16}
              px={4}
            >
              <Text
                fontSize="lg"
                color={{ base: 'gray.500', _dark: 'gray.500' }}
                mb={2}
              >
                No experiments yet
              </Text>
              <Text
                fontSize="md"
                color={{ base: 'gray.400', _dark: 'gray.600' }}
              >
                Check back soon for new experiments and ideas
              </Text>
            </Box>
          ) : (
            <VStack spacing={6} align="stretch">
              {experimentList.map((experiment) => (
                <Card.Root
                  key={experiment.slug}
                  cursor="pointer"
                  onClick={() => navigate(`/experiments/${experiment.slug}`)}
                  _hover={{
                    transform: 'translateY(-4px)',
                    shadow: 'xl',
                    borderColor: { base: 'blue.500', _dark: 'blue.400' }
                  }}
                  transition="all 0.3s ease"
                  borderWidth="1px"
                  borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
                >
                  <Card.Body p={8}>
                    <VStack align="start" spacing={4}>
                      <HStack justify="space-between" width="100%">
                        <Heading
                          size="xl"
                          color={{ base: 'gray.800', _dark: 'gray.100' }}
                          fontWeight="semibold"
                          letterSpacing="tight"
                        >
                          {experiment.title}
                        </Heading>
                        {experiment.status && (
                          <Badge
                            colorScheme={getStatusColor(experiment.status)}
                            variant="subtle"
                            px={3}
                            py={1}
                            fontSize="xs"
                            fontWeight="medium"
                          >
                            {getStatusLabel(experiment.status)}
                          </Badge>
                        )}
                      </HStack>

                      <HStack spacing={3} fontSize="sm" color={{ base: 'gray.500', _dark: 'gray.500' }}>
                        <Text>{formatDate(experiment.date)}</Text>
                      </HStack>

                      <Text
                        color={{ base: 'gray.600', _dark: 'gray.400' }}
                        fontSize="md"
                        lineHeight="tall"
                      >
                        {experiment.excerpt}
                      </Text>

                      {experiment.tags && experiment.tags.length > 0 && (
                        <HStack spacing={2} flexWrap="wrap">
                          {experiment.tags.map((tag) => (
                            <Badge
                              key={tag}
                              colorScheme="purple"
                              variant="subtle"
                              px={3}
                              py={1}
                              fontSize="xs"
                              fontWeight="medium"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </HStack>
                      )}
                    </VStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </VStack>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

const ExperimentDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [experiment, setExperiment] = useState(null)
  const [loading, setLoading] = useState(true)
  const { colorMode } = useColorMode()

  useEffect(() => {
    const loadExperiment = async () => {
      setLoading(true)
      try {
        const experimentPath = `../experiments/${slug}.md`
        const experimentLoader = experiments[experimentPath]

        if (!experimentLoader) {
          navigate('/experiments')
          return
        }

        const content = await experimentLoader()
        const { data, content: markdown } = matter(content)

        setExperiment({
          title: data.title || 'Untitled',
          date: data.date || '',
          tags: data.tags || [],
          status: data.status || 'active',
          content: markdown,
          frontmatter: data
        })
      } catch (error) {
        console.error('Error loading experiment:', error)
        navigate('/experiments')
      } finally {
        setLoading(false)
      }
    }

    loadExperiment()
  }, [slug, navigate])

  const formatDate = (dateString) => {
    if (!dateString) return 'No date'

    // Add time to ensure consistent timezone handling
    const date = new Date(dateString + 'T00:00:00')

    if (isNaN(date.getTime())) {
      return 'Invalid Date'
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'green'
      case 'in-progress':
        return 'blue'
      case 'archived':
        return 'gray'
      default:
        return 'blue'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'in-progress':
        return 'In Progress'
      case 'archived':
        return 'Archived'
      default:
        return status
    }
  }

  if (loading) {
    return (
      <Box pt={20} pb={12} bg={{ base: 'white', _dark: 'gray.900' }} minH="100vh">
        <Container maxW="800px">
          <Text>Loading...</Text>
        </Container>
      </Box>
    )
  }

  if (!experiment) {
    return null
  }

  return (
    <Box pt={20} pb={16} bg={{ base: 'white', _dark: 'gray.900' }} minH="100vh">
      <Container maxW="820px">
        <VStack spacing={12} align="stretch">
          {/* Header Section */}
          <Box>
            <Text
              fontSize="md"
              color={{ base: 'blue.600', _dark: 'blue.400' }}
              cursor="pointer"
              onClick={() => navigate('/experiments')}
              mb={8}
              _hover={{ textDecoration: 'underline' }}
              fontWeight="medium"
            >
              ← Back to all experiments
            </Text>

            <Heading
              size="3xl"
              mb={6}
              color={{ base: 'gray.900', _dark: 'gray.50' }}
              fontWeight="800"
              letterSpacing="tight"
              lineHeight="1.1"
            >
              {experiment.title}
            </Heading>

            <HStack spacing={4} mb={8} flexWrap="wrap">
              <Text fontSize="md" color={{ base: 'gray.500', _dark: 'gray.500' }} fontWeight="medium">
                {formatDate(experiment.date)}
              </Text>

              {experiment.status && (
                <Badge
                  colorScheme={getStatusColor(experiment.status)}
                  variant="subtle"
                  px={3}
                  py={1}
                  fontSize="sm"
                >
                  {getStatusLabel(experiment.status)}
                </Badge>
              )}

              {experiment.tags && experiment.tags.length > 0 && (
                <HStack spacing={2} flexWrap="wrap">
                  {experiment.tags.map((tag) => (
                    <Badge key={tag} colorScheme="purple" variant="subtle" px={3} py={1}>
                      {tag}
                    </Badge>
                  ))}
                </HStack>
              )}
            </HStack>
          </Box>

          {/* Experiment Content */}
          <Box className={`experiment-article ${colorMode === 'dark' ? 'dark-mode' : ''}`}>
            {experiment.content.split('\n').some(line =>
              line.trim() === '<GenerativeArt />' || line.trim() === '<PromptBuilder />'
            ) ? (
              // Render with component replacement
              <>
                {experiment.content.split(/(<GenerativeArt \/>|<PromptBuilder \/>)/g).map((part, index) => {
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
                })}
              </>
            ) : (
              // No components, render normally
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {experiment.content}
              </ReactMarkdown>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

const ExperimentsRouter = () => {
  return (
    <Routes>
      <Route index element={<ExperimentsPage />} />
      <Route path=":slug" element={<ExperimentDetail />} />
    </Routes>
  )
}

export default ExperimentsRouter
