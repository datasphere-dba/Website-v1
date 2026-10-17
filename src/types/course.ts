import type { z } from "zod";
import type {
  CourseSchema,
  TechnologySchema,
  CourseKindSchema,
  CourseModeSchema,
  CourseStatusSchema,
  CourseFaqItemSchema,
  CourseBatchSchema,
  CourseSeoSchema,
} from "@/lib/course-schema";

export type Course = z.infer<typeof CourseSchema>;
export type Technology = z.infer<typeof TechnologySchema>;
export type CourseKind = z.infer<typeof CourseKindSchema>;
export type CourseMode = z.infer<typeof CourseModeSchema>;
export type CourseStatus = z.infer<typeof CourseStatusSchema>;
export type CourseFaqItem = z.infer<typeof CourseFaqItemSchema>;
export type CourseBatch = z.infer<typeof CourseBatchSchema>;
export type CourseSeo = z.infer<typeof CourseSeoSchema>;
