import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { scanSymbols } from "@/lib/market.functions";
import type { PaperTrade, Snap } from "@/lib/market-types";
import { formatPct, formatPx, formatQty, formatUsd } from "@/lib/format";
import { scoreSnap, tradePlan, venueLabel, verdictNote, type Scored, type Verdict } from "@/lib/score";

const SAMPLE = ["KAITO", "LINK", "ZRO", "VVV"];

function parseSymbols(raw: string): string[] {
  const found = raw.toUpperCase().match(/[A-Z][A-Z0-9]{1,14}/g) ?? [];
  const out: string[] = [];
  for (const symbol of found) {
    if (!out.includes(symbol)) out.push(symbol);
    if (out.length >= 8) break;
  }
  return out;
}

function tone(verdict: Verdict): string {
  if (verdict === "check") return "text-olive";
  if (verdict === "mid") return "text-copper";
  return "text-loss";
}

function ScoreDial({ total, verdict }: { total: number; verdict: Verdict }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (Math.max(0, Math.min(100, total)) / 100) * circ;
  return (
    <div className={`relative size-20 shrink-0 ${tone(verdict)}`}>
      <svg viewBox="0 0 72 72" className="size-20 -rotate-90" aria-hidden="true">
        <circle cx="36" cy="36" r={r} className="stroke-line" strokeWidth="5" fill="none" />
        <circle
          cx="36"
          cy="36"
          r={r}
          className="stroke-current"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
        />
      </svg>
      <span className="num absolute inset-0 flex items-center justify-center text-xl font-semibold text-fg">
        {total}
      </span>
    </div>
  );
}

