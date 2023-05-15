'use strict';

var server = require('server');
var Transaction = require('dw/system/Transaction');
var Order = require('dw/order/Order');
var constants = require('~/cartridge/scripts/util/constants');
var linkMoneyHelper = require('~/cartridge/scripts/util/linkMoneyHelper');
server.use('Listen', server.middleware.https, function (req, res, next) {
  var body = JSON.parse(req.body || '{}');
  var OrderMgr = require('dw/order/OrderMgr');
  try {
    if (body.metadata && body.metadata.clientReferenceId) {
      var orderQuery = OrderMgr.queryOrders('custom.linkMoneyOrderId={0}', 'orderNo ASC', body.metadata.clientReferenceId);
      var order = orderQuery.first();
      if (body.eventType === 'payment.succeeded') {
        linkMoneyHelper.setLastLinkMoneyPaymentStatus(order, constants.LINK_PAY_PAYMENT_STATUS.SETTLED);
        Transaction.wrap(function () {
          order.trackOrderChange('Payment amount has been successfully debited from customer account');
          order.setPaymentStatus(Order.PAYMENT_STATUS_PAID);
        });
        if (order.getCustomerEmail() && linkMoneyHelper.getCustomPreferenceValue('linkMoneyEnableEmailNotification')) {
          /*
              Custom Link Money cartridge start
               Here you can inform the customer about successful payment
               Custom Link Money cartridge end
          */
        }
      }
      if (body.eventType === 'payment.authorized') {
        linkMoneyHelper.setLastLinkMoneyPaymentStatus(order, constants.LINK_PAY_PAYMENT_STATUS.AUTHORIZED);
      }
      if (body.eventType === 'payment.failed') {
        linkMoneyHelper.setLastLinkMoneyPaymentStatus(order, constants.LINK_PAY_PAYMENT_STATUS.FAILED);
        if (order.getCustomerEmail() && linkMoneyHelper.getCustomPreferenceValue('linkMoneyEnableEmailNotification')) {
          /*
              Custom Link Money cartridge start
               Here you can inform the customer about failed payment
               Custom Link Money cartridge end
          */
        }
        Transaction.wrap(function () {
          order.trackOrderChange('Payment failed');
          OrderMgr.cancelOrder(order);
        });
      }
    }
    res.json({
      success: body
    });
  } catch (e) {
    res.json({
      success: false
    });
  }
  return next();
});
module.exports = server.exports();