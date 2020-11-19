"use strict";

function e(e) {
	return e && "object" == typeof e && "default" in e ? e.default : e
}
var t = e(require("crypto")),
	r = e(require("fs")),
	n = e(require("path")),
	o = e(require("buffer")),
	i = e(require("stream")),
	a = e(require("util")),
	s = e(require("querystring"));
class c extends Error {
	constructor(e) {
		super(e.message), this.errMsg = e.message || "", Object.defineProperties(this, {
			message: {
				get() {
					return `errCode: ${e.code||""} | errMsg: ` + this.errMsg
				},
				set(e) {
					this.errMsg = e
				}
			}
		})
	}
}
const u = Object.prototype.toString,
	f = Object.prototype.hasOwnProperty;

function d(e, t) {
	return f.call(e, t)
}

function p(e) {
	return "[object Object]" === u.call(e)
}

function l(e) {
	return "function" == typeof e
}
const m = /_(\w)/g,
	h = /[A-Z]/g;

function g(e) {
	return e.replace(m, (e, t) => t ? t.toUpperCase() : "")
}

function y(e) {
	return e.replace(h, e => "_" + e.toLowerCase())
}

function w(e, t) {
	let r, n;
	switch (t) {
		case "snake2camel":
			n = g, r = m;
			break;
		case "camel2snake":
			n = y, r = h
	}
	for (const o in e)
		if (d(e, o) && r.test(o)) {
			const r = n(o);
			e[r] = e[o], delete e[o], p(e[r]) ? e[r] = w(e[r], t) : Array.isArray(e[r]) && (e[r] = e[r].map(e => w(e, t)))
		} return e
}

function v(e) {
	return w(e, "snake2camel")
}

function b(e) {
	return w(e, "camel2snake")
}

function _(e) {
	return function(e, t = "-") {
		e = e || new Date;
		const r = [];
		return r.push(e.getFullYear()), r.push(("00" + (e.getMonth() + 1)).substr(-2)), r.push(("00" + e.getDate()).substr(-
			2)), r.join(t)
	}(e = e || new Date) + " " + function(e, t = ":") {
		e = e || new Date;
		const r = [];
		return r.push(("00" + e.getHours()).substr(-2)), r.push(("00" + e.getMinutes()).substr(-2)), r.push(("00" + e.getSeconds())
			.substr(-2)), r.join(t)
	}(e)
}

function S() {
	"development" === process.env.NODE_ENV && console.log(...arguments)
}

function E(e = {}, t) {
	if (!t || !e) return e;
	const r = ["_pre", "_purify", "_post"];
	t._pre && (e = t._pre(e));
	let n = {
		shouldDelete: new Set([])
	};
	if (t._purify) {
		const e = t._purify;
		for (const t in e) e[t] = new Set(e[t]);
		n = Object.assign(n, e)
	}
	if (p(t))
		for (const o in t) {
			const i = t[o];
			l(i) && -1 === r.indexOf(o) ? e[o] = i(e) : "string" == typeof i && -1 === r.indexOf(o) && (e[o] = e[i], n.shouldDelete
				.add(i))
		} else l(t) && (e = t(e));
	if (n.shouldDelete)
		for (const t of n.shouldDelete) delete e[t];
	return t._post && (e = t._post(e)), e
}

function k(e, t) {
	const r = new e(t);
	return new Proxy(r, {
		get: function(e, t) {
			if ("function" == typeof e[t] && 0 !== t.indexOf("_") && e._protocols && e._protocols[t]) {
				const r = e._protocols[t];
				return async function(n) {
					n = E(n, r.args);
					let o = await e[t](n);
					return o = E(o, r.returnValue), o
				}
			}
			return e[t]
		}
	})
}
const x = uniCloud.database(),
	j = x.collection("uni-id-users"),
	T = x.collection("uni-verify");
let I = {};
try {
	I = JSON.parse(r.readFileSync(n.resolve(__dirname, "config.json")))
} catch (e) {}

function O(e) {
	const t = Object.assign(I, I[e || __ctx__.PLATFORM]) || {},
		r = Object.assign({
			bindTokenToDevice: !0
		}, t);
	return ["passwordSecret", "tokenSecret", "tokenExpiresIn", "passwordErrorLimit", "passwordErrorRetryTime"].forEach(e => {
		if (!r || !r[e]) throw new Error("请在公用模块uni-id的config.json或init方法中内添加配置项：" + e)
	}), r
}

function C(e) {
	let t, r, n = e - Date.now(),
		o = "后";
	n < 0 && (o = "前", n = -n);
	const i = Math.floor(n / 1e3),
		a = Math.floor(i / 60),
		s = Math.floor(a / 60),
		c = Math.floor(s / 24),
		u = Math.floor(c / 30),
		f = Math.floor(u / 12);
	switch (!0) {
		case f > 0:
			t = f, r = "年";
			break;
		case u > 0:
			t = u, r = "月";
			break;
		case c > 0:
			t = c, r = "天";
			break;
		case s > 0:
			t = s, r = "小时";
			break;
		case a > 0:
			t = a, r = "分钟";
			break;
		default:
			t = i, r = "秒"
	}
	return `${t}${r}${o}`
}

function A(e) {
	const r = O(),
		n = t.createHmac("sha1", r.passwordSecret.toString("ascii"));
	return n.update(e), n.digest("hex")
}

function R(e, t) {
	return e(t = {
		exports: {}
	}, t.exports), t.exports
}
var P = R((function(e, t) {
		var r = o.Buffer;

		function n(e, t) {
			for (var r in e) t[r] = e[r]
		}

		function i(e, t, n) {
			return r(e, t, n)
		}
		r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? e.exports = o : (n(o, t), t.Buffer = i), i.prototype =
			Object.create(r.prototype), n(r, i), i.from = function(e, t, n) {
				if ("number" == typeof e) throw new TypeError("Argument must not be a number");
				return r(e, t, n)
			}, i.alloc = function(e, t, n) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				var o = r(e);
				return void 0 !== t ? "string" == typeof n ? o.fill(t, n) : o.fill(t) : o.fill(0), o
			}, i.allocUnsafe = function(e) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				return r(e)
			}, i.allocUnsafeSlow = function(e) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				return o.SlowBuffer(e)
			}
	})),
	$ = (P.Buffer, P.Buffer);

function N(e) {
	if (this.buffer = null, this.writable = !0, this.readable = !0, !e) return this.buffer = $.alloc(0), this;
	if ("function" == typeof e.pipe) return this.buffer = $.alloc(0), e.pipe(this), this;
	if (e.length || "object" == typeof e) return this.buffer = e, this.writable = !1, process.nextTick(function() {
		this.emit("end", e), this.readable = !1, this.emit("close")
	}.bind(this)), this;
	throw new TypeError("Unexpected data type (" + typeof e + ")")
}
a.inherits(N, i), N.prototype.write = function(e) {
	this.buffer = $.concat([this.buffer, $.from(e)]), this.emit("data", e)
}, N.prototype.end = function(e) {
	e && this.write(e), this.emit("end", e), this.emit("close"), this.writable = !1, this.readable = !1
};
var B = N,
	M = o.Buffer,
	D = o.SlowBuffer,
	L = K;

function K(e, t) {
	if (!M.isBuffer(e) || !M.isBuffer(t)) return !1;
	if (e.length !== t.length) return !1;
	for (var r = 0, n = 0; n < e.length; n++) r |= e[n] ^ t[n];
	return 0 === r
}
K.install = function() {
	M.prototype.equal = D.prototype.equal = function(e) {
		return K(this, e)
	}
};
var V = M.prototype.equal,
	q = D.prototype.equal;

function U(e) {
	return (e / 8 | 0) + (e % 8 == 0 ? 0 : 1)
}
K.restore = function() {
	M.prototype.equal = V, D.prototype.equal = q
};
var H = {
	ES256: U(256),
	ES384: U(384),
	ES512: U(521)
};
var F = function(e) {
		var t = H[e];
		if (t) return t;
		throw new Error('Unknown algorithm "' + e + '"')
	},
	J = P.Buffer;

function G(e) {
	if (J.isBuffer(e)) return e;
	if ("string" == typeof e) return J.from(e, "base64");
	throw new TypeError("ECDSA signature must be a Base64 string or a Buffer")
}

