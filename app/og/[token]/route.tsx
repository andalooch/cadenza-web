import { ImageResponse } from 'next/og';

import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export async function GET(
  _req: Request,
  { params }: { params: { token: string } }
) {
  const { data: swing } = await supabaseAdmin
    .from('swings')
    .select('id, club, captured_at, share_anonymous, user_id, selected_swing_index')
    .eq('share_token', params.token)
    .maybeSingle();

  // Fallback card if share is invalid/revoked
  if (!swing) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#FAF7F2',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui',
          }}
        >
          <div style={{ fontSize: 96, fontStyle: 'italic', color: '#0F1B2D' }}>
            Cadenza
          </div>
          <div style={{ fontSize: 36, color: '#3D4A5E', marginTop: 16 }}>
            Find your tempo.
          </div>
        </div>
      ),
      size
    );
  }

  // Get analysis (prefer the one matching selected_swing_index)
  let analysis: any = null;
  if (swing.selected_swing_index != null) {
    const { data } = await supabaseAdmin
      .from('analyses')
      .select('axes, overall_grade')
      .eq('swing_id', swing.id)
      .eq('detected_swing_index', swing.selected_swing_index)
      .order('created_at', { ascending: false })
      .limit(1);
    analysis = data?.[0] ?? null;
  }
  if (!analysis) {
    const { data } = await supabaseAdmin
      .from('analyses')
      .select('axes, overall_grade')
      .eq('swing_id', swing.id)
      .order('created_at', { ascending: false })
      .limit(1);
    analysis = data?.[0] ?? null;
  }

  let ownerName: string | null = null;
  if (!swing.share_anonymous) {
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('full_name')
      .eq('id', swing.user_id)
      .maybeSingle();
    if (profile?.full_name) {
      ownerName = profile.full_name.split(' ')[0];
    }
  }

  const club = swing.club ?? 'Swing';
  const date = new Date(swing.captured_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const ownerLabel = ownerName ? `${ownerName}'s` : 'A';
  const score =
    analysis?.axes && analysis.axes.length > 0
      ? Math.round(
          analysis.axes.reduce((s: number, a: any) => s + (a.score ?? 0), 0) /
            analysis.axes.length
        )
      : null;
  const grade = analysis?.overall_grade ?? null;

  const gradeColor =
    grade === 'Tour' || grade === 'Strong'
      ? '#1F6B4A'
      : grade === 'Developing'
        ? '#C68A1F'
        : grade === 'Foundational'
          ? '#B5443A'
          : '#8B95A3';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#FAF7F2',
          display: 'flex',
          flexDirection: 'column',
          padding: 80,
          fontFamily: 'system-ui',
        }}
      >
        {/* Brand */}
        <div
          style={{
            fontSize: 28,
            fontStyle: 'italic',
            color: '#1F6B4A',
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: 'uppercase',
            marginBottom: 60,
          }}
        >
          Cadenza
        </div>

        {/* Owner + club */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#0F1B2D',
            marginBottom: 16,
            display: 'flex',
          }}
        >
          {ownerLabel} {club}
        </div>

        <div style={{ fontSize: 32, color: '#3D4A5E', marginBottom: 60 }}>
          {date}
        </div>

        {/* Score block */}
        {score != null && grade ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 32,
              marginTop: 'auto',
            }}
          >
            <div
              style={{
                fontSize: 200,
                fontWeight: 700,
                color: '#0F1B2D',
                lineHeight: 1,
              }}
            >
              {score}
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: gradeColor,
              }}
            >
              {grade}
            </div>
          </div>
        ) : (
          <div
            style={{
              fontSize: 36,
              color: '#3D4A5E',
              marginTop: 'auto',
              fontStyle: 'italic',
            }}
          >
            Find your tempo.
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            fontSize: 24,
            color: '#8B95A3',
            marginTop: 40,
          }}
        >
          cadenzagolf.com
        </div>
      </div>
    ),
    size
  );
}
