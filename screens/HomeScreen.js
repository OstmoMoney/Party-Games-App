import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
  StatusBar,
  Alert,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Defs, RadialGradient, Stop, Ellipse } from "react-native-svg";
import { t } from "../i18n";
import {
  MidnightBackground,
  GlassCard,
  ACCENT_GRADIENT,
  PRO_GRADIENT,
  COLORS,
  FONT,
} from "../components/MidnightUI";

const { width } = Dimensions.get("window");

const GAMES = [
  {
    key: "GameTwo",
    icon: "🍻",
    name: t("Jeg har aldri ...", "Never Have I Ever", "ネバー・ハブ・アイ・エバー"),
    desc: t("142 spørsmål · 3-20 spillere", "142 questions · 3-20 players", "142問 · 3-20人"),
    isFeatured: true,
  },
  {
    key: "GameFive",
    icon: "🎭",
    name: t("Imposter", "Imposter", "インポスター"),
    desc: t("Hvem lyver?", "Who's lying?", "誰が嘘をついている？"),
    meta: t("4-12 spillere", "4-12 players", "4-12人"),
    accent: "#608cff",
  },
  {
    key: "GameFour",
    icon: "📦",
    name: t("Snusleken", "ZYN Box", "ZYNボックス"),
    desc: t("Kast og utfordre", "Throw and dare", "投げて挑戦"),
    meta: t("3-8 spillere", "3-8 players", "3-8人"),
    accent: "#a855f7",
  },
  {
    key: "SpinTheBottle",
    icon: "🍾",
    name: t("Flasketuten peker på", "Spin Bottle", "スピン・ザ・ボトル"),
    desc: t("Sannhet eller nøtt", "Truth or dare", "トゥルース・オア・デア"),
    meta: t("2+ spillere", "2+ players", "2人以上"),
    accent: "#34d399",
  },
  {
    key: "RiskItGame",
    icon: "🏃",
    name: t("Sjansen", "Risk It", "リスクイット"),
    desc: t("Skjebnen bestemmer", "Fate decides", "運命が決める"),
    meta: t("Maks 7 spillere", "Max 7 players", "最大7人"),
    accent: "#f97316",
    locked: false,
  },
  {
    key: "Quiz",
    icon: "🧠",
    name: t("Quiz", "Quiz", "クイズ"),
    desc: t("Kommer snart", "Coming soon", "近日公開"),
    meta: t("2-20 spillere", "2-20 players", "2-20人"),
    accent: "#e879b9",
    comingSoon: true,
  },
];

const RULES_NO = [
  { icon: "🍻", title: "Jeg har aldri ...", text: "Én person leser opp påstanden høyt. Alle som har gjort det, drikker." },
  { icon: "🎭", title: "Imposter", text: "Send telefonen rundt. Én er imposteren og kjenner ikke ordet. Alle gir hint — imposteren prøver å passe inn." },
  { icon: "📦", title: "Snusleken", text: "Én person leser påstandene hele spillet. Snusboksen kastes til den som passer best — den som får boksen, kaster den videre ved neste påstand." },
  { icon: "🍾", title: "Flasketuten peker på", text: "Legg inn spillere og snurr. Den det peker på svarer en sannhet eller gjør en nøtt." },
  { icon: "🤾", title: "Sjansen", text: "Maks 7 spillere. Alle legger en finger på skjermen. Tilfeldig farge velges — den personen gjør utfordringen." },
];

const RULES_EN = [
  { icon: "🍻", title: "Never Have I Ever", text: "One person reads the statement out loud. Everyone who has done it drinks." },
  { icon: "🎭", title: "Imposter", text: "Pass the phone around. One is the imposter and doesn't know the word. Everyone gives clues — the imposter tries to blend in." },
  { icon: "📦", title: "ZYN Box", text: "One person reads the statements all game. The box is thrown to whoever fits best — whoever gets the box throws it on at the next statement." },
  { icon: "🍾", title: "Spin the Bottle", text: "Add players and spin. Whoever it points at answers a truth or does a dare." },
  { icon: "🤾", title: "Risk It", text: "Max 7 players. Everyone puts a finger on the screen. A random color is picked — that person does the challenge." },
];

const RULES_JA = [
  { icon: "🍻", title: "ネバー・ハブ・アイ・エバー", text: "一人が声に出して読む。したことがある人は全員飲む。" },
  { icon: "🎭", title: "インポスター", text: "電話を回す。一人がインポスターで言葉を知らない。みんなヒントを出す — インポスターは紛れ込もうとする。" },
  { icon: "📦", title: "ZYNボックス", text: "一人がずっと読み上げる。最も合う人にボックスを投げる — 受け取った人が次の発言で投げる。" },
  { icon: "🍾", title: "スピン・ザ・ボトル", text: "プレイヤーを追加してスピン。指された人が真実を答えるか挑戦する。" },
  { icon: "🤾", title: "リスクイット", text: "最大7人。全員が画面に指を置く。ランダムな色が選ばれる — その人が挑戦する。" },
];

