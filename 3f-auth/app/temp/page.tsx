'use client'

import { useState } from 'react'

export default function DebugTokens() {
  const [responseData, setResponseData] = useState(null)

  async function testTokenSending() {
    try {
      const response = await fetch(`http://localhost:3010/brand`, {
        method: 'POST',
        credentials: 'include',
      })
      const data = await response.json()
      setResponseData(data)
      console.log('Response:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <h1>Test Token Sending</h1>
      <button onClick={testTokenSending}>Check Tokens</button>
      {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>}
    </div>
  )
}
