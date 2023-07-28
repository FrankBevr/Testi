<script lang="ts" setup>
/*--------T O - D O-------*/
/*------------------------*/
// import { CodePromise, ContractPromise } from '@polkadot/api-contract'
// import { ApiPromise } from '@polkadot/api/promise'
// import { Keyring, WsProvider } from '@polkadot/api'
// import metadata from './incrementer.json'

// async function codePromise(){
//     const wsProvider = new WsProvider()
//     const api = (await ApiPromise.create({provider: wsProvider})).isReady
//     const response = await fetch('/incrementer.wasm')
//     const buffer = await response.arrayBuffer()
//     const wasm = new Uint8Array(buffer)
//     const code = new CodePromise(api, metadata, wasm)
//     console.log(wasm)
//     console.log(code)
// }
// codePromise()

// async function contractPromise(){
//     const wsProvider = new WsProvider()
//     const api = await ApiPromise.create({provider:wsProvider})
//     await api.isReady
//     const keyring = new Keyring({type: "sr25519"})
//     const alice = keyring.addFromUri("//Alice")
//     const contract = new ContractPromise(api, metadata, alice.address )
// }
// contractPromise()
</script>
<template>
  <div class="card">
    <h1>Contract - TODO</h1>
    <p>Code Promise</p>
    <div id="codePromise"></div>
  </div>
</template>
