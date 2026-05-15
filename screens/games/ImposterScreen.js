import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const WORDS_BY_MODE = {
  chill: [
    { word: "iPhone", hint: "Apple" },
    { word: "Pizza", hint: "Cheese" },
    { word: "Netflix", hint: "Series" },
    { word: "Spotify", hint: "Music" },
  ],

  drunk: [
    { word: "Vodka", hint: "Russia" },
    { word: "Beer", hint: "Friday" },
    { word: "Shots", hint: "Fast" },
    { word: "Tequila", hint: "Lime" },
  ],

  nasj: [
    { word: "Tinder", hint: "Swipe" },
    { word: "Ghosting", hint: "Gone" },
    { word: "Situationship", hint: "Confusing" },
    { word: "One Night Stand", hint: "Regret" },
  ],

  blasted: [
    { word: "Casino", hint: "Money" },
    { word: "Dark Web", hint: "Hidden" },
    { word: "Dealer", hint: "Illegal" },
    { word: "BDSM", hint: "Kink" },
  ],
};

const MODE_STYLE = {
  chill: {
    color: "#25D98A",
    soft: "rgba(37,217,138,0.22)",
    bg: ["#101A16", "#07100D", "#050711"],
    label: "Chill",
    emoji: "😊",
  },

  drunk: {
    color: "#4F7BFF",
    soft: "rgba(79,123,255,0.22)",
    bg: ["#10162A", "#080B19", "#050711"],
    label: "Drunk",
    emoji: "🍻",
  },

  nasj: {
    color: "#FB923C",
    soft: "rgba(251,146,60,0.22)",
    bg: ["#24160D", "#100A08", "#050711"],
    label: "Nasj",
    emoji: "🔥",
  },

  blasted: {
    color: "#F87171",
    soft: "rgba(248,113,113,0.22)",
    bg: ["#241012", "#100709", "#050711"],
    label: "Blasted",
    emoji: "💀",
  },
};

