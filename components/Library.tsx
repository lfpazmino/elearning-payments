"use client";

import { useState } from "react";
import { Resources } from "@/components/Resources";
import { course } from "@/content";
import { allResources, familyOf, FAMILY_NAMES } from "@/lib/course";

export function Library() {
  const [filter, setFilter] = useState("All");
  const all = allResources();

  const counts: Record<string, number> = {};
  for (const x of all) {
    const f = familyOf(x.r.tag);
    counts[f] = (counts[f] ?? 0) + 1;
  }
  const groups = ["All", ...FAMILY_NAMES.filter((f) => counts[f])];

  return (
    <div className="pane">
      <div className="hero">
        <span className="eyebrow">Every source in one place</span>
        <h1>Resource library</h1>
        <p className="lede">
          {all.length} resources across {course.modules.length} modules. All free to access; a few
          vendor documents ask for an email address.
        </p>
      </div>

      <div className="filters">
        {groups.map((t) => (
          <button
            key={t}
            className="chip"
            aria-pressed={filter === t ? "true" : "false"}
            onClick={() => setFilter(t)}
          >
            {t === "All" ? `All ${all.length}` : `${t} ${counts[t]}`}
          </button>
        ))}
      </div>

      {course.modules.map((m) => {
        const items = m.units.flatMap((u) =>
          u.resources.filter((r) => filter === "All" || familyOf(r.tag) === filter),
        );
        if (items.length === 0) return null;
        return (
          <div key={m.id} className="libgroup">
            <span className="eyebrow">Module {m.n}</span>
            <h3>{m.title}</h3>
            <Resources list={items} />
          </div>
        );
      })}
    </div>
  );
}
