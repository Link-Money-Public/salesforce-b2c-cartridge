'use strict';

var Status = require('dw/system/Status');
var StatusItem = require('dw/system/StatusItem');
var webhookUnsubscribeService = require('~/cartridge/services/linkMoneyWebhookUnsubscribeService');
var Logger = require('dw/system/Logger');
var constants = require('~/cartridge/scripts/util/constants');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');

/**
 * Unsubscribe from webhook on each storefront
 * @returns {dw.system.Status} status object
 */
function execute() {
  var status = new Status(Status.OK);
  var linkMoneySubscriptionKeyType = constants.CUSTOM_OBJECT_TYPE.LINK_MONEY_WEBHOOK_SUBSCRIPTION_KEY;
  var linkMoneySubscriptionKeyObject = CustomObjectMgr.getCustomObject(linkMoneySubscriptionKeyType, linkMoneySubscriptionKeyType);
  var linkMoneyLogger = Logger.getLogger(constants.LINK_PAYMENT_METHOD_ID, constants.LINK_PAYMENT_METHOD_ID);
  if (!linkMoneySubscriptionKeyObject.custom.subscriptionKey) {
    status.addItem(new StatusItem(Status.ERROR, 'There is no active Webhoook subscription'));
    return status;
  }
  try {
    var resultObject = webhookUnsubscribeService.linkMoneyWebhookUnsubscribeService.call({
      subscriptionId: linkMoneySubscriptionKeyObject.custom.subscriptionKey
    });
    linkMoneyLogger.info(constants.LINK_PAYMENT_METHOD_ID + 'Webhook Unsubscribed');
    if (resultObject.status === 'OK') {
      Transaction.wrap(function () {
        linkMoneySubscriptionKeyObject.custom.subscriptionKey = '';
      });
    }
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