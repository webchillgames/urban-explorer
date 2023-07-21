import { ref } from "vue";

import { default as ru } from "@/i18n/ru.json";
import { default as en } from "@/i18n/en.json";

export const appLang = ref(window.localStorage.getItem("urban-explorer-lang") || "ru");

export function t(key: string) {
  if (appLang.value === "ru") {
    return ru[key];
  }

  if (appLang.value === "en") {
    return en[key];
  }
}