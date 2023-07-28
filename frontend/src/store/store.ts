import { reactive } from "vue";
import { WsProvider, ApiPromise } from "@polkadot/api";
export const store = reactive<{ connect(): Promise<ApiPromise> }>({
  async connect() {
    const wsProvider = new WsProvider();
    const api = await ApiPromise.create({ provider: wsProvider });
    await api.isReady;
    return api;
  },
});
