import { z } from "zod";

// Ported from prototype/assets/js/schema.js — same rules, now Zod. The non-empty
// `check` array invariant is the one the Phase 1 closure pass added.

const nonEmpty = z.string().trim().min(1);

const blockSchema = z.discriminatedUnion("t", [
  z.object({ t: z.literal("h"), v: nonEmpty }),
  z.object({ t: z.literal("p"), v: nonEmpty }),
  z.object({ t: z.literal("note"), v: nonEmpty }),
  z.object({ t: z.literal("ul"), v: z.array(nonEmpty) }),
  z.object({ t: z.literal("ol"), v: z.array(nonEmpty) }),
  z.object({ t: z.literal("callout"), title: nonEmpty, v: nonEmpty }),
  z
    .object({ t: z.literal("table"), head: z.array(z.string()).min(1), rows: z.array(z.array(z.string())) })
    .superRefine((val, ctx) => {
      // head[0] is the matrix corner: empty is the deliberate two-axis convention.
      val.head.slice(1).forEach((h, i) => {
        if (h.trim().length === 0) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["head", i + 1], message: "empty header" });
        }
      });
      val.rows.forEach((row, ri) => {
        if (row.length !== val.head.length) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["rows", ri],
            message: `cell count ${row.length} != header count ${val.head.length}`,
          });
        }
        row.forEach((c, ci) => {
          if (c.trim().length === 0) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["rows", ri, ci], message: "empty cell" });
          }
        });
      });
    }),
  z.object({
    t: z.literal("stats"),
    v: z.array(z.object({ n: nonEmpty, c: nonEmpty, s: nonEmpty, hi: z.boolean().optional() })),
  }),
  z.object({ t: z.literal("qa"), v: z.array(z.object({ q: nonEmpty, a: nonEmpty })) }),
  z.object({ t: z.literal("beats"), v: z.array(z.object({ t: nonEmpty, v: nonEmpty })) }),
  z.object({ t: z.literal("gloss"), v: z.array(z.object({ term: nonEmpty, def: nonEmpty })) }),
]);

const resourceSchema = z.object({
  tag: nonEmpty,
  title: nonEmpty,
  url: z.string().regex(/^https?:\/\//i, "must be an http(s) URL"),
  note: nonEmpty,
});

const unitSchema = z.object({
  id: nonEmpty,
  title: nonEmpty,
  objective: nonEmpty,
  mins: z.number().positive(),
  blocks: z.array(blockSchema),
  resources: z.array(resourceSchema),
  check: z.array(nonEmpty).min(1),
});

const moduleSchema = z.object({
  id: nonEmpty,
  n: nonEmpty,
  title: nonEmpty,
  subtitle: nonEmpty,
  units: z.array(unitSchema).min(1),
});

export const courseSchema = z.object({
  meta: z.object({
    title: nonEmpty,
    tagline: nonEmpty,
    event: nonEmpty,
    verified: nonEmpty,
  }),
  modules: z.array(moduleSchema),
});

export type Course = z.infer<typeof courseSchema>;
export type CourseModule = z.infer<typeof moduleSchema>;
export type Unit = z.infer<typeof unitSchema>;
export type Block = z.infer<typeof blockSchema>;
export type Resource = z.infer<typeof resourceSchema>;
