import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Cadenza',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <a href="/" className="inline-block mb-8 text-sm uppercase tracking-widest text-accent font-semibold italic">
          Cadenza
        </a>
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted mb-10">Last updated: April 29, 2026</p>

        <div className="prose prose-lg space-y-6 text-ink-soft leading-relaxed">
          <p>
            This Privacy Policy describes how Cadenza ("we," "us," or "our")
            collects, uses, and shares information about you when you use our
            mobile application and website (collectively, "Cadenza").
          </p>

          <h2 className="text-2xl font-bold text-ink mt-10 mb-3">
            Information we collect
          </h2>
          <p>When you use Cadenza, we collect:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Account information:</strong> email address, name (if
              provided), age, handicap, handedness, and other profile fields you
              choose to provide.
            </li>
            <li>
              <strong>Swing videos and metadata:</strong> videos you record or
              upload, along with derived metadata (duration, capture timestamp,
              detected swing positions, scores, issues).
            </li>
            <li>
              <strong>Usage data:</strong> general analytics about how you use
              the app, error reports, device type.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-ink mt-10 mb-3">
            How we use information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide swing analysis and coaching features.</li>
            <li>To improve the app and detect bugs.</li>
            <li>To communicate with you about Cadenza.</li>
            <li>To enable share links you create.</li>
          </ul>

          <h2 className="text-2xl font-bold text-ink mt-10 mb-3">
            Third-party services
          </h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Supabase</strong> — for database, file storage, and user
              authentication. Swing videos are stored on Supabase infrastructure.
            </li>
            <li>
              <strong>Anthropic</strong> — frames extracted from your swing
              videos are sent to Anthropic's Claude API for analysis. Anthropic
              processes these images according to their privacy policy.
            </li>
            <li>
              <strong>Resend</strong> — used to send email notifications and
              waitlist confirmations.
            </li>
            <li>
              <strong>Vercel</strong> — hosts cadenzagolf.com.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-ink mt-10 mb-3">
            Share links
          </h2>
          <p>
            When you create a share link for a swing, the swing's video and
            analysis become accessible to anyone with the URL. We do not index
            share URLs or make them publicly discoverable. You can revoke a
            share link at any time from within the app, which immediately
            invalidates the URL.
          </p>

          <h2 className="text-2xl font-bold text-ink mt-10 mb-3">
            Data retention and deletion
          </h2>
          <p>
            We retain your data for as long as your account is active. You can
            request deletion of your account and all associated data by emailing{' '}
            <a href="mailto:hello@cadenzagolf.com" className="text-accent">
              hello@cadenzagolf.com
            </a>
            . Account deletion is also available in-app under Profile settings.
          </p>

          <h2 className="text-2xl font-bold text-ink mt-10 mb-3">
            Children's privacy
          </h2>
          <p>
            Cadenza is not directed to children under 13, and we do not
            knowingly collect personal information from children under 13.
          </p>

          <h2 className="text-2xl font-bold text-ink mt-10 mb-3">
            Changes to this policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of changes by updating the "Last updated" date.
          </p>

          <h2 className="text-2xl font-bold text-ink mt-10 mb-3">Contact</h2>
          <p>
            Questions about this policy? Email us at{' '}
            <a href="mailto:hello@cadenzagolf.com" className="text-accent">
              hello@cadenzagolf.com
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
