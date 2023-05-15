'use strict';

var Result = require('dw/svc/Result');
var constants = require('~/cartridge/scripts/util/constants');
var Transaction = require('dw/system/Transaction');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var linkMoneyHelper = require('~/cartridge/scripts/util/linkMoneyHelper');

/**
 * @desc Retrieves token from custom object
 * @returns {Object|null} Token and expiry time object or null if CO not found
 */
function getExistingToken() {
  var linkMoneyAuthTokenType = constants.CUSTOM_OBJECT_TYPE.LINK_MONEY_AUTH_TOKEN;
  var linkMoneyAuthTokenObject = CustomObjectMgr.getCustomObject(linkMoneyAuthTokenType, linkMoneyAuthTokenType);
  if (linkMoneyAuthTokenObject && linkMoneyAuthTokenObject.custom.token) {
    return {
      token: linkMoneyAuthTokenObject.custom.token,
      expiryTime: linkMoneyAuthTokenObject.custom.tokenExpiryTime
    };
  }
  return null;
}

/**
 * @desc Calls Link Money Service to retrieve auth token
 * @returns {Object} - token and expiry time or throws Error in case of failure
 */
function getNewToken() {
  var initiatePaymentService = require('~/cartridge/services/linkMoneyInitServices');
  var clientId = linkMoneyHelper.getCustomPreferenceValue('linkMoneyClientId');
  var clientSecret = linkMoneyHelper.getCustomPreferenceValue('linkMoneyClientSecret');
  var logger = linkMoneyHelper.getLinkMoneyLogger();
  if (!clientId) {
    logger.error('ClientId is not provided');
    throw new Error('ClientId is not provided');
  }
  if (!clientSecret) {
    logger.error('ClientSecret is not provided');
    throw new Error('ClientSecret is not provided');
  }
  var svcResult = initiatePaymentService.getAuthTokenService().call({
    clientId: clientId,
    clientSecret: clientSecret
  });
  if (svcResult.getStatus() !== Result.OK) {
    logger.error('Error while retrieving auth token');
    throw new Error('Error while retrieving auth token');
  }
  return {
    token: svcResult.object.access_token,
    expiryTime: svcResult.object.expires_in
  };
}

/**
 * @desc Saves the token and expiry time to Custom Object
 * @param {Object} tokenObject - the token and expiry time to save to CO
 */
function saveTokenToCustomObject(tokenObject) {
  var linkMoneyAuthTokenType = constants.CUSTOM_OBJECT_TYPE.LINK_MONEY_AUTH_TOKEN;
  var linkMoneyAuthTokenObject = CustomObjectMgr.getCustomObject(linkMoneyAuthTokenType, linkMoneyAuthTokenType);
  Transaction.wrap(function () {
    if (!linkMoneyAuthTokenObject) {
      linkMoneyAuthTokenObject = CustomObjectMgr.createCustomObject(linkMoneyAuthTokenType, linkMoneyAuthTokenType);
    }
    var currentTimestamp = new Date().getTime();
    var tokenExpiryTime = new Date(tokenObject.expiryTime * 1000 + currentTimestamp);
    linkMoneyAuthTokenObject.custom.token = tokenObject.token;
    linkMoneyAuthTokenObject.custom.tokenExpiryTime = tokenExpiryTime;
  });
}

/**
 * @desc Returns auth token for calling Link Money Services
 * @returns {string} - token for calling Link Money Services
 */
function getToken() {
  var tokenObject = getExistingToken();
  if (tokenObject) {
    var currentTimestamp = new Date().getTime();
    if (currentTimestamp < tokenObject.expiryTime.getTime()) {
      return tokenObject.token;
    }
  }
  tokenObject = getNewToken();
  saveTokenToCustomObject(tokenObject);
  return tokenObject.token;
}
module.exports = {
  getToken: getToken
};