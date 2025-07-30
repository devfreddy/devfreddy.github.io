import { Box, Container, VStack, HStack, Heading, Text, SimpleGrid } from '@chakra-ui/react'

const AboutSection = () => {
  const skills = [
    { name: 'GraphQL & APIs', items: ['GraphQL', 'Apollo Router', 'Apollo Studio', 'Apollo Federation'] },
    { name: 'Languages', items: ['TypeScript/Javascript', 'Python', 'Golang'] },
    { name: 'Frontend', items: ['React', 'Vue.js', 'Next.js'] },
    { name: 'Backend & Runtime', items: ['Node.js', 'Express'] },
    { name: 'Databases', items: ['Redis', 'BigQuery', 'Snowflake'] },
    { name: 'Cloud & DevOps', items: ['AWS', 'CDK', 'Terraform', 'Kubernetes'] },
    { name: 'Observability', items: ['New Relic', 'Datadog', 'Open Telemetry', 'Metrics, Events, Logs, Traces'] },
    { name: 'Platforms', items: ['Looker', 'Stripe', 'Salesforce'] }
  ]

  return (
    <Box id="about" py={20} bg="white">
      <Container maxW="1200px">
        <VStack spacing={16}>
          <VStack spacing={4} textAlign="center">
            <Heading size="xl" color="gray.800">About Me</Heading>
            <Text fontSize="lg" color="gray.600" maxW="600px">
              I'm a passionate developer with 15+ years of experience building web applications 
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
                    new technologies. When I'm not coding, you can find me in the garden growing 
                    vegetables, on the volleyball court, hitting the golf course, or crafting cocktails.
                  </Text>
                </VStack>
              </Box>
            </VStack>

            <Box>
              <Heading size="md" mb={4} color="gray.800">What I Do</Heading>
              <VStack align="start" spacing={3}>
                <HStack>
                  <Text color="blue.500" fontSize="lg">🚀</Text>
                  <Text color="gray.600">GraphQL architecture & enterprise migrations</Text>
                </HStack>
                <HStack>
                  <Text color="blue.500" fontSize="lg">🏗️</Text>
                  <Text color="gray.600">Technical consulting & solution delivery</Text>
                </HStack>
                <HStack>
                  <Text color="blue.500" fontSize="lg">⚡</Text>
                  <Text color="gray.600">Performance optimization & observability</Text>
                </HStack>
                <HStack>
                  <Text color="blue.500" fontSize="lg">🔧</Text>
                  <Text color="gray.600">Platform engineering & API design</Text>
                </HStack>
                <HStack>
                  <Text color="blue.500" fontSize="lg">👥</Text>
                  <Text color="gray.600">Team leadership & technical mentoring</Text>
                </HStack>
                <HStack>
                  <Text color="blue.500" fontSize="lg">🌐</Text>
                  <Text color="gray.600">Global customer support & crisis management</Text>
                </HStack>
              </VStack>
            </Box>
          </SimpleGrid>

          <Box w="full">
            <Heading size="md" mb={4} color="gray.800">Technical Skills</Heading>
            <SimpleGrid columns={[2, null, 4]} spacing={4}>
              {skills.map((skillGroup) => (
                <Box key={skillGroup.name}>
                  <Text fontWeight="semibold" color="blue.600" mb={2}>
                    {skillGroup.name}
                  </Text>
                  <VStack align="start" spacing={1}>
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
        </VStack>
      </Container>
    </Box>
  )
}

export default AboutSection