function z(e, t, r) {
	for (var n = 0; t + n < r && 0 === e[t + n];) ++n;
	return e[t + n] >= 128 && --n, n
}
var W = {
		derToJose: function(e, t) {
			e = G(e);
			var r = F(t),
				n = r + 1,
				o = e.length,
				i = 0;
			if (48 !== e[i++]) throw new Error('Could not find expected "seq"');
			var a = e[i++];
			if (129 === a && (a = e[i++]), o - i < a) throw new Error('"seq" specified length of "' + a + '", only "' + (o - i) +
				'" remaining');
			if (2 !== e[i++]) throw new Error('Could not find expected "int" for "r"');
			var s = e[i++];
			if (o - i - 2 < s) throw new Error('"r" specified length of "' + s + '", only "' + (o - i - 2) + '" available');
			if (n < s) throw new Error('"r" specified length of "' + s + '", max of "' + n + '" is acceptable');
			var c = i;
			if (i += s, 2 !== e[i++]) throw new Error('Could not find expected "int" for "s"');
			var u = e[i++];
			if (o - i !== u) throw new Error('"s" specified length of "' + u + '", expected "' + (o - i) + '"');
			if (n < u) throw new Error('"s" specified length of "' + u + '", max of "' + n + '" is acceptable');
			var f = i;
			if ((i += u) !== o) throw new Error('Expected to consume entire buffer, but "' + (o - i) + '" bytes remain');
			var d = r - s,
				p = r - u,
				l = J.allocUnsafe(d + s + p + u);
			for (i = 0; i < d; ++i) l[i] = 0;
			e.copy(l, i, c + Math.max(-d, 0), c + s);
			for (var m = i = r; i < m + p; ++i) l[i] = 0;
			return e.copy(l, i, f + Math.max(-p, 0), f + u), l = (l = l.toString("base64")).replace(/=/g, "").replace(/\+/g,
				"-").replace(/\//g, "_")
		},
		joseToDer: function(e, t) {
			e = G(e);
			var r = F(t),
				n = e.length;
			if (n !== 2 * r) throw new TypeError('"' + t + '" signatures must be "' + 2 * r + '" bytes, saw "' + n + '"');
			var o = z(e, 0, r),
				i = z(e, r, e.length),
				a = r - o,
				s = r - i,
				c = 2 + a + 1 + 1 + s,
				u = c < 128,
				f = J.allocUnsafe((u ? 2 : 3) + c),
				d = 0;
			return f[d++] = 48, u ? f[d++] = c : (f[d++] = 129, f[d++] = 255 & c), f[d++] = 2, f[d++] = a, o < 0 ? (f[d++] = 0,
					d += e.copy(f, d, 0, r)) : d += e.copy(f, d, o, r), f[d++] = 2, f[d++] = s, i < 0 ? (f[d++] = 0, e.copy(f, d, r)) :
				e.copy(f, d, r + i), f
		}
	},
	Z = P.Buffer,
	Y = "secret must be a string or buffer",
	X = "key must be a string or a buffer",
	Q = "function" == typeof t.createPublicKey;

function ee(e) {
	if (!Z.isBuffer(e) && "string" != typeof e) {
		if (!Q) throw oe(X);
		if ("object" != typeof e) throw oe(X);
		if ("string" != typeof e.type) throw oe(X);
		if ("string" != typeof e.asymmetricKeyType) throw oe(X);
		if ("function" != typeof e.export) throw oe(X)
	}
}

function te(e) {
	if (!Z.isBuffer(e) && "string" != typeof e && "object" != typeof e) throw oe(
		"key must be a string, a buffer or an object")
}

function re(e) {
	return e.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

function ne(e) {
	var t = 4 - (e = e.toString()).length % 4;
	if (4 !== t)
		for (var r = 0; r < t; ++r) e += "=";
	return e.replace(/\-/g, "+").replace(/_/g, "/")
}

function oe(e) {
	var t = [].slice.call(arguments, 1),
		r = a.format.bind(a, e).apply(null, t);
	return new TypeError(r)
}

function ie(e) {
	var t;
	return t = e, Z.isBuffer(t) || "string" == typeof t || (e = JSON.stringify(e)), e
}

function ae(e) {
	return function(r, n) {
		! function(e) {
			if (!Z.isBuffer(e)) {
				if ("string" == typeof e) return e;
				if (!Q) throw oe(Y);
				if ("object" != typeof e) throw oe(Y);
				if ("secret" !== e.type) throw oe(Y);
				if ("function" != typeof e.export) throw oe(Y)
			}
		}(n), r = ie(r);
		var o = t.createHmac("sha" + e, n);
		return re((o.update(r), o.digest("base64")))
	}
}

function se(e) {
	return function(t, r, n) {
		var o = ae(e)(t, n);
		return L(Z.from(r), Z.from(o))
	}
}

function ce(e) {
	return function(r, n) {
		te(n), r = ie(r);
		var o = t.createSign("RSA-SHA" + e);
		return re((o.update(r), o.sign(n, "base64")))
	}
}

function ue(e) {
	return function(r, n, o) {
		ee(o), r = ie(r), n = ne(n);
		var i = t.createVerify("RSA-SHA" + e);
		return i.update(r), i.verify(o, n, "base64")
	}
}

function fe(e) {
	return function(r, n) {
		te(n), r = ie(r);
		var o = t.createSign("RSA-SHA" + e);
		return re((o.update(r), o.sign({
			key: n,
			padding: t.constants.RSA_PKCS1_PSS_PADDING,
			saltLength: t.constants.RSA_PSS_SALTLEN_DIGEST
		}, "base64")))
	}
}

function de(e) {
	return function(r, n, o) {
		ee(o), r = ie(r), n = ne(n);
		var i = t.createVerify("RSA-SHA" + e);
		return i.update(r), i.verify({
			key: o,
			padding: t.constants.RSA_PKCS1_PSS_PADDING,
			saltLength: t.constants.RSA_PSS_SALTLEN_DIGEST
		}, n, "base64")
	}
}

function pe(e) {
	var t = ce(e);
	return function() {
		var r = t.apply(null, arguments);
		return r = W.derToJose(r, "ES" + e)
	}
}

function le(e) {
	var t = ue(e);
	return function(r, n, o) {
		return n = W.joseToDer(n, "ES" + e).toString("base64"), t(r, n, o)
	}
}

function me() {
	return function() {
		return ""
	}
}

function he() {
	return function(e, t) {
		return "" === t
	}
}
Q && (X += " or a KeyObject", Y += "or a KeyObject");
var ge = function(e) {
		var t = {
				hs: ae,
				rs: ce,
				ps: fe,
				es: pe,
				none: me
			},
			r = {
				hs: se,
				rs: ue,
				ps: de,
				es: le,
				none: he
			},
			n = e.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);
		if (!n) throw oe(
			'"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".',
			e);
		var o = (n[1] || n[3]).toLowerCase(),
			i = n[2];
		return {
			sign: t[o](i),
			verify: r[o](i)
		}
	},
	ye = o.Buffer,
	we = function(e) {
		return "string" == typeof e ? e : "number" == typeof e || ye.isBuffer(e) ? e.toString() : JSON.stringify(e)
	},
	ve = P.Buffer;

function be(e, t) {
	return ve.from(e, t).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

function _e(e) {
	var t = e.header,
		r = e.payload,
		n = e.secret || e.privateKey,
		o = e.encoding,
		i = ge(t.alg),
		s = function(e, t, r) {
			r = r || "utf8";
			var n = be(we(e), "binary"),
				o = be(we(t), r);
			return a.format("%s.%s", n, o)
		}(t, r, o),
		c = i.sign(s, n);
	return a.format("%s.%s", s, c)
}

function Se(e) {
	var t = e.secret || e.privateKey || e.key,
		r = new B(t);
	this.readable = !0, this.header = e.header, this.encoding = e.encoding, this.secret = this.privateKey = this.key = r,
		this.payload = new B(e.payload), this.secret.once("close", function() {
			!this.payload.writable && this.readable && this.sign()
		}.bind(this)), this.payload.once("close", function() {
			!this.secret.writable && this.readable && this.sign()
		}.bind(this))
}
a.inherits(Se, i), Se.prototype.sign = function() {
	try {
		var e = _e({
			header: this.header,
			payload: this.payload.buffer,
			secret: this.secret.buffer,
			encoding: this.encoding
		});
		return this.emit("done", e), this.emit("data", e), this.emit("end"), this.readable = !1, e
	} catch (e) {
		this.readable = !1, this.emit("error", e), this.emit("close")
	}
}, Se.sign = _e;
var Ee = Se,
	ke = P.Buffer,
	xe = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

function je(e) {
	if (function(e) {
			return "[object Object]" === Object.prototype.toString.call(e)
		}(e)) return e;
	try {
		return JSON.parse(e)
	} catch (e) {
		return
	}
}

function Te(e) {
	var t = e.split(".", 1)[0];
	return je(ke.from(t, "base64").toString("binary"))
}

function Ie(e) {
	return e.split(".")[2]
}

function Oe(e) {
	return xe.test(e) && !!Te(e)
}

function Ce(e, t, r) {
	if (!t) {
		var n = new Error("Missing algorithm parameter for jws.verify");
		throw n.code = "MISSING_ALGORITHM", n
	}
	var o = Ie(e = we(e)),
		i = function(e) {
			return e.split(".", 2).join(".")
		}(e);
	return ge(t).verify(i, o, r)
}

function Ae(e, t) {
	if (t = t || {}, !Oe(e = we(e))) return null;
	var r = Te(e);
	if (!r) return null;
	var n = function(e, t) {
		t = t || "utf8";
		var r = e.split(".")[1];
		return ke.from(r, "base64").toString(t)
	}(e);
	return ("JWT" === r.typ || t.json) && (n = JSON.parse(n, t.encoding)), {
		header: r,
		payload: n,
		signature: Ie(e)
	}
}

function Re(e) {
	var t = (e = e || {}).secret || e.publicKey || e.key,
		r = new B(t);
	this.readable = !0, this.algorithm = e.algorithm, this.encoding = e.encoding, this.secret = this.publicKey = this.key =
		r, this.signature = new B(e.signature), this.secret.once("close", function() {
			!this.signature.writable && this.readable && this.verify()
		}.bind(this)), this.signature.once("close", function() {
			!this.secret.writable && this.readable && this.verify()
		}.bind(this))
}
a.inherits(Re, i), Re.prototype.verify = function() {
	try {
		var e = Ce(this.signature.buffer, this.algorithm, this.key.buffer),
			t = Ae(this.signature.buffer, this.encoding);
		return this.emit("done", e, t), this.emit("data", e), this.emit("end"), this.readable = !1, e
	} catch (e) {
		this.readable = !1, this.emit("error", e), this.emit("close")
	}
}, Re.decode = Ae, Re.isValid = Oe, Re.verify = Ce;
var Pe = Re,
	$e = {
		ALGORITHMS: ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384",
			"ES512"
		],
		sign: Ee.sign,
		verify: Pe.verify,
		decode: Pe.decode,
		isValid: Pe.isValid,
		createSign: function(e) {
			return new Ee(e)
		},
		createVerify: function(e) {
			return new Pe(e)
		}
	},
	Ne = function(e, t) {
		t = t || {};
		var r = $e.decode(e, t);
		if (!r) return null;
		var n = r.payload;
		if ("string" == typeof n) try {
			var o = JSON.parse(n);
			null !== o && "object" == typeof o && (n = o)
		} catch (e) {}
		return !0 === t.complete ? {
			header: r.header,
			payload: n,
			signature: r.signature
		} : n
	},
	Be = function(e, t) {
		Error.call(this, e), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.name =
			"JsonWebTokenError", this.message = e, t && (this.inner = t)
	};
(Be.prototype = Object.create(Error.prototype)).constructor = Be;
var Me = Be,
	De = function(e, t) {
		Me.call(this, e), this.name = "NotBeforeError", this.date = t
	};
(De.prototype = Object.create(Me.prototype)).constructor = De;
var Le = De,
	Ke = function(e, t) {
		Me.call(this, e), this.name = "TokenExpiredError", this.expiredAt = t
	};
(Ke.prototype = Object.create(Me.prototype)).constructor = Ke;
var Ve = Ke,
	qe = 1e3,
	Ue = 60 * qe,
	He = 60 * Ue,
	Fe = 24 * He,
	Je = function(e, t) {
		t = t || {};
		var r = typeof e;
		if ("string" === r && e.length > 0) return function(e) {
			if ((e = String(e)).length > 100) return;
			var t =
				/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i
				.exec(e);
			if (!t) return;
			var r = parseFloat(t[1]);
			switch ((t[2] || "ms").toLowerCase()) {
				case "years":
				case "year":
				case "yrs":
				case "yr":
				case "y":
					return 315576e5 * r;
				case "weeks":
				case "week":
				case "w":
					return 6048e5 * r;
				case "days":
				case "day":
				case "d":
					return r * Fe;
				case "hours":
				case "hour":
				case "hrs":
				case "hr":
				case "h":
					return r * He;
				case "minutes":
				case "minute":
				case "mins":
				case "min":
				case "m":
					return r * Ue;
				case "seconds":
				case "second":
				case "secs":
				case "sec":
				case "s":
					return r * qe;
				case "milliseconds":
				case "millisecond":
				case "msecs":
				case "msec":
				case "ms":
					return r;
				default:
					return
			}
		}(e);
		if ("number" === r && isFinite(e)) return t.long ? function(e) {
			var t = Math.abs(e);
			if (t >= Fe) return Ge(e, t, Fe, "day");
			if (t >= He) return Ge(e, t, He, "hour");
			if (t >= Ue) return Ge(e, t, Ue, "minute");
			if (t >= qe) return Ge(e, t, qe, "second");
			return e + " ms"
		}(e) : function(e) {
			var t = Math.abs(e);
			if (t >= Fe) return Math.round(e / Fe) + "d";
			if (t >= He) return Math.round(e / He) + "h";
			if (t >= Ue) return Math.round(e / Ue) + "m";
			if (t >= qe) return Math.round(e / qe) + "s";
			return e + "ms"
		}(e);
		throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
	};

function Ge(e, t, r, n) {
	var o = t >= 1.5 * r;
	return Math.round(e / r) + " " + n + (o ? "s" : "")
}
var ze = function(e, t) {
		var r = t || Math.floor(Date.now() / 1e3);
		if ("string" == typeof e) {
			var n = Je(e);
			if (void 0 === n) return;
			return Math.floor(r + n / 1e3)
		}
		return "number" == typeof e ? r + e : void 0
	},
	We = R((function(e, t) {
		var r;
		t = e.exports = J, r = "object" == typeof process && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(
			process.env.NODE_DEBUG) ? function() {
			var e = Array.prototype.slice.call(arguments, 0);
			e.unshift("SEMVER"), console.log.apply(console, e)
		} : function() {}, t.SEMVER_SPEC_VERSION = "2.0.0";
		var n = Number.MAX_SAFE_INTEGER || 9007199254740991,
			o = t.re = [],
			i = t.src = [],
			a = 0,
			s = a++;
		i[s] = "0|[1-9]\\d*";
		var c = a++;
		i[c] = "[0-9]+";
		var u = a++;
		i[u] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
		var f = a++;
		i[f] = "(" + i[s] + ")\\.(" + i[s] + ")\\.(" + i[s] + ")";
		var d = a++;
		i[d] = "(" + i[c] + ")\\.(" + i[c] + ")\\.(" + i[c] + ")";
		var p = a++;
		i[p] = "(?:" + i[s] + "|" + i[u] + ")";
		var l = a++;
		i[l] = "(?:" + i[c] + "|" + i[u] + ")";
		var m = a++;
		i[m] = "(?:-(" + i[p] + "(?:\\." + i[p] + ")*))";
		var h = a++;
		i[h] = "(?:-?(" + i[l] + "(?:\\." + i[l] + ")*))";
		var g = a++;
		i[g] = "[0-9A-Za-z-]+";
		var y = a++;
		i[y] = "(?:\\+(" + i[g] + "(?:\\." + i[g] + ")*))";
		var w = a++,
			v = "v?" + i[f] + i[m] + "?" + i[y] + "?";
		i[w] = "^" + v + "$";
		var b = "[v=\\s]*" + i[d] + i[h] + "?" + i[y] + "?",
			_ = a++;
		i[_] = "^" + b + "$";
		var S = a++;
		i[S] = "((?:<|>)?=?)";
		var E = a++;
		i[E] = i[c] + "|x|X|\\*";
		var k = a++;
		i[k] = i[s] + "|x|X|\\*";
		var x = a++;
		i[x] = "[v=\\s]*(" + i[k] + ")(?:\\.(" + i[k] + ")(?:\\.(" + i[k] + ")(?:" + i[m] + ")?" + i[y] + "?)?)?";
		var j = a++;
		i[j] = "[v=\\s]*(" + i[E] + ")(?:\\.(" + i[E] + ")(?:\\.(" + i[E] + ")(?:" + i[h] + ")?" + i[y] + "?)?)?";
		var T = a++;
		i[T] = "^" + i[S] + "\\s*" + i[x] + "$";
		var I = a++;
		i[I] = "^" + i[S] + "\\s*" + i[j] + "$";
		var O = a++;
		i[O] = "(?:^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])";
		var C = a++;
		i[C] = "(?:~>?)";
		var A = a++;
		i[A] = "(\\s*)" + i[C] + "\\s+", o[A] = new RegExp(i[A], "g");
		var R = a++;
		i[R] = "^" + i[C] + i[x] + "$";
		var P = a++;
		i[P] = "^" + i[C] + i[j] + "$";
		var $ = a++;
		i[$] = "(?:\\^)";
		var N = a++;
		i[N] = "(\\s*)" + i[$] + "\\s+", o[N] = new RegExp(i[N], "g");
		var B = a++;
		i[B] = "^" + i[$] + i[x] + "$";
		var M = a++;
		i[M] = "^" + i[$] + i[j] + "$";
		var D = a++;
		i[D] = "^" + i[S] + "\\s*(" + b + ")$|^$";
		var L = a++;
		i[L] = "^" + i[S] + "\\s*(" + v + ")$|^$";
		var K = a++;
		i[K] = "(\\s*)" + i[S] + "\\s*(" + b + "|" + i[x] + ")", o[K] = new RegExp(i[K], "g");
		var V = a++;
		i[V] = "^\\s*(" + i[x] + ")\\s+-\\s+(" + i[x] + ")\\s*$";
		var q = a++;
		i[q] = "^\\s*(" + i[j] + ")\\s+-\\s+(" + i[j] + ")\\s*$";
		var U = a++;
		i[U] = "(<|>)?=?\\s*\\*";
		for (var H = 0; H < 35; H++) r(H, i[H]), o[H] || (o[H] = new RegExp(i[H]));

		function F(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof J) return e;
			if ("string" != typeof e) return null;
			if (e.length > 256) return null;
			if (!(t.loose ? o[_] : o[w]).test(e)) return null;
			try {
				return new J(e, t)
			} catch (e) {
				return null
			}
		}

		function J(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof J) {
				if (e.loose === t.loose) return e;
				e = e.version
			} else if ("string" != typeof e) throw new TypeError("Invalid Version: " + e);
			if (e.length > 256) throw new TypeError("version is longer than 256 characters");
			if (!(this instanceof J)) return new J(e, t);
			r("SemVer", e, t), this.options = t, this.loose = !!t.loose;
			var i = e.trim().match(t.loose ? o[_] : o[w]);
			if (!i) throw new TypeError("Invalid Version: " + e);
			if (this.raw = e, this.major = +i[1], this.minor = +i[2], this.patch = +i[3], this.major > n || this.major < 0)
				throw new TypeError("Invalid major version");
			if (this.minor > n || this.minor < 0) throw new TypeError("Invalid minor version");
			if (this.patch > n || this.patch < 0) throw new TypeError("Invalid patch version");
			i[4] ? this.prerelease = i[4].split(".").map((function(e) {
				if (/^[0-9]+$/.test(e)) {
					var t = +e;
					if (t >= 0 && t < n) return t
				}
				return e
			})) : this.prerelease = [], this.build = i[5] ? i[5].split(".") : [], this.format()
		}
		t.parse = F, t.valid = function(e, t) {
			var r = F(e, t);
			return r ? r.version : null
		}, t.clean = function(e, t) {
			var r = F(e.trim().replace(/^[=v]+/, ""), t);
			return r ? r.version : null
		}, t.SemVer = J, J.prototype.format = function() {
			return this.version = this.major + "." + this.minor + "." + this.patch, this.prerelease.length && (this.version +=
				"-" + this.prerelease.join(".")), this.version
		}, J.prototype.toString = function() {
			return this.version
		}, J.prototype.compare = function(e) {
			return r("SemVer.compare", this.version, this.options, e), e instanceof J || (e = new J(e, this.options)), this.compareMain(
				e) || this.comparePre(e)
		}, J.prototype.compareMain = function(e) {
			return e instanceof J || (e = new J(e, this.options)), z(this.major, e.major) || z(this.minor, e.minor) || z(this
				.patch, e.patch)
		}, J.prototype.comparePre = function(e) {
			if (e instanceof J || (e = new J(e, this.options)), this.prerelease.length && !e.prerelease.length) return -1;
			if (!this.prerelease.length && e.prerelease.length) return 1;
			if (!this.prerelease.length && !e.prerelease.length) return 0;
			var t = 0;
			do {
				var n = this.prerelease[t],
					o = e.prerelease[t];
				if (r("prerelease compare", t, n, o), void 0 === n && void 0 === o) return 0;
				if (void 0 === o) return 1;
				if (void 0 === n) return -1;
				if (n !== o) return z(n, o)
			} while (++t)
		}, J.prototype.inc = function(e, t) {
			switch (e) {
				case "premajor":
					this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", t);
					break;
				case "preminor":
					this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t);
					break;
				case "prepatch":
					this.prerelease.length = 0, this.inc("patch", t), this.inc("pre", t);
					break;
				case "prerelease":
					0 === this.prerelease.length && this.inc("patch", t), this.inc("pre", t);
					break;
				case "major":
					0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++, this.minor = 0, this.patch =
						0, this.prerelease = [];
					break;
				case "minor":
					0 === this.patch && 0 !== this.prerelease.length || this.minor++, this.patch = 0, this.prerelease = [];
					break;
				case "patch":
					0 === this.prerelease.length && this.patch++, this.prerelease = [];
					break;
				case "pre":
					if (0 === this.prerelease.length) this.prerelease = [0];
					else {
						for (var r = this.prerelease.length; --r >= 0;) "number" == typeof this.prerelease[r] && (this.prerelease[r]++,
							r = -2); - 1 === r && this.prerelease.push(0)
					}
					t && (this.prerelease[0] === t ? isNaN(this.prerelease[1]) && (this.prerelease = [t, 0]) : this.prerelease = [t,
						0
					]);
					break;
				default:
					throw new Error("invalid increment argument: " + e)
			}
			return this.format(), this.raw = this.version, this
		}, t.inc = function(e, t, r, n) {
			"string" == typeof r && (n = r, r = void 0);
			try {
				return new J(e, r).inc(t, n).version
			} catch (e) {
				return null
			}
		}, t.diff = function(e, t) {
			if (X(e, t)) return null;
			var r = F(e),
				n = F(t),
				o = "";
			if (r.prerelease.length || n.prerelease.length) {
				o = "pre";
				var i = "prerelease"
			}
			for (var a in r)
				if (("major" === a || "minor" === a || "patch" === a) && r[a] !== n[a]) return o + a;
			return i
		}, t.compareIdentifiers = z;
		var G = /^[0-9]+$/;

		function z(e, t) {
			var r = G.test(e),
				n = G.test(t);
			return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1
		}

		function W(e, t, r) {
			return new J(e, r).compare(new J(t, r))
		}

		function Z(e, t, r) {
			return W(e, t, r) > 0
		}

		function Y(e, t, r) {
			return W(e, t, r) < 0
		}

		function X(e, t, r) {
			return 0 === W(e, t, r)
		}

		function Q(e, t, r) {
			return 0 !== W(e, t, r)
		}

		function ee(e, t, r) {
			return W(e, t, r) >= 0
		}

		function te(e, t, r) {
			return W(e, t, r) <= 0
		}

		function re(e, t, r, n) {
			switch (t) {
				case "===":
					return "object" == typeof e && (e = e.version), "object" == typeof r && (r = r.version), e === r;
				case "!==":
					return "object" == typeof e && (e = e.version), "object" == typeof r && (r = r.version), e !== r;
				case "":
				case "=":
				case "==":
					return X(e, r, n);
				case "!=":
					return Q(e, r, n);
				case ">":
					return Z(e, r, n);
				case ">=":
					return ee(e, r, n);
				case "<":
					return Y(e, r, n);
				case "<=":
					return te(e, r, n);
				default:
					throw new TypeError("Invalid operator: " + t)
			}
		}

		function ne(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof ne) {
				if (e.loose === !!t.loose) return e;
				e = e.value
			}
			if (!(this instanceof ne)) return new ne(e, t);
			r("comparator", e, t), this.options = t, this.loose = !!t.loose, this.parse(e), this.semver === oe ? this.value =
				"" : this.value = this.operator + this.semver.version, r("comp", this)
		}
		t.rcompareIdentifiers = function(e, t) {
			return z(t, e)
		}, t.major = function(e, t) {
			return new J(e, t).major
		}, t.minor = function(e, t) {
			return new J(e, t).minor
		}, t.patch = function(e, t) {
			return new J(e, t).patch
		}, t.compare = W, t.compareLoose = function(e, t) {
			return W(e, t, !0)
		}, t.rcompare = function(e, t, r) {
			return W(t, e, r)
		}, t.sort = function(e, r) {
			return e.sort((function(e, n) {
				return t.compare(e, n, r)
			}))
		}, t.rsort = function(e, r) {
			return e.sort((function(e, n) {
				return t.rcompare(e, n, r)
			}))
		}, t.gt = Z, t.lt = Y, t.eq = X, t.neq = Q, t.gte = ee, t.lte = te, t.cmp = re, t.Comparator = ne;
		var oe = {};

		function ie(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof ie) return e.loose === !!t.loose && e.includePrerelease === !!t.includePrerelease ? e : new ie(e
				.raw, t);
			if (e instanceof ne) return new ie(e.value, t);
			if (!(this instanceof ie)) return new ie(e, t);
			if (this.options = t, this.loose = !!t.loose, this.includePrerelease = !!t.includePrerelease, this.raw = e, this.set =
				e.split(/\s*\|\|\s*/).map((function(e) {
					return this.parseRange(e.trim())
				}), this).filter((function(e) {
					return e.length
				})), !this.set.length) throw new TypeError("Invalid SemVer Range: " + e);
			this.format()
		}

		function ae(e) {
			return !e || "x" === e.toLowerCase() || "*" === e
		}

		function se(e, t, r, n, o, i, a, s, c, u, f, d, p) {
			return ((t = ae(r) ? "" : ae(n) ? ">=" + r + ".0.0" : ae(o) ? ">=" + r + "." + n + ".0" : ">=" + t) + " " + (s =
				ae(c) ? "" : ae(u) ? "<" + (+c + 1) + ".0.0" : ae(f) ? "<" + c + "." + (+u + 1) + ".0" : d ? "<=" + c + "." + u +
				"." + f + "-" + d : "<=" + s)).trim()
		}

		function ce(e, t, n) {
			for (var o = 0; o < e.length; o++)
				if (!e[o].test(t)) return !1;
			if (t.prerelease.length && !n.includePrerelease) {
				for (o = 0; o < e.length; o++)
					if (r(e[o].semver), e[o].semver !== oe && e[o].semver.prerelease.length > 0) {
						var i = e[o].semver;
						if (i.major === t.major && i.minor === t.minor && i.patch === t.patch) return !0
					} return !1
			}
			return !0
		}

		function ue(e, t, r) {
			try {
				t = new ie(t, r)
			} catch (e) {
				return !1
			}
			return t.test(e)
		}

		function fe(e, t, r, n) {
			var o, i, a, s, c;
			switch (e = new J(e, n), t = new ie(t, n), r) {
				case ">":
					o = Z, i = te, a = Y, s = ">", c = ">=";
					break;
				case "<":
					o = Y, i = ee, a = Z, s = "<", c = "<=";
					break;
				default:
					throw new TypeError('Must provide a hilo val of "<" or ">"')
			}
			if (ue(e, t, n)) return !1;
			for (var u = 0; u < t.set.length; ++u) {
				var f = t.set[u],
					d = null,
					p = null;
				if (f.forEach((function(e) {
						e.semver === oe && (e = new ne(">=0.0.0")), d = d || e, p = p || e, o(e.semver, d.semver, n) ? d = e : a(e.semver,
							p.semver, n) && (p = e)
					})), d.operator === s || d.operator === c) return !1;
				if ((!p.operator || p.operator === s) && i(e, p.semver)) return !1;
				if (p.operator === c && a(e, p.semver)) return !1
			}
			return !0
		}
		ne.prototype.parse = function(e) {
			var t = this.options.loose ? o[D] : o[L],
				r = e.match(t);
			if (!r) throw new TypeError("Invalid comparator: " + e);
			this.operator = r[1], "=" === this.operator && (this.operator = ""), r[2] ? this.semver = new J(r[2], this.options
				.loose) : this.semver = oe
		}, ne.prototype.toString = function() {
			return this.value
		}, ne.prototype.test = function(e) {
			return r("Comparator.test", e, this.options.loose), this.semver === oe || ("string" == typeof e && (e = new J(e,
				this.options)), re(e, this.operator, this.semver, this.options))
		}, ne.prototype.intersects = function(e, t) {
			if (!(e instanceof ne)) throw new TypeError("a Comparator is required");
			var r;
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), "" === this.operator) return r = new ie(e.value, t), ue(this.value, r, t);
			if ("" === e.operator) return r = new ie(this.value, t), ue(e.semver, r, t);
			var n = !(">=" !== this.operator && ">" !== this.operator || ">=" !== e.operator && ">" !== e.operator),
				o = !("<=" !== this.operator && "<" !== this.operator || "<=" !== e.operator && "<" !== e.operator),
				i = this.semver.version === e.semver.version,
				a = !(">=" !== this.operator && "<=" !== this.operator || ">=" !== e.operator && "<=" !== e.operator),
				s = re(this.semver, "<", e.semver, t) && (">=" === this.operator || ">" === this.operator) && ("<=" === e.operator ||
					"<" === e.operator),
				c = re(this.semver, ">", e.semver, t) && ("<=" === this.operator || "<" === this.operator) && (">=" === e.operator ||
					">" === e.operator);
			return n || o || i && a || s || c
		}, t.Range = ie, ie.prototype.format = function() {
			return this.range = this.set.map((function(e) {
				return e.join(" ").trim()
			})).join("||").trim(), this.range
		}, ie.prototype.toString = function() {
			return this.range
		}, ie.prototype.parseRange = function(e) {
			var t = this.options.loose;
			e = e.trim();
			var n = t ? o[q] : o[V];
			e = e.replace(n, se), r("hyphen replace", e), e = e.replace(o[K], "$1$2$3"), r("comparator trim", e, o[K]), e = (
				e = (e = e.replace(o[A], "$1~")).replace(o[N], "$1^")).split(/\s+/).join(" ");
			var i = t ? o[D] : o[L],
				a = e.split(" ").map((function(e) {
					return function(e, t) {
						return r("comp", e, t), e = function(e, t) {
							return e.trim().split(/\s+/).map((function(e) {
								return function(e, t) {
									r("caret", e, t);
									var n = t.loose ? o[M] : o[B];
									return e.replace(n, (function(t, n, o, i, a) {
										var s;
										return r("caret", e, t, n, o, i, a), ae(n) ? s = "" : ae(o) ? s = ">=" + n + ".0.0 <" + (+n + 1) +
											".0.0" : ae(i) ? s = "0" === n ? ">=" + n + "." + o + ".0 <" + n + "." + (+o + 1) + ".0" :
											">=" + n + "." + o + ".0 <" + (+n + 1) + ".0.0" : a ? (r("replaceCaret pr", a), s = "0" === n ?
												"0" === o ? ">=" + n + "." + o + "." + i + "-" + a + " <" + n + "." + o + "." + (+i + 1) :
												">=" + n + "." + o + "." + i + "-" + a + " <" + n + "." + (+o + 1) + ".0" : ">=" + n + "." +
												o + "." + i + "-" + a + " <" + (+n + 1) + ".0.0") : (r("no pr"), s = "0" === n ? "0" === o ?
												">=" + n + "." + o + "." + i + " <" + n + "." + o + "." + (+i + 1) : ">=" + n + "." + o + "." +
												i + " <" + n + "." + (+o + 1) + ".0" : ">=" + n + "." + o + "." + i + " <" + (+n + 1) +
												".0.0"), r("caret return", s), s
									}))
								}(e, t)
							})).join(" ")
						}(e, t), r("caret", e), e = function(e, t) {
							return e.trim().split(/\s+/).map((function(e) {
								return function(e, t) {
									var n = t.loose ? o[P] : o[R];
									return e.replace(n, (function(t, n, o, i, a) {
										var s;
										return r("tilde", e, t, n, o, i, a), ae(n) ? s = "" : ae(o) ? s = ">=" + n + ".0.0 <" + (+n + 1) +
											".0.0" : ae(i) ? s = ">=" + n + "." + o + ".0 <" + n + "." + (+o + 1) + ".0" : a ? (r(
													"replaceTilde pr", a), s = ">=" + n + "." + o + "." + i + "-" + a + " <" + n + "." + (+o + 1) +
												".0") : s = ">=" + n + "." + o + "." + i + " <" + n + "." + (+o + 1) + ".0", r("tilde return",
												s), s
									}))
								}(e, t)
							})).join(" ")
						}(e, t), r("tildes", e), e = function(e, t) {
							return r("replaceXRanges", e, t), e.split(/\s+/).map((function(e) {
								return function(e, t) {
									e = e.trim();
									var n = t.loose ? o[I] : o[T];
									return e.replace(n, (function(t, n, o, i, a, s) {
										r("xRange", e, t, n, o, i, a, s);
										var c = ae(o),
											u = c || ae(i),
											f = u || ae(a);
										return "=" === n && f && (n = ""), c ? t = ">" === n || "<" === n ? "<0.0.0" : "*" : n && f ? (
												u && (i = 0), a = 0, ">" === n ? (n = ">=", u ? (o = +o + 1, i = 0, a = 0) : (i = +i + 1, a =
													0)) : "<=" === n && (n = "<", u ? o = +o + 1 : i = +i + 1), t = n + o + "." + i + "." + a) :
											u ? t = ">=" + o + ".0.0 <" + (+o + 1) + ".0.0" : f && (t = ">=" + o + "." + i + ".0 <" + o +
												"." + (+i + 1) + ".0"), r("xRange return", t), t
									}))
								}(e, t)
							})).join(" ")
						}(e, t), r("xrange", e), e = function(e, t) {
							return r("replaceStars", e, t), e.trim().replace(o[U], "")
						}(e, t), r("stars", e), e
					}(e, this.options)
				}), this).join(" ").split(/\s+/);
			return this.options.loose && (a = a.filter((function(e) {
				return !!e.match(i)
			}))), a = a.map((function(e) {
				return new ne(e, this.options)
			}), this)
		}, ie.prototype.intersects = function(e, t) {
			if (!(e instanceof ie)) throw new TypeError("a Range is required");
			return this.set.some((function(r) {
				return r.every((function(r) {
					return e.set.some((function(e) {
						return e.every((function(e) {
							return r.intersects(e, t)
						}))
					}))
				}))
			}))
		}, t.toComparators = function(e, t) {
			return new ie(e, t).set.map((function(e) {
				return e.map((function(e) {
					return e.value
				})).join(" ").trim().split(" ")
			}))
		}, ie.prototype.test = function(e) {
			if (!e) return !1;
			"string" == typeof e && (e = new J(e, this.options));
			for (var t = 0; t < this.set.length; t++)
				if (ce(this.set[t], e, this.options)) return !0;
			return !1
		}, t.satisfies = ue, t.maxSatisfying = function(e, t, r) {
			var n = null,
				o = null;
			try {
				var i = new ie(t, r)
			} catch (e) {
				return null
			}
			return e.forEach((function(e) {
				i.test(e) && (n && -1 !== o.compare(e) || (o = new J(n = e, r)))
			})), n
		}, t.minSatisfying = function(e, t, r) {
			var n = null,
				o = null;
			try {
				var i = new ie(t, r)
			} catch (e) {
				return null
			}
			return e.forEach((function(e) {
				i.test(e) && (n && 1 !== o.compare(e) || (o = new J(n = e, r)))
			})), n
		}, t.minVersion = function(e, t) {
			e = new ie(e, t);
			var r = new J("0.0.0");
			if (e.test(r)) return r;
			if (r = new J("0.0.0-0"), e.test(r)) return r;
			r = null;
			for (var n = 0; n < e.set.length; ++n) {
				e.set[n].forEach((function(e) {
					var t = new J(e.semver.version);
					switch (e.operator) {
						case ">":
							0 === t.prerelease.length ? t.patch++ : t.prerelease.push(0), t.raw = t.format();
						case "":
						case ">=":
							r && !Z(r, t) || (r = t);
							break;
						case "<":
						case "<=":
							break;
						default:
							throw new Error("Unexpected operation: " + e.operator)
					}
				}))
			}
			if (r && e.test(r)) return r;
			return null
		}, t.validRange = function(e, t) {
			try {
				return new ie(e, t).range || "*"
			} catch (e) {
				return null
			}
		}, t.ltr = function(e, t, r) {
			return fe(e, t, "<", r)
		}, t.gtr = function(e, t, r) {
			return fe(e, t, ">", r)
		}, t.outside = fe, t.prerelease = function(e, t) {
			var r = F(e, t);
			return r && r.prerelease.length ? r.prerelease : null
		}, t.intersects = function(e, t, r) {
			return e = new ie(e, r), t = new ie(t, r), e.intersects(t)
		}, t.coerce = function(e) {
			if (e instanceof J) return e;
			if ("string" != typeof e) return null;
			var t = e.match(o[O]);
			if (null == t) return null;
			return F(t[1] + "." + (t[2] || "0") + "." + (t[3] || "0"))
		}
	})),
	Ze = (We.SEMVER_SPEC_VERSION, We.re, We.src, We.parse, We.valid, We.clean, We.SemVer, We.inc, We.diff, We.compareIdentifiers,
		We.rcompareIdentifiers, We.major, We.minor, We.patch, We.compare, We.compareLoose, We.rcompare, We.sort, We.rsort, We
		.gt, We.lt, We.eq, We.neq, We.gte, We.lte, We.cmp, We.Comparator, We.Range, We.toComparators, We.satisfies, We.maxSatisfying,
		We.minSatisfying, We.minVersion, We.validRange, We.ltr, We.gtr, We.outside, We.prerelease, We.intersects, We.coerce,
		We.satisfies(process.version, "^6.12.0 || >=8.0.0")),
	Ye = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512"],
	Xe = ["RS256", "RS384", "RS512"],
	Qe = ["HS256", "HS384", "HS512"];
