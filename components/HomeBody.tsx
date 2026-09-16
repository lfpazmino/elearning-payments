"use client";

import Link from "next/link";
import { course } from "@/content";
import { useProgress } from "@/lib/progress";

export function HomeBody() {
  const { moduleStats, overall, firstIncomplete } = useProgress();
  const o = overall();
  const resume = firstIncomplete();

  const statusText =
    o.done === 0
      ? "No units completed yet. Start with Orientation — it frames everything that follows."
      : o.done === o.total
        ? `All ${o.total} units complete. Go back to module 08 and rehearse out loud.`
        : `${o.done} of ${o.total} units complete (${o.pct}%). Pick up where you left off below.`;

  return (
    <>
      <p className="note" style={{ marginTop: 26 }}>
        {statusText}
      </p>
      {resume ? (
        <Link
          href={`/${resume.key}`}
          className="btn"
          style={{ marginTop: 18 }}
        >
          {(o.done ? "Resume: " : "Start: ") + resume.unit.title}
        </Link>
      ) : null}
      <div className="modgrid">
        {course.modules.map((m) => {
          const st = moduleStats(m);
          return (
            <Link key={m.id} href={`/${m.id}/${m.units[0].id}`} className="modcard">
              <span className="n">MODULE {m.n}</span>
              <h3>{m.title}</h3>
              <p>{m.subtitle}</p>
              <div className="bar">
                <i style={{ width: st.pct + "%" }}></i>
              </div>
              <span className="st">
                {st.done} / {st.total} units
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
