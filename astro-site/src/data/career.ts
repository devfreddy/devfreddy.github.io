export interface Role {
  title: string
  start: string // ISO yyyy-mm
  end: string | null // null = current
  location: string
  summary: string
  highlights: string[]
  tech: string[]
}

export interface Employer {
  company: string
  roles: Role[]
}

// Newest first — resume reading order. The waterfall lays these on a shared
// time axis, so bar width is tenure and the company row is the parent span.
export const employers: Employer[] = [
  {
    company: 'LangChain',
    roles: [
      {
        title: 'Deployed Architect',
        start: '2026-03',
        end: null,
        location: 'Remote',
        summary:
          'Professional services: AI engineering alongside customer teams, with LangSmith for agent observability and evaluation.',
        highlights: [
          'Customer-facing AI engineering on the professional services team',
          'Agent tracing and evaluation with LangSmith, from prototype through production',
        ],
        tech: ['LangSmith', 'AI Engineering', 'Observability'],
      },
    ],
  },
  {
    company: 'Apollo GraphQL',
    roles: [
      {
        title: 'Staff Solutions Architect',
        start: '2023-06',
        end: '2026-03',
        location: 'Remote',
        summary:
          'GraphQL and observability expertise for enterprise customers, expanding from technical consulting into strategic advisory and account management.',
        highlights: [
          'Observability SME for the Enterprise Solutions team: helping customers read OpenTelemetry data from Apollo Router, customize telemetry export, and build dashboards that answer real questions',
          'Led enterprise migrations including gateway to router transitions, six weeks to production',
          'Pioneered untested Progressive Override capabilities for large monolithic graph migrations',
          'Supported high-stakes scenarios: election coverage during tech strikes, critical @shareable issues',
          'Global coverage from New Zealand to Poland and Italy',
        ],
        tech: ['GraphQL', 'Apollo Router', 'OpenTelemetry', 'Datadog', 'New Relic', 'Rust', 'Golang', 'Rhai'],
      },
    ],
  },
  {
    company: 'New Relic',
    roles: [
      {
        title: 'Senior Solution Delivery Architect / Partner Solutions Engineer',
        start: '2022-02',
        end: '2023-06',
        location: 'Remote',
        summary:
          'Technical resource for partners in the observability ecosystem: enablement, pre-sales support, and building observability depth across partner organizations.',
        highlights: [
          'Trained and certified partner technical teams on the observability platform',
          'Solution design, technical validation, and proofs of concept for partner opportunities',
          'Built partner demo environments covering distributed tracing, APM, and infrastructure monitoring',
        ],
        tech: ['New Relic One', 'APM', 'Distributed Tracing', 'OpenTelemetry'],
      },
      {
        title: 'Lead Software Engineer',
        start: '2019-09',
        end: '2022-02',
        location: 'Remote',
        summary:
          'Team technical lead across platform programmability, observability agent architecture, and open source.',
        highlights: [
          'Lead engineer for the Open Source Program Office, driving strategy and community engagement',
          'Founding member of the Open Instrumentation Experience team',
          'Architected a CLI-driven automated agent installer framework, simplifying customer onboarding',
          'Early contributor to New Relic One programmability: custom visualizations and integrations',
        ],
        tech: ['New Relic One', 'OpenTelemetry', 'APM Agents', 'CLI Tools', 'Open Source'],
      },
    ],
  },
  {
    company: 'Masterworks',
    roles: [
      {
        title: 'Software Engineering Lead / Manager',
        start: '2019-01',
        end: '2019-08',
        location: 'Remote',
        summary: 'Architect, engineer, systems advisor, and team manager at a full-service marketing agency.',
        highlights: [
          'Built an application for direct-mail business process optimization',
          'Managed and mentored a remote team of six technologists',
          'Owned full SDLC including business and product requirements',
        ],
        tech: ['AWS', 'React', 'Vue', 'GraphQL'],
      },
      {
        title: 'Senior Software Engineer',
        start: '2017-12',
        end: '2019-01',
        location: 'Remote',
        summary: 'Business intelligence platforms and client-facing portals for agency operations.',
        highlights: [
          'Helped design and deploy the business intelligence platform',
          'Built the client-facing portal exposing BI capabilities',
          'Set up and maintained cloud infrastructure and CI/CD pipelines',
        ],
        tech: ['AWS', 'BigQuery', 'Express', 'React', 'CircleCI', 'Looker'],
      },
    ],
  },
  {
    company: 'CURE International',
    roles: [
      {
        title: 'Senior Web Developer',
        start: '2013-01',
        end: '2017-07',
        location: 'Lemoyne, PA',
        summary:
          'Technology lead for marketing, fundraising, donor support, and communications at a non-profit operating in 29 countries.',
        highlights: [
          'Point of contact for all marketing and fundraising technology',
          'Built and maintained donor management and communication systems',
          'Custom integrations with Salesforce and payment processing',
        ],
        tech: ['PHP', 'Node.js', 'Python', 'Salesforce', 'New Relic', 'Stripe'],
      },
      {
        title: 'Database Administrator & IT Lead',
        start: '2011-04',
        end: '2013-01',
        location: 'Lemoyne, PA',
        summary: 'Database administration and IT leadership for an international non-profit healthcare organization.',
        highlights: [
          'Managed database systems supporting global operations',
          'Led IT infrastructure and system administration',
          'Supported technology needs across 29 international locations',
        ],
        tech: ['Database Administration', 'IT Infrastructure'],
      },
    ],
  },
  {
    company: 'Mzinga',
    roles: [
      {
        title: 'Technical Solutions Engineer',
        start: '2008-10',
        end: '2011-04',
        location: 'Remote',
        summary:
          'Technical support for enterprise social software alongside custom ETL development for e-learning platforms.',
        highlights: [
          'Supported course authoring tools and the LMS for enterprise clients',
          'Authored custom ETL processes for customer data integration',
          'Built automated reporting solutions',
        ],
        tech: ['ETL', 'SQL', 'PL/SQL', 'Bash', 'Python', 'Java'],
      },
    ],
  },
]

