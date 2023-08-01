<script lang="ts" setup>
import { BN, BN_ONE } from "@polkadot/util";
import type { WeightV2 } from '@polkadot/types/interfaces'
import { ContractPromise } from '@polkadot/api-contract'
import { Keyring } from '@polkadot/api'
import { store } from "../store/store";
import * as abi from '../../public/incrementer.json'
import { onMounted, ref } from "vue";

const number = ref(0)
const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);
const PROOFSIZE = new BN(1_000_000);
const storageDepositLimit = null;

onMounted(() => {
  getNumber()
})

async function getNumber() {
  const api = await store.connect()
  const keyring = new Keyring({ type: "sr25519" })
  const alice = keyring.addFromUri("//Alice")
  const address = "5HieWznjARMe4A4oWS6PpLnu9XSocTvqGqJvvLjXAHxDyQV6"
  //@ts-ignore
  const contract = new ContractPromise(api, abi, address)
  const { result, output } = await contract.query.get(
    alice.address,
    {
      gasLimit: api?.registry.createType('WeightV2', {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as unknown as WeightV2,
      storageDepositLimit,
    }
  );
  if (result.isOk) {
    const outi = output?.toString() as string
    const parseOuti = JSON.parse(outi)
    number.value = parseOuti["ok"]
  }
}
async function incNumber() {
  const api = await store.connect()
  const keyring = new Keyring({ type: "sr25519" })
  const alice = keyring.addFromUri("//Alice")
  const address = "5HieWznjARMe4A4oWS6PpLnu9XSocTvqGqJvvLjXAHxDyQV6"
  //@ts-ignore
  const contract = new ContractPromise(api, abi, address)

  const { gasRequired } = await contract.query.inc(
    alice.address,
    {
      gasLimit: api?.registry.createType('WeightV2', {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as unknown as WeightV2,
      storageDepositLimit,
    }
  );
  const gasLimit = api?.registry.createType('WeightV2', gasRequired) as unknown as WeightV2
  await contract.tx
    .inc({
      gasLimit,
      storageDepositLimit
    })
    .signAndSend(alice, async (res) => {
      if (res.status.isInBlock) {
        getNumber()
      } else if (res.status.isFinalized) {
      }
    });
}
</script>
<template>
  <h1 style="margin-top: 25px">Hello World</h1>
  <p>This is my amazing incrementer contract</p>
  <button style="margin-right: 10px" @click="incNumber">inc</button>
  <button @click="getNumber">get</button>
  <div class="box">
    <p>Thats my number</p>
    <p><strong>{{ number }}</strong></p>
  </div>
</template>
