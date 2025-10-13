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
    <Box id="about" pt={12} pb={12} bg={{ base: 'white', _dark: 'gray.900' }}>
      <Container maxW="1200px">
        <VStack spacing={12}>
          <VStack textAlign="center">
            <Heading size="xl" color={{ base: 'gray.800', _dark: 'gray.100' }}>About Me</Heading>
            <Text fontSize="lg" color={{ base: 'gray.600', _dark: 'gray.400' }} maxW="600px">
              Technical problems fascinate me, but what really drives me is helping others solve them.
              I approach challenges as both detective and teacher—first figuring out what's *actually* blocking progress
              (architectural, organizational, or just unclear requirements), then helping teams build the understanding
              and capability to solve it themselves. After 15+ years moving between engineering, consulting, and
              customer-facing roles, I've learned that the best solutions come from understanding both the technical
              constraints and the people navigating them.
            </Text>
          </VStack>

          <SimpleGrid pt={12} columns={[1, null, 2]} spacing={12} w="full">
            <VStack align="start" spacing={6}>
              <Box pr={{ base: 0, md: 4 }}>
                <Heading size="md" mb={2} mt={2} color={{ base: 'gray.800', _dark: 'gray.100' }}>My Story</Heading>
                <VStack align="start" spacing={4}>
                  <Text color={{ base: 'gray.600', _dark: 'gray.400' }}>
                    I started in tech support, where I learned that we're all just end-users trying to get
                    things done and hoping for better digital experiences. That perspective stuck with me
                    through roles in database administration, web development, and engineering leadership.
                    Somewhere along the way, I realized the hardest problems weren't technical—they were
                    about people, process, and communication.
                  </Text>
                  <Text color={{ base: 'gray.600', _dark: 'gray.400' }}>
                    I've spent my career learning to spot when teams are stuck not on the code, but on
                    something else entirely. When I'm not working, you'll find me in the garden, on the
                    volleyball court, playing golf, or crafting cocktails—all reminders that sometimes
                    the best solutions come from stepping away and thinking differently.
                  </Text>
                </VStack>
              </Box>
            </VStack>

            <Box pl={{ base: 0, md: 4 }}>
              <Heading size="md" mb={2} mt={2} color={{ base: 'gray.800', _dark: 'gray.100' }}>What I Do</Heading>
              <VStack align="start" spacing={3}>
                <HStack>
                  <Text color="blue.500" fontSize="lg">🚀</Text>
                  <Text color={{ base: 'gray.600', _dark: 'gray.400' }}>GraphQL architecture & enterprise migrations</Text>
                </HStack>
                <HStack>
                  <Text color="blue.500" fontSize="lg">🏗️</Text>
                  <Text color={{ base: 'gray.600', _dark: 'gray.400' }}>Technical consulting & solution delivery</Text>
                </HStack>
                <HStack>
                  <Text color="blue.500" fontSize="lg">⚡</Text>
                  <Text color={{ base: 'gray.600', _dark: 'gray.400' }}>Performance optimization & observability</Text>
                </HStack>
                <HStack>
                  <Text color="blue.500" fontSize="lg">🔧</Text>
                  <Text color={{ base: 'gray.600', _dark: 'gray.400' }}>Platform engineering & API design</Text>
                </HStack>
                <HStack>
                  <Text color="blue.500" fontSize="lg">👥</Text>
                  <Text color={{ base: 'gray.600', _dark: 'gray.400' }}>Team leadership & technical mentoring</Text>
                </HStack>
                <HStack>
                  <Text color="blue.500" fontSize="lg">🌐</Text>
                  <Text color={{ base: 'gray.600', _dark: 'gray.400' }}>Global customer support & crisis management</Text>
                </HStack>
                <HStack>
                  <Text color="blue.500" fontSize="lg">🔍</Text>
                  <Text color={{ base: 'gray.600', _dark: 'gray.400' }}>Root cause analysis & problem diagnosis</Text>
                </HStack>
              </VStack>
            </Box>
          </SimpleGrid>

          <Box w="full">
            <Heading size="md" mb={6} mt={8} color={{ base: 'gray.800', _dark: 'gray.100' }}>Technical Skills</Heading>
            <SimpleGrid columns={[2, null, 4]} spacing={4}>
              {skills.map((skillGroup) => (
                <Box key={skillGroup.name}>
                  <Text fontWeight="semibold" color={{ base: 'blue.600', _dark: 'blue.400' }} mb={2}>
                    {skillGroup.name}
                  </Text>
                  <VStack align="start" spacing={1}>
                    {skillGroup.items.map((skill) => (
                      <Text key={skill} color={{ base: 'gray.600', _dark: 'gray.400' }} fontSize="sm">
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