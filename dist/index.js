import { QueryClient as e, QueryClientProvider as t, useMutation as n, useQuery as r } from "@tanstack/react-query";
import { useMemo as i, useState as a } from "react";
import { BrowserRouter as o, Link as s, MemoryRouter as c, NavLink as l, Outlet as u, Route as d, Routes as f, useParams as p } from "react-router-dom";
import { jsx as m, jsxs as h } from "react/jsx-runtime";
import g from "axios";
//#region resources/js/config.ts
var _ = {
	api_base: "/evidence-risk-review/api",
	mount_prefix: "admin/evidence-risk-review",
	theme_default: "dark",
	asset_path: "vendor/evidence-risk-review-admin"
};
function v(e) {
	let t = {
		..._,
		...typeof window < "u" ? window.__EVIDENCE_RISK_REVIEW_ADMIN__ : void 0,
		...e
	};
	return {
		api_base: b(t.api_base),
		mount_prefix: S(t.mount_prefix),
		theme_default: C(t.theme_default),
		asset_path: x(t.asset_path, _.asset_path)
	};
}
function y(e) {
	let t = S(e.mount_prefix);
	return t === "" ? "/" : `/${t}`;
}
function b(e) {
	let t = (e ?? _.api_base).trim().replace(/\/+$/g, "");
	return t === "" ? _.api_base : t;
}
function x(e, t) {
	let n = (e ?? t).trim().replace(/^\/+|\/+$/g, "");
	return n === "" ? t : n;
}
function S(e) {
	return (e ?? _.mount_prefix).trim().replace(/^\/+|\/+$/g, "");
}
function C(e) {
	return e === "light" ? "light" : "dark";
}
//#endregion
//#region resources/js/components/badges.tsx
var w = {
	keep: "Keep",
	soften: "Soften",
	flag_for_human_review: "Human review",
	remove: "Remove"
};
function T({ verdict: e }) {
	return /* @__PURE__ */ m("span", {
		className: `evr-badge evr-badge--${e}`,
		"data-testid": `evr-verdict-${e}`,
		children: w[e]
	});
}
function E({ cost: e }) {
	return /* @__PURE__ */ m("span", {
		className: "evr-badge evr-badge--muted",
		children: e.replaceAll("_", " ")
	});
}
function D({ tier: e }) {
	return /* @__PURE__ */ h("span", {
		className: "evr-tier-badge",
		children: [/* @__PURE__ */ m("span", { children: e.label }), /* @__PURE__ */ m("strong", { children: e.rank })]
	});
}
//#endregion
//#region resources/js/lib/api/errors.ts
var O = class extends Error {
	status;
	code;
	payload;
	constructor(e, t, n, r) {
		super(e), this.status = t, this.code = n, this.payload = r, this.name = "ApiError";
	}
}, k = class extends O {
	constructor(e, t, n, r) {
		super(n, e, t, r), this.name = "ValidationError";
	}
	get fieldErrors() {
		return this.payload?.errors ?? {};
	}
}, A = class extends O {
	constructor(e, t, n) {
		super(t, e, "feature_disabled", n), this.name = "FeatureDisabledError";
	}
}, j = class extends O {
	constructor(e, t, n) {
		super(t, e, "auth_expired", n), this.name = "AuthExpiredError";
	}
}, ee = class extends O {
	constructor(e = "Network error") {
		super(e, null, "network_error"), this.name = "NetworkError";
	}
};
function M(e) {
	if (!g.isAxiosError(e)) return new O(e instanceof Error ? e.message : "Unexpected error", null, "unexpected_error");
	if (!e.response) return new ee(e.message);
	let t = e.response.status, n = e.response.data ?? {}, r = n.error?.message ?? n.message ?? e.message, i = n.error?.code ?? `http_${t}`;
	return t === 422 ? new k(t, i, r, n) : t === 401 || t === 419 ? new j(t, r, n) : t === 404 || i === "feature_disabled" ? new A(t, r, n) : new O(r, t, i, n);
}
//#endregion
//#region resources/js/lib/data-state.tsx
function N({ state: e, testId: t, children: n }) {
	return /* @__PURE__ */ m("section", {
		"data-testid": t,
		"data-state": e,
		"aria-busy": e === "loading",
		children: n
	});
}
//#endregion
//#region resources/js/components/state.tsx
function P({ isLoading: e, isError: t, isEmpty: n }) {
	return e ? "loading" : t ? "error" : n ? "empty" : "ready";
}
function F({ testId: e, state: t, error: n, empty: r, children: i }) {
	return /* @__PURE__ */ h(N, {
		testId: e,
		state: t,
		children: [
			t === "loading" ? /* @__PURE__ */ m("div", {
				className: "evr-skeleton",
				children: "Loading..."
			}) : null,
			t === "error" ? /* @__PURE__ */ m("div", {
				className: "evr-callout evr-callout--error",
				"data-testid": `${e}-error`,
				children: n instanceof O ? n.message : "Unable to load Evidence Risk Review data."
			}) : null,
			t === "empty" ? /* @__PURE__ */ m("div", {
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
function I(e) {
	return b(v(e).api_base);
}
function L(e) {
	let t = g.create({
		baseURL: I(e),
		withCredentials: !0,
		headers: {
			Accept: "application/json",
			"X-Requested-With": "XMLHttpRequest"
		}
	});
	return t.interceptors.response.use((e) => e, (e) => Promise.reject(M(e))), t;
}
L();
//#endregion
//#region resources/js/lib/api/endpoints.ts
function te(e) {
	return Object.fromEntries(Object.entries(e).filter(([, e]) => e != null && e !== ""));
}
function ne(e = L()) {
	return {
		async listReviews(t = {}) {
			return (await e.get("/reviews", { params: te(t) })).data;
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
var R = ne(), z = {
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
};
function B(e = {}) {
	return r({
		queryKey: z.reviews(e),
		queryFn: () => R.listReviews(e)
	});
}
function V(e) {
	return r({
		queryKey: z.review(e),
		queryFn: () => R.getReview(e),
		enabled: e !== ""
	});
}
function H() {
	return r({
		queryKey: z.profiles(),
		queryFn: () => R.listProfiles()
	});
}
function U(e) {
	return r({
		queryKey: z.profile(e),
		queryFn: () => R.getProfile(e),
		enabled: e !== ""
	});
}
function W() {
	return r({
		queryKey: z.taxonomy(),
		queryFn: () => R.taxonomy()
	});
}
function G() {
	return n({ mutationFn: ({ input: e, options: t = {} }) => R.submitReview(e, t) });
}
//#endregion
//#region resources/js/pages/DashboardPage.tsx
var K = [
	"keep",
	"soften",
	"flag_for_human_review",
	"remove"
];
function q() {
	let e = B({ page: 1 }), t = H(), n = W(), r = e.data?.data ?? [], i = e.isSuccess && r.length === 0, a = P({
		isLoading: e.isLoading || t.isLoading || n.isLoading,
		isError: e.isError || t.isError || n.isError,
		isEmpty: i
	}), o = Object.fromEntries(K.map((e) => [e, 0]));
	r.forEach((e) => {
		o[e.max_verdict] += 1;
	});
	let c = r.length === 0 ? 0 : Math.round(r.reduce((e, t) => e + t.risk_score, 0) / r.length);
	return /* @__PURE__ */ m(F, {
		testId: "evr-dashboard",
		state: a,
		error: e.error ?? t.error ?? n.error,
		empty: "No reviews have been recorded yet.",
		children: /* @__PURE__ */ h("section", {
			className: "evr-page",
			children: [
				/* @__PURE__ */ h("div", {
					className: "evr-page__header",
					children: [/* @__PURE__ */ h("div", { children: [/* @__PURE__ */ m("h1", { children: "Dashboard" }), /* @__PURE__ */ m("p", { children: "Recent review activity from the configured core API." })] }), /* @__PURE__ */ m(s, {
						className: "evr-button",
						to: "/reviews",
						"data-testid": "evr-dashboard-open-reviews",
						children: "Open log"
					})]
				}),
				/* @__PURE__ */ h("div", {
					className: "evr-kpi-grid",
					children: [
						/* @__PURE__ */ m(J, {
							testId: "evr-dashboard-kpi-reviews",
							label: "Last page reviews",
							value: r.length
						}),
						/* @__PURE__ */ m(J, {
							testId: "evr-dashboard-kpi-softened",
							label: "Softened",
							value: o.soften
						}),
						/* @__PURE__ */ m(J, {
							testId: "evr-dashboard-kpi-flagged",
							label: "Flagged",
							value: o.flag_for_human_review
						}),
						/* @__PURE__ */ m(J, {
							testId: "evr-dashboard-kpi-risk",
							label: "Mean risk",
							value: c
						})
					]
				}),
				/* @__PURE__ */ h("div", {
					className: "evr-panel-grid",
					children: [/* @__PURE__ */ h("section", {
						className: "evr-panel",
						"data-testid": "evr-dashboard-verdict-dist",
						children: [/* @__PURE__ */ m("h2", { children: "Verdict distribution" }), /* @__PURE__ */ m("div", {
							className: "evr-stack",
							children: K.map((e) => /* @__PURE__ */ h("div", { children: [/* @__PURE__ */ m(T, { verdict: e }), /* @__PURE__ */ m("strong", { children: o[e] })] }, e))
						})]
					}), /* @__PURE__ */ h("section", {
						className: "evr-panel",
						"data-testid": "evr-dashboard-tier-dist",
						children: [/* @__PURE__ */ m("h2", { children: "Evidence tiers" }), /* @__PURE__ */ m("div", {
							className: "evr-tier-list",
							children: [...n.data ?? []].sort((e, t) => t.rank - e.rank).map((e) => /* @__PURE__ */ m(D, { tier: e }, e.key))
						})]
					})]
				}),
				/* @__PURE__ */ h("section", {
					className: "evr-panel",
					"data-testid": "evr-dashboard-profiles",
					children: [/* @__PURE__ */ m("h2", { children: "Profiles" }), /* @__PURE__ */ m("div", {
						className: "evr-profile-row",
						children: (t.data ?? []).map((e) => /* @__PURE__ */ m(s, {
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
function J({ testId: e, label: t, value: n }) {
	return /* @__PURE__ */ h("section", {
		className: "evr-kpi",
		"data-testid": e,
		children: [/* @__PURE__ */ m("span", { children: t }), /* @__PURE__ */ m("strong", { children: n })]
	});
}
//#endregion
//#region resources/js/pages/ProfilesPage.tsx
function Y() {
	let e = H(), t = e.data ?? [];
	return /* @__PURE__ */ m(F, {
		testId: "evr-profiles",
		state: P({
			isLoading: e.isLoading,
			isError: e.isError,
			isEmpty: e.isSuccess && t.length === 0
		}),
		error: e.error,
		empty: "No profiles are exposed by the core API.",
		children: /* @__PURE__ */ h("section", {
			className: "evr-page",
			children: [/* @__PURE__ */ m("div", {
				className: "evr-page__header",
				children: /* @__PURE__ */ h("div", { children: [/* @__PURE__ */ m("h1", { children: "Domain profiles" }), /* @__PURE__ */ m("p", {
					"data-testid": "evr-profiles-readonly-note",
					children: "Profiles are read-only in v1.0 and defined by core package config."
				})] })
			}), /* @__PURE__ */ m("div", {
				className: "evr-card-list",
				"data-testid": "evr-profiles-list",
				children: t.map((e) => /* @__PURE__ */ h(s, {
					className: "evr-card-row",
					to: `/profiles/${e.key}`,
					"data-testid": `evr-profiles-row-${e.key}`,
					children: [/* @__PURE__ */ m("strong", { children: e.label }), /* @__PURE__ */ m("span", { children: e.description })]
				}, e.key))
			})]
		})
	});
}
function X() {
	let { key: e = "" } = p(), t = U(e);
	return /* @__PURE__ */ m(F, {
		testId: "evr-profile-detail",
		state: P({
			isLoading: t.isLoading,
			isError: t.isError
		}),
		error: t.error,
		children: t.data ? /* @__PURE__ */ h("section", {
			className: "evr-page",
			"data-testid": `evr-profile-detail-${t.data.key}`,
			children: [
				/* @__PURE__ */ m("div", {
					className: "evr-page__header",
					children: /* @__PURE__ */ h("div", { children: [/* @__PURE__ */ m("h1", { children: t.data.label }), /* @__PURE__ */ m("p", { children: t.data.description })] })
				}),
				/* @__PURE__ */ h("section", {
					className: "evr-panel",
					children: [/* @__PURE__ */ m("h2", { children: "Enabled checks" }), /* @__PURE__ */ m("div", {
						className: "evr-chip-row",
						children: t.data.enabled_checks.map((e) => /* @__PURE__ */ m("span", {
							className: "evr-chip",
							children: e
						}, e))
					})]
				}),
				/* @__PURE__ */ h("section", {
					className: "evr-panel",
					children: [/* @__PURE__ */ m("h2", { children: "Minimum tier policy" }), /* @__PURE__ */ m("dl", {
						className: "evr-definition-grid",
						children: Object.entries(t.data.min_tier).map(([e, t]) => /* @__PURE__ */ h("div", { children: [/* @__PURE__ */ m("dt", { children: e }), /* @__PURE__ */ m("dd", { children: t })] }, e))
					})]
				})
			]
		}) : null
	});
}
//#endregion
//#region resources/js/pages/ReviewDetailPage.tsx
function re() {
	let { reviewId: e = "" } = p(), t = V(e), n = t.error instanceof O && t.error.status === 404, r = P({
		isLoading: t.isLoading,
		isError: t.isError && !n
	});
	return n ? /* @__PURE__ */ h("section", {
		className: "evr-page",
		"data-testid": "evr-review-detail-notfound",
		"data-state": "error",
		"aria-busy": "false",
		children: [
			/* @__PURE__ */ m("h1", { children: "Review not found" }),
			/* @__PURE__ */ m("p", { children: "The configured core API did not return this review." }),
			/* @__PURE__ */ m(s, {
				to: "/reviews",
				children: "Back to log"
			})
		]
	}) : /* @__PURE__ */ m(F, {
		testId: "evr-review-detail",
		state: r,
		error: t.error,
		children: t.data ? /* @__PURE__ */ h("section", {
			className: "evr-page",
			children: [
				/* @__PURE__ */ h("div", {
					className: "evr-page__header",
					"data-testid": `evr-review-detail-header-${t.data.review_id}`,
					children: [/* @__PURE__ */ h("div", { children: [/* @__PURE__ */ m("h1", { children: t.data.review_id }), /* @__PURE__ */ m("p", { children: t.data.artifact_id })] }), /* @__PURE__ */ m("strong", {
						className: "evr-risk",
						children: t.data.risk_score
					})]
				}),
				/* @__PURE__ */ h("div", {
					className: "evr-panel-grid",
					children: [/* @__PURE__ */ h("section", {
						className: "evr-panel",
						children: [/* @__PURE__ */ m("h2", { children: "Claim verdicts" }), Object.entries(t.data.claim_verdicts).map(([e, t]) => /* @__PURE__ */ h("div", {
							className: "evr-row",
							"data-testid": `evr-review-detail-claim-${e}`,
							children: [/* @__PURE__ */ m("span", { children: e }), /* @__PURE__ */ m(T, { verdict: t })]
						}, e))]
					}), /* @__PURE__ */ h("section", {
						className: "evr-panel",
						children: [/* @__PURE__ */ m("h2", { children: "Budget" }), /* @__PURE__ */ h("dl", {
							className: "evr-definition-grid",
							children: [
								/* @__PURE__ */ m("dt", { children: "LLM calls" }),
								/* @__PURE__ */ m("dd", { children: t.data.budget.llm_calls }),
								/* @__PURE__ */ m("dt", { children: "Tokens" }),
								/* @__PURE__ */ m("dd", { children: t.data.budget.tokens }),
								/* @__PURE__ */ m("dt", { children: "Heavy checks" }),
								/* @__PURE__ */ m("dd", { children: t.data.budget.heavy_checks })
							]
						})]
					})]
				}),
				/* @__PURE__ */ h("section", {
					className: "evr-panel",
					children: [/* @__PURE__ */ m("h2", { children: "Findings" }), /* @__PURE__ */ m("div", {
						className: "evr-finding-list",
						children: t.data.findings.map((e, t) => /* @__PURE__ */ h("article", {
							className: "evr-finding",
							"data-testid": `evr-review-detail-finding-${t}`,
							children: [
								/* @__PURE__ */ h("div", { children: [
									/* @__PURE__ */ m("strong", { children: e.check_kind }),
									/* @__PURE__ */ m(T, { verdict: e.verdict }),
									/* @__PURE__ */ m(E, { cost: e.cost_class })
								] }),
								/* @__PURE__ */ m("p", { children: e.reason }),
								e.suggested_rewrite ? /* @__PURE__ */ m("blockquote", { children: e.suggested_rewrite }) : null
							]
						}, `${e.check_kind}-${t}`))
					})]
				}),
				/* @__PURE__ */ h("section", {
					className: "evr-panel",
					children: [/* @__PURE__ */ m("h2", { children: "Source tiers" }), /* @__PURE__ */ m("div", {
						className: "evr-tier-list",
						children: Object.entries(t.data.source_tiers).map(([e, t]) => /* @__PURE__ */ h("div", {
							"data-testid": `evr-review-detail-source-${e}`,
							children: [/* @__PURE__ */ m("span", { children: e }), /* @__PURE__ */ m(D, { tier: t })]
						}, e))
					})]
				})
			]
		}) : null
	});
}
//#endregion
//#region resources/js/pages/ReviewsPage.tsx
function ie() {
	let [e, t] = a(""), [n, r] = a(""), [i, o] = a(""), c = B({
		profile: e,
		min_verdict: n,
		tenant: i
	}), l = H(), u = c.data?.data ?? [], d = P({
		isLoading: c.isLoading || l.isLoading,
		isError: c.isError || l.isError,
		isEmpty: c.isSuccess && u.length === 0
	});
	return /* @__PURE__ */ h("section", {
		className: "evr-page",
		children: [
			/* @__PURE__ */ m("div", {
				className: "evr-page__header",
				children: /* @__PURE__ */ h("div", { children: [/* @__PURE__ */ m("h1", { children: "Review log" }), /* @__PURE__ */ m("p", { children: "Browse the append-only evidence risk review history." })] })
			}),
			/* @__PURE__ */ h("div", {
				className: "evr-filterbar",
				children: [
					/* @__PURE__ */ h("label", { children: ["Profile", /* @__PURE__ */ h("select", {
						"data-testid": "evr-reviews-filter-profile",
						value: e,
						onChange: (e) => t(e.target.value),
						children: [/* @__PURE__ */ m("option", {
							value: "",
							children: "All profiles"
						}), (l.data ?? []).map((e) => /* @__PURE__ */ m("option", {
							value: e.key,
							children: e.label
						}, e.key))]
					})] }),
					/* @__PURE__ */ h("label", { children: ["Verdict", /* @__PURE__ */ h("select", {
						"data-testid": "evr-reviews-filter-min-verdict",
						value: n,
						onChange: (e) => r(e.target.value),
						children: [
							/* @__PURE__ */ m("option", {
								value: "",
								children: "Any verdict"
							}),
							/* @__PURE__ */ m("option", {
								value: "soften",
								children: "Soften+"
							}),
							/* @__PURE__ */ m("option", {
								value: "flag_for_human_review",
								children: "Human review+"
							}),
							/* @__PURE__ */ m("option", {
								value: "remove",
								children: "Remove"
							})
						]
					})] }),
					/* @__PURE__ */ h("label", { children: ["Tenant", /* @__PURE__ */ m("input", {
						"data-testid": "evr-reviews-filter-tenant",
						value: i,
						onChange: (e) => o(e.target.value)
					})] }),
					/* @__PURE__ */ m("button", {
						className: "evr-button evr-button--ghost",
						type: "button",
						"data-testid": "evr-reviews-filter-reset",
						onClick: () => {
							t(""), r(""), o("");
						},
						children: "Reset"
					})
				]
			}),
			/* @__PURE__ */ m(F, {
				testId: "evr-reviews",
				state: d,
				error: c.error ?? l.error,
				empty: "No review rows match these filters.",
				children: /* @__PURE__ */ h("table", {
					className: "evr-table",
					"data-testid": "evr-reviews-table",
					children: [/* @__PURE__ */ m("thead", { children: /* @__PURE__ */ h("tr", { children: [
						/* @__PURE__ */ m("th", { children: "Review" }),
						/* @__PURE__ */ m("th", { children: "Artifact" }),
						/* @__PURE__ */ m("th", { children: "Profile" }),
						/* @__PURE__ */ m("th", { children: "Verdict" }),
						/* @__PURE__ */ m("th", { children: "Risk" }),
						/* @__PURE__ */ m("th", { children: "Created" })
					] }) }), /* @__PURE__ */ m("tbody", { children: u.map((e) => /* @__PURE__ */ h("tr", { children: [
						/* @__PURE__ */ m("td", { children: /* @__PURE__ */ m(s, {
							to: `/reviews/${e.review_id}`,
							"data-testid": `evr-reviews-row-${e.review_id}`,
							children: e.review_id
						}) }),
						/* @__PURE__ */ m("td", { children: e.artifact_id }),
						/* @__PURE__ */ m("td", { children: e.profile_key }),
						/* @__PURE__ */ m("td", { children: /* @__PURE__ */ m(T, { verdict: e.max_verdict }) }),
						/* @__PURE__ */ m("td", { children: e.risk_score }),
						/* @__PURE__ */ m("td", { children: e.created_at })
					] }, e.review_id)) })]
				})
			})
		]
	});
}
//#endregion
//#region resources/js/pages/SettingsPage.tsx
function ae() {
	let e = v(), [t, n] = a(() => document.documentElement.getAttribute("data-theme") || e.theme_default || "dark"), [r, i] = a("idle"), [o, s] = a("");
	function c() {
		let e = t === "dark" ? "light" : "dark";
		n(e), document.documentElement.setAttribute("data-theme", e), typeof window.localStorage?.setItem == "function" && window.localStorage.setItem("evr-theme", e);
	}
	async function l() {
		i("loading"), s("");
		try {
			let e = await R.taxonomy();
			i("ready"), s(`${e.length} tiers reachable`);
		} catch (e) {
			i("error"), s(e instanceof Error ? e.message : "Connection failed");
		}
	}
	return /* @__PURE__ */ h("section", {
		className: "evr-page",
		"data-testid": "evr-settings",
		"data-state": "ready",
		"aria-busy": "false",
		children: [
			/* @__PURE__ */ h("div", {
				className: "evr-page__header",
				children: [/* @__PURE__ */ h("div", { children: [/* @__PURE__ */ m("h1", { children: "Settings" }), /* @__PURE__ */ m("p", { children: "Client-side configuration resolved from the Laravel Blade shell." })] }), /* @__PURE__ */ h("button", {
					className: "evr-button",
					type: "button",
					"data-testid": "evr-settings-theme",
					onClick: c,
					children: [t === "dark" ? "Light" : "Dark", " theme"]
				})]
			}),
			/* @__PURE__ */ h("section", {
				className: "evr-panel",
				"data-testid": "evr-settings-config",
				children: [/* @__PURE__ */ m("h2", { children: "Resolved config" }), /* @__PURE__ */ h("dl", {
					className: "evr-definition-grid",
					children: [
						/* @__PURE__ */ m("dt", { children: "API base" }),
						/* @__PURE__ */ m("dd", { children: e.api_base }),
						/* @__PURE__ */ m("dt", { children: "Mount prefix" }),
						/* @__PURE__ */ m("dd", { children: e.mount_prefix }),
						/* @__PURE__ */ m("dt", { children: "Asset path" }),
						/* @__PURE__ */ m("dd", { children: e.asset_path })
					]
				})]
			}),
			/* @__PURE__ */ m("section", {
				className: "evr-panel",
				"data-testid": "evr-settings-probe",
				"data-state": r,
				"aria-busy": r === "loading",
				children: /* @__PURE__ */ h("div", {
					className: "evr-page__header",
					children: [/* @__PURE__ */ h("div", { children: [/* @__PURE__ */ m("h2", { children: "Connection probe" }), /* @__PURE__ */ m("p", { children: o || "Calls the taxonomy endpoint on the configured core API." })] }), /* @__PURE__ */ m("button", {
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
function oe() {
	let e = W(), t = [...e.data ?? []].sort((e, t) => t.rank - e.rank);
	return /* @__PURE__ */ m(F, {
		testId: "evr-taxonomy",
		state: P({
			isLoading: e.isLoading,
			isError: e.isError,
			isEmpty: e.isSuccess && t.length === 0
		}),
		error: e.error,
		empty: "No evidence tiers are exposed by the core API.",
		children: /* @__PURE__ */ h("section", {
			className: "evr-page",
			children: [/* @__PURE__ */ m("div", {
				className: "evr-page__header",
				children: /* @__PURE__ */ h("div", { children: [/* @__PURE__ */ m("h1", { children: "Evidence-tier taxonomy" }), /* @__PURE__ */ m("p", { children: "Ordered by evidence strength from the configured core taxonomy." })] })
			}), /* @__PURE__ */ h("table", {
				className: "evr-table",
				"data-testid": "evr-taxonomy-table",
				children: [/* @__PURE__ */ m("thead", { children: /* @__PURE__ */ h("tr", { children: [
					/* @__PURE__ */ m("th", { children: "Tier" }),
					/* @__PURE__ */ m("th", { children: "Rank" }),
					/* @__PURE__ */ m("th", { children: "Origin" })
				] }) }), /* @__PURE__ */ m("tbody", { children: t.map((e) => /* @__PURE__ */ h("tr", {
					"data-testid": `evr-taxonomy-row-${e.key}`,
					children: [
						/* @__PURE__ */ m("td", { children: /* @__PURE__ */ m(D, { tier: e }) }),
						/* @__PURE__ */ m("td", { children: e.rank }),
						/* @__PURE__ */ m("td", { children: e.builtin ? "Built in" : "Custom" })
					]
				}, e.key)) })]
			})]
		})
	});
}
//#endregion
//#region resources/js/pages/TryPage.tsx
function Z(e) {
	return {
		id: `claim_${e + 1}`,
		text: "",
		assertiveness: "likely",
		source_ids: ["src_1"]
	};
}
function Q(e) {
	return {
		id: `src_${e + 1}`,
		title: "",
		url: "",
		declared_tier: "",
		population: ""
	};
}
function $() {
	let e = H(), t = G(), [n, r] = a("What does the evidence support?"), [i, o] = a(""), [c, l] = a("clinical"), [u, d] = a(!0), [f, p] = a(!1), [g, _] = a([Z(0)]), [v, y] = a([Q(0)]), b = t.error instanceof k ? t.error : null, x = t.error instanceof O ? t.error : null;
	function S(e, t) {
		_((n) => n.map((n, r) => r === e ? {
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
				profile: c,
				claims: g,
				sources: v,
				label_via_llm: f
			},
			options: { dry_run: u }
		});
	}
	return /* @__PURE__ */ h("section", {
		className: "evr-page",
		"data-testid": "evr-try",
		"data-state": t.isPending ? "loading" : t.data ? "ready" : "idle",
		"aria-busy": t.isPending,
		children: [
			/* @__PURE__ */ m("div", {
				className: "evr-page__header",
				children: /* @__PURE__ */ h("div", { children: [/* @__PURE__ */ m("h1", { children: "Submit for review" }), /* @__PURE__ */ m("p", { children: "Build a review artifact and send it to the core API." })] })
			}),
			x?.status === 503 ? /* @__PURE__ */ m("div", {
				className: "evr-callout evr-callout--error",
				"data-testid": "evr-try-llm-unavailable",
				children: x.message
			}) : null,
			/* @__PURE__ */ h("form", {
				className: "evr-form-grid",
				"data-testid": "evr-try-form",
				onSubmit: w,
				children: [
					/* @__PURE__ */ h("section", {
						className: "evr-panel",
						children: [
							/* @__PURE__ */ m("h2", { children: "Artifact" }),
							/* @__PURE__ */ h("label", { children: ["Question", /* @__PURE__ */ m("input", {
								"data-testid": "evr-try-question",
								value: n,
								onChange: (e) => r(e.target.value)
							})] }),
							/* @__PURE__ */ h("label", { children: ["Answer text", /* @__PURE__ */ m("textarea", {
								"data-testid": "evr-try-answer",
								value: i,
								onChange: (e) => o(e.target.value)
							})] }),
							b?.fieldErrors.answer_text ? /* @__PURE__ */ m("p", {
								className: "evr-field-error",
								"data-testid": "evr-try-answer-error",
								children: b.fieldErrors.answer_text[0]
							}) : null
						]
					}),
					/* @__PURE__ */ h("section", {
						className: "evr-panel",
						children: [
							/* @__PURE__ */ m("h2", { children: "Claims" }),
							g.map((e, t) => /* @__PURE__ */ h("div", {
								className: "evr-repeat-row",
								children: [
									/* @__PURE__ */ h("label", { children: ["Claim", /* @__PURE__ */ m("input", {
										"data-testid": `evr-try-claim-${t}-text`,
										value: e.text,
										onChange: (e) => S(t, { text: e.target.value })
									})] }),
									/* @__PURE__ */ h("label", { children: ["Assertiveness", /* @__PURE__ */ h("select", {
										"data-testid": `evr-try-claim-${t}-assertiveness`,
										value: e.assertiveness,
										onChange: (e) => S(t, { assertiveness: e.target.value }),
										children: [
											/* @__PURE__ */ m("option", {
												value: "definitive",
												children: "Definitive"
											}),
											/* @__PURE__ */ m("option", {
												value: "likely",
												children: "Likely"
											}),
											/* @__PURE__ */ m("option", {
												value: "tentative",
												children: "Tentative"
											})
										]
									})] }),
									/* @__PURE__ */ m("button", {
										className: "evr-button evr-button--ghost",
										type: "button",
										"data-testid": `evr-try-remove-claim-${t}`,
										onClick: () => _((e) => e.filter((e, n) => n !== t)),
										disabled: g.length === 1,
										children: "Remove"
									})
								]
							}, e.id)),
							/* @__PURE__ */ m("button", {
								className: "evr-button evr-button--ghost",
								type: "button",
								"data-testid": "evr-try-add-claim",
								onClick: () => _((e) => [...e, Z(e.length)]),
								children: "Add claim"
							})
						]
					}),
					/* @__PURE__ */ h("section", {
						className: "evr-panel",
						children: [
							/* @__PURE__ */ m("h2", { children: "Sources" }),
							v.map((e, t) => /* @__PURE__ */ h("div", {
								className: "evr-repeat-row",
								children: [
									/* @__PURE__ */ h("label", { children: ["Source id", /* @__PURE__ */ m("input", {
										"data-testid": `evr-try-source-${t}-id`,
										value: e.id,
										onChange: (e) => C(t, { id: e.target.value })
									})] }),
									/* @__PURE__ */ h("label", { children: ["Title", /* @__PURE__ */ m("input", {
										"data-testid": `evr-try-source-${t}-title`,
										value: e.title ?? "",
										onChange: (e) => C(t, { title: e.target.value })
									})] }),
									/* @__PURE__ */ h("label", { children: ["URL", /* @__PURE__ */ m("input", {
										"data-testid": `evr-try-source-${t}-url`,
										value: e.url ?? "",
										onChange: (e) => C(t, { url: e.target.value })
									})] }),
									/* @__PURE__ */ m("button", {
										className: "evr-button evr-button--ghost",
										type: "button",
										"data-testid": `evr-try-remove-source-${t}`,
										onClick: () => y((e) => e.filter((e, n) => n !== t)),
										disabled: v.length === 1,
										children: "Remove"
									})
								]
							}, e.id)),
							/* @__PURE__ */ m("button", {
								className: "evr-button evr-button--ghost",
								type: "button",
								"data-testid": "evr-try-add-source",
								onClick: () => y((e) => [...e, Q(e.length)]),
								children: "Add source"
							})
						]
					}),
					/* @__PURE__ */ h("aside", {
						className: "evr-panel",
						children: [
							/* @__PURE__ */ m("h2", { children: "Run config" }),
							/* @__PURE__ */ h("label", { children: ["Profile", /* @__PURE__ */ m("select", {
								"data-testid": "evr-try-profile",
								value: c,
								onChange: (e) => l(e.target.value),
								children: (e.data ?? []).map((e) => /* @__PURE__ */ m("option", {
									value: e.key,
									children: e.label
								}, e.key))
							})] }),
							/* @__PURE__ */ h("label", {
								className: "evr-checkbox",
								children: [/* @__PURE__ */ m("input", {
									"data-testid": "evr-try-dry-run",
									type: "checkbox",
									checked: u,
									onChange: (e) => d(e.target.checked)
								}), "Dry run"]
							}),
							/* @__PURE__ */ h("label", {
								className: "evr-checkbox",
								children: [/* @__PURE__ */ m("input", {
									"data-testid": "evr-try-label-via-llm",
									type: "checkbox",
									checked: f,
									onChange: (e) => p(e.target.checked)
								}), "Label via LLM"]
							}),
							/* @__PURE__ */ m("button", {
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
			t.data ? /* @__PURE__ */ h("section", {
				className: "evr-panel",
				"data-testid": "evr-try-result",
				children: [/* @__PURE__ */ h("div", {
					className: "evr-page__header",
					children: [/* @__PURE__ */ h("div", { children: [/* @__PURE__ */ m("h2", { children: t.data.review_id }), /* @__PURE__ */ m("p", { children: t.data.artifact_id })] }), /* @__PURE__ */ m(T, { verdict: Object.values(t.data.claim_verdicts)[0] ?? "keep" })]
				}), u ? null : /* @__PURE__ */ m(s, {
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
var se = [
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
function ce({ embedded: e = !1 }) {
	return e ? /* @__PURE__ */ m(u, {}) : /* @__PURE__ */ h("div", {
		className: "evr-shell",
		"data-testid": "evr-shell",
		children: [/* @__PURE__ */ h("aside", {
			className: "evr-sidebar",
			"aria-label": "Evidence Risk Review navigation",
			children: [/* @__PURE__ */ h("div", {
				className: "evr-brand",
				children: [/* @__PURE__ */ m("strong", { children: "Evidence Risk" }), /* @__PURE__ */ m("span", { children: "Review Admin" })]
			}), /* @__PURE__ */ m("nav", {
				className: "evr-nav",
				children: se.map((e) => /* @__PURE__ */ m(l, {
					to: e.to,
					end: e.to === "/",
					"data-testid": e.testId,
					children: e.label
				}, e.to))
			})]
		}), /* @__PURE__ */ h("div", {
			className: "evr-main",
			children: [/* @__PURE__ */ m("header", {
				className: "evr-topbar",
				children: /* @__PURE__ */ h("div", { children: [/* @__PURE__ */ m("strong", { children: "Evidence Risk Review" }), /* @__PURE__ */ m("span", { children: "HTTP API operator console" })] })
			}), /* @__PURE__ */ m(u, {})]
		})]
	});
}
//#endregion
//#region resources/js/App.tsx
function le({ children: n, config: r, embedded: a }) {
	let s = i(() => new e({ defaultOptions: { queries: {
		retry: !1,
		staleTime: 3e4
	} } }), []), l = v(r), u = /* @__PURE__ */ m(t, {
		client: s,
		children: n
	});
	return a ? /* @__PURE__ */ m(c, { children: u }) : /* @__PURE__ */ m(o, {
		basename: y(l),
		children: u
	});
}
function ue({ config: e, embedded: t = !1 }) {
	let n = v(e);
	return /* @__PURE__ */ m(le, {
		config: n,
		embedded: t,
		children: /* @__PURE__ */ m("div", {
			"data-testid": "evr-app",
			"data-state": "ready",
			"aria-busy": "false",
			"data-api-base": n.api_base,
			children: /* @__PURE__ */ m(f, { children: /* @__PURE__ */ h(d, {
				element: /* @__PURE__ */ m(ce, { embedded: t }),
				children: [
					/* @__PURE__ */ m(d, {
						index: !0,
						element: /* @__PURE__ */ m(q, {})
					}),
					/* @__PURE__ */ m(d, {
						path: "/reviews",
						element: /* @__PURE__ */ m(ie, {})
					}),
					/* @__PURE__ */ m(d, {
						path: "/reviews/:reviewId",
						element: /* @__PURE__ */ m(re, {})
					}),
					/* @__PURE__ */ m(d, {
						path: "/profiles",
						element: /* @__PURE__ */ m(Y, {})
					}),
					/* @__PURE__ */ m(d, {
						path: "/profiles/:key",
						element: /* @__PURE__ */ m(X, {})
					}),
					/* @__PURE__ */ m(d, {
						path: "/taxonomy",
						element: /* @__PURE__ */ m(oe, {})
					}),
					/* @__PURE__ */ m(d, {
						path: "/try",
						element: /* @__PURE__ */ m($, {})
					}),
					/* @__PURE__ */ m(d, {
						path: "/settings",
						element: /* @__PURE__ */ m(ae, {})
					})
				]
			}) })
		})
	});
}
//#endregion
export { ue as EvidenceRiskReviewAdminApp };
