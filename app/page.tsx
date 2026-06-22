import Image from 'next/image'
import Link from 'next/link'
import { getBlogPosts, formatDate } from 'app/blog/utils'
import { getProjects } from 'app/projects/utils'
import { PageBleed, Panel } from 'app/components/panel'
import { ProjectsList } from 'app/components/projects-list'
import { StackResume } from 'app/components/stack'
import { InfoColumns } from 'app/components/info-columns'
import {
  ArrowUpRight,
  Briefcase,
  Clock,
  Code,
  Github,
  ICON_STROKE,
  Lightbulb,
  Link2,
  Mail,
  MapPin,
  User,
  X,
} from 'app/components/icons'

// ── Edit this data ────────────────────────────────────────────────────────
const ABOUT = {
  tagline: 'AI-native engineer. Building for the web.',
  role: 'AI-native engineer',
  bio: "I'm Rohith Singh (@rohittcodes) — an AI-native engineer passionate about building full-stack web apps and AI-powered products. I work across the entire stack, from backend APIs to polished UIs, with a focus on integrating AI capabilities meaningfully. I write about TypeScript, React, Next.js, Rust, and what I learn building real things.",
  location: 'India',
  domain: 'rohitt.codes',
  email: 'rohittcodes@gmail.com',
  website: 'https://rohitt.codes',
  timezone: 'IST (UTC+5:30)',
  gender: 'Male',
  job: 'Full Stack Dev @CreatExp',
  founder: 'Founder @ Linea Labs',
}

const TECH_STACK: { label: string; items: string[] }[] = [
  {
    label: 'Language',
    items: ['TypeScript', 'JavaScript', 'Python'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    label: 'Backend & Database',
    items: ['Node.js', 'PostgreSQL', 'REST APIs'],
  },
  {
    label: 'Workflow & DevOps',
    items: ['Git', 'Docker', 'Vercel'],
  },
]

const EXPERIENCE: {
  role: string; company: string; companyHref?: string
  period: string; description: string; tech: string[]
}[] = [
  {
    role: 'Full Stack & AI Engineer',
    company: 'CreatExp',
    period: 'Sep 2024 – Present',
    description: 'Building full stack features and AI-powered experiences. Working across the entire product from backend APIs to frontend interfaces, with a focus on integrating AI capabilities into the core product.',
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'AI/ML'],
  },
]

const OPEN_SOURCE: {
  name: string; description: string; href: string; tech: string[]
}[] = [
  {
    name: 'codepilot',
    description: 'A multi-agent CLI tool built in Rust, powered by Swarms-rs and Composio. Lets you run coordinated AI agents from the terminal to automate dev workflows.',
    href: 'https://github.com/rohittcodes/codepilot',
    tech: ['Rust', 'Swarms-rs', 'Composio', 'MCP'],
  },
  {
    name: 'CodeMonkey.js',
    description: 'An interactive coding playground with an AI-integrated code editor. Learn and practice coding with real-time AI assistance and feedback.',
    href: 'https://github.com/rohittcodes/codemonkey.js',
    tech: ['JavaScript', 'AI', 'Code Editor'],
  },
]
// ─────────────────────────────────────────────────────────────────────────────

const fg = 'text-[var(--foreground)]'
const muted = 'text-[var(--muted-foreground)]'
const hover = 'link-muted'
const iconSm = 'w-4 h-4'
const iconProps = { className: iconSm, strokeWidth: ICON_STROKE, 'aria-hidden': true as const }

