import "i18next";
import en from "../locales/en/en.json";
import ru from "../locales/ru/ru.json";
import ja from "../locales/ja/ja.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNs: "translation";
    resources: {
      en: typeof en;
      ru: typeof ru;
      ja: typeof ja;
    };
  }
}
