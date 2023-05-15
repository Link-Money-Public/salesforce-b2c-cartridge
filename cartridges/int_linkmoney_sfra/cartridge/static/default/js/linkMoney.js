!function (t) {
  var e = {};
  function n(r) {
    if (e[r]) return e[r].exports;
    var o = e[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
  }
  n.m = t, n.c = e, n.d = function (t, e, r) {
    n.o(t, e) || Object.defineProperty(t, e, {
      enumerable: !0,
      get: r
    });
  }, n.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(t, "__esModule", {
      value: !0
    });
  }, n.t = function (t, e) {
    if (1 & e && (t = n(t)), 8 & e) return t;
    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
    var r = Object.create(null);
    if (n.r(r), Object.defineProperty(r, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var o in t) n.d(r, o, function (e) {
      return t[e];
    }.bind(null, o));
    return r;
  }, n.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default;
    } : function () {
      return t;
    };
    return n.d(e, "a", e), e;
  }, n.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, n.p = "", n(n.s = 1);
}([function (t, e, n) {
  "use strict";

  t.exports = {
    SERVICE: {
      AUTH: "linkmoney.auth.service",
      SESSION: "linkmoney.session.service",
      ACCOUNT: "linkmoney.accounts.service"
    },
    ENDPOINT: {
      AUTH: "/v1/tokens",
      SESSION: "/v1/sessions",
      ACCOUNT: "/v1/customers",
      PAYMENTS: "/v1/payments",
      WEBHOOK: {
        SUBSCRIBE: "/v1/webhook/subscribe",
        UNSUBSCRIBE: "/v1/webhook/unsubscribe"
      }
    },
    CUSTOM_OBJECT_TYPE: {
      LINK_MONEY_AUTH_TOKEN: "LinkMoneyAuthToken",
      LINK_MONEY_WEBHOOK_SUBSCRIPTION_KEY: "LinkMoneyWebhookSubscriptionKey"
    },
    LINK_PAY_PAYMENT_STATUS: {
      TERMINAL_FAILED: "TERMINAL_FAILED",
      FAILED: "FAILED",
      PENDING: "PENDING",
      AUTHORIZED: "AUTHORIZED",
      SUCCEEDED: "SUCCEEDED",
      SETTLED: "SETTLED"
    },
    LINK_PAYMENT_METHOD_ID: "LINKMONEY"
  };
}, function (t, e, n) {
  "use strict";

  function r(t, e) {
    var n = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
    if (!n) {
      if (Array.isArray(t) || (n = u(t)) || e && t && "number" == typeof t.length) {
        n && (t = n);
        var r = 0,
          o = function () {};
        return {
          s: o,
          n: function () {
            return r >= t.length ? {
              done: !0
            } : {
              done: !1,
              value: t[r++]
            };
          },
          e: function (t) {
            throw t;
          },
          f: o
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var i,
      a = !0,
      c = !1;
    return {
      s: function () {
        n = n.call(t);
      },
      n: function () {
        var t = n.next();
        return a = t.done, t;
      },
      e: function (t) {
        c = !0, i = t;
      },
      f: function () {
        try {
          a || null == n.return || n.return();
        } finally {
          if (c) throw i;
        }
      }
    };
  }
  function o() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */o = function () {
      return t;
    };
    var t = {},
      e = Object.prototype,
      n = e.hasOwnProperty,
      r = Object.defineProperty || function (t, e, n) {
        t[e] = n.value;
      },
      i = "function" == typeof Symbol ? Symbol : {},
      a = i.iterator || "@@iterator",
      c = i.asyncIterator || "@@asyncIterator",
      u = i.toStringTag || "@@toStringTag";
    function s(t, e, n) {
      return Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), t[e];
    }
    try {
      s({}, "");
    } catch (t) {
      s = function (t, e, n) {
        return t[e] = n;
      };
    }
    function f(t, e, n, o) {
      var i = e && e.prototype instanceof v ? e : v,
        a = Object.create(i.prototype),
        c = new L(o || []);
      return r(a, "_invoke", {
        value: I(t, n, c)
      }), a;
    }
    function h(t, e, n) {
      try {
        return {
          type: "normal",
          arg: t.call(e, n)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }
    t.wrap = f;
    var y = {};
    function v() {}
    function d() {}
    function p() {}
    var m = {};
    s(m, a, function () {
      return this;
    });
    var b = Object.getPrototypeOf,
      g = b && b(b(T([])));
    g && g !== e && n.call(g, a) && (m = g);
    var w = p.prototype = v.prototype = Object.create(m);
    function E(t) {
      ["next", "throw", "return"].forEach(function (e) {
        s(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function k(t, e) {
      var o;
      r(this, "_invoke", {
        value: function (r, i) {
          function a() {
            return new e(function (o, a) {
              !function r(o, i, a, c) {
                var u = h(t[o], t, i);
                if ("throw" !== u.type) {
                  var s = u.arg,
                    f = s.value;
                  return f && "object" == l(f) && n.call(f, "__await") ? e.resolve(f.__await).then(function (t) {
                    r("next", t, a, c);
                  }, function (t) {
                    r("throw", t, a, c);
                  }) : e.resolve(f).then(function (t) {
                    s.value = t, a(s);
                  }, function (t) {
                    return r("throw", t, a, c);
                  });
                }
                c(u.arg);
              }(r, i, o, a);
            });
          }
          return o = o ? o.then(a, a) : a();
        }
      });
    }
    function I(t, e, n) {
      var r = "suspendedStart";
      return function (o, i) {
        if ("executing" === r) throw new Error("Generator is already running");
        if ("completed" === r) {
          if ("throw" === o) throw i;
          return N();
        }
        for (n.method = o, n.arg = i;;) {
          var a = n.delegate;
          if (a) {
            var c = O(a, n);
            if (c) {
              if (c === y) continue;
              return c;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if ("suspendedStart" === r) throw r = "completed", n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          r = "executing";
          var u = h(t, e, n);
          if ("normal" === u.type) {
            if (r = n.done ? "completed" : "suspendedYield", u.arg === y) continue;
            return {
              value: u.arg,
              done: n.done
            };
          }
          "throw" === u.type && (r = "completed", n.method = "throw", n.arg = u.arg);
        }
      };
    }
    function O(t, e) {
      var n = e.method,
        r = t.iterator[n];
      if (void 0 === r) return e.delegate = null, "throw" === n && t.iterator.return && (e.method = "return", e.arg = void 0, O(t, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
      var o = h(r, t.iterator, e.arg);
      if ("throw" === o.type) return e.method = "throw", e.arg = o.arg, e.delegate = null, y;
      var i = o.arg;
      return i ? i.done ? (e[t.resultName] = i.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, y) : i : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, y);
    }
    function S(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }
    function x(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }
    function L(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(S, this), this.reset(!0);
    }
    function T(t) {
      if (t) {
        var e = t[a];
        if (e) return e.call(t);
        if ("function" == typeof t.next) return t;
        if (!isNaN(t.length)) {
          var r = -1,
            o = function e() {
              for (; ++r < t.length;) if (n.call(t, r)) return e.value = t[r], e.done = !1, e;
              return e.value = void 0, e.done = !0, e;
            };
          return o.next = o;
        }
      }
      return {
        next: N
      };
    }
    function N() {
      return {
        value: void 0,
        done: !0
      };
    }
    return d.prototype = p, r(w, "constructor", {
      value: p,
      configurable: !0
    }), r(p, "constructor", {
      value: d,
      configurable: !0
    }), d.displayName = s(p, u, "GeneratorFunction"), t.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === d || "GeneratorFunction" === (e.displayName || e.name));
    }, t.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, p) : (t.__proto__ = p, s(t, u, "GeneratorFunction")), t.prototype = Object.create(w), t;
    }, t.awrap = function (t) {
      return {
        __await: t
      };
    }, E(k.prototype), s(k.prototype, c, function () {
      return this;
    }), t.AsyncIterator = k, t.async = function (e, n, r, o, i) {
      void 0 === i && (i = Promise);
      var a = new k(f(e, n, r, o), i);
      return t.isGeneratorFunction(n) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, E(w), s(w, u, "Generator"), s(w, a, function () {
      return this;
    }), s(w, "toString", function () {
      return "[object Generator]";
    }), t.keys = function (t) {
      var e = Object(t),
        n = [];
      for (var r in e) n.push(r);
      return n.reverse(), function t() {
        for (; n.length;) {
          var r = n.pop();
          if (r in e) return t.value = r, t.done = !1, t;
        }
        return t.done = !0, t;
      };
    }, t.values = T, L.prototype = {
      constructor: L,
      reset: function (t) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(x), !t) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (t) {
        if (this.done) throw t;
        var e = this;
        function r(n, r) {
          return a.type = "throw", a.arg = t, e.next = n, r && (e.method = "next", e.arg = void 0), !!r;
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i.completion;
          if ("root" === i.tryLoc) return r("end");
          if (i.tryLoc <= this.prev) {
            var c = n.call(i, "catchLoc"),
              u = n.call(i, "finallyLoc");
            if (c && u) {
              if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return r(i.finallyLoc);
            } else if (c) {
              if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
            } else {
              if (!u) throw new Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return r(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
            var i = o;
            break;
          }
        }
        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
        var a = i ? i.completion : {};
        return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];
          if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), x(n), y;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];
          if (n.tryLoc === t) {
            var r = n.completion;
            if ("throw" === r.type) {
              var o = r.arg;
              x(n);
            }
            return o;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (t, e, n) {
        return this.delegate = {
          iterator: T(t),
          resultName: e,
          nextLoc: n
        }, "next" === this.method && (this.arg = void 0), y;
      }
    }, t;
  }
  function i(t, e, n, r, o, i, a) {
    try {
      var c = t[i](a),
        u = c.value;
    } catch (t) {
      return void n(t);
    }
    c.done ? e(u) : Promise.resolve(u).then(r, o);
  }
  function a(t) {
    return function () {
      var e = this,
        n = arguments;
      return new Promise(function (r, o) {
        var a = t.apply(e, n);
        function c(t) {
          i(a, r, o, c, u, "next", t);
        }
        function u(t) {
          i(a, r, o, c, u, "throw", t);
        }
        c(void 0);
      });
    };
  }
  function c(t, e) {
    return function (t) {
      if (Array.isArray(t)) return t;
    }(t) || function (t, e) {
      var n = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
      if (null != n) {
        var r,
          o,
          i,
          a,
          c = [],
          u = !0,
          s = !1;
        try {
          if (i = (n = n.call(t)).next, 0 === e) {
            if (Object(n) !== n) return;
            u = !1;
          } else for (; !(u = (r = i.call(n)).done) && (c.push(r.value), c.length !== e); u = !0);
        } catch (t) {
          s = !0, o = t;
        } finally {
          try {
            if (!u && null != n.return && (a = n.return(), Object(a) !== a)) return;
          } finally {
            if (s) throw o;
          }
        }
        return c;
      }
    }(t, e) || u(t, e) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function u(t, e) {
    if (t) {
      if ("string" == typeof t) return s(t, e);
      var n = Object.prototype.toString.call(t).slice(8, -1);
      return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? s(t, e) : void 0;
    }
  }
  function s(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
    return r;
  }
  function l(t) {
    return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t;
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    })(t);
  }
  function f(t, e) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, v(r.key), r);
    }
  }
  function h(t, e, n) {
    return e && f(t.prototype, e), n && f(t, n), Object.defineProperty(t, "prototype", {
      writable: !1
    }), t;
  }
  function y(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  }
  function v(t) {
    var e = function (t, e) {
      if ("object" !== l(t) || null === t) return t;
      var n = t[Symbol.toPrimitive];
      if (void 0 !== n) {
        var r = n.call(t, e || "default");
        if ("object" !== l(r)) return r;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === e ? String : Number)(t);
    }(t, "string");
    return "symbol" === l(e) ? e : String(e);
  }
  n.r(e);
  var d,
    p,
    m,
    b,
    g = "customerId parameter must be a valid UUID string.",
    w = "function did not recieve required parameters",
    E = function () {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 500,
        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Error("There was a problem with your response.");
      return "StatusCode:".concat(t, "\nErrorMessage: ").concat(e.message, "\n");
    };
  !function (t) {
    t.Active = "ACTIVE", t.Created = "CREATED";
  }(d || (d = {})), function (t) {
    t.Active = "ACTIVE", t.Inactive = "INACTIVE", t.Abandon = "ABANDON", t.Created = "CREATED";
  }(p || (p = {})), function (t) {
    t.Checking = "checking", t.Savings = "savings";
  }(m || (m = {})), function (t) {
    t.sandbox = "link-sandbox.money", t.production = "link.money";
  }(b || (b = {}));
  var k,
    I,
    O,
    S = h(function t() {
      y(this, t);
    });
  k = S, I = "staticConstructor", O = function () {
    var t = [],
      e = function () {
        function t(e) {
          y(this, t), this.sessionKey = e.sessionKey, this.redirect = e.redirect, this.custom = e.custom, this.initiated = !1, this.clientUrl = "https://client.link.money", this.version = "1.0.0", this.environment = e.environment, this.testPayment = e.testPayment;
        }
        return h(t, [{
          key: "action",
          value: function () {
            var t;
            if (this.environment && "https://client.link.money" === this.clientUrl) {
              var e = Object.keys(b).indexOf(this.environment);
              t = new URL("https://client.".concat(Object.values(b)[e]));
            } else t = new URL(this.clientUrl);
            for (var n = 0, r = Object.entries(this); n < r.length; n++) {
              var o = c(r[n], 2),
                i = o[0],
                a = o[1];
              "initiated" !== i && "clientUrl" !== i && ("testPayment" === i && "https://client.link.money" !== this.clientUrl || t.searchParams.append(i, a));
            }
            window.location.assign(t.href), this.initiated = !0;
          }
        }, {
          key: "getVersion",
          value: function () {
            return this.version;
          }
        }, {
          key: "isInitiated",
          value: function () {
            return this.initiated;
          }
        }, {
          key: "getSessionKey",
          value: function () {
            return this.sessionKey;
          }
        }]), t;
      }();
    S.LinkInstance = function (n) {
      !function (t) {
        if (!Object.keys(t).includes("sessionKey")) throw new Error("A link instance must include a session key.");
        if (function (t) {
          var e = ["sessionKey", "redirect", "custom", "environment", "testPayment"];
          return Object.keys(t).forEach(function (t) {
            if (!e.includes(t)) throw new Error("Invalid config, verify object keys.");
          }), !0;
        }(t) && !Object.values(t).every(function (t) {
          return null != t;
        })) throw new Error("Config cannot contain null or undefined values.");
      }(n);
      var r = new e(n);
      return t.push(r), r;
    }, S.getLinkInstances = function () {
      for (var e = [], n = 0, r = t; n < r.length; n++) {
        var o = r[n];
        e.push(o);
      }
      return e;
    }, S.getCustomer = function () {
      var t = a(o().mark(function t(e, n) {
        var r, i;
        return o().wrap(function (t) {
          for (;;) switch (t.prev = t.next) {
            case 0:
              if (e && n) {
                t.next = 2;
                break;
              }
              throw new Error(w);
            case 2:
              if (36 === n.length) {
                t.next = 4;
                break;
              }
              throw new Error(g);
            case 4:
              return t.next = 6, fetch("https://api.link.money/public/v1/customers/".concat(n), {
                method: "get",
                headers: {
                  "content-type": "application/json",
                  Authorization: "Bearer " + e
                }
              });
            case 6:
              if (!(r = t.sent).ok) {
                t.next = 12;
                break;
              }
              return t.next = 10, r.json();
            case 10:
              return i = t.sent, t.abrupt("return", {
                status: i.customerStatus,
                creationDate: i.creationDate,
                email: i.email,
                firstName: i.firstName,
                lastName: i.lastName,
                id: i.id
              });
            case 12:
              throw new Error(E(r.status, new Error(r.statusText)));
            case 13:
            case "end":
              return t.stop();
          }
        }, t);
      }));
      return function (e, n) {
        return t.apply(this, arguments);
      };
    }(), S.getAccounts = function () {
      var t = a(o().mark(function t(e, n) {
        var i, a, c, u, s, l;
        return o().wrap(function (t) {
          for (;;) switch (t.prev = t.next) {
            case 0:
              if (e && n) {
                t.next = 2;
                break;
              }
              throw new Error(w);
            case 2:
              if (36 === n.length) {
                t.next = 4;
                break;
              }
              throw new Error(g);
            case 4:
              return t.next = 6, fetch("https://api.link.money/public/v1/customers/".concat(n, "/accounts"), {
                method: "get",
                headers: {
                  "content-type": "application/json",
                  Authorization: "Bearer " + e
                }
              });
            case 6:
              if (!(i = t.sent).ok) {
                t.next = 15;
                break;
              }
              return t.next = 10, i.json();
            case 10:
              a = t.sent, c = [], u = r(a.accountDetails);
              try {
                for (u.s(); !(s = u.n()).done;) l = s.value, c.push({
                  accountId: l.accountId,
                  creationDate: l.creationDate,
                  financialInstitutionId: l.financialInstitutionId,
                  financialInstitutionName: l.financialInstitutionName,
                  preferred: l.preferred,
                  lastFour: l.accountLastFourDigits,
                  status: l.accountStatus,
                  type: l.accountType,
                  iconUrl: l.iconUrl,
                  logoUrl: l.logoUrl
                });
              } catch (t) {
                u.e(t);
              } finally {
                u.f();
              }
              return t.abrupt("return", c);
            case 15:
              throw new Error(E(i.status, new Error(i.statusText)));
            case 16:
            case "end":
              return t.stop();
          }
        }, t);
      }));
      return function (e, n) {
        return t.apply(this, arguments);
      };
    }();
  }(), (I = v(I)) in k ? Object.defineProperty(k, I, {
    value: O,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : k[I] = O;
  var x = n(0);
  $(document).ready(function () {
    $(".linkMoney-tab").hasClass("active") && !$(".linked-bank").length && $(".submit-payment").attr("disabled", !0), $(".payment-options .nav-item").on("click", function () {
      $(this).data("method-id") !== x.LINK_PAYMENT_METHOD_ID && $(".submit-payment").attr("disabled", !1), $(this).data("method-id") !== x.LINK_PAYMENT_METHOD_ID || $(".linked-bank").length || $(".submit-payment").attr("disabled", !0);
    }), $("#link-btn").on("click", function () {
      if ("false" === window.isGuestCustomer) {
        var t = {
          sessionKey: window.linkMoneySessionId,
          redirect: window.linkMoneyRedirectUrl,
          environment: window.linkMoneyEnvironment
        };
        S.LinkInstance(t).action();
      } else $.ajax({
        url: window.getGuestSessionUrl,
        type: "get",
        success: function (t) {
          var e = {
            sessionKey: t.sessionKey,
            redirect: window.linkMoneyRedirectUrl,
            environment: window.linkMoneyEnvironment
          };
          S.LinkInstance(e).action();
        },
        error: function () {}
      });
    });
  });
}]);