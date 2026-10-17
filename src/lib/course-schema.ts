import { z } from "zod";

export const TechnologySchema = z.enum([
  "oracle",
  "postgresql",
  "mysql",
  "sqlserver",
  "nosql",
  "cloud",
]);

export const CourseKindSchema = z.enum(["course", "package", "workshop"]);

export const CourseModeSchema = z.enum([
  "hml",
  "olt",
  "live-workshop",
  "self-paced",
]);

export const CourseStatusSchema = z.enum(["live", "hidden"]);

export const CourseFaqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const CourseBatchSchema = z.object({
  startDate: z.string().optional(),
  schedule: z.string().optional(),
  mode: z.enum(["online", "classroom", "hybrid"]).optional(),
  seatsLeft: z.number().int().nonnegative().optional(),
});

export const CourseSeoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export const CourseSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be valid kebab-case"),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  technology: TechnologySchema,
  kind: CourseKindSchema,
  mode: CourseModeSchema,
  priceInr: z.number().int().positive("priceInr must be a positive integer"),
  enrolUrl: z
    .string()
    .url()
    .refine((url) => url.startsWith("https://training.datasphere.co.in/course/"), {
      message: "enrolUrl must start with https://training.datasphere.co.in/course/",
    }),
  descriptionHtml: z.string(),
  featured: z.boolean(),
  order: z.number().int(),
  status: CourseStatusSchema,
  faq: z.array(CourseFaqItemSchema).optional(),
  batches: z.array(CourseBatchSchema).optional(),
  seo: CourseSeoSchema.optional(),
  sourceUpdatedAt: z.string(), // "2026-10-08"
});

export type CourseSchemaType = z.infer<typeof CourseSchema>;
