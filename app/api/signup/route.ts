import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

export async function POST(req: Request) {
  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
    return NextResponse.json(
      { error: 'Email signup not configured. Server missing RESEND env vars.' },
      { status: 500 }
    );
  }

  let email: string;
  try {
    const body = await req.json();
    email = body.email;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    await resend.contacts.create({
      email: email.toLowerCase().trim(),
      audienceId: RESEND_AUDIENCE_ID,
      unsubscribed: false,
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    // Resend returns "Contact already exists" — treat as success
    const msg = err?.message ?? '';
    if (msg.includes('already exists') || msg.includes('duplicate')) {
      return NextResponse.json({ success: true, alreadySubscribed: true });
    }
    console.error('Signup error:', err);
    return NextResponse.json(
      { error: 'Could not save email. Try again later.' },
      { status: 500 }
    );
  }
}
