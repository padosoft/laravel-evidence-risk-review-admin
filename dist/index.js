import { QueryClient as e, QueryClientProvider as t, useMutation as n, useQuery as r } from "@tanstack/react-query";
import { useMemo as i, useState as a } from "react";
import { BrowserRouter as o, Link as s, MemoryRouter as c, NavLink as l, Outlet as u, Route as d, Routes as f, useParams as p } from "react-router-dom";
import m from "axios";
//#region \0rolldown/runtime.js
var h = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), g = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), _ = {
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
		theme_default: ee(t.theme_default),
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
function ee(e) {
	return e === "light" ? "light" : "dark";
}
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.min.js
var te = /* @__PURE__ */ h(((e) => {
	var t = g("react"), n = Symbol.for("react.element"), r = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, a = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = {
		key: !0,
		ref: !0,
		__self: !0,
		__source: !0
	};
	function s(e, t, r) {
		var s, c = {}, l = null, u = null;
		for (s in r !== void 0 && (l = "" + r), t.key !== void 0 && (l = "" + t.key), t.ref !== void 0 && (u = t.ref), t) i.call(t, s) && !o.hasOwnProperty(s) && (c[s] = t[s]);
		if (e && e.defaultProps) for (s in t = e.defaultProps, t) c[s] === void 0 && (c[s] = t[s]);
		return {
			$$typeof: n,
			type: e,
			key: l,
			ref: u,
			props: c,
			_owner: a.current
		};
	}
	e.Fragment = r, e.jsx = s, e.jsxs = s;
})), ne = /* @__PURE__ */ h(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		var t = g("react"), n = Symbol.for("react.element"), r = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), s = Symbol.for("react.provider"), c = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), m = Symbol.for("react.offscreen"), h = Symbol.iterator, _ = "@@iterator";
		function v(e) {
			if (typeof e != "object" || !e) return null;
			var t = h && e[h] || e[_];
			return typeof t == "function" ? t : null;
		}
		var y = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
		function b(e) {
			x("error", e, [...arguments].slice(1));
		}
		function x(e, t, n) {
			var r = y.ReactDebugCurrentFrame.getStackAddendum();
			r !== "" && (t += "%s", n = n.concat([r]));
			var i = n.map(function(e) {
				return String(e);
			});
			i.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, i);
		}
		var S = !1, ee = !1, te = !1, ne = !1, C = !1, re = Symbol.for("react.module.reference");
		function w(e) {
			return !!(typeof e == "string" || typeof e == "function" || e === i || e === o || C || e === a || e === u || e === d || ne || e === m || S || ee || te || typeof e == "object" && e && (e.$$typeof === p || e.$$typeof === f || e.$$typeof === s || e.$$typeof === c || e.$$typeof === l || e.$$typeof === re || e.getModuleId !== void 0));
		}
		function ie(e, t, n) {
			var r = e.displayName;
			if (r) return r;
			var i = t.displayName || t.name || "";
			return i === "" ? n : n + "(" + i + ")";
		}
		function T(e) {
			return e.displayName || "Context";
		}
		function E(e) {
			if (e == null) return null;
			if (typeof e.tag == "number" && b("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function") return e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case i: return "Fragment";
				case r: return "Portal";
				case o: return "Profiler";
				case a: return "StrictMode";
				case u: return "Suspense";
				case d: return "SuspenseList";
			}
			if (typeof e == "object") switch (e.$$typeof) {
				case c: return T(e) + ".Consumer";
				case s: return T(e._context) + ".Provider";
				case l: return ie(e, e.render, "ForwardRef");
				case f:
					var t = e.displayName || null;
					return t === null ? E(e.type) || "Memo" : t;
				case p:
					var n = e, m = n._payload, h = n._init;
					try {
						return E(h(m));
					} catch {
						return null;
					}
			}
			return null;
		}
		var D = Object.assign, O = 0, k, ae, oe, se, A, j, M;
		function N() {}
		N.__reactDisabledLog = !0;
		function ce() {
			if (O === 0) {
				k = console.log, ae = console.info, oe = console.warn, se = console.error, A = console.group, j = console.groupCollapsed, M = console.groupEnd;
				var e = {
					configurable: !0,
					enumerable: !0,
					value: N,
					writable: !0
				};
				Object.defineProperties(console, {
					info: e,
					log: e,
					warn: e,
					error: e,
					group: e,
					groupCollapsed: e,
					groupEnd: e
				});
			}
			O++;
		}
		function le() {
			if (O--, O === 0) {
				var e = {
					configurable: !0,
					enumerable: !0,
					writable: !0
				};
				Object.defineProperties(console, {
					log: D({}, e, { value: k }),
					info: D({}, e, { value: ae }),
					warn: D({}, e, { value: oe }),
					error: D({}, e, { value: se }),
					group: D({}, e, { value: A }),
					groupCollapsed: D({}, e, { value: j }),
					groupEnd: D({}, e, { value: M })
				});
			}
			O < 0 && b("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
		}
		var P = y.ReactCurrentDispatcher, F;
		function I(e, t, n) {
			if (F === void 0) try {
				throw Error();
			} catch (e) {
				var r = e.stack.trim().match(/\n( *(at )?)/);
				F = r && r[1] || "";
			}
			return "\n" + F + e;
		}
		var L = !1, R = new (typeof WeakMap == "function" ? WeakMap : Map)();
		function z(e, t) {
			if (!e || L) return "";
			var n = R.get(e);
			if (n !== void 0) return n;
			var r;
			L = !0;
			var i = Error.prepareStackTrace;
			Error.prepareStackTrace = void 0;
			var a = P.current;
			P.current = null, ce();
			try {
				if (t) {
					var o = function() {
						throw Error();
					};
					if (Object.defineProperty(o.prototype, "props", { set: function() {
						throw Error();
					} }), typeof Reflect == "object" && Reflect.construct) {
						try {
							Reflect.construct(o, []);
						} catch (e) {
							r = e;
						}
						Reflect.construct(e, [], o);
					} else {
						try {
							o.call();
						} catch (e) {
							r = e;
						}
						e.call(o.prototype);
					}
				} else {
					try {
						throw Error();
					} catch (e) {
						r = e;
					}
					e();
				}
			} catch (t) {
				if (t && r && typeof t.stack == "string") {
					for (var s = t.stack.split("\n"), c = r.stack.split("\n"), l = s.length - 1, u = c.length - 1; l >= 1 && u >= 0 && s[l] !== c[u];) u--;
					for (; l >= 1 && u >= 0; l--, u--) if (s[l] !== c[u]) {
						if (l !== 1 || u !== 1) do
							if (l--, u--, u < 0 || s[l] !== c[u]) {
								var d = "\n" + s[l].replace(" at new ", " at ");
								return e.displayName && d.includes("<anonymous>") && (d = d.replace("<anonymous>", e.displayName)), typeof e == "function" && R.set(e, d), d;
							}
						while (l >= 1 && u >= 0);
						break;
					}
				}
			} finally {
				L = !1, P.current = a, le(), Error.prepareStackTrace = i;
			}
			var f = e ? e.displayName || e.name : "", p = f ? I(f) : "";
			return typeof e == "function" && R.set(e, p), p;
		}
		function B(e, t, n) {
			return z(e, !1);
		}
		function ue(e) {
			var t = e.prototype;
			return !!(t && t.isReactComponent);
		}
		function V(e, t, n) {
			if (e == null) return "";
			if (typeof e == "function") return z(e, ue(e));
			if (typeof e == "string") return I(e);
			switch (e) {
				case u: return I("Suspense");
				case d: return I("SuspenseList");
			}
			if (typeof e == "object") switch (e.$$typeof) {
				case l: return B(e.render);
				case f: return V(e.type, t, n);
				case p:
					var r = e, i = r._payload, a = r._init;
					try {
						return V(a(i), t, n);
					} catch {}
			}
			return "";
		}
		var H = Object.prototype.hasOwnProperty, U = {}, W = y.ReactDebugCurrentFrame;
		function G(e) {
			if (e) {
				var t = e._owner, n = V(e.type, e._source, t ? t.type : null);
				W.setExtraStackFrame(n);
			} else W.setExtraStackFrame(null);
		}
		function de(e, t, n, r, i) {
			var a = Function.call.bind(H);
			for (var o in e) if (a(e, o)) {
				var s = void 0;
				try {
					if (typeof e[o] != "function") {
						var c = Error((r || "React class") + ": " + n + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
						throw c.name = "Invariant Violation", c;
					}
					s = e[o](t, o, r, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
				} catch (e) {
					s = e;
				}
				s && !(s instanceof Error) && (G(i), b("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", r || "React class", n, o, typeof s), G(null)), s instanceof Error && !(s.message in U) && (U[s.message] = !0, G(i), b("Failed %s type: %s", n, s.message), G(null));
			}
		}
		var fe = Array.isArray;
		function K(e) {
			return fe(e);
		}
		function pe(e) {
			return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
		}
		function q(e) {
			try {
				return J(e), !1;
			} catch {
				return !0;
			}
		}
		function J(e) {
			return "" + e;
		}
		function Y(e) {
			if (q(e)) return b("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", pe(e)), J(e);
		}
		var X = y.ReactCurrentOwner, me = {
			key: !0,
			ref: !0,
			__self: !0,
			__source: !0
		}, he, Z, ge = {};
		function _e(e) {
			if (H.call(e, "ref")) {
				var t = Object.getOwnPropertyDescriptor(e, "ref").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.ref !== void 0;
		}
		function ve(e) {
			if (H.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function ye(e, t) {
			if (typeof e.ref == "string" && X.current && t && X.current.stateNode !== t) {
				var n = E(X.current.type);
				ge[n] || (b("Component \"%s\" contains the string ref \"%s\". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref", E(X.current.type), e.ref), ge[n] = !0);
			}
		}
		function be(e, t) {
			var n = function() {
				he || (he = !0, b("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
			};
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function xe(e, t) {
			var n = function() {
				Z || (Z = !0, b("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
			};
			n.isReactWarning = !0, Object.defineProperty(e, "ref", {
				get: n,
				configurable: !0
			});
		}
		var Se = function(e, t, r, i, a, o, s) {
			var c = {
				$$typeof: n,
				type: e,
				key: t,
				ref: r,
				props: s,
				_owner: o
			};
			return c._store = {}, Object.defineProperty(c._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: !1
			}), Object.defineProperty(c, "_self", {
				configurable: !1,
				enumerable: !1,
				writable: !1,
				value: i
			}), Object.defineProperty(c, "_source", {
				configurable: !1,
				enumerable: !1,
				writable: !1,
				value: a
			}), Object.freeze && (Object.freeze(c.props), Object.freeze(c)), c;
		};
		function Ce(e, t, n, r, i) {
			var a, o = {}, s = null, c = null;
			for (a in n !== void 0 && (Y(n), s = "" + n), ve(t) && (Y(t.key), s = "" + t.key), _e(t) && (c = t.ref, ye(t, i)), t) H.call(t, a) && !me.hasOwnProperty(a) && (o[a] = t[a]);
			if (e && e.defaultProps) {
				var l = e.defaultProps;
				for (a in l) o[a] === void 0 && (o[a] = l[a]);
			}
			if (s || c) {
				var u = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
				s && be(o, u), c && xe(o, u);
			}
			return Se(e, s, c, i, r, X.current, o);
		}
		var we = y.ReactCurrentOwner, Te = y.ReactDebugCurrentFrame;
		function Q(e) {
			if (e) {
				var t = e._owner, n = V(e.type, e._source, t ? t.type : null);
				Te.setExtraStackFrame(n);
			} else Te.setExtraStackFrame(null);
		}
		var Ee = !1;
		function $(e) {
			return typeof e == "object" && !!e && e.$$typeof === n;
		}
		function De() {
			if (we.current) {
				var e = E(we.current.type);
				if (e) return "\n\nCheck the render method of `" + e + "`.";
			}
			return "";
		}
		function Oe(e) {
			if (e !== void 0) {
				var t = e.fileName.replace(/^.*[\\\/]/, ""), n = e.lineNumber;
				return "\n\nCheck your code at " + t + ":" + n + ".";
			}
			return "";
		}
		var ke = {};
		function Ae(e) {
			var t = De();
			if (!t) {
				var n = typeof e == "string" ? e : e.displayName || e.name;
				n && (t = "\n\nCheck the top-level render call using <" + n + ">.");
			}
			return t;
		}
		function je(e, t) {
			if (!(!e._store || e._store.validated || e.key != null)) {
				e._store.validated = !0;
				var n = Ae(t);
				if (!ke[n]) {
					ke[n] = !0;
					var r = "";
					e && e._owner && e._owner !== we.current && (r = " It was passed a child from " + E(e._owner.type) + "."), Q(e), b("Each child in a list should have a unique \"key\" prop.%s%s See https://reactjs.org/link/warning-keys for more information.", n, r), Q(null);
				}
			}
		}
		function Me(e, t) {
			if (typeof e == "object") {
				if (K(e)) for (var n = 0; n < e.length; n++) {
					var r = e[n];
					$(r) && je(r, t);
				}
				else if ($(e)) e._store && (e._store.validated = !0);
				else if (e) {
					var i = v(e);
					if (typeof i == "function" && i !== e.entries) for (var a = i.call(e), o; !(o = a.next()).done;) $(o.value) && je(o.value, t);
				}
			}
		}
		function Ne(e) {
			var t = e.type;
			if (!(t == null || typeof t == "string")) {
				var n;
				if (typeof t == "function") n = t.propTypes;
				else if (typeof t == "object" && (t.$$typeof === l || t.$$typeof === f)) n = t.propTypes;
				else return;
				if (n) {
					var r = E(t);
					de(n, e.props, "prop", r, e);
				} else t.PropTypes !== void 0 && !Ee && (Ee = !0, b("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", E(t) || "Unknown"));
				typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && b("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
			}
		}
		function Pe(e) {
			for (var t = Object.keys(e.props), n = 0; n < t.length; n++) {
				var r = t[n];
				if (r !== "children" && r !== "key") {
					Q(e), b("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", r), Q(null);
					break;
				}
			}
			e.ref !== null && (Q(e), b("Invalid attribute `ref` supplied to `React.Fragment`."), Q(null));
		}
		var Fe = {};
		function Ie(e, t, r, a, o, s) {
			var c = w(e);
			if (!c) {
				var l = "";
				(e === void 0 || typeof e == "object" && e && Object.keys(e).length === 0) && (l += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
				var u = Oe(o);
				u ? l += u : l += De();
				var d;
				e === null ? d = "null" : K(e) ? d = "array" : e !== void 0 && e.$$typeof === n ? (d = "<" + (E(e.type) || "Unknown") + " />", l = " Did you accidentally export a JSX literal instead of a component?") : d = typeof e, b("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", d, l);
			}
			var f = Ce(e, t, r, o, s);
			if (f == null) return f;
			if (c) {
				var p = t.children;
				if (p !== void 0) if (a) if (K(p)) {
					for (var m = 0; m < p.length; m++) Me(p[m], e);
					Object.freeze && Object.freeze(p);
				} else b("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
				else Me(p, e);
			}
			if (H.call(t, "key")) {
				var h = E(e), g = Object.keys(t).filter(function(e) {
					return e !== "key";
				}), _ = g.length > 0 ? "{key: someKey, " + g.join(": ..., ") + ": ...}" : "{key: someKey}";
				Fe[h + _] || (b("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", _, h, g.length > 0 ? "{" + g.join(": ..., ") + ": ...}" : "{}", h), Fe[h + _] = !0);
			}
			return e === i ? Pe(f) : Ne(f), f;
		}
		function Le(e, t, n) {
			return Ie(e, t, n, !0);
		}
		function Re(e, t, n) {
			return Ie(e, t, n, !1);
		}
		var ze = Re, Be = Le;
		e.Fragment = i, e.jsx = ze, e.jsxs = Be;
	})();
})), C = (/* @__PURE__ */ h(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = te() : t.exports = ne();
})))(), re = {
	keep: "Keep",
	soften: "Soften",
	flag_for_human_review: "Human review",
	remove: "Remove"
};
function w({ verdict: e }) {
	return /* @__PURE__ */ (0, C.jsx)("span", {
		className: `evr-badge evr-badge--${e}`,
		"data-testid": `evr-verdict-${e}`,
		children: re[e]
	});
}
function ie({ cost: e }) {
	return /* @__PURE__ */ (0, C.jsx)("span", {
		className: "evr-badge evr-badge--muted",
		children: e.replaceAll("_", " ")
	});
}
function T({ tier: e }) {
	return /* @__PURE__ */ (0, C.jsxs)("span", {
		className: "evr-tier-badge",
		children: [/* @__PURE__ */ (0, C.jsx)("span", { children: e.label }), /* @__PURE__ */ (0, C.jsx)("strong", { children: e.rank })]
	});
}
//#endregion
//#region resources/js/lib/api/errors.ts
var E = class extends Error {
	status;
	code;
	payload;
	constructor(e, t, n, r) {
		super(e), this.status = t, this.code = n, this.payload = r, this.name = "ApiError";
	}
}, D = class extends E {
	constructor(e, t, n, r) {
		super(n, e, t, r), this.name = "ValidationError";
	}
	get fieldErrors() {
		return this.payload?.errors ?? {};
	}
}, O = class extends E {
	constructor(e, t, n) {
		super(t, e, "feature_disabled", n), this.name = "FeatureDisabledError";
	}
}, k = class extends E {
	constructor(e, t, n) {
		super(t, e, "auth_expired", n), this.name = "AuthExpiredError";
	}
}, ae = class extends E {
	constructor(e = "Network error") {
		super(e, null, "network_error"), this.name = "NetworkError";
	}
};
function oe(e) {
	if (!m.isAxiosError(e)) return new E(e instanceof Error ? e.message : "Unexpected error", null, "unexpected_error");
	if (!e.response) return new ae(e.message);
	let t = e.response.status, n = e.response.data ?? {}, r = n.error?.message ?? n.message ?? e.message, i = n.error?.code ?? `http_${t}`;
	return t === 422 ? new D(t, i, r, n) : t === 401 || t === 419 ? new k(t, r, n) : t === 404 || i === "feature_disabled" ? new O(t, r, n) : new E(r, t, i, n);
}
//#endregion
//#region resources/js/lib/data-state.tsx
function se({ state: e, testId: t, children: n }) {
	return /* @__PURE__ */ (0, C.jsx)("section", {
		"data-testid": t,
		"data-state": e,
		"aria-busy": e === "loading",
		children: n
	});
}
//#endregion
//#region resources/js/components/state.tsx
function A({ isLoading: e, isError: t, isEmpty: n }) {
	return e ? "loading" : t ? "error" : n ? "empty" : "ready";
}
function j({ testId: e, state: t, error: n, empty: r, children: i }) {
	return /* @__PURE__ */ (0, C.jsxs)(se, {
		testId: e,
		state: t,
		children: [
			t === "loading" ? /* @__PURE__ */ (0, C.jsx)("div", {
				className: "evr-skeleton",
				children: "Loading..."
			}) : null,
			t === "error" ? /* @__PURE__ */ (0, C.jsx)("div", {
				className: "evr-callout evr-callout--error",
				"data-testid": `${e}-error`,
				children: n instanceof E ? n.message : "Unable to load Evidence Risk Review data."
			}) : null,
			t === "empty" ? /* @__PURE__ */ (0, C.jsx)("div", {
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
function M(e) {
	return b(v(e).api_base);
}
function N(e) {
	let t = m.create({
		baseURL: M(e),
		withCredentials: !0,
		headers: {
			Accept: "application/json",
			"X-Requested-With": "XMLHttpRequest"
		}
	});
	return t.interceptors.response.use((e) => e, (e) => Promise.reject(oe(e))), t;
}
N();
//#endregion
//#region resources/js/lib/api/endpoints.ts
function ce(e) {
	return Object.fromEntries(Object.entries(e).filter(([, e]) => e != null && e !== ""));
}
function le(e = N()) {
	return {
		async listReviews(t = {}) {
			return (await e.get("/reviews", { params: ce(t) })).data;
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
var P = le(), F = {
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
function I(e = {}) {
	return r({
		queryKey: F.reviews(e),
		queryFn: () => P.listReviews(e)
	});
}
function L(e) {
	return r({
		queryKey: F.review(e),
		queryFn: () => P.getReview(e),
		enabled: e !== ""
	});
}
function R() {
	return r({
		queryKey: F.profiles(),
		queryFn: () => P.listProfiles()
	});
}
function z(e) {
	return r({
		queryKey: F.profile(e),
		queryFn: () => P.getProfile(e),
		enabled: e !== ""
	});
}
function B() {
	return r({
		queryKey: F.taxonomy(),
		queryFn: () => P.taxonomy()
	});
}
function ue() {
	return n({ mutationFn: ({ input: e, options: t = {} }) => P.submitReview(e, t) });
}
//#endregion
//#region resources/js/pages/DashboardPage.tsx
var V = [
	"keep",
	"soften",
	"flag_for_human_review",
	"remove"
];
function H() {
	let e = I({ page: 1 }), t = R(), n = B(), r = e.data?.data ?? [], i = e.isSuccess && r.length === 0, a = A({
		isLoading: e.isLoading || t.isLoading || n.isLoading,
		isError: e.isError || t.isError || n.isError,
		isEmpty: i
	}), o = Object.fromEntries(V.map((e) => [e, 0]));
	r.forEach((e) => {
		o[e.max_verdict] += 1;
	});
	let c = r.length === 0 ? 0 : Math.round(r.reduce((e, t) => e + t.risk_score, 0) / r.length);
	return /* @__PURE__ */ (0, C.jsx)(j, {
		testId: "evr-dashboard",
		state: a,
		error: e.error ?? t.error ?? n.error,
		empty: "No reviews have been recorded yet.",
		children: /* @__PURE__ */ (0, C.jsxs)("section", {
			className: "evr-page",
			children: [
				/* @__PURE__ */ (0, C.jsxs)("div", {
					className: "evr-page__header",
					children: [/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("h1", { children: "Dashboard" }), /* @__PURE__ */ (0, C.jsx)("p", { children: "Recent review activity from the configured core API." })] }), /* @__PURE__ */ (0, C.jsx)(s, {
						className: "evr-button",
						to: "/reviews",
						"data-testid": "evr-dashboard-open-reviews",
						children: "Open log"
					})]
				}),
				/* @__PURE__ */ (0, C.jsxs)("div", {
					className: "evr-kpi-grid",
					children: [
						/* @__PURE__ */ (0, C.jsx)(U, {
							testId: "evr-dashboard-kpi-reviews",
							label: "Last page reviews",
							value: r.length
						}),
						/* @__PURE__ */ (0, C.jsx)(U, {
							testId: "evr-dashboard-kpi-softened",
							label: "Softened",
							value: o.soften
						}),
						/* @__PURE__ */ (0, C.jsx)(U, {
							testId: "evr-dashboard-kpi-flagged",
							label: "Flagged",
							value: o.flag_for_human_review
						}),
						/* @__PURE__ */ (0, C.jsx)(U, {
							testId: "evr-dashboard-kpi-risk",
							label: "Mean risk",
							value: c
						})
					]
				}),
				/* @__PURE__ */ (0, C.jsxs)("div", {
					className: "evr-panel-grid",
					children: [/* @__PURE__ */ (0, C.jsxs)("section", {
						className: "evr-panel",
						"data-testid": "evr-dashboard-verdict-dist",
						children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: "Verdict distribution" }), /* @__PURE__ */ (0, C.jsx)("div", {
							className: "evr-stack",
							children: V.map((e) => /* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)(w, { verdict: e }), /* @__PURE__ */ (0, C.jsx)("strong", { children: o[e] })] }, e))
						})]
					}), /* @__PURE__ */ (0, C.jsxs)("section", {
						className: "evr-panel",
						"data-testid": "evr-dashboard-tier-dist",
						children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: "Evidence tiers" }), /* @__PURE__ */ (0, C.jsx)("div", {
							className: "evr-tier-list",
							children: [...n.data ?? []].sort((e, t) => t.rank - e.rank).map((e) => /* @__PURE__ */ (0, C.jsx)(T, { tier: e }, e.key))
						})]
					})]
				}),
				/* @__PURE__ */ (0, C.jsxs)("section", {
					className: "evr-panel",
					"data-testid": "evr-dashboard-profiles",
					children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: "Profiles" }), /* @__PURE__ */ (0, C.jsx)("div", {
						className: "evr-profile-row",
						children: (t.data ?? []).map((e) => /* @__PURE__ */ (0, C.jsx)(s, {
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
function U({ testId: e, label: t, value: n }) {
	return /* @__PURE__ */ (0, C.jsxs)("section", {
		className: "evr-kpi",
		"data-testid": e,
		children: [/* @__PURE__ */ (0, C.jsx)("span", { children: t }), /* @__PURE__ */ (0, C.jsx)("strong", { children: n })]
	});
}
//#endregion
//#region resources/js/pages/ProfilesPage.tsx
function W() {
	let e = R(), t = e.data ?? [];
	return /* @__PURE__ */ (0, C.jsx)(j, {
		testId: "evr-profiles",
		state: A({
			isLoading: e.isLoading,
			isError: e.isError,
			isEmpty: e.isSuccess && t.length === 0
		}),
		error: e.error,
		empty: "No profiles are exposed by the core API.",
		children: /* @__PURE__ */ (0, C.jsxs)("section", {
			className: "evr-page",
			children: [/* @__PURE__ */ (0, C.jsx)("div", {
				className: "evr-page__header",
				children: /* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("h1", { children: "Domain profiles" }), /* @__PURE__ */ (0, C.jsx)("p", {
					"data-testid": "evr-profiles-readonly-note",
					children: "Profiles are read-only in v1.0 and defined by core package config."
				})] })
			}), /* @__PURE__ */ (0, C.jsx)("div", {
				className: "evr-card-list",
				"data-testid": "evr-profiles-list",
				children: t.map((e) => /* @__PURE__ */ (0, C.jsxs)(s, {
					className: "evr-card-row",
					to: `/profiles/${e.key}`,
					"data-testid": `evr-profiles-row-${e.key}`,
					children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: e.label }), /* @__PURE__ */ (0, C.jsx)("span", { children: e.description })]
				}, e.key))
			})]
		})
	});
}
function G() {
	let { key: e = "" } = p(), t = z(e);
	return /* @__PURE__ */ (0, C.jsx)(j, {
		testId: "evr-profile-detail",
		state: A({
			isLoading: t.isLoading,
			isError: t.isError
		}),
		error: t.error,
		children: t.data ? /* @__PURE__ */ (0, C.jsxs)("section", {
			className: "evr-page",
			"data-testid": `evr-profile-detail-${t.data.key}`,
			children: [
				/* @__PURE__ */ (0, C.jsx)("div", {
					className: "evr-page__header",
					children: /* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("h1", { children: t.data.label }), /* @__PURE__ */ (0, C.jsx)("p", { children: t.data.description })] })
				}),
				/* @__PURE__ */ (0, C.jsxs)("section", {
					className: "evr-panel",
					children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: "Enabled checks" }), /* @__PURE__ */ (0, C.jsx)("div", {
						className: "evr-chip-row",
						children: t.data.enabled_checks.map((e) => /* @__PURE__ */ (0, C.jsx)("span", {
							className: "evr-chip",
							children: e
						}, e))
					})]
				}),
				/* @__PURE__ */ (0, C.jsxs)("section", {
					className: "evr-panel",
					children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: "Minimum tier policy" }), /* @__PURE__ */ (0, C.jsx)("dl", {
						className: "evr-definition-grid",
						children: Object.entries(t.data.min_tier).map(([e, t]) => /* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("dt", { children: e }), /* @__PURE__ */ (0, C.jsx)("dd", { children: t })] }, e))
					})]
				})
			]
		}) : null
	});
}
//#endregion
//#region resources/js/pages/ReviewDetailPage.tsx
function de() {
	let { reviewId: e = "" } = p(), t = L(e), n = t.error instanceof E && t.error.status === 404, r = A({
		isLoading: t.isLoading,
		isError: t.isError && !n
	});
	return n ? /* @__PURE__ */ (0, C.jsxs)("section", {
		className: "evr-page",
		"data-testid": "evr-review-detail-notfound",
		"data-state": "error",
		"aria-busy": "false",
		children: [
			/* @__PURE__ */ (0, C.jsx)("h1", { children: "Review not found" }),
			/* @__PURE__ */ (0, C.jsx)("p", { children: "The configured core API did not return this review." }),
			/* @__PURE__ */ (0, C.jsx)(s, {
				to: "/reviews",
				children: "Back to log"
			})
		]
	}) : /* @__PURE__ */ (0, C.jsx)(j, {
		testId: "evr-review-detail",
		state: r,
		error: t.error,
		children: t.data ? /* @__PURE__ */ (0, C.jsxs)("section", {
			className: "evr-page",
			children: [
				/* @__PURE__ */ (0, C.jsxs)("div", {
					className: "evr-page__header",
					"data-testid": `evr-review-detail-header-${t.data.review_id}`,
					children: [/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("h1", { children: t.data.review_id }), /* @__PURE__ */ (0, C.jsx)("p", { children: t.data.artifact_id })] }), /* @__PURE__ */ (0, C.jsx)("strong", {
						className: "evr-risk",
						children: t.data.risk_score
					})]
				}),
				/* @__PURE__ */ (0, C.jsxs)("div", {
					className: "evr-panel-grid",
					children: [/* @__PURE__ */ (0, C.jsxs)("section", {
						className: "evr-panel",
						children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: "Claim verdicts" }), Object.entries(t.data.claim_verdicts).map(([e, t]) => /* @__PURE__ */ (0, C.jsxs)("div", {
							className: "evr-row",
							"data-testid": `evr-review-detail-claim-${e}`,
							children: [/* @__PURE__ */ (0, C.jsx)("span", { children: e }), /* @__PURE__ */ (0, C.jsx)(w, { verdict: t })]
						}, e))]
					}), /* @__PURE__ */ (0, C.jsxs)("section", {
						className: "evr-panel",
						children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: "Budget" }), /* @__PURE__ */ (0, C.jsxs)("dl", {
							className: "evr-definition-grid",
							children: [
								/* @__PURE__ */ (0, C.jsx)("dt", { children: "LLM calls" }),
								/* @__PURE__ */ (0, C.jsx)("dd", { children: t.data.budget.llm_calls }),
								/* @__PURE__ */ (0, C.jsx)("dt", { children: "Tokens" }),
								/* @__PURE__ */ (0, C.jsx)("dd", { children: t.data.budget.tokens }),
								/* @__PURE__ */ (0, C.jsx)("dt", { children: "Heavy checks" }),
								/* @__PURE__ */ (0, C.jsx)("dd", { children: t.data.budget.heavy_checks })
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, C.jsxs)("section", {
					className: "evr-panel",
					children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: "Findings" }), /* @__PURE__ */ (0, C.jsx)("div", {
						className: "evr-finding-list",
						children: t.data.findings.map((e, t) => /* @__PURE__ */ (0, C.jsxs)("article", {
							className: "evr-finding",
							"data-testid": `evr-review-detail-finding-${t}`,
							children: [
								/* @__PURE__ */ (0, C.jsxs)("div", { children: [
									/* @__PURE__ */ (0, C.jsx)("strong", { children: e.check_kind }),
									/* @__PURE__ */ (0, C.jsx)(w, { verdict: e.verdict }),
									/* @__PURE__ */ (0, C.jsx)(ie, { cost: e.cost_class })
								] }),
								/* @__PURE__ */ (0, C.jsx)("p", { children: e.reason }),
								e.suggested_rewrite ? /* @__PURE__ */ (0, C.jsx)("blockquote", { children: e.suggested_rewrite }) : null
							]
						}, `${e.check_kind}-${t}`))
					})]
				}),
				/* @__PURE__ */ (0, C.jsxs)("section", {
					className: "evr-panel",
					children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: "Source tiers" }), /* @__PURE__ */ (0, C.jsx)("div", {
						className: "evr-tier-list",
						children: Object.entries(t.data.source_tiers).map(([e, t]) => /* @__PURE__ */ (0, C.jsxs)("div", {
							"data-testid": `evr-review-detail-source-${e}`,
							children: [/* @__PURE__ */ (0, C.jsx)("span", { children: e }), /* @__PURE__ */ (0, C.jsx)(T, { tier: t })]
						}, e))
					})]
				})
			]
		}) : null
	});
}
//#endregion
//#region resources/js/pages/ReviewsPage.tsx
function fe() {
	let [e, t] = a(""), [n, r] = a(""), [i, o] = a(""), c = I({
		profile: e,
		min_verdict: n,
		tenant: i
	}), l = R(), u = c.data?.data ?? [], d = A({
		isLoading: c.isLoading || l.isLoading,
		isError: c.isError || l.isError,
		isEmpty: c.isSuccess && u.length === 0
	});
	return /* @__PURE__ */ (0, C.jsxs)("section", {
		className: "evr-page",
		children: [
			/* @__PURE__ */ (0, C.jsx)("div", {
				className: "evr-page__header",
				children: /* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("h1", { children: "Review log" }), /* @__PURE__ */ (0, C.jsx)("p", { children: "Browse the append-only evidence risk review history." })] })
			}),
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "evr-filterbar",
				children: [
					/* @__PURE__ */ (0, C.jsxs)("label", { children: ["Profile", /* @__PURE__ */ (0, C.jsxs)("select", {
						"data-testid": "evr-reviews-filter-profile",
						value: e,
						onChange: (e) => t(e.target.value),
						children: [/* @__PURE__ */ (0, C.jsx)("option", {
							value: "",
							children: "All profiles"
						}), (l.data ?? []).map((e) => /* @__PURE__ */ (0, C.jsx)("option", {
							value: e.key,
							children: e.label
						}, e.key))]
					})] }),
					/* @__PURE__ */ (0, C.jsxs)("label", { children: ["Verdict", /* @__PURE__ */ (0, C.jsxs)("select", {
						"data-testid": "evr-reviews-filter-min-verdict",
						value: n,
						onChange: (e) => r(e.target.value),
						children: [
							/* @__PURE__ */ (0, C.jsx)("option", {
								value: "",
								children: "Any verdict"
							}),
							/* @__PURE__ */ (0, C.jsx)("option", {
								value: "soften",
								children: "Soften+"
							}),
							/* @__PURE__ */ (0, C.jsx)("option", {
								value: "flag_for_human_review",
								children: "Human review+"
							}),
							/* @__PURE__ */ (0, C.jsx)("option", {
								value: "remove",
								children: "Remove"
							})
						]
					})] }),
					/* @__PURE__ */ (0, C.jsxs)("label", { children: ["Tenant", /* @__PURE__ */ (0, C.jsx)("input", {
						"data-testid": "evr-reviews-filter-tenant",
						value: i,
						onChange: (e) => o(e.target.value)
					})] }),
					/* @__PURE__ */ (0, C.jsx)("button", {
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
			/* @__PURE__ */ (0, C.jsx)(j, {
				testId: "evr-reviews",
				state: d,
				error: c.error ?? l.error,
				empty: "No review rows match these filters.",
				children: /* @__PURE__ */ (0, C.jsxs)("table", {
					className: "evr-table",
					"data-testid": "evr-reviews-table",
					children: [/* @__PURE__ */ (0, C.jsx)("thead", { children: /* @__PURE__ */ (0, C.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, C.jsx)("th", { children: "Review" }),
						/* @__PURE__ */ (0, C.jsx)("th", { children: "Artifact" }),
						/* @__PURE__ */ (0, C.jsx)("th", { children: "Profile" }),
						/* @__PURE__ */ (0, C.jsx)("th", { children: "Verdict" }),
						/* @__PURE__ */ (0, C.jsx)("th", { children: "Risk" }),
						/* @__PURE__ */ (0, C.jsx)("th", { children: "Created" })
					] }) }), /* @__PURE__ */ (0, C.jsx)("tbody", { children: u.map((e) => /* @__PURE__ */ (0, C.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, C.jsx)("td", { children: /* @__PURE__ */ (0, C.jsx)(s, {
							to: `/reviews/${e.review_id}`,
							"data-testid": `evr-reviews-row-${e.review_id}`,
							children: e.review_id
						}) }),
						/* @__PURE__ */ (0, C.jsx)("td", { children: e.artifact_id }),
						/* @__PURE__ */ (0, C.jsx)("td", { children: e.profile_key }),
						/* @__PURE__ */ (0, C.jsx)("td", { children: /* @__PURE__ */ (0, C.jsx)(w, { verdict: e.max_verdict }) }),
						/* @__PURE__ */ (0, C.jsx)("td", { children: e.risk_score }),
						/* @__PURE__ */ (0, C.jsx)("td", { children: e.created_at })
					] }, e.review_id)) })]
				})
			})
		]
	});
}
//#endregion
//#region resources/js/pages/SettingsPage.tsx
function K() {
	let e = v(), [t, n] = a(() => document.documentElement.getAttribute("data-theme") || e.theme_default || "dark"), [r, i] = a("idle"), [o, s] = a("");
	function c() {
		let e = t === "dark" ? "light" : "dark";
		n(e), document.documentElement.setAttribute("data-theme", e), typeof window.localStorage?.setItem == "function" && window.localStorage.setItem("evr-theme", e);
	}
	async function l() {
		i("loading"), s("");
		try {
			let e = await P.taxonomy();
			i("ready"), s(`${e.length} tiers reachable`);
		} catch (e) {
			i("error"), s(e instanceof Error ? e.message : "Connection failed");
		}
	}
	return /* @__PURE__ */ (0, C.jsxs)("section", {
		className: "evr-page",
		"data-testid": "evr-settings",
		"data-state": "ready",
		"aria-busy": "false",
		children: [
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "evr-page__header",
				children: [/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("h1", { children: "Settings" }), /* @__PURE__ */ (0, C.jsx)("p", { children: "Client-side configuration resolved from the Laravel Blade shell." })] }), /* @__PURE__ */ (0, C.jsxs)("button", {
					className: "evr-button",
					type: "button",
					"data-testid": "evr-settings-theme",
					onClick: c,
					children: [t === "dark" ? "Light" : "Dark", " theme"]
				})]
			}),
			/* @__PURE__ */ (0, C.jsxs)("section", {
				className: "evr-panel",
				"data-testid": "evr-settings-config",
				children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: "Resolved config" }), /* @__PURE__ */ (0, C.jsxs)("dl", {
					className: "evr-definition-grid",
					children: [
						/* @__PURE__ */ (0, C.jsx)("dt", { children: "API base" }),
						/* @__PURE__ */ (0, C.jsx)("dd", { children: e.api_base }),
						/* @__PURE__ */ (0, C.jsx)("dt", { children: "Mount prefix" }),
						/* @__PURE__ */ (0, C.jsx)("dd", { children: e.mount_prefix }),
						/* @__PURE__ */ (0, C.jsx)("dt", { children: "Asset path" }),
						/* @__PURE__ */ (0, C.jsx)("dd", { children: e.asset_path })
					]
				})]
			}),
			/* @__PURE__ */ (0, C.jsx)("section", {
				className: "evr-panel",
				"data-testid": "evr-settings-probe",
				"data-state": r,
				"aria-busy": r === "loading",
				children: /* @__PURE__ */ (0, C.jsxs)("div", {
					className: "evr-page__header",
					children: [/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: "Connection probe" }), /* @__PURE__ */ (0, C.jsx)("p", { children: o || "Calls the taxonomy endpoint on the configured core API." })] }), /* @__PURE__ */ (0, C.jsx)("button", {
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
function pe() {
	let e = B(), t = [...e.data ?? []].sort((e, t) => t.rank - e.rank);
	return /* @__PURE__ */ (0, C.jsx)(j, {
		testId: "evr-taxonomy",
		state: A({
			isLoading: e.isLoading,
			isError: e.isError,
			isEmpty: e.isSuccess && t.length === 0
		}),
		error: e.error,
		empty: "No evidence tiers are exposed by the core API.",
		children: /* @__PURE__ */ (0, C.jsxs)("section", {
			className: "evr-page",
			children: [/* @__PURE__ */ (0, C.jsx)("div", {
				className: "evr-page__header",
				children: /* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("h1", { children: "Evidence-tier taxonomy" }), /* @__PURE__ */ (0, C.jsx)("p", { children: "Ordered by evidence strength from the configured core taxonomy." })] })
			}), /* @__PURE__ */ (0, C.jsxs)("table", {
				className: "evr-table",
				"data-testid": "evr-taxonomy-table",
				children: [/* @__PURE__ */ (0, C.jsx)("thead", { children: /* @__PURE__ */ (0, C.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, C.jsx)("th", { children: "Tier" }),
					/* @__PURE__ */ (0, C.jsx)("th", { children: "Rank" }),
					/* @__PURE__ */ (0, C.jsx)("th", { children: "Origin" })
				] }) }), /* @__PURE__ */ (0, C.jsx)("tbody", { children: t.map((e) => /* @__PURE__ */ (0, C.jsxs)("tr", {
					"data-testid": `evr-taxonomy-row-${e.key}`,
					children: [
						/* @__PURE__ */ (0, C.jsx)("td", { children: /* @__PURE__ */ (0, C.jsx)(T, { tier: e }) }),
						/* @__PURE__ */ (0, C.jsx)("td", { children: e.rank }),
						/* @__PURE__ */ (0, C.jsx)("td", { children: e.builtin ? "Built in" : "Custom" })
					]
				}, e.key)) })]
			})]
		})
	});
}
//#endregion
//#region resources/js/pages/TryPage.tsx
function q(e) {
	return {
		id: `claim_${e + 1}`,
		text: "",
		assertiveness: "likely",
		source_ids: ["src_1"]
	};
}
function J(e) {
	return {
		id: `src_${e + 1}`,
		title: "",
		url: "",
		declared_tier: "",
		population: ""
	};
}
function Y() {
	let e = R(), t = ue(), [n, r] = a("What does the evidence support?"), [i, o] = a(""), [c, l] = a("clinical"), [u, d] = a(!0), [f, p] = a(!1), [m, h] = a([q(0)]), [g, _] = a([J(0)]), v = t.error instanceof D ? t.error : null, y = t.error instanceof E ? t.error : null;
	function b(e, t) {
		h((n) => n.map((n, r) => r === e ? {
			...n,
			...t
		} : n));
	}
	function x(e, t) {
		_((n) => n.map((n, r) => r === e ? {
			...n,
			...t
		} : n));
	}
	function S(e) {
		e.preventDefault(), t.mutate({
			input: {
				question: n,
				answer_text: i,
				profile: c,
				claims: m,
				sources: g,
				label_via_llm: f
			},
			options: { dry_run: u }
		});
	}
	return /* @__PURE__ */ (0, C.jsxs)("section", {
		className: "evr-page",
		"data-testid": "evr-try",
		"data-state": t.isPending ? "loading" : t.data ? "ready" : "idle",
		"aria-busy": t.isPending,
		children: [
			/* @__PURE__ */ (0, C.jsx)("div", {
				className: "evr-page__header",
				children: /* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("h1", { children: "Submit for review" }), /* @__PURE__ */ (0, C.jsx)("p", { children: "Build a review artifact and send it to the core API." })] })
			}),
			y?.status === 503 ? /* @__PURE__ */ (0, C.jsx)("div", {
				className: "evr-callout evr-callout--error",
				"data-testid": "evr-try-llm-unavailable",
				children: y.message
			}) : null,
			/* @__PURE__ */ (0, C.jsxs)("form", {
				className: "evr-form-grid",
				"data-testid": "evr-try-form",
				onSubmit: S,
				children: [
					/* @__PURE__ */ (0, C.jsxs)("section", {
						className: "evr-panel",
						children: [
							/* @__PURE__ */ (0, C.jsx)("h2", { children: "Artifact" }),
							/* @__PURE__ */ (0, C.jsxs)("label", { children: ["Question", /* @__PURE__ */ (0, C.jsx)("input", {
								"data-testid": "evr-try-question",
								value: n,
								onChange: (e) => r(e.target.value)
							})] }),
							/* @__PURE__ */ (0, C.jsxs)("label", { children: ["Answer text", /* @__PURE__ */ (0, C.jsx)("textarea", {
								"data-testid": "evr-try-answer",
								value: i,
								onChange: (e) => o(e.target.value)
							})] }),
							v?.fieldErrors.answer_text ? /* @__PURE__ */ (0, C.jsx)("p", {
								className: "evr-field-error",
								"data-testid": "evr-try-answer-error",
								children: v.fieldErrors.answer_text[0]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, C.jsxs)("section", {
						className: "evr-panel",
						children: [
							/* @__PURE__ */ (0, C.jsx)("h2", { children: "Claims" }),
							m.map((e, t) => /* @__PURE__ */ (0, C.jsxs)("div", {
								className: "evr-repeat-row",
								children: [
									/* @__PURE__ */ (0, C.jsxs)("label", { children: ["Claim", /* @__PURE__ */ (0, C.jsx)("input", {
										"data-testid": `evr-try-claim-${t}-text`,
										value: e.text,
										onChange: (e) => b(t, { text: e.target.value })
									})] }),
									/* @__PURE__ */ (0, C.jsxs)("label", { children: ["Assertiveness", /* @__PURE__ */ (0, C.jsxs)("select", {
										"data-testid": `evr-try-claim-${t}-assertiveness`,
										value: e.assertiveness,
										onChange: (e) => b(t, { assertiveness: e.target.value }),
										children: [
											/* @__PURE__ */ (0, C.jsx)("option", {
												value: "definitive",
												children: "Definitive"
											}),
											/* @__PURE__ */ (0, C.jsx)("option", {
												value: "likely",
												children: "Likely"
											}),
											/* @__PURE__ */ (0, C.jsx)("option", {
												value: "tentative",
												children: "Tentative"
											})
										]
									})] }),
									/* @__PURE__ */ (0, C.jsx)("button", {
										className: "evr-button evr-button--ghost",
										type: "button",
										"data-testid": `evr-try-remove-claim-${t}`,
										onClick: () => h((e) => e.filter((e, n) => n !== t)),
										disabled: m.length === 1,
										children: "Remove"
									})
								]
							}, e.id)),
							/* @__PURE__ */ (0, C.jsx)("button", {
								className: "evr-button evr-button--ghost",
								type: "button",
								"data-testid": "evr-try-add-claim",
								onClick: () => h((e) => [...e, q(e.length)]),
								children: "Add claim"
							})
						]
					}),
					/* @__PURE__ */ (0, C.jsxs)("section", {
						className: "evr-panel",
						children: [
							/* @__PURE__ */ (0, C.jsx)("h2", { children: "Sources" }),
							g.map((e, t) => /* @__PURE__ */ (0, C.jsxs)("div", {
								className: "evr-repeat-row",
								children: [
									/* @__PURE__ */ (0, C.jsxs)("label", { children: ["Source id", /* @__PURE__ */ (0, C.jsx)("input", {
										"data-testid": `evr-try-source-${t}-id`,
										value: e.id,
										onChange: (e) => x(t, { id: e.target.value })
									})] }),
									/* @__PURE__ */ (0, C.jsxs)("label", { children: ["Title", /* @__PURE__ */ (0, C.jsx)("input", {
										"data-testid": `evr-try-source-${t}-title`,
										value: e.title ?? "",
										onChange: (e) => x(t, { title: e.target.value })
									})] }),
									/* @__PURE__ */ (0, C.jsxs)("label", { children: ["URL", /* @__PURE__ */ (0, C.jsx)("input", {
										"data-testid": `evr-try-source-${t}-url`,
										value: e.url ?? "",
										onChange: (e) => x(t, { url: e.target.value })
									})] }),
									/* @__PURE__ */ (0, C.jsx)("button", {
										className: "evr-button evr-button--ghost",
										type: "button",
										"data-testid": `evr-try-remove-source-${t}`,
										onClick: () => _((e) => e.filter((e, n) => n !== t)),
										disabled: g.length === 1,
										children: "Remove"
									})
								]
							}, e.id)),
							/* @__PURE__ */ (0, C.jsx)("button", {
								className: "evr-button evr-button--ghost",
								type: "button",
								"data-testid": "evr-try-add-source",
								onClick: () => _((e) => [...e, J(e.length)]),
								children: "Add source"
							})
						]
					}),
					/* @__PURE__ */ (0, C.jsxs)("aside", {
						className: "evr-panel",
						children: [
							/* @__PURE__ */ (0, C.jsx)("h2", { children: "Run config" }),
							/* @__PURE__ */ (0, C.jsxs)("label", { children: ["Profile", /* @__PURE__ */ (0, C.jsx)("select", {
								"data-testid": "evr-try-profile",
								value: c,
								onChange: (e) => l(e.target.value),
								children: (e.data ?? []).map((e) => /* @__PURE__ */ (0, C.jsx)("option", {
									value: e.key,
									children: e.label
								}, e.key))
							})] }),
							/* @__PURE__ */ (0, C.jsxs)("label", {
								className: "evr-checkbox",
								children: [/* @__PURE__ */ (0, C.jsx)("input", {
									"data-testid": "evr-try-dry-run",
									type: "checkbox",
									checked: u,
									onChange: (e) => d(e.target.checked)
								}), "Dry run"]
							}),
							/* @__PURE__ */ (0, C.jsxs)("label", {
								className: "evr-checkbox",
								children: [/* @__PURE__ */ (0, C.jsx)("input", {
									"data-testid": "evr-try-label-via-llm",
									type: "checkbox",
									checked: f,
									onChange: (e) => p(e.target.checked)
								}), "Label via LLM"]
							}),
							/* @__PURE__ */ (0, C.jsx)("button", {
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
			t.data ? /* @__PURE__ */ (0, C.jsxs)("section", {
				className: "evr-panel",
				"data-testid": "evr-try-result",
				children: [/* @__PURE__ */ (0, C.jsxs)("div", {
					className: "evr-page__header",
					children: [/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: t.data.review_id }), /* @__PURE__ */ (0, C.jsx)("p", { children: t.data.artifact_id })] }), /* @__PURE__ */ (0, C.jsx)(w, { verdict: Object.values(t.data.claim_verdicts)[0] ?? "keep" })]
				}), u ? null : /* @__PURE__ */ (0, C.jsx)(s, {
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
var X = [
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
	return e ? /* @__PURE__ */ (0, C.jsx)(u, {}) : /* @__PURE__ */ (0, C.jsxs)("div", {
		className: "evr-shell",
		"data-testid": "evr-shell",
		children: [/* @__PURE__ */ (0, C.jsxs)("aside", {
			className: "evr-sidebar",
			"aria-label": "Evidence Risk Review navigation",
			children: [/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "evr-brand",
				children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: "Evidence Risk" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "Review Admin" })]
			}), /* @__PURE__ */ (0, C.jsx)("nav", {
				className: "evr-nav",
				children: X.map((e) => /* @__PURE__ */ (0, C.jsx)(l, {
					to: e.to,
					end: e.to === "/",
					"data-testid": e.testId,
					children: e.label
				}, e.to))
			})]
		}), /* @__PURE__ */ (0, C.jsxs)("div", {
			className: "evr-main",
			children: [/* @__PURE__ */ (0, C.jsx)("header", {
				className: "evr-topbar",
				children: /* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: "Evidence Risk Review" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "HTTP API operator console" })] })
			}), /* @__PURE__ */ (0, C.jsx)(u, {})]
		})]
	});
}
//#endregion
//#region resources/js/App.tsx
function he({ children: n, config: r, embedded: a }) {
	let s = i(() => new e({ defaultOptions: { queries: {
		retry: !1,
		staleTime: 3e4
	} } }), []), l = v(r), u = /* @__PURE__ */ (0, C.jsx)(t, {
		client: s,
		children: n
	});
	return a ? /* @__PURE__ */ (0, C.jsx)(c, { children: u }) : /* @__PURE__ */ (0, C.jsx)(o, {
		basename: y(l),
		children: u
	});
}
function Z({ config: e, embedded: t = !1 }) {
	let n = v(e);
	return /* @__PURE__ */ (0, C.jsx)(he, {
		config: n,
		embedded: t,
		children: /* @__PURE__ */ (0, C.jsx)("div", {
			"data-testid": "evr-app",
			"data-state": "ready",
			"aria-busy": "false",
			"data-api-base": n.api_base,
			children: /* @__PURE__ */ (0, C.jsx)(f, { children: /* @__PURE__ */ (0, C.jsxs)(d, {
				element: /* @__PURE__ */ (0, C.jsx)(me, { embedded: t }),
				children: [
					/* @__PURE__ */ (0, C.jsx)(d, {
						index: !0,
						element: /* @__PURE__ */ (0, C.jsx)(H, {})
					}),
					/* @__PURE__ */ (0, C.jsx)(d, {
						path: "/reviews",
						element: /* @__PURE__ */ (0, C.jsx)(fe, {})
					}),
					/* @__PURE__ */ (0, C.jsx)(d, {
						path: "/reviews/:reviewId",
						element: /* @__PURE__ */ (0, C.jsx)(de, {})
					}),
					/* @__PURE__ */ (0, C.jsx)(d, {
						path: "/profiles",
						element: /* @__PURE__ */ (0, C.jsx)(W, {})
					}),
					/* @__PURE__ */ (0, C.jsx)(d, {
						path: "/profiles/:key",
						element: /* @__PURE__ */ (0, C.jsx)(G, {})
					}),
					/* @__PURE__ */ (0, C.jsx)(d, {
						path: "/taxonomy",
						element: /* @__PURE__ */ (0, C.jsx)(pe, {})
					}),
					/* @__PURE__ */ (0, C.jsx)(d, {
						path: "/try",
						element: /* @__PURE__ */ (0, C.jsx)(Y, {})
					}),
					/* @__PURE__ */ (0, C.jsx)(d, {
						path: "/settings",
						element: /* @__PURE__ */ (0, C.jsx)(K, {})
					})
				]
			}) })
		})
	});
}
//#endregion
export { Z as EvidenceRiskReviewAdminApp };
