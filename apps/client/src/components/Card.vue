<script setup lang="ts">
type Props = {
  paypal: unknown;
};

const props = defineProps<Props>();
</script>

<template>
  <h3>Payment</h3>
  <label for="cname">Name on Card</label>
  <input type="text" id="cname" name="cardname" placeholder="John More Doe">
  <label for="ccnum">Credit card number</label>
  <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444">
  <label for="expmonth">Exp Month</label>
  <input type="text" id="expmonth" name="expmonth" placeholder="September">

  <div class="row">
    <div class="col-50">
      <label for="expyear">Exp Year</label>
      <input type="text" id="expyear" name="expyear" placeholder="2018">
    </div>
    <div class="col-50">
      <label for="cvv">CVV</label>
      <input type="text" id="cvv" name="cvv" placeholder="352">
    </div>
  </div>
</template>
