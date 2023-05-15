'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var constants = require('~/cartridge/scripts/util/constants');
var linkMoneyAuthToken = require('~/cartridge/scripts/util/linkMoneyGetToken');
var linkMoneyHelper = require('~/cartridge/scripts/util/linkMoneyHelper');
module.exports = {
  getAuthTokenService: function () {
    return LocalServiceRegistry.createService(constants.SERVICE.AUTH, {
      createRequest: function (svc, params) {
        svc.setRequestMethod('POST');
        svc.setURL(linkMoneyHelper.getCustomPreferenceValue('linkMoneyApiBaseUrl') + constants.ENDPOINT.AUTH);
        svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');
        svc.addParam('client_id', params.clientId);
        svc.addParam('client_secret', params.clientSecret);
        svc.addParam('scope', 'Link-Core');
        svc.addParam('grant_type', 'client_credentials');
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
  },
  getSessionKeyService: function () {
    return LocalServiceRegistry.createService(constants.SERVICE.SESSION, {
      createRequest: function (svc, params) {
        svc.setRequestMethod('POST');
        svc.setURL(linkMoneyHelper.getCustomPreferenceValue('linkMoneyApiBaseUrl') + constants.ENDPOINT.SESSION);
        svc.addHeader('Content-Type', 'application/json');
        svc.addHeader('Accept', 'application/json');
        svc.addHeader('Authorization', 'Bearer ' + linkMoneyAuthToken.getToken());
        return JSON.stringify({
          firstName: params.firstName,
          lastName: params.lastName,
          email: params.email,
          product: 'PAY'
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
  }
};