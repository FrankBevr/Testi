<script lang="ts" setup>
import { Keyring } from "@polkadot/api";
import { Ref, ref } from "vue";
import { store } from "../store/store.ts";

const resultDiv: Ref<null | string> = ref("");

async function subscribeTransaction() {
  const api = await store.connect();

  const keyring = new Keyring({ type: "sr25519" });
  const alice = keyring.addFromUri("//Alice", { name: "Alice Dev" });
  const bob = keyring.addFromUri("//Bob", { name: "Bob Dev" });

  const { data: balance }: any = await api.query.system.account(alice.address);

  const unsub = await api.tx.balances
    .transfer(bob.address, 1234)
    .signAndSend(alice, (result) => {
      resultDiv.value = `Current status is ${result.status}</div>`;
      if (result.status.isInBlock) {
        resultDiv.value = `Transaction included at blockHash ${result.status.asInBlock}`;
      } else if (result.status.isFinalized) {
        resultDiv.value = `Transaction finalized at blockHash ${result.status.asFinalized}`;
        unsub();
      }
    });
}
</script>
<template>
  <button v-on:click="subscribeTransaction">Send Bob</button>
  <div style="margin-top: 10px" v-if="resultDiv !== null">{{ resultDiv }}</div>
</template>
