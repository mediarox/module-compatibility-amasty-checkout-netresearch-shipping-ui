### Compatibility module for
* amasty/module-single-step-checkout
* netresearch/module-shipping-ui

#### Corrected behaviors

1. **Fixes a javascript ajax loop in checkout in case of preselect shipping method**
   
    The loop is characterized by the repetitive Ajax calls of "nrshipping/shipping-option/selection/update" and "shipping-information".
    An explanation can be found [here](https://github.com/netresearch/module-shipping-ui/issues/3). At the moment we override the mixin

    > Netresearch_ShippingUi/js/mixin/checkout/set-shipping-information

    to remove the calls to "shippingService.isLoading". However, as can be seen from the issue above, it is not yet conclusive whether this is useful.

#### Installation
```bash
composer require mediarox/module-compatibility-amasty-checkout-netresearch-shipping-ui
bin/magento setup:upgrade
```

#### Notice

Further suggestions, corrections or features (pull requests or issues) are welcome.