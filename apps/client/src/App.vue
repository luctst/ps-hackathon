<script>
import CheckoutView from "./views/CheckoutView.vue";
import { loadScript } from "@paypal/paypal-js";

const CLIENT_ID = 'AcG9tUFUS4-MEUvw0QU1Qeicds-pn0GJy27nLHwbrGJPtX1GSRjMxLPKrqY_Oo5VfshkHr2Tdx7ZNEpn';
const MERCHANT_ID = 'WGB2BUWE22BZE';
const PARTNER_ATTRIBUTION_ID = 'PrestaShop_Cart_PSXO_Testing';

let paypal;

try {
  paypal = await loadScript({
    clientId: CLIENT_ID,
    merchantId: MERCHANT_ID,
    dataPartnerAttributionId: PARTNER_ATTRIBUTION_ID,
  });
} catch (error) {
  console.error("failed to load the PayPal JS SDK script", error);
}

export default {
  components: {CheckoutView}
}
</script>

<template>
  <main>
    <CheckoutView />
  </main>
</template>
