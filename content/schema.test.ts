import { describe, expect, it } from "vitest";
import courseData from "./course.json";
import { courseSchema } from "./schema";

describe("course schema", () => {
  it("validates the shipped content", () => {
    expect(courseSchema.safeParse(courseData).success).toBe(true);
  });

  it("rejects a unit with an empty check array", () => {
    const bad = JSON.parse(JSON.stringify(courseData));
    bad.modules[0].units[0].check = [];
    expect(courseSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects an unknown block type", () => {
    const bad = JSON.parse(JSON.stringify(courseData));
    bad.modules[0].units[0].blocks[0] = { t: "bogus", v: "x" };
    expect(courseSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects a non-http resource url", () => {
    const bad = JSON.parse(JSON.stringify(courseData));
    bad.modules[0].units[0].resources[0].url = "ftp://example.com/x";
    expect(courseSchema.safeParse(bad).success).toBe(false);
  });
});
