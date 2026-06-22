import React from 'react'

type InfoItem = {
  id: string
  icon: React.ReactNode
  value: React.ReactNode
}

function InfoColumn({ items }: { items: InfoItem[] }) {
  return (
    <div className="info-column">
      {items.map((item) => (
        <div key={item.id} className="info-row">
          <span className="info-icon" aria-hidden="true">
            <span className="info-icon-inner">{item.icon}</span>
          </span>
          <div className="info-value">{item.value}</div>
        </div>
      ))}
    </div>
  )
}

export function InfoColumns({
  left,
  right,
}: {
  left: InfoItem[]
  right: InfoItem[]
}) {
  return (
    <div className="info-columns">
      <InfoColumn items={left} />
      <InfoColumn items={right} />
    </div>
  )
}
