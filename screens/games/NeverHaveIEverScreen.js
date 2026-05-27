import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const ROUND_SIZE = 25;

const QUESTIONS = {
  chill: [
    "Jeg har aldri stjelet noe",
    "Jeg har aldri sendt fylla meldinger til en jeg ikke burde",
    "Jeg har aldri vært utro",
    "Jeg har aldri vært på en yacht",
    "Jeg har aldri slått noen",
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
    "Jeg har aldri stålet drinken til en annen, ute",
    "Jeg har aldri stjålet en bil",
    "Jeg har aldri røyket weed",
    "Jeg har aldri prøvd hardere stoffer",
    "Jeg har aldri gått på date med forskjellige, samme dag",
    "Jeg har aldri vært høy foran foreldrene mine",
    "Jeg har aldri spilt sjakk mens jeg var beruset",
    "Jeg har aldri ranet noen",
    "Jeg har aldri hatt flere fuckfriends",
    "Jeg har aldri hatt en crazy fling / ex",
    "Jeg har aldri blackout",
    "Jeg har aldri strippet",
    "Jeg har aldri utført cosplay",
    "Jeg har aldri hatt sex i skogen",
    "Jeg har aldri hatt sex i bilen",
    "Jeg har aldri fått oralsex på et offentlig sted",
    "Jeg har aldri vært en player",
    "Jeg har aldri løyet om alderen",
    "Jeg har aldri sendt en pickupline",
    "Jeg har aldri flørtet med en stygg",
    "Jeg har aldri våknet hos en og angret",
    "Jeg har aldri løyet for å få sex",
    "Jeg har aldri ligget med en på 40+",
    "Jeg har aldri hatt en kink ingen her skal få vite",
    "Jeg har aldri winget en",
    "Jeg har aldri løyet om antall partnere",
    "Jeg har aldri flørtet med en venn sin kjæreste",
    "Jeg har aldri spilt dette spillet",
    "Jeg har aldri vært i Korea",
    "Jeg har aldri utført BDSM",
    "Jeg har aldri blitt utestengt fra et utested",
    "Jeg har aldri vært en hater i koemmentarfeltet",
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
    "Jeg har aldri fantasert om en i dette rommet",
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

const shuffle = (arr) => {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

const cleanQuestion = (question) => {
  return question.replace(/^Jeg har aldri\s+/i, "");
};

export default function NeverHaveIEverScreen({ navigation, route }) {
  const playerName = route?.params?.playerName || "Player";
  const mode = route?.params?.mode || "chill";
  const style = MODE_STYLE[mode] || MODE_STYLE.chill;

  const createDeck = () => {
    const questions = QUESTIONS[mode] || QUESTIONS.chill;
    return shuffle(questions).slice(0, ROUND_SIZE);
  };

  const [deck, setDeck] = useState(createDeck);
  const [index, setIndex] = useState(0);
  const [sips, setSips] = useState(0);
  const [done, setDone] = useState(false);
  const [choice, setChoice] = useState(null);
  const [locked, setLocked] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(28)).current;
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const cardSlide = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(1 / Math.max(deck.length, 1))).current;

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
          duration: 1900,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (index + 1) / Math.max(deck.length, 1),
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [index, deck.length]);

  const goNext = () => {
    Animated.parallel([
      Animated.timing(cardOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(cardSlide, {
        toValue: -35,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.spring(cardScale, {
        toValue: 0.985,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (index + 1 >= deck.length) {
        setDone(true);
        setLocked(false);
        return;
      }

      setIndex((prev) => prev + 1);
      setChoice(null);

      cardSlide.setValue(35);
      cardScale.setValue(1);

      Animated.parallel([
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 230,
          useNativeDriver: true,
        }),
        Animated.timing(cardSlide, {
          toValue: 0,
          duration: 230,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setLocked(false);
      });
    });
  };

  const handleChoice = (hasDone) => {
    if (locked) return;

    setLocked(true);
    setChoice(hasDone);

    if (hasDone) {
      setSips((prev) => prev + 1);
    }

    setTimeout(goNext, 650);
  };

  const skipQuestion = () => {
    if (locked) return;
    setLocked(true);
    setChoice(null);
    goNext();
  };

  const restart = () => {
    const newDeck = createDeck();

    setDeck(newDeck);
    setIndex(0);
    setSips(0);
    setDone(false);
    setChoice(null);
    setLocked(false);

    cardOpacity.setValue(1);
    cardSlide.setValue(0);
    cardScale.setValue(1);
    progressAnim.setValue(1 / Math.max(newDeck.length, 1));
  };

  const floatY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  if (done) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <LinearGradient
          colors={style.bg}
          locations={[0, 0.48, 1]}
          style={StyleSheet.absoluteFill}
        />

        <View style={[styles.colorBlob, { backgroundColor: style.soft }]} />

        <LinearGradient
          colors={["rgba(5,7,17,0)", "#050711"]}
          style={styles.darkFade}
        />

        <View style={styles.doneWrap}>
          <Animated.View
            style={[
              styles.doneIconWrap,
              {
                transform: [{ translateY: floatY }, { rotate: "-8deg" }],
              },
            ]}
          >
            <Text style={styles.doneEmoji}>🍻</Text>
          </Animated.View>

          <Text style={styles.doneTitle}>Runden er ferdig!</Text>

          <Text style={styles.doneSub}>
            {playerName} tok{" "}
            <Text style={[styles.doneHighlight, { color: style.color }]}>
              {sips} slurker
            </Text>
            {"\n"}denne runden
          </Text>

          <TouchableOpacity activeOpacity={0.9} style={styles.restartBtn} onPress={restart}>
            <LinearGradient
              colors={[style.color, "#B92BFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.restartGradient}
            >
              <Text style={styles.restartText}>SPILL IGJEN 🔄</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.popToTop()}>
            <Text style={styles.homeText}>← Tilbake til hjem</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const question = deck[index];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={style.bg}
        locations={[0, 0.48, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.colorBlob, { backgroundColor: style.soft }]} />

      <LinearGradient
        colors={["rgba(5,7,17,0)", "#050711"]}
        style={styles.darkFade}
      />

      <Animated.View
        style={[
          styles.inner,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <View style={[styles.modePill, { borderColor: `${style.color}35` }]}>
            <Text style={styles.modeEmoji}>{style.emoji}</Text>
            <Text style={[styles.modeLabel, { color: style.color }]}>{style.label}</Text>
          </View>

          <View style={styles.sipPill}>
            <Text style={styles.sipEmoji}>🍺</Text>
            <Text style={[styles.sipNumber, { color: style.color }]}>{sips}</Text>
          </View>
        </View>

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

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>NEVER HAVE I EVER</Text>

          <Text style={styles.heroTitle}>
            Drink if{"\n"}you have
          </Text>

          <Text style={styles.heroSub}>
            Svar ærlig. Har du gjort det, tar du en slurk.
          </Text>

          <Animated.View
            pointerEvents="none"
            style={[
              styles.heroIconWrap,
              {
                transform: [{ translateY: floatY }, { rotate: "-8deg" }],
              },
            ]}
          >
            <Text style={styles.heroIcon}>🍻</Text>
          </Animated.View>
        </View>

        <View style={styles.cardArea}>
          <View style={[styles.cardBackLayer, { borderColor: `${style.color}18` }]} />

          <Animated.View
            style={[
              styles.card,
              {
                opacity: cardOpacity,
                transform: [{ translateY: cardSlide }, { scale: cardScale }],
                borderColor: `${style.color}30`,
              },
            ]}
          >
            <View style={[styles.cardTopLine, { backgroundColor: style.color }]} />

            <Text style={[styles.cardLabel, { color: style.color }]}>
              JEG HAR ALDRI...
            </Text>

            <Text style={styles.questionText}>{cleanQuestion(question)}</Text>

            {choice !== null && (
              <View
                style={[
                  styles.choiceBadge,
                  {
                    backgroundColor: choice
                      ? `${style.color}22`
                      : "rgba(255,255,255,0.06)",
                  },
                ]}
              >
                <Text style={styles.choiceBadgeText}>
                  {choice ? "+1 slurk 🍺" : "Aldri gjort ✋"}
                </Text>
              </View>
            )}
          </Animated.View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            activeOpacity={0.88}
            disabled={locked}
            style={styles.noBtn}
            onPress={() => handleChoice(false)}
          >
            <Text style={styles.buttonEmoji}>✋</Text>
            <Text style={styles.noBtnText}>ALDRI</Text>
            <Text style={styles.buttonSub}>Ingen slurk</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            disabled={locked}
            style={styles.yesBtn}
            onPress={() => handleChoice(true)}
          >
            <LinearGradient
              colors={[style.color, "#B92BFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.yesGradient}
            >
              <Text style={styles.buttonEmoji}>🍺</Text>
              <Text style={styles.yesBtnText}>HAR GJORT</Text>
              <Text style={styles.yesBtnSub}>Ta en slurk</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity disabled={locked} onPress={skipQuestion} style={styles.skipBtn}>
          <Text style={styles.skipText}>Hopp over →</Text>
        </TouchableOpacity>
      </Animated.View>
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
    width: width * 1.22,
    height: width * 1.22,
    borderRadius: width,
  },

  darkFade: {
    position: "absolute",
    top: height * 0.36,
    left: 0,
    right: 0,
    height: height * 0.5,
  },

  inner: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 56,
    paddingBottom: 34,
  },

  topBar: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  backBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.09)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.13)",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "900",
    marginTop: -2,
  },

  modePill: {
    height: 52,
    paddingHorizontal: 18,
    borderRadius: 30,
    backgroundColor: "rgba(6, 8, 20, 0.82)",
    borderWidth: 1,
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

  sipPill: {
    height: 52,
    minWidth: 52,
    borderRadius: 26,
    backgroundColor: "rgba(6, 8, 20, 0.82)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    flexDirection: "row",
  },

  sipEmoji: {
    fontSize: 15,
    marginRight: 5,
  },

  sipNumber: {
    fontSize: 14,
    fontWeight: "900",
  },

  progressBg: {
    height: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    marginBottom: 34,
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
  },

  hero: {
    minHeight: 220,
    justifyContent: "flex-end",
    position: "relative",
    marginBottom: 24,
  },

  eyebrow: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 3.2,
    marginBottom: 18,
  },

  heroTitle: {
    color: "#fff",
    fontSize: 48,
    lineHeight: 53,
    fontWeight: "900",
    letterSpacing: -1.8,
  },

  heroSub: {
    marginTop: 18,
    maxWidth: width * 0.67,
    color: "rgba(255,255,255,0.62)",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "800",
  },

  heroIconWrap: {
    position: "absolute",
    right: -12,
    bottom: 4,
  },

  heroIcon: {
    fontSize: 116,
    opacity: 0.92,
  },

  cardArea: {
    flex: 1,
    justifyContent: "center",
    minHeight: 250,
  },

  cardBackLayer: {
    position: "absolute",
    left: 12,
    right: 12,
    top: 22,
    bottom: 4,
    borderRadius: 32,
    backgroundColor: "rgba(8,11,25,0.42)",
    borderWidth: 1,
    transform: [{ rotate: "-2deg" }],
  },

  card: {
    minHeight: 260,
    borderRadius: 32,
    backgroundColor: "rgba(8,11,25,0.82)",
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 28,
    overflow: "hidden",
    justifyContent: "center",
  },

  cardTopLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },

  cardLabel: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2.4,
    marginBottom: 22,
    textAlign: "center",
  },

  questionText: {
    color: "#fff",
    fontSize: 31,
    lineHeight: 39,
    fontWeight: "900",
    letterSpacing: -0.9,
    textAlign: "center",
  },

  choiceBadge: {
    marginTop: 22,
    alignSelf: "center",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },

  choiceBadgeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "900",
  },

  buttonRow: {
    flexDirection: "row",
    gap: 14,
    marginTop: 22,
  },

  noBtn: {
    flex: 1,
    height: 92,
    borderRadius: 24,
    backgroundColor: "rgba(8,11,25,0.82)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },

  yesBtn: {
    flex: 1,
    height: 92,
    borderRadius: 24,
    overflow: "hidden",
  },

  yesGradient: {
    flex: 1,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonEmoji: {
    fontSize: 25,
    marginBottom: 5,
  },

  noBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1,
  },

  yesBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1,
  },

  buttonSub: {
    color: "rgba(255,255,255,0.38)",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 3,
  },

  yesBtnSub: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 3,
  },

  skipBtn: {
    alignItems: "center",
    paddingTop: 18,
    paddingBottom: 4,
  },

  skipText: {
    color: "rgba(255,255,255,0.38)",
    fontSize: 14,
    fontWeight: "800",
  },

  doneWrap: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  doneIconWrap: {
    width: 120,
    height: 120,
    borderRadius: 36,
    backgroundColor: "rgba(8,11,25,0.82)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  doneEmoji: {
    fontSize: 70,
  },

  doneTitle: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "900",
    letterSpacing: -1.5,
    marginBottom: 12,
    textAlign: "center",
  },

  doneSub: {
    textAlign: "center",
    color: "rgba(255,255,255,0.55)",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
  },

  doneHighlight: {
    fontWeight: "900",
  },

  restartBtn: {
    width: "100%",
    height: 60,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 14,
  },

  restartGradient: {
    flex: 1,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  restartText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  homeBtn: {
    paddingVertical: 12,
  },

  homeText: {
    color: "rgba(255,255,255,0.42)",
    fontSize: 14,
    fontWeight: "800",
  },
});