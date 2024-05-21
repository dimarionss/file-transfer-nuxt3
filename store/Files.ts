import { defineStore } from "pinia";
import { useLoaderStore } from "~/store/Loader";
import { useAlertStore } from "~/store/Alert";
import { useAuth } from "~/store/Auth";
export const useFiles = defineStore("files", () => {
  const loader = useLoaderStore();
  const config = useRuntimeConfig().public;
  const alert = useAlertStore();
  const router = useRouter();
  const auth = useAuth();

  const file = ref({});

  async function uploadFiles(files: Array<objecj>, id: string) {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("uploadedBy", id);
      loader.setLoaderState(true);
      const data = await $fetch(`${config.API_URL}/api/files`, {
        method: "POST",
        cache: "no-cache",
        body: formData,
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
          getFileFromUserId(auth.USER_DATA._id);
        }
      }
      return data;
    } catch (e) {
      return e;
    }
  }

  async function getFileFromId(id: string) {
    try {
      loader.setLoaderState(true);
      const data = await $fetch(`${config.API_URL}/api/files/${id}`, {
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
          file.value = data.file;
          console.log("FILES FROM USER", FILE.value);
        }
      }
      return data;
    } catch (e) {
      return e;
    }
  }
  async function getFileFromUserId(id: string) {
    try {
      loader.setLoaderState(true);
      const data = await $fetch(`${config.API_URL}/api/files/user/${id}`, {
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
          auth.USER_DATA.files = data.files;
          console.log("FILES FROM USER ID", auth.USER_DATA.files);
        }
      }
      return data;
    } catch (e) {
      return e;
    }
  }

  // getters
  const FILE = computed<object>(() => {
    return file.value;
  });
  // const USER_DATA = computed<object>(() => {
  //   return userData.value;
  // });

  return {
    // actions
    getFileFromId,
    getFileFromUserId,
    uploadFiles,

    //getters
    FILE,
    // USER_DATA,
  };
});
