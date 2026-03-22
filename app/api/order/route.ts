import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { productName, productPrice, name, email, phone, size, address } = body;

        if (!name || !email || !address) {
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

        // Email to the Admin
        const adminMailOptions = {
            from: process.env.EMAIL_USER || 'noreply@supporterfc-meilen.ch',
            to: process.env.EMAIL_USER || 'admin@supporterfc-meilen.ch',
            subject: `New Merchandise Order: ${productName} from ${name}`,
            text: `You have a new merchandise order request.\n\nProduct: ${productName}\nSize: ${size}\nPrice: CHF ${productPrice}\n\nCustomer Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}`,
            html: `
        <h2>New Merchandise Order Request</h2>
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
          <tr><td><strong>Product:</strong></td><td>${productName}</td></tr>
          <tr><td><strong>Size:</strong></td><td>${size}</td></tr>
          <tr><td><strong>Price:</strong></td><td>CHF ${productPrice}</td></tr>
          <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${phone || 'N/A'}</td></tr>
        </table>
        <h3>Shipping Address:</h3>
        <p style="white-space: pre-wrap;">${address}</p>
      `,
        };

        // Confirmation Email to the User
        const userMailOptions = {
            from: process.env.EMAIL_USER || 'noreply@supporterfc-meilen.ch',
            to: email,
            subject: `Order Confirmation: ${productName} - Supporter FC Meilen`,
            text: `Hello ${name},\n\nThank you for your order request for ${productName} (Size: ${size}).\n\nWe will review your request and contact you shortly with payment details.\n\nShipping Address:\n${address}\n\nBest regards,\nSupporter FC Meilen`,
            html: `
        <h2 style="color: #FF5A00; text-transform: uppercase;">Supporter FC Meilen</h2>
        <h3>Order Confirmation Request</h3>
        <p>Hello <strong>${name}</strong>,</p>
        <p>Thank you for supporting the club! We have received your order request.</p>
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
          <tr><td><strong>Product:</strong></td><td>${productName}</td></tr>
          <tr><td><strong>Size:</strong></td><td>${size}</td></tr>
          <tr><td><strong>Price:</strong></td><td>CHF ${productPrice}</td></tr>
        </table>
        <p><strong>Shipping Address:</strong><br/>${address}</p>
        <p>We will review your request and get back to you shortly with payment instructions.</p>
        <p><i>Against Modern Football.</i></p>
      `,
        };

        if (!process.env.EMAIL_USER) {
            console.warn('Simulating email send. Set EMAIL_USER to actually send.');
            return NextResponse.json({ message: 'Success (Simulated)' }, { status: 200 });
        }

        // Send admin email - this is critical
        try {
            await transporter.sendMail(adminMailOptions);
            console.log('Admin order notification sent successfully');
        } catch (error) {
            console.error('Failed to send admin order notification:', error);
            return NextResponse.json({ error: 'Failed to send admin notification' }, { status: 500 });
        }

        // Send user confirmation - this is secondary
        try {
            await transporter.sendMail(userMailOptions);
            console.log('User confirmation email sent successfully');
        } catch (error) {
            console.warn('Failed to send user confirmation email (order was still processed):', error);
            // We return 200 because the admin already received the order
            return NextResponse.json({
                message: 'Success',
                warning: 'Confirmation email failed to send'
            }, { status: 200 });
        }

        return NextResponse.json({ message: 'Success' }, { status: 200 });

    } catch (error) {
        console.error('API /order POST Error:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
