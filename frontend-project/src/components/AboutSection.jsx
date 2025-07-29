import { Box, Container, VStack, HStack, Heading, Text, SimpleGrid } from '@chakra-ui/react'

const AboutSection = () => {
  const skills = [
    { name: 'Frontend', items: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS'] },
    { name: 'Backend', items: ['Node.js', 'Python', 'Express', 'FastAPI'] },
    { name: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'] },
    { name: 'Tools', items: ['Git', 'Docker', 'AWS', 'Vercel'] }
  ]

  return (
    <Box id="about" py={20} bg="white">
      <Container maxW="1200px">
        <VStack spacing={16}>
          <VStack spacing={4} textAlign="center">
            <Heading size="xl" color="gray.800">About Me</Heading>
            <Text fontSize="lg" color="gray.600" maxW="600px">
              I'm a passionate developer with 5+ years of experience building web applications 
              that solve real-world problems and deliver exceptional user experiences.
            </Text>
          </VStack>

          <SimpleGrid columns={[1, null, 2]} spacing={12} w="full">
            <VStack align="start" spacing={6}>
              <Box>
                <Heading size="md" mb={4} color="gray.800">My Story</Heading>
                <VStack align="start" spacing={4}>
                  <Text color="gray.600">
                    Started my journey in computer science with a fascination for how code 
                    can transform ideas into reality. Over the years, I've worked with startups 
                    and established companies, building everything from simple landing pages 
                    to complex full-stack applications.
                  </Text>
                  <Text color="gray.600">
                    I believe in writing clean, maintainable code and am always eager to learn 
                    new technologies. When I'm not coding, you can find me contributing to 
                    open-source projects or sharing knowledge with the developer community.
                  </Text>
                </VStack>
              </Box>
              
              <Box>
                <Heading size="md" mb={4} color="gray.800">What I Do</Heading>
                <VStack align="start" spacing={3}>
                  <HStack>
                    <Text color="blue.500" fontSize="lg">💻</Text>
                    <Text color="gray.600">Full-stack web development</Text>
                  </HStack>
                  <HStack>
                    <Text color="blue.500" fontSize="lg">🎨</Text>
                    <Text color="gray.600">UI/UX design implementation</Text>
                  </HStack>
                  <HStack>
                    <Text color="blue.500" fontSize="lg">⚡</Text>
                    <Text color="gray.600">Performance optimization</Text>
                  </HStack>
                </VStack>
              </Box>
            </VStack>

            <Box>
              <Heading size="md" mb={6} color="gray.800">Technical Skills</Heading>
              <SimpleGrid columns={2} spacing={6}>
                {skills.map((skillGroup) => (
                  <Box key={skillGroup.name}>
                    <Text fontWeight="semibold" color="blue.600" mb={3}>
                      {skillGroup.name}
                    </Text>
                    <VStack align="start" spacing={2}>
                      {skillGroup.items.map((skill) => (
                        <Text key={skill} color="gray.600" fontSize="sm">
                          • {skill}
                        </Text>
                      ))}
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default AboutSection