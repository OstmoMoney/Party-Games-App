import React, { useRef, useEffect, useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  Dimensions, Animated, StatusBar, Alert, ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { t } from "../i18n";

const { width } = Dimensions.get("window");

const MODES = [
  {
    key: "chill",
    icon: "😊",
    name: t("Chill", "Chill", "チル"),
    tagline: t("God stemning, ingen press", "Good vibes, no pressure", "良い雰囲気、プレッシャーなし"),
    desc: t(
      "Passe morsomme spørsmål. Perfekt for date eller nye folk.",
      "Lightly funny questions. Perfect for dates or new people.",
      "適度に面白い質問。デートや新しい人にぴったり。"
    ),
    colors: ["#065f46", "#0a1a14"],
    accent: "#10b981",
    locked: false,
  },
  {
    key: "date",
    icon: "💕",
    name: t("Date", "Date", "デート"),
    tagline: t("For dypere samtaler", "For deeper conversations", "深い会話のために"),
    desc: t(
      "Intime, romantiske og litt pikante spørsmål. Bli kjent på ekte.",
      "Intimate, romantic and slightly spicy questions. Really get to know each other.",
      "親密でロマンチック、少しスパイシーな質問。本当に知り合おう。"
    ),
    colors: ["#9d174d", "#1f0a14"],
    accent: "#ec4899",
    locked: true,
  },
  {
    key: "drunk",
    icon: "🍻",
    name: t("Drunk", "Drunk", "酔っ払い"),
    tagline: t("Vorsj-klassikeren", "The pre-party classic", "前夜祭の定番"),
    desc: t(
      "Drikkeutfordringer og nøtter. For deg som er i gang.",
      "Drinking dares and challenges. For when you're already going.",
      "飲み物の挑戦とダーレス。もうエンジンがかかっているあなたへ。"
    ),
    colors: ["#1e3a8a", "#0f172a"],
    accent: "#3b82f6",
    locked: false,
  },
  {
    key: "nasj",
    icon: "🔥",
    name: t("Nasj", "Nasj", "ナシュ"),
    tagline: t("For de som er godt i gang", "For when you're well into it", "もうかなり進んでいる人へ"),
    desc: t(
      "Skikkelig rå utfordringer. Ikke for sarte sjeler.",
      "Properly raw challenges. Not for the faint of heart.",
      "本格的に生々しい挑戦。心の弱い人向けではない。"
    ),
    colors: ["#9a3412", "#1c1410"],
    accent: "#fb923c",
    locked: true,
  },
  {
    key: "blasted",
    icon: "💀",
    name: t("Blasted", "Blasted", "ブラステッド"),
    tagline: t("Full send. Du ble advart.", "Full send. You were warned.", "全力。警告したぞ。"),
    desc: t(
      "Ingen grenser. Absolutt galskap. Bare for de som tør.",
      "No limits. Absolute madness. Only for those who dare.",
      "制限なし。完全な狂気。勇気ある者だけに。"
    ),
    colors: ["#7f1d1d", "#1a0a0a"],
    accent: "#f87171",
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
  SpinTheBottle: "SpinTheBottle",
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
        t("👑 Party Pass", "👑 Party Pass", "👑 パーティーパス"),
        t(
          `${mode.name} krever Party Pass. Lås opp alle modes og ekstra innhold.`,
          `${mode.name} requires Party Pass. Unlock all modes and extra content.`,
          `${mode.name}はパーティーパスが必要です。`
        ),
        [
          { text: t("Ikke nå", "Not now", "今はやめる"), style: "cancel" },
          { text: t("Lås opp", "Unlock", "ロック解除"), onPress: () => {} },
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

          {/* TOP BAR */}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
            <View style={styles.gameChip}>
              <Text style={styles.gameChipIcon}>{game.icon}</Text>
              <Text style={styles.gameChipName}>{game.name}</Text>
            </View>
            <View style={{ width: 44 }} />
          </View>

          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.eyebrow}>
              {t("VELG INTENSITET", "PICK INTENSITY", "強度を選ぶ")}
            </Text>
            <Text style={styles.title}>
              {t("Hvor gal", "How wild", "どれくらい")}
              {"\n"}
              <Text style={styles.titleAccent}>
                {t("blir det?", "should it be?", "ワイルドに？")}
              </Text>
            </Text>
            <Text style={styles.subtitle}>
              {t(
                "To modes gratis · Resten krever ",
                "Two modes free · Rest needs ",
                "2モード無料 · 残りは"
              )}
              <Text style={styles.goldText}>
                {t("Party Pass 👑", "Party Pass 👑", "パーティーパス 👑")}
              </Text>
            </Text>
          </View>

          {/* MODE CARDS — B-STYLE som HomeScreen */}
          {MODES.map((mode, i) => (
            <Animated.View key={mode.key} style={{ transform: [{ scale: scaleAnims[i] }] }}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => handleSelect(mode, i)}
                style={[
                  styles.modeCard,
                  { shadowColor: mode.accent },
                  mode.locked && styles.modeCardLocked,
                  selected === mode.key && { borderWidth: 1.5, borderColor: mode.accent },
                ]}
              >
                <LinearGradient
                  colors={mode.colors}
                  style={styles.modeGradient}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                >
                  {/* Icon box med full accent */}
                  <View
                    style={[
                      styles.iconFrame,
                      { backgroundColor: mode.accent },
                    ]}
                  >
                    <Text style={[styles.modeIcon, mode.locked && { opacity: 0.75 }]}>
                      {mode.icon}
                    </Text>
                  </View>

                  <View style={styles.modeText}>
                    <View style={styles.modeNameRow}>
                      <Text style={styles.modeName}>{mode.name}</Text>
                      {!mode.locked ? (
                        <View style={[styles.freeBadge, { backgroundColor: `${mode.accent}30` }]}>
                          <Text style={[styles.freeBadgeText, { color: mode.accent }]}>
                            {t("GRATIS", "FREE", "無料")}
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.proBadge}>
                          <Text style={styles.proBadgeText}>👑 PRO</Text>
                        </View>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.modeTagline,
                        { color: "#fff" },
                      ]}
                      numberOfLines={1}
                    >
                      {mode.tagline}
                    </Text>
                    <Text style={styles.modeDesc} numberOfLines={2}>
                      {mode.desc}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.circleBtn,
                      {
                        backgroundColor: mode.locked
                          ? "rgba(230,196,106,0.2)"
                          : `${mode.accent}40`,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.arrowTxt,
                        { color: mode.locked ? "#E6C46A" : "#fff" },
                      ]}
                    >
                      {mode.locked ? "🔒" : "→"}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ))}

        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13111C",
  },
  scroll: {
    padding: 24,
    paddingTop: 70,
    paddingBottom: 40,
  },

  // TOP BAR
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  backBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 0.5, borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center", justifyContent: "center",
  },
  backText: { color: "#fff", fontSize: 20, fontWeight: "600" },
  gameChip: {
    flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 0.5, borderColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999,
  },
  gameChipIcon: { fontSize: 15 },
  gameChipName: { color: "#fff", fontSize: 13, fontWeight: "800" },

  // HEADER
  header: { marginBottom: 26 },
  eyebrow: {
    color: "#888",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -0.5,
    lineHeight: 40,
    marginBottom: 10,
  },
  titleAccent: { color: "#FF4D6D" },
  subtitle: { color: "rgba(255,255,255,0.45)", fontSize: 13 },
  goldText: { color: "#E6C46A", fontWeight: "700" },

  // MODE CARDS — kopi av HomeScreen list-stil
  modeCard: {
    height: 100,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 12,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  modeCardLocked: {
    shadowOpacity: 0.25,
  },
  modeGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 14,
  },
  iconFrame: {
    width: 56, height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  modeIcon: { fontSize: 28 },
  modeText: { flex: 1 },
  modeNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  modeName: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "900",
  },
  freeBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 999,
  },
  freeBadgeText: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  proBadge: {
    backgroundColor: "rgba(230,196,106,0.25)",
    paddingHorizontal: 7, paddingVertical: 2,
    borderRadius: 999,
  },
  proBadgeText: {
    color: "#E6C46A",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  modeTagline: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 1,
    opacity: 0.95,
  },
  modeDesc: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 10.5,
    marginTop: 2,
    lineHeight: 14,
  },
  circleBtn: {
    width: 36, height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowTxt: { fontSize: 16, fontWeight: "900" },
});