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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  MidnightBackground,
  MODE_THEME,
  COLORS,
  FONT,
} from "../../components/MidnightUI";
import { getSessionPlayers } from "../../session";

const { width, height } = Dimensions.get("window");

const WORDS_BY_MODE = {
  chill: {
    no: [
      { word: "Kebab", hint: "Tyrkia" },
      { word: "Sommer", hint: "Vann" },
      { word: "Hytte", hint: "Fjell" },
      { word: "Internett", hint: "Hjem" },
      { word: "Vinmonopolet", hint: "Statlig" },
      { word: "Laks", hint: "Norsk" },
      { word: "Bunad", hint: "Mai" },
      { word: "Trikk", hint: "Skinner" },
      { word: "Kiwi", hint: "Butikk" },
      { word: "Playstation", hint: "Plus" },
      { word: "Neymar", hint: "Gress" },
      { word: "Netflix", hint: "Serier" },
      { word: "TikTok", hint: "Dopamin" },
      { word: "Snapchat", hint: "Historier" },
      { word: "Instagram", hint: "Album" },
      { word: "Spotify", hint: "Favoritt" },
      { word: "Treningssenteret", hint: "Speil" },
      { word: "Kaffebar", hint: "Latte" },
      { word: "Tatovering", hint: "Blekk" },
      { word: "Parfyme", hint: "Gucci" },
      { word: "Gucci", hint: "Kropp" },
      { word: "Blomst", hint: "Begravelse" },
      { word: "Begravelse", hint: "Mørkt" },
      { word: "Solbriller", hint: "UV" },
      { word: "Pass", hint: "Viktig" },
      { word: "Hodetelefoner", hint: "Flytur" },
      { word: "Nike", hint: "Just" },
      { word: "Bursdag", hint: "Kake" },
      { word: "Roadtrip", hint: "Bil" },
      { word: "Karaoke", hint: "Fylla" },
      { word: "Boblebad", hint: "Bobler" },
      { word: "Camping", hint: "Telt" },
      { word: "Yoga", hint: "Strekk" },
      { word: "Poker", hint: "Konge" },
      { word: "Badstu", hint: "Varmt" },
      { word: "Brunch", hint: "Helg" },
      { word: "Ikea", hint: "Gult" },
      { word: "McDonald's", hint: "Bue" },
      { word: "Brygge", hint: "Krabbe" },
      { word: "Ludo", hint: "Farger" },
      { word: "Sykkel", hint: "Hjul" },
      { word: "Powerbank", hint: "Prosent" },
      { word: "Pute", hint: "Sofa" },
      { word: "Paraply", hint: "Regn" },
      { word: "Charger", hint: "Lav" },
      { word: "Trampoline", hint: "Hopp" },
      { word: "Skateboard", hint: "Grind" },
      { word: "Joggesko", hint: "Asfalt" },
      { word: "Billard", hint: "Kritt" },
      { word: "Dartskive", hint: "Pil" },
      { word: "Stambar", hint: "Kjent" },
      { word: "Terasse", hint: "Sommer" },
      { word: "Grillbar", hint: "Sen" },
      { word: "Konfetti", hint: "Gulv" },
      { word: "Kortspill", hint: "Drikke" },
      { word: "Fjord", hint: "Vann" },
      { word: "Solfaktor", hint: "Sol" },
      { word: "Drosje", hint: "Hjem" },
      { word: "Strobe", hint: "Lys" },
      { word: "Festival", hint: "Publikum" },
    ],
    en: [
      { word: "iPhone", hint: "Apple" },
      { word: "Netflix", hint: "Series" },
      { word: "Spotify", hint: "Favorite" },
      { word: "Pizza", hint: "Triangle" },
      { word: "Instagram", hint: "Album" },
      { word: "McDonald's", hint: "Arches" },
      { word: "Ikea", hint: "Yellow" },
      { word: "Tiktok", hint: "Dopamine" },
      { word: "Snapchat", hint: "Stories" },
      { word: "Neymar", hint: "Grass" },
      { word: "Starbucks", hint: "White Girl" },
      { word: "Airbnb", hint: "Insurance" },
      { word: "Amazon", hint: "Everything" },
      { word: "GPS", hint: "Lost" },
      { word: "Nintendo", hint: "Mario" },
      { word: "Sushi", hint: "Salmon" },
      { word: "Gym", hint: "Mirror" },
      { word: "Hiking", hint: "Nature" },
      { word: "Cat", hint: "Eyes" },
      { word: "Dog", hint: "Tongue" },
      { word: "Coffee", hint: "Morning" },
      { word: "Chocolate", hint: "Sweet" },
      { word: "Furniture", hint: "Room" },
      { word: "Passport", hint: "Important" },
      { word: "Speaker", hint: "Party" },
      { word: "Hitler", hint: "Mustache" },
      { word: "War", hint: "Death" },
      { word: "Birthday", hint: "Age" },
      { word: "Sink", hint: "Chrome" },
      { word: "Lamp", hint: "Hue" },
      { word: "Tattoo", hint: "Ink" },
      { word: "Jacuzzi", hint: "Bubbles" },
      { word: "Brunch", hint: "Weekend" },
      { word: "Camping", hint: "Tent" },
      { word: "Yoga", hint: "Stretching" },
      { word: "Poker", hint: "Cards" },
      { word: "Sauna", hint: "Heat" },
      { word: "Rollercoaster", hint: "Thrills" },
      { word: "Ludo", hint: "Colors" },
      { word: "Bicycle", hint: "Wheels" },
      { word: "Sunscreen", hint: "Summer" },
      { word: "Charger", hint: "Low" },
      { word: "Pillow", hint: "Couch" },
      { word: "Umbrella", hint: "Rain" },
      { word: "Backpack", hint: "Travel" },
      { word: "Wallet", hint: "Empty" },
      { word: "Watch", hint: "Wrist" },
      { word: "Sneakers", hint: "Fresh" },
      { word: "Blanket", hint: "Cozy" },
      { word: "Candle", hint: "Wax" },
      { word: "Smoothie", hint: "Blend" },
      { word: "Avocado", hint: "Toast" },
      { word: "Hammock", hint: "Relax" },
      { word: "Selfie", hint: "Filter" },
      { word: "Streaming", hint: "Binge" },
      { word: "Neon", hint: "Club" },
      { word: "Confetti", hint: "Floor" },
      { word: "Canyon", hint: "Valley" },
      { word: "Bourbon", hint: "American" },
      { word: "Apresski", hint: "Mountain" },
      { word: "Uber", hint: "App" },
    ],
  },
  date: {
    no: [
      { word: "Crush", hint: "Nær" },
      { word: "Treff", hint: "Ukjent" },
      { word: "Resturant", hint: "Stearinlys" },
      { word: "Hjertebank", hint: "Følelse" },
      { word: "Kompliment", hint: "Søtt" },
      { word: "Håndholding", hint: "Varmt" },
      { word: "Sommerfugler", hint: "Magen" },
      { word: "Solnedgangstur", hint: "Romantisk" },
      { word: "Lepper", hint: "Hodet" },
      { word: "Rose", hint: "Kjærlighet" },
      { word: "Stjernetitting", hint: "Natt" },
      { word: "Piknik", hint: "Park" },
      { word: "Matlaging", hint: "Imponere" },
      { word: "Overraskelse", hint: "Uventet" },
      { word: "Kjærlighetsbrev", hint: "Erklæring" },
      { word: "Hemmelighet", hint: "Privat" },
      { word: "Minigolf", hint: "Ball" },
      { word: "Lovehearts", hint: "Tekst" },
      { word: "Flørt", hint: "Smil" },
      { word: "Drink", hint: "Første" },
      { word: "Tillit", hint: "Trygt" },
      { word: "Savn", hint: "Følelser" },
      { word: "Sjalu", hint: "Grønn" },
      { word: "Forelsket", hint: "Mye" },
      { word: "Hjertesorg", hint: "Endret" },
      { word: "Eksklusiv", hint: "Hverandre" },
      { word: "Fremtidsdrøm", hint: "Sammen" },
      { word: "Klemme", hint: "Nær" },
      { word: "Løfte", hint: "Ord" },
      { word: "Morgenkaffe", hint: "Frokost" },
      { word: "Musikk", hint: "Kjennskap" },
      { word: "Innedag", hint: "Sofa" },
      { word: "Kino", hint: "Old" },
      { word: "Tekstmelding", hint: "Venter" },
      { word: "Øyekontakt", hint: "Sekunder" },
      { word: "Stearinlys", hint: "Middag" },
      { word: "Sjampanje", hint: "Bobler" },
      { word: "Ring", hint: "Finger" },
      { word: "Hvisking", hint: "Øre" },
      { word: "Serenade", hint: "Tone" },
      { word: "Paraply", hint: "Regn" },
      { word: "Båt", hint: "Romantisk" },
      { word: "Bilde", hint: "Minne" },
      { word: "Brev", hint: "Papir" },
      { word: "Vinglass", hint: "Kveld" },
      { word: "Sjokolade", hint: "Søt" },
      { word: "Nøkkel", hint: "Hjem" },
      { word: "Dans", hint: "Svinge" },
      { word: "Sjarmør", hint: "Smil" },
      { word: "Parfyme", hint: "Duft" },
      { word: "Sjenert", hint: "Blikk" },
      { word: "Kjærlighet", hint: "Sterk" },
      { word: "Puls", hint: "Raskt" },
      { word: "Dikt", hint: "Rim" },
      { word: "Kopp", hint: "Te" },
    ],
    en: [
      { word: "Crush", hint: "Nearby" },
      { word: "Rendezvous", hint: "Stranger" },
      { word: "Restaurant", hint: "Candlelight" },
      { word: "Heartbeat", hint: "Feeling" },
      { word: "Compliment", hint: "Sweet" },
      { word: "Touch", hint: "Warm" },
      { word: "Butterflies", hint: "Stomach" },
      { word: "Stroll", hint: "Romantic" },
      { word: "Lips", hint: "Mind" },
      { word: "Rose", hint: "Meaning" },
      { word: "Stargazing", hint: "Night" },
      { word: "Picnic", hint: "Park" },
      { word: "Cooking", hint: "Impressive" },
      { word: "Surprise", hint: "Unexpected" },
      { word: "Letter", hint: "Declaration" },
      { word: "Secret", hint: "Private" },
      { word: "Minigolf", hint: "Ball" },
      { word: "Emoji", hint: "Heart" },
      { word: "Flirting", hint: "Smile" },
      { word: "Drink", hint: "Nervous" },
      { word: "Trust", hint: "Safe" },
      { word: "Longing", hint: "Distance" },
      { word: "Jealousy", hint: "Green" },
      { word: "Infatuation", hint: "Deeply" },
      { word: "Heartbreak", hint: "Changed" },
      { word: "Exclusive", hint: "Devoted" },
      { word: "Dreams", hint: "Together" },
      { word: "Hug", hint: "Close" },
      { word: "Promise", hint: "Words" },
      { word: "Breakfast", hint: "Together" },
      { word: "Music", hint: "Connection" },
      { word: "Lounging", hint: "Sofa" },
      { word: "Cinema", hint: "Classic" },
      { word: "Texting", hint: "Waiting" },
      { word: "Gaze", hint: "Seconds" },
      { word: "Perfume", hint: "Fragrance" },
      { word: "Serenade", hint: "Window" },
      { word: "Poem", hint: "Written" },
      { word: "Moonlight", hint: "Romance" },
      { word: "Proposal", hint: "Knee" },
      { word: "Blush", hint: "Cheeks" },
      { word: "Dimples", hint: "Cute" },
      { word: "Bouquet", hint: "Flowers" },
      { word: "Wink", hint: "Playful" },
      { word: "Daydream", hint: "Thinking" },
      { word: "Devotion", hint: "Loyal" },
      { word: "Embrace", hint: "Tender" },
      { word: "Whisper", hint: "Ear" },
      { word: "Velvet", hint: "Soft" },
      { word: "Champagne", hint: "Bubbles" },
      { word: "Jewelry", hint: "Wrist" },
      { word: "Locket", hint: "Heart" },
      { word: "Sonnet", hint: "Shakespeare" },
      { word: "Adore", hint: "Quietly" },
      { word: "Candle", hint: "Flame" },
    ],
  },
  drunk: {
    no: [
      { word: "Vors", hint: "Forsein" },
      { word: "Nachspiel", hint: "Etter" },
      { word: "Vinmonopolet", hint: "Stengt" },
      { word: "Club", hint: "Danse" },
      { word: "Taxi", hint: "Natt" },
      { word: "Vakter", hint: "Svart" },
      { word: "Fyllismelding", hint: "Angrer" },
      { word: "Blackout", hint: "Hukommelse" },
      { word: "Smirnoff", hint: "Ice" },
      { word: "Øl", hint: "Afterwork" },
      { word: "Shots", hint: "Raskt" },
      { word: "Cider", hint: "Eple" },
      { word: "Hjemmebrent", hint: "Ulovlig" },
      { word: "Champagne", hint: "Nyttår" },
      { word: "Vin", hint: "Drue" },
      { word: "Dansegulv", hint: "Svette" },
      { word: "Pub", hint: "Britisk" },
      { word: "Utested", hint: "Kø" },
      { word: "Bartender", hint: "Kjekk" },
      { word: "Spandert", hint: "Damer" },
      { word: "Beerpong", hint: "Rød" },
      { word: "Flørting", hint: "Øyekontakt" },
      { word: "VIP", hint: "Verdi" },
      { word: "Karaokebar", hint: "Mikrofon" },
      { word: "Gratisbar", hint: "Ubegrenset" },
      { word: "Promille", hint: "Bilnøkkel" },
      { word: "Sidemann", hint: "Hjelper" },
      { word: "Jakke", hint: "Garderoben" },
      { word: "Mobil", hint: "Panikk" },
      { word: "Buss", hint: "Fult" },
      { word: "Gin", hint: "Agurk" },
      { word: "Whiskey", hint: "Røyk" },
      { word: "Jäger", hint: "Bombe" },
      { word: "Prosecco", hint: "Bobler" },
      { word: "Rum", hint: "Karibia" },
      { word: "Gutta", hint: "Pils" },
      { word: "Studentpub", hint: "Billig" },
      { word: "Sjakk", hint: "Hjerne" },
      { word: "Wingman", hint: "Bro" },
      { word: "Brannvin", hint: "Norsk" },
      { word: "Halvliter", hint: "Krus" },
      { word: "Bakrus", hint: "Morgen" },
      { word: "Skål", hint: "Klink" },
      { word: "Snaps", hint: "Bitter" },
      { word: "Pilsner", hint: "Kald" },
      { word: "Slips", hint: "Fest" },
      { word: "Kebabkø", hint: "Natt" },
      { word: "Stamkneipe", hint: "Fast" },
      { word: "Lommelerke", hint: "Lomme" },
      { word: "Hangover", hint: "Seng" },
      { word: "Fylla", hint: "Lat" },
      { word: "Nattklubb", hint: "Bass" },
      { word: "Kronkorken", hint: "Flaske" },
      { word: "Garderobe", hint: "Jakker" },
      { word: "Strobe", hint: "Danse" },
      { word: "Lydsystem", hint: "Lyd" },
      { word: "Afterski", hint: "Fjell" },
      { word: "Festival", hint: "Folkemasse" },
      { word: "Glitter", hint: "Gulv" },
    ],
    en: [
      { word: "Pregame", hint: "Before" },
      { word: "Afterparty", hint: "After" },
      { word: "Spirits", hint: "Closing" },
      { word: "Club", hint: "Dance" },
      { word: "Taxi", hint: "Night" },
      { word: "Bouncer", hint: "Black" },
      { word: "Confession", hint: "Regret" },
      { word: "Blackout", hint: "Memory" },
      { word: "Smirnoff", hint: "Ice" },
      { word: "Beer", hint: "Afterwork" },
      { word: "Shots", hint: "Fast" },
      { word: "Cider", hint: "Apple" },
      { word: "Moonshine", hint: "Illegal" },
      { word: "Champagne", hint: "December" },
      { word: "Wine", hint: "Grape" },
      { word: "Dancefloor", hint: "Sweat" },
      { word: "Pub", hint: "British" },
      { word: "Bar", hint: "Queue" },
      { word: "Bartender", hint: "Attractive" },
      { word: "Round", hint: "Next" },
      { word: "Beerpong", hint: "Red" },
      { word: "Flirting", hint: "Gaze" },
      { word: "VIP", hint: "Deserved" },
      { word: "Karaoke", hint: "Microphone" },
      { word: "Freeflow", hint: "Unlimited" },
      { word: "BAC", hint: "Keys" },
      { word: "Wingman", hint: "Helper" },
      { word: "Jacket", hint: "Cloakroom" },
      { word: "Phone", hint: "Panic" },
      { word: "Bus", hint: "Packed" },
      { word: "Gin", hint: "Cucumber" },
      { word: "Whiskey", hint: "Smoky" },
      { word: "Jäger", hint: "Bomb" },
      { word: "Prosecco", hint: "Bubbles" },
      { word: "Rum", hint: "Caribbean" },
      { word: "Squad", hint: "Pints" },
      { word: "Dive", hint: "Cheap" },
      { word: "Chess", hint: "Brain" },
      { word: "Hangover", hint: "Regret" },
      { word: "Cheers", hint: "Clink" },
      { word: "Wasted", hint: "Tomorrow" },
      { word: "Tipsy", hint: "Giggle" },
      { word: "Stumble", hint: "Step" },
      { word: "Keg", hint: "Party" },
      { word: "Flask", hint: "Pocket" },
      { word: "Lager", hint: "Cold" },
      { word: "Pint", hint: "Bitter" },
      { word: "Nightcap", hint: "Last" },
      { word: "Barmaid", hint: "Pour" },
      { word: "Cocktail", hint: "Shaker" },
      { word: "Bartab", hint: "Credit" },
      { word: "Heels", hint: "Pain" },
      { word: "Headache", hint: "Pillow" },
      { word: "Sunglasses", hint: "Shame" },
      { word: "Glitter", hint: "Floor" },
      { word: "Neon", hint: "Club" },
      { word: "Strobe", hint: "Dance" },
      { word: "Schnapps", hint: "Bitter" },
      { word: "Nightclub", hint: "Bass" },
      { word: "Takeaway", hint: "Queue" },
      { word: "Local", hint: "Regular" },
    ],
  },
  nasj: {
    no: [
      { word: "Tinder", hint: "Sveip" },
      { word: "Fremmede", hint: "Natt" },
      { word: "Ghosting", hint: "Forsvant" },
      { word: "Situationship", hint: "Forvirrende" },
      { word: "Fuckfriend", hint: "Komplisert" },
      { word: "Sexting", hint: "Telefon" },
      { word: "Bodycount", hint: "Tall" },
      { word: "Vandring", hint: "Morgen" },
      { word: "Lokkebilde", hint: "Instagram" },
      { word: "Hemmeligmøte", hint: "Skjult" },
      { word: "Eks", hint: "Før" },
      { word: "Rebound", hint: "Helbredelse" },
      { word: "Utroskap", hint: "Hemmelighet" },
      { word: "Polyamori", hint: "Åpent" },
      { word: "Nakenbilder", hint: "Telefon" },
      { word: "Datingapp", hint: "Grindr" },
      { word: "Affære", hint: "Gift" },
      { word: "Overdrivelse", hint: "Tidlig" },
      { word: "Sjekking", hint: "Usikker" },
      { word: "Dumpet", hint: "Hjerteknust" },
      { word: "Sjekketur", hint: "Formål" },
      { word: "Trekant", hint: "Tre" },
      { word: "Klespoker", hint: "Kort" },
      { word: "Nattringing", hint: "Midnatt" },
      { word: "Player", hint: "Mange" },
      { word: "Sjalu", hint: "Grønn" },
      { word: "Bruddmelding", hint: "Feig" },
      { word: "Fersk", hint: "Avslørt" },
      { word: "Sugardaddy", hint: "Penger" },
      { word: "Swipe", hint: "Match" },
      { word: "Catfishing", hint: "Falsk" },
      { word: "Sofadate", hint: "Alibi" },
      { word: "Morgenpille", hint: "Apotek" },
      { word: "Eksklusiv", hint: "Trofast" },
      { word: "DM", hint: "Pickup" },
      { word: "Kysset", hint: "Lepper" },
      { word: "Sengetøy", hint: "Rynker" },
      { word: "Undertøy", hint: "Gulvet" },
      { word: "Nettdating", hint: "App" },
      { word: "Profilebilde", hint: "Filter" },
      { word: "Kjæreste", hint: "Offisiell" },
      { word: "Sengetid", hint: "Sen" },
      { word: "Overnatting", hint: "Uventet" },
      { word: "Intimt", hint: "Nærhet" },
      { word: "Attraktiv", hint: "Speil" },
      { word: "Hjem", hint: "Sted" },
      { word: "Kosenavn", hint: "Søtt" },
      { word: "Sjarmøren", hint: "Blikk" },
      { word: "Interesse", hint: "Varm" },
      { word: "Grenser", hint: "Overtrådt" },
      { word: "Fristelse", hint: "Svak" },
      { word: "Begjær", hint: "Sterk" },
      { word: "Fascinasjon", hint: "Magnet" },
      { word: "Spenning", hint: "Elektrisk" },
      { word: "Hemmelighet", hint: "Skjult" },
    ],
    en: [
      { word: "Tinder", hint: "Swipe" },
      { word: "Fling", hint: "Stranger" },
      { word: "Ghosting", hint: "Disappeared" },
      { word: "Situationship", hint: "Confusing" },
      { word: "Arrangement", hint: "Complicated" },
      { word: "Sexting", hint: "Phone" },
      { word: "Tally", hint: "Number" },
      { word: "Stride", hint: "Morning" },
      { word: "Bait", hint: "Instagram" },
      { word: "Covert", hint: "Secret" },
      { word: "Ex", hint: "Before" },
      { word: "Rebound", hint: "Recovery" },
      { word: "Cheating", hint: "Secret" },
      { word: "Polyamory", hint: "Mutual" },
      { word: "Nudes", hint: "Phone" },
      { word: "Hinge", hint: "Dating" },
      { word: "Affair", hint: "Married" },
      { word: "Obsession", hint: "Intense" },
      { word: "Limbo", hint: "Unclear" },
      { word: "Dumped", hint: "Heartbreak" },
      { word: "Slide", hint: "DMs" },
      { word: "Threesome", hint: "Three" },
      { word: "Striptease", hint: "Cards" },
      { word: "Grind", hint: "Chair" },
      { word: "Nightcall", hint: "Midnight" },
      { word: "Player", hint: "Many" },
      { word: "Jealousy", hint: "Green" },
      { word: "Blindsided", hint: "Coward" },
      { word: "Exposed", hint: "Caught" },
      { word: "Provider", hint: "Money" },
      { word: "Liked", hint: "Match" },
      { word: "Catfishing", hint: "Fake" },
      { word: "Invitation", hint: "Couch" },
      { word: "Pill", hint: "Pharmacy" },
      { word: "Exclusive", hint: "Devoted" },
      { word: "DM", hint: "Pickup" },
      { word: "Chemistry", hint: "Undeniable" },
      { word: "Tension", hint: "Unspoken" },
      { word: "Rejection", hint: "Ouch" },
      { word: "Flirt", hint: "Wink" },
      { word: "Lingerie", hint: "Drawer" },
      { word: "Attraction", hint: "Magnetic" },
      { word: "Temptation", hint: "Weak" },
      { word: "Confession", hint: "Pillow" },
      { word: "Hookup", hint: "Regret" },
      { word: "Longing", hint: "Distance" },
      { word: "Passionate", hint: "Heat" },
      { word: "Loyalty", hint: "Broken" },
      { word: "Fantasy", hint: "Hidden" },
      { word: "Forbidden", hint: "Thrilling" },
      { word: "Revenge", hint: "Petty" },
      { word: "Boundaries", hint: "Ignored" },
      { word: "Lust", hint: "Impulse" },
      { word: "Rizz", hint: "Charm" },
      { word: "Toxic", hint: "Pattern" },
      { word: "Desire", hint: "Midnight" },
      { word: "Partner", hint: "Official" },
      { word: "Nickname", hint: "Cute" },
    ],
  },
  blasted: {
    no: [
      { word: "Dealer", hint: "Ulovlig" },
      { word: "Tor", hint: "Skjult" },
      { word: "BDSM", hint: "Kink" },
      { word: "Casino", hint: "Dealer" },
      { word: "Utpressing", hint: "Hemmelighet" },
      { word: "ID", hint: "Mindreårig" },
      { word: "Kort", hint: "Verdi" },
      { word: "Hitler", hint: "Bart" },
      { word: "Alibi", hint: "Dekning" },
      { word: "Engangstelefon", hint: "Engangs" },
      { word: "Hacket", hint: "Tilgang" },
      { word: "Leaks", hint: "Hevn" },
      { word: "Trump", hint: "Oransje" },
      { word: "Khanen", hint: "Høvding" },
      { word: "Seriemorder", hint: "Kald" },
      { word: "Biometri", hint: "Ansikt" },
      { word: "Svindel", hint: "Bedrageri" },
      { word: "Gaslighting", hint: "cap" },
      { word: "Rizz", hint: "Fangst" },
      { word: "Fyllakjøring", hint: "Fengsel" },
      { word: "Dobbeltliv", hint: "Hemmelig" },
      { word: "Bestikkelse", hint: "Korrupt" },
      { word: "Stalker", hint: "Creep" },
      { word: "Signatur", hint: "Navn" },
      { word: "Skatteflukt", hint: "Paradis" },
      { word: "Avlytting", hint: "Lytter" },
      { word: "Øl", hint: "Gull" },
      { word: "Hvitvasking", hint: "Rent" },
      { word: "Terror", hint: "Farlig" },
      { word: "Løgner", hint: "Øyne" },
      { word: "Hevn", hint: "Søt" },
      { word: "Spion", hint: "Skygge" },
      { word: "Fengsel", hint: "Gitter" },
      { word: "Narkotika", hint: "Hvit" },
      { word: "Pistol", hint: "Kule" },
      { word: "Smugler", hint: "Grense" },
      { word: "Mafia", hint: "Stillhet" },
      { word: "Kidnapping", hint: "Løsepenger" },
      { word: "Kode", hint: "Knekk" },
      { word: "Skyting", hint: "Skudd" },
      { word: "Bombe", hint: "Lunte" },
      { word: "Gift", hint: "Sakte" },
      { word: "Dobbeltagent", hint: "Lojalitet" },
      { word: "Flukt", hint: "Skjul" },
      { word: "Ransaking", hint: "Politiet" },
      { word: "Mordvåpen", hint: "Bevis" },
      { word: "Korrupsjon", hint: "Penger" },
      { word: "Infiltratør", hint: "Maske" },
      { word: "Sprengstoff", hint: "Detonator" },
    ],
    en: [
      { word: "Dealer", hint: "Illegal" },
      { word: "Tor", hint: "Hidden" },
      { word: "BDSM", hint: "Kink" },
      { word: "Casino", hint: "Dealer" },
      { word: "Blackmail", hint: "Secret" },
      { word: "Forgery", hint: "Underage" },
      { word: "Card", hint: "Value" },
      { word: "Hitler", hint: "Mustache" },
      { word: "Alibi", hint: "Cover" },
      { word: "Prepaid", hint: "Untraceable" },
      { word: "Hacked", hint: "Access" },
      { word: "Leaks", hint: "Revenge" },
      { word: "Trump", hint: "Orange" },
      { word: "Khan", hint: "Warlord" },
      { word: "Psychopath", hint: "Charming" },
      { word: "Fingerprint", hint: "Unlock" },
      { word: "Fraud", hint: "Scam" },
      { word: "Gaslighting", hint: "Cap" },
      { word: "Rizz", hint: "Catch" },
      { word: "DUI", hint: "Arrest" },
      { word: "Duality", hint: "Hidden" },
      { word: "Kickback", hint: "Corrupt" },
      { word: "Stalker", hint: "Creep" },
      { word: "Signature", hint: "Name" },
      { word: "Haven", hint: "Untaxed" },
      { word: "Wiretap", hint: "Listening" },
      { word: "Beer", hint: "Gold" },
      { word: "Laundering", hint: "Clean" },
      { word: "Terror", hint: "Dangerous" },
      { word: "Hitman", hint: "Contract" },
      { word: "Ransom", hint: "Kidnap" },
      { word: "Sniper", hint: "Distance" },
      { word: "Conspiracy", hint: "Theory" },
      { word: "Arson", hint: "Flames" },
      { word: "Fugitive", hint: "Run" },
      { word: "Motive", hint: "Why" },
      { word: "Accomplice", hint: "Silent" },
      { word: "Evidence", hint: "Planted" },
      { word: "Bribery", hint: "Envelope" },
      { word: "Smuggling", hint: "Border" },
      { word: "Assassination", hint: "Crown" },
      { word: "Encrypt", hint: "Code" },
      { word: "Betrayal", hint: "Trust" },
      { word: "Mercenary", hint: "Hired" },
      { word: "Counterfeit", hint: "Fake" },
      { word: "Surveillance", hint: "Watching" },
      { word: "Extortion", hint: "Pay" },
      { word: "Interrogation", hint: "Chair" },
      { word: "Undercover", hint: "Deep" },
    ],
  },
};

