"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CourseModule } from "@/content";
import {
  firstIncomplete as calcFirstIncomplete,
  moduleStats as calcModuleStats,
  overall as calcOverall,
  type FlatUnit,
} from "./course";

const STORE_PROGRESS = "payments-academy.progress.v1";

function loadDone(): Set<string> {
  try {
    const raw = localStorage.getItem(STORE_PROGRESS);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((k): k is string => typeof k === "string"));
  } catch {
    return new Set();
  }
}

interface ProgressValue {
  done: ReadonlySet<string>;
  isDone: (key: string) => boolean;
  setDone: (key: string, val: boolean) => void;
  resetAll: () => void;
  moduleStats: (m: CourseModule) => { done: number; total: number; pct: number };
  overall: () => { done: number; total: number; pct: number };
  firstIncomplete: () => FlatUnit | null;
}

const ProgressContext = createContext<ProgressValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [done, setDoneState] = useState<Set<string>>(new Set());

  useEffect(() => {
    setDoneState(loadDone());
  }, []);

  const isDone = useCallback((key: string) => done.has(key), [done]);

  const setDone = useCallback((key: string, val: boolean) => {
    setDoneState((prev) => {
      const next = new Set(prev);
      if (val) next.add(key);
      else next.delete(key);
      try {
        localStorage.setItem(STORE_PROGRESS, JSON.stringify([...next]));
      } catch {
        /* storage failure must not break the page (NFR-05) */
      }
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setDoneState(new Set());
    try {
      localStorage.setItem(STORE_PROGRESS, "[]");
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<ProgressValue>(
    () => ({
      done,
      isDone,
      setDone,
      resetAll,
      moduleStats: (m) => calcModuleStats(m, done),
      overall: () => calcOverall(done),
      firstIncomplete: () => calcFirstIncomplete(done),
    }),
    [done, isDone, setDone, resetAll],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within a ProgressProvider");
  return ctx;
}
