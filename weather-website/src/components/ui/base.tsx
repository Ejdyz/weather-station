import React from 'react'

export default function Base({ children } : { children: React.ReactNode }) {
  return (
    <div className='rounded-md bg-white/30 bg-opacity-0 p-2'>
      {children}
    </div>
  )
}
