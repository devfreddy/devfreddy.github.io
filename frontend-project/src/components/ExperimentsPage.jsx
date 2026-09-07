import { useState, useEffect } from 'react'
import { Box, Container, Heading, Text, VStack, Card, HStack, Badge } from '@chakra-ui/react'
import { useParams, useNavigate, Routes, Route } from 'react-router-dom'
import matter from 'gray-matter'
import { useColorMode } from './ui/color-mode'
import ExperimentRenderer from './ExperimentRenderer'
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
        const slug = path.split('/').pop().replace('.md', '')

        // Skip the welcome experiment
        if (slug === 'welcome-to-experiments') {
          continue
        }

        const content = await experiments[path]()
        const { data, content: markdown } = matter(content)

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

          {/* Welcome Section */}
          <Box
            bg={{ base: 'gray.50', _dark: 'gray.800' }}
            p={8}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
          >
            <VStack align="start" spacing={6}>
              <Box>
                <Heading
                  size="lg"
                  mb={4}
                  color={{ base: 'gray.800', _dark: 'gray.100' }}
                  fontWeight="semibold"
                >
                  Welcome to the Experiments Section
                </Heading>
                <Text
                  color={{ base: 'gray.700', _dark: 'gray.300' }}
                  lineHeight="tall"
                >
                  This is a new playground for trying out different frontend ideas, techniques, and creative explorations. Think of this as a laboratory where concepts evolve from ideas into tangible, interactive experiences.
                </Text>
              </Box>

              <Box>
                <Heading
                  size="sm"
                  mb={3}
                  color={{ base: 'gray.800', _dark: 'gray.100' }}
                  fontWeight="semibold"
                >
                  What You'll Find Here
                </Heading>
                <VStack align="start" spacing={2} pl={4}>
                  <Text color={{ base: 'gray.700', _dark: 'gray.300' }}>
                    <strong>Interactive Prototypes</strong> - Experimental UI components and interactions
                  </Text>
                  <Text color={{ base: 'gray.700', _dark: 'gray.300' }}>
                    <strong>Creative Coding</strong> - Visual experiments and generative art
                  </Text>
                  <Text color={{ base: 'gray.700', _dark: 'gray.300' }}>
                    <strong>New Technologies</strong> - Trying out cutting-edge web technologies and frameworks
                  </Text>
                  <Text color={{ base: 'gray.700', _dark: 'gray.300' }}>
                    <strong>Design Explorations</strong> - Testing new design patterns and user experiences
                  </Text>
                  <Text color={{ base: 'gray.700', _dark: 'gray.300' }}>
                    <strong>Performance Tests</strong> - Optimizing and benchmarking various approaches
                  </Text>
                </VStack>
              </Box>
            </VStack>
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
    <Box bg={{ base: 'white', _dark: 'gray.900' }} minH="100vh" w="100%">
      {/* Fixed header */}
      <Box position="sticky" top={0} bg={{ base: 'white', _dark: 'gray.900' }} borderBottomWidth="1px" borderColor={{ base: 'gray.200', _dark: 'gray.700' }} zIndex={10} pt={4} pb={4}>
        <Box px={{ base: 4, md: 8 }}>
          <Text
            fontSize="md"
            color={{ base: 'blue.600', _dark: 'blue.400' }}
            cursor="pointer"
            onClick={() => navigate('/experiments')}
            _hover={{ textDecoration: 'underline' }}
            fontWeight="medium"
          >
            ← Back to all experiments
          </Text>
        </Box>
      </Box>

      {/* Content area - layout determined by ExperimentRenderer based on frontmatter */}
      <Box w="100%" py={12}>
        <VStack spacing={12} align="stretch" px={{ base: 4, md: 8 }}>
          {/* Header Section */}
          <Container maxW="800px">
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
          </Container>

          {/* Experiment Content - rendered with custom layout support */}
          <ExperimentRenderer
            content={experiment.content}
            frontmatter={experiment.frontmatter}
            colorMode={colorMode}
          />
        </VStack>
      </Box>
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
