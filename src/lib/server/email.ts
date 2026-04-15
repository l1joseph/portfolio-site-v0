import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

interface ContactEmailParams {
  name: string;
  email: string;
  message: string;
  to: string;
}

export async function sendContactEmail({ name, email, message, to }: ContactEmailParams) {
  const resend = new Resend(RESEND_API_KEY);

  await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to,
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  });
}
