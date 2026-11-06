import { useEffect, useState } from "react";
import type { PaperTrade } from "@/lib/market-types";

type Prefs = {
  bankroll: number;
  riskPct: number;
  silentLoss: number;
  capture: number;
};

const PREF_KEY = "sieve-prefs";
const PAPER_KEY = "sieve-paper";

const DEFAULTS: Prefs = { bankroll: 100, riskPct: 1, silentLoss: 12, capture: 40 };

function readPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(PREF_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    return {
      bankroll: clamp(parsed.bankroll, 10, 1_000_000, DEFAULTS.bankroll),
      riskPct: clamp(parsed.riskPct, 0.25, 5, DEFAULTS.riskPct),
      silentLoss: clamp(parsed.silentLoss, 5, 100, DEFAULTS.silentLoss),
      capture: clamp(parsed.capture, 10, 100, DEFAULTS.capture),
    };
  } catch {
    return DEFAULTS;
  }
}

function clamp(value: unknown, min: number, max: number, fallback: number): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

export function usePrefs() {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPrefs(readPrefs());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
  }, [prefs, ready]);

  return { prefs, setPrefs };
}

function readPaper(): PaperTrade[] {
  try {
    const raw = localStorage.getItem(PAPER_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isPaper).slice(0, 100);
  } catch {
    return [];
  }
}

function isPaper(v: unknown): v is PaperTrade {
  if (!v || typeof v !== "object") return false;
  const o = v as Partial<PaperTrade>;
  return typeof o.id === "string" && typeof o.symbol === "string" && typeof o.score === "number";
}

export function usePaper() {
  const [rows, setRows] = useState<PaperTrade[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRows(readPaper());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(PAPER_KEY, JSON.stringify(rows));
  }, [rows, ready]);

  function add(row: PaperTrade) {
    setRows((prev) => [row, ...prev].slice(0, 100));
  }

  function settle(id: string, exitPct: number) {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, exitPct } : row)));
  }

  function remove(id: string) {
    setRows((prev) => prev.filter((row) => row.id !== id));
  }

  return { rows, add, settle, remove };
}
