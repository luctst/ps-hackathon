<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CheckoutView from "./views/CheckoutView.vue";
import {loadScript, PayPalNamespace} from "@paypal/paypal-js";

const CLIENT_ID = 'AcG9tUFUS4-MEUvw0QU1Qeicds-pn0GJy27nLHwbrGJPtX1GSRjMxLPKrqY_Oo5VfshkHr2Tdx7ZNEpn';
const MERCHANT_ID = 'WGB2BUWE22BZE';
const PARTNER_ATTRIBUTION_ID = 'PrestaShop_Cart_PSXO_Testing';


const paypal = ref<PayPalNamespace | null>();
const isSdkLoaded = ref<boolean>(false);

onMounted(async () => {
  try {
    paypal.value = await loadScript({
      clientId: CLIENT_ID,
      merchantId: MERCHANT_ID,
      dataPartnerAttributionId: PARTNER_ATTRIBUTION_ID,
      components: ['buttons', 'card-fields'],
    });
    isSdkLoaded.value = true;
  } catch (error) {
    console.error("failed to load the PayPal JS SDK script", error);
  }
});
</script>

<template>
  <main>
    <CheckoutView v-if="isSdkLoaded" :paypal="paypal"/>
  </main>
</template>
