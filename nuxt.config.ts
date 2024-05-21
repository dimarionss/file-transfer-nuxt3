// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  // ssr: false,
  routeRules: {
    "*/*/*": { ssr: false },
  },
  // nitro: {
  //   preset: 'service-worker' // spa app
  // },
  // global var (.env)

  app: {
    head: {
      htmlAttrs: {
        lang: process.env.DEFAULT_LOCALE,
      },
      title: "RGB",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    // apiSecret: process.env.API_KEY,
    // Keys within public are also exposed client-side
    public: {
      API_URL: process.env.NODE_ENV === "production" ? process.env.API_URL_SERVER : process.env.API_URL_LOCAL,
    },
  },

  // modules
  modules: [
    // store
    "@pinia/nuxt",
  ],
  delayHydration: {
    // enables nuxt-delay-hydration in dev mode for testing
    debug: process.env.NODE_ENV === "development",
    mode: "mount",
  },
  // vuetify
  css: ["vuetify/lib/styles/main.sass", "@mdi/font/css/materialdesignicons.min.css", "@fortawesome/fontawesome-free/css/all.css", "@/assets/styles/main.scss"],
  build: {
    transpile: ["vuetify", "chart.js"],
  },
  hooks: {
    "vite:extendConfig": (config) => {
      config.plugins.push(
        vuetify({
          autoImport: true,
          styles: { configFile: "assets/styles/vuetify/settings.scss" },
        })
      );
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