Ze && (Ye.splice(3, 0, "PS256", "PS384", "PS512"), Xe.splice(3, 0, "PS256", "PS384", "PS512"));
var et = /^\s+|\s+$/g,
	tt = /^[-+]0x[0-9a-f]+$/i,
	rt = /^0b[01]+$/i,
	nt = /^0o[0-7]+$/i,
	ot = /^(?:0|[1-9]\d*)$/,
	it = parseInt;

function at(e) {
	return e != e
}

function st(e, t) {
	return function(e, t) {
		for (var r = -1, n = e ? e.length : 0, o = Array(n); ++r < n;) o[r] = t(e[r], r, e);
		return o
	}(t, (function(t) {
		return e[t]
	}))
}
var ct, ut, ft = Object.prototype,
	dt = ft.hasOwnProperty,
	pt = ft.toString,
	lt = ft.propertyIsEnumerable,
	mt = (ct = Object.keys, ut = Object, function(e) {
		return ct(ut(e))
	}),
	ht = Math.max;

function gt(e, t) {
	var r = vt(e) || function(e) {
			return function(e) {
				return St(e) && bt(e)
			}(e) && dt.call(e, "callee") && (!lt.call(e, "callee") || "[object Arguments]" == pt.call(e))
		}(e) ? function(e, t) {
			for (var r = -1, n = Array(e); ++r < e;) n[r] = t(r);
			return n
		}(e.length, String) : [],
		n = r.length,
		o = !!n;
	for (var i in e) !t && !dt.call(e, i) || o && ("length" == i || wt(i, n)) || r.push(i);
	return r
}

