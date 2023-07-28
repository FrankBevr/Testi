<script lang="ts" setup>
import { Keyring } from "@polkadot/api";
import { Ref, ref } from "vue";
import { store } from "../store/store";

const txHashRef: Ref<null | {}> = ref(null);

async function simpleTransaction() {
  const api = await store.connect();

  const keyring = new Keyring({ type: "sr25519" });
  const alice = keyring.addFromUri("//Alice", { name: "Alice Dev" });
  const bob = keyring.addFromUri("//Bob", { name: "Bob Dev" });

  txHashRef.value = await api.tx.balances
    .transfer(bob.address, 1234)
    .signAndSend(alice);
}
</script>
<template>
  <button id="transactionButton" v-on:click="simpleTransaction">
    Send Bob
  </button>
  <div style="margin-top: 10px" v-if="txHashRef !== null">
    Submitted with hash {{ txHashRef }}
  </div>
</template>
