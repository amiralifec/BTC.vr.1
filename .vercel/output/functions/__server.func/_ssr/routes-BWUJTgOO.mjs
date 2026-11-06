import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { H as isRedirect, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "../_libs/radix-ui__react-tabs.mjs";
import { a as ResponsiveContainer, i as Bar, n as YAxis, o as Tooltip, r as XAxis, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BWUJTgOO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
function call(symbol, calledLabel, reportedLabel, claimedPct, outcome) {
	return {
		id: `${symbol}-${calledLabel}`,
		symbol,
		calledLabel,
		reportedLabel,
		claimedPct,
		outcome
	};
}
var win = (symbol, called, reported, pct) => call(symbol, called, reported, pct, "win");
var silent = (symbol, called) => call(symbol, called, "اعلام نشده", null, "silent");
/** Calls Amirali logged from BITFA. Silence is treated as a non-winner, per his note. */
var CHANNEL_CALLS = [
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
	win("MARSCOIN", "۳ سپتامبر ۱۲", "۴ سپتامبر", 90)
];
function median(values) {
	if (!values.length) return 0;
	const sorted = [...values].sort((a, b) => a - b);
	const mid = Math.floor(sorted.length / 2);
	if (sorted.length % 2 === 0) return (sorted[mid - 1] + sorted[mid]) / 2;
	return sorted[mid];
}
function modelJournal(silentLossPct, capturePct) {
	const open = CHANNEL_CALLS.filter((c) => c.outcome === "open").length;
	const decidedRows = CHANNEL_CALLS.filter((c) => c.outcome !== "open");
	const wins = decidedRows.filter((c) => c.outcome === "win");
	const claimed = wins.map((c) => c.claimedPct ?? 0);
	const loss = -Math.abs(silentLossPct);
	const capture = capturePct / 100;
	const modeled = decidedRows.map((c) => c.outcome === "silent" ? loss : (c.claimedPct ?? 0) * capture);
	const buckets = [
		{
			name: "تا ۳۰",
			n: 0
		},
		{
			name: "۳۰ تا ۸۰",
			n: 0
		},
		{
			name: "۸۰ تا ۲۰۰",
			n: 0
		},
		{
			name: "۲۰۰+",
			n: 0
		}
	];
	for (const pct of claimed) if (pct < 30) buckets[0].n += 1;
	else if (pct < 80) buckets[1].n += 1;
	else if (pct < 200) buckets[2].n += 1;
	else buckets[3].n += 1;
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
		buckets
	};
}
function formatUsd(n) {
	if (n == null || !Number.isFinite(n)) return "—";
	const abs = Math.abs(n);
	const sign = n < 0 ? "-" : "";
	if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(2)}B`;
	if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(2)}M`;
	if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(1)}K`;
	if (abs >= 1) return `${sign}$${abs.toFixed(2)}`;
	if (abs >= .01) return `${sign}$${abs.toFixed(4)}`;
	return `${sign}$${abs.toPrecision(2)}`;
}
function formatPx(n) {
	if (n == null || !Number.isFinite(n)) return "—";
	const abs = Math.abs(n);
	if (abs >= 1e3) return `$${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
	if (abs >= 1) return `$${n.toFixed(4)}`;
	if (abs >= .01) return `$${n.toFixed(5)}`;
	return `$${n.toPrecision(3)}`;
}
function formatPct(n, digits = 1) {
	return `${n > 0 ? "+" : ""}${n.toFixed(digits)}%`;
}
function formatQty(n) {
	if (!Number.isFinite(n) || n <= 0) return "—";
	if (n >= 1e3) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
	if (n >= 1) return n.toFixed(3);
	return n.toPrecision(3);
}
var FILTERS = [
	{
		id: "all",
		label: "همه"
	},
	{
		id: "win",
		label: "اعلام سود"
	},
	{
		id: "silent",
		label: "سکوت"
	},
	{
		id: "open",
		label: "باز"
	}
];
function JournalPanel({ silentLoss, capture, onSilent, onCapture, paper, onSettle, onRemove }) {
	const model = modelJournal(silentLoss, capture);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [exitDraft, setExitDraft] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	const shown = CHANNEL_CALLS.filter((c) => filter === "all" || c.outcome === filter).sort((a, b) => {
		const av = a.claimedPct ?? -1;
		return (b.claimedPct ?? -1) - av;
	});
	const closed = paper.filter((row) => row.exitPct != null);
	const paperAvg = closed.length ? closed.reduce((sum, row) => sum + (row.exitPct ?? 0), 0) / closed.length : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-card border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "دفترچهٔ BITFA، نه منحنی حساب تو"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm leading-6 text-muted",
						children: [
							"از ",
							model.decided,
							" کالِ تعیین‌تکلیف‌شده، کانال برای",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "num text-fg",
								children: [Math.round(model.announceRate * 100), "٪"]
							}),
							" یک عدد سود نوشته است. میانهٔ همان اعداد ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num text-fg",
								children: formatPct(model.medianClaimed, 0)
							}),
							" است و میانگین‌شان",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num text-fg",
								children: formatPct(model.meanClaimed, 0)
							}),
							". میانگین را",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num",
								children: model.monsters
							}),
							" کالِ بالای ۲۰۰٪ گروگان گرفته‌اند. سکوت کانال، طبق حرف خودت، ناموفق حساب شده. PEPE هنوز در دفتر باز است چون فقط «معرفی شد» و عددی نداشت."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted",
								children: "اعلام سود"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "num mt-1 text-lg text-olive",
								children: model.wins
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted",
								children: "سکوت"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "num mt-1 text-lg text-loss",
								children: model.silent
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted",
								children: "باز"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "num mt-1 text-lg",
								children: model.open
							})] })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-card border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "اگر همه را می‌گرفتی"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-6 text-muted",
						children: "کندل لحظهٔ کال را نداریم، پس این بک‌تست قیمتی نیست. فرض: از سود اعلام‌شده فقط بخشی را می‌گیری، و هر سکوت را با یک حدضرر ثابت می‌بندی. عدد اصلی میانه است، نه میانگین."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Preset, {
							label: "برداشت از سود اعلام‌شده",
							value: capture,
							options: [
								30,
								40,
								70,
								100
							],
							suffix: "٪",
							onPick: onCapture
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Preset, {
							label: "باخت فرضیِ سکوت",
							value: silentLoss,
							options: [
								8,
								12,
								20,
								100
							],
							suffix: "٪",
							onPick: onSilent
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-card bg-surface-2 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted",
								children: "میانهٔ هر کال"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: `num mt-1 text-2xl ${model.medianModeled >= 0 ? "text-olive" : "text-loss"}`,
								children: formatPct(model.medianModeled, 1)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-card bg-surface-2 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted",
								children: "میانگین، گمراه‌کننده"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "num mt-1 text-2xl",
								children: formatPct(model.meanModeled, 1)
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-52",
						dir: "ltr",
						children: mounted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: model.buckets,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										tick: {
											fill: "var(--color-muted)",
											fontSize: 12
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										allowDecimals: false,
										width: 28,
										tick: {
											fill: "var(--color-muted)",
											fontSize: 12
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										cursor: { fill: "var(--color-surface-2)" },
										contentStyle: {
											background: "var(--color-surface)",
											border: "1px solid var(--color-line)",
											borderRadius: 12,
											color: "var(--color-fg)"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "n",
										name: "تعداد",
										fill: "var(--color-copper)",
										radius: [
											6,
											6,
											0,
											0
										]
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "توزیع سود اعلام‌شده، فقط بین کال‌هایی که کانال عدد داده."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-card border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "آزمایش زندهٔ خودت"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-6 text-muted",
						children: "فیلتر را روی گذشته قیمتی بک‌تست نکرده‌ام. راه درست این است که از امروز هر سنجشی را اینجا ثبت کنی و بعد از بستن معامله، درصد واقعی را بنویسی. بعد از حدود سی معامله معلوم می‌شود نمره به دردت خورده یا نه."
					}),
					paperAvg != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm",
						children: [
							"میانگین ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num",
								children: closed.length
							}),
							" معاملهٔ بسته‌شده:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num",
								children: formatPct(paperAvg, 1)
							})
						]
					}),
					paper.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "هنوز چیزی ثبت نشده. از تب فیلتر، «بگذار در آزمایش» را بزن."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-col gap-3",
						children: paper.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-card bg-surface-2 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "num font-medium",
										children: row.symbol
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm text-muted",
										children: ["نمره ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "num",
											children: row.score
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted",
									children: [
										row.price != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["قیمت لحظهٔ سنجش ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "num",
											children: formatPx(row.price)
										})] }) : "بدون قیمت",
										" · ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "num",
											children: new Date(row.at).toLocaleDateString("fa-IR")
										})
									]
								}),
								row.exitPct == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									className: "mt-2 flex gap-2",
									onSubmit: (e) => {
										e.preventDefault();
										const n = Number(exitDraft[row.id]);
										if (!Number.isFinite(n)) return;
										onSettle(row.id, n);
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											inputMode: "decimal",
											placeholder: "درصد خروج",
											value: exitDraft[row.id] ?? "",
											onChange: (e) => setExitDraft((prev) => ({
												...prev,
												[row.id]: e.target.value
											})),
											className: "num h-11 min-w-0 flex-1 rounded-card border border-line bg-bg px-3 text-sm"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											className: "h-11 rounded-card bg-copper px-3 text-sm font-medium text-copper-ink",
											children: "ثبت"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => onRemove(row.id),
											className: "h-11 px-2 text-sm text-muted",
											children: "حذف"
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: `num mt-2 text-sm ${row.exitPct >= 0 ? "text-olive" : "text-loss"}`,
									children: ["نتیجه ", formatPct(row.exitPct, 1)]
								})
							]
						}, row.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: FILTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": filter === item.id,
					onClick: () => setFilter(item.id),
					className: `h-11 rounded-card px-4 text-sm ${filter === item.id ? "bg-surface-2 text-fg" : "text-muted"}`,
					children: item.label
				}, item.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-col gap-2",
				children: shown.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 rounded-card border border-line px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "num font-medium",
							children: row.symbol
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: [
								"کال ",
								row.calledLabel,
								row.outcome === "win" ? ` · تا ${row.reportedLabel}` : ""
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `num shrink-0 text-sm ${row.outcome === "win" ? "text-olive" : row.outcome === "silent" ? "text-loss" : "text-muted"}`,
						children: row.outcome === "win" && row.claimedPct != null ? formatPct(row.claimedPct, 0) : row.outcome === "silent" ? "سکوت" : "باز"
					})]
				}, row.id))
			})] })
		]
	});
}
function Preset({ label, value, options, suffix, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs text-muted",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 flex flex-wrap gap-2",
		children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"aria-pressed": value === option,
			onClick: () => onPick(option),
			className: `num h-11 rounded-card px-3 text-sm ${value === option ? "bg-copper text-copper-ink" : "border border-line text-fg"}`,
			children: [option, suffix]
		}, option))
	})] });
}
function MethodPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4 text-sm leading-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-card border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "تصمیم کارفرما"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: "زنجیرهٔ ChatGPT بعد Claude بعد DeepSeek بعد Grok بعد Kimi را نساز. هر کدام در پلن رایگان سقف دارند، زمینه را گم می‌کنند، و تو تبدیل به اپراتور کپی‌پیست می‌شوی. فیلتری که هر بار حرفش عوض شود قابل اعتماد نیست. فیلتر باید قطعی باشد تا بعد از سی معامله بشود فهمید دروغ می‌گفته یا نه."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: "ربات تلگرام پوسته است، نه مغز. بدون سرور همیشه روشن فقط یک جعبهٔ خالی است. مغز همین میز است: نماد را از کانال می‌گیری، می‌چسبانی، امتیاز ۰ تا ۱۰۰ و قالب ریسک را می‌بینی. روزی شش نماد، ده ثانیه کار است."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-card border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "چه چیزهایی را خط زدم"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-2 flex flex-col gap-2 text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "خواندن خودکار کانال. اسکرپ تلگرام اکانت را می‌بندد و برای شش نماد در روز نمی‌ارزد." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "API رسمی توییتر. پول می‌خواهد و سیگنال خرید نمی‌سازد." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "یوتیوب آموزشی. مدل از ویدیو «یاد نمی‌گیرد» کدام ارز را بخری؛ فقط متن تولید می‌کند." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "چند مدل پشت سر هم. هیچ‌کدام حافظهٔ مشترک و بک‌تست تکرارپذیر ندارند." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: "داده از API رایگان و بدون کلید می‌آید: دکس‌اسکرینر برای نقدینگی و مارکت، و اوکی‌ایکس یا مکسی یا گیت برای قیمت صرافی. بایننس از خیلی از سرورها بسته است؛ اگر جواب بدهد همان را ترجیح می‌دهیم."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-card border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "شش ماژول، جمعاً ۱۰۰"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-2 flex flex-col gap-2 text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "خروج، ۲۵. اگر نتوانی بفروشی، سود کانال مال تو نیست." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "تعقیب، ۲۵. رشد بالای ۱۰۰٪ در ۲۴ ساعت یعنی دیر رسیده‌ای." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "توجه، ۱۵. حجم نسبت به اندازه؛ نه مرده، نه انفجاری." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "اندازه، ۱۵. بردهای خیلی بزرگ دفترچه مال مارکت‌های غول نبود. ریزِ بدون نقدینگی هم رد است." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "محل، ۱۰. صرافی شناخته‌شده بهتر از استخر نازک است." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "سن جفت، ۱۰. جوان‌تر از دو روز، منطقهٔ تک‌تیرانداز است." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: "سقف جداگانه هم هست: نقدینگی ناچیز، پامپ روزانهٔ بالای ۱۰۰٪، یا ریزش بدتر از ۴۰٪ امتیاز را حتی اگر بقیه چیزها قشنگ باشد پایین می‌آورد. بالای ۷۵ قابل قبول است، ۵۸ تا ۷۴ مردد، پایین‌تر رد. قابل قبول یعنی مانع ساختاری بزرگ ندیدم، نه اینکه بخر."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-card border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold",
					children: "فردا دقیقاً این کار را بکن"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-2 flex list-inside list-decimal flex-col gap-2 text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "سرمایه را روی مبلغی بگذار که از دست دادنش زندگی‌ات را عوض نکند. ریسک را ۱٪ نگه دار." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "نمادهای تازهٔ BITFA را در فیلتر بچسبان. بیشتر از ۸ تا در هر بار نه." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "هر چیزی جز «قابل قبول» را ول کن. با کانال بحث نکن." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "برای قابل‌قبول‌ها سفارش را داخل ناحیهٔ ورود بگذار، نه روی قیمت بازار اگر قبلاً دویده باشد." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "حد باطل را همان لحظه ثبت کن. اگر قیمت آنجا را دید، ایده مرده است." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "دکمهٔ آزمایش را بزن. وقتی بستی، درصد واقعی را بنویس. بعد از سی تا، تصمیم بعدی را با همان اعداد می‌گیریم." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-card border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "دربارهٔ دفترچه"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: "کال‌هایی که کانال برایشان عددی نگفته بود، طبق جمع‌بندی خودت ناموفق‌اند. این نرخ اعلام کانال است، نه نرخ برد معاملهٔ تو. سود اعلام‌شده قله‌ای است که کانال دیده، نه پر شدن سفارش تو. برای همین برداشت پیش‌فرض ۴۰٪ همان عدد است و باخت سکوت ۱۲٪، یعنی یک حدضرر منظم نه نابودی کل سرمایه. اگر سکو را ۱۰۰٪ بگذاری، می‌بینی میانگین چقدر به چهار کال افسانه‌ای وابسته است."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: "این سیستم خودش ارز جدید معرفی نمی‌کند. منبع ایده فقط کانال است. کار غربال این است که جلوی ورودهای بدقواره را بگیرد: بدون خروج، بعد از پامپ، یا با اندازهٔ نامربوط."
					})
				]
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var scanSymbols = createServerFn({ method: "POST" }).validator((data) => {
	if (!data || !Array.isArray(data.symbols) || data.symbols.length === 0) throw new Error("حداقل یک نماد لازم است");
	return { symbols: data.symbols.slice(0, 8).map((s) => String(s).slice(0, 24)) };
}).handler(createSsrRpc("b5d86e79ce854d5da2c795d11d93481f74986c369a60948b4d46b183f241c3d0"));
var VENUE_FA = {
	binance: "بایننس",
	okx: "اوکی‌ایکس",
	mexc: "مکسی",
	gate: "گیت",
	dex: "دکس",
	none: "نامشخص"
};
function venueLabel(venue) {
	return VENUE_FA[venue];
}
function liqModule(s) {
	const vol = s.cexVolume ?? 0;
	const dexVol = s.dexVolume ?? 0;
	const lusd = s.liquidity ?? 0;
	const useCex = s.venue !== "dex" && s.venue !== "none" && vol >= 2e4;
	let score = 0;
	let detail = "";
	if (useCex) {
		if (vol >= 5e6) score = 25;
		else if (vol >= 1e6) score = 21;
		else if (vol >= 25e4) score = 16;
		else if (vol >= 5e4) score = 11;
		else score = 6;
		detail = `حجم ۲۴س ${venueLabel(s.venue)}`;
	} else if (lusd > 0 || dexVol > 0) {
		if (lusd >= 4e5 && dexVol >= 15e4) score = 22;
		else if (lusd >= 12e4 && dexVol >= 6e4) score = 16;
		else if (lusd >= 4e4 && dexVol >= 2e4) score = 11;
		else if (lusd >= 15e3) score = 6;
		else score = 2;
		detail = "نقدینگی و حجم دکس";
	} else {
		score = 0;
		detail = "حجم قابل اتکا پیدا نشد";
	}
	return {
		id: "liq",
		label: "خروج",
		score,
		max: 25,
		detail
	};
}
function chaseModule(s) {
	const ch = s.change24h;
	if (ch == null) return {
		id: "chase",
		label: "تعقیب",
		score: 12,
		max: 25,
		detail: "تغییر ۲۴س نامعلوم"
	};
	let score = 12;
	if (ch > 100) score = 0;
	else if (ch > 60) score = 6;
	else if (ch > 35) score = 12;
	else if (ch > 12) score = 19;
	else if (ch >= -8) score = 25;
	else if (ch >= -20) score = 18;
	else if (ch >= -40) score = 8;
	else score = 3;
	return {
		id: "chase",
		label: "تعقیب",
		score,
		max: 25,
		detail: `تغییر ۲۴س ${ch.toFixed(1)}٪`
	};
}
function attentionModule(s) {
	const vol = s.volume24h ?? 0;
	const basis = s.marketCap && s.marketCap > 0 ? s.marketCap : s.liquidity && s.liquidity > 0 ? s.liquidity : null;
	if (!basis || vol <= 0) return {
		id: "att",
		label: "توجه",
		score: 7,
		max: 15,
		detail: "نسبت حجم به اندازه نامعلوم"
	};
	const ratio = vol / basis;
	let score = 4;
	if (ratio >= .08 && ratio <= 1.2) score = 15;
	else if (ratio >= .03 && ratio < .08) score = 11;
	else if (ratio > 1.2 && ratio <= 3) score = 10;
	else if (ratio > 3 && ratio <= 8) score = 6;
	else if (ratio > 8) score = 3;
	else score = 4;
	const base = s.marketCap ? "مارکت" : "نقدینگی";
	return {
		id: "att",
		label: "توجه",
		score,
		max: 15,
		detail: `حجم / ${base} = ${ratio.toFixed(2)}`
	};
}
function sizeModule(s) {
	const mc = s.marketCap;
	if (mc == null || mc <= 0) return {
		id: "size",
		label: "اندازه",
		score: 8,
		max: 15,
		detail: "مارکت‌کپ نامعلوم"
	};
	let score = 8;
	if (mc < 15e5) score = 5;
	else if (mc < 8e7) score = 15;
	else if (mc < 4e8) score = 11;
	else if (mc < 2e9) score = 7;
	else score = 4;
	return {
		id: "size",
		label: "اندازه",
		score,
		max: 15,
		detail: "بازه نسبت به کال‌های پردرآمد دفترچه"
	};
}
function venueModule(s) {
	const lusd = s.liquidity ?? 0;
	if (s.venue === "binance" || s.venue === "okx") return {
		id: "venue",
		label: "محل",
		score: 10,
		max: 10,
		detail: venueLabel(s.venue)
	};
	if (s.venue === "mexc" || s.venue === "gate") return {
		id: "venue",
		label: "محل",
		score: 7,
		max: 10,
		detail: venueLabel(s.venue)
	};
	if (s.venue === "dex" && lusd >= 8e4) return {
		id: "venue",
		label: "محل",
		score: 6,
		max: 10,
		detail: s.chain ? `دکس · ${s.chain}` : "دکس"
	};
	return {
		id: "venue",
		label: "محل",
		score: 3,
		max: 10,
		detail: s.chain ? `دکس نازک · ${s.chain}` : "محل ضعیف"
	};
}
function ageModule(s) {
	const d = s.pairAgeDays;
	if (d == null) return {
		id: "age",
		label: "سن",
		score: 6,
		max: 10,
		detail: "سن جفت نامعلوم"
	};
	let score = 6;
	if (d < 2) score = 3;
	else if (d < 14) score = 7;
	else if (d <= 220) score = 10;
	else if (d <= 500) score = 7;
	else score = 5;
	return {
		id: "age",
		label: "سن",
		score,
		max: 10,
		detail: `حدود ${Math.round(d)} روز`
	};
}
function scoreSnap(s) {
	const flags = [];
	if (!s.found || s.price == null) return {
		total: 0,
		raw: 0,
		capReason: "بازاری برای این نماد پیدا نشد",
		verdict: "skip",
		verdictLabel: "رد",
		modules: [
			{
				id: "liq",
				label: "خروج",
				score: 0,
				max: 25,
				detail: "—"
			},
			{
				id: "chase",
				label: "تعقیب",
				score: 0,
				max: 25,
				detail: "—"
			},
			{
				id: "att",
				label: "توجه",
				score: 0,
				max: 15,
				detail: "—"
			},
			{
				id: "size",
				label: "اندازه",
				score: 0,
				max: 15,
				detail: "—"
			},
			{
				id: "venue",
				label: "محل",
				score: 0,
				max: 10,
				detail: "—"
			},
			{
				id: "age",
				label: "سن",
				score: 0,
				max: 10,
				detail: "—"
			}
		],
		flags: ["روی اوکی‌ایکس، مکسی، گیت و دکس‌اسکرینر پیدا نشد. نماد را دقیق‌تر چک کن."]
	};
	const modules = [
		liqModule(s),
		chaseModule(s),
		attentionModule(s),
		sizeModule(s),
		venueModule(s),
		ageModule(s)
	];
	const raw = modules.reduce((sum, m) => sum + m.score, 0);
	let cap = null;
	let capReason = null;
	const tighten = (n, reason) => {
		if (cap == null || n < cap) {
			cap = n;
			capReason = reason;
		}
	};
	const vol = s.volume24h ?? 0;
	const lusd = s.liquidity ?? 0;
	if (vol < 2e4 && lusd < 2e4) tighten(30, "حجم و نقدینگی هر دو ناچیز است");
	else if (s.venue === "dex" && lusd < 2e4) tighten(35, "نقدینگی خروج زیر ۲۰هزار دلار");
	if (s.change24h != null && s.change24h > 100) tighten(40, "۲۴ ساعت بیش از ۱۰۰٪ بالا رفته");
	if (s.change24h != null && s.change24h < -40) tighten(45, "ریزش ۲۴ساعته بدتر از ۴۰٪");
	const total = cap != null ? Math.min(raw, cap) : raw;
	if (s.change24h != null && s.change24h > 60) flags.push("بخش بزرگی از حرکت احتمالاً گذشته. بازار نخر.");
	if (s.change24h != null && s.change24h < -25) flags.push("ریزش تند است. عجله برای چاقو ممنوع.");
	if (s.marketCap != null && s.marketCap < 15e5) flags.push("مارکت خیلی کوچک است؛ دستکاری و قفل‌شدن خروج جدی است.");
	if (s.marketCap != null && s.marketCap > 2e9) flags.push("اندازه بزرگ است. بردهای چندصددرصدی دفترچه معمولاً مال این کلاس نبود.");
	if (s.pairAgeDays != null && s.pairAgeDays < 2) flags.push("جفت جوان‌تر از دو روز است.");
	if (s.suspectPool) flags.push("استخر دکس مشکوک به نقدینگی ساختگی است.");
	if (s.ambiguous > 1) flags.push("چند دارایی با این نماد قیمت‌های خیلی متفاوت دارند. اسم را با کانال تطبیق بده.");
	if (s.priceGap) flags.push("قیمت صرافی و دکس بیش از ۱۲٪ فاصله دارد.");
	if (s.venue === "mexc" || s.venue === "gate") flags.push("حجم از صرافی درجهٔ دو آمده. دفتر سفارش را خودت ببین.");
	if ((s.volume24h ?? 0) > 0 && s.marketCap && s.volume24h / s.marketCap > 8) flags.push("حجم نسبت به اندازه افراطی است.");
	let verdict = "skip";
	let verdictLabel = "رد";
	if (total >= 75) {
		verdict = "check";
		verdictLabel = "قابل قبول";
	} else if (total >= 58) {
		verdict = "mid";
		verdictLabel = "مردد";
	}
	return {
		total,
		raw,
		capReason,
		verdict,
		verdictLabel,
		modules,
		flags
	};
}
function tradePlan(price, change24h, bankroll, riskPct) {
	const ch = change24h ?? 0;
	const chase = ch > 12;
	const entryLow = price * (chase ? .92 : .986);
	const entryHigh = price * (chase ? .975 : 1.002);
	const mid = (entryLow + entryHigh) / 2;
	const stopPct = Math.abs(ch) >= 25 ? .14 : .09;
	const stop = mid * (1 - stopPct);
	const riskPerUnit = Math.max(mid - stop, mid * .01);
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
		notionalPct: bankroll > 0 ? notional / bankroll * 100 : 0,
		qty,
		chase
	};
}
function verdictNote(verdict) {
	if (verdict === "check") return "مانع ساختاریِ بزرگ دیده نشد. این هنوز دلیل خرید نیست.";
	if (verdict === "mid") return "نه رد قطعی، نه ورود تمیز. اگر تنها دلیل کانال است، وارد نشو.";
	return "ورود نکن.";
}
var SAMPLE = [
	"KAITO",
	"LINK",
	"ZRO",
	"VVV"
];
function parseSymbols(raw) {
	const found = raw.toUpperCase().match(/[A-Z][A-Z0-9]{1,14}/g) ?? [];
	const out = [];
	for (const symbol of found) {
		if (!out.includes(symbol)) out.push(symbol);
		if (out.length >= 8) break;
	}
	return out;
}
function tone(verdict) {
	if (verdict === "check") return "text-olive";
	if (verdict === "mid") return "text-copper";
	return "text-loss";
}
function ScoreDial({ total, verdict }) {
	const r = 28;
	const circ = 2 * Math.PI * r;
	const dash = Math.max(0, Math.min(100, total)) / 100 * circ;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative size-20 shrink-0 ${tone(verdict)}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 72 72",
			className: "size-20 -rotate-90",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "36",
				cy: "36",
				r,
				className: "stroke-line",
				strokeWidth: "5",
				fill: "none"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "36",
				cy: "36",
				r,
				className: "stroke-current",
				strokeWidth: "5",
				fill: "none",
				strokeLinecap: "round",
				strokeDasharray: `${dash} ${circ}`
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "num absolute inset-0 flex items-center justify-center text-xl font-semibold text-fg",
			children: total
		})]
	});
}
function ResultCard({ snap, bankroll, riskPct, saved, onPaper }) {
	const scored = scoreSnap(snap);
	const plan = snap.price != null ? tradePlan(snap.price, snap.change24h, bankroll, riskPct) : null;
	const up = (snap.change24h ?? 0) >= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-card border border-line bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "num text-lg font-semibold",
								children: snap.symbol
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-sm font-medium ${tone(scored.verdict)}`,
								children: scored.verdictLabel
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								snap.name ?? "بدون نام",
								snap.venue !== "none" ? ` · ${venueLabel(snap.venue)}` : "",
								snap.chain ? ` · ${snap.chain}` : ""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-6 text-fg",
							children: verdictNote(scored.verdict)
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreDial, {
					total: scored.total,
					verdict: scored.verdict
				})]
			}),
			snap.found && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "قیمت",
						value: formatPx(snap.price)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "۲۴ ساعت",
						value: snap.change24h == null ? "—" : formatPct(snap.change24h),
						valueClass: snap.change24h == null ? "" : up ? "text-olive" : "text-loss"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "حجم",
						value: formatUsd(snap.volume24h)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "مارکت",
						value: formatUsd(snap.marketCap)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 flex flex-col gap-2",
				children: scored.modules.map((mod) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-16 shrink-0 text-xs text-muted",
							children: mod.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "meter min-w-0 flex-1",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${mod.score / mod.max * 100}%` } })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "num w-12 shrink-0 text-end text-xs text-muted",
							children: [
								mod.score,
								"/",
								mod.max
							]
						})
					]
				}, mod.id))
			}),
			scored.capReason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-loss",
				children: [
					"سقف اعمال شد: ",
					scored.capReason,
					scored.raw !== scored.total ? ` (خام ${scored.raw})` : ""
				]
			}),
			scored.flags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-col gap-1 text-sm text-muted",
				children: scored.flags.map((flag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: flag }, flag))
			}),
			plan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-card bg-surface-2 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-medium",
						children: "قالب ریسک، نه سیگنال"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-6 text-muted",
						children: plan.chase ? "ورود بازار ممنوع. فقط اگر به ناحیهٔ عقب‌نشینی رسید." : "اگر وارد می‌شوی، بازار ندو. سفارش را داخل ناحیه بگذار و حد باطل را همان لحظه ثبت کن."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-3 grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "ناحیهٔ ورود",
								value: `${formatPx(plan.entryLow)} – ${formatPx(plan.entryHigh)}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "حد باطل",
								value: `${formatPx(plan.stop)} · ${formatPct(-plan.stopPct * 100, 0)}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "هدف ۱ / ۲ / ۳",
								value: `${formatPx(plan.tp1)} · ${formatPx(plan.tp2)} · ${formatPx(plan.tp3)}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "حجم از روی ریسک",
								value: `${formatUsd(plan.notional)} · ${Math.round(plan.notionalPct)}% سرمایه`
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs leading-6 text-muted",
						children: [
							"ریسک این معامله ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num",
								children: formatUsd(plan.riskUsd)
							}),
							" است. تعداد حدود",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num",
								children: formatQty(plan.qty)
							}),
							". هدف‌ها از وسط ناحیه حساب شده‌اند: یک‌برابر، دو‌برابر و سه‌ونیم‌برابر فاصله تا حد باطل."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [snap.pairUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "inline-flex h-11 items-center rounded-card border border-line px-4 text-sm",
					href: snap.pairUrl,
					target: "_blank",
					rel: "noreferrer",
					children: "نمودار"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex h-11 items-center rounded-card bg-copper px-4 text-sm font-medium text-copper-ink disabled:opacity-60",
					disabled: saved || !snap.found,
					onClick: () => onPaper({
						id: `${snap.symbol}-${Date.now()}`,
						symbol: snap.symbol,
						name: snap.name,
						at: (/* @__PURE__ */ new Date()).toISOString(),
						score: scored.total,
						verdict: scored.verdict,
						price: snap.price,
						stop: plan?.stop ?? null,
						exitPct: null
					}),
					children: saved ? "در آزمایش ثبت شد" : "بگذار در آزمایش"
				})]
			})
		]
	});
}
function Stat({ label, value, valueClass = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: `num mt-1 text-sm break-words ${valueClass}`,
			children: value
		})]
	});
}
function ScanPanel({ bankroll, riskPct, onPaper }) {
	const scan = useServerFn(scanSymbols);
	const [text, setText] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [rows, setRows] = (0, import_react.useState)([]);
	const [savedIds, setSavedIds] = (0, import_react.useState)([]);
	async function run(symbols) {
		setPending(true);
		setError(null);
		try {
			const ordered = [...await scan({ data: { symbols } })].sort((a, b) => scoreSnap(b).total - scoreSnap(a).total);
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
		run(symbols);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
						n: "۱",
						text: "نمادهای امروز کانال را بچسبان. خودت ارز پیدا نکن."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
						n: "۲",
						text: "امتیاز یعنی ساختار معامله، نه پیش‌بینی سود."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
						n: "۳",
						text: "فقط قابل‌قبول‌ها، آن هم با حد باطل و حجم محاسبه‌شده."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted",
					children: "نمادها، حداکثر ۸ تا"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: text,
					onChange: (e) => setText(e.target.value),
					rows: 5,
					spellCheck: false,
					autoComplete: "off",
					placeholder: "#ZRO\nVVV\nKAITO",
					className: "num min-h-28 rounded-card border border-line bg-surface px-3 py-3 text-sm text-fg outline-none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: pending,
					onClick: onSubmit,
					className: "inline-flex h-12 items-center rounded-card bg-copper px-5 font-semibold text-copper-ink disabled:opacity-60",
					children: pending ? "در حال خواندن بازار…" : "بسنج"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: pending,
					onClick: () => {
						setText(SAMPLE.join("\n"));
						run(SAMPLE);
					},
					className: "inline-flex h-12 items-center rounded-card border border-line px-5 text-sm disabled:opacity-60",
					children: "چهار نمونه"
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-loss",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3",
				children: rows.map((snap) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
					snap,
					bankroll,
					riskPct,
					saved: savedIds.includes(snap.symbol),
					onPaper: (row) => {
						onPaper(row);
						setSavedIds((prev) => prev.includes(row.symbol) ? prev : [...prev, row.symbol]);
					}
				}, snap.symbol))
			})
		]
	});
}
function Step({ n, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-card border border-line bg-surface p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "num text-xs text-copper",
			children: n
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm leading-6",
			children: text
		})]
	});
}
var PREF_KEY = "sieve-prefs";
var PAPER_KEY = "sieve-paper";
var DEFAULTS = {
	bankroll: 100,
	riskPct: 1,
	silentLoss: 12,
	capture: 40
};
function readPrefs() {
	try {
		const raw = localStorage.getItem(PREF_KEY);
		if (!raw) return DEFAULTS;
		const parsed = JSON.parse(raw);
		return {
			bankroll: clamp(parsed.bankroll, 10, 1e6, DEFAULTS.bankroll),
			riskPct: clamp(parsed.riskPct, .25, 5, DEFAULTS.riskPct),
			silentLoss: clamp(parsed.silentLoss, 5, 100, DEFAULTS.silentLoss),
			capture: clamp(parsed.capture, 10, 100, DEFAULTS.capture)
		};
	} catch {
		return DEFAULTS;
	}
}
function clamp(value, min, max, fallback) {
	const n = typeof value === "number" ? value : Number(value);
	if (!Number.isFinite(n)) return fallback;
	return Math.min(max, Math.max(min, n));
}
function usePrefs() {
	const [prefs, setPrefs] = (0, import_react.useState)(DEFAULTS);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setPrefs(readPrefs());
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
	}, [prefs, ready]);
	return {
		prefs,
		setPrefs
	};
}
function readPaper() {
	try {
		const raw = localStorage.getItem(PAPER_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter(isPaper).slice(0, 100);
	} catch {
		return [];
	}
}
function isPaper(v) {
	if (!v || typeof v !== "object") return false;
	const o = v;
	return typeof o.id === "string" && typeof o.symbol === "string" && typeof o.score === "number";
}
function usePaper() {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setRows(readPaper());
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		localStorage.setItem(PAPER_KEY, JSON.stringify(rows));
	}, [rows, ready]);
	function add(row) {
		setRows((prev) => [row, ...prev].slice(0, 100));
	}
	function settle(id, exitPct) {
		setRows((prev) => prev.map((row) => row.id === id ? {
			...row,
			exitPct
		} : row));
	}
	function remove(id) {
		setRows((prev) => prev.filter((row) => row.id !== id));
	}
	return {
		rows,
		add,
		settle,
		remove
	};
}
var TABS = [
	{
		id: "scan",
		label: "فیلتر"
	},
	{
		id: "journal",
		label: "دفترچه"
	},
	{
		id: "method",
		label: "روش"
	}
];
function Desk() {
	const { prefs, setPrefs } = usePrefs();
	const paper = usePaper();
	const [tab, setTab] = (0, import_react.useState)("scan");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "flex items-start justify-between gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-semibold tracking-tight",
						children: "غربال"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm leading-6 text-muted",
					children: "میز فیلتر کال‌های BITFA. کانال ایده می‌دهد؛ اینجا فقط می‌گوید ساختار ورود خراب است یا نه."
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-card border border-line bg-surface px-3 py-3 text-sm leading-6 text-muted",
				children: "توصیهٔ خرید نیست. ممکن است کل مبلغ درگیر را از دست بدهی. امتیاز، پیش‌بینی سود کانال نیست."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: "سرمایه، دلار"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "num h-12 rounded-card border border-line bg-surface px-3 text-sm",
						inputMode: "decimal",
						value: prefs.bankroll,
						onChange: (e) => {
							const n = Number(e.target.value);
							if (Number.isFinite(n)) setPrefs({
								...prefs,
								bankroll: Math.min(1e6, Math.max(0, n))
							});
						}
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: "ریسک هر معامله، درصد"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "num h-12 rounded-card border border-line bg-surface px-3 text-sm",
						inputMode: "decimal",
						value: prefs.riskPct,
						onChange: (e) => {
							const n = Number(e.target.value);
							if (Number.isFinite(n)) setPrefs({
								...prefs,
								riskPct: Math.min(5, Math.max(0, n))
							});
						}
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				value: tab,
				onValueChange: setTab,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
						className: "grid grid-cols-3 gap-1 rounded-card bg-surface p-1",
						children: TABS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: item.id,
							className: "h-11 rounded-lg text-sm text-muted data-[state=active]:bg-surface-2 data-[state=active]:text-fg",
							children: item.label
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "scan",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanPanel, {
							bankroll: prefs.bankroll,
							riskPct: prefs.riskPct,
							onPaper: (row) => {
								paper.add(row);
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "journal",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalPanel, {
							silentLoss: prefs.silentLoss,
							capture: prefs.capture,
							onSilent: (silentLoss) => setPrefs({
								...prefs,
								silentLoss
							}),
							onCapture: (capture) => setPrefs({
								...prefs,
								capture
							}),
							paper: paper.rows,
							onSettle: paper.settle,
							onRemove: paper.remove
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "method",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MethodPanel, {})
					})
				]
			})
		]
	});
}
function Mark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: "size-8",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "8",
				className: "fill-surface"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "16",
				r: "9",
				className: "stroke-copper",
				strokeWidth: "2",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M9 13h14M10 16h12M11 19h10",
				className: "stroke-fg",
				strokeWidth: "1.6",
				strokeLinecap: "round"
			})
		]
	});
}
var SplitComponent = Desk;
//#endregion
export { SplitComponent as component };
