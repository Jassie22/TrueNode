import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body: ContactFormData = await request.json();
    const { name, email, subject, message } = body;
    
    // Validate form inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }
    
    // Configure email transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER || 'smtp.example.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    // Setup email data
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@truenode.com',
      to: process.env.EMAIL_TO || 'contact@truenode.com',
      replyTo: email,
      subject: `Contact Form: ${subject || 'New Message from Website'}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject || 'N/A'}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
  <h2 style="color: #9c27b0;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
  <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
    <h3 style="color: #6a0dad;">Message:</h3>
    <p style="white-space: pre-line;">${message}</p>
  </div>
</div>
      `,
    };
    
    // Send the email
    await transporter.sendMail(mailOptions);
    
    // Return success response
    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return error response
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
} 