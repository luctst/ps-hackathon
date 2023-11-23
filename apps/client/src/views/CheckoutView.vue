<script setup lang="ts">
import Card from "../components/Card.vue";
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
        <form>
          <div class="row">
            <div class="col-50">
              <Card :paypal="paypal"/>
            </div>
          </div>
          <input type="submit" value="Continue to checkout" class="btn">
          <div class="text-center">Or</div>
          <PayPalCheckoutButton :paypal="paypal" />
        </form>
      </div>
    </div>

    <div class="col-25">
      <Cart />
    </div>
  </div>
</template>
