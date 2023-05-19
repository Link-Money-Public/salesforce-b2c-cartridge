!function (t) {
  var n = {};
  function e(i) {
    if (n[i]) return n[i].exports;
    var o = n[i] = {
      i: i,
      l: !1,
      exports: {}
    };
    return t[i].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
  }
  e.m = t, e.c = n, e.d = function (t, n, i) {
    e.o(t, n) || Object.defineProperty(t, n, {
      enumerable: !0,
      get: i
    });
  }, e.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(t, "__esModule", {
      value: !0
    });
  }, e.t = function (t, n) {
    if (1 & n && (t = e(t)), 8 & n) return t;
    if (4 & n && "object" == typeof t && t && t.__esModule) return t;
    var i = Object.create(null);
    if (e.r(i), Object.defineProperty(i, "default", {
      enumerable: !0,
      value: t
    }), 2 & n && "string" != typeof t) for (var o in t) e.d(i, o, function (n) {
      return t[n];
    }.bind(null, o));
    return i;
  }, e.n = function (t) {
    var n = t && t.__esModule ? function () {
      return t.default;
    } : function () {
      return t;
    };
    return e.d(n, "a", n), n;
  }, e.o = function (t, n) {
    return Object.prototype.hasOwnProperty.call(t, n);
  }, e.p = "", e(e.s = 0);
}([function (t, n, e) {
  var i = e(1);
  $(document).ready(function () {
    $(".linkMoney-tab").hasClass("active") && !$(".linked-bank").length && $(".submit-payment").attr("disabled", !0), $(".payment-options .nav-item").on("click", function () {
      $(this).data("method-id") !== i.LINK_PAYMENT_METHOD_ID && $(".submit-payment").attr("disabled", !1), $(this).data("method-id") !== i.LINK_PAYMENT_METHOD_ID || $(".linked-bank").length || $(".submit-payment").attr("disabled", !0);
    }), $("#link-btn").on("click", function (t) {
      var n;
      n = !0, $(".billing-address-block").find("input, select").each(function () {
        this.validity.valid || (n = !1, $(this).trigger("invalid", this.validity));
      }), $(".contact-info-block").find("input, select").each(function () {
        this.validity.valid || (n = !1, $(this).trigger("invalid", this.validity));
      }), n || (t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation());
    }), $(".linkMoney-tooltip").on("click", function () {
      $(".tooltip-modal").removeClass("d-none");
    }), $(".tooltip-cancel").on("click", function () {
      $(".tooltip-modal").addClass("d-none");
    }), $(".tooltip-fade").on("click", function () {
      $(".tooltip-modal").addClass("d-none");
    });
  });
}, function (t, n, e) {
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
}]);