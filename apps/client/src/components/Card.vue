<script setup lang="ts">
import trpc from "../trpc.ts";
import {PayPalNamespace} from "@paypal/paypal-js";
import { toast, type ToastOptions } from 'vue3-toastify';

type Props = {
  paypal: PayPalNamespace;
};

const props = defineProps<Props>();

const notify = (message: string, type: string) => {
  toast(message, {
    type,
    autoClose: 1000,
    position: toast.POSITION.BOTTOM_RIGHT,
  } as ToastOptions);
}

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

let cardField: any;
let cardFieldIsEligible = false;

if (props.paypal && props.paypal.CardFields) {
  cardField = props.paypal.CardFields({
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
  });

  cardFieldIsEligible = cardField.isEligible();

  if (cardFieldIsEligible) {
    const nameField = cardField.NameField();
    nameField.render('#card-name-field-container');

    const numberField = cardField.NumberField();
    numberField.render('#card-number-field-container');

    const cvvField = cardField.CVVField();
    cvvField.render('#card-cvv-field-container');

    const expiryField = cardField.ExpiryField();
    expiryField.render('#card-expiry-field-container');
  }
}

const submitCardFields = () => {
  if (!cardField || !cardFieldIsEligible) {
    return;
  }
  cardField
      .submit()
      .then(() => {
        // submit successful
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
    <button id="card-field-submit-button" type="button" class="btn" @click="submitCardFields">Pay now with Card Fields</button>
  </div>
</template>
