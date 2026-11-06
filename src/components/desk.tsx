import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { JournalPanel } from "@/components/journal-panel";
import { MethodPanel } from "@/components/method-panel";
import { ScanPanel } from "@/components/scan-panel";
import { usePaper, usePrefs } from "@/lib/use-desk-state";

const TABS = [
  { id: "scan", label: "فیلتر" },
  { id: "journal", label: "دفترچه" },
  { id: "method", label: "روش" },
] as const;

export function Desk() {
  const { prefs, setPrefs } = usePrefs();
  const paper = usePaper();
  const [tab, setTab] = useState("scan");

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Mark />
            <h1 className="text-2xl font-semibold tracking-tight">غربال</h1>
          </div>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            میز فیلتر کال‌های BITFA. کانال ایده می‌دهد؛ اینجا فقط می‌گوید ساختار ورود خراب است یا نه.
          </p>
        </div>
      </header>

      <p className="rounded-card border border-line bg-surface px-3 py-3 text-sm leading-6 text-muted">
        توصیهٔ خرید نیست. ممکن است کل مبلغ درگیر را از دست بدهی. امتیاز، پیش‌بینی سود کانال نیست.
      </p>

      <section className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted">سرمایه، دلار</span>
          <input
            className="num h-12 rounded-card border border-line bg-surface px-3 text-sm"
            inputMode="decimal"
            value={prefs.bankroll}
            onChange={(e) => {
              const n = Number(e.target.value);
              if (Number.isFinite(n)) setPrefs({ ...prefs, bankroll: Math.min(1_000_000, Math.max(0, n)) });
            }}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted">ریسک هر معامله، درصد</span>
          <input
            className="num h-12 rounded-card border border-line bg-surface px-3 text-sm"
            inputMode="decimal"
            value={prefs.riskPct}
            onChange={(e) => {
              const n = Number(e.target.value);
              if (Number.isFinite(n)) setPrefs({ ...prefs, riskPct: Math.min(5, Math.max(0, n)) });
            }}
          />
        </label>
      </section>

      <Tabs.Root value={tab} onValueChange={setTab}>
        <Tabs.List className="grid grid-cols-3 gap-1 rounded-card bg-surface p-1">
          {TABS.map((item) => (
            <Tabs.Trigger
              key={item.id}
              value={item.id}
              className="h-11 rounded-lg text-sm text-muted data-[state=active]:bg-surface-2 data-[state=active]:text-fg"
            >
              {item.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="scan" className="mt-4">
          <ScanPanel
            bankroll={prefs.bankroll}
            riskPct={prefs.riskPct}
            onPaper={(row) => {
              paper.add(row);
            }}
          />
        </Tabs.Content>
        <Tabs.Content value="journal" className="mt-4">
          <JournalPanel
            silentLoss={prefs.silentLoss}
            capture={prefs.capture}
            onSilent={(silentLoss) => setPrefs({ ...prefs, silentLoss })}
            onCapture={(capture) => setPrefs({ ...prefs, capture })}
            paper={paper.rows}
            onSettle={paper.settle}
            onRemove={paper.remove}
          />
        </Tabs.Content>
        <Tabs.Content value="method" className="mt-4">
          <MethodPanel />
        </Tabs.Content>
      </Tabs.Root>
    </main>
  );
}

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
      <rect width="32" height="32" rx="8" className="fill-surface" />
      <circle cx="16" cy="16" r="9" className="stroke-copper" strokeWidth="2" fill="none" />
      <path d="M9 13h14M10 16h12M11 19h10" className="stroke-fg" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
