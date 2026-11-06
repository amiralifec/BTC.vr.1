export type CexVenue = "binance" | "okx" | "mexc" | "gate";

export type Snap = {
  symbol: string;
  found: boolean;
  name: string | null;
  price: number | null;
  change24h: number | null;
  volume24h: number | null;
  cexVolume: number | null;
  dexVolume: number | null;
  liquidity: number | null;
  marketCap: number | null;
  venue: CexVenue | "dex" | "none";
  chain: string | null;
  dex: string | null;
  pairUrl: string | null;
  pairAgeDays: number | null;
  ambiguous: number;
  suspectPool: boolean;
  priceGap: boolean;
};

export type PaperTrade = {
  id: string;
  symbol: string;
  name: string | null;
  at: string;
  score: number;
  verdict: "check" | "mid" | "skip";
  price: number | null;
  stop: number | null;
  exitPct: number | null;
};
