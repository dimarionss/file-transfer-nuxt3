import { defineStore } from "pinia";
export const useLoaderStore = defineStore("loader", {
  state: () => ({
    state: false,
    stateBlock: false,
  }),
  actions: {
    setLoaderState(state: boolean) {
      this.state = state;
    },
    setLoaderBlockState(state: boolean) {
      this.stateBlock = state;
    },
  },
  getters: {
    LOADER_STATE(): boolean {
      return this.state;
    },
    LOADER_BLOCK_STATE(): boolean {
      return this.stateBlock;
    },
  },
});
