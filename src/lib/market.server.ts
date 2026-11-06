import type { CexVenue, Snap } from "@/lib/market-types";

type CexQuote = {
  venue: CexVenue;
  price: number;
  change24h: number;
  quoteVolume: number;
};

type DexPair = {
  chainId?: string;
  dexId?: string;
  url?: string;
  baseToken?: { name?: string; symbol?: string };
  quoteToken?: { symbol?: string };
  priceUsd?: string;
  volume?: { h24?: number };
  priceChange?: { h24?: number };
  liquidity?: { usd?: number; quote?: number };
  fdv?: number;
  marketCap?: number;
  pairCreatedAt?: number;
};

const STABLES = new Set([
  "USDT",
  "USDC",
  "USDG",
  "USD1",
  "FDUSD",
  "DAI",
  "BUSD",
  "USDE",
  "TUSD",
  "USDS",
]);

function num(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() && Number.isFinite(Number(v))) return Number(v);
  return null;
}

async function getJson(url: string, ms: number): Promise<unknown | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { accept: "application/json", "user-agent": "SieveDesk/1.0" },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function quoteFrom(price: number | null, open: number | null, volume: number | null, venue: CexVenue): CexQuote | null {
  if (price == null || price <= 0 || open == null || open <= 0 || volume == null || volume < 0) return null;
  return { venue, price, change24h: ((price - open) / open) * 100, quoteVolume: volume };
}

async function fetchBinance(symbol: string): Promise<CexQuote | null> {
  const json = await getJson(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}USDT`, 1600);
  if (!json || typeof json !== "object") return null;
  const row = json as { lastPrice?: string; openPrice?: string; quoteVolume?: string; msg?: string };
  if (row.msg || !row.lastPrice) return null;
  return quoteFrom(num(row.lastPrice), num(row.openPrice), num(row.quoteVolume), "binance");
}

async function fetchOkx(symbol: string): Promise<CexQuote | null> {
  const json = await getJson(`https://www.okx.com/api/v5/market/ticker?instId=${symbol}-USDT`, 5000);
  if (!json || typeof json !== "object") return null;
  const rec = json as { code?: string; data?: Array<Record<string, string>> };
  if (rec.code !== "0" || !rec.data?.[0]) return null;
  const row = rec.data[0];
  return quoteFrom(num(row.last), num(row.open24h), num(row.volCcy24h), "okx");
}

async function fetchMexc(symbol: string): Promise<CexQuote | null> {
  const json = await getJson(`https://api.mexc.com/api/v3/ticker/24hr?symbol=${symbol}USDT`, 5000);
  if (!json || typeof json !== "object") return null;
  const row = json as { lastPrice?: string; openPrice?: string; quoteVolume?: string; msg?: string };
  if (row.msg) return null;
  return quoteFrom(num(row.lastPrice), num(row.openPrice), num(row.quoteVolume), "mexc");
}

async function fetchGate(symbol: string): Promise<CexQuote | null> {
  const json = await getJson(`https://api.gateio.ws/api/v4/spot/tickers?currency_pair=${symbol}_USDT`, 5000);
  if (!Array.isArray(json) || !json[0] || typeof json[0] !== "object") return null;
  const row = json[0] as { last?: string; change_percentage?: string; quote_volume?: string };
  const price = num(row.last);
  const change = num(row.change_percentage);
  const volume = num(row.quote_volume);
  if (price == null || price <= 0 || change == null || volume == null) return null;
  return { venue: "gate", price, change24h: change, quoteVolume: volume };
}

async function fetchCex(symbol: string): Promise<CexQuote | null> {
  const [binance, okx] = await Promise.all([fetchBinance(symbol), fetchOkx(symbol)]);
  if (binance && binance.quoteVolume > 0) return binance;
  if (okx) return okx;
  const mexc = await fetchMexc(symbol);
  if (mexc) return mexc;
  return fetchGate(symbol);
}

function isHealthy(pair: DexPair): boolean {
  const liq = pair.liquidity?.usd ?? 0;
  const vol = pair.volume?.h24 ?? 0;
  const qSym = (pair.quoteToken?.symbol ?? "").toUpperCase();
  const qAmt = pair.liquidity?.quote ?? 0;
  if (STABLES.has(qSym) && liq > 0 && qAmt > 0 && qAmt < liq * 0.08) return false;
  if (liq > 2_000_000 && vol < 5_000) return false;
  return vol > 0 || liq > 0;
}

function pickDex(pairs: DexPair[], symbol: string): { pool: DexPair[]; suspect: boolean } {
  const exact = pairs.filter((p) => (p.baseToken?.symbol ?? "").toUpperCase() === symbol);
  const healthy = exact.filter(isHealthy);
  const pool = (healthy.length ? healthy : exact)
    .slice()
    .sort((a, b) => (b.volume?.h24 ?? 0) - (a.volume?.h24 ?? 0));
  return { pool, suspect: exact.length > 0 && healthy.length === 0 };
}

