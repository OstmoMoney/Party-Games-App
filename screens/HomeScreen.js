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
import { t } from "../i18n";

const { width, height } = Dimensions.get("window");

const GAMES = [
  {
    key: "GameTwo",
    icon: "🍻",
    name: t("Never Have I Ever", "Never Have I Ever", "ネバー・ハブ・アイ・エバー"),
    desc: t("142 questions · 3-20 players", "142 questions · 3-20 players", "142問 · 3-20人"),
    isFeatured: true,
  },
  {
    key: "GameFive",
    icon: "🎭",
    name: t("Imposter", "Imposter", "インポスター"),
    desc: t("Who's lying?", "Who's lying?", "誰が嘘をついている？"),
    meta: t("4-12 players", "4-12 players", "4-12人"),
    colors: ["rgba(28, 52, 110, 0.85)", "rgba(8, 12, 28, 0.98)"],
    accent: "#5B84FF",
  },
  {
    key: "GameFour",
    icon: "📦",
    name: t("ZYN Box", "ZYN Box", "ZYNボックス"),
    desc: t("Throw and dare", "Throw and dare", "投げて挑戦"),
    meta: t("3-8 players", "3-8 players", "3-8人"),
    colors: ["rgba(62, 28, 92, 0.88)", "rgba(15, 10, 28, 0.98)"],
    accent: "#C07BFF",
  },
  {
    key: "SpinTheBottle",
    icon: "🍾",
    name: t("Spin Bottle", "Spin Bottle", "スピン・ザ・ボトル"),
    desc: t("Truth or dare", "Truth or dare", "トゥルース・オア・デア"),
    meta: t("2+ players", "2+ players", "2人以上"),
    colors: ["rgba(14, 96, 66, 0.88)", "rgba(5, 24, 26, 0.98)"],
    accent: "#2EE69A",
  },
  {
    key: "RiskItGame",
    icon: "🏃",
    name: t("Risk It", "Risk It", "リスクイット"),
    desc: t("Fate decides", "Fate decides", "運命が決める"),
    meta: t("Max 7 players", "Max 7 players", "最大7人"),
    colors: ["rgba(86, 58, 18, 0.88)", "rgba(22, 15, 12, 0.98)"],
    accent: "#F0CC72",
    locked: false,
  },
  {
    key: "Quiz",
    icon: "🧠",
    name: t("Quiz", "Quiz", "クイズ"),
    desc: t("Coming soon", "Coming soon", "近日公開"),
    meta: t("2-20 players", "2-20 players", "2-20人"),
    colors: ["rgba(22, 66, 90, 0.88)", "rgba(8, 20, 30, 0.98)"],
    accent: "#46C8FA",
    comingSoon: true,
  },
];

const RULES_NO = [
  { icon: "🍻", title: "Never Have I Ever", text: "Drikk hvis du har gjort det som nevnes. Ta runder rundt bordet." },
  { icon: "🎭", title: "Imposter", text: "Send telefonen rundt. Én er imposteren og kjenner ikke ordet. Alle gir hint — imposteren prøver å passe inn." },
  { icon: "📦", title: "ZYN Box", text: "Sitt i sirkel. Les en påstand, kast boksen til den som passer best. De leser neste." },
  { icon: "🍾", title: "Spin the Bottle", text: "Legg inn spillere og snurr. Den det peker på svarer en sannhet eller gjør en utfordring." },
  { icon: "🤾", title: "Risk It", text: "Maks 7 spillere. Alle legger en finger på skjermen. Tilfeldig farge velges — den personen gjør utfordringen." },
];

const RULES_EN = [
  { icon: "🍻", title: "Never Have I Ever", text: "Drink if you've done what's mentioned. Take turns around the table." },
  { icon: "🎭", title: "Imposter", text: "Pass the phone around. One is the imposter and doesn't know the word. Everyone gives clues — the imposter tries to blend in." },
  { icon: "📦", title: "ZYN Box", text: "Sit in a circle. Read a statement, throw the box to whoever fits best. They read next." },
  { icon: "🍾", title: "Spin the Bottle", text: "Add players and spin. Whoever it points at answers a truth or does a dare." },
  { icon: "🤾", title: "Risk It", text: "Max 7 players. Everyone puts a finger on the screen. A random color is picked — that person does the challenge." },
];

