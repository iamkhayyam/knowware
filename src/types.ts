export interface Chapter {
  num: string;
  title: string;
  sub: string;
  content: string;
  triads: {
    academic: string[];
    practitioner: string[];
    visionary: string[];
  };
}
