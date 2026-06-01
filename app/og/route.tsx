import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export function GET(request: Request) {
  let url = new URL(request.url)
  let title = url.searchParams.get('title') || 'Rohith Singh'

  const imageBuffer = readFileSync(join(process.cwd(), 'public/rohitt.png'))
  const avatar = `data:image/png;base64,${imageBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        tw="flex flex-col w-full h-full bg-black text-white"
        style={{ fontFamily: 'sans-serif' }}
      >
        {/* top accent bar */}
        <div tw="w-full h-1 bg-white" style={{ opacity: 0.08 }} />

        <div tw="flex flex-col flex-1 justify-between px-16 py-14">
          {/* title */}
          <div tw="flex flex-col">
            <p tw="text-gray-500 text-xl mb-5 m-0" style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              rohittcodes
            </p>
            <h1 tw="text-6xl font-bold text-white leading-tight m-0" style={{ maxWidth: '860px' }}>
              {title}
            </h1>
          </div>

          {/* footer row */}
          <div tw="flex items-center justify-between">
            <div tw="flex items-center gap-4">
              {/* avatar */}
              <img
                src={avatar}
                width={56}
                height={56}
                style={{ borderRadius: 28, objectFit: 'cover' }}
              />
              <div tw="flex flex-col">
                <p tw="text-white text-2xl font-semibold m-0">Rohith Singh</p>
                <p tw="text-gray-500 text-lg m-0">AI-native Engineer · blog.rohitt.codes</p>
              </div>
            </div>
            <div tw="flex items-center rounded-full px-5 py-2" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <p tw="text-gray-400 text-lg m-0">@rohittcodes</p>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
