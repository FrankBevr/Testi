<script lang="ts" setup>
import SeeData from "../components/see-data.vue";
import TransactionButton from "../components/transaction-button.vue";
import TransactionButtonSubscribed from "../components/transactionButtonSubscribed.vue";

</script>
<template>
  <div class="card">
    <h1>Transaction</h1>
    <p>Simple Transaction Alice sends Bob</p>
    <SeeData></SeeData>
    <TransactionButton></TransactionButton>
    <p>Subscribed Transaction Alice sends Bob</p>
    <SeeData></SeeData>
    <TransactionButtonSubscribed></TransactionButtonSubscribed>
  </div>
</template>
