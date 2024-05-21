import { defineStore } from "pinia";
import { useLoaderStore } from "~/store/Loader";
import { useAlertStore } from "~/store/Alert";
import { useAuth } from "~/store/Auth";
export const useUsers = defineStore("users", () => {
  const loader = useLoaderStore();
  const config = useRuntimeConfig().public;
  const alert = useAlertStore();
  const router = useRouter();
  const auth = useAuth();
  const user = ref({});

  async function getUsersFromId(id: string) {
    try {
      loader.setLoaderState(true);
      const data = await $fetch(`${config.API_URL}/api/users/${id}`, {
        method: "GET",
        cache: "no-cache",
        headers: {
          Authorization: auth.TOKEN,
        },
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
          user.value = data.user;
          console.log("USER FROM ID", USER.value);
        }
      }
      return data;
    } catch (e) {
      return e;
    }
  }
  async function updateUser(dataUser: Object, id: string) {
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
      for (let [key, value] of dataUserForm.entries()) {
        console.log(`${key}: ${value}`);
      }
      loader.setLoaderState(true);
      const data = await $fetch(`${config.API_URL}/api/users/${id}`, {
        method: "PATCH",
        cache: "no-cache",
        body: dataUserForm,
        headers: {
          Authorization: auth.TOKEN,
        },
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
          } else {
            if (!response._data.success) {
              alert.setParamsAlert({
                state: true,
                type: "error",
                icon: "mdi-alert-circle",
                text: response._data.message,
              });
            } else {
              alert.setParamsAlert({
                state: true,
                type: "success",
                icon: "mdi-check",
                text: response._data.message,
              });
            }
          }
        },
      });
      if (data) {
        if (data.success) {
          auth.userData = data.user;
          sessionStorage.setItem("userData", JSON.stringify(auth.USER_DATA));
          console.log("UPDATED USER", data.user);
        }
      }
      return data;
    } catch (e) {
      return e;
    }
  }
  async function changePassword(dataUser: Object, id: string) {
    try {
      loader.setLoaderState(true);
      const data = await $fetch(`${config.API_URL}/api/users/${id}`, {
        method: "PATCH",
        cache: "no-cache",
        body: dataUser,
        headers: {
          Authorization: auth.TOKEN,
        },
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
          } else {
            if (!response._data.success) {
              alert.setParamsAlert({
                state: true,
                type: "error",
                icon: "mdi-alert-circle",
                text: response._data.message,
              });
            } else {
              alert.setParamsAlert({
                state: true,
                type: "success",
                icon: "mdi-check",
                text: response._data.message,
              });
            }
          }
        },
      });
      if (data) {
        if (data.success) {
          console.log("UPDATED PASSWORD", data);
        }
      }
      return data;
    } catch (e) {
      return e;
    }
  }

  // getters
  const USER = computed<string>(() => {
    return user.value;
  });
  // const USER_DATA = computed<object>(() => {
  //   return userData.value;
  // });

  return {
    // actions
    updateUser,
    changePassword,
    getUsersFromId,

    //getters
    USER,
    // USER_DATA,
  };
});
