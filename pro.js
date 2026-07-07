// Party Pass-status. Lagres permanent og caches i minnet slik at
// skjermene kan lese den synkront med hasPro().
//
// NB: purchasePartyPass() er en simulert kjøpsflyt. Når ekte kjøp
// kobles på (RevenueCat / expo-in-app-purchases), skal betalingen
// skje her — og setPro(true) kalles først når kvitteringen er OK.

import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "hasPartyPass";

let cached = false;

// Kalles ved oppstart (App.js) før skjermene rendres
export async function loadProStatus() {
  try {
    cached = (await AsyncStorage.getItem(KEY)) === "1";
  } catch {
    cached = false;
  }
  return cached;
}

export function hasPro() {
  return cached;
}

async function setPro(value) {
  cached = value;
  try {
    await AsyncStorage.setItem(KEY, value ? "1" : "0");
  } catch {
    // Cache i minnet gjelder uansett for denne økten
  }
}

// TODO: erstatt med ekte IAP-flyt — nå simuleres et vellykket kjøp
export async function purchasePartyPass() {
  await setPro(true);
  return true;
}
