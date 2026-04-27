import React, { useRef, useEffect, useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  Dimensions, Animated, StatusBar, Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const MODES = [
  {
    key: "chill",
    icon: "😊",
    name: "Chill",
    tagline: "God stemning, ingen press",
    desc: "Passe morsomme spørsmål. Perfekt for date eller nye folk.",
    color: "#4ade80",
    locked: false,
  },
  {
    key: "drunk",
    icon: "🍻",
    name: "Drunk",
    tagline: "Vorsj-klassikeren",
    desc: "Drikkeutfordringer og nøtter. For deg som er i gang.",
    color: "#60a5fa",
    locked: false,
  },
  {
    key: "nasj",
    icon: "🔥",
    name: "Nasj",
    tagline: "For de som er godt i gang",
    desc: "Skikkelig rå utfordringer. Ikke for sarte sjeler.",
    color: "#fb923c",
    locked: true,
  },
  {
    key: "blasted",
    icon: "💀",
    name: "Blasted",
    tagline: "Full send. Du ble advart.",
    desc: "Ingen grenser. Absolutt galskap. Bare for de som tør.",
    color: "#f87171",
    locked: true,
  },
];

const GAME_META = {
  RiskItGame:    { icon: "🤾", name: "Risk It" },
  GameTwo:       { icon: "🍻", name: "Never Have I Ever" },
  GameFour:      { icon: "📦", name: "ZYN Box" },
  SpinTheBottle: { icon: "🍾", name: "Spin the Bottle" },
  GameThree:     { icon: "🎴", name: "Mafia" },
  GameFive:      { icon: "🎭", name: "Imposter" },
};

const SCREEN_MAP = {
  GameTwo:    "NeverHaveIEver",
  GameFive:   "Imposter",
  GameFour:   "ZYNBox",
  RiskItGame: "RiskIt",
};

export default function ModeSelectScreen({ navigation, route }) {
  const playerName = route?.params?.playerName || "Player";
  const gameName = route?.params?.game || "RiskItGame";
  const game = GAME_META[gameName] || GAME_META.RiskItGame;

  const [selected, setSelected] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  const scaleAnims = useRef(MODES.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleSelect = (mode, index) => {
    if (mode.locked) {
      Alert.alert(
        "👑 Party Pass",
        "Nasj og Blasted krever Party Pass. Lås opp alle modes og ekstra innhold.",
        [
          { text: "Ikke nå", style: "cancel" },
          { text: "Lås opp", onPress: () => {} },
        ]
      );
      return;
    }
    setSelected(mode.key);
    Animated.sequence([
      Animated.timing(scaleAnims[index], { toValue: 0.97, duration: 70, useNativeDriver: true }),
      Animated.timing(scaleAnims[index], { toValue: 1, duration: 70, useNativeDriver: true }),
    ]).start(() => {
      setTimeout(() => {
        const screen = SCREEN_MAP[gameName] || "ComingSoon";
        navigation.navigate(screen, { playerName, game: gameName, mode: mode.key });
      }, 120);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#0B0B14", "#10101C"]} style={StyleSheet.absoluteFill} />

      {/* Same glows as HomeScreen */}
      <View style={styles.glow1} />
      <View style={styles.glow2} />

      <Animated.View style={[styles.inner, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

        {/* Top bar — same style as HomeScreen */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <View style={styles.gameChip}>
            <Text style={styles.gameChipIcon}>{game.icon}</Text>
            <Text style={styles.gameChipName}>{game.name}</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Header — same font style as HomeScreen hero */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>VELG INTENSITET</Text>
          <Text style={styles.title}>
            Hvor gal{"\n"}<Text style={styles.titleAccent}>blir det?</Text>
          </Text>
          <Text style={styles.subtitle}>
            To modes gratis · Resten krever{" "}
            <Text style={styles.goldText}>Party Pass 👑</Text>
          </Text>
        </View>

        {/* Mode list — new stripe design */}
        <View style={styles.modeList}>
          {MODES.map((mode, i) => (
            <Animated.View key={mode.key} style={{ transform: [{ scale: scaleAnims[i] }] }}>
              <TouchableOpacity
                onPress={() => handleSelect(mode, i)}
                activeOpacity={0.8}
                style={[
                  styles.modeCard,
                  mode.locked && styles.modeCardLocked,
                  selected === mode.key && { borderColor: mode.color, borderWidth: 1.5 },
                ]}
              >
                {/* Colored left stripe */}
                <View style={[styles.stripe, { backgroundColor: mode.color }]} />

                {/* Card body */}
                <View style={styles.modeBody}>
                  <View style={[styles.modeIconBox, { backgroundColor: mode.color + "18" }]}>
                    <Text style={styles.modeIconText}>{mode.icon}</Text>
                  </View>

                  <View style={styles.modeText}>
                    <View style={styles.modeNameRow}>
                      <Text style={[
                        styles.modeName,
                        mode.locked && { color: "rgba(255,255,255,0.3)" }
                      ]}>
                        {mode.name}
                      </Text>
                      {!mode.locked ? (
                        <View style={styles.freeBadge}>
                          <Text style={styles.freeBadgeText}>GRATIS</Text>
                        </View>
                      ) : (
                        <View style={styles.proBadge}>
                          <Text style={styles.proBadgeText}>👑 PRO</Text>
                        </View>
                      )}
                    </View>
                    <Text style={[
                      styles.modeTagline,
                      { color: mode.locked ? "rgba(255,255,255,0.2)" : mode.color }
                    ]}>
                      {mode.tagline}
                    </Text>
                    <Text style={styles.modeDesc}>{mode.desc}</Text>
                  </View>

                  {mode.locked ? (
                    <Text style={styles.lockIcon}>🔒</Text>
                  ) : (
                    <Text style={[styles.arrow, { color: mode.color }]}>›</Text>
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Party pass — same style as HomeScreen premium strip */}
        <TouchableOpacity
          style={styles.passStrip}
          activeOpacity={0.9}
          onPress={() => Alert.alert("👑 Party Pass", "Lås opp Nasj + Blasted i alle spill!", [{ text: "OK" }])}
        >
          <Text style={styles.passCrown}>👑</Text>
          <View style={styles.passInfo}>
            <Text style={styles.passTitle}>Party Pass — lås opp alt</Text>
            <Text style={styles.passSub}>Nasj + Blasted i alle spill</Text>
          </View>
          <View style={styles.passCta}>
            <Text style={styles.passCtaText}>SE PRIS</Text>
          </View>
        </TouchableOpacity>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 22 },

  glow1: {
    position: "absolute", top: -80, left: width / 2 - 120,
    width: 240, height: 240, borderRadius: 120,
    backgroundColor: "#7C3AED", opacity: 0.13,
  },
  glow2: {
    position: "absolute", top: 180, right: -60,
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: "#FF2C66", opacity: 0.09,
  },

  topBar: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 56, marginBottom: 28,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center", justifyContent: "center",
  },
  backText: { color: "#fff", fontSize: 18 },
  gameChip: {
    flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999,
  },
  gameChipIcon: { fontSize: 15 },
  gameChipName: { color: "#fff", fontSize: 13, fontWeight: "800" },

  header: { marginBottom: 24 },
  eyebrow: {
    color: "rgba(255,255,255,0.25)", fontSize: 11,
    fontWeight: "700", letterSpacing: 2, marginBottom: 8,
  },
  title: {
    color: "#fff", fontSize: 38, fontWeight: "900",
    letterSpacing: 0.5, lineHeight: 44, marginBottom: 8,
  },
  titleAccent: { color: "#7C3AED" },
  subtitle: { color: "rgba(255,255,255,0.3)", fontSize: 13 },
  goldText: { color: "#E6C46A", fontWeight: "700" },

  modeList: { flex: 1, gap: 8, marginBottom: 16 },

  modeCard: {
    borderRadius: 20, overflow: "hidden",
    flexDirection: "row",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.06)",
  },
  modeCardLocked: { opacity: 0.5 },

  stripe: { width: 4 },

  modeBody: {
    flex: 1, flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    padding: 16, gap: 14,
  },
  modeIconBox: {
    width: 50, height: 50, borderRadius: 15,
    alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  modeIconText: { fontSize: 24 },
  modeText: { flex: 1 },
  modeNameRow: {
    flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 3,
  },
  modeName: { color: "#fff", fontSize: 16, fontWeight: "900" },
  freeBadge: {
    backgroundColor: "rgba(74,222,128,0.15)",
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999,
  },
  freeBadgeText: { color: "#4ade80", fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  proBadge: {
    backgroundColor: "rgba(230,196,106,0.15)",
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999,
  },
  proBadgeText: { color: "#E6C46A", fontSize: 9, fontWeight: "800", letterSpacing: 0.5 },
  modeTagline: { fontSize: 12, fontWeight: "700", marginBottom: 3 },
  modeDesc: { color: "rgba(255,255,255,0.3)", fontSize: 11, lineHeight: 15 },
  lockIcon: { fontSize: 16, flexShrink: 0 },
  arrow: { fontSize: 24, flexShrink: 0, fontWeight: "300" },

  passStrip: {
    borderRadius: 20, borderWidth: 1,
    borderColor: "rgba(230,196,106,0.2)",
    backgroundColor: "rgba(230,196,106,0.06)",
    flexDirection: "row", alignItems: "center",
    padding: 18, gap: 14, marginBottom: 8,
  },
  passCrown: { fontSize: 26 },
  passInfo: { flex: 1 },
  passTitle: { color: "#E6C46A", fontSize: 15, fontWeight: "900" },
  passSub: { color: "rgba(255,255,255,0.3)", fontSize: 12, marginTop: 2 },
  passCta: {
    backgroundColor: "#E6C46A",
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999,
  },
  passCtaText: { color: "#0B0B14", fontSize: 11, fontWeight: "900", letterSpacing: 1 },
});