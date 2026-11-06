import { createServerFn } from "@tanstack/react-start";

export const scanSymbols = createServerFn({ method: "POST" })
  .validator((data: { symbols: string[] }) => {
    if (!data || !Array.isArray(data.symbols) || data.symbols.length === 0) {
      throw new Error("حداقل یک نماد لازم است");
    }
    return { symbols: data.symbols.slice(0, 8).map((s) => String(s).slice(0, 24)) };
  })
  .handler(async ({ data }) => {
    const { resolveMany } = await import("./market.server");
    return resolveMany(data.symbols);
  });
