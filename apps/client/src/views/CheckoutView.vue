<script setup lang="ts">
import trpc from "../trpc.ts";
import { PayPalNamespace } from "@paypal/paypal-js";
import { toast, type ToastOptions } from "vue3-toastify";
import Card from "../components/Card.vue";
import Cart from "../components/Cart.vue";
import PayPalCheckoutButton from "../components/PayPalCheckoutButton.vue";

type Props = {
  paypal: PayPalNamespace | null;
};

defineProps<Props>();

const notify = (message: string, options: any) => {
  toast(message, {
    ...options,
    position: toast.POSITION.TOP_CENTER,
  } as ToastOptions);
};

const createPayPalOrder = async () => {
  try {
    const order = await trpc.createOrder.query();
    console.log("Create Order Result", order);
    notify(`PayPal order ${order.id} created !`, {
      type: toast.TYPE.SUCCESS,
      autoClose: 3000,
    });
    return order.id;
  } catch (error) {
    console.error(error);
    notify("Failed to create PayPal order !", {
      type: toast.TYPE.ERROR,
      autoClose: false,
    });
  }
};

const capturePayPalOrder = async (orderId: string) => {
  try {
    const order = await trpc.captureOrder.query(orderId);
    console.log("Capture Order Result", order);
    notify(
      `PayPal order ${order.id} captured !` +
        "\n" +
        `Transaction ${order.purchase_units[0].payments.captures[0].status} ${order.purchase_units[0].payments.captures[0].id}` +
        "\n" +
        `Payment method used: ${Object.keys(order.payment_source)[0]}` +
        "\n" +
        `Amount ${order.purchase_units[0].payments.captures[0].amount.value} ${order.purchase_units[0].payments.captures[0].amount.currency_code}`,
      {
        type: toast.TYPE.SUCCESS,
        autoClose: 10000,
      },
    );
    return order;
  } catch (error) {
    console.error(error);
    notify("Failed to capture PayPal order !", {
      type: toast.TYPE.ERROR,
      autoClose: false,
    });
  }
};

const triggerConfetti = (confettiInstace: unknown) => {
  let isConfettiInstaceStarted = 0;
  confettiInstace.start();

  const stopInterval = setInterval(() => {
    if (isConfettiInstaceStarted === 2) {
      confettiInstace.stop();
      clearInterval(stopInterval);
      return;
    }

    isConfettiInstaceStarted += 1;
  }, 1000);
};
const options = {};
</script>

<template>
  <div class="row">
    <div class="col-75">
      <div class="container">
        <PayPalCheckoutButton
          :paypal="paypal"
          :onApprove="capturePayPalOrder"
          :createOrder="createPayPalOrder"
          v-show="paypal?.Buttons"
        />
        <div class="text-center" v-show="paypal?.CardFields">Or</div>
        <Card
          :paypal="paypal"
          :onApprove="capturePayPalOrder"
          :createOrder="createPayPalOrder"
          v-show="paypal?.CardFields"
        />
      </div>
    </div>

    <div class="col-25">
      <Cart />
      <div class="text-center">
        <input
          type="button"
          id="discount"
          @click="triggerConfetti($confetti)"
          value="Add a discount"
        />
      </div>
    </div>
  </div>
</template>
