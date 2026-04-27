import React, { useRef, useEffect, useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  Dimensions, Animated, StatusBar, TextInput,
  ScrollView, Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const WORDS_BY_MODE = {
  chill: [
    { word: "iPhone", hint: "Eple" },
    { word: "Pizza", hint: "Italia" },
    { word: "Netflix", hint: "Serie" },
    { word: "Fotball", hint: "VM" },
    { word: "Kaffe", hint: "Morgen" },
    { word: "Sushi", hint: "Japan" },
    { word: "Burger", hint: "Fast food" },
    { word: "Taco", hint: "Fredag" },
    { word: "Spotify", hint: "Musikk" },
    { word: "TikTok", hint: "Scroller" },
    { word: "Instagram", hint: "Bilder" },
    { word: "Snapchat", hint: "Streak" },
    { word: "YouTube", hint: "Video" },
    { word: "Sykkel", hint: "To hjul" },
    { word: "Katt", hint: "Mjau" },
    { word: "Hund", hint: "Bjeffer" },
    { word: "Sol", hint: "Varmt" },
    { word: "Strand", hint: "Sand" },
    { word: "Fly", hint: "Vinger" },
    { word: "Tog", hint: "Skinner" },
  ],
  drunk: [
    { word: "Øl", hint: "Pils" },
    { word: "Vin", hint: "Druer" },
    { word: "Vodka", hint: "Russland" },
    { word: "Tequila", hint: "Salt og sitron" },
    { word: "Whisky", hint: "Skottland" },
    { word: "Red Bull", hint: "Energi" },
    { word: "Snus", hint: "Under leppa" },
    { word: "Sigarett", hint: "Røyk" },
    { word: "Vape", hint: "Damp" },
    { word: "Shots", hint: "En slurk" },
    { word: "Nachspiel", hint: "Etter festen" },
    { word: "Vorsj", hint: "Før festen" },
    { word: "Fest", hint: "Party" },
    { word: "DJ", hint: "Musikk" },
    { word: "Dansegulv", hint: "Beina" },
    { word: "Taxi", hint: "Hjem" },
    { word: "Kebab", hint: "Nattmat" },
    { word: "Kø", hint: "Vente" },
    { word: "Stempel", hint: "Inn" },
    { word: "Bartender", hint: "Drink" },
  ],
  nasj: [
    { word: "Onlyfans", hint: "Abonnement" },
    { word: "Tinder", hint: "Sveip" },
    { word: "Hinge", hint: "Dating" },
    { word: "Grindr", hint: "App" },
    { word: "Stripklubb", hint: "Dans" },
    { word: "Threesome", hint: "Tre" },
    { word: "Sexting", hint: "Meldinger" },
    { word: "One night stand", hint: "En natt" },
    { word: "Fuckbuddy", hint: "Venn" },
    { word: "Ghosting", hint: "Forsvinner" },
    { word: "Netflix and chill", hint: "Film" },
    { word: "Booty call", hint: "Seint" },
    { word: "Situasjonship", hint: "Komplisert" },
    { word: "Open relationship", hint: "Åpent" },
    { word: "Eks", hint: "Før" },
    { word: "Crush", hint: "Hjertebank" },
    { word: "Date", hint: "Middag" },
    { word: "Kyss", hint: "Lepper" },
    { word: "Nakenbilder", hint: "Privat" },
    { word: "Afterglow", hint: "Etterpå" },
  ],
  blasted: [
    { word: "Kokain", hint: "Hvitt pulver" },
    { word: "MDMA", hint: "Pille" },
    { word: "Hasj", hint: "Røyk" },
    { word: "Speed", hint: "Amfetamin" },
    { word: "Ketamin", hint: "K-hole" },
    { word: "Strippeklubb", hint: "Dans" },
    { word: "Svart marked", hint: "Ulovlig" },
    { word: "Fengsel", hint: "Bak lås" },
    { word: "Politi", hint: "Blålys" },
    { word: "Utpressing", hint: "Trusler" },
    { word: "Hevnporno", hint: "Nett" },
    { word: "Doping", hint: "Sport" },
    { word: "Sexklubb", hint: "Privat" },
    { word: "Kriminell", hint: "Loven" },
    { word: "Dealer", hint: "Selger" },
    { word: "Underground", hint: "Hemmelig" },
    { word: "Swinger", hint: "Bytte" },
    { word: "Fetish", hint: "Spesielt" },
    { word: "Dark web", hint: "Skjult nett" },
    { word: "Ransom", hint: "Løsepenger" },
  ],
};

const MODE_STYLE = {
  chill:   { color: "#4ade80", bg: ["#080f0a", "#0a1a0e"], label: "Chill",   emoji: "😊" },
  drunk:   { color: "#60a5fa", bg: ["#080f1a", "#0a1830"], label: "Drunk",   emoji: "🍻" },
  nasj:    { color: "#fb923c", bg: ["#140a04", "#241208"], label: "Nasj",    emoji: "🔥" },
  blasted: { color: "#f87171", bg: ["#140606", "#240a0a"], label: "Blasted", emoji: "💀" },
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
  const slideAnim = useRef(new Animated.Value(30)).current;
  const holdScale = useRef(new Animated.Value(1)).current;
  const holdOpacity = useRef(new Animated.Value(1)).current;
  const cardAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const startGame = () => {
    const list = players.filter((p) => p.trim().length > 0);
    if (list.length < 3) return;

    const picked = words[Math.floor(Math.random() * words.length)];
    const imposterIdx = Math.floor(Math.random() * list.length);

    const generated = list.map((name, i) =>
      i === imposterIdx
        ? { name, type: "imposter", hint: picked.hint }
        : { name, type: "player", word: picked.word }
    );

    setRoles(generated);
    setIndex(0);
    setRevealed(false);
    setPhase("reveal");
  };

  const onHoldIn = () => {
    Animated.spring(holdScale, { toValue: 0.96, useNativeDriver: true }).start();
    setRevealed(true);
  };

  const onHoldOut = () => {
    Animated.spring(holdScale, { toValue: 1, useNativeDriver: true }).start();
  };

  const next = () => {
    Animated.timing(cardAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
      setRevealed(false);
      if (index + 1 >= roles.length) {
        setPhase("done");
      } else {
        setIndex((i) => i + 1);
      }
      Animated.timing(cardAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    });
  };

  const restart = () => {
    setPhase("setup");
    setPlayers([playerName, "", ""]);
    setRoles([]);
    setIndex(0);
    setRevealed(false);
    cardAnim.setValue(1);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={style.bg} style={StyleSheet.absoluteFill} />
      <View style={[styles.glowTop, { backgroundColor: style.color }]} />

      {/* Top bar — always visible */}
      <Animated.View style={[styles.topBar, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={[styles.modePill, { backgroundColor: style.color + "22", borderColor: style.color + "55" }]}>
          <Text style={styles.modeEmoji}>{style.emoji}</Text>
          <Text style={[styles.modeLabel, { color: style.color }]}>{style.label}</Text>
        </View>
        <View style={{ width: 40 }} />
      </Animated.View>

      {/* SETUP PHASE */}
      {phase === "setup" && (
        <Animated.View style={[styles.phase, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.setupScroll}>
            <Text style={styles.setupTitle}>🎭 Imposter</Text>
            <Text style={styles.setupDesc}>
              Send telefonen rundt. Én spiller er imposteren og kjenner ikke ordet — bare et hint. Alle gir hint, imposteren prøver å passe inn.
            </Text>

            <View style={styles.rulesRow}>
              <View style={styles.ruleChip}>
                <Text style={styles.ruleChipText}>✅ Imposter vinner → alle tar slurk</Text>
              </View>
              <View style={styles.ruleChip}>
                <Text style={styles.ruleChipText}>❌ Imposter tapes → 2 slurker</Text>
              </View>
            </View>

            <Text style={styles.sectionLabel}>SPILLERE</Text>

            {players.map((p, i) => (
              <View key={i} style={styles.inputRow}>
                <View style={[styles.inputIcon, { backgroundColor: style.color + "22" }]}>
                  <Text style={[styles.inputIconText, { color: style.color }]}>{i + 1}</Text>
                </View>
                <TextInput
                  value={p}
                  placeholder={`Spiller ${i + 1}`}
                  placeholderTextColor="rgba(255,255,255,0.25)"
                  onChangeText={(text) => {
                    const copy = [...players];
                    copy[i] = text;
                    setPlayers(copy);
                  }}
                  style={styles.input}
                  autoCapitalize="words"
                />
                {i >= 3 && (
                  <TouchableOpacity
                    onPress={() => setPlayers(players.filter((_, idx) => idx !== i))}
                    style={styles.removeBtn}
                  >
                    <Text style={styles.removeBtnText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}

            {players.length < 12 && (
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => setPlayers([...players, ""])}
              >
                <Text style={[styles.addBtnText, { color: style.color }]}>+ Legg til spiller</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.startBtn,
                { backgroundColor: style.color },
                players.filter((p) => p.trim().length > 0).length < 3 && styles.startBtnDisabled,
              ]}
              onPress={startGame}
              activeOpacity={0.85}
            >
              <Text style={styles.startBtnText}>START SPILLET →</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      )}

      {/* REVEAL PHASE */}
      {phase === "reveal" && (
        <View style={styles.phase}>
          <View style={styles.revealContent}>
            <Text style={styles.revealSub}>Gi telefonen til</Text>
            <Text style={styles.revealName}>{roles[index]?.name}</Text>
            <Text style={[styles.revealCounter, { color: style.color }]}>
              {index + 1} / {roles.length}
            </Text>

            <Pressable onPressIn={onHoldIn} onPressOut={onHoldOut}>
              <Animated.View
                style={[
                  styles.revealCard,
                  {
                    transform: [{ scale: holdScale }],
                    borderColor: revealed ? style.color + "55" : "rgba(255,255,255,0.1)",
                  },
                ]}
              >
                <Animated.View style={{ opacity: cardAnim }}>
                  {!revealed && (
                    <View style={styles.holdContent}>
                      <Text style={styles.holdIcon}>👆</Text>
                      <Text style={styles.holdText}>Hold inne for å se</Text>
                      <Text style={styles.holdSub}>Ikke vis til andre</Text>
                    </View>
                  )}

                  {revealed && roles[index]?.type === "player" && (
                    <View style={styles.cardContent}>
                      <View style={[styles.cardBadge, { backgroundColor: style.color + "22" }]}>
                        <Text style={[styles.cardBadgeText, { color: style.color }]}>DITT ORD</Text>
                      </View>
                      <Text style={styles.cardWord}>{roles[index]?.word}</Text>
                      <Text style={styles.cardHint}>Du er ikke imposteren 👍</Text>
                    </View>
                  )}

                  {revealed && roles[index]?.type === "imposter" && (
                    <View style={styles.cardContent}>
                      <View style={[styles.cardBadge, { backgroundColor: "rgba(248,113,113,0.2)" }]}>
                        <Text style={[styles.cardBadgeText, { color: "#f87171" }]}>DU ER IMPOSTEREN 💀</Text>
                      </View>
                      <Text style={[styles.cardWord, { color: "#f87171" }]}>???</Text>
                      <Text style={styles.cardHint}>Hint: {roles[index]?.hint}</Text>
                    </View>
                  )}
                </Animated.View>
              </Animated.View>
            </Pressable>

            {revealed && (
              <TouchableOpacity
                style={[styles.nextBtn, { backgroundColor: style.color }]}
                onPress={next}
                activeOpacity={0.85}
              >
                <Text style={styles.nextBtnText}>
                  {index + 1 >= roles.length ? "Alle klare →" : "Neste spiller →"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* DONE PHASE */}
      {phase === "done" && (
        <View style={styles.phase}>
          <View style={styles.doneContent}>
            <Text style={styles.doneEmoji}>🎭</Text>
            <Text style={styles.doneTitle}>Alle klare!</Text>
            <Text style={styles.doneSub}>
              Diskuter, gi hint og finn imposteren.{"\n"}Imposteren prøver å passe inn!
            </Text>

            <View style={styles.doneRules}>
              <View style={[styles.doneRule, { borderColor: style.color + "33" }]}>
                <Text style={styles.doneRuleEmoji}>✅</Text>
                <Text style={styles.doneRuleText}>Imposter vinner → alle andre tar slurk</Text>
              </View>
              <View style={[styles.doneRule, { borderColor: "rgba(248,113,113,0.3)" }]}>
                <Text style={styles.doneRuleEmoji}>❌</Text>
                <Text style={styles.doneRuleText}>Imposter avslørt → imposteren tar 2 slurker</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.restartBtn, { backgroundColor: style.color }]}
              onPress={restart}
              activeOpacity={0.85}
            >
              <Text style={styles.restartBtnText}>Spill igjen 🔄</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.popToTop()}>
              <Text style={styles.homeBtnText}>← Tilbake til hjem</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glowTop: {
    position: "absolute", top: -100, left: width / 2 - 130,
    width: 260, height: 260, borderRadius: 130, opacity: 0.1,
  },
  topBar: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20, paddingTop: 56, paddingBottom: 12,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 0.5, borderColor: "rgba(255,255,255,0.12)",
    alignItems: "center", justifyContent: "center",
  },
  backText: { color: "#fff", fontSize: 18 },
  modePill: {
    flexDirection: "row", alignItems: "center", gap: 6,
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 999, borderWidth: 1,
  },
  modeEmoji: { fontSize: 15 },
  modeLabel: { fontSize: 13, fontWeight: "800" },

  phase: { flex: 1 },

  setupScroll: { paddingHorizontal: 20, paddingBottom: 50 },
  setupTitle: { color: "#fff", fontSize: 32, fontWeight: "900", marginBottom: 10 },
  setupDesc: {
    color: "rgba(255,255,255,0.45)", fontSize: 14,
    lineHeight: 20, marginBottom: 16,
  },
  rulesRow: { gap: 8, marginBottom: 24 },
  ruleChip: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12, padding: 12,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
  },
  ruleChipText: { color: "rgba(255,255,255,0.6)", fontSize: 13 },
  sectionLabel: {
    fontSize: 11, fontWeight: "700", letterSpacing: 2,
    color: "rgba(255,255,255,0.25)", marginBottom: 12,
  },
  inputRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  inputIcon: {
    width: 36, height: 36, borderRadius: 12,
    alignItems: "center", justifyContent: "center",
  },
  inputIconText: { fontWeight: "900", fontSize: 14 },
  input: {
    flex: 1, backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)",
    color: "#fff", fontSize: 15, fontWeight: "600",
    paddingHorizontal: 14, paddingVertical: 13,
  },
  removeBtn: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.07)",
    alignItems: "center", justifyContent: "center",
  },
  removeBtnText: { color: "rgba(255,255,255,0.4)", fontSize: 14 },
  addBtn: {
    paddingVertical: 14, alignItems: "center",
    borderRadius: 14, borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 16,
  },
  addBtnText: { fontSize: 14, fontWeight: "800" },
  startBtn: {
    borderRadius: 18, paddingVertical: 18,
    alignItems: "center", marginTop: 4,
  },
  startBtnDisabled: { opacity: 0.4 },
  startBtnText: { color: "#0B0B14", fontSize: 16, fontWeight: "900" },

  revealContent: {
    flex: 1, paddingHorizontal: 20,
    justifyContent: "center", alignItems: "center",
  },
  revealSub: { color: "rgba(255,255,255,0.4)", fontSize: 15, marginBottom: 6 },
  revealName: { color: "#fff", fontSize: 30, fontWeight: "900", marginBottom: 4 },
  revealCounter: { fontSize: 13, fontWeight: "700", marginBottom: 28 },
  revealCard: {
    width: width - 40, borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1, padding: 36,
    alignItems: "center", minHeight: 200,
    justifyContent: "center", marginBottom: 24,
  },
  holdContent: { alignItems: "center" },
  holdIcon: { fontSize: 36, marginBottom: 12 },
  holdText: { color: "#fff", fontSize: 18, fontWeight: "800", marginBottom: 6 },
  holdSub: { color: "rgba(255,255,255,0.3)", fontSize: 13 },
  cardContent: { alignItems: "center" },
  cardBadge: {
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 999, marginBottom: 16,
  },
  cardBadgeText: { fontSize: 11, fontWeight: "800", letterSpacing: 1 },
  cardWord: { color: "#fff", fontSize: 36, fontWeight: "900", marginBottom: 10 },
  cardHint: { color: "rgba(255,255,255,0.4)", fontSize: 14 },
  nextBtn: {
    width: width - 40, borderRadius: 18,
    paddingVertical: 17, alignItems: "center",
  },
  nextBtnText: { color: "#0B0B14", fontSize: 16, fontWeight: "900" },

  doneContent: {
    flex: 1, paddingHorizontal: 20,
    justifyContent: "center", alignItems: "center",
  },
  doneEmoji: { fontSize: 64, marginBottom: 16 },
  doneTitle: { color: "#fff", fontSize: 36, fontWeight: "900", marginBottom: 10 },
  doneSub: {
    color: "rgba(255,255,255,0.4)", fontSize: 15,
    textAlign: "center", lineHeight: 22, marginBottom: 28,
  },
  doneRules: { gap: 10, width: "100%", marginBottom: 32 },
  doneRule: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 14, padding: 14, borderWidth: 1,
  },
  doneRuleEmoji: { fontSize: 18 },
  doneRuleText: { color: "rgba(255,255,255,0.55)", fontSize: 13, flex: 1 },
  restartBtn: {
    width: "100%", borderRadius: 18,
    paddingVertical: 18, alignItems: "center", marginBottom: 12,
  },
  restartBtnText: { color: "#0B0B14", fontSize: 16, fontWeight: "900" },
  homeBtn: { paddingVertical: 12 },
  homeBtnText: { color: "rgba(255,255,255,0.25)", fontSize: 14 },
});