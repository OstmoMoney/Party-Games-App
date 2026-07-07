import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "../i18n";
import { setSessionPlayers } from "../session";
import {
  MidnightBackground,
  GlassCard,
  ACCENT_GRADIENT,
  COLORS,
  FONT,
} from "../components/MidnightUI";

const MAX_FRIENDS = 11;

/* ------------------------------------------------------------------ */
/*  Kveldens crew — vises hver gang appen åpnes.                      */
/*  Navnene følger med inn i spillene (Imposter, Flasketuten,         */
/*  drikkekort i Snusleken). Nullstilles når appen startes på nytt.   */
/* ------------------------------------------------------------------ */
export default function PlayersScreen({ navigation, route }) {
  const playerName = route?.params?.playerName || "Player";
  const insets = useSafeAreaInsets();

  const [friends, setFriends] = useState([""]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(28)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const goHome = (withFriends) => {
    const names = withFriends
      ? [playerName, ...friends.map((f) => f.trim()).filter(Boolean)]
      : [playerName];
    setSessionPlayers(names);
    navigation.replace("Home", { playerName });
  };

  const friendCount = friends.filter((f) => f.trim().length > 0).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <MidnightBackground variant="intro" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Animated.View
          style={[
            styles.content,
            { paddingTop: insets.top },
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* ---------- Hero ---------- */}
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>
              {t("KVELDENS CREW", "TONIGHT'S CREW", "今夜のメンバー")}
            </Text>
            <Text style={styles.title}>
              {t("Hvem spiller du med i dag?", "Who are you playing with today?", "今日は誰と遊ぶ？")}
            </Text>
            <Text style={styles.subtitle}>
              {t(
                "Navnene dukker opp i spillene — hvem tar slurken, hvem er imposteren.",
                "The names show up in the games — who takes the sip, who's the imposter.",
                "名前はゲームに登場します。"
              )}
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
          >
            <GlassCard radius={28} contentStyle={styles.cardContent}>
              {/* Deg selv — alltid med */}
              <View style={styles.selfRow}>
                <LinearGradient
                  colors={ACCENT_GRADIENT}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.selfAvatar}
                >
                  <Text style={styles.selfAvatarText}>
                    {playerName.slice(0, 1).toUpperCase()}
                  </Text>
                </LinearGradient>
                <Text style={styles.selfName} numberOfLines={1}>
                  {playerName}
                </Text>
                <View style={styles.selfBadge}>
                  <Text style={styles.selfBadgeText}>{t("DEG", "YOU", "あなた")}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {friends.map((f, i) => (
                <View key={i} style={styles.inputRow}>
                  <View style={styles.inputNum}>
                    <Text style={styles.inputNumText}>{i + 2}</Text>
                  </View>
                  <TextInput
                    value={f}
                    placeholder={t(`Spiller ${i + 2}`, `Player ${i + 2}`, `プレイヤー ${i + 2}`)}
                    placeholderTextColor="rgba(255,255,255,0.28)"
                    onChangeText={(text) => {
                      const copy = [...friends];
                      copy[i] = text;
                      setFriends(copy);
                    }}
                    style={styles.input}
                    autoCapitalize="words"
                    autoCorrect={false}
                    accessibilityLabel={t(
                      `Navn på spiller ${i + 2}`,
                      `Name of player ${i + 2}`,
                      `プレイヤー ${i + 2} の名前`
                    )}
                  />
                  {friends.length > 1 && (
                    <TouchableOpacity
                      onPress={() => setFriends(friends.filter((_, idx) => idx !== i))}
                      style={styles.removeBtn}
                      accessibilityRole="button"
                      accessibilityLabel={t("Fjern spiller", "Remove player", "削除")}
                    >
                      <Text style={styles.removeBtnText}>✕</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              {friends.length < MAX_FRIENDS && (
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => setFriends([...friends, ""])}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  accessibilityLabel={t("Legg til spiller", "Add player", "プレイヤー追加")}
                >
                  <Text style={styles.addBtnText}>
                    {t("+ Legg til spiller", "+ Add player", "+ プレイヤー追加")}
                  </Text>
                </TouchableOpacity>
              )}
            </GlassCard>
          </ScrollView>

          {/* ---------- Bunn ---------- */}
          <View style={{ paddingBottom: 16 + insets.bottom }}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.startBtn}
              onPress={() => goHome(true)}
              accessibilityRole="button"
              accessibilityLabel={t("Start kvelden", "Start the night", "今夜を始める")}
            >
              <LinearGradient
                colors={ACCENT_GRADIENT}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.startGradient}
              >
                <Text style={styles.startText}>
                  {friendCount > 0
                    ? `${t("START KVELDEN", "START THE NIGHT", "スタート")} → · ${friendCount + 1}`
                    : t("START KVELDEN", "START THE NIGHT", "スタート") + " →"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.skipBtn}
              onPress={() => goHome(false)}
              accessibilityRole="button"
              accessibilityLabel={t("Hopp over", "Skip", "スキップ")}
            >
              <Text style={styles.skipText}>
                {t("Hopp over — jeg legger til senere", "Skip — I'll add them later", "スキップ")}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { flex: 1, paddingHorizontal: 24 },

  /* ---------- Hero ---------- */
  hero: { marginTop: 34, marginBottom: 20 },
  eyebrow: {
    fontFamily: FONT.label,
    fontSize: 11,
    letterSpacing: 3,
    color: COLORS.text50,
  },
  title: {
    marginTop: 10,
    fontFamily: FONT.extra,
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: -1,
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 10,
    fontFamily: FONT.regular,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.text60,
  },

  scroll: { paddingBottom: 16 },

  /* ---------- Kort ---------- */
  cardContent: { paddingVertical: 20, paddingHorizontal: 20 },

  selfRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  selfAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  selfAvatarText: { fontFamily: FONT.extra, fontSize: 17, color: COLORS.text },
  selfName: { flex: 1, fontFamily: FONT.bold, fontSize: 16, color: COLORS.text },
  selfBadge: {
    borderWidth: 1,
    borderColor: "rgba(232,121,185,0.5)",
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  selfBadgeText: {
    fontFamily: FONT.label,
    fontSize: 9,
    letterSpacing: 1.5,
    color: COLORS.softPink,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: 16,
  },

  inputRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  inputNum: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  inputNumText: { fontFamily: FONT.bold, fontSize: 14, color: COLORS.text45 },
  input: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    color: COLORS.text,
    fontFamily: FONT.medium,
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  removeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  removeBtnText: { color: COLORS.text45, fontSize: 13, fontFamily: FONT.bold },

  addBtn: {
    marginTop: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    paddingVertical: 14,
  },
  addBtnText: { fontFamily: FONT.bold, fontSize: 14, color: COLORS.softPink },

  /* ---------- Bunn ---------- */
  startBtn: { borderRadius: 16, overflow: "hidden" },
  startGradient: { paddingVertical: 17, alignItems: "center", justifyContent: "center" },
  startText: {
    fontFamily: FONT.bold,
    fontSize: 15,
    letterSpacing: 2,
    color: COLORS.text,
  },
  skipBtn: { alignItems: "center", paddingVertical: 13 },
  skipText: { fontFamily: FONT.semi, fontSize: 14, color: COLORS.text45 },
});