function yt(e) {
	if (r = (t = e) && t.constructor, n = "function" == typeof r && r.prototype || ft, t !== n) return mt(e);
	var t, r, n, o = [];
	for (var i in Object(e)) dt.call(e, i) && "constructor" != i && o.push(i);
	return o
}

function wt(e, t) {
	return !!(t = null == t ? 9007199254740991 : t) && ("number" == typeof e || ot.test(e)) && e > -1 && e % 1 == 0 && e <
		t
}
var vt = Array.isArray;

function bt(e) {
	return null != e && function(e) {
		return "number" == typeof e && e > -1 && e % 1 == 0 && e <= 9007199254740991
	}(e.length) && ! function(e) {
		var t = _t(e) ? pt.call(e) : "";
		return "[object Function]" == t || "[object GeneratorFunction]" == t
	}(e)
}

function _t(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}

function St(e) {
	return !!e && "object" == typeof e
}
var Et = function(e, t, r, n) {
		var o;
		e = bt(e) ? e : (o = e) ? st(o, function(e) {
			return bt(e) ? gt(e) : yt(e)
		}(o)) : [], r = r && !n ? function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || St(e) && "[object Symbol]" == pt.call(e)
								}(e)) return NaN;
							if (_t(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = _t(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(et, "");
							var r = rt.test(e);
							return r || nt.test(e) ? it(e.slice(2), r ? 2 : 8) : tt.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				r = t % 1;
			return t == t ? r ? t - r : t : 0
		}(r) : 0;
		var i = e.length;
		return r < 0 && (r = ht(i + r, 0)),
			function(e) {
				return "string" == typeof e || !vt(e) && St(e) && "[object String]" == pt.call(e)
			}(e) ? r <= i && e.indexOf(t, r) > -1 : !!i && function(e, t, r) {
				if (t != t) return function(e, t, r, n) {
					for (var o = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o;)
						if (t(e[i], i, e)) return i;
					return -1
				}(e, at, r);
				for (var n = r - 1, o = e.length; ++n < o;)
					if (e[n] === t) return n;
				return -1
			}(e, t, r) > -1
	},
	kt = Object.prototype.toString;
var xt = function(e) {
		return !0 === e || !1 === e || function(e) {
			return !!e && "object" == typeof e
		}(e) && "[object Boolean]" == kt.call(e)
	},
	jt = /^\s+|\s+$/g,
	Tt = /^[-+]0x[0-9a-f]+$/i,
	It = /^0b[01]+$/i,
	Ot = /^0o[0-7]+$/i,
	Ct = parseInt,
	At = Object.prototype.toString;

function Rt(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}
var Pt = function(e) {
		return "number" == typeof e && e == function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || function(e) {
										return !!e && "object" == typeof e
									}(e) && "[object Symbol]" == At.call(e)
								}(e)) return NaN;
							if (Rt(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = Rt(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(jt, "");
							var r = It.test(e);
							return r || Ot.test(e) ? Ct(e.slice(2), r ? 2 : 8) : Tt.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				r = t % 1;
			return t == t ? r ? t - r : t : 0
		}(e)
	},
	$t = Object.prototype.toString;
var Nt = function(e) {
	return "number" == typeof e || function(e) {
		return !!e && "object" == typeof e
	}(e) && "[object Number]" == $t.call(e)
};
var Bt = Function.prototype,
	Mt = Object.prototype,
	Dt = Bt.toString,
	Lt = Mt.hasOwnProperty,
	Kt = Dt.call(Object),
	Vt = Mt.toString,
	qt = function(e, t) {
		return function(r) {
			return e(t(r))
		}
	}(Object.getPrototypeOf, Object);
var Ut = function(e) {
		if (! function(e) {
				return !!e && "object" == typeof e
			}(e) || "[object Object]" != Vt.call(e) || function(e) {
				var t = !1;
				if (null != e && "function" != typeof e.toString) try {
					t = !!(e + "")
				} catch (e) {}
				return t
			}(e)) return !1;
		var t = qt(e);
		if (null === t) return !0;
		var r = Lt.call(t, "constructor") && t.constructor;
		return "function" == typeof r && r instanceof r && Dt.call(r) == Kt
	},
	Ht = Object.prototype.toString,
	Ft = Array.isArray;
var Jt = function(e) {
		return "string" == typeof e || !Ft(e) && function(e) {
			return !!e && "object" == typeof e
		}(e) && "[object String]" == Ht.call(e)
	},
	Gt = /^\s+|\s+$/g,
	zt = /^[-+]0x[0-9a-f]+$/i,
	Wt = /^0b[01]+$/i,
	Zt = /^0o[0-7]+$/i,
	Yt = parseInt,
	Xt = Object.prototype.toString;

function Qt(e, t) {
	var r;
	if ("function" != typeof t) throw new TypeError("Expected a function");
	return e = function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || function(e) {
										return !!e && "object" == typeof e
									}(e) && "[object Symbol]" == Xt.call(e)
								}(e)) return NaN;
							if (er(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = er(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(Gt, "");
							var r = Wt.test(e);
							return r || Zt.test(e) ? Yt(e.slice(2), r ? 2 : 8) : zt.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				r = t % 1;
			return t == t ? r ? t - r : t : 0
		}(e),
		function() {
			return --e > 0 && (r = t.apply(this, arguments)), e <= 1 && (t = void 0), r
		}
}

function er(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}
var tr = function(e) {
		return Qt(2, e)
	},
	rr = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "HS256", "HS384", "HS512", "none"];
