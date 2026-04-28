import React, { memo, useEffect, useRef, useState } from "react";
import {
  Text, StyleSheet, TouchableOpacity, View,
  Dimensions, Animated, Modal, ScrollView,
  Alert, StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const GAMES = [
  {
    key: "GameTwo",
    icon: "🍻",
    name: "Never Have I Ever",
    desc: "Klassisk drikkespill, ingen filter",
    iconBg: "rgba(255,77,109,0.12)",
    tag: "HOT", tagColor: "#ff4d6d", tagBg: "rgba(255,77,109,0.12)",
    accent: "#ff4d6d",
    locked: false,
    comingSoon: false,
  },
  {
    key: "GameFive",
    icon: "🎭",
    name: "Imposter",
    desc: "Hvem lyver? Hvem er imposteren?",
    iconBg: "rgba(96,165,250,0.12)",
    accent: "#60a5fa",
    locked: false,
    comingSoon: false,
  },
  {
    key: "RiskItGame",
    icon: "🤾",
    name: "Risk It",
    desc: "Alle legger en finger på skjermen",
    iconBg: "rgba(230,196,106,0.12)",
    accent: "#E6C46A",
    locked: true,
    comingSoon: false,
  },
  {
    key: "GameFour",
    icon: "📦",
    name: "ZYN Box",
    desc: "Kast og utfordre vennene dine",
    iconBg: "rgba(167,139,250,0.12)",
    accent: "#a78bfa",
    locked: false,
    comingSoon: false,
  },
  {
    key: "SpinTheBottle",
    icon: "🍾",
    name: "Spin the Bottle",
    desc: "Sannhet eller tør, spinne-utgaven",
    iconBg: "rgba(251,191,36,0.12)",
    accent: "#fbbf24",
    locked: false,
    comingSoon: false,
  },
  {
    key: "GameThree",
    icon: "🎴",
    name: "Mafia",
    desc: "Roller, løgner og deduksjon",
    iconBg: "rgba(255,255,255,0.06)",
    accent: "#666",
    locked: false,
    comingSoon: true,
  },
];

const RULES = [
  { title: "🍻 Never Have I Ever", text: "Drikk hvis du har gjort det som nevnes. Ta runder rundt bordet." },
  { title: "🎭 Imposter", text: "Send telefonen rundt. Én er imposteren og kjenner ikke ordet. Alle gir hint — imposteren prøver å passe inn." },
  { title: "🤾 Risk It", text: "Maks 7 spillere. Alle legger en finger på skjermen. Tilfeldig farge velges — den personen gjør utfordringen." },
  { title: "📦 ZYN Box", text: "Sitt i sirkel. Les en påstand, kast boksen til den som passer best. De leser neste." },
  { title: "🍾 Spin the Bottle", text: "Legg inn spillere og snurr. Den det peker på svarer en sannhet eller gjør en utfordring." },
  { title: "🎴 Mafia", text: "Alle joiner med kode. Verten tildeler hemmelige roller. Spill ut rollen din kvelden gjennom." },
];

export default function HomeScreen({ navigation, route }) {
  const playerName = route?.params?.playerName || "Player";
  const initials = playerName.slice(0, 1).toUpperCase();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const goToGame = (game) => {
    if (game.comingSoon) {
      Alert.alert(
        "🚧 Kommer snart!",
        `${game.name} er under utvikling. Følg med for oppdateringer!`,
        [{ text: "OK" }]
      );
      return;
    }
    if (game.locked) {
      Alert.alert(
        "👑 Party Pass",
        `${game.name} er låst bak Party Pass. Lås opp alle spill og modes!`,
        [
          { text: "Ikke nå", style: "cancel" },
          { text: "Lås opp", onPress: () => {} },
        ]
      );
      return;
    }
    navigation.navigate("ModeSelect", { playerName, game: game.key });
  };

  const quickStart = () => {
    const available = ["GameTwo", "GameFive", "GameFour", "SpinTheBottle"];
    const random = available[Math.floor(Math.random() * available.length)];
    navigation.navigate("ModeSelect", { playerName, game: random });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#0B0B14", "#10101C"]} style={StyleSheet.absoluteFill} />
      <View style={styles.glow1} />
      <View style={styles.glow2} />
      <FloatingBubbles />

      <Animated.ScrollView
        style={{ opacity: fadeAnim }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>

          {/* Top bar */}
          <View style={styles.topBar}>
            <LinearGradient colors={["#7C3AED", "#FF2C66"]} style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </LinearGradient>
            <TouchableOpacity style={styles.rulesPill} onPress={() => setShowRules(true)}>
              <Text style={styles.rulesPillText}>📖 REGLER</Text>
            </TouchableOpacity>
          </View>

          {/* Hero */}
          <View style={styles.hero}>
            <Text style={styles.greeting}>
              Hey, <Text style={styles.greetingName}>{playerName}</Text> 👋
            </Text>
            <Text style={styles.bigTitle}>
              Let's play{"\n"}<Text style={{ color: "#7C3AED" }}>tonight.</Text>
            </Text>
            <Text style={styles.sub}>Velg et spill og kom i gang</Text>
          </View>

          {/* Quick start */}
          <TouchableOpacity onPress={quickStart} activeOpacity={0.88} style={styles.quickStart}>
            <LinearGradient
              colors={["#7C3AED", "#9F5FF1"]}
              style={styles.quickStartGrad}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            >
              <View>
                <Text style={styles.qsTitle}>⚡ Quick Start</Text>
                <Text style={styles.qsSub}>Tilfeldig spill — rett til action</Text>
              </View>
              <View style={styles.qsArrow}>
                <Text style={styles.qsArrowText}>→</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Games list */}
          <Text style={styles.sectionLabel}>VELG SPILL</Text>
          <View style={styles.gameList}>
            {GAMES.map((g, i) => (
              <View key={g.key}>
                <TouchableOpacity
                  style={[styles.gameRow, (g.locked || g.comingSoon) && { opacity: 0.55 }]}
                  onPress={() => goToGame(g)}
                  activeOpacity={0.75}
                >
                  {/* Accent stripe */}
                  <View style={[styles.accentStripe, { backgroundColor: g.accent }]} />

                  <View style={[styles.gameIconBox, { backgroundColor: g.iconBg }]}>
                    <Text style={styles.gameIconText}>{g.icon}</Text>
                  </View>

                  <View style={styles.gameText}>
                    <Text style={styles.gameName}>{g.name}</Text>
                    <Text style={styles.gameDesc}>{g.desc}</Text>
                  </View>

                  {g.tag && !g.locked && !g.comingSoon && (
                    <View style={[styles.gameTag, { backgroundColor: g.tagBg }]}>
                      <Text style={[styles.gameTagText, { color: g.tagColor }]}>{g.tag}</Text>
                    </View>
                  )}

                  {g.locked && (
                    <View style={styles.lockedBadge}>
                      <Text style={styles.lockedBadgeText}>👑 PRO</Text>
                    </View>
                  )}

                  {g.comingSoon && (
                    <View style={styles.soonBadge}>
                      <Text style={styles.soonBadgeText}>🚧 SNART</Text>
                    </View>
                  )}

                  {!g.tag && !g.locked && !g.comingSoon && (
                    <Text style={styles.chevron}>›</Text>
                  )}
                </TouchableOpacity>
                {i < GAMES.length - 1 && <View style={styles.dividerLine} />}
              </View>
            ))}
          </View>

          {/* Premium */}
          <TouchableOpacity
            onPress={() => Alert.alert("👑 Party Pass", "Lås opp Risk It, Nasj + Blasted i alle spill!", [{ text: "OK" }])}
            activeOpacity={0.9}
            style={styles.premium}
          >
            <Text style={styles.premiumCrown}>👑</Text>
            <View style={styles.premiumText}>
              <Text style={styles.premiumTitle}>Party Pass</Text>
              <Text style={styles.premiumSub}>Lås opp Risk It + Nasj & Blasted</Text>
            </View>
            <View style={styles.premiumBtn}>
              <Text style={styles.premiumBtnText}>SE PRIS</Text>
            </View>
          </TouchableOpacity>

        </Animated.View>
      </Animated.ScrollView>

      {/* Rules modal */}
      <Modal transparent animationType="fade" visible={showRules}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>📖 Spilleregler</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {RULES.map((r, i) => (
                <View key={r.title}>
                  <View style={styles.ruleBlock}>
                    <Text style={styles.ruleTitle}>{r.title}</Text>
                    <Text style={styles.ruleText}>{r.text}</Text>
                  </View>
                  {i < RULES.length - 1 && <View style={styles.ruleDivider} />}
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowRules(false)} style={styles.closeBtn}>
              <LinearGradient
                colors={["#7C3AED", "#9F5FF1"]}
                style={styles.closeBtnGrad}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              >
                <Text style={styles.closeBtnText}>LUKK</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const FloatingBubbles = memo(() => {
  const bubbles = useRef(
    Array.from({ length: 7 }).map(() => ({
      size: Math.random() * 50 + 20,
      left: Math.random() * width,
      delay: Math.random() * 6000,
      duration: 14000 + Math.random() * 10000,
      color: Math.random() > 0.5 ? "#7C3AED" : "#FF2C66",
      anim: new Animated.Value(height + 100),
    }))
  ).current;

  useEffect(() => {
    bubbles.forEach((b) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(b.delay),
          Animated.timing(b.anim, { toValue: -b.size - 120, duration: b.duration, useNativeDriver: true }),
          Animated.timing(b.anim, { toValue: height + 100, duration: 0, useNativeDriver: true }),
        ])
      ).start()
    );
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {bubbles.map((b, i) => (
        <Animated.View key={i} style={{
          position: "absolute", width: b.size, height: b.size,
          borderRadius: b.size / 2, backgroundColor: b.color,
          left: b.left, opacity: 0.07,
          transform: [{ translateY: b.anim }],
        }} />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingBottom: 50 },
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
    paddingHorizontal: 22, paddingTop: 56, marginBottom: 24,
  },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: "center", justifyContent: "center",
  },
  avatarText: { color: "#fff", fontWeight: "900", fontSize: 16 },
  rulesPill: {
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999,
    backgroundColor: "rgba(124,58,237,0.15)",
    borderWidth: 1, borderColor: "rgba(124,58,237,0.3)",
  },
  rulesPillText: { color: "#9F5FF1", fontWeight: "800", fontSize: 12, letterSpacing: 1 },
  hero: { paddingHorizontal: 22, marginBottom: 22 },
  greeting: { color: "rgba(255,255,255,0.4)", fontSize: 15, marginBottom: 4 },
  greetingName: { color: "#fff", fontWeight: "800" },
  bigTitle: {
    color: "#fff", fontSize: 38, fontWeight: "900",
    letterSpacing: 0.5, lineHeight: 44, marginBottom: 8,
  },
  sub: { color: "rgba(255,255,255,0.3)", fontSize: 13 },
  quickStart: { marginHorizontal: 22, borderRadius: 22, overflow: "hidden", marginBottom: 28 },
  quickStartGrad: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", padding: 20,
  },
  qsTitle: { color: "#fff", fontSize: 18, fontWeight: "900" },
  qsSub: { color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 3 },
  qsArrow: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center", justifyContent: "center",
  },
  qsArrowText: { color: "#fff", fontSize: 20 },
  sectionLabel: {
    fontSize: 11, fontWeight: "700", letterSpacing: 2,
    color: "rgba(255,255,255,0.25)",
    paddingHorizontal: 22, marginBottom: 8,
  },
  gameList: {
    marginHorizontal: 16, marginBottom: 28,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 22, borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    overflow: "hidden",
  },
  gameRow: {
    flexDirection: "row", alignItems: "center",
    gap: 12, paddingVertical: 14, paddingRight: 16,
  },
  accentStripe: { width: 4, alignSelf: "stretch" },
  gameIconBox: {
    width: 46, height: 46, borderRadius: 14,
    alignItems: "center", justifyContent: "center",
  },
  gameIconText: { fontSize: 22 },
  gameText: { flex: 1 },
  gameName: { color: "#fff", fontSize: 14, fontWeight: "800", marginBottom: 2 },
  gameDesc: { color: "rgba(255,255,255,0.35)", fontSize: 11 },
  gameTag: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 999 },
  gameTagText: { fontSize: 9, fontWeight: "800", letterSpacing: 0.5 },
  chevron: { color: "rgba(255,255,255,0.2)", fontSize: 22 },
  lockedBadge: {
    backgroundColor: "rgba(230,196,106,0.15)",
    paddingHorizontal: 9, paddingVertical: 4, borderRadius: 999,
  },
  lockedBadgeText: { color: "#E6C46A", fontSize: 9, fontWeight: "800", letterSpacing: 0.5 },
  soonBadge: {
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 9, paddingVertical: 4, borderRadius: 999,
  },
  soonBadgeText: { color: "rgba(255,255,255,0.4)", fontSize: 9, fontWeight: "800", letterSpacing: 0.5 },
  dividerLine: {
    height: 1, backgroundColor: "rgba(255,255,255,0.05)", marginLeft: 72,
  },
  premium: {
    marginHorizontal: 16, borderRadius: 20,
    borderWidth: 1, borderColor: "rgba(230,196,106,0.2)",
    backgroundColor: "rgba(230,196,106,0.06)",
    flexDirection: "row", alignItems: "center",
    padding: 18, gap: 14,
  },
  premiumCrown: { fontSize: 28 },
  premiumText: { flex: 1 },
  premiumTitle: { color: "#E6C46A", fontSize: 15, fontWeight: "900" },
  premiumSub: { color: "rgba(255,255,255,0.3)", fontSize: 12, marginTop: 2 },
  premiumBtn: {
    backgroundColor: "#E6C46A",
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999,
  },
  premiumBtnText: { color: "#0B0B14", fontSize: 11, fontWeight: "900", letterSpacing: 1 },
  modalOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center", alignItems: "center",
  },
  modalCard: {
    width: "92%", maxHeight: "82%",
    backgroundColor: "#13131F", borderRadius: 28,
    padding: 22, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
  },
  modalTitle: { color: "#fff", fontSize: 20, fontWeight: "900", marginBottom: 18, textAlign: "center" },
  ruleBlock: { paddingVertical: 4 },
  ruleTitle: { color: "#fff", fontWeight: "900", fontSize: 14, marginBottom: 5 },
  ruleText: { color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 19 },
  ruleDivider: { height: 1, backgroundColor: "rgba(255,255,255,0.06)", marginVertical: 12 },
  closeBtn: { marginTop: 18, borderRadius: 14, overflow: "hidden" },
  closeBtnGrad: { paddingVertical: 14, alignItems: "center" },
  closeBtnText: { color: "#fff", fontWeight: "900", fontSize: 14, letterSpacing: 2 },
});