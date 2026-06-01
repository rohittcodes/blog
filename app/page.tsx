import Image from 'next/image'
import Link from 'next/link'
import { getBlogPosts, formatDate } from 'app/blog/utils'
import { PageBleed, Panel } from 'app/components/panel'

// ── Edit this data ────────────────────────────────────────────────────────
const ABOUT = {
  tagline: 'Building things for the web.',
  bio: "I'm a developer passionate about building clean, fast, and accessible web experiences. I enjoy working across the full stack and write about things I learn along the way.",
  location: 'India',
  email: 'rohittcodes@gmail.com',
  website: 'https://rohitt.codes',
}

const TECH_STACK = [
  'TypeScript', 'JavaScript', 'React', 'Next.js',
  'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Git',
  'Docker', 'Vercel', 'Python', 'REST APIs',
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

const PROJECTS: {
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

// ── Icons ─────────────────────────────────────────────────────────────────
import React from 'react'

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  )
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
    </svg>
  )
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  )
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
  )
}

const fg = 'text-[var(--foreground)]'
const muted = 'text-[var(--muted-foreground)]'
const hover = `${muted} hover:text-[var(--foreground)] transition-colors`

export default function Page() {
  const recentPosts = getBlogPosts()
    .sort((a, b) =>
      new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
    )
    .slice(0, 3)

  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageBleed>
        <div className="flex items-start gap-5 mb-6">
          <Image
            src="https://avatars.githubusercontent.com/rohittcodes"
            alt="Rohith Singh"
            width={96}
            height={96}
            className="rounded-full shrink-0"
            style={{ border: '3px solid var(--background)', outline: '1px solid var(--border)' }}
            priority
          />
          <div className="pt-1">
            <h1 className={`text-xl font-semibold tracking-tight mb-0.5 ${fg}`}>Rohith Singh</h1>
            <p className={`text-sm ${muted}`}>@rohittcodes</p>
            <p className={`text-sm mt-1.5 ${muted}`}>{ABOUT.tagline}</p>
          </div>
        </div>

        <div className={`flex flex-wrap gap-x-4 gap-y-1.5 text-xs mb-5 ${muted}`}>
          <span className="flex items-center gap-1.5">
            <MapPinIcon className="w-3.5 h-3.5" />{ABOUT.location}
          </span>
          <a href={`mailto:${ABOUT.email}`} className={`flex items-center gap-1.5 ${hover}`}>
            <MailIcon className="w-3.5 h-3.5" />{ABOUT.email}
          </a>
          <a href={ABOUT.website} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 ${hover}`}>
            <LinkIcon className="w-3.5 h-3.5" />rohitt.codes
          </a>
        </div>

        <div className="flex gap-3.5">
          {[
            { href: 'https://github.com/rohittcodes', label: 'GitHub', icon: <GitHubIcon className="w-4 h-4" /> },
            { href: 'https://x.com/rohittcodes', label: 'X / Twitter', icon: <XIcon className="w-4 h-4" /> },
            { href: `mailto:${ABOUT.email}`, label: 'Email', icon: <MailIcon className="w-4 h-4" /> },
          ].map(({ href, label, icon }) => (
            <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" aria-label={label} className={hover}>
              {icon}
            </a>
          ))}
        </div>
      </PageBleed>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <Panel title="About">
        <p className={`text-sm leading-relaxed ${fg}`}>{ABOUT.bio}</p>
      </Panel>

      {/* ── Tech Stack ───────────────────────────────────────────────────── */}
      <Panel title="Tech Stack">
        <div className="flex flex-wrap gap-1.5">
          {TECH_STACK.map((tech) => (
            <span key={tech} className={`px-2 py-0.5 text-[11px] rounded border border-[var(--border)] bg-[var(--muted)] ${muted}`}>
              {tech}
            </span>
          ))}
        </div>
      </Panel>

      {/* ── Experience ───────────────────────────────────────────────────── */}
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
                      <span key={t} className={`text-xs px-2 py-0.5 rounded bg-[var(--muted)] ${muted}`}>{t}</span>
                    ))}
                  </div>
                </div>
                <p className={`text-xs whitespace-nowrap mt-0.5 ${muted}`}>{job.period}</p>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {/* ── Projects ─────────────────────────────────────────────────────── */}
      {PROJECTS.length > 0 && (
        <Panel title="Projects">
          <div className="space-y-5">
            {PROJECTS.map((project, i) => (
              <a key={i} href={project.href} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-4">
                <div>
                  <p className={`text-sm font-medium mb-1 ${fg} group-hover:underline underline-offset-2`}>{project.name}</p>
                  <p className={`text-xs leading-relaxed mb-2.5 ${muted}`}>{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map(t => (
                      <span key={t} className={`text-xs px-2 py-0.5 rounded bg-[var(--muted)] ${muted}`}>{t}</span>
                    ))}
                  </div>
                </div>
                <ArrowUpRightIcon className={`w-3.5 h-3.5 mt-0.5 shrink-0 transition-colors ${muted} group-hover:text-[var(--foreground)]`} />
              </a>
            ))}
          </div>
        </Panel>
      )}

      {/* ── Blog Posts ───────────────────────────────────────────────────── */}
      <Panel
        title="Recent Posts"
        action={
          <Link href="/blog" className={`text-xs ${hover}`}>All posts →</Link>
        }
      >
        <div className="space-y-3.5">
          {recentPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex items-baseline justify-between gap-4">
              <p className={`text-sm ${fg} group-hover:${muted} transition-colors`}>{post.metadata.title}</p>
              <p className={`text-xs shrink-0 tabular-nums ${muted}`}>{formatDate(post.metadata.publishedAt, false)}</p>
            </Link>
          ))}
        </div>
      </Panel>

    </div>
  )
}
