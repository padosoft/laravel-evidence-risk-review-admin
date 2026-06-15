import { QueryClient as e, QueryClientProvider as t, useMutation as n, useQuery as r } from "@tanstack/react-query";
import { createContext as i, createElement as a, useContext as o, useMemo as s, useState as c } from "react";
import { BrowserRouter as l, Link as u, MemoryRouter as d, NavLink as f, Outlet as p, Route as m, Routes as h, useParams as g } from "react-router-dom";
import { jsx as _, jsxs as v } from "react/jsx-runtime";
import y from "axios";
//#region resources/js/config.ts
var b = {
	api_base: "/evidence-risk-review/api",
	mount_prefix: "admin/evidence-risk-review",
	theme_default: "dark",
	asset_path: "vendor/evidence-risk-review-admin"
};
function x(e) {
	let t = {
		...b,
		...typeof window < "u" ? window.__EVIDENCE_RISK_REVIEW_ADMIN__ : void 0,
		...e
	};
	return {
		api_base: C(t.api_base),
		mount_prefix: T(t.mount_prefix),
		theme_default: ee(t.theme_default),
		asset_path: w(t.asset_path, b.asset_path)
	};
}
function S(e) {
	let t = T(e.mount_prefix);
	return t === "" ? "/" : `/${t}`;
}
function C(e) {
	let t = (e ?? b.api_base).trim().replace(/\/+$/g, "");
	return t === "" ? b.api_base : t;
}
function w(e, t) {
	let n = (e ?? t).trim().replace(/^\/+|\/+$/g, "");
	return n === "" ? t : n;
}
function T(e) {
	return (e ?? b.mount_prefix).trim().replace(/^\/+|\/+$/g, "");
}
function ee(e) {
	return e === "light" ? "light" : "dark";
}
//#endregion
//#region resources/js/components/badges.tsx
var E = {
	keep: "Keep",
	soften: "Soften",
	flag_for_human_review: "Human review",
	remove: "Remove"
};
function D({ verdict: e }) {
	return /* @__PURE__ */ _("span", {
		className: `evr-badge evr-badge--${e}`,
		"data-testid": `evr-verdict-${e}`,
		children: E[e]
	});
}
function O({ cost: e }) {
	return /* @__PURE__ */ _("span", {
		className: "evr-badge evr-badge--muted",
		children: e.replaceAll("_", " ")
	});
}
function k({ tier: e }) {
	return /* @__PURE__ */ v("span", {
		className: "evr-tier-badge",
		children: [/* @__PURE__ */ _("span", { children: e.label }), /* @__PURE__ */ _("strong", { children: e.rank })]
	});
}
//#endregion
//#region resources/js/lib/api/errors.ts
var A = class extends Error {
	status;
	code;
	payload;
	constructor(e, t, n, r) {
		super(e), this.status = t, this.code = n, this.payload = r, this.name = "ApiError";
	}
}, j = class extends A {
	constructor(e, t, n, r) {
		super(n, e, t, r), this.name = "ValidationError";
	}
	get fieldErrors() {
		return this.payload?.errors ?? {};
	}
}, M = class extends A {
	constructor(e, t, n) {
		super(t, e, "feature_disabled", n), this.name = "FeatureDisabledError";
	}
}, te = class extends A {
	constructor(e, t, n) {
		super(t, e, "auth_expired", n), this.name = "AuthExpiredError";
	}
}, N = class extends A {
	constructor(e = "Network error") {
		super(e, null, "network_error"), this.name = "NetworkError";
	}
};
function P(e) {
	if (!y.isAxiosError(e)) return new A(e instanceof Error ? e.message : "Unexpected error", null, "unexpected_error");
	if (!e.response) return new N(e.message);
	let t = e.response.status, n = e.response.data ?? {}, r = n.error?.message ?? n.message ?? e.message, i = n.error?.code ?? `http_${t}`;
	return t === 422 ? new j(t, i, r, n) : t === 401 || t === 419 ? new te(t, r, n) : t === 404 || i === "feature_disabled" ? new M(t, r, n) : new A(r, t, i, n);
}
//#endregion
//#region resources/js/lib/data-state.tsx
function ne({ state: e, testId: t, children: n }) {
	return /* @__PURE__ */ _("section", {
		"data-testid": t,
		"data-state": e,
		"aria-busy": e === "loading",
		children: n
	});
}
//#endregion
//#region resources/js/components/state.tsx
function F({ isLoading: e, isError: t, isEmpty: n }) {
	return e ? "loading" : t ? "error" : n ? "empty" : "ready";
}
function I({ testId: e, state: t, error: n, empty: r, children: i }) {
	return /* @__PURE__ */ v(ne, {
		testId: e,
		state: t,
		children: [
			t === "loading" ? /* @__PURE__ */ _("div", {
				className: "evr-skeleton",
				children: "Loading..."
			}) : null,
			t === "error" ? /* @__PURE__ */ _("div", {
				className: "evr-callout evr-callout--error",
				"data-testid": `${e}-error`,
				children: n instanceof A ? n.message : "Unable to load Evidence Risk Review data."
			}) : null,
			t === "empty" ? /* @__PURE__ */ _("div", {
				className: "evr-empty",
				"data-testid": `${e}-empty`,
				children: r ?? "No data yet."
			}) : null,
			t === "ready" ? i : null
		]
	});
}
//#endregion
//#region resources/js/lib/api/client.ts
function re(e) {
	return C(x(e).api_base);
}
function L(e) {
	let t = y.create({
		baseURL: re(e),
		withCredentials: !0,
		headers: {
			Accept: "application/json",
			"X-Requested-With": "XMLHttpRequest"
		}
	});
	return t.interceptors.response.use((e) => e, (e) => Promise.reject(P(e))), t;
}
L();
//#endregion
//#region resources/js/lib/api/endpoints.ts
function R(e) {
	return Object.fromEntries(Object.entries(e).filter(([, e]) => e != null && e !== ""));
}
function z(e = L()) {
	return {
		async listReviews(t = {}) {
			return (await e.get("/reviews", { params: R(t) })).data;
		},
		async getReview(t) {
			return (await e.get(`/reviews/${encodeURIComponent(t)}`)).data;
		},
		async submitReview(t, n = {}) {
			return (await e.post("/reviews", t, { params: n.dry_run ? { dry_run: 1 } : void 0 })).data;
		},
		async listProfiles() {
			return (await e.get("/profiles")).data;
		},
		async getProfile(t) {
			return (await e.get(`/profiles/${encodeURIComponent(t)}`)).data;
		},
		async taxonomy() {
			return (await e.get("/taxonomy")).data;
		}
	};
}
var B = z(), V = {
	reviews: (e = {}) => [
		"evr",
		"reviews",
		e
	],
	review: (e) => [
		"evr",
		"reviews",
		e
	],
	profiles: () => ["evr", "profiles"],
	profile: (e) => [
		"evr",
		"profiles",
		e
	],
	taxonomy: () => ["evr", "taxonomy"]
}, H = i(B);
function U({ children: e, config: t }) {
	let n = s(() => z(L(t)), [t.api_base]);
	return a(H.Provider, { value: n }, e);
}
function W() {
	return o(H);
}
function G(e = {}) {
	let t = W();
	return r({
		queryKey: V.reviews(e),
		queryFn: () => t.listReviews(e)
	});
}
function K(e) {
	let t = W();
	return r({
		queryKey: V.review(e),
		queryFn: () => t.getReview(e),
		enabled: e !== ""
	});
}
function q() {
	let e = W();
	return r({
		queryKey: V.profiles(),
		queryFn: () => e.listProfiles()
	});
}
function J(e) {
	let t = W();
	return r({
		queryKey: V.profile(e),
		queryFn: () => t.getProfile(e),
		enabled: e !== ""
	});
}
function Y() {
	let e = W();
	return r({
		queryKey: V.taxonomy(),
		queryFn: () => e.taxonomy()
	});
}
function ie() {
	let e = W();
	return n({ mutationFn: ({ input: t, options: n = {} }) => e.submitReview(t, n) });
}
//#endregion
//#region resources/js/pages/DashboardPage.tsx
var X = [
	"keep",
	"soften",
	"flag_for_human_review",
	"remove"
];
function ae() {
	let e = G({ page: 1 }), t = q(), n = Y(), r = e.data?.data ?? [], i = e.isSuccess && r.length === 0, a = F({
		isLoading: e.isLoading || t.isLoading || n.isLoading,
		isError: e.isError || t.isError || n.isError,
		isEmpty: i
	}), o = Object.fromEntries(X.map((e) => [e, 0]));
	r.forEach((e) => {
		o[e.max_verdict] += 1;
	});
	let s = r.length === 0 ? 0 : Math.round(r.reduce((e, t) => e + t.risk_score, 0) / r.length);
	return /* @__PURE__ */ _(I, {
		testId: "evr-dashboard",
		state: a,
		error: e.error ?? t.error ?? n.error,
		empty: "No reviews have been recorded yet.",
		children: /* @__PURE__ */ v("section", {
			className: "evr-page",
			children: [
				/* @__PURE__ */ v("div", {
					className: "evr-page__header",
					children: [/* @__PURE__ */ v("div", { children: [/* @__PURE__ */ _("h1", { children: "Dashboard" }), /* @__PURE__ */ _("p", { children: "Recent review activity from the configured core API." })] }), /* @__PURE__ */ _(u, {
						className: "evr-button",
						to: "/reviews",
						"data-testid": "evr-dashboard-open-reviews",
						children: "Open log"
					})]
				}),
				/* @__PURE__ */ v("div", {
					className: "evr-kpi-grid",
					children: [
						/* @__PURE__ */ _(Z, {
							testId: "evr-dashboard-kpi-reviews",
							label: "Last page reviews",
							value: r.length
						}),
						/* @__PURE__ */ _(Z, {
							testId: "evr-dashboard-kpi-softened",
							label: "Softened",
							value: o.soften
						}),
						/* @__PURE__ */ _(Z, {
							testId: "evr-dashboard-kpi-flagged",
							label: "Flagged",
							value: o.flag_for_human_review
						}),
						/* @__PURE__ */ _(Z, {
							testId: "evr-dashboard-kpi-risk",
							label: "Mean risk",
							value: s
						})
					]
				}),
				/* @__PURE__ */ v("div", {
					className: "evr-panel-grid",
					children: [/* @__PURE__ */ v("section", {
						className: "evr-panel",
						"data-testid": "evr-dashboard-verdict-dist",
						children: [/* @__PURE__ */ _("h2", { children: "Verdict distribution" }), /* @__PURE__ */ _("div", {
							className: "evr-stack",
							children: X.map((e) => /* @__PURE__ */ v("div", { children: [/* @__PURE__ */ _(D, { verdict: e }), /* @__PURE__ */ _("strong", { children: o[e] })] }, e))
						})]
					}), /* @__PURE__ */ v("section", {
						className: "evr-panel",
						"data-testid": "evr-dashboard-tier-dist",
						children: [/* @__PURE__ */ _("h2", { children: "Evidence tiers" }), /* @__PURE__ */ _("div", {
							className: "evr-tier-list",
							children: [...n.data ?? []].sort((e, t) => t.rank - e.rank).map((e) => /* @__PURE__ */ _(k, { tier: e }, e.key))
						})]
					})]
				}),
				/* @__PURE__ */ v("section", {
					className: "evr-panel",
					"data-testid": "evr-dashboard-profiles",
					children: [/* @__PURE__ */ _("h2", { children: "Profiles" }), /* @__PURE__ */ _("div", {
						className: "evr-profile-row",
						children: (t.data ?? []).map((e) => /* @__PURE__ */ _(u, {
							to: `/profiles/${e.key}`,
							"data-testid": `evr-dashboard-profile-${e.key}`,
							children: e.label
						}, e.key))
					})]
				})
			]
		})
	});
}
function Z({ testId: e, label: t, value: n }) {
	return /* @__PURE__ */ v("section", {
		className: "evr-kpi",
		"data-testid": e,
		children: [/* @__PURE__ */ _("span", { children: t }), /* @__PURE__ */ _("strong", { children: n })]
	});
}
//#endregion
//#region resources/js/pages/ProfilesPage.tsx
function oe() {
	let e = q(), t = e.data ?? [];
	return /* @__PURE__ */ _(I, {
		testId: "evr-profiles",
		state: F({
			isLoading: e.isLoading,
			isError: e.isError,
			isEmpty: e.isSuccess && t.length === 0
		}),
		error: e.error,
		empty: "No profiles are exposed by the core API.",
		children: /* @__PURE__ */ v("section", {
			className: "evr-page",
			children: [/* @__PURE__ */ _("div", {
				className: "evr-page__header",
				children: /* @__PURE__ */ v("div", { children: [/* @__PURE__ */ _("h1", { children: "Domain profiles" }), /* @__PURE__ */ _("p", {
					"data-testid": "evr-profiles-readonly-note",
					children: "Profiles are read-only in v1.0 and defined by core package config."
				})] })
			}), /* @__PURE__ */ _("div", {
				className: "evr-card-list",
				"data-testid": "evr-profiles-list",
				children: t.map((e) => /* @__PURE__ */ v(u, {
					className: "evr-card-row",
					to: `/profiles/${e.key}`,
					"data-testid": `evr-profiles-row-${e.key}`,
					children: [/* @__PURE__ */ _("strong", { children: e.label }), /* @__PURE__ */ _("span", { children: e.description })]
				}, e.key))
			})]
		})
	});
}
function se() {
	let { key: e = "" } = g(), t = J(e);
	return /* @__PURE__ */ _(I, {
		testId: "evr-profile-detail",
		state: F({
			isLoading: t.isLoading,
			isError: t.isError
		}),
		error: t.error,
		children: t.data ? /* @__PURE__ */ v("section", {
			className: "evr-page",
			"data-testid": `evr-profile-detail-${t.data.key}`,
			children: [
				/* @__PURE__ */ _("div", {
					className: "evr-page__header",
					children: /* @__PURE__ */ v("div", { children: [/* @__PURE__ */ _("h1", { children: t.data.label }), /* @__PURE__ */ _("p", { children: t.data.description })] })
				}),
				/* @__PURE__ */ v("section", {
					className: "evr-panel",
					children: [/* @__PURE__ */ _("h2", { children: "Enabled checks" }), /* @__PURE__ */ _("div", {
						className: "evr-chip-row",
						children: t.data.enabled_checks.map((e) => /* @__PURE__ */ _("span", {
							className: "evr-chip",
							children: e
						}, e))
					})]
				}),
				/* @__PURE__ */ v("section", {
					className: "evr-panel",
					children: [/* @__PURE__ */ _("h2", { children: "Minimum tier policy" }), /* @__PURE__ */ _("dl", {
						className: "evr-definition-grid",
						children: Object.entries(t.data.min_tier).map(([e, t]) => /* @__PURE__ */ v("div", { children: [/* @__PURE__ */ _("dt", { children: e }), /* @__PURE__ */ _("dd", { children: t })] }, e))
					})]
				})
			]
		}) : null
	});
}
//#endregion
//#region resources/js/pages/ReviewDetailPage.tsx
function ce() {
	let { reviewId: e = "" } = g(), t = K(e), n = t.error instanceof A && t.error.status === 404, r = F({
		isLoading: t.isLoading,
		isError: t.isError && !n
	});
	return n ? /* @__PURE__ */ v("section", {
		className: "evr-page",
		"data-testid": "evr-review-detail-notfound",
		"data-state": "error",
		"aria-busy": "false",
		children: [
			/* @__PURE__ */ _("h1", { children: "Review not found" }),
			/* @__PURE__ */ _("p", { children: "The configured core API did not return this review." }),
			/* @__PURE__ */ _(u, {
				to: "/reviews",
				children: "Back to log"
			})
		]
	}) : /* @__PURE__ */ _(I, {
		testId: "evr-review-detail",
		state: r,
		error: t.error,
		children: t.data ? /* @__PURE__ */ v("section", {
			className: "evr-page",
			children: [
				/* @__PURE__ */ v("div", {
					className: "evr-page__header",
					"data-testid": `evr-review-detail-header-${t.data.review_id}`,
					children: [/* @__PURE__ */ v("div", { children: [/* @__PURE__ */ _("h1", { children: t.data.review_id }), /* @__PURE__ */ _("p", { children: t.data.artifact_id })] }), /* @__PURE__ */ _("strong", {
						className: "evr-risk",
						children: t.data.risk_score
					})]
				}),
				/* @__PURE__ */ v("div", {
					className: "evr-panel-grid",
					children: [/* @__PURE__ */ v("section", {
						className: "evr-panel",
						children: [/* @__PURE__ */ _("h2", { children: "Claim verdicts" }), Object.entries(t.data.claim_verdicts).map(([e, t]) => /* @__PURE__ */ v("div", {
							className: "evr-row",
							"data-testid": `evr-review-detail-claim-${e}`,
							children: [/* @__PURE__ */ _("span", { children: e }), /* @__PURE__ */ _(D, { verdict: t })]
						}, e))]
					}), /* @__PURE__ */ v("section", {
						className: "evr-panel",
						children: [/* @__PURE__ */ _("h2", { children: "Budget" }), /* @__PURE__ */ v("dl", {
							className: "evr-definition-grid",
							children: [
								/* @__PURE__ */ _("dt", { children: "LLM calls" }),
								/* @__PURE__ */ _("dd", { children: t.data.budget.llm_calls }),
								/* @__PURE__ */ _("dt", { children: "Tokens" }),
								/* @__PURE__ */ _("dd", { children: t.data.budget.tokens }),
								/* @__PURE__ */ _("dt", { children: "Heavy checks" }),
								/* @__PURE__ */ _("dd", { children: t.data.budget.heavy_checks })
							]
						})]
					})]
				}),
				/* @__PURE__ */ v("section", {
					className: "evr-panel",
					children: [/* @__PURE__ */ _("h2", { children: "Findings" }), /* @__PURE__ */ _("div", {
						className: "evr-finding-list",
						children: t.data.findings.map((e, t) => /* @__PURE__ */ v("article", {
							className: "evr-finding",
							"data-testid": `evr-review-detail-finding-${t}`,
							children: [
								/* @__PURE__ */ v("div", { children: [
									/* @__PURE__ */ _("strong", { children: e.check_kind }),
									/* @__PURE__ */ _(D, { verdict: e.verdict }),
									/* @__PURE__ */ _(O, { cost: e.cost_class })
								] }),
								/* @__PURE__ */ _("p", { children: e.reason }),
								e.suggested_rewrite ? /* @__PURE__ */ _("blockquote", { children: e.suggested_rewrite }) : null
							]
						}, `${e.check_kind}-${t}`))
					})]
				}),
				/* @__PURE__ */ v("section", {
					className: "evr-panel",
					children: [/* @__PURE__ */ _("h2", { children: "Source tiers" }), /* @__PURE__ */ _("div", {
						className: "evr-tier-list",
						children: Object.entries(t.data.source_tiers).map(([e, t]) => /* @__PURE__ */ v("div", {
							"data-testid": `evr-review-detail-source-${e}`,
							children: [/* @__PURE__ */ _("span", { children: e }), /* @__PURE__ */ _(k, { tier: t })]
						}, e))
					})]
				})
			]
		}) : null
	});
}
//#endregion
//#region resources/js/pages/ReviewsPage.tsx
function le() {
	let [e, t] = c(""), [n, r] = c(""), [i, a] = c(""), o = G({
		profile: e,
		min_verdict: n,
		tenant: i
	}), s = q(), l = o.data?.data ?? [], d = F({
		isLoading: o.isLoading || s.isLoading,
		isError: o.isError || s.isError,
		isEmpty: o.isSuccess && l.length === 0
	});
	return /* @__PURE__ */ v("section", {
		className: "evr-page",
		children: [
			/* @__PURE__ */ _("div", {
				className: "evr-page__header",
				children: /* @__PURE__ */ v("div", { children: [/* @__PURE__ */ _("h1", { children: "Review log" }), /* @__PURE__ */ _("p", { children: "Browse the append-only evidence risk review history." })] })
			}),
			/* @__PURE__ */ v("div", {
				className: "evr-filterbar",
				children: [
					/* @__PURE__ */ v("label", { children: ["Profile", /* @__PURE__ */ v("select", {
						"data-testid": "evr-reviews-filter-profile",
						value: e,
						onChange: (e) => t(e.target.value),
						children: [/* @__PURE__ */ _("option", {
							value: "",
							children: "All profiles"
						}), (s.data ?? []).map((e) => /* @__PURE__ */ _("option", {
							value: e.key,
							children: e.label
						}, e.key))]
					})] }),
					/* @__PURE__ */ v("label", { children: ["Verdict", /* @__PURE__ */ v("select", {
						"data-testid": "evr-reviews-filter-min-verdict",
						value: n,
						onChange: (e) => r(e.target.value),
						children: [
							/* @__PURE__ */ _("option", {
								value: "",
								children: "Any verdict"
							}),
							/* @__PURE__ */ _("option", {
								value: "soften",
								children: "Soften+"
							}),
							/* @__PURE__ */ _("option", {
								value: "flag_for_human_review",
								children: "Human review+"
							}),
							/* @__PURE__ */ _("option", {
								value: "remove",
								children: "Remove"
							})
						]
					})] }),
					/* @__PURE__ */ v("label", { children: ["Tenant", /* @__PURE__ */ _("input", {
						"data-testid": "evr-reviews-filter-tenant",
						value: i,
						onChange: (e) => a(e.target.value)
					})] }),
					/* @__PURE__ */ _("button", {
						className: "evr-button evr-button--ghost",
						type: "button",
						"data-testid": "evr-reviews-filter-reset",
						onClick: () => {
							t(""), r(""), a("");
						},
						children: "Reset"
					})
				]
			}),
			/* @__PURE__ */ _(I, {
				testId: "evr-reviews",
				state: d,
				error: o.error ?? s.error,
				empty: "No review rows match these filters.",
				children: /* @__PURE__ */ v("table", {
					className: "evr-table",
					"data-testid": "evr-reviews-table",
					children: [/* @__PURE__ */ _("thead", { children: /* @__PURE__ */ v("tr", { children: [
						/* @__PURE__ */ _("th", { children: "Review" }),
						/* @__PURE__ */ _("th", { children: "Artifact" }),
						/* @__PURE__ */ _("th", { children: "Profile" }),
						/* @__PURE__ */ _("th", { children: "Verdict" }),
						/* @__PURE__ */ _("th", { children: "Risk" }),
						/* @__PURE__ */ _("th", { children: "Created" })
					] }) }), /* @__PURE__ */ _("tbody", { children: l.map((e) => /* @__PURE__ */ v("tr", { children: [
						/* @__PURE__ */ _("td", { children: /* @__PURE__ */ _(u, {
							to: `/reviews/${e.review_id}`,
							"data-testid": `evr-reviews-row-${e.review_id}`,
							children: e.review_id
						}) }),
						/* @__PURE__ */ _("td", { children: e.artifact_id }),
						/* @__PURE__ */ _("td", { children: e.profile_key }),
						/* @__PURE__ */ _("td", { children: /* @__PURE__ */ _(D, { verdict: e.max_verdict }) }),
						/* @__PURE__ */ _("td", { children: e.risk_score }),
						/* @__PURE__ */ _("td", { children: e.created_at })
					] }, e.review_id)) })]
				})
			})
		]
	});
}
//#endregion
//#region resources/js/pages/SettingsPage.tsx
function ue() {
	let e = x(), [t, n] = c(() => document.documentElement.getAttribute("data-theme") || e.theme_default || "dark"), [r, i] = c("idle"), [a, o] = c("");
	function s() {
		let e = t === "dark" ? "light" : "dark";
		n(e), document.documentElement.setAttribute("data-theme", e), typeof window.localStorage?.setItem == "function" && window.localStorage.setItem("evr-theme", e);
	}
	async function l() {
		i("loading"), o("");
		try {
			let e = await B.taxonomy();
			i("ready"), o(`${e.length} tiers reachable`);
		} catch (e) {
			i("error"), o(e instanceof Error ? e.message : "Connection failed");
		}
	}
	return /* @__PURE__ */ v("section", {
		className: "evr-page",
		"data-testid": "evr-settings",
		"data-state": "ready",
		"aria-busy": "false",
		children: [
			/* @__PURE__ */ v("div", {
				className: "evr-page__header",
				children: [/* @__PURE__ */ v("div", { children: [/* @__PURE__ */ _("h1", { children: "Settings" }), /* @__PURE__ */ _("p", { children: "Client-side configuration resolved from the Laravel Blade shell." })] }), /* @__PURE__ */ v("button", {
					className: "evr-button",
					type: "button",
					"data-testid": "evr-settings-theme",
					onClick: s,
					children: [t === "dark" ? "Light" : "Dark", " theme"]
				})]
			}),
			/* @__PURE__ */ v("section", {
				className: "evr-panel",
				"data-testid": "evr-settings-config",
				children: [/* @__PURE__ */ _("h2", { children: "Resolved config" }), /* @__PURE__ */ v("dl", {
					className: "evr-definition-grid",
					children: [
						/* @__PURE__ */ _("dt", { children: "API base" }),
						/* @__PURE__ */ _("dd", { children: e.api_base }),
						/* @__PURE__ */ _("dt", { children: "Mount prefix" }),
						/* @__PURE__ */ _("dd", { children: e.mount_prefix }),
						/* @__PURE__ */ _("dt", { children: "Asset path" }),
						/* @__PURE__ */ _("dd", { children: e.asset_path })
					]
				})]
			}),
			/* @__PURE__ */ _("section", {
				className: "evr-panel",
				"data-testid": "evr-settings-probe",
				"data-state": r,
				"aria-busy": r === "loading",
				children: /* @__PURE__ */ v("div", {
					className: "evr-page__header",
					children: [/* @__PURE__ */ v("div", { children: [/* @__PURE__ */ _("h2", { children: "Connection probe" }), /* @__PURE__ */ _("p", { children: a || "Calls the taxonomy endpoint on the configured core API." })] }), /* @__PURE__ */ _("button", {
						className: "evr-button evr-button--ghost",
						type: "button",
						onClick: l,
						children: "Test connection"
					})]
				})
			})
		]
	});
}
//#endregion
//#region resources/js/pages/TaxonomyPage.tsx
function de() {
	let e = Y(), t = [...e.data ?? []].sort((e, t) => t.rank - e.rank);
	return /* @__PURE__ */ _(I, {
		testId: "evr-taxonomy",
		state: F({
			isLoading: e.isLoading,
			isError: e.isError,
			isEmpty: e.isSuccess && t.length === 0
		}),
		error: e.error,
		empty: "No evidence tiers are exposed by the core API.",
		children: /* @__PURE__ */ v("section", {
			className: "evr-page",
			children: [/* @__PURE__ */ _("div", {
				className: "evr-page__header",
				children: /* @__PURE__ */ v("div", { children: [/* @__PURE__ */ _("h1", { children: "Evidence-tier taxonomy" }), /* @__PURE__ */ _("p", { children: "Ordered by evidence strength from the configured core taxonomy." })] })
			}), /* @__PURE__ */ v("table", {
				className: "evr-table",
				"data-testid": "evr-taxonomy-table",
				children: [/* @__PURE__ */ _("thead", { children: /* @__PURE__ */ v("tr", { children: [
					/* @__PURE__ */ _("th", { children: "Tier" }),
					/* @__PURE__ */ _("th", { children: "Rank" }),
					/* @__PURE__ */ _("th", { children: "Origin" })
				] }) }), /* @__PURE__ */ _("tbody", { children: t.map((e) => /* @__PURE__ */ v("tr", {
					"data-testid": `evr-taxonomy-row-${e.key}`,
					children: [
						/* @__PURE__ */ _("td", { children: /* @__PURE__ */ _(k, { tier: e }) }),
						/* @__PURE__ */ _("td", { children: e.rank }),
						/* @__PURE__ */ _("td", { children: e.builtin ? "Built in" : "Custom" })
					]
				}, e.key)) })]
			})]
		})
	});
}
//#endregion
//#region resources/js/pages/TryPage.tsx
function Q(e) {
	return {
		id: `claim_${e + 1}`,
		text: "",
		assertiveness: "likely",
		source_ids: ["src_1"]
	};
}
function $(e) {
	return {
		id: `src_${e + 1}`,
		title: "",
		url: "",
		declared_tier: "",
		population: ""
	};
}
function fe() {
	let e = q(), t = ie(), [n, r] = c("What does the evidence support?"), [i, a] = c(""), [o, s] = c("clinical"), [l, d] = c(!0), [f, p] = c(!1), [m, h] = c([Q(0)]), [g, y] = c([$(0)]), b = t.error instanceof j ? t.error : null, x = t.error instanceof A ? t.error : null;
	function S(e, t) {
		h((n) => n.map((n, r) => r === e ? {
			...n,
			...t
		} : n));
	}
	function C(e, t) {
		y((n) => n.map((n, r) => r === e ? {
			...n,
			...t
		} : n));
	}
	function w(e) {
		e.preventDefault(), t.mutate({
			input: {
				question: n,
				answer_text: i,
				profile: o,
				claims: m,
				sources: g,
				label_via_llm: f
			},
			options: { dry_run: l }
		});
	}
	return /* @__PURE__ */ v("section", {
		className: "evr-page",
		"data-testid": "evr-try",
		"data-state": t.isPending ? "loading" : t.data ? "ready" : "idle",
		"aria-busy": t.isPending,
		children: [
			/* @__PURE__ */ _("div", {
				className: "evr-page__header",
				children: /* @__PURE__ */ v("div", { children: [/* @__PURE__ */ _("h1", { children: "Submit for review" }), /* @__PURE__ */ _("p", { children: "Build a review artifact and send it to the core API." })] })
			}),
			x?.status === 503 ? /* @__PURE__ */ _("div", {
				className: "evr-callout evr-callout--error",
				"data-testid": "evr-try-llm-unavailable",
				children: x.message
			}) : null,
			/* @__PURE__ */ v("form", {
				className: "evr-form-grid",
				"data-testid": "evr-try-form",
				onSubmit: w,
				children: [
					/* @__PURE__ */ v("section", {
						className: "evr-panel",
						children: [
							/* @__PURE__ */ _("h2", { children: "Artifact" }),
							/* @__PURE__ */ v("label", { children: ["Question", /* @__PURE__ */ _("input", {
								"data-testid": "evr-try-question",
								value: n,
								onChange: (e) => r(e.target.value)
							})] }),
							/* @__PURE__ */ v("label", { children: ["Answer text", /* @__PURE__ */ _("textarea", {
								"data-testid": "evr-try-answer",
								value: i,
								onChange: (e) => a(e.target.value)
							})] }),
							b?.fieldErrors.answer_text ? /* @__PURE__ */ _("p", {
								className: "evr-field-error",
								"data-testid": "evr-try-answer-error",
								children: b.fieldErrors.answer_text[0]
							}) : null
						]
					}),
					/* @__PURE__ */ v("section", {
						className: "evr-panel",
						children: [
							/* @__PURE__ */ _("h2", { children: "Claims" }),
							m.map((e, t) => /* @__PURE__ */ v("div", {
								className: "evr-repeat-row",
								children: [
									/* @__PURE__ */ v("label", { children: ["Claim", /* @__PURE__ */ _("input", {
										"data-testid": `evr-try-claim-${t}-text`,
										value: e.text,
										onChange: (e) => S(t, { text: e.target.value })
									})] }),
									/* @__PURE__ */ v("label", { children: ["Assertiveness", /* @__PURE__ */ v("select", {
										"data-testid": `evr-try-claim-${t}-assertiveness`,
										value: e.assertiveness,
										onChange: (e) => S(t, { assertiveness: e.target.value }),
										children: [
											/* @__PURE__ */ _("option", {
												value: "definitive",
												children: "Definitive"
											}),
											/* @__PURE__ */ _("option", {
												value: "likely",
												children: "Likely"
											}),
											/* @__PURE__ */ _("option", {
												value: "tentative",
												children: "Tentative"
											})
										]
									})] }),
									/* @__PURE__ */ _("button", {
										className: "evr-button evr-button--ghost",
										type: "button",
										"data-testid": `evr-try-remove-claim-${t}`,
										onClick: () => h((e) => e.filter((e, n) => n !== t)),
										disabled: m.length === 1,
										children: "Remove"
									})
								]
							}, e.id)),
							/* @__PURE__ */ _("button", {
								className: "evr-button evr-button--ghost",
								type: "button",
								"data-testid": "evr-try-add-claim",
								onClick: () => h((e) => [...e, Q(e.length)]),
								children: "Add claim"
							})
						]
					}),
					/* @__PURE__ */ v("section", {
						className: "evr-panel",
						children: [
							/* @__PURE__ */ _("h2", { children: "Sources" }),
							g.map((e, t) => /* @__PURE__ */ v("div", {
								className: "evr-repeat-row",
								children: [
									/* @__PURE__ */ v("label", { children: ["Source id", /* @__PURE__ */ _("input", {
										"data-testid": `evr-try-source-${t}-id`,
										value: e.id,
										onChange: (e) => C(t, { id: e.target.value })
									})] }),
									/* @__PURE__ */ v("label", { children: ["Title", /* @__PURE__ */ _("input", {
										"data-testid": `evr-try-source-${t}-title`,
										value: e.title ?? "",
										onChange: (e) => C(t, { title: e.target.value })
									})] }),
									/* @__PURE__ */ v("label", { children: ["URL", /* @__PURE__ */ _("input", {
										"data-testid": `evr-try-source-${t}-url`,
										value: e.url ?? "",
										onChange: (e) => C(t, { url: e.target.value })
									})] }),
									/* @__PURE__ */ _("button", {
										className: "evr-button evr-button--ghost",
										type: "button",
										"data-testid": `evr-try-remove-source-${t}`,
										onClick: () => y((e) => e.filter((e, n) => n !== t)),
										disabled: g.length === 1,
										children: "Remove"
									})
								]
							}, e.id)),
							/* @__PURE__ */ _("button", {
								className: "evr-button evr-button--ghost",
								type: "button",
								"data-testid": "evr-try-add-source",
								onClick: () => y((e) => [...e, $(e.length)]),
								children: "Add source"
							})
						]
					}),
					/* @__PURE__ */ v("aside", {
						className: "evr-panel",
						children: [
							/* @__PURE__ */ _("h2", { children: "Run config" }),
							/* @__PURE__ */ v("label", { children: ["Profile", /* @__PURE__ */ _("select", {
								"data-testid": "evr-try-profile",
								value: o,
								onChange: (e) => s(e.target.value),
								children: (e.data ?? []).map((e) => /* @__PURE__ */ _("option", {
									value: e.key,
									children: e.label
								}, e.key))
							})] }),
							/* @__PURE__ */ v("label", {
								className: "evr-checkbox",
								children: [/* @__PURE__ */ _("input", {
									"data-testid": "evr-try-dry-run",
									type: "checkbox",
									checked: l,
									onChange: (e) => d(e.target.checked)
								}), "Dry run"]
							}),
							/* @__PURE__ */ v("label", {
								className: "evr-checkbox",
								children: [/* @__PURE__ */ _("input", {
									"data-testid": "evr-try-label-via-llm",
									type: "checkbox",
									checked: f,
									onChange: (e) => p(e.target.checked)
								}), "Label via LLM"]
							}),
							/* @__PURE__ */ _("button", {
								className: "evr-button",
								type: "submit",
								"data-testid": "evr-try-submit",
								disabled: t.isPending,
								children: "Submit"
							})
						]
					})
				]
			}),
			t.data ? /* @__PURE__ */ v("section", {
				className: "evr-panel",
				"data-testid": "evr-try-result",
				children: [/* @__PURE__ */ v("div", {
					className: "evr-page__header",
					children: [/* @__PURE__ */ v("div", { children: [/* @__PURE__ */ _("h2", { children: t.data.review_id }), /* @__PURE__ */ _("p", { children: t.data.artifact_id })] }), /* @__PURE__ */ _(D, { verdict: Object.values(t.data.claim_verdicts)[0] ?? "keep" })]
				}), l ? null : /* @__PURE__ */ _(u, {
					to: `/reviews/${t.data.review_id}`,
					"data-testid": "evr-try-view-log",
					children: "View in log"
				})]
			}) : null
		]
	});
}
//#endregion
//#region resources/js/shell/Shell.tsx
var pe = [
	{
		to: "/",
		label: "Dashboard",
		testId: "evr-nav-dashboard"
	},
	{
		to: "/reviews",
		label: "Reviews",
		testId: "evr-nav-reviews"
	},
	{
		to: "/profiles",
		label: "Profiles",
		testId: "evr-nav-profiles"
	},
	{
		to: "/taxonomy",
		label: "Taxonomy",
		testId: "evr-nav-taxonomy"
	},
	{
		to: "/try",
		label: "Try",
		testId: "evr-nav-try"
	},
	{
		to: "/settings",
		label: "Settings",
		testId: "evr-nav-settings"
	}
];
function me({ embedded: e = !1 }) {
	return e ? /* @__PURE__ */ _(p, {}) : /* @__PURE__ */ v("div", {
		className: "evr-shell",
		"data-testid": "evr-shell",
		children: [/* @__PURE__ */ v("aside", {
			className: "evr-sidebar",
			"aria-label": "Evidence Risk Review navigation",
			children: [/* @__PURE__ */ v("div", {
				className: "evr-brand",
				children: [/* @__PURE__ */ _("strong", { children: "Evidence Risk" }), /* @__PURE__ */ _("span", { children: "Review Admin" })]
			}), /* @__PURE__ */ _("nav", {
				className: "evr-nav",
				children: pe.map((e) => /* @__PURE__ */ _(f, {
					to: e.to,
					end: e.to === "/",
					"data-testid": e.testId,
					children: e.label
				}, e.to))
			})]
		}), /* @__PURE__ */ v("div", {
			className: "evr-main",
			children: [/* @__PURE__ */ _("header", {
				className: "evr-topbar",
				children: /* @__PURE__ */ v("div", { children: [/* @__PURE__ */ _("strong", { children: "Evidence Risk Review" }), /* @__PURE__ */ _("span", { children: "HTTP API operator console" })] })
			}), /* @__PURE__ */ _(p, {})]
		})]
	});
}
//#endregion
//#region resources/js/App.tsx
function he({ children: n, config: r, embedded: i }) {
	let a = s(() => new e({ defaultOptions: { queries: {
		retry: !1,
		staleTime: 3e4
	} } }), []), o = x(r), c = /* @__PURE__ */ _(t, {
		client: a,
		children: /* @__PURE__ */ _(U, {
			config: o,
			children: n
		})
	});
	return i ? /* @__PURE__ */ _(d, { children: c }) : /* @__PURE__ */ _(l, {
		basename: S(o),
		children: c
	});
}
function ge({ config: e, embedded: t = !1 }) {
	let n = x(e);
	return /* @__PURE__ */ _(he, {
		config: n,
		embedded: t,
		children: /* @__PURE__ */ _("div", {
			"data-testid": "evr-app",
			"data-state": "ready",
			"aria-busy": "false",
			"data-api-base": n.api_base,
			children: /* @__PURE__ */ _(h, { children: /* @__PURE__ */ v(m, {
				element: /* @__PURE__ */ _(me, { embedded: t }),
				children: [
					/* @__PURE__ */ _(m, {
						index: !0,
						element: /* @__PURE__ */ _(ae, {})
					}),
					/* @__PURE__ */ _(m, {
						path: "/reviews",
						element: /* @__PURE__ */ _(le, {})
					}),
					/* @__PURE__ */ _(m, {
						path: "/reviews/:reviewId",
						element: /* @__PURE__ */ _(ce, {})
					}),
					/* @__PURE__ */ _(m, {
						path: "/profiles",
						element: /* @__PURE__ */ _(oe, {})
					}),
					/* @__PURE__ */ _(m, {
						path: "/profiles/:key",
						element: /* @__PURE__ */ _(se, {})
					}),
					/* @__PURE__ */ _(m, {
						path: "/taxonomy",
						element: /* @__PURE__ */ _(de, {})
					}),
					/* @__PURE__ */ _(m, {
						path: "/try",
						element: /* @__PURE__ */ _(fe, {})
					}),
					/* @__PURE__ */ _(m, {
						path: "/settings",
						element: /* @__PURE__ */ _(ue, {})
					})
				]
			}) })
		})
	});
}
//#endregion
export { ge as EvidenceRiskReviewAdminApp };
