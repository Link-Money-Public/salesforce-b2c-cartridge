'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var constants = require('~/cartridge/scripts/util/constants');
var UUIDUtils = require('dw/util/UUIDUtils');
var linkMoneyAuthToken = require('~/cartridge/scripts/util/linkMoneyGetToken');
var linkMoneyHelper = require('~/cartridge/scripts/util/linkMoneyHelper');
var linkMoneyInitiatePaymentService = LocalServiceRegistry.createService('linkmoney.initiatePayment.service', {
  createRequest: function (svc, params) {
    svc.setRequestMethod('POST');
    svc.setURL(linkMoneyHelper.getCustomPreferenceValue('linkMoneyApiBaseUrl') + constants.ENDPOINT.PAYMENTS);
    svc.addHeader('Content-Type', 'application/json');
    svc.addHeader('Accept', 'application/json');
    svc.addHeader('Authorization', 'Bearer ' + linkMoneyAuthToken.getToken());
    return JSON.stringify({
      source: {
        id: params.customerId,
        type: 'CUSTOMER'
      },
      destination: {
        id: params.merchantId,
        type: 'MERCHANT'
      },
      amount: {
        currency: 'USD',
        value: Number(params.cartTotals)
      },
      requestKey: UUIDUtils.createUUID(),
      clientReferenceId: UUIDUtils.createUUID()
    });
  },
  parseResponse: function (svc, httpClient) {
    var result;
    try {
      result = JSON.parse(httpClient.text);
    } catch (e) {
      result = httpClient.text;
    }
    return result;
  }
});
module.exports = {
  linkMoneyInitiatePaymentService: linkMoneyInitiatePaymentService
};