'use client'

import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export default function PaymentSuccessPage() {
  const router = useRouter()

  return (
    <div className="max-w-2xl mx-auto p-6 text-center space-y-6">
      <h1 className="text-3xl font-semibold text-purple-600">Payment Successful!</h1>
      <p className="text-gray-600">Thank you for your payment. Your transaction has been completed successfully.</p>
      <Button 
        color="secondary"
        onClick={() => router.push('/')}
      >
        Return to Home
      </Button>
    </div>
  )
}