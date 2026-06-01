import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  const imageBuffer = readFileSync(join(process.cwd(), 'public/rohitt.png'))
  const base64 = `data:image/png;base64,${imageBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        <img src={base64} width={64} height={64} style={{ objectFit: 'cover' }} />
      </div>
    ),
    { ...size }
  )
}
