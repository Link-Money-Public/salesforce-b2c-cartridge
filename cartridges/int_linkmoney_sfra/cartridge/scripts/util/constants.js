'use strict';

module.exports = {
  SERVICE: {
    AUTH: 'linkmoney.auth.service',
    SESSION: 'linkmoney.session.service',
    ACCOUNT: 'linkmoney.accounts.service'
  },
  ENDPOINT: {
    AUTH: '/v1/tokens',
    SESSION: '/v1/sessions',
    ACCOUNT: '/v1/customers',
    PAYMENTS: '/v1/payments',
    WEBHOOK: {
      SUBSCRIBE: '/v1/webhook/subscribe',
      UNSUBSCRIBE: '/v1/webhook/unsubscribe'
    }
  },
  CUSTOM_OBJECT_TYPE: {
    LINK_MONEY_AUTH_TOKEN: 'LinkMoneyAuthToken',
    LINK_MONEY_WEBHOOK_SUBSCRIPTION_KEY: 'LinkMoneyWebhookSubscriptionKey'
  },
  LINK_PAY_PAYMENT_STATUS: {
    TERMINAL_FAILED: 'TERMINAL_FAILED',
    FAILED: 'FAILED',
    PENDING: 'PENDING',
    AUTHORIZED: 'AUTHORIZED',
    SUCCEEDED: 'SUCCEEDED',
    SETTLED: 'SETTLED'
  },
  LINK_PAYMENT_METHOD_ID: 'LINKMONEY'
};