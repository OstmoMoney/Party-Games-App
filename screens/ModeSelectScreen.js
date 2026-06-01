import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
  Alert,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { t } from "../i18n";

const { width, height } = Dimensions.get("window");

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
    colors: ["rgba(12, 88, 60, 0.9)", "rgba(4, 22, 25, 0.98)"],
    accent: "#25D98A",
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
    colors: ["rgba(93, 28, 74, 0.92)", "rgba(22, 8, 24, 0.98)"],
    accent: "#EC4899",
    locked: false,
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
    colors: ["rgba(22, 43, 92, 0.88)", "rgba(6, 10, 24, 0.98)"],
    accent: "#4F7BFF",
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
    colors: ["rgba(109, 49, 18, 0.92)", "rgba(22, 11, 8, 0.98)"],
    accent: "#FB923C",
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
    colors: ["rgba(95, 20, 30, 0.94)", "rgba(22, 7, 10, 0.98)"],
    accent: "#F87171",
    locked: true,
  },
];

const GAME_META = {
  RiskItGame: { icon: "🏃", name: "Risk It" },
  GameTwo: { icon: "🍻", name: "Never Have I Ever" },
  GameFour: { icon: "📦", name: "ZYN Box" },
  SpinTheBottle: { icon: "🍾", name: "Spin the Bottle" },
  GameThree: { icon: "🎴", name: "Mafia" },
  GameFive: { icon: "🎭", name: "Imposter" },
};

const SCREEN_MAP = {
  GameTwo: "NeverHaveIEver",
  GameFive: "Imposter",
  GameFour: "ZYNBox",
  RiskItGame: "RiskIt",
  SpinTheBottle: "SpinTheBottle",
};

