import type { Snap } from "@/lib/market-types";

export type Verdict = "check" | "mid" | "skip";

export type ModuleScore = {
  id: string;
  label: string;
  score: number;
  max: number;
  detail: string;
};

export type Scored = {
  total: number;
  raw: number;
  capReason: string | null;
  verdict: Verdict;
  verdictLabel: string;
  modules: ModuleScore[];
  flags: string[];
};

export type TradePlan = {
  entryLow: number;
  entryHigh: number;
  stop: number;
  stopPct: number;
  tp1: number;
  tp2: number;
  tp3: number;
  riskUsd: number;
  notional: number;
  notionalPct: number;
  qty: number;
  chase: boolean;
};

const VENUE_FA: Record<Snap["venue"], string> = {
  binance: "بایننس",
  okx: "اوکی‌ایکس",
  mexc: "مکسی",
  gate: "گیت",
  dex: "دکس",
  none: "نامشخص",
};

export function venueLabel(venue: Snap["venue"]): string {
  return VENUE_FA[venue];
}

function liqModule(s: Snap): ModuleScore {
  const vol = s.cexVolume ?? 0;
  const dexVol = s.dexVolume ?? 0;
  const lusd = s.liquidity ?? 0;
  const useCex = s.venue !== "dex" && s.venue !== "none" && vol >= 20_000;
  let score = 0;
  let detail = "";
  if (useCex) {
    if (vol >= 5_000_000) score = 25;
    else if (vol >= 1_000_000) score = 21;
    else if (vol >= 250_000) score = 16;
    else if (vol >= 50_000) score = 11;
    else score = 6;
    detail = `حجم ۲۴س ${venueLabel(s.venue)}`;
  } else if (lusd > 0 || dexVol > 0) {
    if (lusd >= 400_000 && dexVol >= 150_000) score = 22;
    else if (lusd >= 120_000 && dexVol >= 60_000) score = 16;
    else if (lusd >= 40_000 && dexVol >= 20_000) score = 11;
    else if (lusd >= 15_000) score = 6;
    else score = 2;
    detail = "نقدینگی و حجم دکس";
  } else {
    score = 0;
    detail = "حجم قابل اتکا پیدا نشد";
  }
  return { id: "liq", label: "خروج", score, max: 25, detail };
}

function chaseModule(s: Snap): ModuleScore {
  const ch = s.change24h;
  if (ch == null) {
    return { id: "chase", label: "تعقیب", score: 12, max: 25, detail: "تغییر ۲۴س نامعلوم" };
  }
  let score = 12;
  if (ch > 100) score = 0;
  else if (ch > 60) score = 6;
  else if (ch > 35) score = 12;
  else if (ch > 12) score = 19;
  else if (ch >= -8) score = 25;
  else if (ch >= -20) score = 18;
  else if (ch >= -40) score = 8;
  else score = 3;
  return { id: "chase", label: "تعقیب", score, max: 25, detail: `تغییر ۲۴س ${ch.toFixed(1)}٪` };
}

function attentionModule(s: Snap): ModuleScore {
  const vol = s.volume24h ?? 0;
  const basis = s.marketCap && s.marketCap > 0 ? s.marketCap : s.liquidity && s.liquidity > 0 ? s.liquidity : null;
  if (!basis || vol <= 0) {
    return { id: "att", label: "توجه", score: 7, max: 15, detail: "نسبت حجم به اندازه نامعلوم" };
  }
  const ratio = vol / basis;
  let score = 4;
  if (ratio >= 0.08 && ratio <= 1.2) score = 15;
  else if (ratio >= 0.03 && ratio < 0.08) score = 11;
  else if (ratio > 1.2 && ratio <= 3) score = 10;
  else if (ratio > 3 && ratio <= 8) score = 6;
  else if (ratio > 8) score = 3;
  else score = 4;
  const base = s.marketCap ? "مارکت" : "نقدینگی";
  return { id: "att", label: "توجه", score, max: 15, detail: `حجم / ${base} = ${ratio.toFixed(2)}` };
}

