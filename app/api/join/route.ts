import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { buildEmailHtml, tableRow, dataTable } from '../_lib/emailTemplate';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, level } = body;

    if (!name || !email || !level) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'tertia.sui-inter.net',
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || '',
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@supporterfc-meilen.ch',
      to: process.env.EMAIL_USER || 'admin@supporterfc-meilen.ch',
      subject: `Neue Mitgliedschaftsanmeldung: ${name}`,
      text: `Neue Mitgliedschaftsanmeldung eingegangen.\n\nName: ${name}\nE-Mail: ${email}\nTelefon: ${phone}\nMitgliedschaft: ${level}`,
      html: buildEmailHtml({
        title: 'Neue Mitgliedschaftsanmeldung',
        body: `
          <p>Eine neue Mitgliedschaftsanmeldung ist über <a href="https://www.supporterfcmeilen.ch" style="color: #FF5A00; font-weight: bold;">www.supporterfcmeilen.ch</a> eingegangen.</p>
          ${dataTable(
          tableRow('Name', name) +
          tableRow('E-Mail', email) +
          tableRow('Telefon', phone || 'Keine Angabe') +
          tableRow('Mitgliedschaft', level)
        )}
        `,
      }),
    };

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