const RULES_JA = [
  { icon: "🍻", title: "ネバー・ハブ・アイ・エバー", text: "言われたことをしたことがあれば飲む。テーブルを回って順番に。" },
  { icon: "🎭", title: "インポスター", text: "電話を回す。一人がインポスターで言葉を知らない。みんなヒントを出す — インポスターは紛れ込もうとする。" },
  { icon: "📦", title: "ZYNボックス", text: "輪になって座る。発言を読んで、最も合う人にボックスを投げる。" },
  { icon: "🍾", title: "スピン・ザ・ボトル", text: "プレイヤーを追加してスピン。指された人が真実を答えるか挑戦する。" },
  { icon: "🤾", title: "リスクイット", text: "最大7人。全員が画面に指を置く。ランダムな色が選ばれる — その人が挑戦する。" },
];

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
      onPressIn={() => animateTo(0.965)}
      onPressOut={() => animateTo(1)}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}

export default function HomeScreen({ navigation, route }) {
  const playerName = route?.params?.playerName || "Player";
  const initials = playerName.slice(0, 1).toUpperCase();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const beerAnim = useRef(new Animated.Value(0)).current;
  const proPulse = useRef(new Animated.Value(0)).current;
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

    // Svevende emoji i hero
    Animated.loop(
      Animated.sequence([
        Animated.timing(beerAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(beerAnim, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    ).start();

    // Diskret puls på PRO-knappen
    Animated.loop(
      Animated.sequence([
        Animated.timing(proPulse, { toValue: 1, duration: 1600, useNativeDriver: true }),
        Animated.timing(proPulse, { toValue: 0, duration: 1600, useNativeDriver: true }),
      ])
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

  const beerY = beerAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -7] });
  const proScale = proPulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.02] });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Bakgrunn */}
      <LinearGradient
        colors={["#15121F", "#090B16", "#050711"]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.redBlob} />
      <View style={styles.purpleBlob} />
      <LinearGradient
        colors={["rgba(5,7,17,0)", "#050711"]}
        style={styles.darkFade}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        style={{ opacity: fadeAnim }}
      >
        {/* ---------- Toppbar ---------- */}
        <View style={styles.topBar}>
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
            style={styles.profilePill}
            onPress={() => navigation.navigate("Intro")}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={t("Endre profil", "Edit profile", "プロフィール編集")}
          >
            <LinearGradient colors={["#FF6A54", "#EC2C83", "#7A4DFF"]} style={styles.profileRing}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>
            </LinearGradient>
            <Text style={styles.profileName} numberOfLines={1}>
              {playerName}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ---------- Hilsen ---------- */}
        <Text style={styles.heyText}>
          HEY {playerName.toUpperCase()} <Text style={styles.dot}>●</Text>
        </Text>

        {/* ---------- Featured hero-kort ---------- */}
        <ScalePressable
          onPress={() => goToGame(featuredGame)}
          style={styles.heroCard}
          accessibilityLabel={`${featuredGame.name}. ${featuredGame.desc}`}
        >
          <LinearGradient
            colors={["rgba(255, 70, 110, 0.22)", "rgba(122, 45, 255, 0.16)", "rgba(10, 12, 26, 0.6)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroInner}
          >
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>
                ⭐ {t("MEST POPULÆR", "MOST POPULAR", "一番人気")}
              </Text>
            </View>

            <View style={styles.heroMain}>
              <View style={styles.heroTextWrap}>
                <Text style={styles.heroTitle}>Never Have{"\n"}I Ever</Text>
                <Text style={styles.heroSub}>{featuredGame.desc}</Text>
              </View>

              <Animated.View
                pointerEvents="none"
                style={[styles.beerWrap, { transform: [{ translateY: beerY }, { rotate: "-8deg" }] }]}
              >
                <Text style={styles.beerEmoji}>🍻</Text>
              </Animated.View>
            </View>

            <View style={styles.heroButton}>
              <LinearGradient
                colors={["#FF6252", "#F13381", "#B92BFF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.heroButtonGradient}
              >
                <Text style={styles.heroButtonText}>
                  {t("LA OSS DRIKKE", "LET'S DRINK", "乾杯しよう")}
                </Text>
                <Text style={styles.heroArrow}>→</Text>
              </LinearGradient>
            </View>
          </LinearGradient>
        </ScalePressable>

        {/* ---------- Flere spill ---------- */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionLabel}>{t("FLERE SPILL", "MORE GAMES", "他のゲーム")}</Text>
          <View style={styles.sectionLine} />
        </View>

        <View style={styles.gamesList}>
          {otherGames.map((game, i) => {
            const translateY = cardAnims[i].interpolate({
              inputRange: [0, 1],
              outputRange: [22, 0],
            });
            const isDisabledLook = game.comingSoon;

            return (
              <Animated.View
                key={game.key}
                style={{ opacity: cardAnims[i], transform: [{ translateY }] }}
              >
                <ScalePressable
                  onPress={() => goToGame(game)}
                  style={[styles.gameCard, isDisabledLook && styles.gameCardSoon]}
                  accessibilityLabel={`${game.name}. ${game.desc}. ${game.meta}`}
                >
                  <LinearGradient
                    colors={game.colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                      styles.gameGradient,
                      {
                        borderColor: game.locked
                          ? "rgba(240,204,114,0.22)"
                          : `${game.accent}22`,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.gameIconBox,
                        {
                          backgroundColor: `${game.accent}26`,
                          borderColor: `${game.accent}55`,
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
                          <View style={styles.proBadge}>
                            <Text style={styles.proBadgeText}>PRO</Text>
                          </View>
                        )}
                        {game.comingSoon && (
                          <View style={styles.soonBadge}>
                            <Text style={styles.soonBadgeText}>SOON</Text>
                          </View>
                        )}
                      </View>
                      <Text style={[styles.gameDesc, { color: game.accent }]} numberOfLines={1}>
                        {game.desc}
                      </Text>
                      <Text style={styles.gameMeta}>{game.meta}</Text>
                    </View>

                    <View style={[styles.arrowCircle, { backgroundColor: `${game.accent}1E` }]}>
                      <Text
                        style={[
                          styles.cardArrow,
                          { color: game.locked ? "#F0CC72" : game.accent },
                        ]}
                      >
                        {game.locked ? "🔒" : "→"}
                      </Text>
                    </View>
                  </LinearGradient>
                </ScalePressable>
              </Animated.View>
            );
          })}
        </View>
      </Animated.ScrollView>

      {/* ---------- Flytende PRO-knapp ---------- */}
      <Animated.View style={[styles.buyProFloating, { transform: [{ scale: proScale }] }]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleBuyPro}
          accessibilityRole="button"
          accessibilityLabel={t("Kjøp Party Pass", "Buy Party Pass", "パーティーパスを購入")}
        >
          <LinearGradient
            colors={["#F8D879", "#D89B25", "#8A5A10"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buyProGradient}
          >
            <Text style={styles.buyProText}>
              👑 {t("KJØP PRO", "BUY PRO", "PROを購入")}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

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
                colors={["#FF4D6D", "#B000FF"]}
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
  container: { flex: 1, backgroundColor: "#050711" },

  /* ---------- Bakgrunn ---------- */
  redBlob: {
    position: "absolute",
    top: -130,
    left: -170,
    width: width * 1.15,
    height: width * 1.15,
    borderRadius: width,
    backgroundColor: "rgba(255, 69, 105, 0.34)",
    shadowColor: "#FF4569",
    shadowOpacity: 1,
    shadowRadius: 90,
    shadowOffset: { width: 0, height: 0 },
    elevation: 20,
  },
  purpleBlob: {
    position: "absolute",
    top: 200,
    right: -190,
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width,
    backgroundColor: "rgba(126, 45, 255, 0.26)",
    shadowColor: "#7E2DFF",
    shadowOpacity: 1,
    shadowRadius: 100,
    shadowOffset: { width: 0, height: 0 },
    elevation: 20,
  },
  darkFade: {
    position: "absolute",
    top: height * 0.36,
    left: 0,
    right: 0,
    height: height * 0.44,
  },

  scroll: { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 130 },

  /* ---------- Toppbar ---------- */
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 36,
  },
  rulesButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  rulesIcon: { fontSize: 21 },
  profilePill: {
    height: 50,
    paddingLeft: 5,
    paddingRight: 16,
    borderRadius: 28,
    backgroundColor: "rgba(8, 10, 24, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    flexDirection: "row",
    alignItems: "center",
    maxWidth: width * 0.55,
  },
  profileRing: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#111321",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontSize: 14, fontWeight: "900" },
  profileName: { color: "#fff", fontSize: 14, fontWeight: "800", flexShrink: 1 },

  /* ---------- Hilsen ---------- */
  heyText: {
    color: "rgba(255,255,255,0.66)",
    fontSize: 12.5,
    fontWeight: "900",
    letterSpacing: 3,
    marginBottom: 16,
  },
  dot: { color: "#E6B94A" },

  /* ---------- Hero-kort ---------- */
  heroCard: {
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 36,
    borderWidth: 1,
    borderColor: "rgba(255, 90, 130, 0.28)",
    shadowColor: "#F13381",
    shadowOpacity: 0.35,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 10 },
    elevation: 14,
  },
  heroInner: { padding: 22, paddingTop: 18 },
  heroBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255, 98, 82, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(255, 98, 82, 0.35)",
    marginBottom: 16,
  },
  heroBadgeText: {
    color: "#FF8A78",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  heroMain: { minHeight: 130, position: "relative", marginBottom: 20 },
  heroTextWrap: { zIndex: 3, maxWidth: width * 0.62 },
  heroTitle: {
    color: "#fff",
    fontSize: 38,
    lineHeight: 43,
    fontWeight: "900",
    letterSpacing: -1.4,
  },
  heroSub: {
    marginTop: 12,
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    fontWeight: "700",
  },
  beerWrap: { position: "absolute", right: -16, bottom: -14, zIndex: 2 },
  beerEmoji: { fontSize: 110, opacity: 0.95 },
  heroButton: { height: 56, borderRadius: 18, overflow: "hidden" },
  heroButtonGradient: {
    flex: 1,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  heroButtonText: { color: "#fff", fontSize: 15, fontWeight: "900", letterSpacing: 1.2 },
  heroArrow: { color: "#fff", fontSize: 24, fontWeight: "900", marginTop: -2 },

  /* ---------- Seksjon ---------- */
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 14,
  },
  sectionLabel: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 12.5,
    fontWeight: "900",
    letterSpacing: 3.6,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  /* ---------- Spillkort ---------- */
  gamesList: { gap: 14 },
  gameCard: {
    height: 90,
    borderRadius: 24,
    overflow: "hidden",
  },
  gameCardSoon: { opacity: 0.6 },
  gameGradient: {
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  gameIconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderWidth: 1,
  },
  gameIcon: { fontSize: 26 },
  gameText: { flex: 1 },
  nameRow: { flexDirection: "row", alignItems: "center" },
  gameName: {
    color: "#fff",
    fontSize: 16.5,
    fontWeight: "900",
    letterSpacing: -0.3,
    flexShrink: 1,
  },
  gameDesc: { fontSize: 12.5, fontWeight: "800", marginTop: 3 },
  gameMeta: { color: "rgba(255,255,255,0.6)", fontSize: 11.5, fontWeight: "700", marginTop: 2 },
  arrowCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  cardArrow: { fontSize: 24, fontWeight: "900", marginTop: -2 },

  /* ---------- Badges ---------- */
  proBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 999,
    backgroundColor: "rgba(240,204,114,0.2)",
    borderWidth: 1,
    borderColor: "rgba(240,204,114,0.4)",
  },
  proBadgeText: { color: "#F0CC72", fontSize: 9, fontWeight: "900", letterSpacing: 1 },
  soonBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 999,
    backgroundColor: "rgba(70,200,250,0.16)",
    borderWidth: 1,
    borderColor: "rgba(70,200,250,0.4)",
  },
  soonBadgeText: { color: "#46C8FA", fontSize: 9, fontWeight: "900", letterSpacing: 1 },

  /* ---------- PRO-knapp ---------- */
  buyProFloating: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 26,
    zIndex: 50,
    borderRadius: 29,
    shadowColor: "#E6C46A",
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  buyProGradient: {
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
  },
  buyProText: { color: "#171006", fontSize: 15, fontWeight: "900", letterSpacing: 1.3 },

  /* ---------- Modal ---------- */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.84)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  modalCard: {
    width: "100%",
    maxHeight: "80%",
    backgroundColor: "#13131F",
    borderRadius: 28,
    padding: 22,
    paddingTop: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
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
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
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
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  ruleIcon: { fontSize: 18 },
  ruleTextWrap: { flex: 1 },
  ruleTitle: { color: "#fff", fontSize: 14.5, fontWeight: "900", marginBottom: 4 },
  ruleText: { color: "rgba(255,255,255,0.62)", fontSize: 13, lineHeight: 19 },
  ruleDivider: { height: 1, backgroundColor: "rgba(255,255,255,0.07)", marginVertical: 12 },
  closeButton: { marginTop: 18, borderRadius: 16, overflow: "hidden" },
  closeGradient: { paddingVertical: 14, alignItems: "center" },
  closeText: { color: "#fff", fontSize: 14, fontWeight: "900", letterSpacing: 2 },
});