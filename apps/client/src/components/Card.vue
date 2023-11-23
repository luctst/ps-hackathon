<script setup lang="ts">
import { PayPalNamespace } from "@paypal/paypal-js";
import { ref } from "vue";

type Props = {
  paypal: PayPalNamespace | null;
  createOrder: () => Promise<any>;
  onApprove: (data: any) => Promise<any>;
};

const props = defineProps<Props>();

let cardField: any;
let cardFieldIsEligible = ref(false);
let cardFieldsSubmitted = ref(false);

if (props.paypal && props.paypal.CardFields) {
  cardField = props.paypal.CardFields({
    createOrder: () => {
      return props.createOrder();
    },
    onApprove: (data: any) => {
      return props.onApprove(data.orderID);
    },
  });

  cardFieldIsEligible.value = cardField.isEligible();

  if (cardFieldIsEligible) {
    const nameField = cardField.NameField();
    nameField.render("#card-name-field-container").catch((error: any) => {
      console.error(error);
    });

    const numberField = cardField.NumberField();
    numberField.render("#card-number-field-container").catch((error: any) => {
      console.error(error);
    });

    const cvvField = cardField.CVVField();
    cvvField.render("#card-cvv-field-container").catch((error: any) => {
      console.error(error);
    });

    const expiryField = cardField.ExpiryField();
    expiryField.render("#card-expiry-field-container").catch((error: any) => {
      console.error(error);
    });
  }
}

const submitCardFields = () => {
  if (!cardField || !cardFieldIsEligible) {
    return;
  }
  cardFieldsSubmitted.value = true;
  cardField
    .submit()
    .then(() => {
      cardFieldsSubmitted.value = false;
    })
    .catch((error: any) => {
      console.error(error);
      cardFieldsSubmitted.value = false;
    });
};
</script>

<template>
  <div id="checkout-form">
    <div id="card-name-field-container"></div>
    <div id="card-number-field-container"></div>
    <div class="row">
      <div class="col-50">
        <div id="card-expiry-field-container"></div>
      </div>
      <div class="col-50">
        <div id="card-cvv-field-container"></div>
      </div>
    </div>
    <button
      id="card-field-submit-button"
      type="button"
      class="btn"
      @click="submitCardFields"
      :disabled="cardFieldsSubmitted"
    >
      Pay now with Card Fields
    </button>
  </div>
</template>
