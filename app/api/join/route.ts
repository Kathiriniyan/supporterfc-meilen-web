import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, level } = body;

    // Validate
    if (!name || !email || !level) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Configure Nodemailer
    // In production, ensure EMAIL_USER and EMAIL_PASS are set in your environment
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
      to: process.env.EMAIL_USER || 'admin@supporterfc-meilen.ch', // Where apps are received
      subject: `New Membership Application: ${name}`,
      text: `You have a new membership application.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nLevel: ${level}`,
      html: `
        <h2>New Membership Application</h2>
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
          <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${phone || 'N/A'}</td></tr>
          <tr><td><strong>Level:</strong></td><td>${level}</td></tr>
        </table>
      `,
    };

    // If no credentials, just simulate success in dev
    if (!process.env.EMAIL_USER) {
      console.warn('Simulating email send. Set EMAIL_USER to actually send.');
      return NextResponse.json({ message: 'Success (Simulated)' }, { status: 200 });
    }

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Success' }, { status: 200 });
    
  } catch (error) {
    console.error('API /join POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
