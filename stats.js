// Akkumulert statistikk over tid — «Dere har spilt 12 runder og tatt
// 214 slurker». Lagres permanent på telefonen og vises på Home.

import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "lifetimeStats";

export async function getStats() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      rounds: Number(parsed.rounds) || 0,
      sips: Number(parsed.sips) || 0,
    };
  } catch {
    return { rounds: 0, sips: 0 };
  }
}

export async function addStats({ rounds = 0, sips = 0 }) {
  try {
    const current = await getStats();
    await AsyncStorage.setItem(
      KEY,
      JSON.stringify({
        rounds: current.rounds + rounds,
        sips: current.sips + sips,
      })
    );
  } catch {
    // Statistikk skal aldri velte et spill
  }
}
