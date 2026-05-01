export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg text-ink flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <a href="/" className="inline-block mb-8">
          <span className="text-sm uppercase tracking-widest text-accent font-semibold italic">
            Cadenza
          </span>
        </a>
        <h1 className="text-3xl font-bold mb-4">Share unavailable</h1>
        <p className="text-ink-soft mb-8 leading-relaxed">
          This share link has been revoked or doesn't exist. The owner may have
          taken it down.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-ink text-bg rounded-pill font-semibold hover:bg-ink/90 transition"
        >
          Get Cadenza →
        </a>
      </div>
    </main>
  );
}
