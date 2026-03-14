import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Replace with your SMTP host
      port: 587,
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || '',
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@supporterfc-meilen.ch',
      to: process.env.EMAIL_USER || 'admin@supporterfc-meilen.ch',
      subject: `Contact Form Submission: ${subject} from ${name}`,
      text: `You have a new contact form message.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Message</h2>
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
          <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Subject:</strong></td><td>${subject}</td></tr>
        </table>
        <h3>Message:</h3>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    };

    if (!process.env.EMAIL_USER) {
      console.warn('Simulating email send. Set EMAIL_USER to actually send.');
      return NextResponse.json({ message: 'Success (Simulated)' }, { status: 200 });
    }

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Success' }, { status: 200 });
    
  } catch (error) {
    console.error('API /contact POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
