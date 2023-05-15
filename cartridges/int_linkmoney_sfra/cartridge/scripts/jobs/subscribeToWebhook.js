'use strict';

var Status = require('dw/system/Status');
var StatusItem = require('dw/system/StatusItem');
var webhookSubscribeService = require('~/cartridge/services/linkMoneyWebhookSubscribeService');
var linkMoneyHelper = require('~/cartridge/scripts/util/linkMoneyHelper');
var Logger = require('dw/system/Logger');
var constants = require('~/cartridge/scripts/util/constants');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var URLUtils = require('dw/web/URLUtils');
var Transaction = require('dw/system/Transaction');

/**
 * Subscribe for webhook on each storefront
 * @returns {dw.system.Status} status object
 */
function execute() {
  var status = new Status(Status.OK);
  var linkMoneySubscriptionKeyType = constants.CUSTOM_OBJECT_TYPE.LINK_MONEY_WEBHOOK_SUBSCRIPTION_KEY;
  var linkMoneySubscriptionKeyObject = CustomObjectMgr.getCustomObject(linkMoneySubscriptionKeyType, linkMoneySubscriptionKeyType);
  var linkMoneyLogger = Logger.getLogger(constants.LINK_PAYMENT_METHOD_ID, constants.LINK_PAYMENT_METHOD_ID);
  if (!linkMoneySubscriptionKeyObject) {
    linkMoneySubscriptionKeyObject = CustomObjectMgr.createCustomObject(linkMoneySubscriptionKeyType, linkMoneySubscriptionKeyType);
  }
  try {
    var resultObject = webhookSubscribeService.linkMoneyWebhookSubscribeService.call({
      url: URLUtils.https('LinkMoneyHook-Listen').toString(),
      secretKey: linkMoneyHelper.getCustomPreferenceValue('linkMoneyClientSecret')
    });
    var resultObjectStr = JSON.stringify(resultObject.object, null, 2);
    linkMoneyLogger.info(constants.LINK_PAYMENT_METHOD_ID + 'Webhook Subscribed: ' + resultObjectStr);
    if (resultObject.object && resultObject.object.subscriptionKey) {
      Transaction.wrap(function () {
        linkMoneySubscriptionKeyObject.custom.subscriptionKey = resultObject.object.subscriptionKey;
      });
    }
    status.addItem(new StatusItem(Status.OK, resultObjectStr));
  } catch (e) {
    var errorMessage = constants.LINK_PAYMENT_METHOD_ID + ':' + e.toString() + ' in ' + e.fileName + ':' + e.lineNumber;
    linkMoneyLogger.error(errorMessage);
    status.addItem(new StatusItem(Status.ERROR, errorMessage));
  }
  return status;
}
module.exports = exports = {
  execute: execute
};