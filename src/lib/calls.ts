export type CallOutcome = "win" | "silent" | "open";

export type ChannelCall = {
  id: string;
  symbol: string;
  calledLabel: string;
  reportedLabel: string;
  claimedPct: number | null;
  outcome: CallOutcome;
};

function call(
  symbol: string,
  calledLabel: string,
  reportedLabel: string,
  claimedPct: number | null,
  outcome: CallOutcome,
): ChannelCall {
  return {
    id: `${symbol}-${calledLabel}`,
    symbol,
    calledLabel,
    reportedLabel,
    claimedPct,
    outcome,
  };
}

const win = (symbol: string, called: string, reported: string, pct: number) =>
  call(symbol, called, reported, pct, "win");
const silent = (symbol: string, called: string) => call(symbol, called, "اعلام نشده", null, "silent");

/** Calls Amirali logged from BITFA. Silence is treated as a non-winner, per his note. */
export const CHANNEL_CALLS: ChannelCall[] = [
  win("VVV", "۲۱ ژوئیه ۲۱", "۲۶ اوت", 33),
  win("BR", "۱۲ اوت ۱۷:۱۷", "۲۵ اوت", 33),
  win("RE", "۱۹ اوت ۲۲", "۲۵ اوت", 54),
  win("LIT", "۲۷ ژوئیه ۱۴:۲۲", "۲۳ اوت", 52),
  win("MORPHO", "۱۸ اوت ۱۷:۲۶", "۲۳ اوت", 22),
  win("ZRO", "۱۷ ژوئیه ۱۸:۵۶", "۲۳ اوت", 61),
  win("PUMP", "۱۹ ژوئیه ۱۲:۳۹", "۲۳ اوت", 175),
  win("HEMI", "۱۵ اوت ۲۲:۳۹", "۲۱ اوت", 61),
  win("BTW", "۲۷ ژوئیه ۱۸:۵۷", "۱۹ اوت", 670),
  silent("Q", "۱۶ اوت ۱۴:۳۴"),
  win("CYS", "۵ اوت ۱۷:۵۸", "۱۲ اوت", 212),
  win("BLUAI", "۶ ژوئیه ۱۷:۴۰", "۱۱ اوت", 204),
  win("TST", "۱۰ اوت ۱۰:۱۵", "همان روز، حدود ۱ ساعت", 20),
  win("MUBARAK", "۹ اوت ۱۵:۵۲", "۱۰ اوت", 58),
  win("BROCCOLI", "۳۱ ژوئیه ۱۷:۴۷", "۹ اوت", 42),
  win("EPIC", "۱۱ ژوئیه ۱۸:۱۵", "۸ اوت", 52),
  win("US", "۱۰ ژوئیه ۰۱:۲۴", "۷ اوت", 130),
  win("ON", "۲۸ ژوئیه ۲۱:۲۴", "۷ اوت", 50),
  win("ZBT", "۶ اوت ۱۷:۵۵", "۷ اوت", 21),
  win("KOMA", "۳۱ ژوئیه ۱۷:۴۷", "۱ اوت", 40),
  win("GIGGLE", "۳۱ ژوئیه ۱۷:۴۷", "۱ اوت", 50),
  silent("ONDO", "۳۱ ژوئیه ۱۵:۱۱"),
  silent("KGEN", "۳۱ ژوئیه ۰۱:۰۶"),
  silent("UAI", "۳۰ ژوئیه ۱۶:۲۹"),
  win("ESP", "۱۹ ژوئیه ۱۳:۰۳", "۳۰ ژوئیه", 60),
  silent("TAG", "۲۷ ژوئیه ۲۱:۲۴"),
  win("KAITO", "۱۵ ژوئیه ۱۲:۴۰", "۲۷ ژوئیه", 68),
  win("ZAMA", "۲۰ ژوئیه ۱۷:۱۶", "۲۳ ژوئیه", 48),
  silent("STAR", "۱۹ ژوئیه ۱۳:۲۰"),
  win("ALLO", "۸ ژوئن ۱۳:۲۷", "۱۳ ژوئیه", 12),
  win("SAGA", "۱۵ سپتامبر ۱۸", "۲۰ سپتامبر", 90),
  win("ENA", "۲۲ اوت ۱۲", "۲۰ سپتامبر", 51),
  win("AKE", "۲ سپتامبر ۲۲:۳۰", "۲۰ سپتامبر", 955),
  win("NEAR", "۱۷ سپتامبر ۱۵:۱۰", "۲۰ سپتامبر", 58),
  win("XTZ", "۱۹ سپتامبر ۱۴:۱۸", "همان روز ۱۹", 18),
  win("PIEVERSE", "۸ اوت ۱۳:۱۰", "۱۹ سپتامبر", 116),
  win("RAY", "۶ سپتامبر ۱۱:۴۸", "۱۸ سپتامبر", 66),
  win("MOO", "۱۱ سپتامبر ۱۵:۴۷", "۱۸ سپتامبر", 97),
  win("COTI", "۷ سپتامبر ۱۳:۳۴", "۱۸ سپتامبر", 55),
  win("PONS", "۲۴ اوت ۱۲:۵۶", "۱۸ سپتامبر", 1470),
  win("LOBSTER", "۲۹ اوت ۱۴", "۱۸ سپتامبر", 418),
  win("AVA", "۱۳ سپتامبر ۱۳:۱۴", "۱۷ سپتامبر", 65),
  silent("KSM", "۱۷ سپتامبر ۲۰:۳۰"),
  win("ZEC", "۲۱ اوت ۱۱:۴۰", "۱۷ سپتامبر", 160),
  win("ONE", "۱۷ سپتامبر ۱۵", "۱۹ سپتامبر", 208),
  win("UNI", "۵ سپتامبر ۲۳:۰۸", "۲۳ سپتامبر", 54),
  win("MARSCOIN", "۲۲ سپتامبر ۱۳:۱۵", "۹ ساعت بعد", 20),
  win("FLOCK", "۳۱ اوت ۱۲", "۲۲ سپتامبر", 150),
  win("MINA", "۲۱ سپتامبر ۱۷", "۲۲ سپتامبر", 20),
  win("PYTH", "۲ سپتامبر ۱۷", "۲۲ سپتامبر", 20),
  win("KERNEL", "۳۱ اوت ۱۲", "۲۲ سپتامبر", 91),
  call("PEPE", "۲۱ سپتامبر ۱۹", "دفتر ۲۳ سپتامبر", null, "open"),
  win("KMNO", "۲۰ سپتامبر ۲۳:۲۰", "۲۱ سپتامبر", 18),
  silent("ONDO", "۱۹ سپتامبر ۲۱"),
  silent("NEET", "۲۷ اوت ۲۲:۵۷"),
  win("MAGMA", "۲۸ اوت ۲۲:۳۰", "۲ سپتامبر", 43),
  win("MANCER", "۳۰ اوت ۱۹", "۱ سپتامبر", 110),
  silent("RDDT", "۳۱ اوت ۱۲"),
  silent("ANTFUN", "۳۱ اوت ۱۲"),
  win("USELESS", "۳۱ اوت ۲۳:۵۰", "۹ سپتامبر", 260),
  silent("BONK", "۱ سپتامبر ۱۲"),
  silent("LINK", "۱ سپتامبر ۱۲"),
  silent("BTR", "۱ سپتامبر ۱۲"),
  win("FF", "۲۷ اوت ۱۲", "۱۰ سپتامبر", 90),
  win("UAI", "۳۰ اوت ۱۱:۵۰", "۷ سپتامبر", 123),
  silent("MICRODUCK", "۲ سپتامبر ۱۴"),
  silent("TENDIES", "۲ سپتامبر ۱۴"),
  silent("KITE", "۲ سپتامبر ۱۷:۴۰"),
  win("INDEX", "۲ سپتامبر ۱۹:۴۵", "۳ سپتامبر", 80),
  silent("WTH", "۳ سپتامبر ۱۲"),
  win("MARSCOIN", "۳ سپتامبر ۱۲", "۴ سپتامبر", 90),
];

