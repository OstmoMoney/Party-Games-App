import { NativeModules, Platform } from "react-native";

const deviceLang =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager?.settings?.AppleLocale ||
      NativeModules.SettingsManager?.settings?.AppleLanguages?.[0]
    : NativeModules.I18nManager?.localeIdentifier;

const isNorwegian = deviceLang?.startsWith("nb") || deviceLang?.startsWith("no");

export function t(no, en) {
  return isNorwegian ? no : en;
}