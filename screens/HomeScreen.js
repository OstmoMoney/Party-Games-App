import React, { useEffect, useRef, useState } from "react";
import {
  Text, StyleSheet, TouchableOpacity, View,
  Dimensions, Animated, StatusBar, Alert,
  Modal, ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { t } from "../i18n";

const { width } = Dimensions.get("window");

const GAMES = [
  {
    key: "GameTwo",
    icon: "🍻",
    name: t("Never Have I Ever", "Never Have I Ever", "ネバー・ハブ・アイ・エバー"),
    desc: t("142 spørsmål · 3-20 spillere", "142 questions · 3-20 players", "142問 · 3-20人"),
    isFeatured: true,
    accent: "#FF4D6D",
  },
  {
    key: "GameFive",
    icon: "🎭",
    name: t("Imposter", "Imposter", "インポスター"),
    desc: t("Hvem lyver?", "Who's lying?", "誰が嘘をついている？"),
    meta: t("4-12 spillere", "4-12 players", "4-12人"),
    colors: ["#1e3a8a", "#0f172a"],
    accent: "#3b82f6",
    locked: false,
    comingSoon: false,
  },
  {
    key: "GameFour",
    icon: "📦",
    name: t("ZYN Box", "ZYN Box", "ZYNボックス"),
    desc: t("Kast og utfordre", "Throw and dare", "投げて挑戦"),
    meta: t("3-8 spillere", "3-8 players", "3-8人"),
    colors: ["#5b21b6", "#1a0d2e"],
    accent: "#a78bfa",
    locked: false,
    comingSoon: false,
  },
  {
    key: "SpinTheBottle",
    icon: "🍾",
    name: t("Spin Bottle", "Spin Bottle", "スピン・ザ・ボトル"),
    desc: t("Truth or dare", "Truth or dare", "トゥルース・オア・デア"),
    meta: t("2+ spillere", "2+ players", "2人以上"),
    colors: ["#065f46", "#0a1a14"],
    accent: "#10b981",
    locked: false,
    comingSoon: false,
  },
  {
    key: "RiskItGame",
    icon: "🤾",
    name: t("Risk It", "Risk It", "リスクイット"),
    desc: t("Skjebnen velger", "Fate decides", "運命が決める"),
    meta: t("Maks 7 spillere", "Max 7 players", "最大7人"),
    colors: ["#78350f", "#1a1208"],
    accent: "#E6C46A",
    locked: true,
    comingSoon: false,
  },
];

const RULES_NO = [
  { title: "🍻 Never Have I Ever", text: "Drikk hvis du har gjort det som nevnes. Ta runder rundt bordet." },
  { title: "🎭 Imposter", text: "Send telefonen rundt. Én er imposteren og kjenner ikke ordet. Alle gir hint — imposteren prøver å passe inn." },
  { title: "📦 ZYN Box", text: "Sitt i sirkel. Les en påstand, kast boksen til den som passer best. De leser neste." },
  { title: "🍾 Spin the Bottle", text: "Legg inn spillere og snurr. Den det peker på svarer en sannhet eller gjør en utfordring." },
  { title: "🤾 Risk It", text: "Maks 7 spillere. Alle legger en finger på skjermen. Tilfeldig farge velges — den personen gjør utfordringen." },
];

const RULES_EN = [
  { title: "🍻 Never Have I Ever", text: "Drink if you've done what's mentioned. Take turns around the table." },
  { title: "🎭 Imposter", text: "Pass the phone around. One is the imposter and doesn't know the word. Everyone gives clues — the imposter tries to blend in." },
  { title: "📦 ZYN Box", text: "Sit in a circle. Read a statement, throw the box to whoever fits best. They read next." },
  { title: "🍾 Spin the Bottle", text: "Add players and spin. Whoever it points at answers a truth or does a dare." },
  { title: "🤾 Risk It", text: "Max 7 players. Everyone puts a finger on the screen. A random color is picked — that person does the challenge." },
];

const RULES_JA = [
  { title: "🍻 ネバー・ハブ・アイ・エバー", text: "言われたことをしたことがあれば飲む。テーブルを回って順番に。" },
  { title: "🎭 インポスター", text: "電話を回す。一人がインポスターで言葉を知らない。みんなヒントを出す — インポスターは紛れ込もうとする。" },
  { title: "📦 ZYNボックス", text: "輪になって座る。発言を読んで、最も合う人にボックスを投げる。" },
  { title: "🍾 スピン・ザ・ボトル", text: "プレイヤーを追加してスピン。指された人が真実を答えるか挑戦する。" },
  { title: "🤾 リスクイット", text: "最大7人。全員が画面に指を置く。ランダムな色が選ばれる — その人が挑戦する。" },
];

export default function HomeScreen({ navigation, route }) {
  const playerName = (route?.params?.playerName || "Markus");
  const initials = playerName.slice(0, 1).toUpperCase();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  }, []);

  const goToGame = (game) => {
    if (game.comingSoon) {
      Alert.alert(
        t("🚧 Kommer snart!", "🚧 Coming soon!", "🚧 もうすぐ！"),
        t(
          `${game.name} er under utvikling.`,
          `${game.name} is in development.`,
          `${game.name}は開発中です。`
        )
      );
      return;
    }
    if (game.locked) {
      Alert.alert(
        t("👑 Party Pass", "👑 Party Pass", "👑 パーティーパス"),
        t(
          `${game.name} er låst bak Party Pass. Lås opp alle spill og modes!`,
          `${game.name} is locked behind Party Pass. Unlock all games and modes!`,
          `${game.name}はパーティーパスでロックされています。`
        ),
        [
          { text: t("Ikke nå", "Not now", "今はやめる"), style: "cancel" },
          { text: t("Lås opp", "Unlock", "ロック解除"), onPress: () => {} },
        ]
      );
      return;
    }
    navigation.navigate("ModeSelect", { playerName, game: game.key });
  };

  const handleBuyPro = () => {
    Alert.alert(
      t("👑 Party Pass", "👑 Party Pass", "👑 パーティーパス"),
      t(
        "Lås opp alle spill og modes!\n\n• Risk It\n• Nasj & Blasted modes\n• Alle fremtidige spill",
        "Unlock all games and modes!\n\n• Risk It\n• Nasj & Blasted modes\n• All future games",
        "全てのゲームとモードをアンロック！"
      ),
      [
        { text: t("Ikke nå", "Not now", "今はやめる"), style: "cancel" },
        { text: t("Kjøp Pro", "Buy Pro", "Proを購入"), onPress: () => {} },
      ]
    );
  };

  const featuredGame = GAMES.find(g => g.isFeatured);
  const otherGames = GAMES.filter(g => !g.isFeatured);
  const rules = t(RULES_NO, RULES_EN, RULES_JA);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        style={{ opacity: fadeAnim }}
      >
        {/* TOP BAR — KUN AVATAR + RULES */}
        <View style={styles.topBar}>
          <LinearGradient colors={["#FF2C66", "#E11D48"]} style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </LinearGradient>
          <TouchableOpacity onPress={() => setShowRules(true)} style={styles.iconBox}>
            <Text style={styles.iconTxt}>📖</Text>
          </TouchableOpacity>
        </View>

        {/* HERO */}
        <View style={styles.hero}>
          <Text style={styles.heyText}>
            {t("HEY", "HEY", "やあ")} {playerName.toUpperCase()}{" "}
            <Text style={{ color: "#91633D" }}>●</Text>
          </Text>
          <Text style={styles.bigTitle}>
            {t("Velg spill.\nTrykk play.", "Pick a game.\nHit play.", "ゲームを選んで\nプレイ。")}
          </Text>
        </View>

        {/* ============================================== */}
        {/* FEATURED CARD — kun ekte iOS shadow, ingen bokser */}
        {/* ============================================== */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => goToGame(featuredGame)}
          style={styles.featuredCard}
        >
          <LinearGradient
            colors={["#FF4D6D", "#7C3AED"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.featuredGradient}
          >
            <Text style={styles.featuredWatermark}>🍻</Text>

            <View style={styles.tagRow}>
              <View style={styles.anbefaltTag}>
                <Text style={styles.anbefaltText}>
                  🔥 {t("ANBEFALT", "RECOMMENDED", "おすすめ")}
                </Text>
              </View>
              <Text style={styles.featuredEmoji}>🍻</Text>
            </View>

            <View>
              <Text style={styles.featuredTitle}>
                {t("Never Have\nI Ever", "Never Have\nI Ever", "ネバー・ハブ\nアイ・エバー")}
              </Text>
              <Text style={styles.featuredSub}>{featuredGame.desc}</Text>
            </View>

            <View style={styles.playButton}>
              <Text style={styles.playButtonText}>
                {t("LA OSS DRIKKE", "LET'S DRINK", "飲もう")}
              </Text>
              <Text style={styles.playButtonArrow}>→</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>{t("FLERE", "MORE", "もっと")}</Text>

        {/* LIST KORT — kun ekte iOS shadow */}
        {otherGames.map((game) => (
          <TouchableOpacity
            key={game.key}
            activeOpacity={0.85}
            onPress={() => goToGame(game)}
            style={[
              styles.listItem,
              { shadowColor: game.accent },
              game.locked && styles.listItemLocked,
            ]}
          >
            <LinearGradient
              colors={game.colors}
              style={styles.listGradient}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            >
              <View
                style={[
                  styles.iconFrame,
                  { backgroundColor: game.accent },
                ]}
              >
                <Text style={[styles.listEmoji, game.locked && { opacity: 0.7 }]}>
                  {game.icon}
                </Text>
              </View>

              <View style={styles.listText}>
                <View style={styles.listNameRow}>
                  <Text
                    style={[
                      styles.listName,
                      game.locked && { color: "#E6C46A" },
                    ]}
                  >
                    {game.name}
                  </Text>
                  {game.locked && (
                    <View style={styles.proBadge}>
                      <Text style={styles.proBadgeText}>👑 PRO</Text>
                    </View>
                  )}
                </View>
                <Text
                  style={[
                    styles.listSub,
                    { color: game.locked ? "rgba(230,196,106,0.95)" : "#fff" },
                  ]}
                  numberOfLines={1}
                >
                  {game.desc}
                </Text>
                <Text style={styles.listMeta} numberOfLines={1}>
                  {game.meta}
                </Text>
              </View>

              <View
                style={[
                  styles.circleBtn,
                  {
                    backgroundColor: game.locked
                      ? "rgba(230,196,106,0.2)"
                      : `${game.accent}40`,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.arrowTxt,
                    { color: game.locked ? "#E6C46A" : "#fff" },
                  ]}
                >
                  {game.locked ? "🔒" : "→"}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}

        {/* BUY PRO — kun ekte iOS shadow */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleBuyPro}
          style={styles.proCard}
        >
          <LinearGradient
            colors={["#3a2f1a", "#1a1208"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.proGradient}
          >
            <View style={styles.proCrown}>
              <Text style={styles.proCrownEmoji}>👑</Text>
            </View>
            <View style={styles.proText}>
              <Text style={styles.proTitle}>
                {t("Party Pass", "Party Pass", "パーティーパス")}
              </Text>
              <Text style={styles.proSub}>
                {t(
                  "Lås opp alle spill og modes",
                  "Unlock all games and modes",
                  "全てのゲームとモードをアンロック"
                )}
              </Text>
            </View>
            <View style={styles.proCta}>
              <Text style={styles.proCtaText}>
                {t("KJØP", "BUY", "購入")}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.ScrollView>

      {/* RULES MODAL */}
      <Modal transparent animationType="fade" visible={showRules}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              📖 {t("Spilleregler", "Rules", "ルール")}
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {rules.map((r, i) => (
                <View key={r.title}>
                  <View style={styles.ruleBlock}>
                    <Text style={styles.ruleTitle}>{r.title}</Text>
                    <Text style={styles.ruleText}>{r.text}</Text>
                  </View>
                  {i < rules.length - 1 && <View style={styles.ruleDivider} />}
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setShowRules(false)}
              style={styles.closeBtn}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={["#FF4D6D", "#7C3AED"]}
                style={styles.closeBtnGrad}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              >
                <Text style={styles.closeBtnText}>
                  {t("LUKK", "CLOSE", "閉じる")}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090E",
  },
  scroll: {
    padding: 24,
    paddingTop: 70,
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  avatar: {
    width: 44, height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#fff", fontWeight: "900", fontSize: 18 },
  iconBox: {
    width: 44, height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconTxt: { fontSize: 18 },

  hero: {},
  heyText: {
    color: "#888",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  bigTitle: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 40,
    marginBottom: 30,
    letterSpacing: -0.5,
  },

  // ============================================
  // FEATURED — ekte myk iOS shadow, ingen View i bakgrunnen
  // ============================================
  featuredCard: {
    height: 260,
    borderRadius: 35,
    marginBottom: 36,
    // EKTE GLOW: stor radius + høy opacity = myk lyseffekt rundt
    shadowColor: "#FF4D6D",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.65,
    shadowRadius: 35,
    // Android (begrenset støtte for farget glow)
    elevation: 20,
  },
  featuredGradient: {
    flex: 1,
    borderRadius: 35,
    padding: 25,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  featuredWatermark: {
    position: "absolute",
    right: -20, bottom: -30,
    fontSize: 180,
    opacity: 0.12,
    transform: [{ rotate: "-12deg" }],
  },
  tagRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  anbefaltTag: {
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  anbefaltText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },
  featuredEmoji: { fontSize: 32 },
  featuredTitle: { color: "#fff", fontSize: 32, fontWeight: "900", lineHeight: 36 },
  featuredSub: { color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: "700", marginTop: 5 },
  playButton: {
    backgroundColor: "#fff",
    height: 56,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonText: { color: "#000", fontWeight: "900", fontSize: 14, letterSpacing: 0.5 },
  playButtonArrow: { color: "#000", fontSize: 18, marginLeft: 8, fontWeight: "bold" },

  sectionLabel: {
    color: "#444",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 15,
  },

  // ============================================
  // LIST ITEMS — kun ekte shadow
  // ============================================
  listItem: {
    height: 92,
    borderRadius: 22,
    marginBottom: 14,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  listItemLocked: {
    shadowOpacity: 0.35,
  },
  listGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 14,
    borderRadius: 22,
    overflow: "hidden",
  },
  iconFrame: {
    width: 52, height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  listEmoji: { fontSize: 26 },
  listText: { flex: 1 },
  listNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  listName: { color: "#fff", fontSize: 16, fontWeight: "800" },
  proBadge: {
    backgroundColor: "rgba(230,196,106,0.25)",
    paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: 999,
  },
  proBadgeText: {
    color: "#E6C46A",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  listSub: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
    opacity: 0.95,
  },
  listMeta: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 10,
    marginTop: 2,
  },
  circleBtn: {
    width: 36, height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowTxt: { fontSize: 16, fontWeight: "900" },

  // ============================================
  // BUY PRO — ekte gull-glow
  // ============================================
  proCard: {
    height: 78,
    borderRadius: 22,
    marginTop: 22,
    shadowColor: "#E6C46A",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 10,
  },
  proGradient: {
    flex: 1,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 14,
    overflow: "hidden",
  },
  proCrown: {
    width: 50, height: 50,
    borderRadius: 14,
    backgroundColor: "rgba(230,196,106,0.18)",
    borderWidth: 1,
    borderColor: "rgba(230,196,106,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  proCrownEmoji: { fontSize: 24 },
  proText: { flex: 1 },
  proTitle: {
    color: "#E6C46A",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  proSub: {
    color: "rgba(230,196,106,0.7)",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
  proCta: {
    backgroundColor: "#E6C46A",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 999,
  },
  proCtaText: {
    color: "#1a1208",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
  },

  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "92%",
    maxHeight: "82%",
    backgroundColor: "#13131F",
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 18,
    textAlign: "center",
  },
  ruleBlock: { paddingVertical: 4 },
  ruleTitle: { color: "#fff", fontWeight: "900", fontSize: 14, marginBottom: 5 },
  ruleText: { color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 19 },
  ruleDivider: { height: 1, backgroundColor: "rgba(255,255,255,0.06)", marginVertical: 12 },
  closeBtn: { marginTop: 18, borderRadius: 14, overflow: "hidden" },
  closeBtnGrad: { paddingVertical: 14, alignItems: "center" },
  closeBtnText: { color: "#fff", fontWeight: "900", fontSize: 14, letterSpacing: 2 },
});