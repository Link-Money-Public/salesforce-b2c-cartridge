'use strict';

var server = require('server');
server.extend(module.superModule);
server.append('CreateAccount', function (req, res, next) {
  this.on('route:BeforeComplete', function (requ, resp) {
    var linkMoneyHelper = require('~/cartridge/scripts/util/linkMoneyHelper');
    var Transaction = require('dw/system/Transaction');
    var viewData = resp.getViewData();
    // eslint-disable-next-line no-undef
    if (linkMoneyHelper.getCustomPreferenceValue('enableLinkMoney') && session.custom.guestCustomerId && viewData.newCustomer) {
      Transaction.wrap(function () {
        // eslint-disable-next-line no-undef
        viewData.newCustomer.profile.custom.linkMoneyCustomerId = session.custom.guestCustomerId;
      });
    }
  });
  next();
});
module.exports = server.exports();