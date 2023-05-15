'use strict';

var Transaction = require('dw/system/Transaction');
var Resource = require('dw/web/Resource');
var linkMoneyHelper = require('~/cartridge/scripts/util/linkMoneyHelper');
var constants = require('~/cartridge/scripts/util/constants');

/**
 * Create payment instrument from request
 * @param {dw.order.Basket} basket Current users's basket
 * @param {Object} paymentInformation - the payment information
 * @param {string} paymentMethodID - paymentmethodID
 * @return {Object} returns an error object
 */
function Handle(basket, paymentInformation, paymentMethodID) {
  var serverErrors = [];
  var basketTotal = basket.getTotalGrossPrice();
  if (!paymentInformation.financialInstitutionName) {
    return {
      serverErrors: serverErrors,
      error: true
    };
  }
  basket.removeAllPaymentInstruments();
  Transaction.wrap(function () {
    if (basketTotal.value > 0) {
      var paymentInstrument = basket.createPaymentInstrument(paymentMethodID, basketTotal);
      paymentInstrument.custom.linkedBankName = paymentInformation.financialInstitutionName;
      paymentInstrument.custom.linkedBankLastNumbers = paymentInformation.accountLastFourDigits;
      paymentInstrument.custom.linkedBankIcon = paymentInformation.iconUrl;
    }
  });
  return {
    serverErrors: serverErrors,
    error: false
  };
}

/**
 * @param {number} orderNumber - The current order's number
 * @param {dw.order.PaymentInstrument} paymentInstrument -  The payment instrument to authorize
 * @param {dw.order.PaymentProcessor} paymentProcessor -  The payment processor of the current
 *      payment method
 * @param {dw.order.Order} order -  The payment processor of the current
 * @return {Object} returns an error object
 */
function Authorize(orderNumber, paymentInstrument, paymentProcessor, order) {
  var serverErrors = [];
  var fieldErrors = {};
  var error = false;
  var logger = linkMoneyHelper.getLinkMoneyLogger();
  try {
    var initiatePaymentService = require('~/cartridge/services/linkMoneyInitiatePaymentService');
    var svcResult;
    var orderCustomer = order.getCustomer();
    // eslint-disable-next-line no-undef
    if (orderCustomer.authenticated) {
      var profile = order.customer.getProfile();
      svcResult = initiatePaymentService.linkMoneyInitiatePaymentService.call({
        customerId: profile.custom.linkMoneyCustomerId,
        cartTotals: order.totalGrossPrice,
        merchantId: linkMoneyHelper.getCustomPreferenceValue('linkMoneyMerchantId')
      });
    } else {
      svcResult = initiatePaymentService.linkMoneyInitiatePaymentService.call({
        // eslint-disable-next-line no-undef
        customerId: session.custom.guestCustomerId,
        cartTotals: order.totalGrossPrice,
        merchantId: linkMoneyHelper.getCustomPreferenceValue('linkMoneyMerchantId')
      });
    }
    if (svcResult.status === 'OK') {
      Transaction.wrap(function () {
        paymentInstrument.paymentTransaction.setTransactionID(svcResult.object.paymentId);
        paymentInstrument.paymentTransaction.setPaymentProcessor(paymentProcessor);
      });
    } else {
      logger.error(svcResult.errorMessage);
      throw new Error(svcResult.errorMessage);
    }
    switch (svcResult.object.paymentStatus) {
      case constants.LINK_PAY_PAYMENT_STATUS.AUTHORIZED:
        linkMoneyHelper.setLastLinkMoneyPaymentStatus(order, constants.LINK_PAY_PAYMENT_STATUS.AUTHORIZED);
        Transaction.wrap(function () {
          // eslint-disable-next-line no-param-reassign
          order.custom.linkMoneyOrderId = svcResult.object.clientReferenceId;
        });
        break;
      case constants.LINK_PAY_PAYMENT_STATUS.PENDING:
        Transaction.wrap(function () {
          // eslint-disable-next-line no-param-reassign
          order.custom.linkMoneyOrderId = svcResult.object.clientReferenceId;
        });
        linkMoneyHelper.setLastLinkMoneyPaymentStatus(order, constants.LINK_PAY_PAYMENT_STATUS.PENDING);
        break;
      case constants.LINK_PAY_PAYMENT_STATUS.TERMINAL_FAILED:
        linkMoneyHelper.setLastLinkMoneyPaymentStatus(order, constants.LINK_PAY_PAYMENT_STATUS.FAILED);
        throw new Error(Resource.msg('linkmoney.payment.error', 'linkmoney', null));
      default:
        linkMoneyHelper.setLastLinkMoneyPaymentStatus(order, constants.LINK_PAY_PAYMENT_STATUS.FAILED);
        throw new Error(svcResult.object.errorDetails.errorMessage);
    }
  } catch (e) {
    error = true;
    logger.error(e);
    serverErrors.push(e);
  }
  return {
    fieldErrors: fieldErrors,
    serverErrors: serverErrors,
    error: error
  };
}
exports.Authorize = Authorize;
exports.Handle = Handle;