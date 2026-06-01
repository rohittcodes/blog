import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'
import { CopyButton } from './copy-button'

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function Pre({ children }: { children?: React.ReactNode }) {
  const child = React.Children.only(children) as React.ReactElement<{
    className?: string
    children?: string
  }>

  const language = (child?.props?.className || '')
    .replace('language-', '')
    .trim() || 'text'

  const rawCode = typeof child?.props?.children === 'string'
    ? child.props.children.trimEnd()
    : ''

  return (
    <div
      className="not-prose my-5 overflow-hidden rounded-lg"
      style={{ border: '1px solid var(--line)' }}
    >
      {/* Header: language label + copy button */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{
          backgroundColor: 'var(--code-header-bg)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <span
          className="text-[11px] font-medium uppercase tracking-widest select-none"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {language}
        </span>
        <CopyButton code={rawCode} />
      </div>
      {/* Code body */}
      <pre
        className="overflow-x-auto px-4 py-4 text-sm m-0 rounded-none border-0"
        style={{ backgroundColor: 'var(--background)' }}
      >
        {children}
      </pre>
    </div>
  )
}

function MarkdownImage({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <figure className="my-6 not-prose">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt || ''}
        className="w-full rounded-lg"
        style={{ border: '1px solid var(--border)', display: 'block' }}
        {...props}
      />
      {alt && (
        <figcaption
          className="mt-2 text-center text-xs"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {alt}
        </figcaption>
      )}
    </figure>
  )
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: CustomLink,
  code: Code,
  pre: Pre,
  img: MarkdownImage,
  Table,
}

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