// Kveldens spillere fylles inn automatisk — minst tre felter for Imposter
const initialPlayers = (playerName) => {
  const crew = getSessionPlayers();
  const list = crew.length > 0 ? [...crew] : [playerName];
  while (list.length < 3) list.push("");
  return list;
};

export default function ImposterScreen({ navigation, route }) {
  const playerName = route?.params?.playerName || "Player";
  const mode = route?.params?.mode || "chill";

  const style = MODE_THEME[mode] || MODE_THEME.chill;
  const insets = useSafeAreaInsets();

  const [phase, setPhase] = useState("setup");
  const [players, setPlayers] = useState(() => initialPlayers(playerName));
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
    setPlayers(initialPlayers(playerName));
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

      <MidnightBackground glowColor={style.color} />

      <Animated.View
        style={[
          styles.topBar,
          { marginTop: insets.top + 16 },
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.modePill}>
          <Text style={styles.modeEmoji}>{style.emoji}</Text>
          <Text style={[styles.modeLabel, { color: style.color }]}>{style.label}</Text>
        </View>

        <View style={{ width: 42 }} />
      </Animated.View>

      {phase === "setup" && (
        <Animated.View
          style={[styles.phase, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            <View style={styles.hero}>
              <Text style={styles.eyebrow}>IMPOSTER MODE</Text>
              <View style={styles.heroTitleRow}>
                <Text style={styles.heroTitle}>{t("Hvem lyver?", "Who is lying?", "誰が嘘をついている？")}</Text>
                <Animated.Text style={[styles.heroEmoji, { transform: [{ translateY: floatY }] }]}>
                  🎭
                </Animated.Text>
              </View>
              <Text style={styles.heroSub}>
                {t(
                  "Alle får det samme ordet bortsett fra én spiller.",
                  "Everyone gets the same word except one player.",
                  "一人を除いて全員が同じ言葉をもらう。"
                )}
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>{t("Slik funker det", "How it works", "遊び方")}</Text>
              <View style={styles.ruleRow}>
                <Text style={styles.ruleEmoji}>👀</Text>
                <Text style={styles.ruleText}>
                  {t("Alle får et ord — bortsett fra imposteren.", "Everyone gets a word except the imposter.", "インポスター以外は言葉をもらう。")}
                </Text>
              </View>
              <View style={styles.ruleRow}>
                <Text style={styles.ruleEmoji}>🎭</Text>
                <Text style={styles.ruleText}>
                  {t("Imposteren får bare et hint.", "The imposter only gets a hint.", "インポスターはヒントだけ。")}
                </Text>
              </View>
              <View style={styles.ruleRow}>
                <Text style={styles.ruleEmoji}>🍻</Text>
                <Text style={styles.ruleText}>
                  {t("Stem på den dere tror lyver.", "Vote for who you think is lying.", "嘘をついていると思う人に投票。")}
                </Text>
              </View>
            </View>

            <Text style={styles.sectionLabel}>{t("SPILLERE", "PLAYERS", "プレイヤー")}</Text>

            {players.map((p, i) => (
              <View key={i} style={styles.inputRow}>
                <View style={[styles.inputIcon, { backgroundColor: `${style.color}24`, borderColor: `${style.color}4D` }]}>
                  <Text style={[styles.inputIconText, { color: style.color }]}>{i + 1}</Text>
                </View>
                <TextInput
                  value={p}
                  placeholder={t(`Spiller ${i + 1}`, `Player ${i + 1}`, `プレイヤー ${i + 1}`)}
                  placeholderTextColor="rgba(255,255,255,0.26)"
                  onChangeText={(text) => {
                    const copy = [...players];
                    copy[i] = text;
                    setPlayers(copy);
                  }}
                  style={styles.input}
                />
                {i >= 1 && players.length > 3 && (
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => setPlayers(players.filter((_, idx) => idx !== i))}
                    accessibilityRole="button"
                    accessibilityLabel={t("Fjern spiller", "Remove player", "削除")}
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
                <Text style={[styles.addBtnText, { color: style.color }]}>
                  {t("+ Legg til spiller", "+ Add player", "+ プレイヤー追加")}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              activeOpacity={0.9}
              disabled={validPlayers < 3}
              style={[styles.startBtn, validPlayers < 3 && styles.disabledBtn]}
              onPress={startGame}
            >
              <LinearGradient
                colors={style.gradient}
                style={styles.startGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.startBtnText}>{t("START SPILLET →", "START GAME →", "スタート →")}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      )}

      {phase === "reveal" && (
        <View style={styles.revealContent}>
          <Text style={styles.revealSub}>{t("GI TELEFONEN TIL", "GIVE PHONE TO", "電話を渡して")}</Text>
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
                  <Text style={styles.holdTitle}>{t("Hold for å se", "Hold to reveal", "長押しで表示")}</Text>
                  <Text style={styles.holdSub}>{t("Ikke vis til noen andre", "Don't show anyone else", "他の人に見せないで")}</Text>
                </View>
              )}

              {revealed && roles[index]?.type === "player" && (
                <View style={styles.cardContent}>
                  <View style={[styles.cardBadge, { borderColor: `${style.color}80` }]}>
                    <Text style={[styles.cardBadgeText, { color: style.color }]}>
                      {t("DITT ORD", "YOUR WORD", "あなたの言葉")}
                    </Text>
                  </View>
                  <Text style={styles.cardWord}>{roles[index]?.word}</Text>
                  <Text style={styles.cardHint}>{t("Du er ikke imposteren", "You are not the imposter", "あなたはインポスターではない")}</Text>
                </View>
              )}

              {revealed && roles[index]?.type === "imposter" && (
                <View style={styles.cardContent}>
                  <View style={styles.imposterBadge}>
                    <Text style={styles.imposterBadgeText}>
                      {t("DU ER IMPOSTEREN", "YOU ARE THE IMPOSTER", "あなたがインポスター")}
                    </Text>
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
                colors={style.gradient}
                style={styles.nextGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.nextBtnText}>
                  {index + 1 >= roles.length
                    ? t("Alle klare →", "Everyone ready →", "全員準備OK →")
                    : t("Neste spiller →", "Next player →", "次のプレイヤー →")}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      )}

      {phase === "done" && (
        <View style={styles.doneContent}>
          <Text style={styles.doneEmoji}>🎭</Text>
          <Text style={styles.doneTitle}>{t("Alle er klare!", "Everyone ready!", "全員準備OK！")}</Text>
          <Text style={styles.doneSub}>
            {t("Diskuter, gi hint og finn imposteren.", "Discuss, give clues and find the imposter.", "話し合ってヒントを出し、インポスターを見つけよう。")}
          </Text>

          <TouchableOpacity activeOpacity={0.9} style={styles.restartBtn} onPress={restart}>
            <LinearGradient colors={style.gradient} style={styles.restartGradient}>
              <Text style={styles.restartBtnText}>{t("SPILL IGJEN 🔄", "PLAY AGAIN 🔄", "もう一回 🔄")}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.popToTop()}>
            <Text style={styles.homeBtnText}>{t("← Tilbake til hjem", "← Back home", "← ホームへ")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  /* ---------- Toppbar ---------- */
  topBar: {
    paddingHorizontal: 24,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between", zIndex: 20,
  },
  backBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.07)", borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)", alignItems: "center", justifyContent: "center",
  },
  backText: { color: COLORS.text, fontSize: 20, marginTop: -1 },
  modePill: {
    flexDirection: "row", alignItems: "center", gap: 8,
    backgroundColor: "rgba(255,255,255,0.07)", borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)", borderRadius: 999,
    paddingVertical: 9, paddingHorizontal: 16,
  },
  modeEmoji: { fontSize: 15 },
  modeLabel: { fontFamily: FONT.bold, fontSize: 14 },

  /* ---------- Setup ---------- */
  phase: { flex: 1 },
  scroll: { paddingTop: 28, paddingHorizontal: 24, paddingBottom: 40 },
  hero: { marginBottom: 24 },
  eyebrow: { fontFamily: FONT.label, fontSize: 11, letterSpacing: 3, color: COLORS.text50 },
  heroTitleRow: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "flex-start", marginTop: 10, gap: 12,
  },
  heroTitle: { flex: 1, fontFamily: FONT.extra, fontSize: 38, lineHeight: 40, letterSpacing: -1, color: COLORS.text },
  heroEmoji: { fontSize: 40, lineHeight: 44 },
  heroSub: { marginTop: 10, maxWidth: width * 0.75, fontFamily: FONT.regular, fontSize: 14, lineHeight: 20, color: COLORS.text60 },
  infoCard: {
    backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 22,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", padding: 18, marginBottom: 24,
  },
  infoTitle: { fontFamily: FONT.extra, fontSize: 17, color: COLORS.text, marginBottom: 14 },
  ruleRow: { flexDirection: "row", marginBottom: 10 },
  ruleEmoji: { fontSize: 17, marginRight: 10 },
  ruleText: { flex: 1, fontFamily: FONT.regular, fontSize: 13, lineHeight: 19, color: COLORS.text55 },
  sectionLabel: { fontFamily: FONT.label, fontSize: 11, letterSpacing: 3, color: COLORS.text50, marginBottom: 12 },
  inputRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  inputIcon: { width: 46, height: 46, borderRadius: 14, borderWidth: 1, alignItems: "center", justifyContent: "center", marginRight: 12 },
  inputIconText: { fontFamily: FONT.bold, fontSize: 15 },
  input: {
    flex: 1, height: 52, backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.14)",
    color: COLORS.text, fontFamily: FONT.medium, fontSize: 16, paddingHorizontal: 16,
  },
  removeBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.07)", borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)", alignItems: "center",
    justifyContent: "center", marginLeft: 10,
  },
  removeBtnText: { color: COLORS.text45, fontSize: 17, fontFamily: FONT.bold },
  addBtn: {
    borderRadius: 16, borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)", backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center", justifyContent: "center", paddingVertical: 16, marginBottom: 16,
  },
  addBtnText: { fontFamily: FONT.bold, fontSize: 14, letterSpacing: 0.5 },
  startBtn: { borderRadius: 16, overflow: "hidden" },
  startGradient: { paddingVertical: 17, alignItems: "center", justifyContent: "center" },
  startBtnText: { color: COLORS.text, fontFamily: FONT.bold, fontSize: 15, letterSpacing: 2 },
  disabledBtn: { opacity: 0.5 },

  /* ---------- Reveal ---------- */
  revealContent: { flex: 1, paddingHorizontal: 24, justifyContent: "center", alignItems: "center" },
  revealSub: { fontFamily: FONT.label, fontSize: 11, letterSpacing: 3, color: COLORS.text50, marginBottom: 8 },
  revealName: { fontFamily: FONT.extra, fontSize: 34, letterSpacing: -1, color: COLORS.text, marginBottom: 28 },
  revealCard: {
    width: width - 48, minHeight: 230, borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)", padding: 32,
    alignItems: "center", justifyContent: "center", marginBottom: 24,
  },
  holdContent: { alignItems: "center" },
  holdEmoji: { fontSize: 40, marginBottom: 14 },
  holdTitle: { fontFamily: FONT.extra, fontSize: 20, color: COLORS.text, marginBottom: 8 },
  holdSub: { fontFamily: FONT.regular, fontSize: 13, color: COLORS.text45 },
  cardContent: { alignItems: "center" },
  cardBadge: { borderWidth: 1, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999, marginBottom: 18 },
  cardBadgeText: { fontFamily: FONT.label, fontSize: 10, letterSpacing: 1.5 },
  cardWord: { fontFamily: FONT.black, fontSize: 40, letterSpacing: -1, color: COLORS.text, marginBottom: 10, textAlign: "center" },
  cardHint: { fontFamily: FONT.regular, fontSize: 14, color: COLORS.text55 },
  imposterBadge: {
    borderWidth: 1, borderColor: "rgba(236,72,120,0.5)",
    paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999, marginBottom: 18,
  },
  imposterBadgeText: { color: COLORS.pink, fontFamily: FONT.label, fontSize: 10, letterSpacing: 1.5 },
  imposterWord: { color: COLORS.pink, fontFamily: FONT.black, fontSize: 46, marginBottom: 10 },
  nextBtn: { width: width - 48, borderRadius: 16, overflow: "hidden" },
  nextGradient: { paddingVertical: 17, alignItems: "center", justifyContent: "center" },
  nextBtnText: { color: COLORS.text, fontFamily: FONT.bold, fontSize: 15, letterSpacing: 2 },

  /* ---------- Ferdig ---------- */
  doneContent: { flex: 1, paddingHorizontal: 24, justifyContent: "center", alignItems: "center" },
  doneEmoji: { fontSize: 64, marginBottom: 18 },
  doneTitle: { fontFamily: FONT.extra, fontSize: 36, letterSpacing: -1, color: COLORS.text, marginBottom: 12 },
  doneSub: { fontFamily: FONT.regular, fontSize: 15, lineHeight: 22, color: COLORS.text55, textAlign: "center", marginBottom: 30 },
  restartBtn: { width: "100%", borderRadius: 16, overflow: "hidden", marginBottom: 14 },
  restartGradient: { paddingVertical: 17, alignItems: "center", justifyContent: "center" },
  restartBtnText: { color: COLORS.text, fontFamily: FONT.bold, fontSize: 15, letterSpacing: 2 },
  homeBtn: { paddingVertical: 12 },
  homeBtnText: { fontFamily: FONT.semi, fontSize: 14, color: COLORS.text40 },
});
