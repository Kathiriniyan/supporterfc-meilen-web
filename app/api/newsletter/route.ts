import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Replace with your SMTP host
            port: 587,
            auth: {
                user: process.env.EMAIL_USER || '',
                pass: process.env.EMAIL_PASS || '',
            },
        });

        // Email to Admin
        const adminMailOptions = {
            from: process.env.EMAIL_USER || 'noreply@supporterfc-meilen.ch',
            to: process.env.EMAIL_USER || 'admin@supporterfc-meilen.ch',
            subject: `New Newsletter Subscription`,
            text: `A new user has subscribed to the newsletter.\n\nEmail: ${email}`,
            html: `
        <h2>New Newsletter Subscription</h2>
        <p>A new user has subscribed to the newsletter.</p>
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        </table>
      `,
        };

        // Email to User
        const userMailOptions = {
            from: process.env.EMAIL_USER || 'noreply@supporterfc-meilen.ch',
            to: email, // Sending to the user who subscribed
            subject: `Subscription Confirmed - Supporter FC Meilen`,
            text: `Thank you for subscribing to our newsletter! You will now receive our latest updates.`,
            html: `
        <h2>Subscription Confirmed</h2>
        <p>Thank you for subscribing to the Supporter FC Meilen newsletter!</p>
        <p>You will now receive our latest updates and news.</p>
        <br>
        <p>Best regards,<br>Supporter FC Meilen Team</p>
      `,
        };

        if (!process.env.EMAIL_USER) {
            console.warn('Simulating newsletter email send. Set EMAIL_USER to actually send.');
            return NextResponse.json({ message: 'Success (Simulated)' }, { status: 200 });
        }

        // Send to the user FIRST
        try {
            await transporter.sendMail(userMailOptions);
        } catch (userMailError) {
            console.error('Failed to send mail to user:', userMailError);
            // Fails early, so the admin doesn't receive the notification
            return NextResponse.json({ error: 'Failed to deliver to the provided email address.' }, { status: 400 });
        }

        // If user delivery succeeded, send the notification to the admin
        await transporter.sendMail(adminMailOptions);

        return NextResponse.json({ message: 'Success' }, { status: 200 });

    } catch (error) {
        console.error('API /newsletter POST Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