function ResultCard({
  snap,
  bankroll,
  riskPct,
  saved,
  onPaper,
}: {
  snap: Snap;
  bankroll: number;
  riskPct: number;
  saved: boolean;
  onPaper: (row: PaperTrade) => void;
}) {
  const scored: Scored = scoreSnap(snap);
  const plan = snap.price != null ? tradePlan(snap.price, snap.change24h, bankroll, riskPct) : null;
  const up = (snap.change24h ?? 0) >= 0;

  return (
    <article className="rounded-card border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-2">
            <h3 className="num text-lg font-semibold">{snap.symbol}</h3>
            <span className={`text-sm font-medium ${tone(scored.verdict)}`}>{scored.verdictLabel}</span>
          </div>
          <p className="mt-1 text-sm text-muted">
            {snap.name ?? "بدون نام"}
            {snap.venue !== "none" ? ` · ${venueLabel(snap.venue)}` : ""}
            {snap.chain ? ` · ${snap.chain}` : ""}
          </p>
          <p className="mt-2 text-sm leading-6 text-fg">{verdictNote(scored.verdict)}</p>
        </div>
        <ScoreDial total={scored.total} verdict={scored.verdict} />
      </div>

      {snap.found && (
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="قیمت" value={formatPx(snap.price)} />
          <Stat
            label="۲۴ ساعت"
            value={snap.change24h == null ? "—" : formatPct(snap.change24h)}
            valueClass={snap.change24h == null ? "" : up ? "text-olive" : "text-loss"}
          />
          <Stat label="حجم" value={formatUsd(snap.volume24h)} />
          <Stat label="مارکت" value={formatUsd(snap.marketCap)} />
        </dl>
      )}

      <ul className="mt-4 flex flex-col gap-2">
        {scored.modules.map((mod) => (
          <li key={mod.id} className="flex items-center gap-2">
            <span className="w-16 shrink-0 text-xs text-muted">{mod.label}</span>
            <span className="meter min-w-0 flex-1" aria-hidden="true">
              <span style={{ width: `${(mod.score / mod.max) * 100}%` }} />
            </span>
            <span className="num w-12 shrink-0 text-end text-xs text-muted">
              {mod.score}/{mod.max}
            </span>
          </li>
        ))}
      </ul>

      {scored.capReason && (
        <p className="mt-3 text-sm text-loss">
          سقف اعمال شد: {scored.capReason}
          {scored.raw !== scored.total ? ` (خام ${scored.raw})` : ""}
        </p>
      )}

      {scored.flags.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1 text-sm text-muted">
          {scored.flags.map((flag) => (
            <li key={flag}>{flag}</li>
          ))}
        </ul>
      )}

      {plan && (
        <div className="mt-4 rounded-card bg-surface-2 p-3">
          <h4 className="text-sm font-medium">قالب ریسک، نه سیگنال</h4>
          <p className="mt-1 text-sm leading-6 text-muted">
            {plan.chase
              ? "ورود بازار ممنوع. فقط اگر به ناحیهٔ عقب‌نشینی رسید."
              : "اگر وارد می‌شوی، بازار ندو. سفارش را داخل ناحیه بگذار و حد باطل را همان لحظه ثبت کن."}
          </p>
          <dl className="mt-3 grid grid-cols-2 gap-3">
            <Stat label="ناحیهٔ ورود" value={`${formatPx(plan.entryLow)} – ${formatPx(plan.entryHigh)}`} />
            <Stat label="حد باطل" value={`${formatPx(plan.stop)} · ${formatPct(-plan.stopPct * 100, 0)}`} />
            <Stat label="هدف ۱ / ۲ / ۳" value={`${formatPx(plan.tp1)} · ${formatPx(plan.tp2)} · ${formatPx(plan.tp3)}`} />
            <Stat
              label="حجم از روی ریسک"
              value={`${formatUsd(plan.notional)} · ${Math.round(plan.notionalPct)}% سرمایه`}
            />
          </dl>
          <p className="mt-2 text-xs leading-6 text-muted">
            ریسک این معامله <span className="num">{formatUsd(plan.riskUsd)}</span> است. تعداد حدود{" "}
            <span className="num">{formatQty(plan.qty)}</span>. هدف‌ها از وسط ناحیه حساب شده‌اند: یک‌برابر، دو‌برابر و
            سه‌ونیم‌برابر فاصله تا حد باطل.
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {snap.pairUrl && (
          <a
            className="inline-flex h-11 items-center rounded-card border border-line px-4 text-sm"
            href={snap.pairUrl}
            target="_blank"
            rel="noreferrer"
          >
            نمودار
          </a>
        )}
        <button
          type="button"
          className="inline-flex h-11 items-center rounded-card bg-copper px-4 text-sm font-medium text-copper-ink disabled:opacity-60"
          disabled={saved || !snap.found}
          onClick={() =>
            onPaper({
              id: `${snap.symbol}-${Date.now()}`,
              symbol: snap.symbol,
              name: snap.name,
              at: new Date().toISOString(),
              score: scored.total,
              verdict: scored.verdict,
              price: snap.price,
              stop: plan?.stop ?? null,
              exitPct: null,
            })
          }
        >
          {saved ? "در آزمایش ثبت شد" : "بگذار در آزمایش"}
        </button>
      </div>
    </article>
  );
}

function Stat({ label, value, valueClass = "" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className={`num mt-1 text-sm break-words ${valueClass}`}>{value}</dd>
    </div>
  );
}

export function ScanPanel({
  bankroll,
  riskPct,
  onPaper,
}: {
  bankroll: number;
  riskPct: number;
  onPaper: (row: PaperTrade) => void;
}) {
  const scan = useServerFn(scanSymbols);
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<Snap[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  async function run(symbols: string[]) {
    setPending(true);
    setError(null);
    try {
      const snaps = await scan({ data: { symbols } });
      const ordered = [...snaps].sort((a, b) => scoreSnap(b).total - scoreSnap(a).total);
      setRows(ordered);
      if (!ordered.length) setError("نماد معتبری پیدا نشد.");
    } catch {
      setError("بازار جواب نداد. چند ثانیه بعد دوباره بزن.");
    } finally {
      setPending(false);
    }
  }

  function onSubmit() {
    const symbols = parseSymbols(text);
    if (!symbols.length) {
      setError("نماد لاتین پیدا نشد. مثل ZRO یا #VVV بنویس.");
      setRows([]);
      return;
    }
    void run(symbols);
  }

  return (
    <div className="flex flex-col gap-4">
      <ol className="grid gap-3 sm:grid-cols-3">
        <Step n="۱" text="نمادهای امروز کانال را بچسبان. خودت ارز پیدا نکن." />
        <Step n="۲" text="امتیاز یعنی ساختار معامله، نه پیش‌بینی سود." />
        <Step n="۳" text="فقط قابل‌قبول‌ها، آن هم با حد باطل و حجم محاسبه‌شده." />
      </ol>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-muted">نمادها، حداکثر ۸ تا</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          spellCheck={false}
          autoComplete="off"
          placeholder={"#ZRO\nVVV\nKAITO"}
          className="num min-h-28 rounded-card border border-line bg-surface px-3 py-3 text-sm text-fg outline-none"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={onSubmit}
          className="inline-flex h-12 items-center rounded-card bg-copper px-5 font-semibold text-copper-ink disabled:opacity-60"
        >
          {pending ? "در حال خواندن بازار…" : "بسنج"}
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            setText(SAMPLE.join("\n"));
            void run(SAMPLE);
          }}
          className="inline-flex h-12 items-center rounded-card border border-line px-5 text-sm disabled:opacity-60"
        >
          چهار نمونه
        </button>
      </div>
      {error && <p className="text-sm text-loss">{error}</p>}

      <div className="flex flex-col gap-3">
        {rows.map((snap) => (
          <ResultCard
            key={snap.symbol}
            snap={snap}
            bankroll={bankroll}
            riskPct={riskPct}
            saved={savedIds.includes(snap.symbol)}
            onPaper={(row) => {
              onPaper(row);
              setSavedIds((prev) => (prev.includes(row.symbol) ? prev : [...prev, row.symbol]));
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Step({ n, text }: { n: string; text: string }) {
  return (
    <li className="rounded-card border border-line bg-surface p-3">
      <span className="num text-xs text-copper">{n}</span>
      <p className="mt-1 text-sm leading-6">{text}</p>
    </li>
  );
}