export default function ImposterScreen({ navigation, route }) {
  const playerName = route?.params?.playerName || "Player";
  const mode = route?.params?.mode || "chill";

  const style = MODE_STYLE[mode] || MODE_STYLE.chill;
  const words = WORDS_BY_MODE[mode] || WORDS_BY_MODE.chill;

  const [phase, setPhase] = useState("setup");
  const [players, setPlayers] = useState([playerName, "", ""]);
  const [roles, setRoles] = useState([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;
  const holdScale = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

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
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),

        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const startGame = () => {
    const list = players.filter((p) => p.trim().length > 0);

    if (list.length < 3) return;

    const picked = words[Math.floor(Math.random() * words.length)];
    const imposterIdx = Math.floor(Math.random() * list.length);

    const generated = list.map((name, i) =>
      i === imposterIdx
        ? {
            name,
            type: "imposter",
            hint: picked.hint,
          }
        : {
            name,
            type: "player",
            word: picked.word,
          }
    );

    setRoles(generated);
    setIndex(0);
    setRevealed(false);
    setPhase("reveal");
  };

  const next = () => {
    setRevealed(false);

    if (index + 1 >= roles.length) {
      setPhase("done");
    } else {
      setIndex(index + 1);
    }
  };

  const restart = () => {
    setPhase("setup");
    setPlayers([playerName, "", ""]);
    setRoles([]);
    setIndex(0);
    setRevealed(false);
  };

  const floatY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  const validPlayers = players.filter((p) => p.trim().length > 0).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={style.bg}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View
        style={[
          styles.colorBlob,
          {
            backgroundColor: style.soft,
            shadowColor: style.color,
          },
        ]}
      />

      <LinearGradient
        colors={["rgba(5,7,17,0)", "#050711"]}
        style={styles.darkFade}
      />

      <Animated.View
        style={[
          styles.topBar,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.modePill}>
          <Text style={styles.modeEmoji}>{style.emoji}</Text>

          <Text
            style={[
              styles.modeLabel,
              {
                color: style.color,
              },
            ]}
          >
            {style.label}
          </Text>
        </View>

        <View style={{ width: 52 }} />
      </Animated.View>

      {phase === "setup" && (
        <Animated.View
          style={[
            styles.phase,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll}
          >
            <View style={styles.hero}>
              <Text style={styles.eyebrow}>IMPOSTER MODE</Text>

              <Text style={styles.heroTitle}>
                Who is{"\n"}lying?
              </Text>

              <Text style={styles.heroSub}>
                Everyone gets the same word except one player.
              </Text>

              <Animated.View
                style={[
                  styles.heroEmojiWrap,
                  {
                    transform: [
                      { translateY: floatY },
                      { rotate: "-8deg" },
                    ],
                  },
                ]}
              >
                <Text style={styles.heroEmoji}>🎭</Text>
              </Animated.View>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>How it works</Text>

              <View style={styles.ruleRow}>
                <Text style={styles.ruleEmoji}>👀</Text>

                <Text style={styles.ruleText}>
                  Everyone gets a word except the imposter.
                </Text>
              </View>

              <View style={styles.ruleRow}>
                <Text style={styles.ruleEmoji}>🎭</Text>

                <Text style={styles.ruleText}>
                  The imposter only gets a hint.
                </Text>
              </View>

              <View style={styles.ruleRow}>
                <Text style={styles.ruleEmoji}>🍻</Text>

                <Text style={styles.ruleText}>
                  Vote for who you think is lying.
                </Text>
              </View>
            </View>

            <Text style={styles.sectionLabel}>PLAYERS</Text>

            {players.map((p, i) => (
              <View key={i} style={styles.inputRow}>
                <View
                  style={[
                    styles.inputIcon,
                    {
                      backgroundColor: `${style.color}22`,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.inputIconText,
                      {
                        color: style.color,
                      },
                    ]}
                  >
                    {i + 1}
                  </Text>
                </View>

                <TextInput
                  value={p}
                  placeholder={`Player ${i + 1}`}
                  placeholderTextColor="rgba(255,255,255,0.26)"
                  onChangeText={(text) => {
                    const copy = [...players];
                    copy[i] = text;
                    setPlayers(copy);
                  }}
                  style={styles.input}
                />

                {i >= 3 && (
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() =>
                      setPlayers(players.filter((_, idx) => idx !== i))
                    }
                  >
                    <Text style={styles.removeBtnText}>×</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}

            {players.length < 12 && (
              <TouchableOpacity
                activeOpacity={0.86}
                style={styles.addBtn}
                onPress={() => setPlayers([...players, ""])}
              >
                <Text
                  style={[
                    styles.addBtnText,
                    {
                      color: style.color,
                    },
                  ]}
                >
                  + Add player
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              activeOpacity={0.9}
              disabled={validPlayers < 3}
              style={[
                styles.startBtn,
                validPlayers < 3 && styles.disabledBtn,
              ]}
              onPress={startGame}
            >
              <LinearGradient
                colors={[style.color, "#B92BFF"]}
                style={styles.startGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.startBtnText}>
                  START GAME →
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      )}

      {phase === "reveal" && (
        <View style={styles.revealContent}>
          <Text style={styles.revealSub}>Give phone to</Text>

          <Text style={styles.revealName}>
            {roles[index]?.name}
          </Text>

          <Pressable
            onPressIn={() => {
              setRevealed(true);

              Animated.spring(holdScale, {
                toValue: 0.97,
                useNativeDriver: true,
              }).start();
            }}
            onPressOut={() => {
              Animated.spring(holdScale, {
                toValue: 1,
                useNativeDriver: true,
              }).start();
            }}
          >
            <Animated.View
              style={[
                styles.revealCard,
                {
                  transform: [{ scale: holdScale }],
                },
              ]}
            >
              {!revealed && (
                <View style={styles.holdContent}>
                  <Text style={styles.holdEmoji}>👆</Text>

                  <Text style={styles.holdTitle}>
                    Hold to reveal
                  </Text>

                  <Text style={styles.holdSub}>
                    Don’t show anyone else
                  </Text>
                </View>
              )}

              {revealed && roles[index]?.type === "player" && (
                <View style={styles.cardContent}>
                  <View
                    style={[
                      styles.cardBadge,
                      {
                        backgroundColor: `${style.color}22`,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.cardBadgeText,
                        {
                          color: style.color,
                        },
                      ]}
                    >
                      YOUR WORD
                    </Text>
                  </View>

                  <Text style={styles.cardWord}>
                    {roles[index]?.word}
                  </Text>

                  <Text style={styles.cardHint}>
                    You are not the imposter
                  </Text>
                </View>
              )}

              {revealed && roles[index]?.type === "imposter" && (
                <View style={styles.cardContent}>
                  <View style={styles.imposterBadge}>
                    <Text style={styles.imposterBadgeText}>
                      YOU ARE THE IMPOSTER
                    </Text>
                  </View>

                  <Text style={styles.imposterWord}>???</Text>

                  <Text style={styles.cardHint}>
                    Hint: {roles[index]?.hint}
                  </Text>
                </View>
              )}
            </Animated.View>
          </Pressable>

          {revealed && (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.nextBtn}
              onPress={next}
            >
              <LinearGradient
                colors={[style.color, "#B92BFF"]}
                style={styles.nextGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.nextBtnText}>
                  {index + 1 >= roles.length
                    ? "Everyone ready →"
                    : "Next player →"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      )}

      {phase === "done" && (
        <View style={styles.doneContent}>
          <Text style={styles.doneEmoji}>🎭</Text>

          <Text style={styles.doneTitle}>
            Everyone ready!
          </Text>

          <Text style={styles.doneSub}>
            Discuss, give clues and find the imposter.
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.restartBtn}
            onPress={restart}
          >
            <LinearGradient
              colors={[style.color, "#B92BFF"]}
              style={styles.restartGradient}
            >
              <Text style={styles.restartBtnText}>
                Play Again 🔄
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => navigation.popToTop()}
          >
            <Text style={styles.homeBtnText}>
              ← Back Home
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050711",
  },

  colorBlob: {
    position: "absolute",
    top: -150,
    right: -180,
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width,
    shadowOpacity: 1,
    shadowRadius: 100,
    shadowOffset: { width: 0, height: 0 },
  },

  darkFade: {
    position: "absolute",
    top: height * 0.35,
    left: 0,
    right: 0,
    height: height * 0.45,
  },

  topBar: {
    height: 52,
    marginTop: 56,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 20,
  },

  backBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
  },

  modePill: {
    height: 52,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: "rgba(8,11,25,0.75)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    flexDirection: "row",
    alignItems: "center",
  },

  modeEmoji: {
    fontSize: 18,
    marginRight: 8,
  },

  modeLabel: {
    fontSize: 14,
    fontWeight: "900",
  },

  phase: {
    flex: 1,
  },

  scroll: {
    paddingTop: 55,
    paddingHorizontal: 22,
    paddingBottom: 40,
  },

  hero: {
    minHeight: 220,
    justifyContent: "flex-end",
    marginBottom: 28,
    position: "relative",
  },

  eyebrow: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 3,
    marginBottom: 16,
  },

  heroTitle: {
    color: "#fff",
    fontSize: 46,
    lineHeight: 50,
    fontWeight: "900",
    letterSpacing: -1.8,
  },

  heroSub: {
    marginTop: 16,
    maxWidth: width * 0.7,
    color: "rgba(255,255,255,0.58)",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
  },

  heroEmojiWrap: {
    position: "absolute",
    right: -8,
    bottom: 8,
  },

  heroEmoji: {
    fontSize: 110,
    opacity: 0.92,
  },

  infoCard: {
    backgroundColor: "rgba(8,11,25,0.72)",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    padding: 18,
    marginBottom: 28,
  },

  infoTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 14,
  },

  ruleRow: {
    flexDirection: "row",
    marginBottom: 10,
  },

  ruleEmoji: {
    fontSize: 18,
    marginRight: 10,
  },

  ruleText: {
    flex: 1,
    color: "rgba(255,255,255,0.56)",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },

  sectionLabel: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 4,
    marginBottom: 16,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  inputIcon: {
    width: 50,
    height: 50,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  inputIconText: {
    fontSize: 15,
    fontWeight: "900",
  },

  input: {
    flex: 1,
    height: 56,
    backgroundColor: "rgba(8,11,25,0.72)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    paddingHorizontal: 16,
  },

  removeBtn: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  removeBtnText: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 18,
    fontWeight: "900",
  },

  addBtn: {
    height: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(8,11,25,0.5)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  addBtnText: {
    fontSize: 15,
    fontWeight: "900",
  },

  startBtn: {
    height: 58,
    borderRadius: 20,
    overflow: "hidden",
  },

  startGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  startBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  disabledBtn: {
    opacity: 0.45,
  },

  revealContent: {
    flex: 1,
    paddingHorizontal: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  revealSub: {
    color: "rgba(255,255,255,0.48)",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
  },

  revealName: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 28,
  },

  revealCard: {
    width: width - 44,
    minHeight: 230,
    borderRadius: 30,
    backgroundColor: "rgba(8,11,25,0.8)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  holdContent: {
    alignItems: "center",
  },

  holdEmoji: {
    fontSize: 42,
    marginBottom: 14,
  },

  holdTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 8,
  },

  holdSub: {
    color: "rgba(255,255,255,0.42)",
    fontSize: 13,
    fontWeight: "700",
  },

  cardContent: {
    alignItems: "center",
  },

  cardBadge: {
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 18,
  },

  cardBadgeText: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  cardWord: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "900",
    marginBottom: 10,
    textAlign: "center",
  },

  cardHint: {
    color: "rgba(255,255,255,0.52)",
    fontSize: 15,
    fontWeight: "700",
  },

  imposterBadge: {
    backgroundColor: "rgba(248,113,113,0.18)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 18,
  },

  imposterBadgeText: {
    color: "#F87171",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  imposterWord: {
    color: "#F87171",
    fontSize: 48,
    fontWeight: "900",
    marginBottom: 10,
  },

  nextBtn: {
    width: width - 44,
    height: 58,
    borderRadius: 20,
    overflow: "hidden",
  },

  nextGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  nextBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  doneContent: {
    flex: 1,
    paddingHorizontal: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  doneEmoji: {
    fontSize: 76,
    marginBottom: 18,
  },

  doneTitle: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "900",
    marginBottom: 12,
  },

  doneSub: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 30,
  },

  restartBtn: {
    width: "100%",
    height: 58,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 14,
  },

  restartGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  restartBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  homeBtn: {
    paddingVertical: 12,
  },

  homeBtnText: {
    color: "rgba(255,255,255,0.42)",
    fontSize: 14,
    fontWeight: "800",
  },
});