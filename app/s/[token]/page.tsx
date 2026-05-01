import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { supabaseAdmin } from '@/lib/supabase';
import type { Analysis, Swing, Profile, Band } from '@/lib/types';

type Props = {
  params: { token: string };
};

type LoadedShare = {
  swing: Swing;
  analysis: Analysis | null;
  ownerName: string | null; // null if anonymous OR no name on file
  videoUrl: string | null;
};

async function loadShare(token: string): Promise<LoadedShare | null> {
  if (!token || token.length < 8) return null;

  const { data: swing, error } = await supabaseAdmin
    .from('swings')
    .select('*')
    .eq('share_token', token)
    .maybeSingle();

  if (error || !swing) return null;
  if (!swing.shared_at) return null; // revoked

  // Determine which analysis to show — prefer the one matching the
  // selected_swing_index if multi-swing; else the most recent.
  let analysis: Analysis | null = null;
  if (swing.selected_swing_index != null) {
    const { data } = await supabaseAdmin
      .from('analyses')
      .select('*')
      .eq('swing_id', swing.id)
      .eq('detected_swing_index', swing.selected_swing_index)
      .order('created_at', { ascending: false })
      .limit(1);
    analysis = data?.[0] ?? null;
  }
  if (!analysis) {
    const { data } = await supabaseAdmin
      .from('analyses')
      .select('*')
      .eq('swing_id', swing.id)
      .order('created_at', { ascending: false })
      .limit(1);
    analysis = data?.[0] ?? null;
  }

  // Owner name (only if not anonymous)
  let ownerName: string | null = null;
  if (!swing.share_anonymous) {
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('full_name')
      .eq('id', swing.user_id)
      .maybeSingle();
    if (profile?.full_name) {
      ownerName = profile.full_name.split(' ')[0]; // first name only
    }
  }

  // Generate fresh signed video URL
  let videoUrl: string | null = null;
  if (swing.video_path && swing.video_path !== 'pending') {
    const { data } = await supabaseAdmin.storage
      .from('swings')
      .createSignedUrl(swing.video_path, 60 * 60);
    videoUrl = data?.signedUrl ?? null;
  }

  return { swing, analysis, ownerName, videoUrl };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await loadShare(params.token);
  if (!data) {
    return {
      title: 'Cadenza — Share unavailable',
      robots: { index: false },
    };
  }

  const { swing, analysis, ownerName } = data;
  const club = swing.club ?? 'swing';
  const ownerLabel = ownerName ? `${ownerName}'s` : 'A';
  const date = new Date(swing.captured_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const score = analysis ? avgScore(analysis.axes) : null;
  const grade = analysis?.overall_grade ?? null;
  const title =
    score != null && grade
      ? `${ownerLabel} ${club} — ${grade} (${score}) · ${date}`
      : `${ownerLabel} ${club} · ${date}`;
  const description = analysis?.overall_summary
    ? truncate(analysis.overall_summary, 180)
    : `Swing analysis from ${date}. View on Cadenza.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'video.other',
      url: `https://cadenzagolf.com/s/${params.token}`,
      images: [`https://cadenzagolf.com/og/${params.token}`],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://cadenzagolf.com/og/${params.token}`],
    },
  };
}

export default async function SharedSwingPage({ params }: Props) {
  const data = await loadShare(params.token);
  if (!data) {
    return notFound();
  }

  const { swing, analysis, ownerName, videoUrl } = data;
  const date = new Date(swing.captured_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const club = swing.club ?? 'swing';
  const ownerLabel = ownerName ? `${ownerName}'s` : 'A';
  const score = analysis ? avgScore(analysis.axes) : null;

  return (
    <main className="min-h-screen bg-bg text-ink">
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="mb-8">
          <a href="/" className="inline-block mb-6">
            <span className="text-sm uppercase tracking-widest text-accent font-semibold italic">
              Cadenza
            </span>
          </a>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {ownerLabel} {club}
          </h1>
          <p className="text-ink-soft">{date}</p>
        </header>

        {/* Video */}
        {videoUrl ? (
          <div className="aspect-[9/16] max-w-md mx-auto rounded-lg overflow-hidden bg-black mb-8">
            <video
              src={videoUrl}
              controls
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="aspect-[9/16] max-w-md mx-auto rounded-lg bg-card border border-border flex items-center justify-center mb-8">
            <p className="text-muted">Video unavailable</p>
          </div>
        )}

        {/* Overall grade */}
        {analysis && score != null && (
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted uppercase tracking-wider">
                Overall
              </span>
              <span className={`text-sm font-semibold ${gradeTextColor(analysis.overall_grade)}`}>
                {analysis.overall_grade ?? 'Unscored'}
              </span>
            </div>
            <div className="text-5xl font-bold mb-3">{score}</div>
            {analysis.overall_summary && (
              <p className="text-ink-soft leading-relaxed">
                {analysis.overall_summary}
              </p>
            )}
          </div>
        )}

        {/* Scorecard */}
        {analysis?.axes && analysis.axes.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3">Scorecard</h2>
            <div className="space-y-2">
              {analysis.axes.map((axis) => (
                <div
                  key={axis.name}
                  className="bg-card border border-border rounded-lg p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold mb-1">{axis.name}</div>
                    <div className="text-sm text-ink-soft">{axis.note}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-bold">{axis.score}</div>
                    <div className={`text-xs font-semibold ${gradeTextColor(axis.band)}`}>
                      {axis.band}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Issues */}
        {analysis?.issues && analysis.issues.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3">Issues detected</h2>
            <div className="space-y-2">
              {analysis.issues.map((issue, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold">{issue.display_name}</span>
                    <span className={`text-xs uppercase tracking-wider px-2 py-0.5 rounded-pill ${severityClasses(issue.severity)}`}>
                      {issue.severity}
                    </span>
                  </div>
                  <p className="text-sm text-ink-soft">{issue.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="bg-ink text-bg rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold italic mb-2">Find your tempo.</h2>
          <p className="text-bg/80 mb-5">
            Honest swing analysis for golfers.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-accent text-bg rounded-pill font-semibold hover:bg-accent/90 transition"
          >
            Get Cadenza →
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-10 pt-6 border-t border-border text-sm text-muted text-center">
          <p>
            Shared via{' '}
            <a href="/" className="text-ink-soft hover:text-ink">
              Cadenza
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}

function avgScore(axes: { score: number }[]): number | null {
  if (!axes || axes.length === 0) return null;
  const sum = axes.reduce((acc, a) => acc + (a.score ?? 0), 0);
  return Math.round(sum / axes.length);
}

function gradeTextColor(grade: Band | null): string {
  switch (grade) {
    case 'Tour':
      return 'text-accent';
    case 'Strong':
      return 'text-accent';
    case 'Developing':
      return 'text-warning';
    case 'Foundational':
      return 'text-danger';
    default:
      return 'text-muted';
  }
}

function severityClasses(severity: string): string {
  switch (severity) {
    case 'severe':
      return 'bg-danger/10 text-danger';
    case 'moderate':
      return 'bg-warning/10 text-warning';
    default:
      return 'bg-ink/10 text-ink-soft';
  }
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + '…';
}
