export type Band = 'Tour' | 'Strong' | 'Developing' | 'Foundational';

export type AxisName = 'Tempo' | 'Sequencing' | 'Setup' | 'Top' | 'Impact' | 'Finish';

export type AxisScore = {
  name: AxisName;
  score: number;
  band: Band;
  note: string;
  cues: string[];
};

export type IssueSeverity = 'mild' | 'moderate' | 'severe';

export type Issue = {
  name: string;
  display_name: string;
  severity: IssueSeverity;
  description: string;
  affected_axes: AxisName[];
};

export type DetectedSwing = {
  start_ms: number;
  end_ms: number;
  label: 'practice' | 'full' | 'partial';
  confidence: 'high' | 'medium' | 'low';
};

export type Swing = {
  id: string;
  user_id: string;
  club: string | null;
  notes: string | null;
  duration_ms: number | null;
  captured_at: string;
  video_path: string;
  share_token: string;
  shared_at: string;
  share_anonymous: boolean;
  detected_swings: DetectedSwing[] | null;
  selected_swing_index: number | null;
  trim_start_ms: number | null;
  trim_end_ms: number | null;
};

export type Analysis = {
  id: string;
  swing_id: string;
  axes: AxisScore[];
  overall_grade: Band | null;
  overall_summary: string | null;
  issues: Issue[];
  detected_swing_index: number | null;
  created_at: string;
};

export type Profile = {
  id: string;
  full_name: string | null;
};
