'use client'

import React, { forwardRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../../ui/button'

export interface SubmitButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  pending?: boolean
  pendingText?: string
}

const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ children, className, pending = false, pendingText = 'Submitting...', ...restProps }, ref) => {
    const { pending: formPending, action } = useFormStatus()

    const isPending = formPending && action === restProps.formAction

    return (
      <Button
        ref={ref}
        className={className}
        type="submit"
        aria-disabled={pending}
        {...restProps}
      >
        {isPending ? pendingText : children}
      </Button>
    )
  }
)

SubmitButton.displayName = 'SubmitButton'

export default SubmitButton
