'use strict';

var Logger = require('dw/system/Logger');
var Transaction = require('dw/system/Transaction');
var constants = require('~/cartridge/scripts/util/constants');
var PaymentMgr = require('dw/order/PaymentMgr');
var OrderMgr = require('dw/order/OrderMgr');
var HookMgr = require('dw/system/HookMgr');

/**
 * Get CustomPreference Value
 * @param {string} preferenceId custom preference's ID
 * @returns {string} custom preference's value
 */
function getCustomPreferenceValue(preferenceId) {
  var currentSite = require('dw/system/Site').getCurrent();
  var preferenceValue = null;
  if (preferenceId in currentSite.preferences.custom) {
    preferenceValue = currentSite.getCustomPreferenceValue(preferenceId);
  }
  return preferenceValue;
}

/**
 * Get logger for Link Money Payment
 * @returns {dw.system.Log} a Log object with a "LinkMoney" prefix name
 */
function getLinkMoneyLogger() {
  return Logger.getLogger(constants.LINK_PAYMENT_METHOD_ID, constants.LINK_PAYMENT_METHOD_ID);
}

/**
 * Sets the last Link Money payment status to the order's custom.linkMoneyPaymentStatus
 * @param {dw.order.Order} order - The order to be updated
 * @param {string} lastPaymentStatus - the last Link Money payment status
 */
function setLastLinkMoneyPaymentStatus(order, lastPaymentStatus) {
  if (!order) {
    return;
  }
  try {
    Transaction.wrap(function () {
      order.custom.linkMoneyPaymentStatus = lastPaymentStatus; // eslint-disable-line no-param-reassign
    });
  } catch (e) {
    getLinkMoneyLogger().error('Set Last Payment Status', 'setLastLinkMoneyPaymentStatus', e.message);
  }
}

/**
 * Create a Link Money checkout session
 * @param {dw.order.Basket} basket - The current basket
 * @param {string} firstName - Customer's first name
 * @param {string} lastName - Customer's last name
 * @param {string} email - Customer's email
 */
function setBasketSession(basket, firstName, lastName, email) {
  var linkMoneyInitServices = require('~/cartridge/services/linkMoneyInitServices');
  var svcResult = linkMoneyInitServices.getSessionKeyService().call({
    firstName: firstName,
    lastName: lastName,
    email: email
  });
  if (svcResult.isOk()) {
    Transaction.wrap(function () {
      // eslint-disable-next-line no-param-reassign
      basket.custom.linkMoneySessionId = svcResult.object.sessionKey;
    });
  } else {
    throw new Error(svcResult.errorMessage);
  }
}

/**
 * handles the payment authorization for Link Money payment instrument
 * @param {dw.order.Order} order - the order object
 * @param {string} orderNumber - The order number for the order
 * @returns {Object} an error object
 */
function handlePayments(order, orderNumber) {
  var result = {};
  if (order.totalNetPrice !== 0.0) {
    var paymentInstruments = order.paymentInstruments;
    if (paymentInstruments.length === 0) {
      Transaction.wrap(function () {
        OrderMgr.failOrder(order, true);
      });
      result.error = true;
    }
    if (!result.error) {
      for (var i = 0; i < paymentInstruments.length; i++) {
        var paymentInstrument = paymentInstruments[i];
        var paymentProcessor = PaymentMgr.getPaymentMethod(paymentInstrument.paymentMethod).paymentProcessor;
        var authorizationResult;
        if (paymentProcessor === null) {
          Transaction.begin();
          paymentInstrument.paymentTransaction.setTransactionID(orderNumber);
          Transaction.commit();
        } else {
          if (HookMgr.hasHook('app.payment.processor.' + paymentProcessor.ID.toLowerCase()) && paymentProcessor.ID.toLowerCase() === constants.LINK_PAYMENT_METHOD_ID.toLowerCase()) {
            authorizationResult = HookMgr.callHook('app.payment.processor.' + paymentProcessor.ID.toLowerCase(), 'Authorize', orderNumber, paymentInstrument, paymentProcessor, order);
          } else {
            authorizationResult = HookMgr.callHook('app.payment.processor.default', 'Authorize');
          }
          if (authorizationResult.error) {
            Transaction.wrap(function () {
              OrderMgr.failOrder(order, true);
            });
            result.error = true;
            result.errorMessage = authorizationResult.serverErrors;
            break;
          }
        }
      }
    }
  }
  return result;
}

/**
 * Checks if the chosen payment method is Link Money
 * @param {dw.order.Basket} basket - The current basket
 * @returns {boolean} Is it Link Money payment method
 */
function isNotLinkMoney(basket) {
  return basket.paymentInstrument.paymentMethod !== constants.LINK_PAYMENT_METHOD_ID;
}
module.exports = {
  getCustomPreferenceValue: getCustomPreferenceValue,
  getLinkMoneyLogger: getLinkMoneyLogger,
  setLastLinkMoneyPaymentStatus: setLastLinkMoneyPaymentStatus,
  setBasketSession: setBasketSession,
  handlePayments: handlePayments,
  isNotLinkMoney: isNotLinkMoney
};