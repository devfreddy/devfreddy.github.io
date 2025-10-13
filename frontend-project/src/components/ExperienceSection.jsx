import { 
  Box, 
  Container, 
  VStack, 
  HStack, 
  Heading, 
  Text, 
  Badge
} from '@chakra-ui/react'

// Custom Card components for Chakra UI v3
const Card = ({ children, ...props }) => (
  <Box
    bg={{ base: 'white', _dark: 'gray.800' }}
    borderRadius="lg"
    border="1px"
    borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
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

const ExperienceSection = () => {
  const experiences = [
    {
      company: "Apollo GraphQL",
      position: "Senior Professional Services Engineer",
      duration: "June 2023 - Present",
      location: "Remote",
      description: "Senior consultant delivering GraphQL solutions and driving customer success for enterprise clients across multiple industries and time zones.",
      achievements: [
        "Led complex customer migrations including enterprise gateway-to-router transitions (6 weeks to production)",
        "Pioneered untested Progressive Override capabilities for large-scale monolithic graph migrations",
        "Supported high-stakes scenarios: election coverage during tech strikes, critical @shareable issues",
        "Drove adoption of Enterprise Apollo features: Custom Events, Coprocessor, Observability across major clients",
        "Contributed to internal enablement: SME program, pse-toolbox, documentation, and team knowledge sharing",
        "Provided global coverage from New Zealand to Poland/Italy supporting international enterprise customers"
      ],
      technologies: ["GraphQL", "Apollo Router", "Apollo Studio", "Rust", "Golang", "Ruby", "Rhai", "Progressive Override", "Datadog", "Platform API"]
    },
    {
      company: "New Relic",
      position: "Senior Solution Delivery Architect / Senior Partner Solutions Engineer",
      duration: "February 2022 - June 2023",
      location: "Remote",
      description: "Technical resource supporting technical and go-to-market initiatives for partners in the observability platform space.",
      achievements: [
        "Ensured successful onboarding, training, and certification of partner technical resources",
        "Provided pre-sales support to partners for active opportunities",
        "Developed partner demo environments, technical assessments, and enablement content",
        "Collaborated internally to support partner technical initiatives and enhance value"
      ],
      technologies: ["New Relic One", "Observability", "Partner Enablement", "Pre-sales Engineering"]
    },
    {
      company: "New Relic",
      position: "Lead Software Engineer",
      duration: "September 2019 - February 2022",
      location: "Remote",
      description: "Team technical lead, architect, mentor, and innovator focused on platform programmability and open source initiatives.",
      achievements: [
        "Early adopter and contributor to New Relic One Programmability platform",
        "Lead engineer for the Open Source Program Office (OSPO)",
        "Founding member of Open Instrumentation Experience Team (Virtuoso)",
        "Architected CLI-driven automated agent installer framework and onboarding UI"
      ],
      technologies: ["New Relic One", "CLI Tools", "Open Source", "Agent Architecture"]
    },
    {
      company: "Masterworks",
      position: "Software Engineering Lead/Manager",
      duration: "January 2019 - August 2019",
      location: "Remote",
      description: "Full-service marketing agency role as architect, engineer, system operations advisor, and team manager.",
      achievements: [
        "Developed application for direct-mail business process optimization",
        "Managed and mentored a remote team of 6 technologists",
        "Managed full SDLC including business and product requirements",
        "Led multiple contractor teams in application delivery"
      ],
      technologies: ["AWS", "ReactJS", "VueJS", "GraphQL", "Team Management"]
    },
    {
      company: "Masterworks",
      position: "Senior Software Engineer",
      duration: "December 2017 - January 2019",
      location: "Remote",
      description: "Built business intelligence platforms and client-facing portals for marketing agency operations.",
      achievements: [
        "Assisted in designing and deploying business intelligence platform",
        "Built robust client-facing portal exposing BI capabilities", 
        "Setup and maintained cloud infrastructures and CI/CD pipelines",
        "Managed multiple contractor teams delivering applications"
      ],
      technologies: ["AWS", "BigQuery", "ExpressJS", "ReactJS", "CircleCI", "Looker"]
    },
    {
      company: "CURE International",
      position: "Senior Web Developer",
      duration: "January 2013 - July 2017",
      location: "Lemoyne, PA",
      description: "Technology lead for marketing, fundraising, donor support, and communications systems at international non-profit operating in 29 countries.",
      achievements: [
        "Served as technology point of contact for all marketing and fundraising technology",
        "Developed and maintained donor management and communication systems",
        "Implemented monitoring and performance optimization across platforms",
        "Built custom integrations with Salesforce and payment processing systems"
      ],
      technologies: ["PHP", "Node.js", "Python", "Salesforce", "New Relic", "Stripe"]
    },
    {
      company: "CURE International", 
      position: "Database Administrator & IT Lead",
      duration: "April 2011 - January 2013",
      location: "Lemoyne, PA",
      description: "Database administration and IT leadership for international non-profit healthcare organization.",
      achievements: [
        "Managed database systems supporting global operations",
        "Led IT infrastructure and system administration initiatives",
        "Supported technology needs across 29 international locations"
      ],
      technologies: ["Database Administration", "IT Infrastructure", "System Administration"]
    },
    {
      company: "Mzinga",
      position: "Technical Solutions Engineer", 
      duration: "October 2008 - April 2011",
      location: "Remote",
      description: "Dual role providing technical support for enterprise social software solutions and developing custom ETL processes for e-learning platforms.",
      achievements: [
        "Provided technical support for e-learning course authoring tools and LMS",
        "Authored custom ETL processes for customer data integration",
        "Developed advanced automated reporting solutions for customers",
        "Supported enterprise clients in learning, marketing, and support markets"
      ],
      technologies: ["ETL", "SQL", "PL/SQL", "Bash", "Python", "Java"]
    }
  ]

  const education = [
    {
      institution: "Messiah College",
      degree: "Bachelor of Science in Computer Science", 
      duration: "2004 - 2008",
      location: "Grantham, PA",
      highlights: []
    }
  ]

  return (
    <Box id="experience" py={20} bg={{ base: 'white', _dark: 'gray.900' }}>
      <Container maxW="1200px">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="xl" color={{ base: 'gray.800', _dark: 'gray.100' }}>Experience & Education</Heading>
            <Text fontSize="lg" color={{ base: 'gray.600', _dark: 'gray.400' }} maxW="600px">
              My professional journey and the experiences that have shaped me as a developer.
            </Text>
          </VStack>

          <Box w="full">
            <Heading size="lg" color={{ base: 'gray.800', _dark: 'gray.100' }} mb={8}>Work Experience</Heading>
            <VStack spacing={6} align="stretch">
              {experiences.map((exp, index) => (
                <Card key={index} variant="outline" bg={{ base: 'gray.50', _dark: 'gray.800' }}>
                  <CardBody>
                    <VStack align="start" spacing={4}>
                      <HStack justify="space-between" w="full" wrap="wrap">
                        <VStack align="start" spacing={1}>
                          <Heading size="md" color={{ base: 'blue.600', _dark: 'blue.400' }}>
                            {exp.position}
                          </Heading>
                          <Text fontWeight="semibold" color={{ base: 'gray.700', _dark: 'gray.300' }}>
                            {exp.company}
                          </Text>
                        </VStack>
                        <VStack align="end" spacing={1}>
                          <Badge colorScheme="blue" variant="solid" bg="blue.500" color="white">
                            {exp.duration}
                          </Badge>
                          <Text fontSize="sm" color={{ base: 'gray.500', _dark: 'gray.400' }}>
                            {exp.location}
                          </Text>
                        </VStack>
                      </HStack>

                      <Text color={{ base: 'gray.600', _dark: 'gray.400' }}>
                        {exp.description}
                      </Text>

                      <Box>
                        <Text fontWeight="semibold" color={{ base: 'gray.700', _dark: 'gray.300' }} mb={2}>
                          Key Achievements:
                        </Text>
                        <VStack align="start" spacing={1}>
                          {exp.achievements.map((achievement, i) => (
                            <Text key={i} fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.400' }}>
                              • {achievement}
                            </Text>
                          ))}
                        </VStack>
                      </Box>
                      
                      <HStack wrap="wrap" spacing={2}>
                        {exp.technologies.map((tech, techIndex) => {
                          const colors = ['purple', 'green', 'orange', 'teal', 'pink', 'cyan'];
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
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </Box>

          <Box w="full" h="1px" bg={{ base: 'gray.200', _dark: 'gray.700' }} />

          <Box w="full">
            <Heading size="lg" color={{ base: 'gray.800', _dark: 'gray.100' }} mb={8}>Education</Heading>
            <VStack spacing={6} align="stretch">
              {education.map((edu, index) => (
                <Card key={index} variant="outline" bg={{ base: 'blue.50', _dark: 'gray.800' }}>
                  <CardBody>
                    <HStack justify="space-between" w="full" wrap="wrap">
                      <VStack align="start" spacing={1}>
                        <Heading size="md" color={{ base: 'blue.600', _dark: 'blue.400' }}>
                          {edu.degree}
                        </Heading>
                        <Text fontWeight="semibold" color={{ base: 'gray.700', _dark: 'gray.300' }}>
                          {edu.institution}
                        </Text>
                        {edu.highlights && (
                          <VStack align="start" spacing={1} mt={2}>
                            {edu.highlights.map((highlight, i) => (
                              <Text key={i} fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.400' }}>
                                • {highlight}
                              </Text>
                            ))}
                          </VStack>
                        )}
                      </VStack>
                      <VStack align="end" spacing={1}>
                        <Badge colorScheme="green" variant="solid" bg="green.500" color="white">
                          {edu.duration}
                        </Badge>
                        <Text fontSize="sm" color={{ base: 'gray.500', _dark: 'gray.400' }}>
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