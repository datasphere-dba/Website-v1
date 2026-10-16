// Shared course types. Shape follows the course sheet
// ("02 Course details – fees & enrol links.xlsx") so the admin panel
// and database can take over later without changing the pages.

export type Fee = {
  /** Plan name shown on the pricing table, e.g. "Self-paced", "Live batch". */
  plan: string;
  /** Price in INR, or a "TODO" string until the course sheet confirms it. */
  amountInr: number | "TODO";
  note?: string;
};

export type Batch = {
  /** ISO date (YYYY-MM-DD). */
  startDate: string;
  /** Free text, e.g. "Mon–Fri, 7:00–8:30 AM IST". */
  schedule: string;
  mode: "online" | "classroom" | "hybrid";
  seatsLeft?: number;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type SeoFields = {
  title: string;
  description: string;
};

export type Course = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  durationHours?: number;
  fees: Fee[];
  batches: Batch[];
  /** TrainerCentral enrol link for this course. */
  enrolUrl: string;
  faq: FaqItem[];
  seo: SeoFields;
};
