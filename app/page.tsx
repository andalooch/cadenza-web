import { EmailSignupForm } from './_components/EmailSignupForm';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      {/* Hero */}
      <section className="px-6 pt-20 pb-16 md:pt-32 md:pb-24 max-w-3xl mx-auto">
        <div className="mb-6">
          <span className="inline-block text-xs uppercase tracking-widest text-accent font-semibold">
            Cadenza
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 italic">
          Find your tempo.
        </h1>
        <p className="text-xl md:text-2xl text-ink-soft leading-relaxed mb-10">
          Honest swing analysis for golfers. Capture, analyze, and track your
          progress over time — with scores you can actually trust.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <EmailSignupForm />
        </div>
        <p className="text-sm text-muted">
          First 100 signups get 6 months Pro free at launch.
        </p>
      </section>

      {/* Wedge pitch */}
      <section className="px-6 py-20 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built differently.
          </h2>
          <p className="text-lg text-ink-soft mb-12 max-w-2xl">
            Most golf apps grade every swing as "great." Cadenza is built to
            tell you the truth — and to help you actually improve.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Wedge
              title="Multi-swing detection"
              body="Film 3 swings or 8. Cadenza finds each one in your video and shows them as separate cards. No other app does this."
            />
            <Wedge
              title="Honest scoring"
              body="Most apps inflate scores to feel good. Cadenza scores 50–80 for typical amateur swings. Tour-level means tour-level."
            />
            <Wedge
              title="Longitudinal coaching"
              body="See patterns across weeks. When an issue persists for 3 sessions, Cadenza tells you. When you fix it, Cadenza tells you that too."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How it works</h2>
          <div className="space-y-10">
            <Step
              n={1}
              title="Film your swing"
              body="Up to 75 seconds. Capture multiple swings in one video — Cadenza finds each one."
            />
            <Step
              n={2}
              title="Get analysis"
              body="6-axis scorecard, position detection, and specific issues — generated from each swing's video."
            />
            <Step
              n={3}
              title="Track progress"
              body="Cadenza watches for patterns across sessions and tells you what's persistent, improving, or new."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 bg-accent-soft border-y border-accent/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing</h2>
          <p className="text-lg text-ink-soft mb-8">
            Cadenza is free during beta. After launch:
          </p>
          <div className="inline-flex flex-col items-center gap-1 px-10 py-8 bg-card rounded-lg border border-border">
            <div className="text-sm text-muted uppercase tracking-wider">Pro</div>
            <div className="text-5xl font-bold">
              $9.99
              <span className="text-xl text-muted font-normal">/mo</span>
            </div>
            <div className="text-sm text-ink-soft">
              or $59/year (save $60)
            </div>
          </div>
          <p className="mt-8 text-sm text-muted">
            First 100 beta signups get 6 months Pro free at launch.
          </p>
        </div>
      </section>

      {/* Coach inquiry */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto bg-ink text-bg rounded-lg p-10 md:p-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Are you a teaching pro?
          </h2>
          <p className="text-bg/80 mb-6 leading-relaxed">
            Cadenza is building a coach mode that lets you review students' swings
            asynchronously, leave timestamped notes, and track their progress.
            Looking for a few teaching pros to partner with during development.
          </p>
          <a
            href="mailto:coach@cadenzagolf.com?subject=Cadenza coach partnership"
            className="inline-block px-6 py-3 bg-accent text-bg rounded-pill font-semibold hover:bg-accent/90 transition"
          >
            coach@cadenzagolf.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-border">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="font-bold text-lg italic">Cadenza</div>
            <div className="text-sm text-muted">Find your tempo.</div>
          </div>
          <div className="flex gap-6 text-sm text-ink-soft">
            <a href="/privacy" className="hover:text-ink">Privacy</a>
            <a href="/terms" className="hover:text-ink">Terms</a>
            <a href="mailto:hello@cadenzagolf.com" className="hover:text-ink">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Wedge({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-ink-soft leading-relaxed">{body}</p>
    </div>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent text-bg flex items-center justify-center font-bold text-lg">
        {n}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-ink-soft leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