Ze && rr.splice(3, 0, "PS256", "PS384", "PS512");
var nr = {
		expiresIn: {
			isValid: function(e) {
				return Pt(e) || Jt(e) && e
			},
			message: '"expiresIn" should be a number of seconds or string representing a timespan'
		},
		notBefore: {
			isValid: function(e) {
				return Pt(e) || Jt(e) && e
			},
			message: '"notBefore" should be a number of seconds or string representing a timespan'
		},
		audience: {
			isValid: function(e) {
				return Jt(e) || Array.isArray(e)
			},
			message: '"audience" must be a string or array'
		},
		algorithm: {
			isValid: Et.bind(null, rr),
			message: '"algorithm" must be a valid string enum value'
		},
		header: {
			isValid: Ut,
			message: '"header" must be an object'
		},
		encoding: {
			isValid: Jt,
			message: '"encoding" must be a string'
		},
		issuer: {
			isValid: Jt,
			message: '"issuer" must be a string'
		},
		subject: {
			isValid: Jt,
			message: '"subject" must be a string'
		},
		jwtid: {
			isValid: Jt,
			message: '"jwtid" must be a string'
		},
		noTimestamp: {
			isValid: xt,
			message: '"noTimestamp" must be a boolean'
		},
		keyid: {
			isValid: Jt,
			message: '"keyid" must be a string'
		},
		mutatePayload: {
			isValid: xt,
			message: '"mutatePayload" must be a boolean'
		}
	},
	or = {
		iat: {
			isValid: Nt,
			message: '"iat" should be a number of seconds'
		},
		exp: {
			isValid: Nt,
			message: '"exp" should be a number of seconds'
		},
		nbf: {
			isValid: Nt,
			message: '"nbf" should be a number of seconds'
		}
	};

