<script setup lang="ts">
import { PayPalNamespace } from "@paypal/paypal-js";

type Props = {
  paypal: PayPalNamespace | null;
  createOrder: () => Promise<any>;
  onApprove: (data: any) => Promise<any>;
};

const props = defineProps<Props>();

if (props.paypal && props.paypal.Buttons) {
  props.paypal
    .Buttons({
      fundingSource: props.paypal?.FUNDING?.PAYPAL,
      createOrder: () => {
        return props.createOrder();
      },
      onApprove: (data: any) => {
        return props.onApprove(data.orderID);
      },
    })
    .render("#paypal-button-container")
    .catch((error: any) => {
      console.error(error);
    });
}
</script>

<template>
  <div id="paypal-button-container"></div>
</template>
