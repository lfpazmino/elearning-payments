"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { course } from "@/content";
import { FLAT } from "@/lib/course";
import { useProgress } from "@/lib/progress";

const STORE_THEME = "payments-academy.theme.v1";
type Theme = "system" | "light" | "dark";

function readTheme(): Theme {
  try {
    const t = localStorage.getItem(STORE_THEME);
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}

function applyTheme(t: Theme) {
  if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  else document.documentElement.removeAttribute("data-theme");
}

function unitKeyFromPath(pathname: string): string | null {
  const parts = pathname.split("/").filter(Boolean);
  return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : null;
}

export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isDone, moduleStats, overall, resetAll } = useProgress();
  const currentKey = unitKeyFromPath(pathname);
  const currentModId = currentKey ? currentKey.split("/")[0] : null;

  const [railOpen, setRailOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");
  const [openMods, setOpenMods] = useState<Set<string>>(
    () => new Set([(currentKey ?? FLAT[0].key).split("/")[0]]),
  );

  useEffect(() => {
    const t = readTheme();
    setTheme(t);
    applyTheme(t);
  }, []);

  const o = overall();

  const toggleModule = (id: string) => {
    setOpenMods((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const cycleTheme = () => {
    const next: Theme = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORE_THEME, next);
    } catch {
      /* ignore */
    }
  };

  const closeRail = () => setRailOpen(false);

  return (
    <>
      <header className="topbar">
        <button
          className="iconbtn"
          id="menuBtn"
          type="button"
          aria-label="Toggle contents"
          onClick={() => setRailOpen((v) => !v)}
        >
          ☰
        </button>
        <Link className="brand" href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <span className="mark">{course.meta.title}</span>
          <span className="sub">Sibos 2026 · Miami</span>
        </Link>
        <span className="spacer"></span>
        <div className="gauge" title="Course progress">
          <span className="track">
            <span className="fill" style={{ width: o.pct + "%" }}></span>
          </span>
          <span className="pct">{o.pct}%</span>
        </div>
        <button className="iconbtn" type="button" aria-label="Cycle colour theme" onClick={cycleTheme}>
          {theme === "system" ? "AUTO" : theme.toUpperCase()}
        </button>
      </header>

      <div className={"scrim" + (railOpen ? " on" : "")} onClick={closeRail}></div>

      <div className="shell">
        <nav className={"rail" + (railOpen ? " open" : "")} aria-label="Course contents">
          {course.modules.map((m) => {
            const st = moduleStats(m);
            const open = openMods.has(m.id) || m.id === currentModId;
            return (
              <div
                key={m.id}
                className={"mod" + (st.done === st.total ? " complete" : "") + (open ? " open" : "")}
              >
                <button
                  className="mod-head"
                  type="button"
                  aria-expanded={open ? "true" : "false"}
                  onClick={() => toggleModule(m.id)}
                >
                  <span className="n">{m.n}</span>
                  <span>{m.title}</span>
                  <span className="cnt">
                    {st.done}/{st.total}
                  </span>
                </button>
                <ul className="mod-units">
                  {m.units.map((u) => {
                    const key = `${m.id}/${u.id}`;
                    return (
                      <li key={u.id}>
                        <Link
                          href={`/${m.id}/${u.id}`}
                          onClick={closeRail}
                          className={"unit-link" + (isDone(key) ? " done" : "")}
                          aria-current={currentKey === key ? "true" : undefined}
                        >
                          <span className="tick">✓</span>
                          <span className="label">{u.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          <div className="rail-foot">
            <Link href="/library" className="iconbtn" style={{ width: "100%" }} onClick={closeRail}>
              RESOURCE LIBRARY
            </Link>
            <button className="iconbtn" type="button" style={{ width: "100%" }} onClick={resetAll}>
              RESET PROGRESS
            </button>
          </div>
        </nav>
        <main>{children}</main>
      </div>
    </>
  );
}
