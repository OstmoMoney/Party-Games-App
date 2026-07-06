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
import {
  MidnightBackground,
  GlassCard,
  PRO_GRADIENT,
  COLORS,
  FONT,
} from "../components/MidnightUI";

const { width } = Dimensions.get("window");

const MODES = [
  {
    key: "chill",
    name: t("Chill", "Chill", "チル"),
    desc: t(
      "God stemning, ingen press. Perfekt for nye folk.",
      "Good vibes, no pressure. Perfect for new people.",
      "良い雰囲気、プレッシャーなし。新しい人にぴったり。"
    ),
    accent: "#34d399",
    locked: false,
  },
  {
    key: "date",
    name: t("Date", "Date", "デート"),
    desc: t(
      "Intimt og litt pikant. Bli kjent på ekte.",
      "Intimate and slightly spicy. Really get to know each other.",
      "親密で少しスパイシー。本当に知り合おう。"
    ),
    accent: "#e879b9",
    locked: false,
  },
  {
    key: "drunk",
    name: t("Drunk", "Drunk", "酔っ払い"),
    desc: t(
      "Drikkeutfordringer og nøtter. Vorsj-klassikeren.",
      "Drinking dares and challenges. The pre-party classic.",
      "飲み物の挑戦とダーレス。前夜祭の定番。"
    ),
    accent: "#608cff",
    locked: false,
  },
  {
    key: "nasj",
    name: t("Nasj", "Nasj", "ナシュ"),
    desc: t(
      "Skikkelig rått. Ikke for sarte sjeler.",
      "Properly raw. Not for the faint of heart.",
      "本格的に生々しい。心の弱い人向けではない。"
    ),
    accent: "#f97316",
    locked: false,
  },
  {
    key: "blasted",
    name: t("Blasted", "Blasted", "ブラステッド"),
    desc: t(
      "Ingen grenser. Absolutt galskap. Bare for de som tør.",
      "No limits. Absolute madness. Only for those who dare.",
      "制限なし。完全な狂気。勇気ある者だけに。"
    ),
    accent: "#ec4878",
    locked: false,
  },
];

const GAME_META = {
  RiskItGame: { icon: "🏃", name: t("Sjansen", "Risk It", "リスクイット") },
  GameTwo: { icon: "🍻", name: t("Jeg har aldri ...", "Never Have I Ever", "ネバー・ハブ・アイ・エバー") },
  GameFour: { icon: "📦", name: t("Snusleken", "ZYN Box", "ZYNボックス") },
  SpinTheBottle: { icon: "🍾", name: t("Flasketuten peker på", "Spin the Bottle", "スピン・ザ・ボトル") },
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
      onPressIn={() => animateTo(0.97)}
      onPressOut={() => animateTo(1)}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}

export default function ModeSelectScreen({ navigation, route }) {
  const playerName = route?.params?.playerName || "Player";
  const gameName = route?.params?.game || "RiskItGame";
  const game = GAME_META[gameName] || GAME_META.RiskItGame;

  const [selected, setSelected] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(26)).current;
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <MidnightBackground variant="mode" />

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
              {t("Hvor vilt blir det?", "How wild should it be?", "どれくらいワイルドに？")}
            </Text>
          </View>

          {/* ---------- Intensitetsskala: rolig → vilt ---------- */}
          <View style={styles.scaleRow}>
            <Text style={styles.scaleLabel}>{t("ROLIG", "CALM", "おだやか")}</Text>
            <LinearGradient
              colors={["#34d399", "#e879b9"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.scaleBar}
            />
            <Text style={styles.scaleLabel}>{t("VILT", "WILD", "ワイルド")}</Text>
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
                    accessibilityLabel={`${mode.name}. ${mode.desc}. ${
                      mode.locked
                        ? t("Krever Party Pass", "Requires Party Pass", "パーティーパスが必要")
                        : t("Gratis", "Free", "無料")
                    }`}
                  >
                    <GlassCard
                      radius={22}
                      fill="rgba(255,255,255,0.05)"
                      borderColor={isSelected ? mode.accent : "rgba(255,255,255,0.12)"}
                      contentStyle={styles.modeContent}
                    >
                      <View style={[styles.modeBar, { backgroundColor: mode.accent }]} />

                      <View style={styles.modeText}>
                        <View style={styles.modeNameRow}>
                          <Text style={styles.modeName} numberOfLines={1}>
                            {mode.name}
                          </Text>

                          {!mode.locked ? (
                            <View style={[styles.freeBadge, { borderColor: `${mode.accent}80` }]}>
                              <Text style={[styles.freeBadgeText, { color: mode.accent }]}>
                                FREE
                              </Text>
                            </View>
                          ) : (
                            <LinearGradient
                              colors={PRO_GRADIENT}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              style={styles.proBadge}
                            >
                              <Text style={styles.proBadgeText}>PRO</Text>
                            </LinearGradient>
                          )}
                        </View>

                        <Text style={styles.modeDesc} numberOfLines={2}>
                          {mode.desc}
                        </Text>
                      </View>

                      <Text style={styles.modeArrow}>{mode.locked ? "🔒" : "→"}</Text>
                    </GlassCard>
                  </ScalePressable>
                </Animated.View>
              );
            })}
          </View>
        </Animated.View>
      </ScrollView>

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
              👑 {t("KJØP PARTY PASS", "BUY PARTY PASS", "パーティーパスを購入")}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  scroll: { paddingTop: 56, paddingHorizontal: 24, paddingBottom: 118 },

  /* ---------- Toppbar ---------- */
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { color: COLORS.text, fontSize: 20, marginTop: -1 },
  gameChip: {
    maxWidth: width * 0.62,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  gameChipIcon: { fontSize: 15 },
  gameChipName: {
    fontFamily: FONT.bold,
    fontSize: 14,
    color: COLORS.text,
    flexShrink: 1,
  },

  /* ---------- Header ---------- */
  header: { marginTop: 36 },
  eyebrow: {
    fontFamily: FONT.label,
    fontSize: 11,
    letterSpacing: 3,
    color: COLORS.text50,
  },
  title: {
    marginTop: 10,
    fontFamily: FONT.extra,
    fontSize: 38,
    lineHeight: 40,
    letterSpacing: -1,
    color: COLORS.text,
  },

  /* ---------- Intensitetsskala ---------- */
  scaleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 24,
  },
  scaleLabel: {
    fontFamily: FONT.label,
    fontSize: 10,
    letterSpacing: 2,
    color: COLORS.text50,
  },
  scaleBar: {
    flex: 1,
    height: 3,
    borderRadius: 2,
  },

  /* ---------- Mode-kort ---------- */
  modeList: { gap: 12, marginTop: 18 },
  modeContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  modeBar: {
    width: 8,
    height: 52,
    borderRadius: 4,
  },
  modeText: { flex: 1 },
  modeNameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  modeName: {
    fontFamily: FONT.extra,
    fontSize: 19,
    color: COLORS.text,
    flexShrink: 1,
  },
  modeDesc: {
    marginTop: 4,
    fontFamily: FONT.regular,
    fontSize: 13,
    lineHeight: 17,
    color: COLORS.text55,
  },
  modeArrow: {
    fontSize: 16,
    color: COLORS.text,
    opacity: 0.5,
  },

  /* ---------- Badges ---------- */
  freeBadge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  freeBadgeText: {
    fontFamily: FONT.label,
    fontSize: 9,
    letterSpacing: 1.5,
  },
  proBadge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  proBadgeText: {
    fontFamily: FONT.label,
    fontSize: 9,
    letterSpacing: 1.5,
    color: COLORS.proText,
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
});
