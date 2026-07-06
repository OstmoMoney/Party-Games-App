import * as Localization from "expo-localization";

// expo-localization fungerer på iOS, Android og web — også med ny arkitektur.
// (Den gamle NativeModules.SettingsManager-metoden ga alltid undefined i SDK 54+,
// slik at alle fikk engelsk uansett telefonspråk.)
const locales = Localization.getLocales?.() || [];
const languageCode = locales[0]?.languageCode?.toLowerCase() || "";

// Norsk bokmål = "nb", nynorsk = "nn", generisk norsk = "no"
export const isNorwegian = ["nb", "nn", "no"].includes(languageCode);

export const isJapanese = languageCode === "ja";

export function t(no, en, ja) {
  if (isNorwegian) return no;
  if (isJapanese && ja) return ja;
  return en;
}