export type JournalModel = {
  decided: number;
  wins: number;
  silent: number;
  open: number;
  announceRate: number;
  medianClaimed: number;
  meanClaimed: number;
  monsters: number;
  medianModeled: number;
  meanModeled: number;
  buckets: { name: string; n: number }[];
};

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) return (sorted[mid - 1]! + sorted[mid]!) / 2;
  return sorted[mid]!;
}

export function modelJournal(silentLossPct: number, capturePct: number): JournalModel {
  const open = CHANNEL_CALLS.filter((c) => c.outcome === "open").length;
  const decidedRows = CHANNEL_CALLS.filter((c) => c.outcome !== "open");
  const wins = decidedRows.filter((c) => c.outcome === "win");
  const claimed = wins.map((c) => c.claimedPct ?? 0);
  const loss = -Math.abs(silentLossPct);
  const capture = capturePct / 100;
  const modeled = decidedRows.map((c) =>
    c.outcome === "silent" ? loss : (c.claimedPct ?? 0) * capture,
  );
  const buckets = [
    { name: "تا ۳۰", n: 0 },
    { name: "۳۰ تا ۸۰", n: 0 },
    { name: "۸۰ تا ۲۰۰", n: 0 },
    { name: "۲۰۰+", n: 0 },
  ];
  for (const pct of claimed) {
    if (pct < 30) buckets[0]!.n += 1;
    else if (pct < 80) buckets[1]!.n += 1;
    else if (pct < 200) buckets[2]!.n += 1;
    else buckets[3]!.n += 1;
  }
  return {
    decided: decidedRows.length,
    wins: wins.length,
    silent: decidedRows.length - wins.length,
    open,
    announceRate: decidedRows.length ? wins.length / decidedRows.length : 0,
    medianClaimed: median(claimed),
    meanClaimed: claimed.length ? claimed.reduce((a, b) => a + b, 0) / claimed.length : 0,
    monsters: claimed.filter((n) => n >= 200).length,
    medianModeled: median(modeled),
    meanModeled: modeled.length ? modeled.reduce((a, b) => a + b, 0) / modeled.length : 0,
    buckets,
  };
}
