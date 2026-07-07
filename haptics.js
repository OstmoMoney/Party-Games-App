// Taktil feedback for hele appen. Web har ikke haptikk, og på enkelte
// Android-enheter kan kallet feile — derfor guard + tom catch overalt.

import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

const canHaptic = Platform.OS !== "web";

// Lett dunk — vanlige trykk (neste kort, hopp over, snurr i gang)
export const tapLight = () => {
  if (canHaptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
};

// Middels dunk — valg som betyr noe (modusvalg, ALDRI/HAR GJORT)
export const tapMedium = () => {
  if (canHaptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
};

// Tungt dunk — flasken stopper, vinner kåres
export const tapHeavy = () => {
  if (canHaptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
};

// Suksess-mønster — runde fullført, kjøp gjennomført
export const celebrate = () => {
  if (canHaptic) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
};
