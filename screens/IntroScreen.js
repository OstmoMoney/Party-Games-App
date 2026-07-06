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
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import { t } from "../i18n";
import {
  MidnightBackground,
  GlassCard,
  ACCENT_GRADIENT,
  COLORS,
  FONT,
} from "../components/MidnightUI";

const { width } = Dimensions.get("window");

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 20;

// Hero-størrelsen er spesifisert ved 390pt referansebredde
const HERO_FONT_SIZE = Math.round(76 * Math.min(width / 390, 1.1));

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

/* ------------------------------------------------------------------ */
/*  Gradient-hero "BUZZED" — hvit → myk rosa via SVG-tekst            */
/* ------------------------------------------------------------------ */
function HeroTitle() {
  return (
    <Svg
      width={width - 56}
      height={HERO_FONT_SIZE * 0.95 + 6}
      accessibilityRole="header"
      accessibilityLabel="Buzzed"
    >
      <Defs>
        <SvgLinearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="60%">
          <Stop offset="0.4" stopColor="#ffffff" />
          <Stop offset="1" stopColor={COLORS.softPink} />
        </SvgLinearGradient>
      </Defs>
      <SvgText
        fill="url(#heroGradient)"
        fontFamily={FONT.black}
        fontSize={HERO_FONT_SIZE}
        letterSpacing="-3"
        x="0"
        y={HERO_FONT_SIZE * 0.78}
      >
        BUZZED
      </SvgText>
    </Svg>
  );
}

export default function IntroScreen({ navigation }) {
  const [name, setName] = useState("");
  const [focused, setFocused] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const ctaAnim = useRef(new Animated.Value(0)).current;

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
  }, []);

  // CTA går fra 50 % opasitet til full når navnet er gyldig
  useEffect(() => {
    Animated.timing(ctaAnim, {
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

  const cardY = cardAnim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] });
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
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* ---------- Hero ---------- */}
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>
              {t("VELKOMMEN TIL", "WELCOME TO", "ようこそ")}
            </Text>

            <View style={styles.heroTitleWrap}>
              <HeroTitle />
            </View>

            <Text style={styles.subtitle}>
              {t(
                "Festen starter i sekundet du åpner appen.",
                "The party starts the second you open the app.",
                "アプリを開いた瞬間、パーティーが始まる。"
              )}
            </Text>
          </View>

          <View style={{ flex: 1 }} />

          {/* ---------- Navnekort ---------- */}
          <Animated.View style={{ opacity: cardAnim, transform: [{ translateY: cardY }] }}>
            <GlassCard radius={28} contentStyle={styles.cardContent}>
              <Text style={styles.cardStep}>
                {t("STEG 1 AV 2", "STEP 1 OF 2", "ステップ 1 / 2")}
              </Text>

              <Text style={styles.cardTitle}>
                {t("Hva skal vi kalle deg?", "What should we call you?", "なんて呼べばいい？")}
              </Text>

              <View style={[styles.inputWrapper, focused && styles.inputFocused]}>
                <TextInput
                  style={styles.input}
                  placeholder={t("Kallenavnet ditt…", "Your nickname…", "ニックネーム…")}
                  placeholderTextColor="rgba(255,255,255,0.4)"
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

              <Animated.View style={{ opacity: ctaOpacity }}>
                <ScalePressable
                  onPress={handleStart}
                  disabled={!isReady}
                  style={styles.button}
                  accessibilityLabel={t("Fortsett til spillet", "Continue to the game", "ゲームへ進む")}
                >
                  <LinearGradient
                    colors={ACCENT_GRADIENT}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>
                      {t("FORTSETT", "CONTINUE", "次へ")} →
                    </Text>
                  </LinearGradient>
                </ScalePressable>
              </Animated.View>
            </GlassCard>
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
  container: { flex: 1, backgroundColor: COLORS.bg },
  keyboard: { flex: 1 },

  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingBottom: 40,
  },

  /* ---------- Hero ---------- */
  hero: {
    marginTop: 134,
  },
  eyebrow: {
    fontFamily: FONT.label,
    fontSize: 12,
    letterSpacing: 4,
    color: COLORS.text55,
  },
  heroTitleWrap: {
    marginTop: 14,
  },
  subtitle: {
    marginTop: 16,
    maxWidth: 280,
    fontFamily: FONT.regular,
    fontSize: 17,
    lineHeight: 25,
    color: COLORS.text65,
  },

  /* ---------- Navnekort ---------- */
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
    color: COLORS.text,
    paddingVertical: Platform.OS === "web" ? 0 : 12,
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
    color: COLORS.text60,
    fontSize: 12,
    fontFamily: FONT.bold,
  },

  hint: {
    fontFamily: FONT.regular,
    fontSize: 11.5,
    color: COLORS.text40,
    marginTop: 6,
    marginBottom: 8,
    marginLeft: 4,
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
