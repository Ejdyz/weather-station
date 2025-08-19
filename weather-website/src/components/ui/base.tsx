import React from 'react'

export default function Base({ children, className } : { children: React.ReactNode, className?: string }) {
  return (
    <div className={`rounded-md bg-white/30 bg-opacity-0 p-2 ${className}`}>
      {children}
    </div>
  )
}
