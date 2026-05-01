import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Cadenza',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <a href="/" className="inline-block mb-8 text-sm uppercase tracking-widest text-accent font-semibold italic">
          Cadenza
        </a>
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted mb-10">Last updated: April 29, 2026</p>

        <div className="prose prose-lg space-y-6 text-ink-soft leading-relaxed">
          <p>
            By using Cadenza, you agree to these Terms of Service. If you don't
            agree, don't use Cadenza.
          </p>

          <h2 className="text-2xl font-bold text-ink mt-10 mb-3">
            Your account
          </h2>
          <p>
            You are responsible for keeping your login credentials secure and
            for all activity that happens under your account. You must be at
            least 13 years old to use Cadenza.
          </p>

          <h2 className="text-2xl font-bold text-ink mt-10 mb-3">
            Your content
          </h2>
          <p>
            You retain ownership of swing videos and other content you upload to
            Cadenza. By uploading, you grant Cadenza a non-exclusive license to
            store, process, and analyze your content for the purpose of
            providing the service.
          </p>
          <p>
            You agree not to upload content that:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Violates any law or third-party rights</li>
            <li>Contains other people's likeness without their permission</li>
            <li>Is harmful, abusive, or harassing</li>
          </ul>

          <h2 className="text-2xl font-bold text-ink mt-10 mb-3">
            Service availability
          </h2>
          <p>
            Cadenza is provided "as is" during beta. Features may change. The
            service may be unavailable from time to time for maintenance or
            other reasons.
          </p>

          <h2 className="text-2xl font-bold text-ink mt-10 mb-3">
            AI-generated analysis
          </h2>
          <p>
            Cadenza uses AI to analyze your swing videos and generate scores,
            position detection, and improvement suggestions. AI analysis is
            probabilistic and may be inaccurate. Cadenza does not guarantee the
            accuracy of any analysis. Use it as a coaching aid, not a definitive
            verdict.
          </p>

          <h2 className="text-2xl font-bold text-ink mt-10 mb-3">
            Pricing during beta
          </h2>
          <p>
            Cadenza is free during beta. After launch, paid plans will be
            offered. Existing beta users will be given advance notice and the
            opportunity to subscribe before any paid features are gated.
          </p>

          <h2 className="text-2xl font-bold text-ink mt-10 mb-3">
            Termination
          </h2>
          <p>
            You can stop using Cadenza at any time and delete your account from
            within the app or by emailing hello@cadenzagolf.com. We reserve the
            right to suspend or terminate accounts that violate these terms.
          </p>

          <h2 className="text-2xl font-bold text-ink mt-10 mb-3">
            Limitation of liability
          </h2>
          <p>
            To the maximum extent permitted by law, Cadenza is not liable for
            any indirect, incidental, or consequential damages arising from
            your use of the service.
          </p>

          <h2 className="text-2xl font-bold text-ink mt-10 mb-3">
            Changes to terms
          </h2>
          <p>
            We may update these terms from time to time. Continued use of
            Cadenza after changes means you accept the new terms.
          </p>

          <h2 className="text-2xl font-bold text-ink mt-10 mb-3">Contact</h2>
          <p>
            Questions? Email{' '}
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
