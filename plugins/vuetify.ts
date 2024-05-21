// plugins/vuetify.js
import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from "vuetify/iconsets/mdi";
import colors from "vuetify/lib/util/colors";

const greenSport: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "hsla(158,60%,25%)",
    accent: "#D5DEE7",
    secondary: "hsla(158,60%,32%)",
    background: "#134e38",
    "lighten-primary": "hsla(159,30%,87%)",
    "mobile-icon-accent": "#3da5ff",
    "mobile-icon": "#5485bd",
    info: "#CEE0F1",
    warning: "#fe9431",
    error: "#e50202",
    success: "#7DAA2F",
  },
};
const barbySport: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#FF69B4",
    accent: "#DA70D6",
    secondary: "#00CED1",
    background: "#FFB6C1",
    "lighten-primary": "#FFF0F5",
    "mobile-icon-accent": "#FF1493",
    "mobile-icon": "#8A2BE2",
    info: "#FFC0CB",
    warning: "#FF4500",
    error: "#FF0000",
    success: "#32CD32",
  },
};
const marvelSport: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#FF0000",
    accent: "#FFD700",
    secondary: "#0000FF",
    background: "#000000",
    "ighten-primary": "#FFFFFF",
    "mobile-icon-accent": "#800080",
    "mobile-icon": "#008000",
    info: "#FFA500",
    warning: "#FFFF00",
    error: "#800000",
    success: "#00FFFF",
  },
};
export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "light",
      themes: {
        marvelSport,
        greenSport,
        barbySport,
        light: {
          dark: false,
          colors: {
            primary: "#2B2D42",
            accent: "#D5DEE7",
            secondary: "#03183B",
            background: "#fff",
            "light-grey": "#f5f5f5",
            info: "#CEE0F1",
            warning: "#fe9431",
            error: "#F6465D",
            success: "#0ECB81",
            "background-mobile": "hsla(207,26%,93%)",
            "lighten-primary": "#f5f5f5",
            "mobile-icon-accent": "#3da5ff",
            "mobile-icon": "#5485bd",
            "font-primary": "#03183B",
            "font-secondary": "#3A69A0",
            "oc-rate-block": "#f5f5f5",
            "oc-rate-font": "#2F5581",
            "border-color": "#eff2f5",
            "border-color-1": "#a6b0c3",
          },
        },
        dark: {
          dark: true,
          colors: {
            // primary: "#2F5581",
            primary: "rgb(33,33,33)",
            accent: "#D5DEE7",
            secondary: "#515151",
            info: "#CEE0F1",
            warning: "#fe9431",
            error: "#e50202",
            success: "#7DAA2F",
            "background-mobile": "#949494",
            "lighten-primary": "#949494",
            "mobile-icon-accent": "#3da5ff",
            "mobile-icon": "#5485bd",
            "font-primary": "#fff",
            "font-secondary": "#3A69A0",
            "oc-rate-block": "#515151",
            "oc-rate-font": "#fff",
          },
        },
      },
    },
    defaults: {
      global: {
        // ripple: false,
      },
    },
    icons: {
      defaultSet: "mdi",
      sets: {
        mdi,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