const DAY_NO = ["SØNDAGSKVELD", "MANDAGSKVELD", "TIRSDAGSKVELD", "ONSDAGSKVELD", "TORSDAGSKVELD", "FREDAGSKVELD", "LØRDAGSKVELD"];
const DAY_EN = ["SUNDAY NIGHT", "MONDAY NIGHT", "TUESDAY NIGHT", "WEDNESDAY NIGHT", "THURSDAY NIGHT", "FRIDAY NIGHT", "SATURDAY NIGHT"];
const DAY_JA = ["日曜の夜", "月曜の夜", "火曜の夜", "水曜の夜", "木曜の夜", "金曜の夜", "土曜の夜"];

/* ------------------------------------------------------------------ */
/*  Pressable med skala-feedback — gjenbrukes på alle trykkbare kort  */
/* ------------------------------------------------------------------ */
function ScalePressable({ onPress, style, children, accessibilityLabel, disabled }) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (toValue) =>
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      speed: 40,
      bounciness: 5,
    }).start();

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => animateTo(0.97)}
      onPressOut={() => animateTo(1)}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}

/* ------------------------------------------------------------------ */
/*  Intern rosa glow øverst til høyre i featured-kortet               */
/* ------------------------------------------------------------------ */
function FeaturedGlow() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%">
        <Defs>
          <RadialGradient id="featuredGlow" cx="50%" cy="50%" rx="50%" ry="50%">
            <Stop offset="0" stopColor="#ec4878" stopOpacity="0.3" />
            <Stop offset="0.7" stopColor="#ec4878" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Ellipse cx="100%" cy="0" rx={260} ry={200} fill="url(#featuredGlow)" />
      </Svg>
    </View>
  );
}

