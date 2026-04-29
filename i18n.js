import { NativeModules, Platform } from "react-native";

const deviceLang =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager?.settings?.AppleLocale ||
      NativeModules.SettingsManager?.settings?.AppleLanguages?.[0]
    : NativeModules.I18nManager?.localeIdentifier;

export const isNorwegian =
  deviceLang?.startsWith("nb") ||
  deviceLang?.startsWith("no") ||
  deviceLang?.startsWith("nn");

export const isJapanese = deviceLang?.startsWith("ja");

export function t(no, en, ja) {
  if (isNorwegian) return no;
  if (isJapanese && ja) return ja;
  return en;
}