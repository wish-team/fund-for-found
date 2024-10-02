'use client'

import { useFormStatus } from 'react-dom'
import { type ComponentProps } from 'react'
import { Button } from '../ui/button'

type Props = ComponentProps<'button'> & {
  pendingText?: string
}

export function SubmitButton({ children, className, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus()

  const isPending = pending && action === props.formAction

  return (
    <Button {...props} className={className} type="submit" aria-disabled={pending}>
      {isPending ? pendingText : children}
    </Button>
  )
}
