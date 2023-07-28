<script lang="ts" setup>
import { ref, computed } from "vue";
import HelloWorld from "./views/hello-word.vue";
import BasicUsage from "./views/basic-usage.vue";
import Subscription from "./views/subscriptions.vue";
import Transaction from "./views/transaction.vue";
import ContractPromise from "./views/contract-promise.vue";

const routes: any = {
  "/helloworld": HelloWorld,
  "/basicusage": BasicUsage,
  "/subscription": Subscription,
  "/transaction": Transaction,
  "/contractPromise": ContractPromise,
};

const currentPath = ref(window.location.hash);

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || "/"] || HelloWorld;
});
</script>
<template>
  <div>
    <a href="#/">HelloWorld</a> | <a href="#/basicusage">BasicUsage</a> |
    <a href="#/subscription">Subscription</a> |
    <a href="#/transaction">Transaction</a> |
    <a href="#/contractPromise">ContractPromise</a> |
    <component :is="currentView"></component>
  </div>
</template>
