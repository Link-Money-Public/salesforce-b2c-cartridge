'use strict';

var server = require('server');
var Transaction = require('dw/system/Transaction');
var URLUtils = require('dw/web/URLUtils');
var BasketMgr = require('dw/order/BasketMgr');
var linkMoneyHelper = require('~/cartridge/scripts/util/linkMoneyHelper');
server.get('LinkToBank', function (req, res, next) {
  var customer = req.session.raw.getCustomer();
  var page = req.querystring.page;
  var customerId = req.querystring.customerId;
  var status = req.querystring.status;
  if (status === '200' && customerId) {
    if (customer.isAuthenticated()) {
      var profile = customer.getProfile();
      Transaction.wrap(function () {
        profile.custom.linkMoneyCustomerId = customerId;
      });
    } else {
      // eslint-disable-next-line no-undef
      session.custom.guestCustomerId = req.querystring.customerId;
    }
  }
  if (page === 'checkout') {
    res.redirect(URLUtils.url('Checkout-Begin', 'stage', 'payment'));
  } else {
    res.redirect(URLUtils.url('Account-Show'));
  }
  next();
});
server.get('GetSession', function (req, res, next) {
  var currentBasket = BasketMgr.getCurrentBasket();
  var guestEmail = currentBasket.getCustomerEmail();
  if (!guestEmail) {
    res.json({
      error: true,
      redirectUrl: URLUtils.url('Checkout-Begin').toString()
    });
    return next();
  }
  linkMoneyHelper.setBasketSession(currentBasket, currentBasket.billingAddress.firstName, currentBasket.billingAddress.lastName, guestEmail);
  res.json({
    sessionKey: currentBasket.custom.linkMoneySessionId
  });
  next();
});
module.exports = server.exports();