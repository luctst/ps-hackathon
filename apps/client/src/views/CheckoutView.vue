<script setup lang="ts">
import Card from "../components/Card.vue";
import Cart from "../components/Cart.vue";
import PayPalCheckoutButton from "../components/PayPalCheckoutButton.vue";

type Props = {
  paypal: unknown;
};

defineProps<Props>();
</script>

<template>
  <div class="row">
    <div class="col-75">
      <div class="container">
          <PayPalCheckoutButton :paypal="paypal" />
          <div class="text-center">Or</div>
          <Card :paypal="paypal"/>
      </div>
    </div>

    <div class="col-25">
      <Cart />
    </div>
  </div>
</template>
