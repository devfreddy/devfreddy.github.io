import { 
  Box, 
  Container, 
  VStack, 
  HStack, 
  Heading, 
  Text, 
  Card, 
  CardBody,
  Badge
} from '@chakra-ui/react'

const ExperienceSection = () => {
  const experiences = [
    {
      company: "Tech Startup Inc.",
      position: "Senior Full Stack Developer",
      duration: "2022 - Present",
      location: "Remote",
      description: "Led development of core platform features, mentored junior developers, and implemented CI/CD pipelines that reduced deployment time by 60%.",
      achievements: [
        "Built scalable microservices architecture serving 100k+ users",
        "Reduced page load times by 40% through performance optimization",
        "Mentored 3 junior developers and established code review processes"
      ],
      technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker"]
    },
    {
      company: "Digital Agency Co.",
      position: "Full Stack Developer",
      duration: "2020 - 2022",
      location: "San Francisco, CA",
      description: "Developed custom web applications for clients across various industries, from e-commerce platforms to content management systems.",
      achievements: [
        "Delivered 20+ client projects on time and under budget",
        "Improved client retention rate by 35% through quality deliverables",
        "Introduced automated testing, reducing bugs by 50%"
      ],
      technologies: ["Vue.js", "Python", "Django", "PostgreSQL", "Redis"]
    },
    {
      company: "Local Web Solutions",
      position: "Junior Developer",
      duration: "2019 - 2020",
      location: "Austin, TX",
      description: "Started my professional journey building websites for small businesses and learning the fundamentals of modern web development.",
      achievements: [
        "Developed responsive websites for 15+ small businesses",
        "Learned modern frameworks and best practices",
        "Contributed to open-source projects"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "WordPress", "PHP"]
    }
  ]

  const education = [
    {
      institution: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      duration: "2015 - 2019",
      location: "Austin, TX",
      highlights: ["Dean's List for 3 consecutive semesters", "Computer Science Club President"]
    }
  ]

  return (
    <Box id="experience" py={20} bg="white">
      <Container maxW="1200px">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="xl" color="gray.800">Experience & Education</Heading>
            <Text fontSize="lg" color="gray.600" maxW="600px">
              My professional journey and the experiences that have shaped me as a developer.
            </Text>
          </VStack>

          <Box w="full">
            <Heading size="lg" color="gray.800" mb={8}>Work Experience</Heading>
            <VStack spacing={6} align="stretch">
              {experiences.map((exp, index) => (
                <Card key={index} variant="outline" bg="gray.50">
                  <CardBody>
                    <VStack align="start" spacing={4}>
                      <HStack justify="space-between" w="full" wrap="wrap">
                        <VStack align="start" spacing={1}>
                          <Heading size="md" color="blue.600">
                            {exp.position}
                          </Heading>
                          <Text fontWeight="semibold" color="gray.700">
                            {exp.company}
                          </Text>
                        </VStack>
                        <VStack align="end" spacing={1}>
                          <Badge colorScheme="blue" variant="subtle">
                            {exp.duration}
                          </Badge>
                          <Text fontSize="sm" color="gray.500">
                            {exp.location}
                          </Text>
                        </VStack>
                      </HStack>
                      
                      <Text color="gray.600">
                        {exp.description}
                      </Text>
                      
                      <Box>
                        <Text fontWeight="semibold" color="gray.700" mb={2}>
                          Key Achievements:
                        </Text>
                        <VStack align="start" spacing={1}>
                          {exp.achievements.map((achievement, i) => (
                            <Text key={i} fontSize="sm" color="gray.600">
                              • {achievement}
                            </Text>
                          ))}
                        </VStack>
                      </Box>
                      
                      <HStack wrap="wrap" spacing={2}>
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" colorScheme="gray">
                            {tech}
                          </Badge>
                        ))}
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </Box>

          <Box w="full" h="1px" bg="gray.200" />

          <Box w="full">
            <Heading size="lg" color="gray.800" mb={8}>Education</Heading>
            <VStack spacing={6} align="stretch">
              {education.map((edu, index) => (
                <Card key={index} variant="outline" bg="blue.50">
                  <CardBody>
                    <HStack justify="space-between" w="full" wrap="wrap">
                      <VStack align="start" spacing={1}>
                        <Heading size="md" color="blue.600">
                          {edu.degree}
                        </Heading>
                        <Text fontWeight="semibold" color="gray.700">
                          {edu.institution}
                        </Text>
                        {edu.highlights && (
                          <VStack align="start" spacing={1} mt={2}>
                            {edu.highlights.map((highlight, i) => (
                              <Text key={i} fontSize="sm" color="gray.600">
                                • {highlight}
                              </Text>
                            ))}
                          </VStack>
                        )}
                      </VStack>
                      <VStack align="end" spacing={1}>
                        <Badge colorScheme="blue" variant="subtle">
                          {edu.duration}
                        </Badge>
                        <Text fontSize="sm" color="gray.500">
                          {edu.location}
                        </Text>
                      </VStack>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default ExperienceSection