export const skills = [
  { group: 'GraphQL & APIs', items: ['GraphQL', 'Apollo Router', 'Apollo Studio', 'Federation'] },
  { group: 'Languages', items: ['TypeScript', 'Python', 'Go'] },
  { group: 'Frontend', items: ['React', 'Vue', 'Next.js'] },
  { group: 'Backend', items: ['Node.js', 'Express'] },
  { group: 'Data', items: ['Redis', 'BigQuery', 'Snowflake'] },
  { group: 'Cloud & DevOps', items: ['AWS', 'CDK', 'Terraform', 'Kubernetes'] },
  { group: 'Observability', items: ['OpenTelemetry', 'New Relic', 'Datadog'] },
  { group: 'Platforms', items: ['Looker', 'Stripe', 'Salesforce'] },
]

export const education = {
  institution: 'Messiah College',
  degree: 'BSc Computer Science',
  start: '2004-09',
  end: '2008-05',
  location: 'Grantham, PA',
}

/** Months since epoch, for laying spans on a shared axis. */
export const toMonths = (iso: string) => {
  const [y, m] = iso.split('-').map(Number)
  return y * 12 + (m - 1)
}

export const nowMonths = () => {
  const d = new Date()
  return d.getFullYear() * 12 + d.getMonth()
}

export const formatRange = (start: string, end: string | null) => {
  const fmt = (iso: string) => {
    const [y, m] = iso.split('-').map(Number)
    return new Date(y, m - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }
  return `${fmt(start)} – ${end ? fmt(end) : 'present'}`
}

export const durationLabel = (start: string, end: string | null) => {
  const months = (end ? toMonths(end) : nowMonths()) - toMonths(start)
  const y = Math.floor(months / 12)
  const m = months % 12
  if (y && m) return `${y}y ${m}m`
  if (y) return `${y}y`
  return `${m}m`
}