export default function HomeScreen({ navigation, route }) {
  const playerName = route?.params?.playerName || "Player";
  const initials = playerName.slice(0, 1).toUpperCase();
  const dayLabel = t(DAY_NO, DAY_EN, DAY_JA)[new Date().getDay()];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showRules, setShowRules] = useState(false);

  const featuredGame = GAMES.find((g) => g.isFeatured);
  const otherGames = GAMES.filter((g) => !g.isFeatured);
  const rules = t(RULES_NO, RULES_EN, RULES_JA);

  // Én Animated.Value per kort for staggered inngang
  const cardAnims = useRef(otherGames.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Hero fader inn først
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 550,
      useNativeDriver: true,
    }).start();

    // Kortene glir inn ett og ett
    Animated.stagger(
      80,
      cardAnims.map((a) =>
        Animated.timing(a, {
          toValue: 1,
          duration: 420,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  const goToGame = (game) => {
    if (game.comingSoon) {
      Alert.alert(
        t("🧠 Quiz", "🧠 Quiz", "🧠 クイズ"),
        t("Quiz kommer snart!", "Quiz coming soon!", "クイズは近日公開！")
      );
      return;
    }
    if (game.locked) {
      Alert.alert(
        t("👑 Party Pass", "👑 Party Pass", "👑 パーティーパス"),
        t(
          `${game.name} er låst bak Party Pass.`,
          `${game.name} is locked behind Party Pass.`,
          `${game.name}はパーティーパスでロックされています。`
        )
      );
      return;
    }
    navigation.navigate("ModeSelect", { playerName, game: game.key });
  };

  const handleBuyPro = () => {
    Alert.alert(
      t("👑 Party Pass", "👑 Party Pass", "👑 パーティーパス"),
      t(
        "Lås opp alle spill og modes!",
        "Unlock all games and modes!",
        "全てのゲームとモードをアンロック！"
      )
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <MidnightBackground variant="home" />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        style={{ opacity: fadeAnim }}
      >
        {/* ---------- Header ---------- */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerEyebrow}>{dayLabel}</Text>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {t("Hei", "Hey", "やあ")} {playerName} 👋
            </Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => setShowRules(true)}
              style={styles.rulesButton}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={t("Vis spilleregler", "Show rules", "ルールを表示")}
            >
              <Text style={styles.rulesIcon}>📖</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Intro")}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel={t("Endre profil", "Edit profile", "プロフィール編集")}
            >
              <LinearGradient
                colors={ACCENT_GRADIENT}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.avatar}
              >
                <Text style={styles.avatarText}>{initials}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* ---------- Featured-kort ---------- */}
        <ScalePressable
          onPress={() => goToGame(featuredGame)}
          accessibilityLabel={`${featuredGame.name}. ${featuredGame.desc}`}
        >
          <GlassCard
            radius={28}
            borderColor="rgba(255,255,255,0.14)"
            style={styles.featuredCard}
            contentStyle={styles.featuredContent}
          >
            <FeaturedGlow />

            <View style={styles.featuredChip}>
              <Text style={styles.featuredChipStar}>★</Text>
              <Text style={styles.featuredChipText}>
                {t("MEST POPULÆR", "MOST POPULAR", "一番人気")}
              </Text>
            </View>

            <View style={styles.featuredTitleRow}>
              <Text style={styles.featuredTitle}>{featuredGame.name}</Text>
              <Text style={styles.featuredEmoji}>🍻</Text>
            </View>

            <Text style={styles.featuredMeta}>{featuredGame.desc}</Text>

            <LinearGradient
              colors={ACCENT_GRADIENT}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.featuredButton}
            >
              <Text style={styles.featuredButtonText}>
                {t("LA OSS DRIKKE", "LET'S DRINK", "乾杯しよう")} →
              </Text>
            </LinearGradient>
          </GlassCard>
        </ScalePressable>

        {/* ---------- Flere spill ---------- */}
        <Text style={styles.sectionLabel}>{t("FLERE SPILL", "MORE GAMES", "他のゲーム")}</Text>

        <View style={styles.gamesList}>
          {otherGames.map((game, i) => {
            const translateY = cardAnims[i].interpolate({
              inputRange: [0, 1],
              outputRange: [22, 0],
            });

            return (
              <Animated.View
                key={game.key}
                style={{ opacity: cardAnims[i], transform: [{ translateY }] }}
              >
                <ScalePressable
                  onPress={() => goToGame(game)}
                  style={styles.gameRow}
                  accessibilityLabel={`${game.name}. ${game.desc}. ${game.meta}`}
                >
                  <View
                    style={[
                      styles.gameIconTile,
                      {
                        backgroundColor: `${game.accent}24`,
                        borderColor: `${game.accent}4D`,
                      },
                    ]}
                  >
                    <Text style={styles.gameIcon}>{game.icon}</Text>
                  </View>

                  <View style={styles.gameText}>
                    <View style={styles.nameRow}>
                      <Text style={styles.gameName} numberOfLines={1}>
                        {game.name}
                      </Text>
                      {game.locked && (
                        <LinearGradient
                          colors={PRO_GRADIENT}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={styles.proBadge}
                        >
                          <Text style={styles.proBadgeText}>PRO</Text>
                        </LinearGradient>
                      )}
                      {game.comingSoon && (
                        <View style={[styles.soonBadge, { borderColor: `${game.accent}80` }]}>
                          <Text style={[styles.soonBadgeText, { color: game.accent }]}>SOON</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.gameSub} numberOfLines={1}>
                      {game.desc} · {game.meta}
                    </Text>
                  </View>

                  <Text style={styles.gameArrow}>{game.locked ? "🔒" : "→"}</Text>
                </ScalePressable>
              </Animated.View>
            );
          })}
        </View>
      </Animated.ScrollView>

      {/* ---------- Pinnet PRO-banner ---------- */}
      <View style={styles.buyProPinned}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleBuyPro}
          accessibilityRole="button"
          accessibilityLabel={t("Kjøp Party Pass", "Buy Party Pass", "パーティーパスを購入")}
        >
          <LinearGradient
            colors={PRO_GRADIENT}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buyProGradient}
          >
            <Text style={styles.buyProText}>
              👑 {t("KJØP PRO", "BUY PRO", "PROを購入")}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* ---------- Regelmodal ---------- */}
      <Modal
        transparent
        animationType="fade"
        visible={showRules}
        onRequestClose={() => setShowRules(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowRules(false)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>{t("Spilleregler", "How to play", "遊び方")}</Text>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
              {rules.map((r, i) => (
                <View key={r.title}>
                  <View style={styles.ruleBlock}>
                    <View style={styles.ruleIconBox}>
                      <Text style={styles.ruleIcon}>{r.icon}</Text>
                    </View>
                    <View style={styles.ruleTextWrap}>
                      <Text style={styles.ruleTitle}>{r.title}</Text>
                      <Text style={styles.ruleText}>{r.text}</Text>
                    </View>
                  </View>
                  {i < rules.length - 1 && <View style={styles.ruleDivider} />}
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setShowRules(false)}
              activeOpacity={0.85}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel={t("Lukk reglene", "Close rules", "ルールを閉じる")}
            >
              <LinearGradient
                colors={ACCENT_GRADIENT}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.closeGradient}
              >
                <Text style={styles.closeText}>{t("LUKK", "CLOSE", "閉じる")}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  scroll: { paddingTop: 56, paddingHorizontal: 24, paddingBottom: 118 },

  /* ---------- Header ---------- */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
    marginBottom: 22,
  },
  headerLeft: { flex: 1, marginRight: 12 },
  headerEyebrow: {
    fontFamily: FONT.label,
    fontSize: 11,
    letterSpacing: 3,
    color: COLORS.text50,
  },
  headerTitle: {
    marginTop: 4,
    fontFamily: FONT.extra,
    fontSize: 28,
    letterSpacing: -0.5,
    color: COLORS.text,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rulesButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  rulesIcon: { fontSize: 18 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: FONT.extra,
    fontSize: 17,
    color: COLORS.text,
  },

  /* ---------- Featured-kort ---------- */
  featuredCard: {},
  featuredContent: { padding: 24 },
  featuredChip: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  featuredChipStar: {
    fontFamily: FONT.label,
    fontSize: 10,
    letterSpacing: 2,
    color: COLORS.gold,
  },
  featuredChipText: {
    fontFamily: FONT.label,
    fontSize: 10,
    letterSpacing: 2,
    color: COLORS.text,
  },
  featuredTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 14,
    gap: 12,
  },
  featuredTitle: {
    flex: 1,
    fontFamily: FONT.extra,
    fontSize: 34,
    lineHeight: 35,
    letterSpacing: -1,
    color: COLORS.text,
  },
  featuredEmoji: { fontSize: 40, lineHeight: 44 },
  featuredMeta: {
    marginTop: 10,
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLORS.text60,
  },
  featuredButton: {
    marginTop: 18,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  featuredButtonText: {
    fontFamily: FONT.bold,
    fontSize: 14,
    letterSpacing: 2,
    color: COLORS.text,
  },

  /* ---------- Seksjon ---------- */
  sectionLabel: {
    fontFamily: FONT.label,
    fontSize: 11,
    letterSpacing: 3,
    color: COLORS.text50,
    marginTop: 24,
    marginBottom: 12,
    marginHorizontal: 4,
  },

  /* ---------- Spillrader ---------- */
  gamesList: { gap: 10 },
  gameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  gameIconTile: {
    width: 46,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gameIcon: { fontSize: 22 },
  gameText: { flex: 1 },
  nameRow: { flexDirection: "row", alignItems: "center" },
  gameName: {
    fontFamily: FONT.bold,
    fontSize: 16,
    color: COLORS.text,
    flexShrink: 1,
  },
  gameSub: {
    marginTop: 2,
    fontFamily: FONT.regular,
    fontSize: 12.5,
    color: COLORS.text50,
  },
  gameArrow: {
    fontSize: 18,
    color: COLORS.text45,
  },

  /* ---------- Badges ---------- */
  proBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  proBadgeText: {
    fontFamily: FONT.label,
    fontSize: 9,
    letterSpacing: 1.5,
    color: COLORS.proText,
  },
  soonBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
  },
  soonBadgeText: {
    fontFamily: FONT.label,
    fontSize: 9,
    letterSpacing: 1.5,
  },

  /* ---------- PRO-banner ---------- */
  buyProPinned: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 28,
    zIndex: 50,
  },
  buyProGradient: {
    borderRadius: 16,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buyProText: {
    fontFamily: FONT.extra,
    fontSize: 13,
    letterSpacing: 2,
    color: COLORS.proText,
  },

  /* ---------- Modal ---------- */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(13,10,24,0.85)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  modalCard: {
    width: "100%",
    maxHeight: "80%",
    backgroundColor: "#171225",
    borderRadius: 28,
    padding: 22,
    paddingTop: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  modalHandle: {
    alignSelf: "center",
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.18)",
    marginBottom: 14,
  },
  modalTitle: {
    fontFamily: FONT.extra,
    fontSize: 20,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 16,
  },
  modalScroll: { flexGrow: 0 },
  ruleBlock: { flexDirection: "row", alignItems: "flex-start", paddingVertical: 4 },
  ruleIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  ruleIcon: { fontSize: 18 },
  ruleTextWrap: { flex: 1 },
  ruleTitle: {
    fontFamily: FONT.bold,
    fontSize: 14.5,
    color: COLORS.text,
    marginBottom: 4,
  },
  ruleText: {
    fontFamily: FONT.regular,
    fontSize: 13,
    lineHeight: 19,
    color: "rgba(255,255,255,0.62)",
  },
  ruleDivider: { height: 1, backgroundColor: "rgba(255,255,255,0.07)", marginVertical: 12 },
  closeButton: { marginTop: 18, borderRadius: 14, overflow: "hidden" },
  closeGradient: { paddingVertical: 14, alignItems: "center" },
  closeText: {
    fontFamily: FONT.bold,
    fontSize: 14,
    letterSpacing: 2,
    color: COLORS.text,
  },
});
