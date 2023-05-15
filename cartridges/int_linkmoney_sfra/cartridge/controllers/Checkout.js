'use strict';

var server = require('server');
server.extend(module.superModule);
var linkMoneyAccountsService = require('~/cartridge/services/linkMoneyAccountsService');
var linkMoneyHelper = require('~/cartridge/scripts/util/linkMoneyHelper');
var CustomerMgr = require('dw/customer/CustomerMgr');
var BasketMgr = require('dw/order/BasketMgr');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var URLUtils = require('dw/web/URLUtils');
server.prepend('Begin', server.middleware.https, consentTracking.consent, csrfProtection.generateToken, function (req, res, next) {
  var viewData = res.getViewData();
  var enableLinkMoney = linkMoneyHelper.getCustomPreferenceValue('enableLinkMoney');
  var currentBasket = BasketMgr.getCurrentBasket();
  viewData.linkMoneyRedirectUrl = URLUtils.https('LinkMoney-LinkToBank');
  viewData.enableLinkMoney = enableLinkMoney;
  viewData.linkMoneyEnvironment = linkMoneyHelper.getCustomPreferenceValue('linkMoneyEnvironment');
  if (!currentBasket.customerEmail) {
    // eslint-disable-next-line no-undef
    session.custom.guestCustomerId = null;
  }
  try {
    if (enableLinkMoney && req.currentCustomer.raw.authenticated) {
      var customer = CustomerMgr.getCustomerByCustomerNumber(req.currentCustomer.profile.customerNo);
      var profile = customer.getProfile();
      linkMoneyHelper.setBasketSession(currentBasket, profile.firstName, profile.lastName, profile.email);
      viewData.linkMoneySessionId = currentBasket.custom.linkMoneySessionId;
      if (profile.custom.linkMoneyCustomerId) {
        viewData.linkMoneyCustomerId = profile.custom.linkMoneyCustomerId;
        var result = linkMoneyAccountsService.linkMoneyAccountsService.call({
          customerId: profile.custom.linkMoneyCustomerId
        });
        viewData.linkMoneyBankInfo = result.isOk() && result.object ? {
          accountLastFourDigits: result.object.accountDetails[0].accountLastFourDigits,
          financialInstitutionName: result.object.accountDetails[0].financialInstitutionName,
          iconUrl: result.object.accountDetails[0].iconUrl
        } : null;
      } else {
        viewData.linkMoneyCustomerId = null;
      }
    }

    // eslint-disable-next-line no-undef
    if (enableLinkMoney && !req.currentCustomer.raw.authenticated && session.custom.guestCustomerId) {
      // eslint-disable-next-line no-undef
      viewData.linkMoneyCustomerId = session.custom.guestCustomerId;
      // eslint-disable-next-line no-undef
      viewData.guestCustomerId = session.custom.guestCustomerId;
      var bankInfo = linkMoneyAccountsService.linkMoneyAccountsService.call({
        // eslint-disable-next-line no-undef
        customerId: session.custom.guestCustomerId
      });
      if (bankInfo.object) {
        viewData.linkMoneyBankInfo = {
          accountLastFourDigits: bankInfo.object.accountDetails[0].accountLastFourDigits,
          financialInstitutionName: bankInfo.object.accountDetails[0].financialInstitutionName,
          iconUrl: bankInfo.object.accountDetails[0].iconUrl
        };
      }
    }
  } catch (e) {
    linkMoneyHelper.getLinkMoneyLogger().error(JSON.stringify(e));
  }
  res.setViewData(viewData);
  next();
});
module.exports = server.exports();