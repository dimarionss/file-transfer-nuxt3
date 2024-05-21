import { useAuth } from "~/store/Auth";
import { useDialogStore } from "~/store/Dialog";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig().public;
  const router = useRouter();
  console.log(to);
  console.log(from);
  const dialog = useDialogStore();
  if (dialog.DIALOG_STATE) {
    dialog.setDialogState(false);
  }
  const auth = useAuth();
  console.log(auth.TOKEN);
  if (!auth.TOKEN) {
    if (to.path !== "/login") {
      sessionStorage.clear();
      localStorage.clear();
      auth.token = "";
      return navigateTo("/login");
    }
  } else {
    // const res = await auth.checkToken();
    // if (res) {
    //   if (res.code !== 1) {
    //     localStorage.clear();
    //     sessionStorage.clear()
    //     auth.token = "";
    //   }
    // } else {
    //   sessionStorage.clear()
    //   localStorage.clear()
    //   auth.token = "";
    // }

    if (to.path === "/login") {
      return navigateTo("/");
    }

    // const res = await admin.checkToken();
    // if (res.code !== 1) {
    //   admin.logout();
    //   return navigateTo("/login");
    // }
    // if (to.path === "/login" || to.path === "/reset") {
    //   return navigateTo("/");
    // }
  }
});
