'use client';

import { useState } from 'react';

export function EmailSignupForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMsg('Enter a valid email address.');
      return;
    }
    setStatus('loading');
    setErrorMsg(null);

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Signup failed');
      }
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err?.message ?? 'Something went wrong.');
    }
  };

  if (status === 'success') {
    return (
      <div className="w-full px-6 py-4 bg-accent-soft border border-accent rounded-lg text-accent font-semibold">
        ✓ You're on the list. We'll email you when Cadenza launches.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 px-5 py-4 bg-card border border-border rounded-lg text-ink placeholder:text-muted focus:outline-none focus:border-accent"
        disabled={status === 'loading'}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-4 bg-ink text-bg rounded-lg font-semibold hover:bg-ink/90 transition disabled:opacity-50"
      >
        {status === 'loading' ? 'Joining…' : 'Get notified'}
      </button>
      {status === 'error' && errorMsg && (
        <div className="absolute mt-20 text-sm text-danger">{errorMsg}</div>
      )}
    </form>
  );
}
