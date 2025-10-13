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
      position: "Staff Solutions Architect",
      duration: "June 2023 - Present",
      location: "Remote",
      description: "Solutions architect delivering GraphQL and observability expertise to enterprise customers. Expanded scope from technical consulting to strategic advisory and account management.",
      achievements: [
        "Served as Observability SME for Enterprise Solutions team—helped customers understand OpenTelemetry data from Apollo Router, customize telemetry export, and build effective dashboards",
        "Guided customers through 'what to measure' challenges—translating complex distributed systems into actionable metrics and alerts",
        "Led complex enterprise migrations including gateway-to-router transitions (6 weeks to production)",
        "Pioneered untested Progressive Override capabilities for large-scale monolithic graph migrations",
        "Supported high-stakes scenarios: election coverage during tech strikes, critical @shareable issues",
        "Drove adoption of enterprise features: OpenTelemetry customization, Custom Events, Coprocessor across major clients",
        "Contributed to internal enablement: SME program, pse-toolbox, documentation, and team knowledge sharing",
        "Provided global coverage from New Zealand to Poland/Italy supporting international customers"
      ],
      technologies: ["GraphQL", "Apollo Router", "Apollo Studio", "OpenTelemetry", "Datadog", "New Relic", "Rust", "Golang", "Ruby", "Rhai", "Progressive Override", "Platform API"]
    },
    {
      company: "New Relic",
      position: "Senior Solution Delivery Architect / Senior Partner Solutions Engineer",
      duration: "February 2022 - June 2023",
      location: "Remote",
      description: "Technical resource supporting partners in the observability ecosystem. Focused on partner enablement, pre-sales technical support, and building observability expertise across partner organizations.",
      achievements: [
        "Enabled partner technical teams on New Relic observability platform—training, certification, and technical depth",
        "Provided pre-sales support to partners for observability opportunities—solution design, technical validation, proof of concepts",
        "Developed partner demo environments showcasing distributed tracing, APM, infrastructure monitoring, and custom dashboards",
        "Created technical assessments and enablement content for partner organizations",
        "Collaborated across teams to enhance partner technical capabilities and joint customer value"
      ],
      technologies: ["New Relic One", "APM", "Distributed Tracing", "Infrastructure Monitoring", "OpenTelemetry", "Custom Dashboards", "Partner Enablement", "Pre-sales Engineering"]
    },
    {
      company: "New Relic",
      position: "Lead Software Engineer",
      duration: "September 2019 - February 2022",
      location: "Remote",
      description: "Team technical lead focused on platform programmability, observability agent architecture, and open source initiatives. Bridged product engineering with customer-facing solutions.",
      achievements: [
        "Lead engineer for Open Source Program Office (OSPO)—drove open source strategy and community engagement",
        "Founding member of Open Instrumentation Experience Team (Virtuoso)—built tools for easier observability adoption",
        "Architected CLI-driven automated agent installer framework—simplified instrumentation and onboarding for customers",
        "Early contributor to New Relic One Programmability platform—custom visualizations and integrations",
        "Mentored engineers on observability best practices, instrumentation patterns, and platform architecture"
      ],
      technologies: ["New Relic One", "OpenTelemetry", "APM Agents", "CLI Tools", "Open Source", "Instrumentation", "Custom Visualizations"]
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
    <Box id="experience" pt={0} pb={12} bg={{ base: 'white', _dark: 'gray.900' }}>
      <Container maxW="1200px">
        <VStack spacing={8}>
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