'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var linkMoneyAuthToken = require('~/cartridge/scripts/util/linkMoneyGetToken');
var linkMoneyHelper = require('~/cartridge/scripts/util/linkMoneyHelper');
var constants = require('~/cartridge/scripts/util/constants');
var linkMoneyWebhookUnsubscribeService = LocalServiceRegistry.createService('linkmoney.webhook.unsubscribe.service', {
  createRequest: function (svc, params) {
    svc.setRequestMethod('PUT');
    svc.setURL(linkMoneyHelper.getCustomPreferenceValue('linkMoneyApiBaseUrl') + constants.ENDPOINT.WEBHOOK.UNSUBSCRIBE);
    svc.addHeader('Accept', 'application/json');
    svc.addHeader('Content-Type', 'application/json');
    svc.addHeader('Authorization', 'Bearer ' + linkMoneyAuthToken.getToken());
    return JSON.stringify({
      subscriptionId: params.subscriptionId,
      subscriptionDetails: {
        type: 'ALL'
      }
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
  linkMoneyWebhookUnsubscribeService: linkMoneyWebhookUnsubscribeService
};