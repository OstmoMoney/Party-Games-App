import React, { useRef, useEffect, useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  Dimensions, Animated, StatusBar, TextInput,
  ScrollView, Modal, Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const BOTTLE_SIZE = 180;
const RADIUS = 130;

const TRUTHS = {
  chill: [
    "Hva er det pinligste som har skjedd deg på en date?",
    "Hvem i dette rommet ville du invitert på date?",
    "Hva er din største flaue hemmelighet?",
    "Har du noen gang hatt en drøm om noen her?",
    "Hva er det verste du har gjort for å imponere noen?",
    "Hvem er du mest jaloux på i vennegjengen?",
    "Hva er den verste løgnen du har fortalt?",
    "Har du noen gang stalkket noen på sosiale medier?",
    "Hva er det første du legger merke til hos noen du liker?",
    "Har du noen gang angret på et kyss?",
    "Hva er din største usikkerhet?",
    "Hvem ville du aldri datt på i dette rommet?",
    "Hva er det rareste du har gjort alene?",
    "Har du noen gang later som du likte noen for å ikke såre dem?",
    "Hva er den mest pinlige sangen du har på spillelisten?",
    "Hvem er den siste du sjekket Instagram til uten grunn?",
    "Har du noen gang løyet om alderen din?",
    "Hva er det verste du har sagt bak ryggen til noen her?",
    "Har du noen gang sendt en melding til feil person?",
    "Hva er din mest pinlige vane?",
  ],
  drunk: [
    "Hvem her ville du kysset hvis du måtte?",
    "Hva er det villeste du har gjort full?",
    "Har du noen gang ringt eksen full om natten?",
    "Hva er den mest pinlige tingen du har gjort på fest?",
    "Hvem her tiltrekker du deg mest?",
    "Hva er det verste du har sagt til noen full?",
    "Har du noen gang forsøkt å kysse noen som ikke ville?",
    "Hvem her tror du er best i sengen?",
    "Hva er den rareste plassen du har hatt sex?",
    "Har du noen gang hatt en one night stand du angrer på?",
    "Hva er det villeste du har gjort for å få noen til å like deg?",
    "Har du noen gang sjekket opp to fra samme vennegjengen?",
    "Hva er det pinligste du har gjort for kjærligheten?",
    "Har du noen gang løyet om at du var singel?",
    "Hva er din verste drikkeegenskap?",
    "Har du noen gang sovet hos noen du ikke burde?",
    "Hvem her ville du kyst om lyset gikk?",
    "Hva er det råeste du har gjort på nachspiel?",
    "Har du noen gang danset på et bord?",
    "Hvem her ville du valgt om du måtte date én i ett år?",
  ],
  nasj: [
    "Beskriv den råeste seksuelle erfaringen din",
    "Hvem her ville du hatt sex med hvis du måtte?",
    "Hva er den kinkigste fantasien din?",
    "Har du noen gang hatt sex på en offentlig plass?",
    "Hvem her tror du er råest i sengen?",
    "Hva er det mest sjokkerende du har gjort seksuelt?",
    "Har du noen gang hatt en affære?",
    "Beskriv din ideelle one night stand",
    "Hva er det villeste du har foreslått til en partner?",
    "Har du noen gang filmet deg selv?",
    "Hvem her ville du hatt en threesome med?",
    "Hva er din beste og verste seksuelle erfaring?",
    "Har du noen gang hatt sex mens noen andre var i rommet?",
    "Hva er det mest tabu du har prøvd?",
    "Hvem her har du tenkt på seksuelt?",
    "Har du noen gang sendt nakenbilder?",
    "Hva er fetisjen din?",
    "Beskriv drømmepartneren din i sengen",
    "Har du noen gang vært tredjehjulet med vilje?",
    "Hva er den villeste tingen du har gjort på en date?",
  ],
  blasted: [
    "Fortell om det villeste du har gjort som kan ødelegge ryktet ditt",
    "Hvem her ville du sett nakenbilder av?",
    "Hva er den mørkeste fantasien din?",
    "Har du noen gang gjort noe seksuelt du skammer deg over?",
    "Beskriv din verste one night stand i detalj",
    "Hva er det mest ekstreme du har gjort for sex?",
    "Har du noen gang gjort noe ulovlig for en person du likte?",
    "Hvem her har du hatt drømmer om som du aldri ville innrømt?",
    "Hva er den kinkigste tingen du har gjort som ingen vet om?",
    "Har du noen gang lurt noen til å tro dere var eksklusive?",
    "Beskriv noe seksuelt du vil prøve men aldri turt å spørre om",
    "Hvem her har du faktisk fantasert om?",
    "Hva er den mørkeste hemmeligheten din?",
    "Har du noen gang gjort noe seksuelt du ikke husker?",
    "Hva er det verste du har gjort i et forhold?",
    "Beskriv din wildeste natt",
    "Hvem her ville du valgt til en helt hemmelig affære?",
    "Hva er noe seksuelt du har gjort som du aldri ville fortalt foreldrene dine?",
    "Har du noen gang blitt tatt på fersken?",
    "Hva er den absolutt villeste tingen du har gjort?",
  ],
};

const DARES = {
  chill: [
    "Si noe hyggelig om alle i rommet",
    "Gjør din beste dansebevegelse",
    "Ring noen og si 'jeg savner deg'",
    "Bytt sokker med personen til venstre",
    "Snakk med aksent i 2 minutter",
    "Gjør 15 push-ups",
    "Synge første vers av en tilfeldig sang",
    "Post en pinlig selfie på stories",
    "La noen skrive hva som helst på pannen din",
    "Imitér en kjendis til noen gjetter hvem",
    "La noen male neglene dine",
    "Ring en tilfeldig kontakt og si du har vunnet en premie",
    "Gjør din beste catwalk tvers over rommet",
    "La noen velge din neste profilbilde",
    "Si tre ting du liker med personen til høyre",
    "Gjør din verste vits",
    "La noen scrolle fritt i galleriet ditt i 30 sekunder",
    "Dans alene i 1 minutt uten musikk",
    "Gi noen her en håndbaksmassasje",
    "Fortell den mest pinlige historien din",
  ],
  drunk: [
    "Ta en shot",
    "Kyss personen til venstre på kinnet",
    "La alle ta en slurk fra glasset ditt",
    "Gjør din beste strippdans i 30 sekunder",
    "Ring eksen din og si 'jeg tenker på deg'",
    "Ta av deg ett plagg",
    "Sitt i fanget til personen til høyre i 1 minutt",
    "La noen sende en melding fra telefonen din",
    "Gjør 20 push-ups eller ta en shot",
    "Kyss hånden til den du finner mest attraktiv her",
    "Fortell om den villeste natten din",
    "La personen til venstre velge hva du drikker neste",
    "Gjør en body shot",
    "Post 'jeg er forelsket' på Instagram uten forklaring",
    "La alle lese de siste 5 meldingene i en valgfri chat",
    "Si noe ekkelt i øret til personen til høyre",
    "Bytt klær med noen i 5 minutter",
    "Fortell hvem du synes er finest i rommet",
    "Gjør din mest sexy dans",
    "Ring en venn og overbevise dem om at du er på feil fest",
  ],
  nasj: [
    "Kyss den du finner mest attraktiv her",
    "La noen velge hvem du må flørte med i 5 minutter",
    "Gjør en lap dance for noen du velger",
    "Ta av deg to plagg",
    "Beskriv hva du ville gjort med personen til venstre hvis dere var alene",
    "La alle se gjennom DM-ene dine i 1 minutt",
    "Sitt i fanget til noen og hvisk noe ekkelt",
    "Gjør din mest sexy positur mens alle tar bilde",
    "Kyss personen med flest fingre oppe",
    "Fortell om din beste seksuelle erfaring",
    "La noen tegne hva som helst på ryggen din",
    "Gjør en body shot av noen du velger",
    "Send en flørtetekst til den siste i innboksen din",
    "La personen til venstre sette passordet på telefonen din i 10 minutter",
    "Beskriv din type i full detalj",
    "Spill 7 minutter i paradis med noen du velger",
    "La alle stille deg ett spørsmål du MÅ svare ærlig på",
    "Vis den mest pinlige bilder på telefonen din",
    "Gjør en sexy runway walk mens alle ser på",
    "La noen velge en ny kontaktfoto av deg",
  ],
  blasted: [
    "Kyss den du finner råest på munnen",
    "Strip ned til undertøy",
    "La rommet bestemme hvem du flørter med resten av kvelden",
    "Gjør noe du aldri har gjort foran alle",
    "La alle scrolle fritt i telefonhistorikken din",
    "Send eks-en din 'vi burde snakkes'",
    "Post en halvnaken selfie på stories i 5 minutter",
    "Fortell din mørkeste hemmelighet høyt",
    "La noen skrive hva som helst på kroppen din med penn",
    "Ring mamma og si at du er forelsket i vennen din",
    "Gi noen her en ekte kyss eller ta 3 shots",
    "La alle bestemme en straff for deg",
    "Gjør det villeste du kan tenke deg i 30 sekunder",
    "Send en ekkelt melding til den femte personen i kontaktlisten",
    "La noen poste hva som helst på Instagram-en din",
    "Fortell hvem her du faktisk har tenkt på seksuelt",
    "Gjør en lap dance for den eldste i rommet",
    "La noen sette en ny bio på Instagram",
    "Ring en tilfeldig og si at du er gravid/far",
    "Ingen grenser — rommet bestemmer straffen",
  ],
};

const MODE_STYLE = {
  chill:   { color: "#4ade80", bg: ["#080f0a", "#0a1a0e"], label: "Chill",   emoji: "😊" },
  drunk:   { color: "#60a5fa", bg: ["#080f1a", "#0a1830"], label: "Drunk",   emoji: "🍻" },
  nasj:    { color: "#fb923c", bg: ["#140a04", "#241208"], label: "Nasj",    emoji: "🔥" },
  blasted: { color: "#f87171", bg: ["#140606", "#240a0a"], label: "Blasted", emoji: "💀" },
};

function Bottle({ color }) {
  return (
    <View style={styles.bottleContainer}>
      {/* Kork */}
      <View style={[styles.bottleCork, { backgroundColor: color }]} />
      {/* Hals */}
      <View style={[styles.bottleNeck, { borderColor: color }]} />
      {/* Kropp */}
      <View style={[styles.bottleBody, { borderColor: color, backgroundColor: color + "18" }]}>
        {/* Refleks */}
        <View style={styles.bottleReflect} />
        {/* Merke */}
        <View style={[styles.bottleLabel, { backgroundColor: color + "30", borderColor: color + "50" }]}>
          <Text style={[styles.bottleLabelText, { color }]}>B</Text>
        </View>
      </View>
      {/* Bunn */}
      <View style={[styles.bottleBase, { backgroundColor: color + "40", borderColor: color }]} />
    </View>
  );
}

export default function SpinTheBottleScreen({ navigation, route }) {
  const playerName = route?.params?.playerName || "Player";
  const mode = route?.params?.mode || "chill";
  const style = MODE_STYLE[mode] || MODE_STYLE.chill;
  const truths = TRUTHS[mode] || TRUTHS.chill;
  const dares = DARES[mode] || DARES.chill;

  const [phase, setPhase] = useState("setup");
  const [players, setPlayers] = useState([playerName, ""]);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const [challengeType, setChallengeType] = useState(null);

  const rotation = useRef(new Animated.Value(0)).current;
  const currentDeg = useRef(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const activePlayers = players.map(p => p.trim()).filter(Boolean);

  const startGame = () => {
    if (activePlayers.length < 2) return;
    setPhase("play");
  };

  const spin = () => {
    if (spinning || activePlayers.length < 2) return;
    setSpinning(true);
    setWinner(null);

    const extraSpins = 5 + Math.random() * 3;
    const randomOffset = Math.random() * 360;
    const target = currentDeg.current + extraSpins * 360 + randomOffset;

    Animated.timing(rotation, {
      toValue: target,
      duration: 3800,
      useNativeDriver: true,
    }).start(() => {
      currentDeg.current = target;
      const normalized = ((target % 360) + 360) % 360;
      const anglePerPlayer = 360 / activePlayers.length;
      const winnerIdx = Math.floor((normalized + anglePerPlayer / 2) / anglePerPlayer) % activePlayers.length;
      setWinner(activePlayers[winnerIdx]);
      setChallenge(null);
      setChallengeType(null);
      setShowModal(true);
      setSpinning(false);
    });
  };

  const pickTruth = () => {
    setChallengeType("truth");
    setChallenge(truths[Math.floor(Math.random() * truths.length)]);
  };

  const pickDare = () => {
    setChallengeType("dare");
    setChallenge(dares[Math.floor(Math.random() * dares.length)]);
  };

  const closeModal = () => {
    setShowModal(false);
    setChallenge(null);
    setChallengeType(null);
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={style.bg} style={StyleSheet.absoluteFill} />
      <View style={[styles.glowTop, { backgroundColor: style.color }]} />

      {/* Top bar */}
      <Animated.View style={[styles.topBar, { opacity: fadeAnim }]}>
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
        <Animated.View style={[styles.setupWrap, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.setupScroll}>
            <Text style={styles.setupTitle}>🍾 Spin the Bottle</Text>
            <Text style={styles.setupDesc}>
              Snurr flasken — den det peker på må svare en sannhet eller gjøre en nøtt!
            </Text>

            <Text style={styles.sectionLabel}>SPILLERE</Text>

            {players.map((p, i) => (
              <View key={i} style={styles.inputRow}>
                <View style={[styles.inputNum, { backgroundColor: style.color + "22" }]}>
                  <Text style={[styles.inputNumText, { color: style.color }]}>{i + 1}</Text>
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
                {i >= 2 && (
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
                style={[styles.addBtn, { borderColor: style.color + "44" }]}
                onPress={() => setPlayers([...players, ""])}
              >
                <Text style={[styles.addBtnText, { color: style.color }]}>+ Legg til spiller</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.startBtn,
                { backgroundColor: style.color },
                activePlayers.length < 2 && { opacity: 0.4 },
              ]}
              onPress={startGame}
              activeOpacity={0.85}
            >
              <Text style={styles.startBtnText}>
                {activePlayers.length < 2 ? "Minst 2 spillere" : "START SPILLET →"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      )}

      {/* PLAY PHASE */}
      {phase === "play" && (
        <View style={styles.playWrap}>
          {/* Players in circle */}
          <View style={styles.circleArea}>
            {activePlayers.map((name, i) => {
              const angle = (2 * Math.PI * i) / activePlayers.length - Math.PI / 2;
              const x = RADIUS * Math.cos(angle);
              const y = RADIUS * Math.sin(angle);
              return (
                <View
                  key={i}
                  style={[styles.playerDot, { transform: [{ translateX: x }, { translateY: y }] }]}
                >
                  <View style={[styles.playerDotCircle, { backgroundColor: style.color + "33", borderColor: style.color + "66" }]}>
                    <Text style={[styles.playerDotInitial, { color: style.color }]}>
                      {name.slice(0, 1).toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.playerDotName} numberOfLines={1}>{name}</Text>
                </View>
              );
            })}

            {/* Spinning bottle */}
            <Animated.View style={[styles.bottleWrap, { transform: [{ rotate: rotateInterpolate }] }]}>
              <Bottle color={style.color} />
            </Animated.View>
          </View>

          {/* Spin button */}
          <TouchableOpacity
            style={[styles.spinBtn, { borderColor: style.color + "55", backgroundColor: style.color + "15" }]}
            onPress={spin}
            activeOpacity={0.85}
            disabled={spinning}
          >
            <Text style={[styles.spinBtnText, { color: style.color }]}>
              {spinning ? "Snurrer..." : "🍾 SNURR"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetBtn} onPress={() => setPhase("setup")}>
            <Text style={styles.resetBtnText}>← Endre spillere</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* MODAL */}
      <Modal transparent animationType="fade" visible={showModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={[styles.modalAccent, { backgroundColor: style.color }]} />

            {!challenge ? (
              <>
                <Text style={styles.modalWinner}>{winner}</Text>
                <Text style={styles.modalSub}>Velg sannhet eller nøtt</Text>
                <View style={styles.modalBtns}>
                  <TouchableOpacity
                    style={[styles.modalBtn, { backgroundColor: style.color + "22", borderColor: style.color + "55" }]}
                    onPress={pickTruth}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.modalBtnIcon}>🗣️</Text>
                    <Text style={[styles.modalBtnText, { color: style.color }]}>Sannhet</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalBtn, { backgroundColor: style.color + "22", borderColor: style.color + "55" }]}
                    onPress={pickDare}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.modalBtnIcon}>🎯</Text>
                    <Text style={[styles.modalBtnText, { color: style.color }]}>Nøtt</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <View style={[styles.challengeTypeBadge, { backgroundColor: style.color + "22" }]}>
                  <Text style={[styles.challengeTypeText, { color: style.color }]}>
                    {challengeType === "truth" ? "🗣️ SANNHET" : "🎯 NØTT"}
                  </Text>
                </View>
                <Text style={styles.modalWinner}>{winner}</Text>
                <Text style={styles.challengeText}>{challenge}</Text>
                <TouchableOpacity
                  style={[styles.closeBtn, { backgroundColor: style.color }]}
                  onPress={closeModal}
                  activeOpacity={0.85}
                >
                  <Text style={styles.closeBtnText}>Neste runde →</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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

  setupWrap: { flex: 1 },
  setupScroll: { paddingHorizontal: 20, paddingBottom: 50 },
  setupTitle: { color: "#fff", fontSize: 28, fontWeight: "900", marginBottom: 8 },
  setupDesc: { color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 20, marginBottom: 24 },
  sectionLabel: { fontSize: 11, fontWeight: "700", letterSpacing: 2, color: "rgba(255,255,255,0.25)", marginBottom: 12 },
  inputRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  inputNum: { width: 36, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  inputNumText: { fontWeight: "900", fontSize: 14 },
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
    marginBottom: 16,
  },
  addBtnText: { fontSize: 14, fontWeight: "800" },
  startBtn: { borderRadius: 18, paddingVertical: 18, alignItems: "center" },
  startBtnText: { color: "#0B0B14", fontSize: 16, fontWeight: "900" },

  playWrap: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20 },
  circleArea: {
    width: BOTTLE_SIZE + RADIUS * 2,
    height: BOTTLE_SIZE + RADIUS * 2,
    alignItems: "center", justifyContent: "center",
    marginBottom: 32,
  },
  playerDot: { position: "absolute", alignItems: "center" },
  playerDotCircle: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, marginBottom: 4,
  },
  playerDotInitial: { fontSize: 16, fontWeight: "900" },
  playerDotName: { color: "rgba(255,255,255,0.6)", fontSize: 10, fontWeight: "700", maxWidth: 60, textAlign: "center" },

  bottleWrap: { position: "absolute", width: 80, height: 160, alignItems: "center" },
  bottleContainer: { width: 40, height: 140, alignItems: "center" },
  bottleCork: { width: 12, height: 10, borderRadius: 3, marginBottom: 0 },
  bottleNeck: {
    width: 16, height: 24, borderRadius: 4,
    borderWidth: 2, backgroundColor: "transparent",
  },
  bottleBody: {
    width: 36, height: 72, borderRadius: 10,
    borderWidth: 2, overflow: "hidden",
    alignItems: "flex-start", justifyContent: "center",
  },
  bottleReflect: {
    position: "absolute", left: 6, top: 8,
    width: 4, height: 40, borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  bottleLabel: {
    width: 22, height: 22, borderRadius: 4,
    borderWidth: 1, alignItems: "center", justifyContent: "center",
    marginLeft: 6,
  },
  bottleLabelText: { fontSize: 11, fontWeight: "900" },
  bottleBase: {
    width: 36, height: 8, borderRadius: 4,
    borderWidth: 1.5, marginTop: -2,
  },

  spinBtn: {
    width: "100%", borderRadius: 20, borderWidth: 1.5,
    paddingVertical: 18, alignItems: "center", marginBottom: 12,
  },
  spinBtnText: { fontSize: 20, fontWeight: "900", letterSpacing: 1 },
  resetBtn: { paddingVertical: 10 },
  resetBtnText: { color: "rgba(255,255,255,0.25)", fontSize: 13 },

  modalOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center", alignItems: "center",
  },
  modalCard: {
    width: width - 48, backgroundColor: "#13131F",
    borderRadius: 28, padding: 28,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden", alignItems: "center",
  },
  modalAccent: { position: "absolute", top: 0, left: 0, right: 0, height: 3 },
  modalWinner: { color: "#fff", fontSize: 28, fontWeight: "900", marginBottom: 8, textAlign: "center" },
  modalSub: { color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 20 },
  modalBtns: { flexDirection: "row", gap: 12, width: "100%" },
  modalBtn: {
    flex: 1, borderRadius: 16, borderWidth: 1,
    paddingVertical: 18, alignItems: "center",
  },
  modalBtnIcon: { fontSize: 28, marginBottom: 6 },
  modalBtnText: { fontSize: 15, fontWeight: "900" },
  challengeTypeBadge: {
    paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 999, marginBottom: 14,
  },
  challengeTypeText: { fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  challengeText: {
    color: "#fff", fontSize: 20, fontWeight: "800",
    textAlign: "center", lineHeight: 28, marginBottom: 24,
  },
  closeBtn: { width: "100%", borderRadius: 16, paddingVertical: 16, alignItems: "center" },
  closeBtnText: { color: "#0B0B14", fontSize: 15, fontWeight: "900" },
});