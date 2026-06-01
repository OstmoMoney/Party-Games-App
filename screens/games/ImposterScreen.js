import React, { useRef, useEffect, useState } from "react";
import { t } from "../../i18n";
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
  chill: {
    no: [
      { word: "Kebab", hint: "Grillmat" },
      { word: "Russ", hint: "Mai" },
      { word: "Hytte", hint: "Fjell" },
      { word: "Grandiosa", hint: "Frysepizza" },
      { word: "Vinmonopolet", hint: "Statlig" },
      { word: "Brunost", hint: "Norsk" },
      { word: "Bunad", hint: "17. mai" },
      { word: "Trikk", hint: "Skinner" },
      { word: "Rema 1000", hint: "Butikk" },
      { word: "Fjellferie", hint: "Ski" },
      { word: "Fotball", hint: "Gress" },
      { word: "Netflix", hint: "Serier" },
      { word: "TikTok", hint: "Korte klipp" },
      { word: "Snapchat", hint: "Historier" },
      { word: "Instagram", hint: "Bilder" },
      { word: "Spotify", hint: "Musikk" },
      { word: "Treningssenteret", hint: "Vekter" },
      { word: "Kaffebar", hint: "Latte" },
      { word: "Tatovering", hint: "Blekk" },
      { word: "Hund", hint: "Bjeffer" },
      { word: "Katt", hint: "Mjauer" },
      { word: "Sushi", hint: "Japan" },
      { word: "Sjokolade", hint: "Søtt" },
      { word: "Solbriller", hint: "Sommer" },
      { word: "Pass", hint: "Reise" },
      { word: "Hodetelefoner", hint: "Musikk" },
      { word: "Joggesko", hint: "Nike" },
      { word: "Bursdag", hint: "Kake" },
      { word: "Roadtrip", hint: "Bil" },
      { word: "Karaoke", hint: "Mikrofon" },
      { word: "Boblebad", hint: "Bobler" },
      { word: "Camping", hint: "Telt" },
      { word: "Yoga", hint: "Strekk" },
      { word: "Poker", hint: "Kort" },
      { word: "Badstu", hint: "Varmt" },
      { word: "Brunch", hint: "Helg" },
      { word: "Ikea", hint: "Møbler" },
      { word: "McDonald's", hint: "Hurtigmat" },
      { word: "Løpesko", hint: "Maraton" },
      { word: "Brettspill", hint: "Terning" },
    ],
    en: [
      { word: "iPhone", hint: "Apple" },
      { word: "Netflix", hint: "Series" },
      { word: "Spotify", hint: "Music" },
      { word: "Pizza", hint: "Cheese" },
      { word: "Instagram", hint: "Photos" },
      { word: "McDonald's", hint: "Fast food" },
      { word: "Ikea", hint: "Furniture" },
      { word: "YouTube", hint: "Videos" },
      { word: "Snapchat", hint: "Stories" },
      { word: "TikTok", hint: "Short clips" },
      { word: "Starbucks", hint: "Coffee" },
      { word: "Airbnb", hint: "Travel" },
      { word: "Amazon", hint: "Shopping" },
      { word: "Google Maps", hint: "Navigation" },
      { word: "Uber", hint: "Ride" },
      { word: "Sushi", hint: "Japan" },
      { word: "Gym", hint: "Weights" },
      { word: "Hiking", hint: "Nature" },
      { word: "Cat", hint: "Meow" },
      { word: "Dog", hint: "Bark" },
      { word: "Coffee", hint: "Morning" },
      { word: "Chocolate", hint: "Sweet" },
      { word: "Sunglasses", hint: "Summer" },
      { word: "Passport", hint: "Travel" },
      { word: "Headphones", hint: "Music" },
      { word: "Laptop", hint: "Work" },
      { word: "Sneakers", hint: "Nike" },
      { word: "Birthday cake", hint: "Candles" },
      { word: "Road trip", hint: "Car" },
      { word: "Karaoke", hint: "Microphone" },
      { word: "Tattoo", hint: "Ink" },
      { word: "Hot tub", hint: "Bubbles" },
      { word: "Brunch", hint: "Weekend" },
      { word: "Camping", hint: "Tent" },
      { word: "Yoga", hint: "Stretching" },
      { word: "Poker", hint: "Cards" },
      { word: "Sauna", hint: "Heat" },
      { word: "Rollercoaster", hint: "Amusement park" },
      { word: "Board game", hint: "Dice" },
    ],
  },
  date: {
    no: [
      { word: "Første kyss", hint: "Nerver" },
      { word: "Blind date", hint: "Ukjent" },
      { word: "Restaurantdate", hint: "Stearinlys" },
      { word: "Hjertebank", hint: "Følelse" },
      { word: "Kompliment", hint: "Søtt" },
      { word: "Håndholding", hint: "Varmt" },
      { word: "Sommerfugler", hint: "Magen" },
      { word: "Solnedgangstur", hint: "Romantisk" },
      { word: "Serenade", hint: "Sang" },
      { word: "Røde roser", hint: "Blomst" },
      { word: "Stjernetitting", hint: "Natt" },
      { word: "Piknik", hint: "Park" },
      { word: "Dansetime", hint: "Nær" },
      { word: "Overraskelse", hint: "Uventet" },
      { word: "Kjærlighetsbrev", hint: "Håndskrevet" },
      { word: "Felles hemmelighet", hint: "Bare oss" },
      { word: "Kveldstur", hint: "Gåtur" },
      { word: "Intimt øyeblikk", hint: "Nært" },
      { word: "Flørting", hint: "Øyekontakt" },
      { word: "Sårbar", hint: "Åpen" },
      { word: "Tillit", hint: "Trygg" },
      { word: "Lengt", hint: "Savnet" },
      { word: "Sjalu", hint: "Grønn" },
      { word: "Forelsket", hint: "Lykkelig" },
      { word: "Hjertesorg", hint: "Trist" },
      { word: "Eksklusiv", hint: "Bare hverandre" },
      { word: "Fremtidsdrøm", hint: "Sammen" },
      { word: "Klemme", hint: "Nær" },
      { word: "Løfte", hint: "Ord" },
      { word: "Morgenkaffe", hint: "To kopper" },
      { word: "Felles playlist", hint: "Musikk" },
      { word: "Innedag", hint: "Sofa" },
      { word: "Nettfliks", hint: "Teppe" },
      { word: "Tekstmelding", hint: "Venter på svar" },
      { word: "Øyekontakt", hint: "Sekunder" },
    ],
    en: [
      { word: "First kiss", hint: "Nervous" },
      { word: "Blind date", hint: "Stranger" },
      { word: "Candlelit dinner", hint: "Romantic" },
      { word: "Butterflies", hint: "Stomach" },
      { word: "Compliment", hint: "Sweet" },
      { word: "Holding hands", hint: "Warm" },
      { word: "Sunset walk", hint: "Golden hour" },
      { word: "Serenade", hint: "Song" },
      { word: "Red roses", hint: "Flower" },
      { word: "Stargazing", hint: "Night" },
      { word: "Picnic", hint: "Park" },
      { word: "Slow dance", hint: "Close" },
      { word: "Surprise", hint: "Unexpected" },
      { word: "Love letter", hint: "Handwritten" },
      { word: "Shared secret", hint: "Just us" },
      { word: "Evening stroll", hint: "Walking" },
      { word: "Intimate moment", hint: "Close" },
      { word: "Flirting", hint: "Eye contact" },
      { word: "Vulnerable", hint: "Open" },
      { word: "Trust", hint: "Safe" },
      { word: "Longing", hint: "Missing" },
      { word: "Jealousy", hint: "Green" },
      { word: "Falling in love", hint: "Happy" },
      { word: "Heartbreak", hint: "Sad" },
      { word: "Exclusive", hint: "Just us" },
      { word: "Future plans", hint: "Together" },
      { word: "Hug", hint: "Close" },
      { word: "Promise", hint: "Words" },
      { word: "Morning coffee", hint: "Two cups" },
      { word: "Shared playlist", hint: "Music" },
      { word: "Lazy Sunday", hint: "Sofa" },
      { word: "Netflix", hint: "Blanket" },
      { word: "Text message", hint: "Waiting" },
      { word: "Eye contact", hint: "Seconds" },
      { word: "Anniversary", hint: "Date" },
    ],
  },
  drunk: {
    no: [
      { word: "Vors", hint: "Hjemme først" },
      { word: "Nachspiel", hint: "Etter" },
      { word: "Vinmonopolet", hint: "Stengt tidlig" },
      { word: "Kebab på vei hjem", hint: "Midnatt" },
      { word: "Taxikø", hint: "Lang" },
      { word: "Vakter", hint: "Svart jakke" },
      { word: "Fylla melding", hint: "Angrer" },
      { word: "Blackout", hint: "Husker ikke" },
      { word: "Snapback", hint: "Dagen etter" },
      { word: "Øl", hint: "Fredag" },
      { word: "Shots", hint: "Raskt" },
      { word: "Cider", hint: "Eple" },
      { word: "Hjemmebrent", hint: "Ulovlig" },
      { word: "Champagne", hint: "Nyttår" },
      { word: "Vin", hint: "Drue" },
      { word: "Dansegulv", hint: "Svette" },
      { word: "Pub", hint: "Britisk" },
      { word: "Utested", hint: "Kø" },
      { word: "Bartender", hint: "Skjenker" },
      { word: "Drikkespill", hint: "Regler" },
      { word: "Ølbong", hint: "Rør" },
      { word: "Flørting", hint: "Øyekontakt" },
      { word: "VIP", hint: "Rep" },
      { word: "Karaokebar", hint: "Mikrofon" },
      { word: "Åpen bar", hint: "Gratis" },
      { word: "Promille", hint: "Politi" },
      { word: "Sidemann", hint: "Hjelper" },
      { word: "Tapt jakke", hint: "Garderoben" },
      { word: "Tapt mobil", hint: "Panikk" },
      { word: "Siste buss", hint: "Løp" },
      { word: "Gin & tonic", hint: "Agurk" },
      { word: "Whiskey", hint: "Røykig" },
      { word: "Jäger", hint: "Bombe" },
      { word: "Prosecco", hint: "Bobler" },
      { word: "Rum", hint: "Karibia" },
      { word: "Ølhage", hint: "Sommer" },
      { word: "Studentpub", hint: "Billig" },
      { word: "Fredagsbar", hint: "Jobb" },
    ],
    en: [
      { word: "Pregame", hint: "Before" },
      { word: "Nightclub", hint: "Dancing" },
      { word: "Bartender", hint: "Pours" },
      { word: "Hangover", hint: "Sunday" },
      { word: "Bouncer", hint: "Door" },
      { word: "Taxi home", hint: "Late" },
      { word: "Lost phone", hint: "Panic" },
      { word: "Drunk text", hint: "Regret" },
      { word: "Kebab", hint: "After midnight" },
      { word: "Beer pong", hint: "Table" },
      { word: "Dance floor", hint: "Sweat" },
      { word: "Afterparty", hint: "Sunrise" },
      { word: "Blackout", hint: "Memory" },
      { word: "Cider", hint: "Apple" },
      { word: "Champagne", hint: "New Year" },
      { word: "Wine", hint: "Grape" },
      { word: "Jägermeister", hint: "Bomb" },
      { word: "Gin & tonic", hint: "Cucumber" },
      { word: "Strip club", hint: "Bachelor" },
      { word: "Karaoke bar", hint: "Microphone" },
      { word: "VIP section", hint: "Rope" },
      { word: "Pub crawl", hint: "Many bars" },
      { word: "Drinking game", hint: "Rules" },
      { word: "Flirting", hint: "Eye contact" },
      { word: "Wingman", hint: "Helping" },
      { word: "ID check", hint: "Age" },
      { word: "Open bar", hint: "Free" },
      { word: "Prosecco", hint: "Bubbles" },
      { word: "Whiskey", hint: "Smoky" },
      { word: "Rum", hint: "Caribbean" },
      { word: "Bloody Mary", hint: "Tomato" },
      { word: "Vodka", hint: "Russia" },
      { word: "Tequila", hint: "Lime" },
      { word: "Shots", hint: "Fast" },
      { word: "Sambuca", hint: "Anise" },
      { word: "Pint", hint: "British" },
      { word: "Rooftop bar", hint: "View" },
      { word: "Last round", hint: "Closing" },
      { word: "Beer", hint: "Friday" },
      { word: "Lost jacket", hint: "Cloakroom" },
    ],
  },
  nasj: {
    no: [
      { word: "Tinder", hint: "Sveip" },
      { word: "One night stand", hint: "Fremmed" },
      { word: "Ghosting", hint: "Forsvant" },
      { word: "Situationship", hint: "Forvirrende" },
      { word: "Fuckfriend", hint: "Komplisert" },
      { word: "Sexting", hint: "Telefon" },
      { word: "Bodycount", hint: "Tall" },
      { word: "Walk of shame", hint: "Morgen" },
      { word: "Thirst trap", hint: "Instagram" },
      { word: "Sneaky link", hint: "Hemmelig" },
      { word: "Eks", hint: "Før" },
      { word: "Rebound", hint: "Etter brudd" },
      { word: "Utroskap", hint: "Hemmelighet" },
      { word: "Åpent forhold", hint: "Begge vet" },
      { word: "Nakenbilder", hint: "Telefon" },
      { word: "Hookup-app", hint: "Grindr" },
      { word: "Affære", hint: "Gift" },
      { word: "Love bombing", hint: "For fort" },
      { word: "Talking stage", hint: "Før dating" },
      { word: "Dumpet", hint: "Hjerteknust" },
      { word: "Sjekketur", hint: "Formål" },
      { word: "Tresom", hint: "Tre" },
      { word: "Strippoker", hint: "Kort" },
      { word: "Booty call", hint: "Midnatt" },
      { word: "Player", hint: "Mange" },
      { word: "Sjalu", hint: "Grønn" },
      { word: "Bruddmelding", hint: "Feig" },
      { word: "Tatt på fersken", hint: "Avslørt" },
      { word: "Sugardaddy", hint: "Penger" },
      { word: "Sveip høyre", hint: "Match" },
      { word: "Catfishing", hint: "Falsk" },
      { word: "Netflix og chill", hint: "Ser ikke film" },
      { word: "Morgenpille", hint: "Apotek" },
      { word: "Eksklusiv", hint: "Bare hverandre" },
      { word: "Slides inn i DM", hint: "Instagram" },
    ],
    en: [
      { word: "Tinder", hint: "Swipe" },
      { word: "One night stand", hint: "Stranger" },
      { word: "Ghosting", hint: "Disappeared" },
      { word: "Situationship", hint: "Confusing" },
      { word: "Friends with benefits", hint: "Complicated" },
      { word: "Sexting", hint: "Phone" },
      { word: "Body count", hint: "Number" },
      { word: "Walk of shame", hint: "Morning" },
      { word: "Thirst trap", hint: "Instagram" },
      { word: "Sneaky link", hint: "Secret" },
      { word: "Ex", hint: "Before" },
      { word: "Rebound", hint: "After breakup" },
      { word: "Cheating", hint: "Secret" },
      { word: "Open relationship", hint: "Both know" },
      { word: "Nudes", hint: "Phone" },
      { word: "Hookup app", hint: "Grindr" },
      { word: "Affair", hint: "Married" },
      { word: "Love bombing", hint: "Too fast" },
      { word: "Talking stage", hint: "Before dating" },
      { word: "Dumped", hint: "Heartbreak" },
      { word: "Sliding into DMs", hint: "Instagram" },
      { word: "Threesome", hint: "Three" },
      { word: "Strip poker", hint: "Cards" },
      { word: "Lap dance", hint: "Chair" },
      { word: "Booty call", hint: "Late night" },
      { word: "Player", hint: "Many" },
      { word: "Jealousy", hint: "Green" },
      { word: "Breakup text", hint: "Coward" },
      { word: "Getting caught", hint: "Busted" },
      { word: "Sugar daddy", hint: "Money" },
      { word: "Swipe right", hint: "Match" },
      { word: "Catfishing", hint: "Fake" },
      { word: "Netflix and chill", hint: "Not watching" },
      { word: "Morning after pill", hint: "Pharmacy" },
      { word: "Exclusive", hint: "Just us" },
    ],
  },
  blasted: {
    no: [
      { word: "Dealer", hint: "Ulovlig" },
      { word: "Dark web", hint: "Skjult" },
      { word: "BDSM", hint: "Kink" },
      { word: "Casino", hint: "Chips" },
      { word: "Utpressing", hint: "Hemmelighet" },
      { word: "Falsk ID", hint: "Mindreårig" },
      { word: "Stjålet kort", hint: "Bank" },
      { word: "Hemmelig konto", hint: "Skjult" },
      { word: "Alibi", hint: "Dekning" },
      { word: "Burner-telefon", hint: "Engangs" },
      { word: "Hacket", hint: "Tilgang" },
      { word: "Lekkede bilder", hint: "Hevn" },
      { word: "Rustest", hint: "Urin" },
      { word: "Bestikkelse", hint: "Penger" },
      { word: "Leiemorder", hint: "Kontrakt" },
      { word: "Vitnebeskyttelse", hint: "Identitet" },
      { word: "Svindel", hint: "Bedrageri" },
      { word: "Gaslighting", hint: "Virkelighet" },
      { word: "Overvåkning", hint: "Ser på" },
      { word: "Fluktkjøretøy", hint: "Fort" },
      { word: "Dobbeltliv", hint: "Hemmelig" },
      { word: "Underslag", hint: "Jobbpenger" },
      { word: "Stalker", hint: "Følger etter" },
      { word: "Forfalsket signatur", hint: "Falskt navn" },
      { word: "Offshore-konto", hint: "Skatteparadis" },
      { word: "Avlytting", hint: "Lytter" },
      { word: "Falsk pass", hint: "Grense" },
      { word: "Hvitvasking", hint: "Ren kontant" },
      { word: "Trusselliste", hint: "Navn" },
    ],
    en: [
      { word: "Dealer", hint: "Illegal" },
      { word: "Dark web", hint: "Hidden" },
      { word: "BDSM", hint: "Kink" },
      { word: "Casino", hint: "Chips" },
      { word: "Blackmail", hint: "Secret" },
      { word: "Fake ID", hint: "Underage" },
      { word: "Stolen card", hint: "Bank" },
      { word: "Secret account", hint: "Hidden" },
      { word: "Alibi", hint: "Cover" },
      { word: "Burner phone", hint: "Disposable" },
      { word: "Hacked", hint: "Access" },
      { word: "Leaked photos", hint: "Revenge" },
      { word: "Drug test", hint: "Urine" },
      { word: "Bribed", hint: "Money" },
      { word: "Hitman", hint: "Contract" },
      { word: "Witness protection", hint: "Identity" },
      { word: "Ponzi scheme", hint: "Fraud" },
      { word: "Gaslighting", hint: "Reality" },
      { word: "Surveillance", hint: "Watching" },
      { word: "Getaway car", hint: "Fast" },
      { word: "Double life", hint: "Secret" },
      { word: "Embezzlement", hint: "Work money" },
      { word: "Extortion", hint: "Pay or else" },
      { word: "Stalker", hint: "Following" },
      { word: "Forged signature", hint: "Fake name" },
      { word: "Offshore account", hint: "Tax haven" },
      { word: "Wiretap", hint: "Listening" },
      { word: "Fake passport", hint: "Border" },
      { word: "Money laundering", hint: "Clean cash" },
      { word: "Hitlist", hint: "Names" },
    ],
  },
};

