import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./translations/en.json";
import translationLv from "./translations/lv.json";
import translationHi from "./translations/hi.json";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEn,
      },
      lv: {
        translation: translationLv,
      },
      hi: {
        translation: translationHi,
      },
    },
    fallbackLng: "en",
    detection: {
      order: ["navigator"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
