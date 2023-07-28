<script lang="ts" setup>
import { Keyring } from "@polkadot/api";
import { onMounted, ref, Ref } from "vue";
import { store } from "../store/store";
const alice: Ref<null | Account> = ref(null);
const bob: Ref<null | Account> = ref(null);
const balanceAliceRef: Ref<null | Balance> = ref(null);
const balanceBobRef: Ref<null | Balance> = ref(null);

interface Account {
  address: string;
  meta: {
    name: string;
  };
  publicKey: string;
}
interface Data {
  data: Balance;
}
interface Balance {
  free: string;
}
onMounted(async () => {
  getDetails();
});

async function getDetails() {
  const api = await store.connect();

  const keyring = new Keyring({ type: "sr25519" });
  alice.value = keyring.addFromUri("//Alice", {
    name: "Alice Dev",
  }) as unknown as Account;
  bob.value = keyring.addFromUri("//Bob", {
    name: "Bob Dev",
  }) as unknown as Account;

  const { data: balanceAlice } = (await api.query.system.account(
    alice.value.address,
  )) as unknown as Data;
  const { data: balanceBob } = (await api.query.system.account(
    bob.value.address,
  )) as unknown as Data;
  balanceAliceRef.value = balanceAlice;
  balanceBobRef.value = balanceBob;
}
</script>
<template>
  <details
    v-if="
      alice !== null &&
      bob !== null &&
      balanceAliceRef !== null &&
      balanceBobRef !== null
    "
  >
    <summary>See Data of Alice and Bob</summary>
    <div>Thats Alice Meta {{ alice.meta.name }}</div>
    <div>Thats Alice Address {{ alice.address }}</div>
    <div>Thats Alice PublicKey {{ alice.publicKey }}</div>
    <div>Thats Alice Balance {{ balanceAliceRef.free }}</div>
    <div>Thats Bob Meta {{ bob.meta.name }}</div>
    <div>Thats Bob Address {{ bob.address }}</div>
    <div>Thats Bob PublicKey {{ bob.publicKey }}</div>
    <div>Thats Bob Balance {{ balanceBobRef.free }}</div>
  </details>
</template>
