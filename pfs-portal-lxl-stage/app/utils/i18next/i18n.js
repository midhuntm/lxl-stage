import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locale/en.json";
import de from "./locale/de.json";
import hin from './locale/hin.json';

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: en,
    de: de,
    hin:hin
  },
  lng:'en',
  fallbackLng: "en",
  debug: false,

  // have a common namespace used around the full app
  ns: ["translations","Headings","messages","labels"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;