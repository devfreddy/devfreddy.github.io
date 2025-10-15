import { useState, useEffect } from 'react'
import { Box, Container, Heading, Text, VStack, Card, HStack, Badge } from '@chakra-ui/react'
import { useParams, useNavigate, Routes, Route } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import matter from 'gray-matter'

// Import all markdown files
const posts = import.meta.glob('../musings/*.md', { query: '?raw', import: 'default' })

const MusingsPage = () => {
  const navigate = useNavigate()
  const [postList, setPostList] = useState([])

  useEffect(() => {
    const loadPosts = async () => {
      const postsData = []

      console.log('Available posts:', Object.keys(posts))

      for (const path in posts) {
        const content = await posts[path]()
        const { data, content: markdown } = matter(content)
        const slug = path.split('/').pop().replace('.md', '')

        console.log('Loading post:', slug, 'with data:', data)

        postsData.push({
          slug,
          title: data.title || 'Untitled',
          date: data.date || '',
          excerpt: data.excerpt || '',
          tags: data.tags || [],
          content: markdown,
          frontmatter: data
        })
      }

      // Sort by date, newest first
      postsData.sort((a, b) => new Date(b.date) - new Date(a.date))
      console.log('Final postList:', postsData)
      setPostList(postsData)
    }

    loadPosts()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200
    const wordCount = content.trim().split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return minutes
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
              Musings
            </Heading>
            <Text
              fontSize="xl"
              color={{ base: 'gray.600', _dark: 'gray.400' }}
              maxW="650px"
              mx="auto"
              lineHeight="tall"
            >
              Thoughts, learnings, and observations—thinking out loud about technology and collaboration
            </Text>
          </Box>

          {/* Blog Posts Grid */}
          {postList.length === 0 ? (
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
                No musings yet
              </Text>
              <Text
                fontSize="md"
                color={{ base: 'gray.400', _dark: 'gray.600' }}
              >
                Check back soon for new thoughts and ideas
              </Text>
            </Box>
          ) : (
            <VStack spacing={6} align="stretch">
              {postList.map((post) => (
                <Card.Root
                  key={post.slug}
                  cursor="pointer"
                  onClick={() => navigate(`/musings/${post.slug}`)}
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
                      <Heading
                        size="xl"
                        color={{ base: 'gray.800', _dark: 'gray.100' }}
                        fontWeight="semibold"
                        letterSpacing="tight"
                      >
                        {post.title}
                      </Heading>

                      <HStack spacing={3} fontSize="sm" color={{ base: 'gray.500', _dark: 'gray.500' }}>
                        <Text>{formatDate(post.date)}</Text>
                        <Text>•</Text>
                        <Text>{calculateReadingTime(post.content)} min read</Text>
                      </HStack>

                      <Text
                        color={{ base: 'gray.600', _dark: 'gray.400' }}
                        fontSize="md"
                        lineHeight="tall"
                      >
                        {post.excerpt}
                      </Text>

                      {post.tags && post.tags.length > 0 && (
                        <HStack spacing={2} flexWrap="wrap">
                          {post.tags.map((tag) => (
                            <Badge
                              key={tag}
                              colorScheme="blue"
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

const MusingPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true)
      try {
        const postPath = `../musings/${slug}.md`
        const postLoader = posts[postPath]

        if (!postLoader) {
          navigate('/musings')
          return
        }

        const content = await postLoader()
        const { data, content: markdown } = matter(content)

        setPost({
          title: data.title || 'Untitled',
          date: data.date || '',
          tags: data.tags || [],
          content: markdown,
          frontmatter: data
        })
      } catch (error) {
        console.error('Error loading post:', error)
        navigate('/musings')
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug, navigate])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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

  if (!post) {
    return null
  }

  return (
    <Box pt={20} pb={12} bg={{ base: 'white', _dark: 'gray.900' }} minH="100vh">
      <Container maxW="800px">
        <VStack spacing={8} align="stretch">
          <Box>
            <Text
              fontSize="sm"
              color={{ base: 'blue.600', _dark: 'blue.400' }}
              cursor="pointer"
              onClick={() => navigate('/musings')}
              mb={4}
              _hover={{ textDecoration: 'underline' }}
            >
              ← Back to all musings
            </Text>

            <Heading size="2xl" mb={4} color={{ base: 'gray.800', _dark: 'gray.100' }}>
              {post.title}
            </Heading>

            <HStack spacing={4} mb={6}>
              <Text fontSize="sm" color={{ base: 'gray.500', _dark: 'gray.500' }}>
                {formatDate(post.date)}
              </Text>

              {post.tags && post.tags.length > 0 && (
                <HStack spacing={2}>
                  {post.tags.map((tag) => (
                    <Badge key={tag} colorScheme="blue" variant="subtle">
                      {tag}
                    </Badge>
                  ))}
                </HStack>
              )}
            </HStack>
          </Box>

          <Box
            className="markdown-content"
            sx={{
              '& h1': { fontSize: '2xl', fontWeight: 'bold', mt: 8, mb: 4, color: { base: 'gray.800', _dark: 'gray.100' } },
              '& h2': { fontSize: 'xl', fontWeight: 'bold', mt: 6, mb: 3, color: { base: 'gray.800', _dark: 'gray.100' } },
              '& h3': { fontSize: 'lg', fontWeight: 'semibold', mt: 4, mb: 2, color: { base: 'gray.800', _dark: 'gray.100' } },
              '& p': { mb: 4, lineHeight: 1.7, color: { base: 'gray.600', _dark: 'gray.400' } },
              '& ul, & ol': { mb: 4, pl: 6, color: { base: 'gray.600', _dark: 'gray.400' } },
              '& li': { mb: 2 },
              '& code': {
                px: 1.5,
                py: 0.5,
                borderRadius: 'md',
                fontSize: 'sm',
                bg: { base: 'gray.100', _dark: 'gray.800' },
                color: { base: 'blue.600', _dark: 'blue.400' }
              },
              '& pre': {
                p: 4,
                borderRadius: 'md',
                mb: 4,
                overflowX: 'auto',
                bg: { base: 'gray.100', _dark: 'gray.800' }
              },
              '& pre code': {
                px: 0,
                py: 0,
                bg: 'transparent',
                color: { base: 'gray.800', _dark: 'gray.200' }
              },
              '& blockquote': {
                borderLeft: '4px solid',
                borderColor: { base: 'blue.500', _dark: 'blue.400' },
                pl: 4,
                py: 2,
                my: 4,
                fontStyle: 'italic',
                color: { base: 'gray.600', _dark: 'gray.400' }
              },
              '& a': {
                color: { base: 'blue.600', _dark: 'blue.400' },
                textDecoration: 'underline'
              }
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

const MusingsRouter = () => {
  return (
    <Routes>
      <Route index element={<MusingsPage />} />
      <Route path=":slug" element={<MusingPost />} />
    </Routes>
  )
}

export default MusingsRouter