function ir(e, t, r, n) {
	if (!Ut(r)) throw new Error('Expected "' + n + '" to be a plain object.');
	Object.keys(r).forEach((function(o) {
		var i = e[o];
		if (i) {
			if (!i.isValid(r[o])) throw new Error(i.message)
		} else if (!t) throw new Error('"' + o + '" is not allowed in "' + n + '"')
	}))
}
var ar = {
		audience: "aud",
		issuer: "iss",
		subject: "sub",
		jwtid: "jti"
	},
	sr = ["expiresIn", "notBefore", "noTimestamp", "audience", "issuer", "subject", "jwtid"],
	cr = function(e, t, r, n) {
		var o;
		if ("function" != typeof r || n || (n = r, r = {}), r || (r = {}), r = Object.assign({}, r), o = n || function(e, t) {
				if (e) throw e;
				return t
			}, r.clockTimestamp && "number" != typeof r.clockTimestamp) return o(new Me("clockTimestamp must be a number"));
		if (void 0 !== r.nonce && ("string" != typeof r.nonce || "" === r.nonce.trim())) return o(new Me(
			"nonce must be a non-empty string"));
		var i = r.clockTimestamp || Math.floor(Date.now() / 1e3);
		if (!e) return o(new Me("jwt must be provided"));
		if ("string" != typeof e) return o(new Me("jwt must be a string"));
		var a, s = e.split(".");
		if (3 !== s.length) return o(new Me("jwt malformed"));
		try {
			a = Ne(e, {
				complete: !0
			})
		} catch (e) {
			return o(e)
		}
		if (!a) return o(new Me("invalid token"));
		var c, u = a.header;
		if ("function" == typeof t) {
			if (!n) return o(new Me("verify must be called asynchronous if secret or public key is provided as a callback"));
			c = t
		} else c = function(e, r) {
			return r(null, t)
		};
		return c(u, (function(t, n) {
			if (t) return o(new Me("error in secret or public key callback: " + t.message));
			var c, f = "" !== s[2].trim();
			if (!f && n) return o(new Me("jwt signature is required"));
			if (f && !n) return o(new Me("secret or public key must be provided"));
			if (f || r.algorithms || (r.algorithms = ["none"]), r.algorithms || (r.algorithms = ~n.toString().indexOf(
					"BEGIN CERTIFICATE") || ~n.toString().indexOf("BEGIN PUBLIC KEY") ? Ye : ~n.toString().indexOf(
					"BEGIN RSA PUBLIC KEY") ? Xe : Qe), !~r.algorithms.indexOf(a.header.alg)) return o(new Me("invalid algorithm"));
			try {
				c = $e.verify(e, a.header.alg, n)
			} catch (e) {
				return o(e)
			}
			if (!c) return o(new Me("invalid signature"));
			var d = a.payload;
			if (void 0 !== d.nbf && !r.ignoreNotBefore) {
				if ("number" != typeof d.nbf) return o(new Me("invalid nbf value"));
				if (d.nbf > i + (r.clockTolerance || 0)) return o(new Le("jwt not active", new Date(1e3 * d.nbf)))
			}
			if (void 0 !== d.exp && !r.ignoreExpiration) {
				if ("number" != typeof d.exp) return o(new Me("invalid exp value"));
				if (i >= d.exp + (r.clockTolerance || 0)) return o(new Ve("jwt expired", new Date(1e3 * d.exp)))
			}
			if (r.audience) {
				var p = Array.isArray(r.audience) ? r.audience : [r.audience];
				if (!(Array.isArray(d.aud) ? d.aud : [d.aud]).some((function(e) {
						return p.some((function(t) {
							return t instanceof RegExp ? t.test(e) : t === e
						}))
					}))) return o(new Me("jwt audience invalid. expected: " + p.join(" or ")))
			}
			if (r.issuer && ("string" == typeof r.issuer && d.iss !== r.issuer || Array.isArray(r.issuer) && -1 === r.issuer.indexOf(
					d.iss))) return o(new Me("jwt issuer invalid. expected: " + r.issuer));
			if (r.subject && d.sub !== r.subject) return o(new Me("jwt subject invalid. expected: " + r.subject));
			if (r.jwtid && d.jti !== r.jwtid) return o(new Me("jwt jwtid invalid. expected: " + r.jwtid));
			if (r.nonce && d.nonce !== r.nonce) return o(new Me("jwt nonce invalid. expected: " + r.nonce));
			if (r.maxAge) {
				if ("number" != typeof d.iat) return o(new Me("iat required when maxAge is specified"));
				var l = ze(r.maxAge, d.iat);
				if (void 0 === l) return o(new Me(
					'"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
				if (i >= l + (r.clockTolerance || 0)) return o(new Ve("maxAge exceeded", new Date(1e3 * l)))
			}
			if (!0 === r.complete) {
				var m = a.signature;
				return o(null, {
					header: u,
					payload: d,
					signature: m
				})
			}
			return o(null, d)
		}))
	},
	ur = function(e, t, r, n) {
		"function" == typeof r ? (n = r, r = {}) : r = r || {};
		var o = "object" == typeof e && !Buffer.isBuffer(e),
			i = Object.assign({
				alg: r.algorithm || "HS256",
				typ: o ? "JWT" : void 0,
				kid: r.keyid
			}, r.header);

		function a(e) {
			if (n) return n(e);
			throw e
		}
		if (!t && "none" !== r.algorithm) return a(new Error("secretOrPrivateKey must have a value"));
		if (void 0 === e) return a(new Error("payload is required"));
		if (o) {
			try {
				! function(e) {
					ir(or, !0, e, "payload")
				}(e)
			} catch (e) {
				return a(e)
			}
			r.mutatePayload || (e = Object.assign({}, e))
		} else {
			var s = sr.filter((function(e) {
				return void 0 !== r[e]
			}));
			if (s.length > 0) return a(new Error("invalid " + s.join(",") + " option for " + typeof e + " payload"))
		}
		if (void 0 !== e.exp && void 0 !== r.expiresIn) return a(new Error(
			'Bad "options.expiresIn" option the payload already has an "exp" property.'));
		if (void 0 !== e.nbf && void 0 !== r.notBefore) return a(new Error(
			'Bad "options.notBefore" option the payload already has an "nbf" property.'));
		try {
			! function(e) {
				ir(nr, !1, e, "options")
			}(r)
		} catch (e) {
			return a(e)
		}
		var c = e.iat || Math.floor(Date.now() / 1e3);
		if (r.noTimestamp ? delete e.iat : o && (e.iat = c), void 0 !== r.notBefore) {
			try {
				e.nbf = ze(r.notBefore, c)
			} catch (e) {
				return a(e)
			}
			if (void 0 === e.nbf) return a(new Error(
				'"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'))
		}
		if (void 0 !== r.expiresIn && "object" == typeof e) {
			try {
				e.exp = ze(r.expiresIn, c)
			} catch (e) {
				return a(e)
			}
			if (void 0 === e.exp) return a(new Error(
				'"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'))
		}
		Object.keys(ar).forEach((function(t) {
			var n = ar[t];
			if (void 0 !== r[t]) {
				if (void 0 !== e[n]) return a(new Error('Bad "options.' + t + '" option. The payload already has an "' + n +
					'" property.'));
				e[n] = r[t]
			}
		}));
		var u = r.encoding || "utf8";
		if ("function" != typeof n) return $e.sign({
			header: i,
			payload: e,
			secret: t,
			encoding: u
		});
		n = n && tr(n), $e.createSign({
			header: i,
			privateKey: t,
			payload: e,
			encoding: u
		}).once("error", n).once("done", (function(e) {
			n(null, e)
		}))
	};

function fr() {
	const e = t.createHash("md5"),
		r = /MicroMessenger/i.test(__ctx__.CLIENTUA) ? __ctx__.CLIENTUA.replace(/(MicroMessenger\S+).*/i, "$1") : __ctx__.CLIENTUA;
	return e.update(r), e.digest("hex")
}
const dr = {
	createToken: function(e) {
		const t = O(),
			r = {
				uid: e._id
			};
		t.bindTokenToDevice && (r.clientId = fr());
		return {
			token: ur(r, t.tokenSecret, {
				expiresIn: t.tokenExpiresIn
			}),
			tokenExpired: Date.now() + 1e3 * t.tokenExpiresIn
		}
	},
	refreshToken: function() {},
	checkToken: async function(e) {
		const t = O();
		try {
			const r = cr(e, t.tokenSecret);
			if (t.bindTokenToDevice && r.clientId !== fr()) return {
				code: 30201,
				msg: "token不合法，请重新登录"
			};
			const n = await j.doc(r.uid).get();
			if (!n.data || 0 === n.data.length || !n.data[0].token) return {
				code: 30202,
				msg: "token不合法，请重新登录"
			};
			const o = n.data[0];
			if (1 === o.status) return {
				code: 10001,
				msg: "账号已禁用"
			};
			let i = o.token;
			return "string" == typeof i && (i = [i]), -1 === i.indexOf(e) ? {
				code: 30202,
				msg: "token不合法，请重新登录"
			} : (S("checkToken payload", r), {
				code: 0,
				msg: "token校验通过",
				...r,
				userInfo: o
			})
		} catch (e) {
			return "TokenExpiredError" === e.name ? {
				code: 30203,
				msg: "token已过期，请重新登录",
				err: e
			} : {
				code: 30204,
				msg: "非法token",
				err: e
			}
		}
	},
	getExpiredToken(e) {
		const t = O(),
			r = [];
		return e.forEach(e => {
			try {
				cr(e, t.tokenSecret)
			} catch (t) {
				r.push(e)
			}
		}), r
	}
};

function pr(e = 6) {
	const t = ["2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N",
		"P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
	];
	let r = "";
	for (let n = 0; n < e; n++) r += t[Math.floor(Math.random() * t.length)];
	return r
}
async function lr({
	inviteCode: e
}) {
	let t, r = 10;
	e ? (r = 1, t = e) : t = pr();
	let n = !1;
	try {
		for (; r > 0 && !n;) {
			r -= 1;
			if (0 === (await j.where({
					invite_code: t
				}).count()).total) {
				n = !0;
				break
			}
			t = pr()
		}
		return n ? {
			code: 0,
			inviteCode: t
		} : e ? {
			code: 80401,
			msg: "邀请码重复，设置失败"
		} : {
			code: 80402,
			msg: "邀请码设置失败稍后再试"
		}
	} catch (e) {
		return {
			code: 90001,
			msg: "数据库读写异常"
		}
	}
}
async function mr(e) {
	let t;
	const {
		my_invite_code: r
	} = e;
	if (!O().autoSetInviteCode && !r) return t = await j.add(e), {
		code: 0,
		msg: "注册成功",
		result: t
	};
	const n = await lr({
		inviteCode: r
	});
	return n.code > 0 ? n : (e.my_invite_code = n.inviteCode, t = await j.add(e), {
		code: 0,
		msg: "邀请码设置成功",
		result: t
	})
}
const hr = uniCloud.database();
async function gr(e) {
	if (1 === e.status) return {
		code: 10001,
		msg: "账号已禁用"
	};
	S("过期token清理");
	let t = e.token || [];
	"string" == typeof t && (t = [t]);
	const r = dr.getExpiredToken(t);
	return t = t.filter(e => -1 === r.indexOf(e)), e.token = t, {
		code: 0,
		user: e
	}
}
const yr = uniCloud.database();
async function wr({
	name: e,
	url: t,
	data: r,
	options: n,
	defaultOptions: o
}) {
	let i = {};
	const a = b(Object.assign({}, r));
	a && a.access_token && delete a.access_token;
	try {
		n = Object.assign({}, o, n, {
			data: a
		}), i = await uniCloud.httpclient.request(t, n)
	} catch (t) {
		return function(e, t) {
			throw new c({
				code: t.code || -2,
				message: t.message || e + " fail"
			})
		}(e, t)
	}
	let s = i.data;
	const u = i.headers["content-type"];
	if (!Buffer.isBuffer(s) || 0 !== u.indexOf("text/plain") && 0 !== u.indexOf("application/json")) Buffer.isBuffer(s) &&
		(s = {
			buffer: s,
			contentType: u
		});
	else try {
		s = JSON.parse(s.toString())
	} catch (e) {
		s = s.toString()
	}
	return v(function(e, t) {
		if (t.errcode) throw new c({
			code: t.errcode || -2,
			message: t.errmsg || e + " fail"
		});
		return delete t.errcode, delete t.errmsg, { ...t,
			errMsg: e + " ok",
			errCode: 0
		}
	}(e, s || {
		errCode: -2,
		errMsg: "Request failed"
	}))
}

function vr(e, t) {
	let r = "";
	if (t && t.accessToken) {
		r = `${e.indexOf("?")>-1?"&":"?"}access_token=${t.accessToken}`
	}
	return `${e}${r}`
}
class br {
	constructor(e) {
		this.options = Object.assign({
			baseUrl: "https://api.weixin.qq.com",
			timeout: 5e3
		}, e)
	}
	async _requestWxOpenapi({
		name: e,
		url: t,
		data: r,
		options: n
	}) {
		const o = {
			method: "GET",
			dataType: "json",
			dataAsQueryString: !0,
			timeout: this.options.timeout
		};
		return await wr({
			name: "auth." + e,
			url: `${this.options.baseUrl}${vr(t,r)}`,
			data: r,
			options: n,
			defaultOptions: o
		})
	}
	async code2Session(e) {
		return await this._requestWxOpenapi({
			name: "code2Session",
			url: "/sns/jscode2session",
			data: {
				grant_type: "authorization_code",
				appid: this.options.appId,
				secret: this.options.secret,
				js_code: e
			}
		})
	}
	async getOauthAccessToken(e) {
		return await this._requestWxOpenapi({
			name: "getOauthAccessToken",
			url: "/sns/oauth2/access_token",
			data: {
				grant_type: "authorization_code",
				appid: this.options.appId,
				secret: this.options.secret,
				code: e
			}
		})
	}
}
const _r = {
	RSA: "RSA-SHA1",
	RSA2: "RSA-SHA256"
};
var Sr = {
	code2Session: {
		returnValue: {
			openid: "userId"
		}
	}
};
class Er extends class {
	constructor(e = {}) {
		if (!e.appId) throw new Error("appId required");
		if (!e.privateKey) throw new Error("privateKey required");
		const t = {
			gateway: "https://openapi.alipay.com/gateway.do",
			timeout: 5e3,
			charset: "utf-8",
			version: "1.0",
			signType: "RSA2",
			timeOffset: -(new Date).getTimezoneOffset() / 60,
			keyType: "PKCS8"
		};
		e.sandbox && (e.gateway = "https://openapi.alipaydev.com/gateway.do"), this.options = Object.assign({}, t, e);
		const r = "PKCS8" === this.options.keyType ? "PRIVATE KEY" : "RSA PRIVATE KEY";
		this.options.privateKey = this._formatKey(this.options.privateKey, r), this.options.alipayPublicKey && (this.options
			.alipayPublicKey = this._formatKey(this.options.alipayPublicKey, "PUBLIC KEY"))
	}
	_formatKey(e, t) {
		return `-----BEGIN ${t}-----\n${e}\n-----END ${t}-----`
	}
	_formatUrl(e, t) {
		let r = e;
		const n = ["app_id", "method", "format", "charset", "sign_type", "sign", "timestamp", "version", "notify_url",
			"return_url", "auth_token", "app_auth_token"
		];
		for (const e in t)
			if (n.indexOf(e) > -1) {
				const n = encodeURIComponent(t[e]);
				r = `${r}${r.includes("?")?"&":"?"}${e}=${n}`, delete t[e]
			} return {
			execParams: t,
			url: r
		}
	}
	_getSign(e, r) {
		const n = r.bizContent || null;
		delete r.bizContent;
		const o = Object.assign({
			method: e,
			appId: this.options.appId,
			charset: this.options.charset,
			version: this.options.version,
			signType: this.options.signType,
			timestamp: _((i = this.options.timeOffset, new Date(Date.now() + 6e4 * ((new Date).getTimezoneOffset() + 60 * (i ||
				0)))))
		}, r);
		var i;
		n && (o.bizContent = JSON.stringify(b(n)));
		const a = b(o),
			s = Object.keys(a).sort().map(e => {
				let t = a[e];
				return "[object String]" !== Array.prototype.toString.call(t) && (t = JSON.stringify(t)), `${e}=${t}`
			}).join("&"),
			c = t.createSign(_r[this.options.signType]).update(s, "utf8").sign(this.options.privateKey, "base64");
		return Object.assign(a, {
			sign: c
		})
	}
	async _exec(e, t = {}, r = {}) {
		const n = this._getSign(e, t),
			{
				url: o,
				execParams: i
			} = this._formatUrl(this.options.gateway, n),
			{
				status: a,
				data: s
			} = await uniCloud.httpclient.request(o, {
				method: "POST",
				data: i,
				dataType: "text",
				timeout: this.options.timeout
			});
		if (200 !== a) throw new Error("request fail");
		const c = JSON.parse(s),
			u = e.replace(/\./g, "_") + "_response",
			f = c[u],
			d = c.error_response;
		if (f) {
			if (!r.validateSign || this._checkResponseSign(s, u)) {
				if (!f.code || "10000" === f.code) {
					return {
						errCode: 0,
						errMsg: f.msg || "",
						...v(f)
					}
				}
				const e = f.sub_code ? `${f.sub_code} ${f.sub_msg}` : "" + (f.msg || "unkonwn error");
				throw new Error(e)
			}
			throw new Error("返回结果签名错误")
		}
		if (d) throw new Error(d.sub_msg || d.msg || "接口返回错误");
		throw new Error("request fail")
	}
	_checkResponseSign(e, r) {
		if (!this.options.alipayPublicKey || "" === this.options.alipayPublicKey) return console.warn(
			"options.alipayPublicKey is empty"), !0;
		if (!e) return !1;
		const n = this._getSignStr(e, r),
			o = JSON.parse(e).sign,
			i = t.createVerify(_r[this.options.signType]);
		return i.update(n, "utf8"), i.verify(this.options.alipayPublicKey, o, "base64")
	}
	_getSignStr(e, t) {
		let r = e.trim();
		const n = e.indexOf(t + '"'),
			o = e.lastIndexOf('"sign"');
		return r = r.substr(n + t.length + 1), r = r.substr(0, o), r = r.replace(/^[^{]*{/g, "{"), r = r.replace(
			/\}([^}]*)$/g, "}"), r
	}
	_notifyRSACheck(e, r, n) {
		const o = Object.keys(e).sort().filter(e => e).map(t => {
			let r = e[t];
			return "[object String]" !== Array.prototype.toString.call(r) && (r = JSON.stringify(r)),
				`${t}=${decodeURIComponent(r)}`
		}).join("&");
		return t.createVerify(_r[n]).update(o, "utf8").verify(this.options.alipayPublicKey, r, "base64")
	}
	_checkNotifySign(e) {
		const t = e.sign;
		if (!this.options.alipayPublicKey || !t) return !1;
		const r = e.sign_type || this.options.signType || "RSA2",
			n = { ...e
			};
		delete n.sign, n.sign_type = r;
		return !!this._notifyRSACheck(n, t, r) || (delete n.sign_type, this._notifyRSACheck(n, t, r))
	}
	_verifyNotify(e) {
		if (!e.headers) throw new Error("通知格式不正确");
		let t;
		for (const r in e.headers) "content-type" === r.toLowerCase() && (t = e.headers[r]);
		if (!1 !== e.isBase64Encoded && -1 === t.indexOf("application/x-www-form-urlencoded")) throw new Error("通知格式不正确");
		const r = s.parse(e.body);
		if (this._checkNotifySign(r)) return v(r);
		throw new Error("通知验签未通过")
	}
} {
	constructor(e) {
		super(e), this._protocols = Sr
	}
	async code2Session(e) {
		return await this._exec("alipay.system.oauth.token", {
			grantType: "authorization_code",
			code: e
		})
	}
}
var kr = function(e = {}) {
		return e.clientType = e.clientType || __ctx__.PLATFORM, e.appId = e.appid, e.secret = e.appsecret, k(br, e)
	},
	xr = function(e = {}) {
		return e.clientType = e.clientType || __ctx__.PLATFORM, e.appId = e.appid, k(Er, e)
	};

function jr({
	platform: e
}) {
	const t = O(e),
		r = e || __ctx__.PLATFORM;
	if (!t.oauth || !t.oauth.weixin) throw new Error(`请在公用模块uni-id的config.json或init方法中添加${r}平台微信登录配置项`);
	["appid", "appsecret"].forEach(e => {
		if (!t.oauth.weixin[e]) throw new Error(`请在公用模块uni-id的config.json或init方法中添加配置项：${r}.oauth.weixin.${e}`)
	});
	return kr(t.oauth.weixin)
}
const Tr = uniCloud.database();
const Ir = uniCloud.database();
const Or = uniCloud.database();

function Cr({
	platform: e
}) {
	const t = O(e),
		r = e || __ctx__.PLATFORM;
	if (!t.oauth || !t.oauth.alipay) throw new Error(`请在公用模块uni-id的config.json或init方法中添加${r}平台支付宝登录配置项`);
	["appid", "privateKey"].forEach(e => {
		if (!t.oauth.alipay[e]) throw new Error(`请在公用模块uni-id的config.json或init方法中添加配置项：${r}.oauth.alipay.${e}`)
	});
	return xr(t.oauth.alipay)
}
const Ar = uniCloud.database();
const Rr = uniCloud.database();
const Pr = uniCloud.database();
async function $r({
	mobile: e,
	email: t,
	code: r,
	expiresIn: n,
	type: o
}) {
	if (!e && !t || e && t) return {
		code: 50101,
		msg: "手机号和邮箱必须且只能给定其中一个"
	};
	n || (n = 180);
	const i = Date.now(),
		a = {
			mobile: e,
			email: t,
			type: o,
			code: r,
			state: 0,
			ip: __ctx__.CLIENTIP,
			created_at: i,
			expired_at: i + 1e3 * n
		};
	try {
		return S("addRes", await T.add(a)), {
			code: 0,
			mobile: e,
			email: t
		}
	} catch (e) {
		return {
			code: 90001,
			msg: "记录验证信息失败"
		}
	}
}
async function Nr({
	mobile: e,
	email: t,
	code: r,
	type: n
}) {
	if (!e && !t || e && t) return {
		code: 50201,
		msg: "手机号和邮箱必须且只能给定其中一个"
	};
	const o = Pr.command,
		i = Date.now(),
		a = {
			mobile: e,
			email: t,
			type: n,
			code: r,
			state: 0,
			expired_at: o.gt(i)
		};
	try {
		const e = await T.where(a).orderBy("created_at", "desc").limit(1).get();
		if (S("verifyRecord:", e), e && e.data && e.data.length > 0) {
			const t = e.data[0];
			return S("upRes", await T.doc(t._id).update({
				state: 1
			})), {
				code: 0,
				msg: "验证通过"
			}
		}
		return {
			code: 50202,
			msg: "验证码错误或已失效"
		}
	} catch (e) {
		return {
			code: 90001,
			msg: "验证码校验失败"
		}
	}
}
const Br = uniCloud.database();
const Mr = uniCloud.database();
const Dr = uniCloud.database().command;
var Lr = {
	init: function(e) {
		I = e
	},
	register: async function(e) {
		const t = [],
			r = [{
				name: "username",
				desc: "用户名"
			}, {
				name: "email",
				desc: "邮箱",
				extraCond: {
					email_confirmed: 1
				}
			}, {
				name: "mobile",
				desc: "手机号",
				extraCond: {
					mobile_confirmed: 1
				}
			}];
		if (r.forEach(r => {
				const n = r.name;
				e[n] && e[n].trim() && t.push({
					[n]: e[n],
					...r.extraCond
				})
			}), 0 === t.length) return {
			code: 20101,
			msg: "用户名、邮箱、手机号不可同时为空"
		};
		const {
			username: n,
			email: o,
			mobile: i,
			myInviteCode: a
		} = e, s = hr.command;
		try {
			const c = await j.where(s.or(...t)).get();
			if (S("userInDB:", c), c && c.data.length > 0) {
				const t = c.data[0];
				for (let n = 0; n < r.length; n++) {
					const o = r[n];
					let i = !0;
					if (o.extraCond && (i = Object.keys(o.extraCond).every(e => t[e] === o.extraCond[e])), t[o.name] === e[o.name] &&
						i) return {
						code: 20102,
						msg: o.desc + "已存在"
					}
				}
			}
			e.password = A(e.password), e.register_date = (new Date).getTime(), e.register_ip = __ctx__.CLIENTIP, a && (e.my_invite_code =
				a);
			const u = await mr(e);
			if (u.code > 0) return u;
			const f = u.result;
			S("addRes", f);
			const d = f.id,
				{
					token: p,
					tokenExpired: l
				} = dr.createToken({
					_id: d
				});
			return await j.doc(d).update({
				token: [p]
			}), {
				code: 0,
				uid: d,
				username: n,
				email: o,
				mobile: i,
				msg: "注册成功",
				token: p,
				tokenExpired: l
			}
		} catch (e) {
			return {
				code: 90001,
				msg: "数据库写入异常"
			}
		}
	},
	login: async function({
		username: e,
		password: t,
		queryField: r = []
	}) {
		const n = yr.command,
			o = [];
		r && r.length || (r = ["username"]);
		const i = {
			email: {
				email_confirmed: 1
			},
			mobile: {
				mobile_confirmed: 1
			}
		};
		r.forEach(t => {
			o.push({
				[t]: e,
				...i[t]
			})
		});
		const a = await j.where(n.or(...o)).limit(1).get(),
			s = __ctx__.CLIENTIP,
			{
				passwordErrorLimit: c,
				passwordErrorRetryTime: u
			} = O();
		if (S("userInDB:", a), !(a && a.data && a.data.length > 0)) return {
			code: 10101,
			msg: "用户不存在"
		}; {
			const r = a.data[0],
				n = r.password;
			let o = r.login_ip_limit || [];
			o = o.filter(e => e.last_error_time > Date.now() - 1e3 * u);
			let i = o.find(e => e.ip === s);
			if (i && i.error_times >= c) return {
				code: 10103,
				msg: `密码错误次数过多，请${C(i.last_error_time+1e3*u)}再试。`
			};
			if (A(t) !== n) return i ? (i.error_times++, i.last_error_time = Date.now()) : (i = {
				ip: s,
				error_times: 1,
				last_error_time: Date.now()
			}, o.push(i)), await j.doc(r._id).update({
				login_ip_limit: o
			}), {
				code: 10102,
				msg: "密码错误"
			};
			try {
				const t = await gr(r);
				if (0 !== t.code) return t;
				const n = t.user.token;
				S("开始修改最后登录时间");
				const {
					token: i,
					tokenExpired: a
				} = dr.createToken(r);
				S("token", i), n.push(i);
				return S("upRes", await j.doc(r._id).update({
					last_login_date: (new Date).getTime(),
					last_login_ip: s,
					token: n,
					login_ip_limit: o
				})), {
					code: 0,
					token: i,
					uid: r._id,
					username: e,
					userInfo: r,
					msg: "登录成功",
					tokenExpired: a
				}
			} catch (e) {
				return S("写入异常：", e), {
					code: 90001,
					msg: "数据库写入异常"
				}
			}
		}
	},
	loginByWeixin: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		const r = t.platform || __ctx__.PLATFORM,
			{
				openid: n,
				unionid: o,
				sessionKey: i
			} = await jr({
				platform: r
			})["mp-weixin" === r ? "code2Session" : "getOauthAccessToken"](t.code);
		if (!n) return {
			code: 10401,
			msg: "获取openid失败"
		};
		const a = Tr.command,
			s = [{
				wx_openid: {
					[r]: n
				}
			}];
		o && s.push({
			wx_unionid: o
		});
		const c = await j.where(a.or(...s)).get();
		if (c && c.data && c.data.length > 0) {
			const e = c.data[0];
			try {
				const t = await gr(e);
				if (0 !== t.code) return t;
				const a = t.user,
					s = a.token;
				S("开始修改最后登录时间，写入unionid（可能不存在）和openid");
				const {
					token: c,
					tokenExpired: u
				} = dr.createToken(e);
				S("token", c), s.push(c);
				const f = {
					last_login_date: (new Date).getTime(),
					last_login_ip: __ctx__.CLIENTIP,
					token: s,
					wx_openid: {
						[r]: n
					}
				};
				o && (f.wx_unionid = o);
				return S("upRes", await j.doc(e._id).update(f)), {
					code: 0,
					msg: "登录成功",
					token: c,
					tokenExpired: u,
					uid: e._id,
					username: e.username,
					openid: n,
					unionid: o,
					sessionKey: i,
					userInfo: e,
					type: "login",
					mobileConfirmed: 1 === a.mobile_confirmed,
					emailConfirmed: 1 === a.email_confirmed
				}
			} catch (e) {
				return S("写入异常：", e), {
					code: 90001,
					msg: "数据库写入异常"
				}
			}
		} else try {
			const e = {
					register_date: (new Date).getTime(),
					register_ip: __ctx__.CLIENTIP,
					wx_openid: {
						[r]: n
					},
					wx_unionid: o
				},
				a = t.myInviteCode;
			a && (e.my_invite_code = a);
			const s = await mr(e);
			if (s.code > 0) return s;
			const c = s.result.id,
				{
					token: u,
					tokenExpired: f
				} = dr.createToken({
					_id: c
				});
			return await j.doc(c).update({
				token: [u]
			}), {
				code: 0,
				msg: "登录成功",
				token: u,
				tokenExpired: f,
				uid: c,
				openid: n,
				unionid: o,
				sessionKey: i,
				type: "register",
				mobileConfirmed: !1,
				emailConfirmed: !1
			}
		} catch (e) {
			return S("写入异常：", e), {
				code: 90001,
				msg: "数据库写入异常"
			}
		}
	},
	bindWeixin: async function({
		uid: e,
		code: t,
		platform: r
	}) {
		const n = r || __ctx__.PLATFORM,
			{
				openid: o,
				unionid: i
			} = await jr({
				platform: n
			})["mp-weixin" === n ? "code2Session" : "getOauthAccessToken"](t);
		if (!o) return {
			code: 60301,
			msg: "获取openid失败"
		};
		const a = Ir.command,
			s = [{
				wx_openid: {
					[n]: o
				}
			}];
		i && s.push({
			wx_unionid: i
		});
		const c = await j.where(a.or(...s)).get();
		if (c && c.data && c.data.length > 0) return {
			code: 60302,
			msg: "微信绑定失败，此微信账号已被绑定"
		};
		try {
			const t = {
				wx_openid: {
					[n]: o
				}
			};
			return i && (t.wx_unionid = i), await j.doc(e).update(t), {
				code: 0,
				msg: "绑定成功"
			}
		} catch (e) {
			return S("写入异常：", e), {
				code: 90001,
				msg: "数据库写入异常"
			}
		}
	},
	unbindWeixin: async function(e) {
		try {
			const t = Or.command,
				r = await j.doc(e).update({
					wx_openid: t.remove(),
					wx_unionid: t.remove()
				});
			return S("upRes:", r), 1 === r.updated ? {
				code: 0,
				msg: "微信解绑成功"
			} : {
				code: 70301,
				msg: "微信解绑失败，请稍后再试"
			}
		} catch (e) {
			return S("写入异常：", e), {
				code: 90001,
				msg: "数据库写入异常"
			}
		}
	},
	loginByAlipay: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		const r = t.platform || __ctx__.PLATFORM,
			{
				openid: n
			} = await Cr({
				platform: r
			}).code2Session(t.code);
		if (!n) return {
			code: 10501,
			msg: "获取openid失败"
		};
		const o = await j.where({
			ali_openid: n
		}).get();
		if (o && o.data && o.data.length > 0) {
			const e = o.data[0];
			try {
				const t = await gr(e);
				if (0 !== t.code) return t;
				const r = t.user,
					o = r.token;
				S("开始修改最后登录时间，写入openid");
				const {
					token: i,
					tokenExpired: a
				} = dr.createToken(e);
				S("token", i), o.push(i);
				return S("upRes", await j.doc(e._id).update({
					last_login_date: (new Date).getTime(),
					last_login_ip: __ctx__.CLIENTIP,
					token: o
				})), {
					code: 0,
					msg: "登录成功",
					token: i,
					uid: e._id,
					username: e.username,
					openid: n,
					type: "login",
					userInfo: e,
					tokenExpired: a,
					mobileConfirmed: 1 === r.mobile_confirmed,
					emailConfirmed: 1 === r.email_confirmed
				}
			} catch (e) {
				return S("写入异常：", e), {
					code: 90001,
					msg: "数据库写入异常"
				}
			}
		} else try {
			const e = {
					register_date: (new Date).getTime(),
					register_ip: __ctx__.CLIENTIP,
					ali_openid: n
				},
				r = t.myInviteCode;
			r && (e.my_invite_code = r);
			const o = await mr(e);
			if (o.code > 0) return o;
			const i = o.result,
				a = i.id,
				{
					token: s,
					tokenExpired: c
				} = dr.createToken({
					_id: a
				});
			return await j.doc(a).update({
				token: [s]
			}), {
				code: 0,
				msg: "登录成功",
				token: s,
				uid: i.id,
				openid: n,
				type: "register",
				tokenExpired: c,
				mobileConfirmed: !1,
				emailConfirmed: !1
			}
		} catch (e) {
			return S("写入异常：", e), {
				code: 90001,
				msg: "数据库写入异常"
			}
		}
	},
	bindAlipay: async function({
		uid: e,
		code: t,
		platform: r
	}) {
		const n = r || __ctx__.PLATFORM,
			{
				openid: o
			} = await Cr({
				platform: n
			}).code2Session(t);
		if (!o) return {
			code: 60401,
			msg: "获取openid失败"
		};
		const i = await j.where({
			ali_openid: o
		}).get();
		if (i && i.data && i.data.length > 0) return {
			code: 60402,
			msg: "支付宝绑定失败，此账号已被绑定"
		};
		try {
			return await j.doc(e).update({
				ali_openid: o
			}), {
				code: 0,
				msg: "绑定成功"
			}
		} catch (e) {
			return S("写入异常：", e), {
				code: 90001,
				msg: "数据库写入异常"
			}
		}
	},
	unbindAlipay: async function(e) {
		try {
			const t = Ar.command,
				r = await j.doc(e).update({
					ali_openid: t.remove()
				});
			return S("upRes:", r), 1 === r.updated ? {
				code: 0,
				msg: "支付宝解绑成功"
			} : {
				code: 70401,
				msg: "支付宝解绑失败，请稍后再试"
			}
		} catch (e) {
			return S("写入异常：", e), {
				code: 90001,
				msg: "数据库写入异常"
			}
		}
	},
	logout: async function(e) {
		const t = await dr.checkToken(e);
		if (t.code && t.code > 0) return t;
		try {
			const r = Rr.command;
			return await j.doc(t.uid).update({
				token: r.pull(e)
			}), {
				code: 0,
				msg: "退出成功"
			}
		} catch (e) {
			return {
				code: 90001,
				msg: "数据库写入异常"
			}
		}
	},
	updatePwd: async function(e) {
		const t = await j.doc(e.uid).get();
		if (!(t && t.data && t.data.length > 0)) return {
			code: 40201,
			msg: "用户不存在"
		}; {
			const r = t.data[0].password;
			if (A(e.oldPassword) !== r) return {
				code: 40202,
				msg: "旧密码错误"
			};
			try {
				return S("upRes", await j.doc(t.data[0]._id).update({
					password: A(e.newPassword),
					token: []
				})), {
					code: 0,
					msg: "修改成功"
				}
			} catch (e) {
				return S("发生异常", e), {
					code: 90001,
					msg: "数据库写入异常"
				}
			}
		}
	},
	updateUser: async function(e) {
		const t = e.uid;
		if (!t) return {
			code: 80101,
			msg: "缺少uid参数"
		};
		delete e.uid;
		try {
			return S("update -> upRes", await j.doc(t).update(e)), {
				code: 0,
				msg: "修改成功"
			}
		} catch (e) {
			return S("发生异常", e), {
				code: 90001,
				msg: "数据库写入异常"
			}
		}
	},
	setAvatar: async function(e) {
		try {
			return S("setAvatar -> upRes", await j.doc(e.uid).update({
				avatar: e.avatar
			})), {
				code: 0,
				msg: "头像设置成功"
			}
		} catch (e) {
			return S("发生异常", e), {
				code: 90001,
				msg: "数据库写入异常"
			}
		}
	},
	bindMobile: async function({
		uid: e,
		mobile: t,
		code: r
	}) {
		try {
			const n = await j.where({
				mobile: t,
				mobile_confirmed: 1
			}).count();
			if (n && n.total > 0) return {
				code: 60101,
				msg: "此手机号已被绑定"
			};
			if (r) {
				const e = await Nr({
					mobile: t,
					code: r,
					type: "bind"
				});
				if (0 !== e.code) return e
			}
			return S("bindMobile -> upRes", await j.doc(e).update({
				mobile: t,
				mobile_confirmed: 1
			})), {
				code: 0,
				msg: "手机号码绑定成功"
			}
		} catch (e) {
			return S("发生异常", e), {
				code: 90001,
				msg: "数据库写入异常"
			}
		}
	},
	bindEmail: async function({
		uid: e,
		email: t,
		code: r
	}) {
		try {
			const n = await j.where({
				email: t,
				email_confirmed: 1
			}).count();
			if (n && n.total > 0) return {
				code: 60201,
				msg: "此邮箱已被绑定"
			};
			if (r) {
				const e = await Nr({
					email: t,
					code: r,
					type: "bind"
				});
				if (0 !== e.code) return e
			}
			return S("bindEmail -> upRes", await j.doc(e).update({
				email: t,
				email_confirmed: 1
			})), {
				code: 0,
				msg: "邮箱绑定成功"
			}
		} catch (e) {
			return S("发生异常", e), {
				code: 90001,
				msg: "数据库写入异常"
			}
		}
	},
	checkToken: dr.checkToken,
	encryptPwd: A,
	resetPwd: async function({
		uid: e,
		password: t
	}) {
		try {
			return S("upRes", await j.doc(e).update({
				password: A(t),
				token: []
			})), {
				code: 0,
				msg: "密码重置成功"
			}
		} catch (e) {
			return S("发生异常", e), {
				code: 90001,
				msg: "数据库写入异常"
			}
		}
	},
	unbindMobile: async function({
		uid: e,
		mobile: t,
		code: r
	}) {
		try {
			if (r) {
				const e = await Nr({
					mobile: t,
					code: r,
					type: "unbind"
				});
				if (0 !== e.code) return e
			}
			const n = Br.command;
			return 1 === (await j.where({
				_id: e,
				mobile: t
			}).update({
				mobile: n.remove(),
				mobile_confirmed: n.remove()
			})).updated ? {
				code: 0,
				msg: "手机号解绑成功"
			} : {
				code: 70101,
				msg: "手机号解绑失败，请稍后再试"
			}
		} catch (e) {
			return S("发生异常", e), {
				code: 90001,
				msg: "数据库写入异常"
			}
		}
	},
	setVerifyCode: $r,
	verifyCode: Nr,
	sendSmsCode: async function({
		mobile: e,
		code: t,
		type: r
	}) {
		if (!e) throw new Error("手机号码不可为空");
		if (!t) throw new Error("验证码不可为空");
		if (!r) throw new Error("验证码类型不可为空");
		const n = O();
		let o = n && n.service && n.service.sms;
		if (!o) throw new Error("请在config.json或init方法中配置service.sms下短信相关参数");
		o = Object.assign({
			codeExpiresIn: 300
		}, o);
		const i = ["name", "smsKey", "smsSecret"];
		for (let e = 0, t = i.length; e < t; e++) {
			const t = i[e];
			if (!o[t]) throw new Error("请在config.json或init方法中service.sms下配置" + t)
		}
		const {
			name: a,
			smsKey: s,
			smsSecret: c,
			codeExpiresIn: u
		} = o;
		let f;
		switch (r) {
			case "login":
				f = "登录";
				break;
			default:
				f = "验证手机号"
		}
		try {
			await uniCloud.sendSms({
				smsKey: s,
				smsSecret: c,
				phone: e,
				templateId: "uniID_code",
				data: {
					name: a,
					code: t,
					action: f,
					expMinute: "" + Math.round(u / 60)
				}
			});
			const n = await $r({
				mobile: e,
				code: t,
				expiresIn: u,
				type: r
			});
			return n.code >= 0 ? n : {
				code: 0,
				msg: "验证码发送成功"
			}
		} catch (e) {
			return {
				code: 50301,
				msg: "验证码发送失败, " + e.message
			}
		}
	},
	loginBySms: async function({
		mobile: e,
		code: t,
		password: r,
		inviteCode: n,
		myInviteCode: o,
		type: i
	}) {
		const a = O();
		if (a.forceInviteCode && !i) throw new Error("[loginBySms]强制使用邀请码注册时，需指明type为register还是login");
		const s = await Nr({
			mobile: e,
			code: t,
			type: i || "login"
		});
		if (0 !== s.code) return s;
		const c = {
				mobile: e,
				mobile_confirmed: 1
			},
			u = await j.where(c).get();
		if (S("userInDB:", u), !(u && u.data && u.data.length > 0)) {
			const t = Date.now();
			if ("login" === i) return {
				code: 10203,
				msg: "此手机号尚未注册"
			};
			const s = {
				mobile: e,
				mobile_confirmed: 1,
				register_ip: __ctx__.CLIENTIP,
				register_date: t
			};
			if ("register" === i) {
				if (r && (s.password = A(r)), n) {
					const e = await j.where({
						my_invite_code: n
					}).get();
					if (1 !== e.data.length) return {
						code: 10202,
						msg: "邀请码无效"
					};
					s.inviter_uid = [e.data[0]._id].concat(e.data[0].inviter_uid || []), s.invite_time = t
				} else if (a.forceInviteCode) return {
					code: 10202,
					msg: "邀请码无效"
				};
				o && (s.my_invite_code = o)
			}
			const c = await mr(s);
			if (c.code > 0) return c;
			const u = c.result;
			S("addRes", u);
			const f = u.id;
			if (u.id) {
				const {
					token: t,
					tokenExpired: r
				} = dr.createToken({
					_id: f
				});
				return await j.doc(f).update({
					token: [t]
				}), {
					code: 0,
					uid: f,
					mobile: e,
					type: "register",
					msg: "登录成功",
					token: t,
					tokenExpired: r
				}
			}
			return {
				code: 90001,
				msg: "数据库写入失败"
			}
		} {
			if ("register" === i) return {
				code: 10201,
				msg: "此手机号已注册"
			};
			const t = u.data[0];
			try {
				const r = await gr(t);
				if (0 !== r.code) return r;
				const n = r.user.token;
				S("开始修改最后登录时间");
				const {
					token: o,
					tokenExpired: i
				} = dr.createToken(t);
				S("token", o), n.push(o);
				return S("upRes", await j.doc(t._id).update({
					last_login_date: (new Date).getTime(),
					last_login_ip: __ctx__.CLIENTIP,
					token: n
				})), {
					code: 0,
					token: o,
					uid: t._id,
					username: t.username,
					mobile: e,
					userInfo: t,
					type: "login",
					msg: "登录成功",
					tokenExpired: i
				}
			} catch (e) {
				return S("写入异常：", e), {
					code: 90001,
					msg: "数据库写入异常"
				}
			}
		}
	},
	loginByEmail: async function({
		email: e,
		code: t,
		password: r,
		myInviteCode: n,
		type: o
	}) {
		const i = await Nr({
			email: e,
			code: t,
			type: o || "login"
		});
		if (0 !== i.code) return i;
		const a = {
				email: e,
				email_confirmed: 1
			},
			s = await j.where(a).get();
		if (S("userInDB:", s), !(s && s.data && s.data.length > 0)) {
			if ("login" === o) return {
				code: 10302,
				msg: "此邮箱尚未注册"
			};
			const t = {
				email: e,
				email_confirmed: 1,
				register_ip: __ctx__.CLIENTIP,
				register_date: Date.now()
			};
			"register" === o && (r && (t.password = A(r)), n && (t.my_invite_code = n));
			const i = await mr(t);
			if (i.code > 0) return i;
			const a = i.result;
			S("addRes", a);
			const s = a.id;
			if (a.id) {
				const {
					token: t,
					tokenExpired: r
				} = dr.createToken({
					_id: s
				});
				return await j.doc(s).update({
					token: [t]
				}), {
					code: 0,
					msg: "注册成功",
					uid: s,
					email: e,
					type: "register",
					token: t,
					tokenExpired: r
				}
			}
			return {
				code: 90001,
				msg: "数据库写入失败"
			}
		} {
			if ("register" === o) return {
				code: 10301,
				msg: "此邮箱已注册"
			};
			const t = s.data[0];
			try {
				const r = await gr(t);
				if (0 !== r.code) return r;
				const n = r.user.token;
				S("开始修改最后登录时间");
				const {
					token: o,
					tokenExpired: i
				} = dr.createToken(t);
				S("token", o), n.push(o);
				return S("upRes", await j.doc(t._id).update({
					last_login_date: (new Date).getTime(),
					last_login_ip: __ctx__.CLIENTIP,
					token: n
				})), {
					code: 0,
					msg: "登录成功",
					token: o,
					uid: t._id,
					username: t.username,
					email: e,
					userInfo: t,
					type: "login",
					tokenExpired: i
				}
			} catch (e) {
				return S("写入异常：", e), {
					code: 90001,
					msg: "数据库写入异常"
				}
			}
		}
	},
	unbindEmail: async function({
		uid: e,
		email: t,
		code: r
	}) {
		try {
			if (r) {
				const e = await Nr({
					email: t,
					code: r,
					type: "unbind"
				});
				if (0 !== e.code) return e
			}
			const n = Mr.command;
			return 1 === (await j.where({
				_id: e,
				email: t
			}).update({
				email: n.remove(),
				email_confirmed: n.remove()
			})).updated ? {
				code: 0,
				msg: "邮箱解绑成功"
			} : {
				code: 70201,
				msg: "邮箱解绑失败，请稍后再试"
			}
		} catch (e) {
			return S("发生异常", e), {
				code: 90001,
				msg: "数据库写入异常"
			}
		}
	},
	setUserInviteCode: async function({
		uid: e,
		myInviteCode: t
	}) {
		const r = await lr({
			inviteCode: t
		});
		if (r.code > 0) return r;
		try {
			return await j.doc(e).update({
				my_invite_code: r.inviteCode
			}), {
				code: 0,
				msg: "邀请码设置成功",
				myInviteCode: r.inviteCode
			}
		} catch (e) {
			return {
				code: 90001,
				msg: "数据库写入异常"
			}
		}
	},
	acceptInvite: async function({
		uid: e,
		inviteCode: t
	}) {
		const r = await j.where({
			_id: Dr.neq(e),
			inviter_uid: Dr.not(Dr.all([e])),
			my_invite_code: t
		}).get();
		if (1 !== r.data.length) return {
			code: 80501,
			msg: "邀请码无效"
		};
		const n = [r.data[0]._id].concat(r.data[0].inviter_uid || []),
			o = await j.doc(e).field({
				my_invite_code: !0,
				inviter_uid: !0
			}).get();
		if (0 === o.data.length) return {
			code: 80502,
			msg: "uid错误用户不存在"
		};
		if (o.data[0].inviter_uid && o.data[0].inviter_uid.length > 0) return {
			code: 80503,
			msg: "邀请码不可修改"
		};
		try {
			const t = Date.now();
			return await j.doc(e).update({
				inviter_uid: n,
				invite_time: t
			}), await j.where({
				inviter_uid: e
			}).update({
				inviter_uid: Dr.push(n)
			}), {
				code: 0,
				msg: "邀请码填写成功"
			}
		} catch (e) {
			return {
				code: 90001,
				msg: "数据库写入异常"
			}
		}
	},
	getUserInfo: async function({
		uid: e,
		field: t
	}) {
		const r = {};
		if (t && t.length)
			for (let e = 0; e < t.length; e++) r[t[e]] = !0;
		try {
			let n;
			return n = t && t.length ? await j.doc(e).field(r).get() : await j.doc(e).get(), 0 === n.data.length ? {
				code: 80301,
				msg: "未查询到用户信息"
			} : {
				code: 0,
				msg: "获取用户信息成功",
				userInfo: n.data[0]
			}
		} catch (e) {
			return {
				code: 90001,
				msg: "数据库读写错误"
			}
		}
	},
	getInvitedUser: async function({
		uid: e,
		level: t = 1,
		limit: r = 20,
		offset: n = 0,
		needTotal: o = !1
	}) {
		try {
			const i = {
				code: 0,
				msg: "获取邀请列表成功",
				invitedUser: (await j.where({
					["inviter_uid." + (t - 1)]: e
				}).field({
					_id: !0,
					username: !0,
					mobile: !0,
					invite_time: !0
				}).orderBy("invite_time", "desc").skip(n).limit(r).get()).data
			};
			if (o) {
				const r = await j.where({
					["inviter_uid." + (t - 1)]: e
				}).count();
				i.total = r.total
			}
			return i
		} catch (e) {
			return {
				code: 90001,
				msg: "数据库读写错误"
			}
		}
	},
	code2SessionWeixin: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		try {
			const e = t.platform || __ctx__.PLATFORM,
				r = await jr({
					platform: e
				})["mp-weixin" === e ? "code2Session" : "getOauthAccessToken"](t.code);
			return r.openid ? {
				code: 0,
				msg: "",
				...r
			} : {
				code: 80601,
				msg: "获取openid失败"
			}
		} catch (e) {
			return {
				code: 80602,
				msg: e.message
			}
		}
	},
	code2SessionAlipay: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		try {
			const e = t.platform || __ctx__.PLATFORM,
				r = await Cr({
					platform: e
				}).code2Session(t.code);
			return r.openid ? {
				code: 0,
				msg: "",
				...r
			} : {
				code: 80701,
				msg: "获取openid失败"
			}
		} catch (e) {
			return {
				code: 80702,
				msg: e.message
			}
		}
	}
};
module.exports = Lr;
