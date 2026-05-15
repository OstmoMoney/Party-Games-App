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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function IntroScreen({ navigation }) {
  const [name, setName] = useState("");
  const [focused, setFocused] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(34)).current;
  const beerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        delay: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        delay: 150,
        useNativeDriver: true,
      }),
    ]).start();

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

  const handleStart = () => {
    if (name.trim().length < 2) return;
    navigation.replace("Home", { playerName: name.trim() });
  };

  const beerY = beerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -7],
  });

  const isReady = name.trim().length >= 2;

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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboard}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.topRow}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>🎉</Text>
            </View>

            <View style={styles.smallPill}>
              <Text style={styles.smallPillText}>PARTY MODE</Text>
            </View>
          </View>

          <View style={styles.hero}>
            <Text style={styles.eyebrow}>WELCOME TO</Text>

            <Text style={styles.title}>
              Party{"\n"}Games
            </Text>

            <Text style={styles.subtitle}>
              Enter your nickname and get ready for the night.
            </Text>

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

          <View style={styles.card}>
            <Text style={styles.cardStep}>STEP 1 OF 2</Text>
            <Text style={styles.cardTitle}>What should we{"\n"}call you?</Text>
            <Text style={styles.cardSub}>Used only to personalize the game.</Text>

            <View style={[styles.inputWrapper, focused && styles.inputFocused]}>
              <Text style={styles.inputIcon}>👤</Text>

              <TextInput
                style={styles.input}
                placeholder="Your nickname..."
                placeholderTextColor="rgba(255,255,255,0.28)"
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
              activeOpacity={0.9}
              disabled={!isReady}
              style={[styles.button, !isReady && styles.buttonDisabled]}
            >
              <LinearGradient
                colors={isReady ? ["#FF6252", "#F13381", "#B92BFF"] : ["#1A1D2B", "#121522"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={[styles.buttonText, !isReady && styles.buttonTextDisabled]}>
                  CONTINUE →
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
  container: {
    flex: 1,
    backgroundColor: "#050711",
  },

  keyboard: {
    flex: 1,
  },

  redBlob: {
    position: "absolute",
    top: -140,
    left: -170,
    width: width * 1.2,
    height: width * 1.2,
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
    top: 210,
    right: -190,
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width,
    backgroundColor: "rgba(126, 45, 255, 0.35)",
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
    paddingHorizontal: 22,
    paddingTop: 56,
    paddingBottom: 34,
    justifyContent: "center",
  },

  topRow: {
    position: "absolute",
    top: 56,
    left: 22,
    right: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.09)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.13)",
    alignItems: "center",
    justifyContent: "center",
  },

  logoEmoji: {
    fontSize: 24,
  },

  smallPill: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 22,
    backgroundColor: "rgba(6, 8, 20, 0.82)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },

  smallPillText: {
    color: "rgba(255,255,255,0.76)",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  hero: {
    marginBottom: 34,
    minHeight: 250,
    justifyContent: "flex-end",
  },

  eyebrow: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 3.2,
    marginBottom: 18,
  },

  title: {
    color: "#fff",
    fontSize: 54,
    lineHeight: 58,
    fontWeight: "900",
    letterSpacing: -2,
  },

  subtitle: {
    marginTop: 18,
    maxWidth: width * 0.68,
    color: "rgba(255,255,255,0.6)",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "800",
  },

  beerWrap: {
    position: "absolute",
    right: -12,
    bottom: 8,
    zIndex: 1,
  },

  beerEmoji: {
    fontSize: 116,
    opacity: 0.9,
  },

  card: {
    borderRadius: 28,
    padding: 22,
    backgroundColor: "rgba(8, 11, 25, 0.74)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  cardStep: {
    color: "#E6B94A",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 3,
    marginBottom: 10,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 27,
    lineHeight: 33,
    fontWeight: "900",
    letterSpacing: -0.6,
    marginBottom: 8,
  },

  cardSub: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 20,
  },

  inputWrapper: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 14,
  },

  inputFocused: {
    borderColor: "rgba(185,43,255,0.75)",
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  inputIcon: {
    fontSize: 17,
    marginRight: 11,
  },

  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    paddingVertical: 14,
  },

  button: {
    height: 58,
    borderRadius: 20,
    overflow: "hidden",
  },

  buttonDisabled: {
    opacity: 0.55,
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
    color: "rgba(255,255,255,0.35)",
  },

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