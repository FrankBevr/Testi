<script lang="ts" setup>
import { onBeforeMount, ref, Ref } from "vue";
import { store } from "../store/store.ts";
const title = ref("Basic usage");
const blockHash = ref("");
const version = ref("");
const apiInfo = ref("");
const palletNames: Ref<string[]> = ref([]);

interface Pallet {
  name: string;
}
interface Metadata {
  v14: {
    pallets: Pallet[];
  };
}

onBeforeMount(async () => {
  const api = await store.connect();
  blockHash.value = api.genesisHash.toHuman()!.toString();
  version.value = api.runtimeVersion.toJSON().specName?.toString() as string;
  apiInfo.value = api.libraryInfo.toString();
  const data = api.runtimeMetadata.toJSON().metadata as unknown as Metadata;
  data.v14.pallets.map((pallet) => palletNames.value.push(pallet.name));
});
</script>
<template>
  <div class="card" v-if="apiInfo !== ''">
    <h1>{{ title }}</h1>
    <p>Thats my Blockhash</p>
    <div>{{ blockHash }}</div>
    <p>Thats my Version</p>
    <div>{{ version }}</div>
    <p>These are my pallets</p>
    <div v-for="palletName in palletNames">{{ palletName }}</div>
    <p>Thats my api</p>
    <div>{{ apiInfo }}</div>
  </div>
</template>
