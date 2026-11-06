import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market.functions-B0FoJzGt.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var scanSymbols_createServerFn_handler = createServerRpc({
	id: "b5d86e79ce854d5da2c795d11d93481f74986c369a60948b4d46b183f241c3d0",
	name: "scanSymbols",
	filename: "src/lib/market.functions.ts"
}, (opts) => scanSymbols.__executeServer(opts));
var scanSymbols = createServerFn({ method: "POST" }).validator((data) => {
	if (!data || !Array.isArray(data.symbols) || data.symbols.length === 0) throw new Error("حداقل یک نماد لازم است");
	return { symbols: data.symbols.slice(0, 8).map((s) => String(s).slice(0, 24)) };
}).handler(scanSymbols_createServerFn_handler, async ({ data }) => {
	const { resolveMany } = await import("./market.server-DZwaygwn.mjs");
	return resolveMany(data.symbols);
});
//#endregion
export { scanSymbols_createServerFn_handler };