export default function ModeSelectScreen({ navigation, route }) {
  const playerName = route?.params?.playerName || "Player";
  const gameName = route?.params?.game || "RiskItGame";
  const game = GAME_META[gameName] || GAME_META.RiskItGame;

  const [selected, setSelected] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(28)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const scaleAnims = useRef(MODES.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();
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
      Animated.timing(scaleAnims[index], {
        toValue: 0.97,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[index], {
        toValue: 1,
        duration: 70,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        const screen = SCREEN_MAP[gameName] || "ComingSoon";
        navigation.navigate(screen, {
          playerName,
          game: gameName,
          mode: mode.key,
        });
      }, 120);
    });
  };

  const handleBuyPro = () => {
    Alert.alert(
      t("👑 Party Pass", "👑 Party Pass", "👑 パーティーパス"),
      t(
        "Lås opp alle låste modes og ekstra innhold.",
        "Unlock all locked modes and extra content.",
        "ロックされたモードと追加コンテンツをアンロック。"
      )
    );
  };

  const pulseY = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>

            <View style={styles.gameChip}>
              <Text style={styles.gameChipIcon}>{game.icon}</Text>
              <Text style={styles.gameChipName}>{game.name}</Text>
            </View>
          </View>

          <View style={styles.header}>
            <Text style={styles.eyebrow}>
              {t("VELG INTENSITET", "PICK INTENSITY", "強度を選ぶ")}
            </Text>

            <Text style={styles.title}>
              {t("Hvor gal", "How wild", "どれくらい")}
              {"\n"}
              {t("blir det?", "should it be?", "ワイルドに？")}
            </Text>

            <Text style={styles.subtitle}>
              {t(
                "Velg stemningen før spillet starter.",
                "Choose the vibe before the game starts.",
                "ゲーム開始前に雰囲気を選んでください。"
              )}
            </Text>

            <Animated.View
              pointerEvents="none"
              style={[
                styles.headerIconWrap,
                {
                  transform: [{ translateY: pulseY }, { rotate: "-8deg" }],
                },
              ]}
            >
              <Text style={styles.headerIcon}>{game.icon}</Text>
            </Animated.View>
          </View>

          <Text style={styles.sectionLabel}>
            {t("MODES", "MODES", "モード")}
          </Text>

          <View style={styles.modeList}>
            {MODES.map((mode, i) => (
              <Animated.View
                key={mode.key}
                style={{ transform: [{ scale: scaleAnims[i] }] }}
              >
                <TouchableOpacity
                  activeOpacity={0.86}
                  onPress={() => handleSelect(mode, i)}
                  style={styles.modeCard}
                >
                  <LinearGradient
                    colors={mode.colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                      styles.modeGradient,
                      {
                        borderColor:
                          selected === mode.key
                            ? mode.accent
                            : mode.locked
                            ? "rgba(230,196,106,0.18)"
                            : "rgba(255,255,255,0.08)",
                      },
                    ]}
                  >
                    <View style={[styles.iconFrame, { backgroundColor: mode.accent }]}>
                      <Text style={styles.modeIcon}>{mode.icon}</Text>
                    </View>

                    <View style={styles.modeText}>
                      <View style={styles.modeNameRow}>
                        <Text style={styles.modeName}>{mode.name}</Text>

                        {!mode.locked ? (
                          <View style={[styles.freeBadge, { backgroundColor: `${mode.accent}22` }]}>
                            <Text style={[styles.freeBadgeText, { color: mode.accent }]}>
                              FREE
                            </Text>
                          </View>
                        ) : (
                          <View style={styles.proBadge}>
                            <Text style={styles.proBadgeText}>PRO</Text>
                          </View>
                        )}
                      </View>

                      <Text style={[styles.modeTagline, { color: mode.accent }]} numberOfLines={1}>
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
                            ? "rgba(230,196,106,0.18)"
                            : `${mode.accent}20`,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.arrowTxt,
                          {
                            color: mode.locked ? "#E6C46A" : "#fff",
                          },
                        ]}
                      >
                        {mode.locked ? "🔒" : "→"}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      <TouchableOpacity activeOpacity={0.9} style={styles.buyProFloating} onPress={handleBuyPro}>
        <LinearGradient
          colors={["#F8D879", "#D89B25", "#8A5A10"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buyProGradient}
        >
          <Text style={styles.buyProText}>👑 BUY PARTY PASS</Text>
        </LinearGradient>
      </TouchableOpacity>
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
    top: 160,
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
    top: height * 0.36,
    left: 0,
    right: 0,
    height: height * 0.45,
  },

  scroll: {
    paddingTop: 56,
    paddingHorizontal: 22,
    paddingBottom: 122,
  },

  topBar: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 54,
  },

  backBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.09)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.13)",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "900",
    marginTop: -2,
  },

  gameChip: {
    height: 52,
    maxWidth: width * 0.68,
    paddingLeft: 15,
    paddingRight: 18,
    borderRadius: 30,
    backgroundColor: "rgba(6, 8, 20, 0.88)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    flexDirection: "row",
    alignItems: "center",
  },

  gameChipIcon: {
    fontSize: 22,
    marginRight: 10,
  },

  gameChipName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
  },

  header: {
    minHeight: 245,
    marginBottom: 28,
    position: "relative",
    justifyContent: "flex-end",
  },

  eyebrow: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 3.2,
    marginBottom: 20,
  },

  title: {
    color: "#fff",
    fontSize: 45,
    lineHeight: 51,
    fontWeight: "900",
    letterSpacing: -1.7,
  },

  subtitle: {
    marginTop: 18,
    maxWidth: width * 0.7,
    color: "rgba(255,255,255,0.63)",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "800",
  },

  headerIconWrap: {
    position: "absolute",
    right: -8,
    bottom: 12,
    zIndex: 1,
  },

  headerIcon: {
    fontSize: 118,
    opacity: 0.92,
  },

  sectionLabel: {
    color: "rgba(255,255,255,0.48)",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 4,
    marginBottom: 18,
  },

  modeList: {
    gap: 16,
  },

  modeCard: {
    height: 104,
    borderRadius: 24,
    overflow: "hidden",
  },

  modeGradient: {
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },

  iconFrame: {
    width: 58,
    height: 58,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  modeIcon: {
    fontSize: 28,
  },

  modeText: {
    flex: 1,
  },

  modeNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  modeName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: -0.3,
  },

  freeBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },

  freeBadgeText: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
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

  modeTagline: {
    fontSize: 12.5,
    fontWeight: "900",
    marginTop: 4,
  },

  modeDesc: {
    color: "rgba(255,255,255,0.48)",
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 15,
    marginTop: 2,
  },

  circleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  arrowTxt: {
    fontSize: 27,
    fontWeight: "900",
    marginTop: -2,
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
});