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
    colors: ["rgba(22, 43, 92, 0.82)", "rgba(6, 10, 24, 0.98)"],
    accent: "#4F7BFF",
  },
  {
    key: "GameFour",
    icon: "📦",
    name: t("ZYN Box", "ZYN Box", "ZYNボックス"),
    desc: t("Throw and dare", "Throw and dare", "投げて挑戦"),
    meta: t("3-8 players", "3-8 players", "3-8人"),
    colors: ["rgba(55, 24, 78, 0.9)", "rgba(13, 9, 24, 0.98)"],
    accent: "#B96CFF",
  },
  {
    key: "SpinTheBottle",
    icon: "🍾",
    name: t("Spin Bottle", "Spin Bottle", "スピン・ザ・ボトル"),
    desc: t("Truth or dare", "Truth or dare", "トゥルース・オア・デア"),
    meta: t("2+ players", "2+ players", "2人以上"),
    colors: ["rgba(12, 88, 60, 0.9)", "rgba(4, 22, 25, 0.98)"],
    accent: "#25D98A",
  },
  {
    key: "RiskItGame",
    icon: "🏃",
    name: t("Risk It", "Risk It", "リスクイット"),
    desc: t("Fate decides", "Fate decides", "運命が決める"),
    meta: t("Max 7 players", "Max 7 players", "最大7人"),
    colors: ["rgba(75, 50, 16, 0.9)", "rgba(19, 13, 12, 0.98)"],
    accent: "#E6C46A",
    locked: false,
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
  const playerName = route?.params?.playerName || "Trym";
  const initials = playerName.slice(0, 1).toUpperCase();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const beerAnim = useRef(new Animated.Value(0)).current;

  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 650,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(beerAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(beerAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const goToGame = (game) => {
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

    navigation.navigate("ModeSelect", {
      playerName,
      game: game.key,
    });
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

  const featuredGame = GAMES.find((g) => g.isFeatured);
  const otherGames = GAMES.filter((g) => !g.isFeatured);
  const rules = t(RULES_NO, RULES_EN, RULES_JA);

  const beerY = beerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={["#14121F", "#080A15", "#050711"]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.redBlob} />
      <View style={styles.purpleBlob} />

      <LinearGradient
        colors={["rgba(5,7,17,0)", "#050711"]}
        locations={[0, 1]}
        style={styles.darkFade}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        style={{ opacity: fadeAnim }}
      >
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setShowRules(true)} style={styles.rulesButton}>
            <Text style={styles.rulesIcon}>📖</Text>
          </TouchableOpacity>

          <View style={styles.profilePill}>
            <LinearGradient colors={["#FF6A54", "#EC2C83", "#7A4DFF"]} style={styles.profileRing}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>
            </LinearGradient>

            <Text style={styles.profileName}>{playerName}</Text>
            <Text style={styles.crown}>👑</Text>
            <Text style={styles.points}>274</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heyText}>
            HEY {playerName.toUpperCase()} <Text style={styles.dot}>●</Text>
          </Text>

          <View style={styles.heroMain}>
            <View style={styles.heroTextWrap}>
              <Text style={styles.heroTitle}>Never Have{"\n"}I Ever</Text>
              <Text style={styles.heroSub}>{featuredGame.desc}</Text>
            </View>

            <Animated.View
              pointerEvents="none"
              style={[
                styles.beerWrap,
                {
                  transform: [{ translateY: beerY }, { rotate: "-8deg" }],
                },
              ]}
            >
              <Text style={styles.beerEmoji}>🍻</Text>
            </Animated.View>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => goToGame(featuredGame)}
            style={styles.heroButton}
          >
            <LinearGradient
              colors={["#FF6252", "#F13381", "#B92BFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.heroButtonGradient}
            >
              <Text style={styles.heroButtonText}>LET'S DRINK</Text>
              <Text style={styles.heroArrow}>→</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>MORE GAMES</Text>

        <View style={styles.gamesList}>
          {otherGames.map((game) => (
            <TouchableOpacity
              key={game.key}
              activeOpacity={0.86}
              onPress={() => goToGame(game)}
              style={styles.gameCard}
            >
              <LinearGradient
                colors={game.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  styles.gameGradient,
                  {
                    borderColor: game.locked
                      ? "rgba(230,196,106,0.18)"
                      : "rgba(255,255,255,0.08)",
                  },
                ]}
              >
                <View style={[styles.gameIconBox, { backgroundColor: game.accent }]}>
                  <Text style={styles.gameIcon}>{game.icon}</Text>
                </View>

                <View style={styles.gameText}>
                  <View style={styles.nameRow}>
                    <Text style={styles.gameName}>{game.name}</Text>

                    {game.locked && (
                      <View style={styles.proBadge}>
                        <Text style={styles.proBadgeText}>PRO</Text>
                      </View>
                    )}
                  </View>

                  <Text style={[styles.gameDesc, { color: game.accent }]}>{game.desc}</Text>
                  <Text style={styles.gameMeta}>{game.meta}</Text>
                </View>

                <View style={[styles.arrowCircle, { backgroundColor: `${game.accent}20` }]}>
                  <Text style={[styles.cardArrow, { color: game.locked ? "#E6C46A" : "#fff" }]}>
                    {game.locked ? "🔒" : "→"}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.ScrollView>

      <TouchableOpacity activeOpacity={0.9} style={styles.buyProFloating} onPress={handleBuyPro}>
        <LinearGradient
          colors={["#F8D879", "#D89B25", "#8A5A10"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buyProGradient}
        >
          <Text style={styles.buyProText}>👑 BUY PRO</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Modal transparent animationType="fade" visible={showRules}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>📖 {t("Spilleregler", "Rules", "ルール")}</Text>

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
              activeOpacity={0.85}
              style={styles.closeButton}
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
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050711",
  },

  redBlob: {
    position: "absolute",
    top: -130,
    left: -170,
    width: width * 1.15,
    height: width * 1.15,
    borderRadius: width,
    backgroundColor: "rgba(255, 69, 105, 0.42)",
    shadowColor: "#FF4569",
    shadowOpacity: 1,
    shadowRadius: 90,
    shadowOffset: { width: 0, height: 0 },
    elevation: 20,
  },

  purpleBlob: {
    position: "absolute",
    top: 170,
    right: -190,
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width,
    backgroundColor: "rgba(126, 45, 255, 0.34)",
    shadowColor: "#7E2DFF",
    shadowOpacity: 1,
    shadowRadius: 100,
    shadowOffset: { width: 0, height: 0 },
    elevation: 20,
  },

  darkFade: {
    position: "absolute",
    top: height * 0.38,
    left: 0,
    right: 0,
    height: height * 0.42,
  },

  scroll: {
    paddingTop: 56,
    paddingHorizontal: 22,
    paddingBottom: 120,
  },

  topBar: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 84,
  },

  rulesButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.09)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.13)",
    alignItems: "center",
    justifyContent: "center",
  },

  rulesIcon: {
    fontSize: 22,
  },

  profilePill: {
    height: 52,
    minWidth: 154,
    paddingLeft: 5,
    paddingRight: 16,
    borderRadius: 30,
    backgroundColor: "rgba(6, 8, 20, 0.88)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    flexDirection: "row",
    alignItems: "center",
  },

  profileRing: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatar: {
    width: 33,
    height: 33,
    borderRadius: 17,
    backgroundColor: "#111321",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "900",
  },

  profileName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "900",
    marginRight: 7,
  },

  crown: {
    fontSize: 14,
    marginRight: 5,
  },

  points: {
    color: "rgba(255,255,255,0.86)",
    fontSize: 14,
    fontWeight: "900",
  },

  hero: {
    marginBottom: 42,
  },

  heyText: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 3.2,
    marginBottom: 22,
  },

  dot: {
    color: "#E6B94A",
  },

  heroMain: {
    height: 205,
    position: "relative",
  },

  heroTextWrap: {
    zIndex: 3,
  },

  heroTitle: {
    color: "#fff",
    fontSize: 43,
    lineHeight: 49,
    fontWeight: "900",
    letterSpacing: -1.6,
  },

  heroSub: {
    marginTop: 18,
    color: "rgba(255,255,255,0.63)",
    fontSize: 15,
    fontWeight: "800",
  },

  beerWrap: {
    position: "absolute",
    right: -10,
    bottom: -4,
    zIndex: 2,
  },

  beerEmoji: {
    fontSize: 128,
    opacity: 0.92,
  },

  heroButton: {
    width: width * 0.56,
    height: 58,
    borderRadius: 20,
    overflow: "hidden",
  },

  heroButtonGradient: {
    flex: 1,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  heroButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1.1,
  },

  heroArrow: {
    color: "#fff",
    fontSize: 29,
    fontWeight: "900",
    marginTop: -2,
  },

  sectionLabel: {
    color: "rgba(255,255,255,0.48)",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 4,
    marginBottom: 18,
  },

  gamesList: {
    gap: 16,
  },

  gameCard: {
    height: 88,
    borderRadius: 24,
    overflow: "hidden",
  },

  gameGradient: {
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },

  gameIconBox: {
    width: 58,
    height: 58,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  gameIcon: {
    fontSize: 27,
  },

  gameText: {
    flex: 1,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  gameName: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: -0.3,
  },

  gameDesc: {
    fontSize: 12.5,
    fontWeight: "900",
    marginTop: 3,
  },

  gameMeta: {
    color: "rgba(255,255,255,0.48)",
    fontSize: 11.5,
    fontWeight: "800",
    marginTop: 2,
  },

  arrowCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  cardArrow: {
    fontSize: 28,
    fontWeight: "900",
    marginTop: -2,
  },

  proBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: "rgba(230,196,106,0.26)",
  },

  proBadgeText: {
    color: "#E6C46A",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },

  buyProFloating: {
    position: "absolute",
    left: 22,
    right: 22,
    bottom: 24,
    height: 58,
    borderRadius: 29,
    overflow: "hidden",
    zIndex: 50,
    shadowColor: "#E6C46A",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },

  buyProGradient: {
    flex: 1,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },

  buyProText: {
    color: "#171006",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1.3,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.82)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  modalCard: {
    width: "100%",
    maxHeight: "82%",
    backgroundColor: "#12121F",
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 18,
  },

  ruleBlock: {
    paddingVertical: 4,
  },

  ruleTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 5,
  },

  ruleText: {
    color: "rgba(255,255,255,0.58)",
    fontSize: 13,
    lineHeight: 19,
  },

  ruleDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.07)",
    marginVertical: 12,
  },

  closeButton: {
    marginTop: 18,
    borderRadius: 16,
    overflow: "hidden",
  },

  closeGradient: {
    paddingVertical: 14,
    alignItems: "center",
  },

  closeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 2,
  },
});