<script setup lang="ts">
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
              <BillingAddress/>
            </div>
            <div class="col-50">
              <Card/>
            </div>
          </div>
          <input type="submit" value="Continue to checkout" class="btn">
          <div class="text-center">Or</div>
          <PayPalCheckoutButton />
        </form>
      </div>
    </div>

    <div class="col-25">
      <Cart />
    </div>
  </div>
</template>
