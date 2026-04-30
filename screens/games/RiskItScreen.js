import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet, Text, View, TouchableOpacity,
  Vibration, Animated, Platform, Dimensions, StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");
const SWIPE_EDGE = 25;

const FINGER_COLORS = [
  "#FF6B6B", "#5EEAD4", "#60A5FA",
  "#F59E0B", "#A78BFA", "#34D399", "#F472B6",
];

const QUESTIONS = {
  chill: [
    "Ta en slurk 🍺",
    "Si noe hyggelig om personen til venstre",
    "Gjør 10 push-ups",
    "Ring noen og si 'jeg savner deg'",
    "Si tre ting du er takknemlig for",
    "Bytt plass med noen",
    "Gjør en dårlig vits",
    "Gi noen i rommet et kompliment",
    "Del noe ingen vet om deg",
    "Ta en selfie med personen til høyre",
    "Si alfabetet baklengs",
    "Imitér noen i rommet",
    "Dans i 15 sekunder",
    "Si noe på et annet språk",
    "Fortell din mest pinlige opplevelse",
    "Synge første vers av en valgfri sang",
    "Gi en high five til alle i rommet",
    "Følg en ny person på instagram som du er tiltrukket av",
    "Ta to slurker",
    "Ta tre slurker",
    "Beskriv crushet ditt",
    "Send en DM, personen til venstre bestemmer hvem",
    "Send en random emoji til en kollega",
    "Si din største seksuelle svakhet",
    "Fiks en shot til en i rommet",
    "Fiks en øl til den i rommet som liker øl minst",
    "Fortell din beste vits",
    "Hvem i rommet er penest",
    "Fortell en hemmelighet",
    "Hva unormalt har du i vesken din",
    "Nevn alt som ligger i nattbordskuffen din",
    "Hvor mye har du på brukskonto akkurat nå",
    "Når var du sist forelsket",
    "Hva er din type",
    "Fortell en gåte",
    "Etter dette, spill drunk-version",
    "Hopp rett til blasted-version",
    "Du kan kun hviske de tre neste rundene ",
    "Send en kjærlighetserklæring til et crush",
    "Send en jeg savner deg melding til en fling ",
    "Den til venstre kan mixe deg en drink",
    "Det går fint, vi skipper deg",
    "Drikk litt vann",
    "Drikk litt mer vann",
    "Er du brisen? Ta tre store slurker",
    "Du må nå chugge, men bare et glass vann",
    "Chug en øl",
    "Post noe random på story",
    "Send en selfie til 5 randoms",
    "Bestem nattmaten for gruppa",
    "Hvor er pizzaen? Bestill pizza til alle (1% sjansje)",
    "Ta deg en pause fra spillet",
    "Gjelder alle: Siste som drikker opp glasset må spandere på de andre",
    "Ta to slurker",
    
  ],
  drunk: [
    "Ta to slurker 🍺🍺",
    "Alle andre tar en slurk",
    "Velg én person som må ta en slurk",
    "Ta en shot",
    "Fyll opp glasset og drikk halvparten",
    "Bytt drink med personen til venstre",
    "Instagram: Dra fingeren kjapt over stories, der fingeren havner, imiterer du posten og publiserer på egen story",
    "Bytt plass med noen du aldri snakker med",
    "Ta en slurk per gang du har vært full denne uka",
    "Alle som har vært på Tinder i dag drikker",
    "Si noe fint om personen til høyre",
    "Ta en slurk uten å bruke hendene",
    "Alle med mørkt hår tar en slurk",
    "Ta en slurk hvis du er singel",
    "Snakk med aksent i 2 minutter — bryter du tar du en slurk",
    "Den eldste i rommet bestemmer hvem som tar en shot",
    "Ring eksen din — klarer du ikke tar du 3 slurker",
    "Alle tar en slurk og sier noe om personen som fikk fargen",
    "Ta en slurk for hvert dating-app du har",
    "Drikk 'Never Have I Ever' — si noe du aldri har gjort, de som har gjort det drikker",
    "Ta en slurk hvis du har stalket noen i dag",
    "Den med dyrest outfit velger hvem som drikker",
    "Si hvem du tror får kjæreste først",
    "Den mest stille tar 2 slurker",
    "Ta en slurk hvis du har blitt avvist",
    "Si hvem som er mest sannsynlig å rote i kveld",
    "Ta en slurk hvis du har flørtet i kveld",
    "Si hvem som burde dra hjem først",
    "Den som har vært lengst singel tar 2",
    "Kiss, marry & kill på de med i spillet",
    "Hvem her vil du ta med hjem ikveld",
    "Din beste pickupline",
    "Din værste pickupline",
    "Hva er din type",
    "Asian vs White",
    "Black vs white",
    "Black vs Asian",
    "Din sykeste konspirasjonsteori",
    "Er du kinky",
    "i løpet av kvelden, få blikkontakt med den mest attraktive i rommet",
    "I løpet av kvelden, blunk med et øye til den mest attraktive",
    "Fortell din beste vits",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
  nasj: [
    "Kyss personen til venstre eller ta 3 shots",
    "Ta av deg ett plagg eller drikk dobbelt",
    "Fortell din villeste sexopplevelse eller ta 2 shots",
    "Send en NSFW-melding til den siste personen i innboksen din",
    "Sitt i fanget til personen til høyre i 1 minutt",
    "Spill '7 minutter i paradis' med en du velger",
    "La noen i rommet låse opp telefonen din",
    "Beskriv din type i detalj — uten å lyve",
    "Si hvem i rommet du ville kysse, hvem du ville giftet deg med, hvem du ville unngått",
    "Gjør din beste 'sexy walk' tvers over rommet",
    "Hvisk noe ekkelt i øret på personen til høyre",
    "Send en dating-app-match en melding nå",
    "Fortell om din verste seksuelle opplevelse",
    "La rommet bestemme hvem du skal flørte med i 5 minutter",
    "Ta en body shot av noen du velger",
    "Vis den mest pinlige bilder på telefonen din",
    "Les opp den siste meldingstråden du er flau over",
    "La personen til venstre se gjennom telefonen din i 30 sekunder",
    "Beskriv eksen din på verst mulig måte",
    "Gjør det vakten på toppen av favorittstedet ditt ville gjort",
  ],
  blasted: [
    "Ring en fremmed og si at du elsker dem",
    "Ta av deg to plagg",
    "Kyss personen med flest fingre på skjermen",
    "La rommet bestemme en tatovert tekst du må skrive på kroppen din med penn",
    "Fortell din mørkeste hemmelighet",
    "La alle se gjennom telefonen din i 1 minutt",
    "Gjør noe du aldri har gjort foran alle",
    "Send eks-en din 'vi burde snakkes'",
    "Blindfold: Motsatt kjønn kysser deg, gjett hvem",
    "Alle kan stille deg ETT spørsmål og du MÅ svare ærlig",
    "Følg eksen din på Instagram ",
    "Ta 5 slurker",
    "Del ut 5 slurker",
    "La noen tegne en fake tatovering på armen din",
    "Hvem her har mest Aura",
    "Hvem er hottest",
    "",
    "Ring en tilfeldig kontakt og si at du er gravid/far",
    "Gjør det villeste du kan tenke deg i 30 sekunder",
    "Ingen grenser — rommet bestemmer straffen",
  ],
};

const MODE_COLORS = {
  chill:   ["#0a1a0e", "#0d2a14", "#0a1a0e"],
  drunk:   ["#080f1a", "#0a1830", "#080f1a"],
  nasj:    ["#140a04", "#241208", "#140a04"],
  blasted: ["#140606", "#240a0a", "#140606"],
};

const MODE_ACCENT = {
  chill:   "#4ade80",
  drunk:   "#60a5fa",
  nasj:    "#fb923c",
  blasted: "#f87171",
};

const vibrateShort = () => Platform.OS !== "web" && Vibration.vibrate(40);
const vibrateLong  = () => Platform.OS !== "web" && Vibration.vibrate([0, 500]);

function Bubble({ size, left, delay, duration, color }) {
  const y = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(y, { toValue: -height - 150, duration, useNativeDriver: true }),
        Animated.timing(y, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return (
    <Animated.View pointerEvents="none" style={{
      position: "absolute", bottom: -150, left,
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: color + "15",
      transform: [{ translateY: y }],
    }} />
  );
}

export default function RiskItScreen({ navigation, route }) {
  const playerName = route?.params?.playerName || "Player";
  const mode = route?.params?.mode || "chill";
  const accent = MODE_ACCENT[mode] || MODE_ACCENT.chill;
  const bgColors = MODE_COLORS[mode] || MODE_COLORS.chill;
  const modeQuestions = QUESTIONS[mode] || QUESTIONS.chill;

  const [gameState, setGameState] = useState("intro");
  const [touches, setTouches] = useState({});
  const touchesRef = useRef({});
  const animsRef = useRef({});
  const [winnerId, setWinnerId] = useState(null);
  const [question, setQuestion] = useState("");
  const [countdown, setCountdown] = useState(0);

  const countdownInterval = useRef(null);
  const finishTimeout = useRef(null);
  const countdownRunning = useRef(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  useEffect(() => {
    touchesRef.current = touches;
  }, [touches]);

  const handleTouchStart = (e) => {
    const active = e.nativeEvent.touches || [];
    if (active.some((t) => t.pageX < SWIPE_EDGE)) return;
    if (gameState === "result") return;

    const map = { ...touchesRef.current };
    active.forEach((t) => {
      const id = String(t.identifier);
      if (!map[id]) {
        const anim = new Animated.Value(1);
        animsRef.current[id] = anim;
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, { toValue: 1.2, duration: 600, useNativeDriver: true }),
            Animated.timing(anim, { toValue: 1, duration: 600, useNativeDriver: true }),
          ])
        ).start();
        map[id] = {
          x: t.pageX,
          y: t.pageY,
          color: FINGER_COLORS[Math.floor(Math.random() * FINGER_COLORS.length)],
        };
      }
    });

    setTouches(map);

    if (gameState === "intro" && Object.keys(map).length >= 2) {
      setGameState("playing");
      startCountdown();
    }
  };

  const handleTouchMove = (e) => {
    const active = e.nativeEvent.touches || [];
    if (active.some((t) => t.pageX < SWIPE_EDGE)) return;
    if (gameState === "result") return;

    const map = { ...touchesRef.current };
    active.forEach((t) => {
      const id = String(t.identifier);
      if (map[id]) {
        map[id] = { ...map[id], x: t.pageX, y: t.pageY };
      }
    });
    setTouches(map);
  };

  const handleTouchEnd = (e) => {
    if (gameState === "result") return;
    const active = e.nativeEvent.touches || [];
    const map = {};
    active.forEach((t) => {
      const id = String(t.identifier);
      if (touchesRef.current[id]) map[id] = touchesRef.current[id];
    });
    Object.keys(touchesRef.current).forEach((id) => {
      if (!map[id]) {
        animsRef.current[id]?.stopAnimation?.();
        delete animsRef.current[id];
      }
    });
    setTouches(map);

    if (gameState === "playing" && Object.keys(map).length === 0) {
      stopCountdown();
      resetGame();
    }
  };

  const startCountdown = () => {
    if (countdownRunning.current) return;
    countdownRunning.current = true;
    let time = 7;
    setCountdown(time);
    vibrateShort();

    countdownInterval.current = setInterval(() => {
      time -= 1;
      if (time <= 0) {
        clearInterval(countdownInterval.current);
        setCountdown(0);
        return;
      }
      setCountdown(time);
      vibrateShort();
    }, 1000);

    finishTimeout.current = setTimeout(pickWinner, 7000);
  };

  const stopCountdown = () => {
    countdownRunning.current = false;
    clearInterval(countdownInterval.current);
    clearTimeout(finishTimeout.current);
  };

  const pickWinner = () => {
    stopCountdown();
    const ids = Object.keys(touchesRef.current);
    if (!ids.length) return;
    const picked = ids[Math.floor(Math.random() * ids.length)];
    setWinnerId(picked);
    setQuestion(modeQuestions[Math.floor(Math.random() * modeQuestions.length)]);
    setGameState("result");
    vibrateLong();
  };

  const resetGame = () => {
    Object.values(animsRef.current).forEach((a) => a?.stopAnimation?.());
    animsRef.current = {};
    setTouches({});
    setWinnerId(null);
    setQuestion("");
    setCountdown(0);
    setGameState("intro");
  };

  return (
    <View
      style={styles.container}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={bgColors} style={StyleSheet.absoluteFill} />

      <Bubble size={50} left={30}       delay={0}    duration={16000} color={accent} />
      <Bubble size={30} left={150}      delay={3000} duration={20000} color={accent} />
      <Bubble size={70} left={width-90} delay={1500} duration={18000} color={accent} />
      <Bubble size={40} left={width-40} delay={5000} duration={22000} color={accent} />

      {/* Back button — only in intro */}
      {gameState === "intro" && (
        <Animated.View style={[styles.backWrap, { opacity: fadeAnim }]}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <View style={[styles.modePill, { backgroundColor: accent + "22", borderColor: accent + "55" }]}>
            <Text style={[styles.modeLabel, { color: accent }]}>{mode.toUpperCase()}</Text>
          </View>
        </Animated.View>
      )}

      {/* INTRO */}
      {gameState === "intro" && (
        <Animated.View style={[styles.center, { opacity: fadeAnim }]}>
          <Text style={styles.logo}>🤾</Text>
          <Text style={styles.title}>RISK IT</Text>
          <Text style={[styles.sub, { color: accent }]}>{mode.toUpperCase()} MODE</Text>
          <View style={styles.instructBox}>
            <Text style={styles.instruct}>Legg minst 2 fingre på skjermen for å starte</Text>
          </View>
          <Text style={styles.subSmall}>Maks 7 spillere</Text>
        </Animated.View>
      )}

      {/* PLAYING */}
      {gameState === "playing" && (
        <View style={styles.center} pointerEvents="none">
          <Text style={[styles.countdown, { color: accent + "30" }]}>{countdown}</Text>
        </View>
      )}

      {/* FINGER DOTS */}
      {Object.keys(touches).map((id) => {
        if (gameState === "result" && id !== winnerId) return null;
        const touch = touches[id];
        const anim = animsRef.current[id];
        const isWinner = id === winnerId;

        return (
          <Animated.View
            key={id}
            pointerEvents="none"
            style={[
              styles.fingerDot,
              {
                left: touch.x - 44,
                top: touch.y - 44,
                backgroundColor: touch.color,
                transform: [{ scale: anim || 1 }],
                ...(isWinner && gameState === "result" && {
                  width: 100, height: 100,
                  borderRadius: 50,
                  left: touch.x - 50,
                  top: touch.y - 50,
                  borderWidth: 3,
                  borderColor: "#fff",
                }),
              },
            ]}
          />
        );
      })}

      {/* RESULT */}
      {gameState === "result" && (
        <View style={styles.resultOverlay}>
          <View style={styles.resultCard}>
            <View style={[styles.resultAccent, { backgroundColor: accent }]} />
            <Text style={styles.resultLabel}>UTFORDRING</Text>
            <Text style={styles.resultQuestion}>{question}</Text>
            <TouchableOpacity
              style={[styles.continueBtn, { backgroundColor: accent }]}
              onPress={resetGame}
              activeOpacity={0.85}
            >
              <Text style={styles.continueBtnText}>Fortsett →</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeLink} onPress={() => navigation.popToTop()}>
              <Text style={styles.homeLinkText}>Avslutt spillet</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  backWrap: {
    position: "absolute", top: 56, left: 20, right: 20,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    zIndex: 10,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 0.5, borderColor: "rgba(255,255,255,0.12)",
    alignItems: "center", justifyContent: "center",
  },
  backText: { color: "#fff", fontSize: 18 },
  modePill: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 999, borderWidth: 1,
  },
  modeLabel: { fontSize: 13, fontWeight: "800", letterSpacing: 1 },

  center: {
    flex: 1, alignItems: "center", justifyContent: "center",
  },
  logo: { fontSize: 60, marginBottom: 8 },
  title: { color: "#fff", fontSize: 48, fontWeight: "900", letterSpacing: 3 },
  sub: { fontSize: 16, fontWeight: "800", letterSpacing: 2, marginBottom: 32 },
  instructBox: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 16, paddingHorizontal: 24, paddingVertical: 14,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 12,
  },
  instruct: { color: "rgba(255,255,255,0.7)", fontSize: 15, textAlign: "center", fontWeight: "600" },
  subSmall: { color: "rgba(255,255,255,0.25)", fontSize: 13 },

  countdown: {
    fontSize: 130, fontWeight: "900", letterSpacing: -4,
  },

  fingerDot: {
    position: "absolute",
    width: 88, height: 88, borderRadius: 44,
  },

  resultOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  resultCard: {
    width: width - 48,
    backgroundColor: "#13131F",
    borderRadius: 28, padding: 28,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  resultAccent: {
    position: "absolute", top: 0, left: 0, right: 0, height: 3,
  },
  resultLabel: {
    color: "rgba(255,255,255,0.3)", fontSize: 12,
    fontWeight: "700", letterSpacing: 2, marginBottom: 12,
  },
  resultQuestion: {
    color: "#fff", fontSize: 24, fontWeight: "900",
    lineHeight: 32, marginBottom: 24,
  },
  continueBtn: {
    borderRadius: 16, paddingVertical: 16,
    alignItems: "center", marginBottom: 10,
  },
  continueBtnText: { color: "#0B0B14", fontSize: 16, fontWeight: "900" },
  homeLink: { alignItems: "center", paddingVertical: 8 },
  homeLinkText: { color: "rgba(255,255,255,0.25)", fontSize: 13 },
});