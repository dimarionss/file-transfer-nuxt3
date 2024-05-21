import moment from "moment";
import "moment-duration-format";
import { defineStore } from "pinia";
import { useAuth } from "./Auth";
export const useMainStore = defineStore("main", () => {
  const auth = useAuth();
  function getImgCropped(img: object) {
    return new Promise((resolve, reject) => {
      if (img) {
        img.canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], img.name, { type: img.type });
            resolve(file);
          } else {
            reject(new Error("Blob creation failed"));
          }
        }, img.type);
      } else {
        resolve({});
      }
    });
  }
  return {
    // actions
    getImgCropped,
  };
});
