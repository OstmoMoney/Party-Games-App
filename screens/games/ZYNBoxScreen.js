import React, { useRef, useEffect, useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  Dimensions, Animated, StatusBar, ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const STATEMENTS = {
  chill: [
    "Hvem her er mest sannsynlig til å sove på festen?",
    "Hvem her bruker lengst tid foran speilet?",
    "Hvem her er mest sannsynlig til å glemme bursdagen din?",
    "Hvem her spiser mest usunt?",
    "Hvem her er mest avhengig av telefonen?",
    "Hvem her er mest sannsynlig til å komme for sent?",
    "Hvem her er best til å holde på hemmeligheter?",
    "Hvem her er mest dramatisk?",
    "Hvem her er mest sannsynlig til å bli kjendis?",
    "Hvem her er best til å lyve?",
    "Hvem her er mest sannsynlig til å ta feil tog hjem?",
    "Hvem her er mest sta?",
    "Hvem her er mest sannsynlig til å gråte på film?",
    "Hvem her er verst til å svare på meldinger?",
    "Hvem her er mest sannsynlig til å bli millionær?",
    "Hvem her sover mest?",
    "Hvem her er best til å komme med unnskyldninger?",
    "Hvem her er mest sannsynlig til å miste nøklene sine?",
    "Hvem her er mest ryddig hjemme?",
    "Hvem her er mest sannsynlig til å bli lærer?",
    "Hvem her er verst til å holde diett?",
    "Hvem her er mest sannsynlig til å bo i utlandet?",
    "Hvem her er best til å lage mat?",
    "Hvem her er mest konkurranseinnstilt?",
    "Hvem her er mest sannsynlig til å bli politimann?",
    "Hvem her er mest sannsynlig til å ta impulsive avgjørelser?",
    "Hvem her er best til å danse?",
    "Hvem her er mest sannsynlig til å ha 10 katter?",
    "Hvem her er mest sannsynlig til å gifte seg først?",
    "Hvem her er mest sannsynlig til å aldri gifte seg?",
    "Hvem her er best til å synge?",
    "Hvem her er mest sannsynlig til å ha dobbel moral?",
    "Hvem her er mest sannsynlig til å hjelpe en fremmed?",
    "Hvem her er mest sannsynlig til å bli youtuber?",
    "Hvem her er mest sannsynlig til å sove inn til lunsj?",
    "Hvem her er mest sannsynlig til å bli utro?",
    "Hvem her er mest morsom når de er full?",
    "Hvem her er dårligst til å holde kontakten?",
    "Hvem her er mest sannsynlig til å savne bussen?",
    "Hvem her er mest sannsynlig til å starte en bedrift?",
  ],
  drunk: [
    "Hvem her har flest one night stands?",
    "Hvem her er mest sannsynlig til å kysse en fremmed i kveld?",
    "Hvem her er verst til å holde seg edru?",
    "Hvem her er mest sannsynlig til å ringe eksen i natt?",
    "Hvem her er best i sengen?",
    "Hvem her har gjort noe pinligst full?",
    "Hvem her er mest sannsynlig til å kaste opp i kveld?",
    "Hvem her er best til å flørte?",
    "Hvem her er mest sannsynlig til å ha sex i kveld?",
    "Hvem her er mest aggressiv når de er full?",
    "Hvem her er mest sannsynlig til å danse på bordet?",
    "Hvem her er mest sannsynlig til å bli med en fremmed hjem?",
    "Hvem her er best til å sjekke opp folk?",
    "Hvem her er mest sannsynlig til å gråte full i kveld?",
    "Hvem her er mest sannsynlig til å miste telefonen i kveld?",
    "Hvem her er mest sannsynlig til å trenge babysitting?",
    "Hvem her har flest sexpartnere?",
    "Hvem her er mest sannsynlig til å henge på do i en time?",
    "Hvem her er mest sannsynlig til å starte drama i kveld?",
    "Hvem her er mest sannsynlig til å kysse noen her i rommet?",
    "Hvem her drikker raskest?",
    "Hvem her er best til å ta shots?",
    "Hvem her er mest sannsynlig til å sove i taxi?",
    "Hvem her er mest sannsynlig til å ringe mammaen sin full?",
    "Hvem her er mest sannsynlig til å gjøre noe de angrer på i morgen?",
    "Hvem her er mest sannsynlig til å bli med på neste utested?",
    "Hvem her er mest sannsynlig til å stjele mat på vei hjem?",
    "Hvem her er mest sannsynlig til å sende uheldige bilder?",
    "Hvem her er verst til å oppføre seg full?",
    "Hvem her er mest sannsynlig til å lage bråk med vakten?",
    "Hvem her er mest sannsynlig til å ha hatt sex på et offentlig sted?",
    "Hvem her er best til å holde seg på bena hele natten?",
    "Hvem her er mest sannsynlig til å savne siste buss med vilje?",
    "Hvem her er mest sannsynlig til å kysse to ulike i kveld?",
    "Hvem her er mest sannsynlig til å ende opp på politistasjonen?",
    "Hvem her er mest sannsynlig til å bli stoppet av vekter?",
    "Hvem her er mest sannsynlig til å lage mat klokken 4?",
    "Hvem her er mest sannsynlig til å bli sendt hjem tidlig?",
    "Hvem her er mest sannsynlig til å møte sin neste kjæreste i kveld?",
    "Hvem her er sist til å legge seg i natt?",
  ],
  nasj: [
    "Hvem her har hatt sex på et offentlig sted?",
    "Hvem her har sendt nakenbilder til feil person?",
    "Hvem her har hatt sex med noen i dette rommet?",
    "Hvem her har hatt en threesome?",
    "Hvem her har flørtet med en venn sin kjæreste?",
    "Hvem her har vært utro?",
    "Hvem her har hatt sex på første date?",
    "Hvem her har sagt 'jeg elsker deg' uten å mene det?",
    "Hvem her har hatt to på gang?",
    "Hvem her har hatt sex på jobben?",
    "Hvem her har ghostet noen etter sex?",
    "Hvem her har hatt sex med en som var i et forhold?",
    "Hvem her har hatt sexting med en fremmed?",
    "Hvem her har hatt sex i en bil?",
    "Hvem her har latt noen tro de var sammen uten å være det?",
    "Hvem her har hatt sex med noen eldre enn 35?",
    "Hvem her har ligget med en venns ex?",
    "Hvem her har delt sengen med noen her og vil gjøre det igjen?",
    "Hvem her har hatt sex uten å huske det?",
    "Hvem her har blitt tatt på fersken?",
    "Hvem her har hatt en hemmelig affære?",
    "Hvem her har hatt sex med noen de egentlig ikke likte?",
    "Hvem her har postet noe seksuelt på nett?",
    "Hvem her har lurt noen til å tro de var eksklusivt?",
    "Hvem her har hatt sex med to fra samme vennegjengen?",
    "Hvem her har brukt noen bare for sex?",
    "Hvem her har slettet beviser fra telefonen?",
    "Hvem her har hatt sex på et hotellrom som ikke var sitt?",
    "Hvem her har betalt for sex eller blitt betalt?",
    "Hvem her har hatt et crush på en gift person?",
    "Hvem her har filmet sex?",
    "Hvem her har fått seg på stranden?",
    "Hvem her har hatt sex i et fremmed hus?",
    "Hvem her har hatt en situasjonship som ble for seriøs?",
    "Hvem her har kyss noen i dette rommet?",
    "Hvem her har hatt sex med noen mer enn 10 år eldre?",
    "Hvem her har hatt sex mens andre var i rommet?",
    "Hvem her har hatt en one night stand med en kompis?",
    "Hvem her ville hatt sex med noen her i kveld?",
    "Hvem her har fått eller sendt nakenbilder til noen de kjenner?",
  ],
  blasted: [
    "Hvem her har gjort noe ulovlig og sluppet unna?",
    "Hvem her har prøvd narkotika?",
    "Hvem her har stjålet som voksen?",
    "Hvem her har lurt noen ut av penger?",
    "Hvem her har drukket og kjørt?",
    "Hvem her har løyet til politiet?",
    "Hvem her har solgt noe ulovlig?",
    "Hvem her har vært involvert i slagsmål med politi?",
    "Hvem her har gjort noe som kan ødelegge karrieren?",
    "Hvem her har mobbet noen uten å be om unnskyldning?",
    "Hvem her har spredt et løgn-rykte?",
    "Hvem her har truet noen?",
    "Hvem her har ødelagt noe verdifullt med vilje?",
    "Hvem her har vært med på noe kriminelt?",
    "Hvem her har hatt sex uten samtykke?",
    "Hvem her har blitt utpresset?",
    "Hvem her har filmet noen uten at de visste det?",
    "Hvem her har solgt nakenbilder?",
    "Hvem her har tatt andres penger uten å spørre?",
    "Hvem her har lekt med noens følelser i lang tid?",
    "Hvem her har bedradd noen i et seriøst forhold?",
    "Hvem her har hjulpet noen med å skjule noe ulovlig?",
    "Hvem her har gjort noe ingen i dette rommet vet om?",
    "Hvem her har hatt sex med noen som sov?",
    "Hvem her har tatt hevn på en ex på en ekstrem måte?",
    "Hvem her har vært med på noe de vet var galt?",
    "Hvem her har spilt på noens psykiske helse for å kontrollere dem?",
    "Hvem her har stukket av fra en ulykke?",
    "Hvem her har hatt en hemmelig identitet på nett?",
    "Hvem her har gjort noe som ville sjokkert alle her?",
    "Hvem her har tatt overdose av noe?",
    "Hvem her har løyet i retten?",
    "Hvem her har prøvd noe seksuelt som er ulovlig?",
    "Hvem her har vært på dark web?",
    "Hvem her har blitt betalt for noe ulovlig?",
    "Hvem her har ødelagt livet til noen uten å angre?",
    "Hvem her har hatt en hemmelig dobbeltkonto?",
    "Hvem her har gjort noe som kan sende dem i fengsel?",
    "Hvem her har stjålet en kjæreste fra en bestevenn?",
    "Hvem her har gjort noe så ille at de aldri kan fortelle det?",
  ],
};

const MODE_STYLE = {
  chill:   { color: "#4ade80", bg: ["#080f0a", "#0a1a0e"], label: "Chill",   emoji: "😊" },
  drunk:   { color: "#60a5fa", bg: ["#080f1a", "#0a1830"], label: "Drunk",   emoji: "🍻" },
  nasj:    { color: "#fb923c", bg: ["#140a04", "#241208"], label: "Nasj",    emoji: "🔥" },
  blasted: { color: "#f87171", bg: ["#140606", "#240a0a"], label: "Blasted", emoji: "💀" },
};

export default function ZYNBoxScreen({ navigation, route }) {
  const playerName = route?.params?.playerName || "Player";
  const mode = route?.params?.mode || "chill";
  const style = MODE_STYLE[mode] || MODE_STYLE.chill;

  const [statements] = useState(() =>
    [...STATEMENTS[mode]].sort(() => Math.random() - 0.5)
  );
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [throwing, setThrowing] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const cardAnim = useRef(new Animated.Value(1)).current;
  const cardSlide = useRef(new Animated.Value(0)).current;
  const boxAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(1 / statements.length)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (index + 1) / statements.length,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [index]);

  const throwBox = () => {
    if (throwing) return;
    setThrowing(true);

    Animated.sequence([
      Animated.timing(boxAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.timing(boxAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(cardAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(cardSlide, { toValue: -40, duration: 200, useNativeDriver: true }),
      ]).start(() => {
        cardSlide.setValue(40);
        if (index + 1 >= statements.length) {
          setDone(true);
        } else {
          setIndex((i) => i + 1);
        }
        setThrowing(false);
        Animated.parallel([
          Animated.timing(cardAnim, { toValue: 1, duration: 220, useNativeDriver: true }),
          Animated.timing(cardSlide, { toValue: 0, duration: 220, useNativeDriver: true }),
        ]).start();
      });
    });
  };

  const restart = () => {
    setIndex(0);
    setDone(false);
    setThrowing(false);
    cardAnim.setValue(1);
    cardSlide.setValue(0);
  };

  const boxScale = boxAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.85] });
  const boxRotate = boxAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "15deg"] });

  if (done) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={style.bg} style={StyleSheet.absoluteFill} />
        <View style={[styles.glowTop, { backgroundColor: style.color }]} />
        <View style={styles.doneWrap}>
          <Text style={styles.doneEmoji}>📦</Text>
          <Text style={styles.doneTitle}>Ferdig!</Text>
          <Text style={styles.doneSub}>
            Dere har gått gjennom alle{"\n"}
            <Text style={[styles.doneHighlight, { color: style.color }]}>{statements.length} påstander</Text>
          </Text>
          <TouchableOpacity
            style={[styles.restartBtn, { borderColor: style.color }]}
            onPress={restart}
            activeOpacity={0.85}
          >
            <Text style={[styles.restartText, { color: style.color }]}>Spill igjen 🔄</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.popToTop()}>
            <Text style={styles.homeBtnText}>← Tilbake til hjem</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={style.bg} style={StyleSheet.absoluteFill} />
      <View style={[styles.glowTop, { backgroundColor: style.color }]} />

      <Animated.View style={[styles.inner, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <View style={[styles.modePill, { backgroundColor: style.color + "22", borderColor: style.color + "55" }]}>
            <Text style={styles.modeEmoji}>{style.emoji}</Text>
            <Text style={[styles.modeLabel, { color: style.color }]}>{style.label}</Text>
          </View>
          <View style={styles.counter}>
            <Text style={[styles.counterText, { color: style.color }]}>{index + 1}/{statements.length}</Text>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressRow}>
          <View style={styles.progressBg}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  backgroundColor: style.color,
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </View>
        </View>

        {/* Rules hint */}
        <View style={[styles.rulesHint, { borderColor: style.color + "33" }]}>
          <Text style={styles.rulesHintText}>
            📦 Les påstanden høyt → kast boksen til den som passer best
          </Text>
        </View>

        {/* Card */}
        <View style={styles.cardArea}>
          <Animated.View
            style={[
              styles.card,
              {
                opacity: cardAnim,
                transform: [{ translateY: cardSlide }],
                borderColor: style.color + "33",
              },
            ]}
          >
            <View style={[styles.cardTopBar, { backgroundColor: style.color }]} />
            <Text style={styles.cardLabel}>KAST BOKSEN TIL...</Text>
            <Text style={styles.cardStatement}>{statements[index]}</Text>
          </Animated.View>
        </View>

        {/* Box + throw button */}
        <View style={styles.throwArea}>
          <Animated.View style={{
            transform: [{ scale: boxScale }, { rotate: boxRotate }],
          }}>
            <Text style={styles.boxEmoji}>📦</Text>
          </Animated.View>

          <TouchableOpacity
            style={[styles.throwBtn, { backgroundColor: style.color }]}
            onPress={throwBox}
            activeOpacity={0.85}
            disabled={throwing}
          >
            <Text style={styles.throwBtnText}>KAST OG NESTE →</Text>
          </TouchableOpacity>
        </View>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 20 },
  glowTop: {
    position: "absolute", top: -100, left: width / 2 - 130,
    width: 260, height: 260, borderRadius: 130, opacity: 0.1,
  },
  topBar: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 56, marginBottom: 16,
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
  counter: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 0.5, borderColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999,
  },
  counterText: { fontSize: 13, fontWeight: "800" },
  progressRow: { marginBottom: 16 },
  progressBg: {
    height: 4, backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 2, overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 2 },
  rulesHint: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 14, borderWidth: 1,
    padding: 12, marginBottom: 20,
  },
  rulesHintText: { color: "rgba(255,255,255,0.4)", fontSize: 13, textAlign: "center" },
  cardArea: { flex: 1, justifyContent: "center", marginBottom: 20 },
  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 28, padding: 28,
    borderWidth: 1, overflow: "hidden",
  },
  cardTopBar: {
    position: "absolute", top: 0, left: 0, right: 0, height: 3,
  },
  cardLabel: {
    color: "rgba(255,255,255,0.3)", fontSize: 12,
    fontWeight: "700", letterSpacing: 1, marginBottom: 16,
  },
  cardStatement: {
    color: "#fff", fontSize: 24, fontWeight: "900", lineHeight: 32,
  },
  throwArea: {
    alignItems: "center", paddingBottom: 40, gap: 16,
  },
  boxEmoji: { fontSize: 56 },
  throwBtn: {
    width: "100%", borderRadius: 18,
    paddingVertical: 18, alignItems: "center",
  },
  throwBtnText: { color: "#0B0B14", fontSize: 16, fontWeight: "900", letterSpacing: 1 },
  doneWrap: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
  doneEmoji: { fontSize: 70, marginBottom: 16 },
  doneTitle: { color: "#fff", fontSize: 42, fontWeight: "900", marginBottom: 12 },
  doneSub: {
    color: "rgba(255,255,255,0.45)", fontSize: 17,
    textAlign: "center", lineHeight: 26, marginBottom: 40,
  },
  doneHighlight: { fontWeight: "900" },
  restartBtn: {
    width: "100%", borderRadius: 20, borderWidth: 1.5,
    paddingVertical: 18, alignItems: "center", marginBottom: 14,
  },
  restartText: { fontSize: 16, fontWeight: "900" },
  homeBtn: { paddingVertical: 12 },
  homeBtnText: { color: "rgba(255,255,255,0.25)", fontSize: 14 },
});