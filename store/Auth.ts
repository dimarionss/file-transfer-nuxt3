import { defineStore } from "pinia";
import { useLoaderStore } from "~/store/Loader";
import { useAlertStore } from "~/store/Alert";
export const useAuth = defineStore("auth", () => {
  const loader = useLoaderStore();
  const config = useRuntimeConfig().public;
  const alert = useAlertStore();
  const router = useRouter();

  const token = ref(JSON.parse(sessionStorage.getItem("token")) || null),
    userData = ref(JSON.parse(sessionStorage.getItem("userData")) || {});

  function logout() {
    localStorage.clear();
    sessionStorage.clear();
    token.value = "";
    userData.value = "";
    router.push("/login");
  }
  function logoutMiddleware() {
    localStorage.clear();
    sessionStorage.clear();
    token.value = "";
    userData.value = "";
  }

  async function checkToken() {
    try {
      const { data, error } = await useFetch(`${config.API_URL}/api/auth/token`, {
        method: "GET",
        cache: "no-cache",
        headers: {
          Authorization: TOKEN.value,
        },
        params: {
          user_id: USER_DATA.value.id,
        },
        onResponse({ request, response, options }) {
          if (response.status != 200) {
            alert.setParamsAlert({
              state: true,
              type: "error",
              icon: "mdi-alert-circle",
              text: response._data.error,
            });
          } else {
            if (!response._data.success) {
              alert.setParamsAlert({
                state: true,
                type: "error",
                icon: "mdi-alert-circle",
                text: response._data.message,
              });
            }
          }
        },
      });
      return data;
    } catch (e) {
      return e;
    }
  }
  async function login(dataUser: Object) {
    try {
      loader.setLoaderState(true);
      const data = await $fetch(`${config.API_URL}/api/login`, {
        method: "POST",
        cache: "no-cache",
        body: dataUser,
        onResponse({ request, response, options }) {
          loader.setLoaderState(false);
          console.log(response);
          if (response.status != 200) {
            alert.setParamsAlert({
              state: true,
              type: "error",
              icon: "mdi-alert-circle",
              text: response._data.message,
            });
          }
        },
      });
      if (data) {
        if (data.success) {
          token.value = `Bearer ${data.token}`;
          sessionStorage.setItem("token", JSON.stringify(TOKEN.value));
          userData.value = data.user;
          sessionStorage.setItem("userData", JSON.stringify(USER_DATA.value));
          console.log("USER DATA", userData.value);
          router.push("/");
        }
      }
      return data;
    } catch (e) {
      return e;
    }
  }
  async function register(dataUser: Object) {
    try {
      const dataUserForm = new FormData();
      for (const key in dataUser) {
        if (dataUser.hasOwnProperty(key)) {
          // Проверяем, является ли значение файлом (изображением)
          if (dataUser[key] instanceof File) {
            console.log(dataUser[key]);
            dataUserForm.append(key, dataUser[key], dataUser[key].name);
          } else {
            dataUserForm.append(key, dataUser[key]);
          }
        }
      }
      loader.setLoaderState(true);
      const data = await $fetch(`${config.API_URL}/api/register`, {
        method: "POST",
        cache: "no-cache",
        body: dataUserForm,
        onResponse({ request, response, options }) {
          loader.setLoaderState(false);
          console.log(response);
          if (response.status != 200 && response.status != 201 && response.status != 203) {
            alert.setParamsAlert({
              state: true,
              type: "error",
              icon: "mdi-alert-circle",
              text: response._data.message,
            });
          }
        },
      });
      if (data) {
        if (data.success) {
          token.value = `Bearer ${data.token}`;
          sessionStorage.setItem("token", JSON.stringify(TOKEN.value));
          userData.value = data.user;
          sessionStorage.setItem("userData", JSON.stringify(USER_DATA.value));
          console.log("USER DATA", userData.value);
          router.push("/");
        }
      }
      return data;
    } catch (e) {
      return e;
    }
  }

  // getters
  const TOKEN = computed<string>(() => {
    return token.value;
  });
  const USER_DATA = computed<object>(() => {
    return userData.value;
  });

  return {
    token,
    userData,
    // actions
    register,
    login,
    logout,
    logoutMiddleware,

    //getters
    TOKEN,
    USER_DATA,
  };
});
