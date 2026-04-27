import React, { useRef, useEffect, useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  Dimensions, Animated, StatusBar, Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const QUESTIONS = {
  chill: [
    "Jeg har aldri falt i søvn på offentlig transport",
    "Jeg har aldri spist en hel pizza alene",
    "Jeg har aldri løyet for å slippe å dra på en fest",
    "Jeg har aldri sendt en melding til feil person",
    "Jeg har aldri latt som jeg ikke hørte telefonen",
    "Jeg har aldri glemt en venns bursdag",
    "Jeg har aldri stukket av fra en kjedelig date",
    "Jeg har aldri spilt syk for å slippe jobb",
    "Jeg har aldri googlet meg selv",
    "Jeg har aldri latt som jeg lo av en vits jeg ikke skjønte",
    "Jeg har aldri sonet på en buss uten billett",
    "Jeg har aldri blitt kastet ut av et sted",
    "Jeg har aldri tatt selfie på do",
    "Jeg har aldri lest slutten av en bok først",
    "Jeg har aldri spionert på eksen sin Instagram",
    "Jeg har aldri tatt mat som ikke var min i kjøleskapet",
    "Jeg har aldri løyet om alderen min",
    "Jeg har aldri kansellert planer i siste sekund",
    "Jeg har aldri drukket melk rett fra kartongen",
    "Jeg har aldri snakket med meg selv høyt",
    "Jeg har aldri latt som jeg forstår en film jeg sov igjennom",
    "Jeg har aldri vunnet en argument jeg visste jeg hadde feil i",
    "Jeg har aldri ringt feil nummer og ikke sagt noe",
    "Jeg har aldri tatt en dobbel porsjon og sagt det var enkelt",
    "Jeg har aldri skulket en treningsøkt og løyet om det",
    "Jeg har aldri kjøpt noe dyrt og skjult det for familien",
    "Jeg har aldri angret på en tatovering eller piercing",
    "Jeg har aldri glemt navnet til noen jeg nettopp møtte",
    "Jeg har aldri later som jeg er opptatt for å unngå noen",
    "Jeg har aldri snust på maten min for å sjekke om den er dårlig",
    "Jeg har aldri stjålet godteri fra en butikk som barn",
    "Jeg har aldri vunnet et spill ved å jukse",
    "Jeg har aldri latt som jeg var travel for å se viktig ut",
    "Jeg har aldri sagt 'jeg er snart der' når jeg ikke engang hadde begynt å kle på meg",
    "Jeg har aldri unngått å svare på en melding i dagevis",
    "Jeg har aldri brukt andres sjampo uten å spørre",
    "Jeg har aldri latt som jeg ikke var hjemme når noen banket på",
    "Jeg har aldri stekt mat på hytta og skyldt på noen andre",
    "Jeg har aldri tatt en matboks fra jobben som ikke var min",
    "Jeg har aldri latt som jeg likte en gave jeg hatet",
  ],
  drunk: [
    "Jeg har aldri kysset noen jeg møtte samme kveld",
    "Jeg har aldri sendt en melding til eksen full om natten",
    "Jeg har aldri danset på et bord",
    "Jeg har aldri drukket til jeg kastet opp",
    "Jeg har aldri hatt one night stand",
    "Jeg har aldri flørtet med noen for å få gratis drikke",
    "Jeg har aldri sovnet på et toalett på fest",
    "Jeg har aldri tatt en drink fra en fremmed",
    "Jeg har aldri kranglet med noen full og fullstendig glemt det dagen etter",
    "Jeg har aldri ringt eksen full og angret på det",
    "Jeg har aldri kysset vennen til en kompis",
    "Jeg har aldri gått hjem med noen jeg ikke burde",
    "Jeg har aldri løyet om hvor full jeg var for foreldrene mine",
    "Jeg har aldri begynt en fest på formiddagen",
    "Jeg har aldri drukket alene hjemme på en mandag",
    "Jeg har aldri bestilt mat full som kostet skjorta",
    "Jeg har aldri mistet telefonen på fest",
    "Jeg har aldri blitt båret hjem av venner",
    "Jeg har aldri kledd av meg på feil sted",
    "Jeg har aldri kysset noen av samme kjønn",
    "Jeg har aldri blitt tatt av politiet full",
    "Jeg har aldri sloss på en fest",
    "Jeg har aldri gjort noe pinlig full og later som det aldri skjedde",
    "Jeg har aldri hatt et hemmelig forhold",
    "Jeg har aldri brukt noen andre sin ID",
    "Jeg har aldri drukket noe direkte fra flasken på fest",
    "Jeg har aldri blitt forbudt å gå inn på en bar",
    "Jeg har aldri kyss noen på nyttårsaften jeg ikke ville kysse edru",
    "Jeg har aldri smykket meg av klær fra en annen",
    "Jeg har aldri drukket på jobben eller skolen",
    "Jeg har aldri gjort en walkofshame i andres klær",
    "Jeg har aldri overnattet hos noen uten å huske å bestemme det",
    "Jeg har aldri løyet om antall partnere",
    "Jeg har aldri flørtet med en venn sin kjæreste",
    "Jeg har aldri tapt klær i et drikkespill",
    "Jeg har aldri danset så mye at jeg mistet skoen",
    "Jeg har aldri lagt igjen noe verdifullt på en bar",
    "Jeg har aldri blitt utestengt fra et utested",
    "Jeg har aldri skrevet noe ekkelt på noen sin Facebook full",
    "Jeg har aldri forsøkt å kysse noen som ikke ville det",
  ],
  nasj: [
    "Jeg har aldri hatt sex på en offentlig plass",
    "Jeg har aldri sett på andres telefon uten å spørre",
    "Jeg har aldri hatt sex mens noen andre var i rommet",
    "Jeg har aldri sendt nakenbilder",
    "Jeg har aldri vært tredjehjulet med vilje",
    "Jeg har aldri hatt sex på første date",
    "Jeg har aldri hatt to relasjonar på en gang",
    "Jeg har aldri lurt noen til å tro de var eksklusivt med meg",
    "Jeg har aldri hatt sex i et fremmed hus uten å vite hvem som eier det",
    "Jeg har aldri hatt en affære",
    "Jeg har aldri ligget med sjefen min eller en ansatt",
    "Jeg har aldri hatt sexting med en fremmed",
    "Jeg har aldri filmet meg selv uten å planlegge det",
    "Jeg har aldri hatt sex i en bil",
    "Jeg har aldri hatt sex på en strandfest",
    "Jeg har aldri løyet om å bruke prevensjon",
    "Jeg har aldri hatt sex med en kompis sin ex",
    "Jeg har aldri brukt dating-app bare for å se om noen jeg kjenner er der",
    "Jeg har aldri betalt for sex eller blitt betalt",
    "Jeg har aldri hatt et crush på en gift person og handlet på det",
    "Jeg har aldri postet noe seksuelt på nett",
    "Jeg har aldri hatt sex på jobb",
    "Jeg har aldri hatt en situasjonship som ble altfor komplisert",
    "Jeg har aldri nektet å innrømme at noe var et forhold",
    "Jeg har aldri hatt sex med to fra samme vennegjengen",
    "Jeg har aldri slettet beviser fra telefonen min",
    "Jeg har aldri spilt på følelsene til noen for å få noe",
    "Jeg har aldri brukt noen bare for sex og vært ærlig om det",
    "Jeg har aldri hatt en one night stand med noen jeg kjente godt fra før",
    "Jeg har aldri hatt sex mens jeg var i et forhold med noen andre",
    "Jeg har aldri hatt sex på et hotellrom som ikke var mitt",
    "Jeg har aldri sagt 'jeg elsker deg' for å komme meg ut av en situasjon",
    "Jeg har aldri hatt sex uten å huske det",
    "Jeg har aldri blitt tatt på fersken av noen",
    "Jeg har aldri delt en seng med noen uten at noe skjedde, men ville gjerne",
    "Jeg har aldri hatt en threesome",
    "Jeg har aldri ghostet noen etter sex",
    "Jeg har aldri sagt et annet navn under sex",
    "Jeg har aldri hatt sex med noen mer enn 10 år eldre eller yngre",
    "Jeg har aldri hatt sex med noen jeg ikke likte som person",
  ],
  blasted: [
    "Jeg har aldri tatt bilder av noen uten at de visste det",
    "Jeg har aldri hacket noen sin konto",
    "Jeg har aldri stjålet fra en butikk som voksen",
    "Jeg har aldri fått betalt for noe ulovlig",
    "Jeg har aldri prøvd narkotika",
    "Jeg har aldri kjørt for fort og risikert andres liv",
    "Jeg har aldri solgt noe jeg ikke eide",
    "Jeg har aldri lurt noen ut av penger",
    "Jeg har aldri vært med på noe kriminelt",
    "Jeg har aldri sett på noe jeg skammer meg over på nett",
    "Jeg har aldri brukt noen andres penger uten å spørre",
    "Jeg har aldri hatt sex mot betaling",
    "Jeg har aldri lekt med noens følelser med vilje i lang tid",
    "Jeg har aldri ødelagt noe verdifullt for noen med vilje",
    "Jeg har aldri spredt et rykte som var løgn",
    "Jeg har aldri tatt hevn på en ex på en måte jeg angrer på",
    "Jeg har aldri lyst på noen i dette rommet men ikke sagt det",
    "Jeg har aldri gjort noe seksuelt som jeg aldri har fortalt noen",
    "Jeg har aldri vært med på et trekant mot min vilje",
    "Jeg har aldri gjort noe foran et kamera som kan ødelegge karrieren min",
    "Jeg har aldri prøvd noe seksuelt som er ulovlig",
    "Jeg har aldri vært involvert i et slagsmål som endte med politi",
    "Jeg har aldri solgt nakenbilder",
    "Jeg har aldri drukket og kjørt",
    "Jeg har aldri tatt en overdose av noe",
    "Jeg har aldri blitt utpresset for noe",
    "Jeg har aldri bedradd noen i et seriøst forhold",
    "Jeg har aldri gjort noe jeg ikke husker som skadet noen andre",
    "Jeg har aldri stjålet en kjæreste fra en bestevenn",
    "Jeg har aldri løyet til politiet",
    "Jeg har aldri mobbet noen hardt som barn og aldri bedt om unnskyldning",
    "Jeg har aldri truet noen",
    "Jeg har aldri gjort noe seksuelt med noen som sov",
    "Jeg har aldri vært med på noe jeg visste var galt men ble med uansett",
    "Jeg har aldri hatt sex mot betaling og likt det",
    "Jeg har aldri løyet i retten eller til politiet",
    "Jeg har aldri gjort noe som jeg vet at ville sjokkere alle i dette rommet",
    "Jeg har aldri hjulpet noen med å skjule noe ulovlig",
    "Jeg har aldri filmet sex uten tillatelse",
    "Jeg har aldri gjort noe som ingen i verden vet om",
  ],
};

const MODE_STYLE = {
  chill:   { color: "#4ade80", bg: ["#0a1a0e", "#0f2a14"], label: "Chill", emoji: "😊" },
  drunk:   { color: "#60a5fa", bg: ["#080f1a", "#0a1f3a"], label: "Drunk", emoji: "🍻" },
  nasj:    { color: "#fb923c", bg: ["#1a0e08", "#2a1508"], label: "Nasj",  emoji: "🔥" },
  blasted: { color: "#f87171", bg: ["#1a0808", "#2a0f0f"], label: "Blasted", emoji: "💀" },
};

export default function NeverHaveIEverScreen({ navigation, route }) {
  const playerName = route?.params?.playerName || "Player";
  const mode = route?.params?.mode || "chill";
  const style = MODE_STYLE[mode] || MODE_STYLE.chill;

  const allQuestions = [...QUESTIONS[mode]].sort(() => Math.random() - 0.5);

  const [index, setIndex] = useState(0);
  const [sips, setSips] = useState(0);
  const [done, setDone] = useState(false);
  const [choice, setChoice] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const cardAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (index + 1) / allQuestions.length,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [index]);

  const animateCard = (callback) => {
    Animated.sequence([
      Animated.timing(cardAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
    ]).start(() => {
      callback();
      Animated.timing(cardAnim, { toValue: 1, duration: 220, useNativeDriver: true }).start();
    });
  };

  const handleChoice = (hasDone) => {
    setChoice(hasDone);
    if (hasDone) setSips((s) => s + 1);

    setTimeout(() => {
      animateCard(() => {
        setChoice(null);
        if (index + 1 >= allQuestions.length) {
          setDone(true);
        } else {
          setIndex((i) => i + 1);
        }
      });
    }, 600);
  };

  const restart = () => {
    setIndex(0);
    setSips(0);
    setDone(false);
    setChoice(null);
  };

  if (done) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={style.bg} style={StyleSheet.absoluteFill} />
        <View style={styles.doneWrap}>
          <Text style={styles.doneEmoji}>🎉</Text>
          <Text style={styles.doneTitle}>Ferdig!</Text>
          <Text style={styles.doneSub}>
            {playerName} tok <Text style={[styles.doneSips, { color: style.color }]}>{sips} slurker</Text> denne runden
          </Text>
          <TouchableOpacity style={[styles.doneBtn, { borderColor: style.color }]} onPress={restart}>
            <Text style={[styles.doneBtnText, { color: style.color }]}>Spill igjen 🔄</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.doneHome} onPress={() => navigation.popToTop()}>
            <Text style={styles.doneHomeText}>Tilbake til hjem</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const question = allQuestions[index];

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
          <View style={styles.sipCount}>
            <Text style={styles.sipEmoji}>🍺</Text>
            <Text style={[styles.sipNum, { color: style.color }]}>{sips}</Text>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressWrap}>
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
          <Text style={styles.progressText}>{index + 1} / {allQuestions.length}</Text>
        </View>

        {/* Card */}
        <View style={styles.cardArea}>
          <Animated.View style={[styles.card, { opacity: cardAnim, transform: [{ scale: cardAnim }] }]}>
            <View style={[styles.cardAccent, { backgroundColor: style.color }]} />
            <Text style={styles.cardLabel}>Jeg har aldri...</Text>
            <Text style={styles.cardQuestion}>
              {question.replace("Jeg har aldri ", "")}
            </Text>

            {choice !== null && (
              <View style={[
                styles.choiceIndicator,
                { backgroundColor: choice ? style.color + "22" : "rgba(255,255,255,0.05)" }
              ]}>
                <Text style={styles.choiceIndicatorText}>
                  {choice ? `+1 slurk 🍺` : "Skippa! 👏"}
                </Text>
              </View>
            )}
          </Animated.View>
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[styles.btn, styles.btnNo]}
            onPress={() => handleChoice(false)}
            activeOpacity={0.85}
            disabled={choice !== null}
          >
            <Text style={styles.btnNoIcon}>✋</Text>
            <Text style={styles.btnNoText}>Aldri gjort</Text>
            <Text style={styles.btnNoSub}>Ingen slurk</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btnYes, { backgroundColor: style.color + "22", borderColor: style.color + "55" }]}
            onPress={() => handleChoice(true)}
            activeOpacity={0.85}
            disabled={choice !== null}
          >
            <Text style={styles.btnYesIcon}>🍺</Text>
            <Text style={[styles.btnYesText, { color: style.color }]}>Har gjort det</Text>
            <Text style={styles.btnYesSub}>Ta en slurk!</Text>
          </TouchableOpacity>
        </View>

        {/* Skip */}
        <TouchableOpacity
          style={styles.skipBtn}
          onPress={() => animateCard(() => {
            setChoice(null);
            if (index + 1 >= allQuestions.length) setDone(true);
            else setIndex((i) => i + 1);
          })}
          disabled={choice !== null}
        >
          <Text style={styles.skipText}>Hopp over →</Text>
        </TouchableOpacity>

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
    paddingTop: 56, marginBottom: 20,
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
  modeEmoji: { fontSize: 16 },
  modeLabel: { fontSize: 13, fontWeight: "800" },
  sipCount: {
    flexDirection: "row", alignItems: "center", gap: 5,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 0.5, borderColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999,
  },
  sipEmoji: { fontSize: 14 },
  sipNum: { fontSize: 15, fontWeight: "900" },

  progressWrap: {
    flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 28,
  },
  progressBg: {
    flex: 1, height: 4, backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 2, overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 2 },
  progressText: { color: "rgba(255,255,255,0.3)", fontSize: 12, fontWeight: "700" },

  cardArea: { flex: 1, justifyContent: "center" },
  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 28, padding: 32,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  cardAccent: {
    position: "absolute", top: 0, left: 0, right: 0, height: 3,
  },
  cardLabel: {
    color: "rgba(255,255,255,0.35)", fontSize: 14,
    fontWeight: "700", marginBottom: 16, letterSpacing: 0.5,
  },
  cardQuestion: {
    color: "#fff", fontSize: 26, fontWeight: "900",
    lineHeight: 34,
  },
  choiceIndicator: {
    marginTop: 20, borderRadius: 12, padding: 12, alignItems: "center",
  },
  choiceIndicatorText: { color: "#fff", fontWeight: "800", fontSize: 15 },

  btnRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  btn: {
    flex: 1, borderRadius: 20, padding: 18,
    alignItems: "center", borderWidth: 1,
  },
  btnNo: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderColor: "rgba(255,255,255,0.1)",
  },
  btnNoIcon: { fontSize: 26, marginBottom: 6 },
  btnNoText: { color: "#fff", fontWeight: "900", fontSize: 14 },
  btnNoSub: { color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 3 },
  btnYes: {},
  btnYesIcon: { fontSize: 26, marginBottom: 6 },
  btnYesText: { fontWeight: "900", fontSize: 14 },
  btnYesSub: { color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 3 },

  skipBtn: { alignItems: "center", paddingBottom: 40, paddingTop: 4 },
  skipText: { color: "rgba(255,255,255,0.2)", fontSize: 13, fontWeight: "700" },

  doneWrap: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
  doneEmoji: { fontSize: 64, marginBottom: 16 },
  doneTitle: { color: "#fff", fontSize: 40, fontWeight: "900", marginBottom: 8 },
  doneSub: { color: "rgba(255,255,255,0.5)", fontSize: 16, textAlign: "center", lineHeight: 24, marginBottom: 40 },
  doneSips: { fontWeight: "900" },
  doneBtn: {
    width: "100%", borderRadius: 20, borderWidth: 1.5,
    paddingVertical: 18, alignItems: "center", marginBottom: 14,
  },
  doneBtnText: { fontSize: 16, fontWeight: "900" },
  doneHome: { paddingVertical: 12 },
  doneHomeText: { color: "rgba(255,255,255,0.25)", fontSize: 14 },
});