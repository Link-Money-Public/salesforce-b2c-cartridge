'use strict';

var base = require('base/checkout/billing');

/**
 * Updates the payment information in checkout, based on the supplied order model
 * @param {Object} order - checkout model to use as basis of new truth
 */
function updatePaymentInformation(order) {
  // update payment details
  var $paymentSummary = $('.payment-details');
  var htmlToAppend = '';
  if (order.billing.payment && order.billing.payment.selectedPaymentInstruments && order.billing.payment.selectedPaymentInstruments.length > 0) {
    for (var i = 0; i < order.billing.payment.selectedPaymentInstruments.length; i++) {
      var instrument = order.billing.payment.selectedPaymentInstruments[i];
      if (instrument.paymentMethod === 'CREDIT_CARD') {
        htmlToAppend += '<span>' + order.resources.cardType + ' ' + order.billing.payment.selectedPaymentInstruments[i].type + '</span><div>' + order.billing.payment.selectedPaymentInstruments[i].maskedCreditCardNumber + '</div><div><span>' + order.resources.cardEnding + ' ' + order.billing.payment.selectedPaymentInstruments[i].expirationMonth + '/' + order.billing.payment.selectedPaymentInstruments[i].expirationYear + '</span></div>';
      } else if (instrument.paymentMethod === 'GIFT_CERTIFICATE') {
        htmlToAppend += '<div><span>Gift Certificate</span></div>' + '<div>' + instrument.maskedGiftCertificateCode + '</div>';
        /* Custom Link Money cartridge start */
      } else if (instrument.paymentMethod === 'LINKMONEY') {
        htmlToAppend += '<div class="d-flex align-items-center mt-1"><img class="mr-2" height="30" src="' + order.billing.payment.selectedPaymentInstruments[i].linkedBankIcon + '" alt="Logo">' + '<span>' + order.billing.payment.selectedPaymentInstruments[i].linkedBankName + '</span>' + '<span>(...' + order.billing.payment.selectedPaymentInstruments[i].linkedBankLastNumbers + ')</span></div>';
      }
      /* Custom Link Money cartridge end */
    }
  }

  $paymentSummary.empty().append(htmlToAppend);
}
base.methods.updatePaymentInformation = updatePaymentInformation;
module.exports = base;