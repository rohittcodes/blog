import type { SVGProps } from 'react'
import { createLucideIcon } from 'lucide-react'

export {
  ArrowUpRight,
  Briefcase,
  Clock,
  Code,
  Lightbulb,
  Link2,
  Mail,
  MapPin,
  Moon,
  Sun,
  User,
} from 'lucide-react'

export const ICON_STROKE = 1.5

// Brand icons removed from lucide — defined here with the same API
export const Github = createLucideIcon('Github', [
  [
    'path',
    {
      d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
      key: '0',
    },
  ],
  ['path', { d: 'M9 18c-4.51 2-5-2-7-2', key: '1' }],
])

type BrandIconProps = SVGProps<SVGSVGElement> & {
  size?: string | number
}

export function X({ className, size = 24, ...props }: BrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      className={className}
      aria-hidden={props['aria-hidden']}
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