export default function Page() {
  const recentPosts = getBlogPosts()
    .sort((a, b) =>
      new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
    )
    .slice(0, 3)

  const projects = getProjects()

  return (
    <div>
      <PageBleed topDivider topDividerBorderless bleedX sectionClassName="py-0">
        <div className="hero-layout">
          <div className="hero-aside">
            <div className="hero-aside-inner">
              <div className="hero-aside-media">
                <Image
                  src="https://avatars.githubusercontent.com/rohittcodes"
                  alt="Rohith Singh"
                  fill
                  sizes="208px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <p className={`hero-handle text-sm ${muted}`}>@rohittcodes</p>
          </div>
          <div className="hero-main">
            <div className="hero-main-inner">
              <h1 className={`text-hero tracking-tight mb-1 ${fg}`}>Rohith Singh</h1>
              <p className={`text-sm ${muted}`}>{ABOUT.tagline}</p>
            </div>
          </div>
        </div>
      </PageBleed>
      <PageBleed topDivider sectionClassName="py-0">
        <InfoColumns
          left={[
            { id: 'job', icon: <Code {...iconProps} />, value: ABOUT.job },
            { id: 'founder', icon: <Lightbulb {...iconProps} />, value: ABOUT.founder },
            { id: 'role', icon: <Briefcase {...iconProps} />, value: ABOUT.role },
            { id: 'location', icon: <MapPin {...iconProps} />, value: ABOUT.location },
            {
              id: 'domain',
              icon: <Link2 {...iconProps} />,
              value: (
                <a
                  href={ABOUT.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={hover}
                >
                  {ABOUT.domain}
                </a>
              ),
            },
          ]}
          right={[
            { id: 'timezone', icon: <Clock {...iconProps} />, value: ABOUT.timezone },
            {
              id: 'email',
              icon: <Mail {...iconProps} />,
              value: (
                <a href={`mailto:${ABOUT.email}`} className={hover}>
                  {ABOUT.email}
                </a>
              ),
            },
            { id: 'gender', icon: <User {...iconProps} />, value: ABOUT.gender },
          ]}
        />
      </PageBleed>

      <PageBleed topBorder sectionClassName="py-2">
        <div className="flex gap-3.5">
          {[
            { href: 'https://github.com/rohittcodes', label: 'GitHub', icon: <Github {...iconProps} /> },
            { href: 'https://x.com/rohittcodes', label: 'X / Twitter', icon: <X {...iconProps} /> },
            { href: `mailto:${ABOUT.email}`, label: 'Email', icon: <Mail {...iconProps} /> },
          ].map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="link-muted has-tip"
              data-tip={label}
            >
              <span className="info-icon">
                <span className="info-icon-inner">{icon}</span>
              </span>
            </a>
          ))}
        </div>
      </PageBleed>

      <Panel title="About">
        <p className={`text-sm leading-relaxed ${fg}`}>{ABOUT.bio}</p>
      </Panel>

      <Panel
        title="Tech Stack"
        bodyClassName="column-sides max-w-2xl mx-auto px-6"
      >
        <StackResume categories={TECH_STACK} />
      </Panel>

      {EXPERIENCE.length > 0 && (
        <Panel title="Experience">
          <div className="space-y-7">
            {EXPERIENCE.map((job, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto] gap-x-4">
                <div>
                  <p className={`text-sm font-medium mb-0.5 ${fg}`}>{job.role}</p>
                  <p className={`text-xs mb-2.5 ${muted}`}>
                    {job.companyHref
                      ? <a href={job.companyHref} target="_blank" rel="noopener noreferrer" className={`underline underline-offset-2 ${hover}`}>{job.company}</a>
                      : job.company}
                  </p>
                  <p className={`text-xs leading-relaxed mb-3 ${muted}`}>{job.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.tech.map(t => (
                      <span key={t} className="tag-badge has-tip" data-tip={t}>{t}</span>
                    ))}
                  </div>
                </div>
                <p className={`text-xs whitespace-nowrap mt-0.5 ${muted}`}>{job.period}</p>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {projects.length > 0 && (
        <Panel
          title="Projects"
          action={
            <Link href="/projects" className={`text-xs ${hover}`}>All projects →</Link>
          }
        >
          <ProjectsList />
        </Panel>
      )}

      {OPEN_SOURCE.length > 0 && (
        <Panel title="Open Source">
          <div className="space-y-5">
            {OPEN_SOURCE.map((project, i) => (
              <a key={i} href={project.href} target="_blank" rel="noopener noreferrer" className="link-card group flex items-start justify-between gap-4">
                <div>
                  <p className={`link-card-title text-sm font-medium mb-1 ${fg}`}>{project.name}</p>
                  <p className={`text-xs leading-relaxed mb-2.5 ${muted}`}>{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map(t => (
                      <span key={t} className="tag-badge has-tip" data-tip={t}>{t}</span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight
                  className={`link-card-icon w-3.5 h-3.5 mt-0.5 shrink-0 ${muted}`}
                  strokeWidth={ICON_STROKE}
                  aria-hidden
                />
              </a>
            ))}
          </div>
        </Panel>
      )}

      <Panel
        title="Recent Posts"
        action={
          <Link href="/blog" className={`text-xs ${hover}`}>All posts →</Link>
        }
      >
        <div className="space-y-3.5">
          {recentPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="link-card group flex items-baseline justify-between gap-4">
              <p className={`link-card-title text-sm ${fg}`}>{post.metadata.title}</p>
              <p className={`text-xs shrink-0 tabular-nums ${muted}`}>{formatDate(post.metadata.publishedAt, false)}</p>
            </Link>
          ))}
        </div>
      </Panel>

    </div>
  )
}
