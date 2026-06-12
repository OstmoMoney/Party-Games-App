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
  Pressable,
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
    colors: ["rgba(14, 96, 66, 0.88)", "rgba(5, 24, 26, 0.98)"],
    accent: "#2EE69A",
    intensity: 1,
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
    colors: ["rgba(98, 30, 78, 0.9)", "rgba(24, 9, 26, 0.98)"],
    accent: "#F35BAB",
    intensity: 2,
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
    colors: ["rgba(28, 52, 110, 0.85)", "rgba(8, 12, 28, 0.98)"],
    accent: "#5B84FF",
    intensity: 3,
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
    colors: ["rgba(112, 52, 20, 0.9)", "rgba(24, 12, 8, 0.98)"],
    accent: "#FB923C",
    intensity: 4,
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
    colors: ["rgba(100, 22, 32, 0.92)", "rgba(24, 8, 11, 0.98)"],
    accent: "#FF6B6B",
    intensity: 5,
    locked: true,
  },
];

const MAX_INTENSITY = 5;

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

/* ------------------------------------------------------------------ */
/*  Pressable med skala-feedback — samme som på Home og Intro         */
/* ------------------------------------------------------------------ */
function ScalePressable({ onPress, style, children, accessibilityLabel }) {
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
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}

/* ------------------------------------------------------------------ */
/*  Intensitetsmåler — fem søyler som viser hvor vilt moduset er      */
/* ------------------------------------------------------------------ */
function IntensityMeter({ level, accent }) {
  return (
    <View style={styles.meterRow} accessibilityLabel={`${level} / ${MAX_INTENSITY}`}>
      {Array.from({ length: MAX_INTENSITY }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.meterBar,
            {
              backgroundColor: i < level ? accent : "rgba(255,255,255,0.12)",
              height: 5 + i * 2, // søylene vokser — som en volum-indikator
            },
          ]}
        />
      ))}
    </View>
  );
}

