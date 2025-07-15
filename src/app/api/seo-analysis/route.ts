import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, websiteUrl, businessName, phone } = body;

    if (!name || !email || !websiteUrl) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Here you would typically send the data to your N8N webhook
    // For now, we'll just log it and simulate a successful response.
    console.log('Received SEO Analysis Request:', { name, businessName, phone, email, websiteUrl });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // The N8N webhook URL would be used here.
    // const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    // if (!n8nWebhookUrl) {
    //   throw new Error('N8N webhook URL is not configured.');
    // }
    // const response = await fetch(n8nWebhookUrl, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body),
    // });
    // if (!response.ok) {
    //   const errorData = await response.json();
    //   throw new Error(errorData.message || 'Failed to send data to workflow.');
    // }

    return NextResponse.json({ message: 'Success! Your SEO analysis is on its way to your inbox.' }, { status: 200 });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ message: error.message || 'An internal server error occurred.' }, { status: 500 });
  }
} 