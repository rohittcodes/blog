import { ImageResponse } from 'next/og'

export function GET(request: Request) {
  let url = new URL(request.url)
  let title = url.searchParams.get('title') || 'Rohith Singh'

  return new ImageResponse(
    (
      <div
        tw="flex flex-col w-full h-full bg-black text-white"
        style={{ fontFamily: 'sans-serif' }}
      >
        {/* top accent bar */}
        <div tw="w-full h-1.5 bg-white opacity-10" />

        <div tw="flex flex-col flex-1 justify-between px-16 py-14">
          {/* title */}
          <div tw="flex flex-col">
            <p tw="text-gray-400 text-2xl mb-4 tracking-widest uppercase" style={{ letterSpacing: '0.15em' }}>
              rohittcodes
            </p>
            <h1 tw="text-6xl font-bold text-white leading-tight m-0" style={{ maxWidth: '900px' }}>
              {title}
            </h1>
          </div>

          {/* footer row */}
          <div tw="flex items-center justify-between">
            <div tw="flex flex-col">
              <p tw="text-white text-2xl font-semibold m-0">Rohith Singh</p>
              <p tw="text-gray-400 text-xl m-0">AI-native Engineer · blog.rohitt.codes</p>
            </div>
            <div tw="flex items-center bg-white bg-opacity-10 rounded-full px-5 py-2">
              <p tw="text-gray-300 text-lg m-0">@rohittcodes</p>
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
