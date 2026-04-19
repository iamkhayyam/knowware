export interface Chapter {
  num: string;
  title: string;
  sub: string;
  content: string;

  // Rich chapter detail (optional — pages render gracefully without).
  part?: string;              // "Part I · Foundation"
  keyTriad?: {                // The three-body system the chapter explores
    a: string;
    b: string;
    c: string;
    emerges: string;
  };
  vignette?: {                // The chapter's opening vignette
    year: string;
    location: string;
    title: string;
    body: string;
  };
  keyInsight?: string;        // One-line takeaway

  triads: {
    academic: string[];
    practitioner: string[];
    visionary: string[];
  };
}

export interface Person {
  name: string;
  alias: string;
  badges: string[];           // [chapter, role]

  // Dossier fields — optional so the card renders regardless of coverage.
  affiliation?: string;
  status?: string;
  active?: string;
  jurisdiction?: string;
  awards?: string[];
  works?: string[];
  knownFor?: string[];
  coldOpen?: string;
  whyMatters?: string;
  bio?: string;
  quote?: string;             // legacy — kept for back-compat
  contributions?: string[];   // legacy — kept for back-compat
}
