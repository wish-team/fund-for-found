'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <div className="rounded-lg border-2 border-purple-2 p-[2px]">
        <input
          type={type}
          className={cn(
            `flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-4 placeholder:font-inter`,
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
