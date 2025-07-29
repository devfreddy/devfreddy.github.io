import { 
  Box, 
  Container, 
  VStack, 
  HStack, 
  Heading, 
  Text, 
  SimpleGrid, 
  Button, 
  Badge, 
  Link
} from '@chakra-ui/react'

// Custom Card components for Chakra UI v3
const Card = ({ children, ...props }) => (
  <Box 
    bg="white" 
    borderRadius="lg" 
    overflow="hidden" 
    boxShadow="md" 
    {...props}
  >
    {children}
  </Box>
)

const CardBody = ({ children, ...props }) => (
  <Box p={6} {...props}>
    {children}
  </Box>
)

const ProjectsSection = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with user authentication, payment processing, and admin dashboard.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates, team workspaces, and deadline tracking.",
      image: "/api/placeholder/400/250",
      technologies: ["Vue.js", "Express", "PostgreSQL", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather application with location-based forecasts, interactive maps, and weather alerts.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "TypeScript", "OpenWeather API", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "Portfolio Website",
      description: "Responsive portfolio website with modern design, smooth animations, and optimized performance.",
      image: "/api/placeholder/400/250",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ]

  return (
    <Box id="projects" py={20} bg="gray.50">
      <Container maxW="1200px">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="xl" color="gray.800">Featured Projects</Heading>
            <Text fontSize="lg" color="gray.600" maxW="600px">
              Here are some of my recent projects that showcase my skills in 
              full-stack development, UI/UX design, and problem-solving.
            </Text>
          </VStack>

          <Box 
            display="grid" 
            gridTemplateColumns={["1fr", null, "1fr 1fr"]} 
            gap={8}
            w="full"
          >
            {projects.map((project, index) => (
              <Card 
                key={index}
                overflow="hidden"
                _hover={{ transform: 'translateY(-8px)', boxShadow: 'xl' }}
                transition="all 0.3s"
                bg="white"
                borderRadius="lg"
                position="relative"
                h="fit-content"
              >
                {project.featured && (
                  <Badge
                    position="absolute"
                    top={3}
                    right={3}
                    colorScheme="blue"
                    variant="solid"
                    zIndex={1}
                  >
                    Featured
                  </Badge>
                )}
                
                <CardBody>
                  <VStack align="start" spacing={4}>
                    <Heading size="md" color="gray.800">
                      {project.title}
                    </Heading>
                    
                    <Text color="gray.600" fontSize="sm">
                      {project.description}
                    </Text>
                    
                    <HStack wrap="wrap" spacing={2}>
                      {project.technologies.map((tech, techIndex) => {
                        const colors = ['blue', 'purple', 'green', 'orange', 'teal', 'pink'];
                        const colorScheme = colors[techIndex % colors.length];
                        return (
                          <Badge 
                            key={tech} 
                            variant="solid" 
                            colorScheme={colorScheme}
                            fontSize="xs"
                            px={2}
                            py={1}
                          >
                            {tech}
                          </Badge>
                        );
                      })}
                    </HStack>
                    
                    <HStack spacing={3} pt={2}>
                      <Button
                        as={Link}
                        href={project.liveUrl}
                        size="sm"
                        colorScheme="blue"
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        👁️ Live Demo
                      </Button>
                      <Button
                        as={Link}
                        href={project.githubUrl}
                        size="sm"
                        variant="outline"
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        📁 Code
                      </Button>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </Box>
          
          <Button
            size="lg"
            variant="outline"
            colorScheme="blue"
            _hover={{ bg: 'blue.50' }}
          >
            View All Projects
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}

export default ProjectsSection