import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, websiteUrl, businessName, phone } = body;

    if (!name || !email || !websiteUrl) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // The N8N webhook URL.
    const n8nWebhookUrl = 'https://n8n.truenode.synology.me/webhook-test/lead-gen-seo';
    
    // Asynchronously send data to the N8N webhook without waiting for its response.
    fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).catch(error => {
      // Log any errors that occur during the fetch operation.
      // This ensures that a failure to communicate with N8N doesn't block the user's confirmation.
      console.error('Failed to send data to N8N webhook:', error);
    });

    // Immediately return a success message to the user.
    return NextResponse.json({ message: 'Success! Your SEO analysis is on its way to your inbox.' }, { status: 200 });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ message: error.message || 'An internal server error occurred.' }, { status: 500 });
  }
} 