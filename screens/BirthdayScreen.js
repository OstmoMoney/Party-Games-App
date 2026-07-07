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
  Pressable,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "../i18n";
import {
  MidnightBackground,
  GlassCard,
  ACCENT_GRADIENT,
  COLORS,
  FONT,
} from "../components/MidnightUI";

/* ------------------------------------------------------------------ */
/*  Pressable med skala-feedback — samme som på Intro                 */
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
      onPressIn={() => !disabled && animateTo(0.97)}
      onPressOut={() => animateTo(1)}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!disabled }}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}

// Formaterer tallene fortløpende til DD.MM.ÅÅÅÅ
const formatBirthdate = (raw) => {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)];
  return parts.filter(Boolean).join(".");
};

// Gyldig, komplett dato som ikke ligger i fremtiden
const parseBirthdate = (value) => {
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return null;
  const [, dd, mm, yyyy] = match;
  const day = Number(dd);
  const month = Number(mm);
  const year = Number(yyyy);
  const date = new Date(year, month - 1, day);
  const valid =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    year >= 1900 &&
    date <= new Date();
  return valid ? date : null;
};

const calcAge = (birthdate) => {
  const now = new Date();
  let age = now.getFullYear() - birthdate.getFullYear();
  const beforeBirthday =
    now.getMonth() < birthdate.getMonth() ||
    (now.getMonth() === birthdate.getMonth() && now.getDate() < birthdate.getDate());
  if (beforeBirthday) age -= 1;
  return age;
};

export default function BirthdayScreen({ navigation, route }) {
  const playerName = route?.params?.playerName || "Player";
  const insets = useSafeAreaInsets();

  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const ctaAnim = useRef(new Animated.Value(0)).current;

  const birthdate = parseBirthdate(value);
  const isReady = !!birthdate;
  const age = birthdate ? calcAge(birthdate) : null;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  useEffect(() => {
    Animated.timing(ctaAnim, {
      toValue: isReady ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isReady]);

  const handleContinue = () => {
    if (!isReady) return;
    Keyboard.dismiss();
    AsyncStorage.setItem("playerBirthdate", value);
    navigation.replace("Players", { playerName });
  };

  const ctaOpacity = ctaAnim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <MidnightBackground variant="intro" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboard}
      >
        <Animated.View
          style={[
            styles.content,
            { paddingTop: insets.top, paddingBottom: 24 + insets.bottom },
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* ---------- Hero ---------- */}
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>
              {t("NESTEN KLAR", "ALMOST THERE", "もうすぐ完了")}
            </Text>

            <Text style={styles.heroTitle}>
              {t("Hei", "Hey", "やあ")} {playerName} 👋
            </Text>

            <Text style={styles.subtitle}>
              {t(
                "Ett spørsmål til, så er festen i gang.",
                "One more question, then the party starts.",
                "あと一つの質問でパーティー開始。"
              )}
            </Text>
          </View>

          <View style={{ flex: 1 }} />

          {/* ---------- Fødselsdatokort ---------- */}
          <GlassCard radius={28} contentStyle={styles.cardContent}>
            <Text style={styles.cardStep}>
              {t("STEG 2 AV 2", "STEP 2 OF 2", "ステップ 2 / 2")}
            </Text>

            <Text style={styles.cardTitle}>
              {t("Når er du født?", "When were you born?", "誕生日はいつ？")}
            </Text>

            <View style={[styles.inputWrapper, focused && styles.inputFocused]}>
              <TextInput
                style={styles.input}
                placeholder={t("DD.MM.ÅÅÅÅ", "DD.MM.YYYY", "DD.MM.YYYY")}
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={value}
                onChangeText={(text) => setValue(formatBirthdate(text))}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                keyboardType="number-pad"
                maxLength={10}
                returnKeyType="go"
                onSubmitEditing={handleContinue}
                accessibilityLabel={t(
                  "Skriv inn fødselsdato",
                  "Enter your birthdate",
                  "誕生日を入力"
                )}
              />
            </View>

            {/* Alder som bekreftelse — eller hint hvis datoen ikke er gyldig */}
            <Text style={[styles.hint, isReady && styles.hintValid]}>
              {isReady
                ? t(`Du er ${age} år 🎂`, `You're ${age} years old 🎂`, `${age}歳 🎂`)
                : value.length === 10
                ? t("Hmm, den datoen finnes ikke", "Hmm, that date doesn't exist", "その日付は存在しません")
                : t("Vi spør bare én gang", "We only ask once", "一度だけ聞きます")}
            </Text>

            <Animated.View style={{ opacity: ctaOpacity }}>
              <ScalePressable
                onPress={handleContinue}
                disabled={!isReady}
                style={styles.button}
                accessibilityLabel={t("Fullfør oppsettet", "Finish setup", "セットアップ完了")}
              >
                <LinearGradient
                  colors={ACCENT_GRADIENT}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>
                    {t("FULLFØR", "FINISH", "完了")} →
                  </Text>
                </LinearGradient>
              </ScalePressable>
            </Animated.View>
          </GlassCard>

          {/* ---------- Fremdriftsdots ---------- */}
          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.dotActive]} />
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  keyboard: { flex: 1 },

  content: {
    flex: 1,
    paddingHorizontal: 28,
  },

  /* ---------- Hero ---------- */
  hero: {
    marginTop: 88,
  },
  eyebrow: {
    fontFamily: FONT.label,
    fontSize: 12,
    letterSpacing: 4,
    color: COLORS.text55,
  },
  heroTitle: {
    marginTop: 14,
    fontFamily: FONT.black,
    fontSize: 44,
    letterSpacing: -1.5,
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 14,
    maxWidth: 280,
    fontFamily: FONT.regular,
    fontSize: 17,
    lineHeight: 25,
    color: COLORS.text65,
  },

  /* ---------- Kort ---------- */
  cardContent: {
    paddingVertical: 26,
    paddingHorizontal: 24,
  },
  cardStep: {
    fontFamily: FONT.label,
    fontSize: 12,
    letterSpacing: 3,
    color: COLORS.softPink,
  },
  cardTitle: {
    marginTop: 10,
    fontFamily: FONT.extra,
    fontSize: 26,
    lineHeight: 30,
    letterSpacing: -0.5,
    color: COLORS.text,
  },

  /* ---------- Input ---------- */
  inputWrapper: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: Platform.OS === "web" ? 16 : 4,
  },
  inputFocused: {
    borderColor: "rgba(168,85,247,0.8)",
  },
  input: {
    flex: 1,
    fontFamily: FONT.medium,
    fontSize: 17,
    letterSpacing: 1,
    color: COLORS.text,
    paddingVertical: Platform.OS === "web" ? 0 : 12,
  },

  hint: {
    fontFamily: FONT.regular,
    fontSize: 11.5,
    color: COLORS.text40,
    marginTop: 6,
    marginBottom: 8,
    marginLeft: 4,
  },
  hintValid: {
    color: COLORS.green,
    fontFamily: FONT.semi,
  },

  /* ---------- Knapp ---------- */
  button: {
    borderRadius: 16,
    overflow: "hidden",
  },
  buttonGradient: {
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: FONT.bold,
    fontSize: 15,
    letterSpacing: 2,
    color: COLORS.text,
  },

  /* ---------- Dots ---------- */
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 22,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  dotActive: {
    width: 22,
    backgroundColor: COLORS.purple,
  },
});