function closePrice(price: number | null, ref: number | null, tol: number): boolean {
  if (price == null || ref == null || ref <= 0) return false;
  return Math.abs(price - ref) / ref <= tol;
}

function median(values: number[]): number | null {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) return ((sorted[mid - 1] ?? 0) + (sorted[mid] ?? 0)) / 2;
  return sorted[mid] ?? null;
}

function clusterCap(pairs: DexPair[]): number | null {
  const caps = pairs
    .map((p) => num(p.marketCap) ?? num(p.fdv))
    .filter((c): c is number => c != null && c > 0 && c < 5e12);
  if (!caps.length) return null;
  const max = Math.max(...caps);
  return median(caps.filter((c) => c >= max * 0.2));
}

function pricesClash(pairs: DexPair[]): boolean {
  const prices = pairs
    .slice(0, 6)
    .map((p) => num(p.priceUsd))
    .filter((n): n is number => n != null && n > 0);
  if (prices.length < 2) return false;
  const min = Math.min(...prices);
  return min > 0 && Math.max(...prices) / min > 1.4;
}

async function fetchDex(symbol: string): Promise<{ pool: DexPair[]; suspect: boolean }> {
  const json = await getJson(
    `https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(symbol)}`,
    6000,
  );
  if (!json || typeof json !== "object") return { pool: [], suspect: false };
  const pairs = (json as { pairs?: DexPair[] | null }).pairs;
  if (!Array.isArray(pairs)) return { pool: [], suspect: false };
  return pickDex(pairs, symbol);
}

function empty(symbol: string): Snap {
  return {
    symbol,
    found: false,
    name: null,
    price: null,
    change24h: null,
    volume24h: null,
    cexVolume: null,
    dexVolume: null,
    liquidity: null,
    marketCap: null,
    venue: "none",
    chain: null,
    dex: null,
    pairUrl: null,
    pairAgeDays: null,
    ambiguous: 0,
    suspectPool: false,
    priceGap: false,
  };
}

function ageDays(created: number | undefined): number | null {
  if (!created || !Number.isFinite(created)) return null;
  const ms = created < 1e12 ? created * 1000 : created;
  const days = (Date.now() - ms) / 86_400_000;
  if (!Number.isFinite(days) || days < 0 || days > 8000) return null;
  return days;
}

async function resolveOne(symbol: string): Promise<Snap> {
  const [cex, dexPack] = await Promise.all([fetchCex(symbol), fetchDex(symbol)]);
  const ref = cex?.price ?? num(dexPack.pool[0] ? dexPack.pool[0].priceUsd : null);
  const aligned = dexPack.pool.filter((p) => closePrice(num(p.priceUsd), ref, 0.15));
  const pool = aligned.length ? aligned : dexPack.pool;
  const dex = pool[0] ?? null;
  if (!cex && !dex) return empty(symbol);

  const dexPrice = num(dex?.priceUsd);
  const dexChange = typeof dex?.priceChange?.h24 === "number" ? dex.priceChange.h24 : null;
  const dexVol = num(dex?.volume?.h24);
  const dexLiq = num(dex?.liquidity?.usd);
  let marketCap = clusterCap(pool);
  if (marketCap != null && !cex && (dexLiq ?? 0) < 25_000 && marketCap > 5e8) marketCap = null;

  const price = cex?.price ?? dexPrice;
  if (price == null) return empty(symbol);

  const cexVolume = cex?.quoteVolume ?? null;
  const volume24h = Math.max(cexVolume ?? 0, dexVol ?? 0) || null;
  let venue: Snap["venue"] = "dex";
  if (cex && (cex.quoteVolume >= 20_000 || !dex)) venue = cex.venue;
  else if (cex) venue = cex.venue;

  const priceGap = Boolean(cex && dexPrice && !closePrice(dexPrice, cex.price, 0.12));

  return {
    symbol,
    found: true,
    name: dex?.baseToken?.name?.trim() || symbol,
    price,
    change24h: cex?.change24h ?? dexChange,
    volume24h,
    cexVolume,
    dexVolume: dexVol,
    liquidity: dexLiq,
    marketCap,
    venue,
    chain: dex?.chainId ?? null,
    dex: dex?.dexId ?? null,
    pairUrl: dex?.url ?? null,
    pairAgeDays: ageDays(dex?.pairCreatedAt),
    ambiguous: !cex && pricesClash(dexPack.pool) ? 2 : 0,
    suspectPool: dexPack.suspect,
    priceGap,
  };
}

const SYMBOL = /^[A-Z][A-Z0-9]{1,14}$/;

export async function resolveMany(symbols: string[]): Promise<Snap[]> {
  const unique: string[] = [];
  for (const raw of symbols) {
    const symbol = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!SYMBOL.test(symbol) || unique.includes(symbol)) continue;
    unique.push(symbol);
    if (unique.length >= 8) break;
  }
  return Promise.all(unique.map((symbol) => resolveOne(symbol)));
}
