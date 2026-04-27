import React, { useRef, useEffect, useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Dimensions, Animated,
  KeyboardAvoidingView, Platform, StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

function Bubble({ size, left, delay, duration, color }) {
  const anim = useRef(new Animated.Value(height + size)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: -size - 100, duration, useNativeDriver: true }),
        Animated.timing(anim, { toValue: height + size, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return (
    <Animated.View pointerEvents="none" style={{
      position: "absolute", left, width: size, height: size,
      borderRadius: size / 2, backgroundColor: color || "#7C3AED",
      opacity: 0.12, transform: [{ translateY: anim }],
    }} />
  );
}

export default function IntroScreen({ navigation }) {
  const [name, setName] = useState("");
  const [focused, setFocused] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, delay: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, delay: 200, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleStart = () => {
    if (name.trim().length < 2) return;
    navigation.replace("Home", { playerName: name.trim() });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#0B0B14", "#12121F"]} style={StyleSheet.absoluteFill} />
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <Bubble size={80} left={-20} delay={0} duration={20000} color="#7C3AED" />
      <Bubble size={45} left={width - 60} delay={3000} duration={17000} color="#FF2C66" />
      <Bubble size={60} left={width / 2 - 10} delay={6000} duration={23000} color="#7C3AED" />
      <Bubble size={30} left={width - 120} delay={1500} duration={19000} color="#FF2C66" />
      <Bubble size={50} left={40} delay={9000} duration={21000} color="#7C3AED" />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

          <View style={styles.logoArea}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>🎉</Text>
            </View>
            <Text style={styles.logoTop}>PARTY</Text>
            <Text style={styles.logoBottom}>GAMES</Text>
            <View style={styles.taglineRow}>
              <View style={styles.taglineLine} />
              <Text style={styles.tagline}>Turn the night loose</Text>
              <View style={styles.taglineLine} />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardStep}>STEG 1 AV 2</Text>
            <Text style={styles.cardTitle}>Hva skal vi{"\n"}kalle deg?</Text>
            <Text style={styles.cardSub}>Bare brukt for å tilpasse opplevelsen</Text>

            <View style={[styles.inputWrapper, focused && styles.inputFocused]}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                style={styles.input}
                placeholder="Kallenavnet ditt..."
                placeholderTextColor="rgba(255,255,255,0.25)"
                value={name}
                onChangeText={setName}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                maxLength={20}
                autoCapitalize="words"
                returnKeyType="go"
                onSubmitEditing={handleStart}
              />
            </View>

            <TouchableOpacity
              onPress={handleStart}
              activeOpacity={0.85}
              style={[styles.btn, name.trim().length < 2 && styles.btnDisabled]}
            >
              <LinearGradient
                colors={name.trim().length >= 2 ? ["#7C3AED", "#9F5FF1"] : ["#1e1e2e", "#1e1e2e"]}
                style={styles.btnGrad}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              >
                <Text style={[styles.btnText, name.trim().length < 2 && { color: "rgba(255,255,255,0.3)" }]}>
                  FORTSETT →
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

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
  container: { flex: 1 },
  content: { flex: 1, justifyContent: "center", paddingHorizontal: 24 },
  glowTop: {
    position: "absolute", top: -100, left: width / 2 - 130,
    width: 260, height: 260, borderRadius: 130,
    backgroundColor: "#7C3AED", opacity: 0.15,
  },
  glowBottom: {
    position: "absolute", bottom: -80, right: -60,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: "#FF2C66", opacity: 0.1,
  },
  logoArea: { alignItems: "center", marginBottom: 36 },
  iconCircle: {
    width: 72, height: 72, borderRadius: 24,
    backgroundColor: "rgba(124,58,237,0.2)",
    borderWidth: 1, borderColor: "rgba(124,58,237,0.4)",
    alignItems: "center", justifyContent: "center", marginBottom: 16,
  },
  iconEmoji: { fontSize: 34 },
  logoTop: { color: "#fff", fontSize: 44, fontWeight: "900", letterSpacing: 6, lineHeight: 46 },
  logoBottom: { color: "#7C3AED", fontSize: 44, fontWeight: "900", letterSpacing: 6, lineHeight: 46, marginBottom: 14 },
  taglineRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  taglineLine: { flex: 1, height: 0.5, backgroundColor: "rgba(255,255,255,0.15)" },
  tagline: { color: "rgba(255,255,255,0.35)", fontSize: 12, letterSpacing: 1 },
  card: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 24, padding: 22,
    borderWidth: 0.5, borderColor: "rgba(255,255,255,0.1)",
  },
  cardStep: { color: "#7C3AED", fontSize: 11, fontWeight: "700", letterSpacing: 3, marginBottom: 8 },
  cardTitle: { color: "#fff", fontSize: 22, fontWeight: "900", lineHeight: 28, marginBottom: 6 },
  cardSub: { color: "rgba(255,255,255,0.35)", fontSize: 13, marginBottom: 20 },
  inputWrapper: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14, borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 14, marginBottom: 14,
  },
  inputFocused: { borderColor: "#7C3AED" },
  inputIcon: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, color: "#fff", fontSize: 16, fontWeight: "600", paddingVertical: 15 },
  btn: { borderRadius: 14, overflow: "hidden" },
  btnDisabled: { opacity: 0.4 },
  btnGrad: { paddingVertical: 16, alignItems: "center" },
  btnText: { color: "#fff", fontSize: 15, fontWeight: "900", letterSpacing: 2 },
  dots: { flexDirection: "row", justifyContent: "center", gap: 6, marginTop: 28 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.15)" },
  dotActive: { width: 20, borderRadius: 3, backgroundColor: "#7C3AED" },
});