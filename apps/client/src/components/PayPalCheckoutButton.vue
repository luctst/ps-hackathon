<script setup lang="ts">
import trpc from "../trpc.ts";

type Props = {
  paypal: unknown;
};

const props = defineProps<Props>();

const createPayPalOrder = async () => {
  const order = await trpc.createOrder.query();
  console.log("Create Order Result", order);
  return order;
}

const capturePayPalOrder = async (orderId: string) => {
  const order = await trpc.captureOrder.query(orderId);
  return order;
}

props.paypal.Buttons({
  createOrder: () => {
    return createPayPalOrder()
        .then((orderData) => {
          console.log("Create Order Result", orderData);
          return orderData.id;
        });
  },
  onApprove: (data) => {
    console.log("Approve result", data);
    return capturePayPalOrder(data.orderID)
        .then((orderData) => {
          console.log("Capture result", orderData);
          var transaction = orderData.purchase_units[0].payments.captures[0];
        });
  }
})
    .render("#paypal-button-container");
</script>

<template>
  <div id="paypal-button-container"></div>
</template>
