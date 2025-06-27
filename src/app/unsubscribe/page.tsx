'use client'

import { useState } from 'react'

export default function UnsubscribePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setStatus('error')
      setMessage('Please enter your email address')
      return
    }

    setStatus('loading')
    
    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('You have been successfully unsubscribed from our mailing list.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'An error occurred. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('An error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                Unsubscribe from Our Emails
              </h1>
              <p className="text-gray-300 text-lg">
                We're sorry to see you go. Enter your email address below to unsubscribe from all future communications from True Node.
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center">
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-6 mb-6">
                  <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-300 text-lg font-medium">{message}</p>
                </div>
                <p className="text-gray-400 text-sm">
                  It may take up to 48 hours for the unsubscribe to take effect.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                {status === 'error' && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                    <p className="text-red-300 text-sm">{message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    'Unsubscribe'
                  )}
                </button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-4">
                  Need help or have questions about your subscription?
                </p>
                <div className="text-sm text-gray-300">
                  <p>Contact us at: <a href="mailto:info@truenode.co.uk" className="text-purple-400 hover:text-purple-300">info@truenode.co.uk</a></p>
                  <p>Phone: <a href="tel:+447894045027" className="text-purple-400 hover:text-purple-300">+44 7894 045027</a></p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a 
                href="https://www.truenode.co.uk" 
                className="text-purple-400 hover:text-purple-300 text-sm underline"
              >
                Return to True Node website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 