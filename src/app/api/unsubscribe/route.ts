import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// This is a temporary file-based storage solution
// Replace with PostgreSQL database queries when available
const UNSUBSCRIBE_FILE = path.join(process.cwd(), 'data', 'unsubscribed_emails.json')

async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

async function loadUnsubscribedEmails(): Promise<string[]> {
  try {
    await ensureDataDirectory()
    const data = await fs.readFile(UNSUBSCRIBE_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // File doesn't exist yet, return empty array
    return []
  }
}

async function saveUnsubscribedEmails(emails: string[]): Promise<void> {
  await ensureDataDirectory()
  await fs.writeFile(UNSUBSCRIBE_FILE, JSON.stringify(emails, null, 2))
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Load existing unsubscribed emails
    const unsubscribedEmails = await loadUnsubscribedEmails()

    // Check if email is already unsubscribed
    const normalizedEmail = email.toLowerCase().trim()
    if (unsubscribedEmails.includes(normalizedEmail)) {
      return NextResponse.json(
        { message: 'Email is already unsubscribed' },
        { status: 200 }
      )
    }

    // Add to unsubscribed list
    unsubscribedEmails.push(normalizedEmail)
    await saveUnsubscribedEmails(unsubscribedEmails)

    // Log the unsubscribe for tracking
    console.log(`Email unsubscribed: ${normalizedEmail} at ${new Date().toISOString()}`)

    return NextResponse.json(
      { message: 'Successfully unsubscribed' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to check if an email is unsubscribed (for n8n workflow)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    const unsubscribedEmails = await loadUnsubscribedEmails()
    const normalizedEmail = email.toLowerCase().trim()
    const isUnsubscribed = unsubscribedEmails.includes(normalizedEmail)

    return NextResponse.json({
      email: normalizedEmail,
      isUnsubscribed,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Unsubscribe check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE endpoint to remove an email from unsubscribe list (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const unsubscribedEmails = await loadUnsubscribedEmails()
    const normalizedEmail = email.toLowerCase().trim()
    const index = unsubscribedEmails.indexOf(normalizedEmail)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Email not found in unsubscribe list' },
        { status: 404 }
      )
    }

    unsubscribedEmails.splice(index, 1)
    await saveUnsubscribedEmails(unsubscribedEmails)

    return NextResponse.json(
      { message: 'Email removed from unsubscribe list' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Unsubscribe removal error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 