define([
    'jquery',
    'mage/translate',
    'mage/utils/wrapper',
    'uiRegistry',
    'Netresearch_ShippingUi/js/action/shipping-option/validation/validate-selection',
    'Netresearch_ShippingUi/js/action/shipping-option/validation/validate-compatibility',
    'Netresearch_ShippingUi/js/action/checkout/webapi/update-shipping-option-selection'
], function ($, $t, wrapper, registry, validateSelection, validateCompatibility, updateSelection) {

    'use strict';

    var getMessageContainer = function () {
        return registry.get('checkout.errors').messageContainer;
    };

    /**
     * Intercept click on "Next" button in checkout
     * to validate and save shipping option input values.
     * 
     * Change 1: Removes the "loop" cause "shippingService.isLoading".
     *
     * @param {callback} setShippingInformationAction
     */
    return function (setShippingInformationAction) {
        return wrapper.wrap(setShippingInformationAction, function (originalAction) {
            var selectionsValid = validateSelection(),
                selectionsCompatible = validateCompatibility();
            
            return $.Deferred(function (deferred) {
                if (selectionsValid && selectionsCompatible) {
                    updateSelection()
                    .done(function () {
                        originalAction().done(deferred.resolve);
                    })
                    .fail(function () {
                        originalAction().done(deferred.resolve);
                    });
                } else {
                    deferred.reject();
                }
            }).fail(function () {
                getMessageContainer().addErrorMessage({
                    'message': $t('Your shipping option selections could not be saved.')
                });
            });
        });
    };
});
