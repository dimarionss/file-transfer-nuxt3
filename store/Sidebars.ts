import { defineStore } from "pinia";
export const useSidebarsStore = defineStore("sidebars", {
  state: () => ({
    navDrawer: true,
    leftHomeSidebar: true,
    leftProfileSidebar: true,
    rightHomeSidebar: true,
  }),
  actions: {
    setNavDrawerState(state: boolean) {
      this.navDrawer = state;
    },
    setLeftHomeSidebarState(state: boolean) {
      console.log("STATE", state);
      this.leftHomeSidebar = state;
    },
    setLeftProfileSidebarState(state: boolean) {
      this.leftProfileSidebar = state;
    },
    setRightHomeSidebarState(state: boolean) {
      this.rightHomeSidebar = state;
    },
  },
  getters: {
    NAV_DRAWER_STATE(): boolean {
      return this.navDrawer;
    },
    LEFT_HOME_SIDEBAR_STATE(): boolean {
      return this.leftHomeSidebar;
    },
    LEFT_PROFILE_SIDEBAR_STATE(): boolean {
      return this.leftProfileSidebar;
    },
    RIGHT_HOME_SIDEBAR_STATE(): boolean {
      return this.rightHomeSidebar;
    },
  },
});
