<script setup lang="ts">
import trpc from "../trpc.ts";
import { PayPalNamespace } from "@paypal/paypal-js";
import { toast, type ToastOptions } from "vue3-toastify";
import Card from "../components/Card.vue";
import Cart from "../components/Cart.vue";
import PayPalCheckoutButton from "../components/PayPalCheckoutButton.vue";
import { ref } from "vue";

type Props = {
  paypal: PayPalNamespace | null;
};

defineProps<Props>();

let discount = ref("");

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

const triggerConfetti = (confettiInstance: unknown) => {
  let isConfettiInstaceStarted = 0;
  const options = discount.value.includes("$")
    ? {
        particles: [
          {
            type: "image",
            size: 30,
            url: "http://localhost:5173/logo.png",
          },
        ],
      }
    : {};
  confettiInstance.start(options);

  const stopInterval = setInterval(() => {
    if (isConfettiInstaceStarted === 2) {
      confettiInstance.stop();
      clearInterval(stopInterval);
      return;
    }

    isConfettiInstaceStarted += 1;
  }, 1000);
};
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
          type="text"
          id="discount"
          placeholder="Discount code"
          v-model="discount"
        />
        <input
          type="button"
          id="discount"
          @click="triggerConfetti($confetti)"
          value="Add a discount"
          :disabled="!discount"
        />
      </div>
    </div>
  </div>
</template>