const MODE_STYLE = {
  chill: {
    color: "#25D98A",
    soft: "rgba(37,217,138,0.22)",
    bg: ["#101A16", "#07100D", "#050711"],
    label: "Chill",
    emoji: "😊",
  },
  date: {
    color: "#EC4899",
    soft: "rgba(236,72,153,0.22)",
    bg: ["#1A0A14", "#100609", "#050711"],
    label: "Date",
    emoji: "💕",
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
      Animated.timing(fadeAnim, { toValue: 1, duration: 650, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 650, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const startGame = () => {
    const list = players.filter((p) => p.trim().length > 0);
    if (list.length < 3) return;

    const lang = t("no", "en", "en");
    const wordList = WORDS_BY_MODE[mode]?.[lang] || WORDS_BY_MODE[mode]?.en || [];
    const picked = wordList[Math.floor(Math.random() * wordList.length)];
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

      <View style={[styles.colorBlob, { backgroundColor: style.soft, shadowColor: style.color }]} />

      <LinearGradient
        colors={["rgba(5,7,17,0)", "#050711"]}
        style={styles.darkFade}
      />

      <Animated.View
        style={[styles.topBar, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.modePill}>
          <Text style={styles.modeEmoji}>{style.emoji}</Text>
          <Text style={[styles.modeLabel, { color: style.color }]}>{style.label}</Text>
        </View>

        <View style={{ width: 52 }} />
      </Animated.View>

      {phase === "setup" && (
        <Animated.View
          style={[styles.phase, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            <View style={styles.hero}>
              <Text style={styles.eyebrow}>IMPOSTER MODE</Text>
              <Text style={styles.heroTitle}>Who is{"\n"}lying?</Text>
              <Text style={styles.heroSub}>Everyone gets the same word except one player.</Text>
              <Animated.View
                style={[styles.heroEmojiWrap, { transform: [{ translateY: floatY }, { rotate: "-8deg" }] }]}
              >
                <Text style={styles.heroEmoji}>🎭</Text>
              </Animated.View>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>How it works</Text>
              <View style={styles.ruleRow}>
                <Text style={styles.ruleEmoji}>👀</Text>
                <Text style={styles.ruleText}>Everyone gets a word except the imposter.</Text>
              </View>
              <View style={styles.ruleRow}>
                <Text style={styles.ruleEmoji}>🎭</Text>
                <Text style={styles.ruleText}>The imposter only gets a hint.</Text>
              </View>
              <View style={styles.ruleRow}>
                <Text style={styles.ruleEmoji}>🍻</Text>
                <Text style={styles.ruleText}>Vote for who you think is lying.</Text>
              </View>
            </View>

            <Text style={styles.sectionLabel}>PLAYERS</Text>

            {players.map((p, i) => (
              <View key={i} style={styles.inputRow}>
                <View style={[styles.inputIcon, { backgroundColor: `${style.color}22` }]}>
                  <Text style={[styles.inputIconText, { color: style.color }]}>{i + 1}</Text>
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
                    onPress={() => setPlayers(players.filter((_, idx) => idx !== i))}
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
                <Text style={[styles.addBtnText, { color: style.color }]}>+ Add player</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              activeOpacity={0.9}
              disabled={validPlayers < 3}
              style={[styles.startBtn, validPlayers < 3 && styles.disabledBtn]}
              onPress={startGame}
            >
              <LinearGradient
                colors={[style.color, "#B92BFF"]}
                style={styles.startGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.startBtnText}>START GAME →</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      )}

      {phase === "reveal" && (
        <View style={styles.revealContent}>
          <Text style={styles.revealSub}>Give phone to</Text>
          <Text style={styles.revealName}>{roles[index]?.name}</Text>

          <Pressable
            onPressIn={() => {
              setRevealed(true);
              Animated.spring(holdScale, { toValue: 0.97, useNativeDriver: true }).start();
            }}
            onPressOut={() => {
              Animated.spring(holdScale, { toValue: 1, useNativeDriver: true }).start();
            }}
          >
            <Animated.View style={[styles.revealCard, { transform: [{ scale: holdScale }] }]}>
              {!revealed && (
                <View style={styles.holdContent}>
                  <Text style={styles.holdEmoji}>👆</Text>
                  <Text style={styles.holdTitle}>Hold to reveal</Text>
                  <Text style={styles.holdSub}>Don't show anyone else</Text>
                </View>
              )}

              {revealed && roles[index]?.type === "player" && (
                <View style={styles.cardContent}>
                  <View style={[styles.cardBadge, { backgroundColor: `${style.color}22` }]}>
                    <Text style={[styles.cardBadgeText, { color: style.color }]}>YOUR WORD</Text>
                  </View>
                  <Text style={styles.cardWord}>{roles[index]?.word}</Text>
                  <Text style={styles.cardHint}>You are not the imposter</Text>
                </View>
              )}

              {revealed && roles[index]?.type === "imposter" && (
                <View style={styles.cardContent}>
                  <View style={styles.imposterBadge}>
                    <Text style={styles.imposterBadgeText}>YOU ARE THE IMPOSTER</Text>
                  </View>
                  <Text style={styles.imposterWord}>???</Text>
                  <Text style={styles.cardHint}>Hint: {roles[index]?.hint}</Text>
                </View>
              )}
            </Animated.View>
          </Pressable>

          {revealed && (
            <TouchableOpacity activeOpacity={0.9} style={styles.nextBtn} onPress={next}>
              <LinearGradient
                colors={[style.color, "#B92BFF"]}
                style={styles.nextGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.nextBtnText}>
                  {index + 1 >= roles.length ? "Everyone ready →" : "Next player →"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      )}

      {phase === "done" && (
        <View style={styles.doneContent}>
          <Text style={styles.doneEmoji}>🎭</Text>
          <Text style={styles.doneTitle}>Everyone ready!</Text>
          <Text style={styles.doneSub}>Discuss, give clues and find the imposter.</Text>

          <TouchableOpacity activeOpacity={0.9} style={styles.restartBtn} onPress={restart}>
            <LinearGradient colors={[style.color, "#B92BFF"]} style={styles.restartGradient}>
              <Text style={styles.restartBtnText}>Play Again 🔄</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.popToTop()}>
            <Text style={styles.homeBtnText}>← Back Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050711" },
  colorBlob: {
    position: "absolute", top: -150, right: -180,
    width: width * 1.2, height: width * 1.2, borderRadius: width,
    shadowOpacity: 1, shadowRadius: 100, shadowOffset: { width: 0, height: 0 },
  },
  darkFade: {
    position: "absolute", top: height * 0.35, left: 0, right: 0, height: height * 0.45,
  },
  topBar: {
    height: 52, marginTop: 56, paddingHorizontal: 22,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between", zIndex: 20,
  },
  backBtn: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.08)", borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)", alignItems: "center", justifyContent: "center",
  },
  backText: { color: "#fff", fontSize: 24, fontWeight: "900" },
  modePill: {
    height: 52, paddingHorizontal: 18, borderRadius: 999,
    backgroundColor: "rgba(8,11,25,0.75)", borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)", flexDirection: "row", alignItems: "center",
  },
  modeEmoji: { fontSize: 18, marginRight: 8 },
  modeLabel: { fontSize: 14, fontWeight: "900" },
  phase: { flex: 1 },
  scroll: { paddingTop: 55, paddingHorizontal: 22, paddingBottom: 40 },
  hero: { minHeight: 220, justifyContent: "flex-end", marginBottom: 28, position: "relative" },
  eyebrow: {
    color: "rgba(255,255,255,0.72)", fontSize: 13, fontWeight: "900",
    letterSpacing: 3, marginBottom: 16,
  },
  heroTitle: { color: "#fff", fontSize: 46, lineHeight: 50, fontWeight: "900", letterSpacing: -1.8 },
  heroSub: {
    marginTop: 16, maxWidth: width * 0.7,
    color: "rgba(255,255,255,0.58)", fontSize: 15, lineHeight: 22, fontWeight: "700",
  },
  heroEmojiWrap: { position: "absolute", right: -8, bottom: 8 },
  heroEmoji: { fontSize: 110, opacity: 0.92 },
  infoCard: {
    backgroundColor: "rgba(8,11,25,0.72)", borderRadius: 26,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", padding: 18, marginBottom: 28,
  },
  infoTitle: { color: "#fff", fontSize: 17, fontWeight: "900", marginBottom: 14 },
  ruleRow: { flexDirection: "row", marginBottom: 10 },
  ruleEmoji: { fontSize: 18, marginRight: 10 },
  ruleText: { flex: 1, color: "rgba(255,255,255,0.56)", fontSize: 13, lineHeight: 18, fontWeight: "700" },
  sectionLabel: {
    color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: "900",
    letterSpacing: 4, marginBottom: 16,
  },
  inputRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  inputIcon: { width: 50, height: 50, borderRadius: 17, alignItems: "center", justifyContent: "center", marginRight: 12 },
  inputIconText: { fontSize: 15, fontWeight: "900" },
  input: {
    flex: 1, height: 56, backgroundColor: "rgba(8,11,25,0.72)",
    borderRadius: 18, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)",
    color: "#fff", fontSize: 16, fontWeight: "800", paddingHorizontal: 16,
  },
  removeBtn: {
    width: 38, height: 38, borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center",
    justifyContent: "center", marginLeft: 10,
  },
  removeBtnText: { color: "rgba(255,255,255,0.45)", fontSize: 18, fontWeight: "900" },
  addBtn: {
    height: 54, borderRadius: 18, borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)", backgroundColor: "rgba(8,11,25,0.5)",
    alignItems: "center", justifyContent: "center", marginBottom: 16,
  },
  addBtnText: { fontSize: 15, fontWeight: "900" },
  startBtn: { height: 58, borderRadius: 20, overflow: "hidden" },
  startGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  startBtnText: { color: "#fff", fontSize: 15, fontWeight: "900", letterSpacing: 1.2 },
  disabledBtn: { opacity: 0.45 },
  revealContent: { flex: 1, paddingHorizontal: 22, justifyContent: "center", alignItems: "center" },
  revealSub: { color: "rgba(255,255,255,0.48)", fontSize: 15, fontWeight: "700", marginBottom: 6 },
  revealName: { color: "#fff", fontSize: 34, fontWeight: "900", marginBottom: 28 },
  revealCard: {
    width: width - 44, minHeight: 230, borderRadius: 30,
    backgroundColor: "rgba(8,11,25,0.8)", borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)", padding: 32,
    alignItems: "center", justifyContent: "center", marginBottom: 24,
  },
  holdContent: { alignItems: "center" },
  holdEmoji: { fontSize: 42, marginBottom: 14 },
  holdTitle: { color: "#fff", fontSize: 20, fontWeight: "900", marginBottom: 8 },
  holdSub: { color: "rgba(255,255,255,0.42)", fontSize: 13, fontWeight: "700" },
  cardContent: { alignItems: "center" },
  cardBadge: { paddingHorizontal: 13, paddingVertical: 6, borderRadius: 999, marginBottom: 18 },
  cardBadgeText: { fontSize: 11, fontWeight: "900", letterSpacing: 1.2 },
  cardWord: { color: "#fff", fontSize: 42, fontWeight: "900", marginBottom: 10, textAlign: "center" },
  cardHint: { color: "rgba(255,255,255,0.52)", fontSize: 15, fontWeight: "700" },
  imposterBadge: {
    backgroundColor: "rgba(248,113,113,0.18)", paddingHorizontal: 14,
    paddingVertical: 6, borderRadius: 999, marginBottom: 18,
  },
  imposterBadgeText: { color: "#F87171", fontSize: 11, fontWeight: "900", letterSpacing: 1.2 },
  imposterWord: { color: "#F87171", fontSize: 48, fontWeight: "900", marginBottom: 10 },
  nextBtn: { width: width - 44, height: 58, borderRadius: 20, overflow: "hidden" },
  nextGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  nextBtnText: { color: "#fff", fontSize: 15, fontWeight: "900", letterSpacing: 1.2 },
  doneContent: { flex: 1, paddingHorizontal: 22, justifyContent: "center", alignItems: "center" },
  doneEmoji: { fontSize: 76, marginBottom: 18 },
  doneTitle: { color: "#fff", fontSize: 38, fontWeight: "900", marginBottom: 12 },
  doneSub: { color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 22, textAlign: "center", marginBottom: 30 },
  restartBtn: { width: "100%", height: 58, borderRadius: 20, overflow: "hidden", marginBottom: 14 },
  restartGradient: { flex: 1, alignItems: "center", justifyContent: "center" },
  restartBtnText: { color: "#fff", fontSize: 15, fontWeight: "900", letterSpacing: 1.2 },
  homeBtn: { paddingVertical: 12 },
  homeBtnText: { color: "rgba(255,255,255,0.42)", fontSize: 14, fontWeight: "800" },
});