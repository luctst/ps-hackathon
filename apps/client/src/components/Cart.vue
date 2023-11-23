<template>
  <div class="container">
    <div class="order-summary">
      <table class="order-item">
        <tr class="order-summary-item-name">
          <td class="order-summary-td-label">Name:</td>
          <td class="order-summary-td-value">T-Shirt</td>
        </tr>
        <tr class="order-summary-item-sku">
          <td class="order-summary-td-label">SKU:</td>
          <td class="order-summary-td-value">TA1000</td>
        </tr>
        <tr class="order-summary-item-description">
          <td class="order-summary-td-label">Description:</td>
          <td class="order-summary-td-value">Green XL</td>
        </tr>
        <tr class="order-summary-item-quantity">
          <td class="order-summary-td-label">Quantity:</td>
          <td class="order-summary-td-value">1</td>
        </tr>
        <tr class="order-summary-item-price">
          <td class="order-summary-td-label">Price:</td>
          <td class="order-summary-td-value">100.00 USD</td>
        </tr>
      </table>
      <hr />
      <table class="order-summary-totals">
        <tr class="order-summary-totals-total">
          <td class="order-summary-td-label">Total:</td>
          <td class="order-summary-td-value">100.00 USD</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.order-summary {
  width: 100%;
  text-align: left;

  .order-item,
  .order-summary-totals {
    width: 100%;
  }

  .order-summary-td-label {
    text-align: left;
  }

  .order-summary-td-value {
    text-align: right;
  }
}
</style>
