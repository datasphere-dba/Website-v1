import type { CourseMode } from "@/types/course";

export type LearningModeItem = {
  code: string;
  title: string;
  summary: string;
  points: string[];
  portal?: boolean;
};

/**
 * Canonical learning modes shown on the Home page and course detail pages.
 * Kept in sync across the site.
 */
export const LEARNING_MODES: LearningModeItem[] = [
  {
    code: "OLT",
    title: "Online Live Training",
    summary: "Instructor-led classroom-style sessions with your batch, on a fixed schedule.",
    points: ["Weekday or weekend batches", "Early morning or late evening"],
  },
  {
    code: "HML",
    title: "Hybrid Mode Learning",
    summary: "Learn in your free time, with live guidance sessions from Mohan to keep you moving.",
    points: ["Guidance on weekdays or weekends", "Made for busy DBAs"],
  },
  {
    code: "dbaStanza",
    title: "Daily DBA live modules",
    summary:
      "Short specialised modules (RAC, HA/DR, migration, upgrades) you pick up in your week-off.",
    points: ["Modular courses, maximum knowledge"],
    portal: true,
  },
];

/**
 * Lookup mode details for a specific course mode code.
 */
export function getCourseModeDetails(mode: CourseMode): {
  code: string;
  title: string;
  summary: string;
  points: string[];
} {
  switch (mode) {
    case "hml":
      return {
        code: "HML",
        title: "Hybrid Mode Learning",
        summary: "Learn in your free time, with live guidance sessions from Mohan to keep you moving.",
        points: ["Guidance on weekdays or weekends", "Made for busy DBAs"],
      };
    case "olt":
      return {
        code: "OLT",
        title: "Online Live Training",
        summary: "Instructor-led classroom-style sessions with your batch, on a fixed schedule.",
        points: ["Weekday or weekend batches", "Early morning or late evening"],
      };
    case "live-workshop":
      return {
        code: "Live Workshop",
        title: "Live Interactive Workshop",
        summary:
          "Intensive instructor-led live workshop covering real-world server implementation and hands-on scenarios.",
        points: ["Hands-on practical sessions", "Live Q&A and troubleshooting"],
      };
    case "self-paced":
      return {
        code: "Self-Paced",
        title: "Self-Paced Learning",
        summary: "Comprehensive self-paced syllabus with modular video guides and structured assignments.",
        points: ["Learn at your own pace", "Full curriculum access"],
      };
  }
}