export default function ModeSelectScreen({ navigation, route }) {
  const playerName = route?.params?.playerName || "Player";
  const gameName = route?.params?.game || "RiskItGame";
  const game = GAME_META[gameName] || GAME_META.RiskItGame;

  const [selected, setSelected] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(26)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const proPulse = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef(MODES.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Header inn først
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 550, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 550, useNativeDriver: true }),
    ]).start();

    // Kortene glir inn ett og ett
    Animated.stagger(
      75,
      cardAnims.map((a) =>
        Animated.timing(a, { toValue: 1, duration: 400, useNativeDriver: true })
      )
    ).start();

    // Svevende emoji i header
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0, duration: 1800, useNativeDriver: true }),
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

  const handleSelect = (mode) => {
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

    // Kort pause så man rekker å se den valgte rammen før navigering
    setTimeout(() => {
      const screen = SCREEN_MAP[gameName] || "ComingSoon";
      navigation.navigate(screen, {
        playerName,
        game: gameName,
        mode: mode.key,
      });
    }, 180);
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

  const pulseY = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -5] });
  const proScale = proPulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.02] });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Bakgrunn — identisk med Home og Intro */}
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* ---------- Toppbar ---------- */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={t("Tilbake", "Go back", "戻る")}
            >
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>

            <View style={styles.gameChip}>
              <Text style={styles.gameChipIcon}>{game.icon}</Text>
              <Text style={styles.gameChipName} numberOfLines={1}>
                {game.name}
              </Text>
            </View>
          </View>

          {/* ---------- Header ---------- */}
          <View style={styles.header}>
            <Text style={styles.eyebrow}>
              {t("VELG INTENSITET", "PICK INTENSITY", "強度を選ぶ")}
            </Text>

            <Text style={styles.title} accessibilityRole="header">
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
                { transform: [{ translateY: pulseY }, { rotate: "-8deg" }] },
              ]}
            >
              <Text style={styles.headerIcon}>{game.icon}</Text>
            </Animated.View>
          </View>

          {/* ---------- Skala-hint: rolig → vilt ---------- */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>
              {t("ROLIG", "CALM", "おだやか")}
            </Text>
            <LinearGradient
              colors={["#2EE69A", "#5B84FF", "#FB923C", "#FF6B6B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.sectionScale}
            />
            <Text style={styles.sectionLabel}>
              {t("VILT", "WILD", "ワイルド")}
            </Text>
          </View>

          {/* ---------- Modes ---------- */}
          <View style={styles.modeList}>
            {MODES.map((mode, i) => {
              const translateY = cardAnims[i].interpolate({
                inputRange: [0, 1],
                outputRange: [22, 0],
              });
              const isSelected = selected === mode.key;

              return (
                <Animated.View
                  key={mode.key}
                  style={{ opacity: cardAnims[i], transform: [{ translateY }] }}
                >
                  <ScalePressable
                    onPress={() => handleSelect(mode)}
                    style={styles.modeCard}
                    accessibilityLabel={`${mode.name}. ${mode.tagline}. ${
                      mode.locked
                        ? t("Krever Party Pass", "Requires Party Pass", "パーティーパスが必要")
                        : t("Gratis", "Free", "無料")
                    }`}
                  >
                    <LinearGradient
                      colors={mode.colors}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[
                        styles.modeGradient,
                        {
                          borderColor: isSelected
                            ? mode.accent
                            : mode.locked
                            ? "rgba(240,204,114,0.22)"
                            : `${mode.accent}22`,
                          borderWidth: isSelected ? 2 : 1,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.iconFrame,
                          {
                            backgroundColor: `${mode.accent}26`,
                            borderColor: `${mode.accent}55`,
                          },
                        ]}
                      >
                        <Text style={styles.modeIcon}>{mode.icon}</Text>
                      </View>

                      <View style={styles.modeText}>
                        <View style={styles.modeNameRow}>
                          <Text style={styles.modeName} numberOfLines={1}>
                            {mode.name}
                          </Text>

                          {!mode.locked ? (
                            <View
                              style={[styles.freeBadge, { backgroundColor: `${mode.accent}20`, borderColor: `${mode.accent}45` }]}
                            >
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

                        <IntensityMeter level={mode.intensity} accent={mode.accent} />
                      </View>

                      <View
                        style={[
                          styles.circleBtn,
                          {
                            backgroundColor: mode.locked
                              ? "rgba(240,204,114,0.16)"
                              : `${mode.accent}1E`,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.arrowTxt,
                            { color: mode.locked ? "#F0CC72" : mode.accent },
                          ]}
                        >
                          {mode.locked ? "🔒" : "→"}
                        </Text>
                      </View>
                    </LinearGradient>
                  </ScalePressable>
                </Animated.View>
              );
            })}
          </View>
        </Animated.View>
      </ScrollView>

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
              👑 {t("KJØP PARTY PASS", "BUY PARTY PASS", "パーティーパスを購入")}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
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
    top: 160,
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
    top: height * 0.34,
    left: 0,
    right: 0,
    height: height * 0.47,
  },

  scroll: { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 130 },

  /* ---------- Toppbar ---------- */
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 36,
  },
  backBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { color: "#fff", fontSize: 25, fontWeight: "900", marginTop: -2 },
  gameChip: {
    height: 50,
    maxWidth: width * 0.66,
    paddingLeft: 14,
    paddingRight: 17,
    borderRadius: 28,
    backgroundColor: "rgba(8, 10, 24, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    flexDirection: "row",
    alignItems: "center",
  },
  gameChipIcon: { fontSize: 21, marginRight: 9 },
  gameChipName: { color: "#fff", fontSize: 14, fontWeight: "800", flexShrink: 1 },

  /* ---------- Header ---------- */
  header: {
    minHeight: 215,
    marginBottom: 24,
    position: "relative",
    justifyContent: "flex-end",
  },
  eyebrow: {
    color: "rgba(255,255,255,0.66)",
    fontSize: 12.5,
    fontWeight: "900",
    letterSpacing: 3,
    marginBottom: 16,
  },
  title: {
    color: "#fff",
    fontSize: 42,
    lineHeight: 48,
    fontWeight: "900",
    letterSpacing: -1.6,
  },
  subtitle: {
    marginTop: 14,
    maxWidth: width * 0.68,
    color: "rgba(255,255,255,0.66)",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "700",
  },
  headerIconWrap: { position: "absolute", right: -8, bottom: 14, zIndex: 1 },
  headerIcon: { fontSize: 110, opacity: 0.92 },

  /* ---------- Skala-hint ---------- */
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  sectionLabel: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 11.5,
    fontWeight: "900",
    letterSpacing: 2.6,
  },
  sectionScale: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    opacity: 0.7,
  },

  /* ---------- Mode-kort ---------- */
  modeList: { gap: 14 },
  modeCard: {
    height: 116,
    borderRadius: 24,
    overflow: "hidden",
  },
  modeGradient: {
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  iconFrame: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderWidth: 1,
  },
  modeIcon: { fontSize: 27 },
  modeText: { flex: 1 },
  modeNameRow: { flexDirection: "row", alignItems: "center" },
  modeName: {
    color: "#fff",
    fontSize: 17.5,
    fontWeight: "900",
    letterSpacing: -0.3,
    flexShrink: 1,
  },
  modeTagline: { fontSize: 12.5, fontWeight: "800", marginTop: 3 },
  modeDesc: {
    color: "rgba(255,255,255,0.58)",
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 15,
    marginTop: 2,
  },

  /* ---------- Intensitetsmåler ---------- */
  meterRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 3,
    marginTop: 7,
    height: 13,
  },
  meterBar: {
    width: 11,
    borderRadius: 2,
  },

  /* ---------- Badges ---------- */
  freeBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 999,
    borderWidth: 1,
  },
  freeBadgeText: { fontSize: 9, fontWeight: "900", letterSpacing: 1 },
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

  /* ---------- Pil ---------- */
  circleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  arrowTxt: { fontSize: 24, fontWeight: "900", marginTop: -2 },

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
  buyProText: {
    color: "#171006",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1.3,
  },
});