import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en/common.json";
import ptBR from "./pt-BR/common.json";

const SUPPORTED_LANGUAGES = ["en", "pt-BR"] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

function detectLanguage(): SupportedLanguage {
  if (typeof navigator === "undefined") return "en";
  const raw = navigator.language;
  if (raw.toLowerCase().startsWith("pt")) return "pt-BR";
  return "en";
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    "pt-BR": { common: ptBR },
  },
  lng: detectLanguage(),
  fallbackLng: "en",
  supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
  ns: ["common"],
  defaultNS: "common",
  interpolation: { escapeValue: false },
  returnNull: false,
});
