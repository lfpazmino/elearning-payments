import courseData from "./course-openai.json";
import { courseSchema, type Course } from "./schema";

// Parsed once at build/import time. The prebuild gate (scripts/validate-content.ts)
// runs first and fails the build with a clear message if this would throw.
export const course: Course = courseSchema.parse(courseData);

export * from "./schema";
