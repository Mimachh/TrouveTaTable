import { Toaster } from '@/Components/ui/sonner'
import React from 'react'

const ToastProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <Toaster />
        {children}
    </div>
  )
}

export default ToastProvider