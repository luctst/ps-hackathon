<script setup lang="ts">
import trpc from "../trpc.ts";
import {PayPalNamespace} from "@paypal/paypal-js";

type Props = {
  paypal: PayPalNamespace;
};

const props = defineProps<Props>();

const createPayPalOrder = async () => {
  const order = await trpc.createOrder.query();
  console.log("Create Order Result", order);
  return order;
}

const capturePayPalOrder = async (orderId: string) => {
  const order = await trpc.captureOrder.query(orderId);
  console.log("Capture Order Result", order);
  return order;
}

if (props.paypal && props.paypal.Buttons) {
  props.paypal.Buttons({
    fundingSource: props.paypal?.FUNDING?.PAYPAL,
    createOrder: async () => {
      let orderData = await createPayPalOrder();
      console.log("Create Order Result", orderData);
      return orderData.id;
    },
    onApprove: async (data: any) => {
      console.log("Approve result", data);
      let orderData = await capturePayPalOrder(data.orderID);
      console.log("Capture result", orderData);
    }
  })
      .render("#paypal-button-container");
}
</script>

<template>
  <div id="paypal-button-container"></div>
</template>
