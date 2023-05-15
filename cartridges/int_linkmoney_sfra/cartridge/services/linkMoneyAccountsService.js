'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var constants = require('~/cartridge/scripts/util/constants');
var linkMoneyAuthToken = require('~/cartridge/scripts/util/linkMoneyGetToken');
var linkMoneyHelper = require('~/cartridge/scripts/util/linkMoneyHelper');
var linkMoneyAccountsService = LocalServiceRegistry.createService(constants.SERVICE.ACCOUNT, {
  createRequest: function (svc, params) {
    svc.setRequestMethod('GET');
    svc.setURL(linkMoneyHelper.getCustomPreferenceValue('linkMoneyApiBaseUrl') + constants.ENDPOINT.ACCOUNT + '/' + params.customerId + '/accounts');
    svc.addHeader('Content-Type', 'application/json');
    svc.addHeader('Accept', 'application/json');
    svc.addHeader('Authorization', 'Bearer ' + linkMoneyAuthToken.getToken());
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
  linkMoneyAccountsService: linkMoneyAccountsService
};