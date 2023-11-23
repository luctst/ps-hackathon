<script setup lang="ts">
import trpc from "../trpc.ts";
import {PayPalNamespace} from "@paypal/paypal-js";
import { toast, type ToastOptions } from 'vue3-toastify';


type Props = {
  paypal: PayPalNamespace;
};

const notify = (message: string, type: string) => {
  toast(message, {
    type,
    autoClose: 4000,
    position: toast.POSITION.BOTTOM_RIGHT,
  } as ToastOptions);
}


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
      try {
        let orderData = await capturePayPalOrder(data.orderID);
        notify(orderData.purchase_units[0].payments.captures[0].status, 'success');
      } catch(error) {
        notify(error.message, 'error');
      }
    }
  })
      .render("#paypal-button-container");
}
</script>

<template>
  <div id="paypal-button-container"></div>
</template>
