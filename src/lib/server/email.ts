import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

interface ContactEmailParams {
  name: string;
  email: string;
  message: string;
  to: string;
}

export async function sendContactEmail({ name, email, message, to }: ContactEmailParams) {
  const resend = new Resend(env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to,
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  });
}