function sizeModule(s: Snap): ModuleScore {
  const mc = s.marketCap;
  if (mc == null || mc <= 0) {
    return { id: "size", label: "اندازه", score: 8, max: 15, detail: "مارکت‌کپ نامعلوم" };
  }
  let score = 8;
  if (mc < 1_500_000) score = 5;
  else if (mc < 80_000_000) score = 15;
  else if (mc < 400_000_000) score = 11;
  else if (mc < 2_000_000_000) score = 7;
  else score = 4;
  return { id: "size", label: "اندازه", score, max: 15, detail: "بازه نسبت به کال‌های پردرآمد دفترچه" };
}

function venueModule(s: Snap): ModuleScore {
  const lusd = s.liquidity ?? 0;
  if (s.venue === "binance" || s.venue === "okx") {
    return { id: "venue", label: "محل", score: 10, max: 10, detail: venueLabel(s.venue) };
  }
  if (s.venue === "mexc" || s.venue === "gate") {
    return { id: "venue", label: "محل", score: 7, max: 10, detail: venueLabel(s.venue) };
  }
  if (s.venue === "dex" && lusd >= 80_000) {
    return { id: "venue", label: "محل", score: 6, max: 10, detail: s.chain ? `دکس · ${s.chain}` : "دکس" };
  }
  return { id: "venue", label: "محل", score: 3, max: 10, detail: s.chain ? `دکس نازک · ${s.chain}` : "محل ضعیف" };
}

function ageModule(s: Snap): ModuleScore {
  const d = s.pairAgeDays;
  if (d == null) {
    return { id: "age", label: "سن", score: 6, max: 10, detail: "سن جفت نامعلوم" };
  }
  let score = 6;
  if (d < 2) score = 3;
  else if (d < 14) score = 7;
  else if (d <= 220) score = 10;
  else if (d <= 500) score = 7;
  else score = 5;
  return { id: "age", label: "سن", score, max: 10, detail: `حدود ${Math.round(d)} روز` };
}

