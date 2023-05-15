'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var constants = require('~/cartridge/scripts/util/constants');
var linkMoneyAuthToken = require('~/cartridge/scripts/util/linkMoneyGetToken');
var linkMoneyHelper = require('~/cartridge/scripts/util/linkMoneyHelper');
var linkMoneyWebhookSubscribeService = LocalServiceRegistry.createService('linkmoney.webhook.subscribe.service', {
  createRequest: function (svc, params) {
    svc.setRequestMethod('POST');
    svc.setURL(linkMoneyHelper.getCustomPreferenceValue('linkMoneyApiBaseUrl') + constants.ENDPOINT.WEBHOOK.SUBSCRIBE);
    svc.addHeader('Content-Type', 'application/json');
    svc.addHeader('Authorization', 'Bearer ' + linkMoneyAuthToken.getToken());
    return JSON.stringify({
      url: params.url,
      secretKey: params.secretKey,
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
  linkMoneyWebhookSubscribeService: linkMoneyWebhookSubscribeService
};