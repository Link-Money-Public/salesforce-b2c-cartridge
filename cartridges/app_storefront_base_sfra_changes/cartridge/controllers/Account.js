'use strict';

var server = require('server');
server.extend(module.superModule);
var CustomerMgr = require('dw/customer/CustomerMgr');
var linkMoneyAccountsService = require('*/cartridge/services/linkMoneyAccountsService');
var linkMoneyHelper = require('*/cartridge/scripts/util/linkMoneyHelper');
var linkMoneyInitServices = require('*/cartridge/services/linkMoneyInitServices');
var URLUtils = require('dw/web/URLUtils');
server.append('Show', function (req, res, next) {
  var customer = CustomerMgr.getCustomerByCustomerNumber(req.currentCustomer.profile.customerNo);
  var profile = customer.getProfile();
  var viewData = res.getViewData();
  var enableLinkMoney = linkMoneyHelper.getCustomPreferenceValue('enableLinkMoney');
  viewData.enableLinkMoney = enableLinkMoney;
  if (enableLinkMoney) {
    if (profile.custom.linkMoneyCustomerId) {
      var result = linkMoneyAccountsService.linkMoneyAccountsService.call({
        customerId: profile.custom.linkMoneyCustomerId
      });
      viewData.linkMoneyCustomerId = profile.custom.linkMoneyCustomerId;
      viewData.linkMoneyBankInfo = result.isOk() && result.object ? {
        accountLastFourDigits: result.object.accountDetails[0].accountLastFourDigits,
        financialInstitutionName: result.object.accountDetails[0].financialInstitutionName,
        iconUrl: result.object.accountDetails[0].iconUrl
      } : null;
    }
    var svcResult = linkMoneyInitServices.getSessionKeyService().call({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email
    });
    viewData.linkMoneySessionId = svcResult.isOk() && svcResult.object ? svcResult.object.sessionKey : null;
    viewData.linkMoneyRedirectUrl = URLUtils.https('LinkMoney-LinkToBank').append('page', 'account');
    viewData.linkMoneyEnvironment = linkMoneyHelper.getCustomPreferenceValue('linkMoneyEnvironment');
  }
  res.setViewData(viewData);
  next();
});
module.exports = server.exports();