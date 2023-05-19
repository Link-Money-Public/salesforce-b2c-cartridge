var constants = require('../../../scripts/util/constants.js');

/**
 * @desc Validates billing and contacts fields
 * @returns {boolean} - valid
 */
function isBillingAndContactInfoValid() {
  var valid = true;
  $('.billing-address-block').find('input, select').each(function () {
    if (!this.validity.valid) {
      valid = false;
      $(this).trigger('invalid', this.validity);
    }
  });
  $('.contact-info-block').find('input, select').each(function () {
    if (!this.validity.valid) {
      valid = false;
      $(this).trigger('invalid', this.validity);
    }
  });
  return valid;
}
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
  $('#link-btn').on('click', function (event) {
    if (!isBillingAndContactInfoValid()) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  });
  $('.linkMoney-tooltip').on('click', function () {
    $('.tooltip-modal').removeClass('d-none');
  });
  $('.tooltip-cancel').on('click', function () {
    $('.tooltip-modal').addClass('d-none');
  });
  $('.tooltip-fade').on('click', function () {
    $('.tooltip-modal').addClass('d-none');
  });
});