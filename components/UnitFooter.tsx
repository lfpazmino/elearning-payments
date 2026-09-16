"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FLAT } from "@/lib/course";
import { useProgress } from "@/lib/progress";

export function UnitFooter({ index }: { index: number }) {
  const router = useRouter();
  const { isDone, setDone } = useProgress();
  const f = FLAT[index];
  const key = f.key;
  const complete = isDone(key);
  const isLast = index === FLAT.length - 1;

  return (
    <div className="unitfoot">
      <button
        type="button"
        className={"btn" + (complete ? " done-state" : "")}
        onClick={() => {
          if (isDone(key)) {
            setDone(key, false);
          } else {
            setDone(key, true);
            if (!isLast) router.push(`/${FLAT[index + 1].key}`);
          }
        }}
      >
        {complete
          ? "✓ Completed — mark as not done"
          : isLast
            ? "Mark complete — finish course"
            : "Mark complete and continue"}
      </button>
      <div className="navpair">
        {index > 0 ? (
          <Link href={`/${FLAT[index - 1].key}`} className="btn ghost">
            ← Previous
          </Link>
        ) : null}
        {!isLast ? (
          <Link href={`/${FLAT[index + 1].key}`} className="btn ghost">
            Next →
          </Link>
        ) : null}
      </div>
    </div>
  );
}
