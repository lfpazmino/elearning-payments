import { course } from "@/content";
import type { CourseModule, Resource, Unit } from "@/content";

export interface FlatUnit {
  key: string;
  mod: CourseModule;
  unit: Unit;
  mi: number;
  ui: number;
}

export const FLAT: FlatUnit[] = course.modules.flatMap((mod, mi) =>
  mod.units.map((unit, ui) => ({ key: `${mod.id}/${unit.id}`, mod, unit, mi, ui })),
);

export function indexOfKey(key: string): number {
  return FLAT.findIndex((f) => f.key === key);
}

export function moduleStats(m: CourseModule, done: ReadonlySet<string>) {
  const total = m.units.length;
  const n = m.units.filter((u) => done.has(`${m.id}/${u.id}`)).length;
  return { done: n, total, pct: total ? Math.round((n / total) * 100) : 0 };
}

export function overall(done: ReadonlySet<string>) {
  const n = FLAT.filter((f) => done.has(f.key)).length;
  return { done: n, total: FLAT.length, pct: FLAT.length ? Math.round((n / FLAT.length) * 100) : 0 };
}

export function firstIncomplete(done: ReadonlySet<string>): FlatUnit | null {
  return FLAT.find((f) => !done.has(f.key)) ?? null;
}

// Each resource keeps its own precise tag; the library filters by family so the chip
// row stays readable instead of listing twenty near-synonyms.
export const FAMILIES = [
  { name: "Standards & rulebooks", tags: ["Standard", "Rulebook", "Spec", "Docs"] },
  { name: "Regulators & operators", tags: ["Regulator", "Operator", "Timeline"] },
  { name: "Vendor & reference", tags: ["Vendor", "Reference", "Core", "Course", "Pattern"] },
  { name: "Primers & analysis", tags: ["Primer", "Analysis", "Report", "Trade", "News", "Agenda", "Event", "Webinar"] },
] as const;

export const FAMILY_NAMES = FAMILIES.map((f) => f.name);

export function familyOf(tag: string): string {
  for (const f of FAMILIES) {
    if ((f.tags as readonly string[]).indexOf(tag) > -1) return f.name;
  }
  return "Primers & analysis";
}

export interface IndexedResource {
  r: Resource;
  m: CourseModule;
  u: Unit;
}

export function allResources(): IndexedResource[] {
  const out: IndexedResource[] = [];
  for (const m of course.modules) {
    for (const u of m.units) {
      for (const r of u.resources) out.push({ r, m, u });
    }
  }
  return out;
}
