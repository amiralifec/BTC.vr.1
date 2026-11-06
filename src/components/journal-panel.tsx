import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CHANNEL_CALLS, modelJournal, type CallOutcome } from "@/lib/calls";
import { formatPct, formatPx } from "@/lib/format";
import type { PaperTrade } from "@/lib/market-types";

const FILTERS: { id: "all" | CallOutcome; label: string }[] = [
  { id: "all", label: "همه" },
  { id: "win", label: "اعلام سود" },
  { id: "silent", label: "سکوت" },
  { id: "open", label: "باز" },
];

export function JournalPanel({
  silentLoss,
  capture,
  onSilent,
  onCapture,
  paper,
  onSettle,
  onRemove,
}: {
  silentLoss: number;
  capture: number;
  onSilent: (n: number) => void;
  onCapture: (n: number) => void;
  paper: PaperTrade[];
  onSettle: (id: string, exitPct: number) => void;
  onRemove: (id: string) => void;
}) {
  const model = modelJournal(silentLoss, capture);
  const [filter, setFilter] = useState<"all" | CallOutcome>("all");
  const [mounted, setMounted] = useState(false);
  const [exitDraft, setExitDraft] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const shown = CHANNEL_CALLS.filter((c) => filter === "all" || c.outcome === filter).sort((a, b) => {
    const av = a.claimedPct ?? -1;
    const bv = b.claimedPct ?? -1;
    return bv - av;
  });

  const closed = paper.filter((row) => row.exitPct != null);
  const paperAvg = closed.length ? closed.reduce((sum, row) => sum + (row.exitPct ?? 0), 0) / closed.length : null;

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-card border border-line bg-surface p-4">
        <h2 className="text-base font-semibold">دفترچهٔ BITFA، نه منحنی حساب تو</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          از {model.decided} کالِ تعیین‌تکلیف‌شده، کانال برای{" "}
          <span className="num text-fg">{Math.round(model.announceRate * 100)}٪</span> یک عدد سود نوشته است.
          میانهٔ همان اعداد <span className="num text-fg">{formatPct(model.medianClaimed, 0)}</span> است و میانگین‌شان{" "}
          <span className="num text-fg">{formatPct(model.meanClaimed, 0)}</span>. میانگین را{" "}
          <span className="num">{model.monsters}</span> کالِ بالای ۲۰۰٪ گروگان گرفته‌اند. سکوت کانال، طبق حرف خودت، ناموفق حساب شده. PEPE هنوز در دفتر باز است چون فقط
          «معرفی شد» و عددی نداشت.
        </p>
        <dl className="mt-4 grid grid-cols-3 gap-3">
          <div>
            <dt className="text-xs text-muted">اعلام سود</dt>
            <dd className="num mt-1 text-lg text-olive">{model.wins}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">سکوت</dt>
            <dd className="num mt-1 text-lg text-loss">{model.silent}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">باز</dt>
            <dd className="num mt-1 text-lg">{model.open}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-card border border-line bg-surface p-4">
        <h2 className="text-base font-semibold">اگر همه را می‌گرفتی</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          کندل لحظهٔ کال را نداریم، پس این بک‌تست قیمتی نیست. فرض: از سود اعلام‌شده فقط بخشی را می‌گیری، و هر سکوت را
          با یک حدضرر ثابت می‌بندی. عدد اصلی میانه است، نه میانگین.
        </p>
        <div className="mt-3 flex flex-col gap-3">
          <Preset
            label="برداشت از سود اعلام‌شده"
            value={capture}
            options={[30, 40, 70, 100]}
            suffix="٪"
            onPick={onCapture}
          />
          <Preset
            label="باخت فرضیِ سکوت"
            value={silentLoss}
            options={[8, 12, 20, 100]}
            suffix="٪"
            onPick={onSilent}
          />
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-card bg-surface-2 p-3">
            <dt className="text-xs text-muted">میانهٔ هر کال</dt>
            <dd className={`num mt-1 text-2xl ${model.medianModeled >= 0 ? "text-olive" : "text-loss"}`}>
              {formatPct(model.medianModeled, 1)}
            </dd>
          </div>
          <div className="rounded-card bg-surface-2 p-3">
            <dt className="text-xs text-muted">میانگین، گمراه‌کننده</dt>
            <dd className="num mt-1 text-2xl">{formatPct(model.meanModeled, 1)}</dd>
          </div>
        </dl>
        <div className="mt-4 h-52" dir="ltr">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={model.buckets}>
                <XAxis dataKey="name" tick={{ fill: "var(--color-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} width={28} tick={{ fill: "var(--color-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "var(--color-surface-2)" }}
                  contentStyle={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-line)",
                    borderRadius: 12,
                    color: "var(--color-fg)",
                  }}
                />
                <Bar dataKey="n" name="تعداد" fill="var(--color-copper)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <p className="text-xs text-muted">توزیع سود اعلام‌شده، فقط بین کال‌هایی که کانال عدد داده.</p>
      </section>

      <section className="rounded-card border border-line bg-surface p-4">
        <h2 className="text-base font-semibold">آزمایش زندهٔ خودت</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          فیلتر را روی گذشته قیمتی بک‌تست نکرده‌ام. راه درست این است که از امروز هر سنجشی را اینجا ثبت کنی و بعد از
          بستن معامله، درصد واقعی را بنویسی. بعد از حدود سی معامله معلوم می‌شود نمره به دردت خورده یا نه.
        </p>
        {paperAvg != null && (
          <p className="mt-3 text-sm">
            میانگین <span className="num">{closed.length}</span> معاملهٔ بسته‌شده:{" "}
            <span className="num">{formatPct(paperAvg, 1)}</span>
          </p>
        )}
        {paper.length === 0 ? (
          <p className="mt-3 text-sm text-muted">هنوز چیزی ثبت نشده. از تب فیلتر، «بگذار در آزمایش» را بزن.</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-3">
            {paper.map((row) => (
              <li key={row.id} className="rounded-card bg-surface-2 p-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="num font-medium">{row.symbol}</span>
                  <span className="text-sm text-muted">
                    نمره <span className="num">{row.score}</span>
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">
                  {row.price != null ? (
                    <>
                      قیمت لحظهٔ سنجش <span className="num">{formatPx(row.price)}</span>
                    </>
                  ) : (
                    "بدون قیمت"
                  )}
                  {" · "}
                  <span className="num">{new Date(row.at).toLocaleDateString("fa-IR")}</span>
                </p>
                {row.exitPct == null ? (
                  <form
                    className="mt-2 flex gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const n = Number(exitDraft[row.id]);
                      if (!Number.isFinite(n)) return;
                      onSettle(row.id, n);
                    }}
                  >
                    <input
                      inputMode="decimal"
                      placeholder="درصد خروج"
                      value={exitDraft[row.id] ?? ""}
                      onChange={(e) => setExitDraft((prev) => ({ ...prev, [row.id]: e.target.value }))}
                      className="num h-11 min-w-0 flex-1 rounded-card border border-line bg-bg px-3 text-sm"
                    />
                    <button type="submit" className="h-11 rounded-card bg-copper px-3 text-sm font-medium text-copper-ink">
                      ثبت
                    </button>
                    <button type="button" onClick={() => onRemove(row.id)} className="h-11 px-2 text-sm text-muted">
                      حذف
                    </button>
                  </form>
                ) : (
                  <p className={`num mt-2 text-sm ${row.exitPct >= 0 ? "text-olive" : "text-loss"}`}>
                    نتیجه {formatPct(row.exitPct, 1)}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={`h-11 rounded-card px-4 text-sm ${
                filter === item.id ? "bg-surface-2 text-fg" : "text-muted"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <ul className="mt-3 flex flex-col gap-2">
          {shown.map((row) => (
            <li key={row.id} className="flex items-center justify-between gap-3 rounded-card border border-line px-3 py-3">
              <div className="min-w-0">
                <p className="num font-medium">{row.symbol}</p>
                <p className="mt-1 text-xs text-muted">
                  کال {row.calledLabel}
                  {row.outcome === "win" ? ` · تا ${row.reportedLabel}` : ""}
                </p>
              </div>
              <span
                className={`num shrink-0 text-sm ${
                  row.outcome === "win" ? "text-olive" : row.outcome === "silent" ? "text-loss" : "text-muted"
                }`}
              >
                {row.outcome === "win" && row.claimedPct != null
                  ? formatPct(row.claimedPct, 0)
                  : row.outcome === "silent"
                    ? "سکوت"
                    : "باز"}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Preset({
  label,
  value,
  options,
  suffix,
  onPick,
}: {
  label: string;
  value: number;
  options: number[];
  suffix: string;
  onPick: (n: number) => void;
}) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onPick(option)}
            className={`num h-11 rounded-card px-3 text-sm ${
              value === option ? "bg-copper text-copper-ink" : "border border-line text-fg"
            }`}
          >
            {option}
            {suffix}
          </button>
        ))}
      </div>
    </div>
  );
}
