import { describe, expect, it } from "vitest";
import { course } from "@/content";
import {
  FLAT,
  allResources,
  familyOf,
  firstIncomplete,
  indexOfKey,
  moduleStats,
  overall,
} from "@/lib/course";

describe("course helpers", () => {
  it("indexes 11 modules and 36 units", () => {
    expect(course.modules).toHaveLength(11);
    expect(FLAT).toHaveLength(36);
  });

  it("counts completed units per module", () => {
    const m = course.modules[0];
    const done = new Set(m.units.slice(0, 2).map((u) => `${m.id}/${u.id}`));
    expect(moduleStats(m, done)).toEqual({ done: 2, total: m.units.length, pct: expect.any(Number) });
  });

  it("computes whole-course progress", () => {
    const done = new Set([FLAT[0].key]);
    expect(overall(done)).toEqual({ done: 1, total: 36, pct: 3 });
  });

  it("finds the first incomplete unit", () => {
    const done = new Set([FLAT[0].key]);
    expect(firstIncomplete(done)?.key).toBe(FLAT[1].key);
  });

  it("maps tags to families", () => {
    expect(familyOf("Standard")).toBe("Standards & rulebooks");
    expect(familyOf("Regulator")).toBe("Regulators & operators");
    expect(familyOf("Something else")).toBe("Primers & analysis");
  });

  it("locates a flat unit by key", () => {
    expect(indexOfKey(FLAT[0].key)).toBe(0);
    expect(indexOfKey("not/real")).toBe(-1);
  });

  it("aggregates 86 resources", () => {
    expect(allResources()).toHaveLength(86);
  });
});
