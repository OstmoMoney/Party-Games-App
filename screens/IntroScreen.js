import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Pressable,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { t } from "../i18n";

const { width, height } = Dimensions.get("window");

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 20;

/* ------------------------------------------------------------------ */
/*  Pressable med skala-feedback — samme som på HomeScreen            */
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

export default function IntroScreen({ navigation }) {
  const [name, setName] = useState("");
  const [focused, setFocused] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const beerAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const isReady = name.trim().length >= MIN_NAME_LENGTH;

  useEffect(() => {
    // Hero glir inn først, deretter kortet — gir en rolig sekvens
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]),
      Animated.timing(cardAnim, { toValue: 1, duration: 450, useNativeDriver: true }),
    ]).start();

    // Svevende emoji
    Animated.loop(
      Animated.sequence([
        Animated.timing(beerAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(beerAnim, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // Knappen "lyser opp" når navnet er gyldig
  useEffect(() => {
    Animated.timing(glowAnim, {
      toValue: isReady ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isReady]);

  const handleStart = () => {
    if (!isReady) return;
    Keyboard.dismiss();
    navigation.replace("Home", { playerName: name.trim() });
  };

  const beerY = beerAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -7] });
  const cardY = cardAnim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Bakgrunn — identisk med HomeScreen for sømløs overgang */}
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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboard}
      >
        <Animated.View
          style={[
            styles.content,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* ---------- Toppbar ---------- */}
          <View style={styles.topRow}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>🎉</Text>
            </View>
            <View style={styles.smallPill}>
              <View style={styles.liveDot} />
              <Text style={styles.smallPillText}>PARTY MODE</Text>
            </View>
          </View>

          {/* ---------- Hero ---------- */}
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>
              {t("VELKOMMEN TIL", "WELCOME TO", "ようこそ")}
            </Text>

            <Text style={styles.title} accessibilityRole="header">
              Party{"\n"}Games
            </Text>

            <Text style={styles.subtitle}>
              {t(
                "Skriv inn kallenavnet ditt og gjør deg klar for kvelden.",
                "Enter your nickname and get ready for the night.",
                "ニックネームを入力して、今夜の準備をしよう。"
              )}
            </Text>

            <Animated.View
              pointerEvents="none"
              style={[
                styles.beerWrap,
                { transform: [{ translateY: beerY }, { rotate: "-8deg" }] },
              ]}
            >
              <Text style={styles.beerEmoji}>🍻</Text>
            </Animated.View>
          </View>

          {/* ---------- Navnekort ---------- */}
          <Animated.View
            style={[styles.card, { opacity: cardAnim, transform: [{ translateY: cardY }] }]}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardStep}>
                {t("STEG 1 AV 2", "STEP 1 OF 2", "ステップ 1 / 2")}
              </Text>
              <Text style={styles.charCount}>
                {name.length}/{MAX_NAME_LENGTH}
              </Text>
            </View>

            <Text style={styles.cardTitle}>
              {t("Hva skal vi\nkalle deg?", "What should we\ncall you?", "なんて呼べば\nいい？")}
            </Text>
            <Text style={styles.cardSub}>
              {t(
                "Brukes kun til å personalisere spillet.",
                "Used only to personalize the game.",
                "ゲームのパーソナライズにのみ使用されます。"
              )}
            </Text>

            <View style={[styles.inputWrapper, focused && styles.inputFocused]}>
              <Text style={styles.inputIcon}>👤</Text>

              <TextInput
                style={styles.input}
                placeholder={t("Kallenavnet ditt...", "Your nickname...", "ニックネーム...")}
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={name}
                onChangeText={setName}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                maxLength={MAX_NAME_LENGTH}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="go"
                onSubmitEditing={handleStart}
                accessibilityLabel={t("Skriv inn kallenavn", "Enter nickname", "ニックネームを入力")}
              />

              {name.length > 0 && (
                <TouchableOpacity
                  onPress={() => setName("")}
                  style={styles.clearButton}
                  accessibilityRole="button"
                  accessibilityLabel={t("Tøm feltet", "Clear field", "クリア")}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.clearButtonText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Hint vises kun når man har begynt å skrive men ikke er ferdig */}
            <Text style={[styles.hint, { opacity: name.length > 0 && !isReady ? 1 : 0 }]}>
              {t(
                `Minst ${MIN_NAME_LENGTH} tegn`,
                `At least ${MIN_NAME_LENGTH} characters`,
                `${MIN_NAME_LENGTH}文字以上`
              )}
            </Text>

            <ScalePressable
              onPress={handleStart}
              disabled={!isReady}
              style={styles.button}
              accessibilityLabel={t("Fortsett til spillet", "Continue to the game", "ゲームへ進む")}
            >
              {/* Aktiv gradient fader inn over den inaktive */}
              <LinearGradient
                colors={["#1A1D2B", "#121522"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonTextDisabled}>
                  {t("FORTSETT", "CONTINUE", "次へ")} →
                </Text>
              </LinearGradient>

              <Animated.View style={[StyleSheet.absoluteFill, { opacity: glowAnim }]}>
                <LinearGradient
                  colors={["#FF6252", "#F13381", "#B92BFF"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>
                    {t("FORTSETT", "CONTINUE", "次へ")} →
                  </Text>
                </LinearGradient>
              </Animated.View>
            </ScalePressable>
          </Animated.View>

          {/* ---------- Fremdriftsdots ---------- */}
          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050711" },
  keyboard: { flex: 1 },

  /* ---------- Bakgrunn ---------- */
  redBlob: {
    position: "absolute",
    top: -140,
    left: -170,
    width: width * 1.2,
    height: width * 1.2,
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
    top: 210,
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
    top: height * 0.42,
    left: 0,
    right: 0,
    height: height * 0.36,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 34,
    justifyContent: "center",
  },

  /* ---------- Toppbar ---------- */
  topRow: {
    position: "absolute",
    top: 56,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoEmoji: { fontSize: 23 },
  smallPill: {
    height: 38,
    paddingHorizontal: 14,
    borderRadius: 22,
    backgroundColor: "rgba(8, 10, 24, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2EE69A",
  },
  smallPillText: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  /* ---------- Hero ---------- */
  hero: {
    marginBottom: 30,
    minHeight: 240,
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
    fontSize: 52,
    lineHeight: 56,
    fontWeight: "900",
    letterSpacing: -2,
  },
  subtitle: {
    marginTop: 16,
    maxWidth: width * 0.66,
    color: "rgba(255,255,255,0.66)",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "700",
  },
  beerWrap: {
    position: "absolute",
    right: -12,
    bottom: 6,
    zIndex: 1,
  },
  beerEmoji: { fontSize: 112, opacity: 0.92 },

  /* ---------- Navnekort ---------- */
  card: {
    borderRadius: 28,
    padding: 22,
    backgroundColor: "rgba(9, 12, 26, 0.78)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardStep: {
    color: "#E6B94A",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 3,
  },
  charCount: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 11,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },
  cardTitle: {
    color: "#fff",
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "900",
    letterSpacing: -0.6,
    marginBottom: 8,
  },
  cardSub: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 20,
  },

  /* ---------- Input ---------- */
  inputWrapper: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.1)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  inputFocused: {
    borderColor: "rgba(185,43,255,0.8)",
    backgroundColor: "rgba(185,43,255,0.06)",
  },
  inputIcon: { fontSize: 17, marginRight: 11 },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    paddingVertical: 14,
  },
  clearButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  clearButtonText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "900",
  },

  hint: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 11.5,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 12,
    marginLeft: 4,
  },

  /* ---------- Knapp ---------- */
  button: {
    height: 58,
    borderRadius: 20,
    overflow: "hidden",
  },
  buttonGradient: {
    flex: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  buttonTextDisabled: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1.4,
  },

  /* ---------- Dots ---------- */
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 7,
    marginTop: 26,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  dotActive: {
    width: 24,
    backgroundColor: "#B92BFF",
  },
});