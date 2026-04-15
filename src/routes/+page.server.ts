import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { CONTACT_TO_EMAIL } from '$env/static/private';
import { sendContactEmail } from '$lib/server/email';

// Simple in-memory rate limiter: 3 messages per IP per 10 minutes
const rateLimits = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxRequests = 3;

  const prev = (rateLimits.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (prev.length >= maxRequests) return false;

  prev.push(now);
  rateLimits.set(ip, prev);
  return true;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const actions: Actions = {
  send: async ({ request, getClientAddress }) => {
    const ip = getClientAddress();

    if (!checkRateLimit(ip)) {
      return fail(429, { error: 'Too many requests. Please try again later.' });
    }

    const data = await request.formData();

    // Honeypot: bots fill this, humans don't
    if (data.get('website')) {
      return { success: true };
    }

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!name || name.length > 100) {
      return fail(400, { error: 'Please provide your name.', name, email, message });
    }
    if (!email || email.length > 200 || !isValidEmail(email)) {
      return fail(400, { error: 'Please provide a valid email address.', name, email, message });
    }
    if (!message || message.length < 10 || message.length > 5000) {
      return fail(400, {
        error: 'Message must be between 10 and 5000 characters.',
        name,
        email,
        message
      });
    }

    try {
      await sendContactEmail({ name, email, message, to: CONTACT_TO_EMAIL });
      return { success: true };
    } catch (err) {
      console.error('Email send failed:', err);
      return fail(500, {
        error: 'Failed to send message. Please try again later.',
        name,
        email,
        message
      });
    }
  }
};