export function scoreSnap(s: Snap): Scored {
  const flags: string[] = [];
  if (!s.found || s.price == null) {
    const empty: ModuleScore[] = [
      { id: "liq", label: "خروج", score: 0, max: 25, detail: "—" },
      { id: "chase", label: "تعقیب", score: 0, max: 25, detail: "—" },
      { id: "att", label: "توجه", score: 0, max: 15, detail: "—" },
      { id: "size", label: "اندازه", score: 0, max: 15, detail: "—" },
      { id: "venue", label: "محل", score: 0, max: 10, detail: "—" },
      { id: "age", label: "سن", score: 0, max: 10, detail: "—" },
    ];
    return {
      total: 0,
      raw: 0,
      capReason: "بازاری برای این نماد پیدا نشد",
      verdict: "skip",
      verdictLabel: "رد",
      modules: empty,
      flags: ["روی اوکی‌ایکس، مکسی، گیت و دکس‌اسکرینر پیدا نشد. نماد را دقیق‌تر چک کن."],
    };
  }

  const modules = [
    liqModule(s),
    chaseModule(s),
    attentionModule(s),
    sizeModule(s),
    venueModule(s),
    ageModule(s),
  ];
  const raw = modules.reduce((sum, m) => sum + m.score, 0);
  let cap: number | null = null;
  let capReason: string | null = null;
  const tighten = (n: number, reason: string) => {
    if (cap == null || n < cap) {
      cap = n;
      capReason = reason;
    }
  };

  const vol = s.volume24h ?? 0;
  const lusd = s.liquidity ?? 0;
  if (vol < 20_000 && lusd < 20_000) tighten(30, "حجم و نقدینگی هر دو ناچیز است");
  else if (s.venue === "dex" && lusd < 20_000) tighten(35, "نقدینگی خروج زیر ۲۰هزار دلار");
  if (s.change24h != null && s.change24h > 100) tighten(40, "۲۴ ساعت بیش از ۱۰۰٪ بالا رفته");
  if (s.change24h != null && s.change24h < -40) tighten(45, "ریزش ۲۴ساعته بدتر از ۴۰٪");

  const total = cap != null ? Math.min(raw, cap) : raw;

  if (s.change24h != null && s.change24h > 60) flags.push("بخش بزرگی از حرکت احتمالاً گذشته. بازار نخر.");
  if (s.change24h != null && s.change24h < -25) flags.push("ریزش تند است. عجله برای چاقو ممنوع.");
  if (s.marketCap != null && s.marketCap < 1_500_000) flags.push("مارکت خیلی کوچک است؛ دستکاری و قفل‌شدن خروج جدی است.");
  if (s.marketCap != null && s.marketCap > 2_000_000_000) {
    flags.push("اندازه بزرگ است. بردهای چندصددرصدی دفترچه معمولاً مال این کلاس نبود.");
  }
  if (s.pairAgeDays != null && s.pairAgeDays < 2) flags.push("جفت جوان‌تر از دو روز است.");
  if (s.suspectPool) flags.push("استخر دکس مشکوک به نقدینگی ساختگی است.");
  if (s.ambiguous > 1) flags.push("چند دارایی با این نماد قیمت‌های خیلی متفاوت دارند. اسم را با کانال تطبیق بده.");
  if (s.priceGap) flags.push("قیمت صرافی و دکس بیش از ۱۲٪ فاصله دارد.");
  if (s.venue === "mexc" || s.venue === "gate") flags.push("حجم از صرافی درجهٔ دو آمده. دفتر سفارش را خودت ببین.");
  if ((s.volume24h ?? 0) > 0 && s.marketCap && s.volume24h! / s.marketCap > 8) {
    flags.push("حجم نسبت به اندازه افراطی است.");
  }

  let verdict: Verdict = "skip";
  let verdictLabel = "رد";
  if (total >= 75) {
    verdict = "check";
    verdictLabel = "قابل قبول";
  } else if (total >= 58) {
    verdict = "mid";
    verdictLabel = "مردد";
  }

  return { total, raw, capReason, verdict, verdictLabel, modules, flags };
}

export function tradePlan(
  price: number,
  change24h: number | null,
  bankroll: number,
  riskPct: number,
): TradePlan {
  const ch = change24h ?? 0;
  const chase = ch > 12;
  const entryLow = price * (chase ? 0.92 : 0.986);
  const entryHigh = price * (chase ? 0.975 : 1.002);
  const mid = (entryLow + entryHigh) / 2;
  const stopPct = Math.abs(ch) >= 25 ? 0.14 : 0.09;
  const stop = mid * (1 - stopPct);
  const riskPerUnit = Math.max(mid - stop, mid * 0.01);
  const riskUsd = Math.max(bankroll, 0) * (riskPct / 100);
  const qty = riskUsd / riskPerUnit;
  const notional = qty * mid;
  return {
    entryLow,
    entryHigh,
    stop,
    stopPct,
    tp1: mid + riskPerUnit,
    tp2: mid + riskPerUnit * 2,
    tp3: mid + riskPerUnit * 3.5,
    riskUsd,
    notional,
    notionalPct: bankroll > 0 ? (notional / bankroll) * 100 : 0,
    qty,
    chase,
  };
}

export function verdictNote(verdict: Verdict): string {
  if (verdict === "check") return "مانع ساختاریِ بزرگ دیده نشد. این هنوز دلیل خرید نیست.";
  if (verdict === "mid") return "نه رد قطعی، نه ورود تمیز. اگر تنها دلیل کانال است، وارد نشو.";
  return "ورود نکن.";
}
