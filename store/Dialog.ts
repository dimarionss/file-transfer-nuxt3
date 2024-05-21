import { defineStore } from "pinia";
export const useDialogStore = defineStore("dialog", {
  state: () => ({
    state: false,
    params: {},
  }),
  actions: {
    setDialogParams(params: object) {
      this.params = params;
    },
    setDialogState(state: boolean) {
      this.state = state;
    },
    openDialog(params: object) {
      this.setDialogParams(params);
      this.setDialogState(true);
    },
  },
  getters: {
    DIALOG_STATE(): boolean {
      return this.state;
    },
    DIALOG_PARAMS(): object {
      return this.params;
    },
  },
});
