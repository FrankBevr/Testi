<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { store } from "../store/store.ts";
const subscribedHeader = ref<string[]>([]);
const subscribedHeaderWithEnd = ref<string[]>([]);
const balanceChange = ref("");

interface Data {
  data: { free: any };
  nonce: any;
}

onMounted(async () => {
  subscription();
  subscriptionWithEnd();
  balanceChanges();
});

async function subscription() {
  const api = await store.connect();
  const chain = await api.rpc.system.chain();
  await api.rpc.chain.subscribeNewHeads((lastHeader) => {
    subscribedHeader.value.push(
      `${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`,
    );
  });
}

async function subscriptionWithEnd() {
  const api = await store.connect();
  const chain = await api.rpc.system.chain();
  let count = 0;
  const unsub = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
    subscribedHeaderWithEnd.value.push(
      `Count: ${count} | ${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`,
    );
    if (++count === 2) {
      unsub();
    }
  });
}

async function balanceChanges() {
  const api = await store.connect();

  const ALICE = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";
  let {
    data: { free: previousFree },
    nonce: previousNonce,
  }: any = await api.query.system.account(ALICE);
  balanceChange.value = `${ALICE} has a balance of ${previousFree}, nonce ${previousNonce}`;

  api.query.system.account(
    ALICE,
    ({ data: { free: currentFree }, nonce: currentNonce }: Data) => {
      const change = currentFree.sub(previousFree);
      if (!change.isZero()) {
        balanceChange.value = `New balance change of ${change}, nonce ${currentNonce}`;
        previousFree = currentFree;
        previousNonce = currentNonce;
      }
    },
  );
}
</script>
<template>
  <div class="card" v-if="balanceChange !== ''">
    <h1>Subscribtions</h1>
    <p>Thats my subscribed Header</p>
    <div v-for="aHeader in subscribedHeader">{{ aHeader }}</div>
    <p>Thats my subscribed Header that end after 2 new block</p>
    <div v-for="aHeader in subscribedHeaderWithEnd">{{ aHeader }}</div>
    <p>These are my balance changes</p>
    <div>{{ balanceChange }}</div>
  </div>
</template>
