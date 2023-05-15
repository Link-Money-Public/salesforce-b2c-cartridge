import Link from '@link.money/linkmoney-web';
var constants = require('../../../scripts/util/constants.js');
$(document).ready(function () {
  if ($('.linkMoney-tab').hasClass('active') && !$('.linked-bank').length) {
    $('.submit-payment').attr('disabled', true);
  }
  $('.payment-options .nav-item').on('click', function () {
    if ($(this).data('method-id') !== constants.LINK_PAYMENT_METHOD_ID) {
      $('.submit-payment').attr('disabled', false);
    }
    if ($(this).data('method-id') === constants.LINK_PAYMENT_METHOD_ID && !$('.linked-bank').length) {
      $('.submit-payment').attr('disabled', true);
    }
  });
  $('#link-btn').on('click', function () {
    if (window.isGuestCustomer === 'false') {
      const config = {
        sessionKey: window.linkMoneySessionId,
        redirect: window.linkMoneyRedirectUrl,
        environment: window.linkMoneyEnvironment
      };
      const link = Link.LinkInstance(config);
      link.action();
    } else {
      $.ajax({
        url: window.getGuestSessionUrl,
        type: 'get',
        success: function success(data) {
          const config = {
            sessionKey: data.sessionKey,
            redirect: window.linkMoneyRedirectUrl,
            environment: window.linkMoneyEnvironment
          };
          const link = Link.LinkInstance(config);
          link.action();
        },
        error: function error() {}
      });
    }
  });
});