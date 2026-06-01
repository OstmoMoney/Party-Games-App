import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet, Text, View, TouchableOpacity,
  Vibration, Animated, Platform, Dimensions, StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { t } from "../../i18n";

const { width, height } = Dimensions.get("window");
const SWIPE_EDGE = 25;

const FINGER_COLORS = [
  "#FF6B6B", "#5EEAD4", "#60A5FA",
  "#F59E0B", "#A78BFA", "#34D399", "#F472B6",
];

const QUESTIONS = {
  chill: {
    no: [
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
      "Du kan kun hviske de tre neste rundene",
      "Send en kjærlighetserklæring til et crush",
      "Send en jeg savner deg melding til en fling",
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
    en: [
      "Take a sip 🍺",
      "Say something nice about the person to your left",
      "Do 10 push-ups",
      "Call someone and say 'I miss you'",
      "Say three things you're grateful for",
      "Switch seats with someone",
      "Tell a bad joke",
      "Give someone in the room a compliment",
      "Share something nobody knows about you",
      "Take a selfie with the person to your right",
      "Say the alphabet backwards",
      "Imitate someone in the room",
      "Dance for 15 seconds",
      "Say something in another language",
      "Tell your most embarrassing story",
      "Sing the first verse of any song",
      "Give everyone in the room a high five",
      "Follow a new person on Instagram that you're attracted to",
      "Take two sips",
      "Take three sips",
      "Describe your crush",
      "Send a DM, the person to your left decides who",
      "Send a random emoji to a coworker",
      "Share your biggest sexual weakness",
      "Make a shot for someone in the room",
      "Make a beer for whoever likes beer the least",
      "Tell your best joke",
      "Who in the room is the most attractive",
      "Tell a secret",
      "What's the weirdest thing in your bag",
      "List everything in your bedside drawer",
      "How much money do you have in your account right now",
      "When were you last in love",
      "What's your type",
      "Tell a riddle",
      "After this, play the drunk version",
      "Skip straight to blasted version",
      "You can only whisper for the next three rounds",
      "Send a love declaration to a crush",
      "Send an 'I miss you' message to a fling",
      "The person to your left can mix you a drink",
      "It's fine, we skip you",
      "Drink some water",
      "Drink a bit more water",
      "Are you tipsy? Take three big sips",
      "You have to chug, but just a glass of water",
      "Chug a beer",
      "Post something random on your story",
      "Send a selfie to 5 random contacts",
      "Decide the late-night food for the group",
      "Where's the pizza? Order pizza for everyone (1% chance)",
      "Take a break from the game",
      "Everyone: last person to finish their drink buys the next round",
      "Take two sips",
    ],
  },
  date: {
    no: [
      "Si noe sårbart om deg selv",
      "Beskriv drømmedaten din",
      "Si hvem i rommet du synes er mest attraktiv",
      "Ring noen du liker og si du tenker på dem",
      "Gi personen til høyre et oppriktig kompliment",
      "Si den søteste tingen du har gjort for noen du likte",
      "Fortell om første gang du ble skikkelig forelsket",
      "Si noe du vanligvis ikke tør si til noen du er tiltrukket av",
      "Beskriv drømmepartneren din uten å tenke deg om",
      "Si hvem du ville tatt med på date her",
      "Fortell din mest pinlige romantiske opplevelse",
      "Send en hjerte-emoji til den siste personen du flørtet med",
      "Si hva som gjør deg forelsket i noen",
      "Fortell hva du ser etter i et forhold",
      "Si noe romantisk til personen rett overfor deg",
      "Beskriv det beste kysset du har hatt",
      "Fortell om noen du savner",
      "Si hva som er din største romantiske svakhet",
      "Gi alle i rommet et personlig kompliment",
      "Fortell hva kjærlighet betyr for deg",
      "Si hvem her du ville ha holdt i hånden i kveld",
      "Beskriv det søteste noen har gjort for deg",
      "Si tre ting du setter pris på hos den til venstre",
      "Fortell om en gang du var modig i kjærlighet",
      "Si hva du ville skrevet i et kjærlighetsbrev",
    ],
    en: [
      "Share something vulnerable about yourself",
      "Describe your dream date",
      "Say who in the room you find most attractive",
      "Call someone you like and tell them you're thinking of them",
      "Give the person to your right a genuine compliment",
      "Share the sweetest thing you've done for someone you liked",
      "Tell about the first time you really fell in love",
      "Say something you usually don't dare say to someone you're attracted to",
      "Describe your dream partner without thinking too much",
      "Say who here you'd take on a date",
      "Share your most embarrassing romantic experience",
      "Send a heart emoji to the last person you flirted with",
      "Say what makes you fall for someone",
      "Share what you look for in a relationship",
      "Say something romantic to the person directly opposite you",
      "Describe the best kiss you've had",
      "Talk about someone you miss",
      "Share your biggest romantic weakness",
      "Give everyone in the room a personal compliment",
      "Share what love means to you",
      "Say who here you'd hold hands with tonight",
      "Describe the sweetest thing someone has done for you",
      "Say three things you appreciate about the person to your left",
      "Share a time you were brave in love",
      "Say what you would write in a love letter",
    ],
  },
  drunk: {
    no: [
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
      "Bodycount",
      "Hvem lå du sist med",
      "Eldste du har ligget med",
      "Yngste du har ligget med",
      "Bytt det siste sifret på nummeret ditt +/- 1, ring personen og si dere er nummernabo",
      "Scroll hardt over \"utforsk\" på instagram, følg øverste personen",
      "Finn en person på instagram uten fellesvenner, kom med en teit pickupline",
      "Send en cringe / flørtene melding til en random",
      "Spørr en random om nummeret",
      "Kjøp en drink til personen ovenfor deg",
      "Spill blasted istedenfor",
    ],
    en: [
      "Take two sips 🍺🍺",
      "Everyone else takes a sip",
      "Choose one person who has to take a sip",
      "Take a shot",
      "Fill up your glass and drink half",
      "Swap drinks with the person to your left",
      "Instagram: Swipe quickly through stories, wherever your finger lands you imitate the post and publish it on your own story",
      "Switch seats with someone you never talk to",
      "Take a sip for every time you've been drunk this week",
      "Everyone who's been on Tinder today drinks",
      "Say something nice about the person to your right",
      "Take a sip without using your hands",
      "Everyone with dark hair takes a sip",
      "Take a sip if you're single",
      "Speak with an accent for 2 minutes — if you break it take a sip",
      "The oldest person in the room decides who takes a shot",
      "Call your ex — if you can't do it take 3 sips",
      "Everyone takes a sip and says something about the person who got the colour",
      "Take a sip for every dating app you have",
      "Play 'Never Have I Ever' — say something you've never done, whoever has done it drinks",
      "Take a sip if you've stalked someone today",
      "The person with the most expensive outfit chooses who drinks",
      "Say who you think will get a partner first",
      "The quietest person takes 2 sips",
      "Take a sip if you've been rejected",
      "Say who's most likely to get messy tonight",
      "Take a sip if you've flirted tonight",
      "Say who should go home first",
      "Whoever has been single the longest takes 2",
      "Kiss, marry and kill with the people in the game",
      "Who here would you take home tonight",
      "Your best pickup line",
      "Your worst pickup line",
      "What's your type",
      "Asian vs White",
      "Black vs White",
      "Black vs Asian",
      "Your wildest conspiracy theory",
      "Are you kinky",
      "During the evening, make eye contact with the most attractive person in the room",
      "During the evening, wink at the most attractive person",
      "Tell your best joke",
      "Body count",
      "Who did you last sleep with",
      "Oldest person you've slept with",
      "Youngest person you've slept with",
      "Change the last digit of your number +/- 1, call the person and say you're number neighbours",
      "Scroll fast through 'explore' on Instagram, follow the top person",
      "Find someone on Instagram with no mutual friends, send a cringy pickup line",
      "Send a cringy flirty message to a random",
      "Ask a random for their number",
      "Buy a drink for the person above you",
      "Play blasted instead",
    ],
  },
  nasj: {
    no: [
      "Kyss personen til venstre eller ta 3 shots",
      "Ta av deg ett plagg eller drikk tre shots",
      "Fortell din villeste sexopplevelse eller ta 2 shots",
      "Send en NSFW-melding til den siste personen i innboksen din",
      "Sitt i fanget til personen til høyre i 1 minutt",
      "Spill '7 minutter i paradis' med en du velger",
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
      "Beskriv eksen din på best mulig måte",
      "Personen til venstre for deg velger hvem du skal ha \"7 minutes paradise\" med + begge skal ta av et plagg i rommet",
      "En velger å bli fløret med, du skal nå være flørtende med personen resten av kvelden i alle dialoger. En slurk for hver gang du glemmer",
      "Du må gjøre det en har blånektet for",
      "Kyss en i rommet",
      "Gjett hvem i rommet som har best draget",
      "Hvem i rommet kunne du tatt med deg hjem",
      "Ta to slurker",
      "Den ved siden av deg må ta to slurker",
      "Ta en shot",
      "Drikk et helt glass med vann",
      "Drikk opp resten av ølen",
      "Du er ute, for de tre neste rundene",
      "Gjør klar taxi, det er på tide å dra hjem",
      "Velg en person som skal være den siste person som drar ikveld",
      "Følg en gammel kjenning på instagram",
      "Fortell en hemmelighet",
      "Add de tre første av motsatt kjønn på snapchat quick-add",
      "Les opp ick-listen din",
      "I skjul: Blunk med et øye, til den peneste i spillet. Iløpet av kvelden (øyekontakt er viktig)",
      "Hva er din bodycount, personen til høyre må drikke så mange slurker",
      "Prøv å stå på henda",
      "Vis ditt beste flørtetriks",
      "Ta en slurk hvis du har flørtet ikveld",
      "Beskriv din type basert på personlighet",
      "Beskriv din type basert på utseende",
      "Antall personer i rommet du hadde ligget med, drikk så så mange slurker",
      "Du kan nå velge hvem som skal gjøre de 4 neste \"Risk it\"",
      "Du skal få med en til i spillet, eller chug resten av drinken",
      "Stjel en øl iløpet av kvelden",
      "Gi en drink til den som har drukket minst",
      "Sjekk mobilen til personen til venstre for deg (30 sekunder)",
      "Vis ditt siste bilde",
      "Vis nettleser loggen din, til en valgri person",
      "Svar ærlig, er du full",
      "Svar ærlig, har du eller planlegger å ta drugs ikveld",
      "Beste fylla historien din",
      "Alle tar en slurk og sier noe om personen som fikk fargen",
      "Gjør 10 push-ups",
      "Beskriv crushet ditt",
    ],
    en: [
      "Kiss the person to your left or take 3 shots",
      "Take off one item of clothing or drink three shots",
      "Tell your wildest sexual experience or take 2 shots",
      "Send an NSFW message to the last person in your inbox",
      "Sit in the lap of the person to your right for 1 minute",
      "Play '7 minutes in paradise' with someone you choose",
      "Describe your type in detail — without lying",
      "Say who in the room you'd kiss, who you'd marry, who you'd avoid",
      "Do your best sexy walk across the room",
      "Whisper something dirty in the ear of the person to your right",
      "Send a dating app match a message right now",
      "Tell about your worst sexual experience",
      "Let the room decide who you have to flirt with for 5 minutes",
      "Take a body shot from someone you choose",
      "Show the most embarrassing photo on your phone",
      "Read out the last message thread you're embarrassed about",
      "Let the person to your left look through your phone for 30 seconds",
      "Describe your ex in the best possible way",
      "The person to your left chooses who you have '7 minutes in paradise' with + both must remove a piece of clothing",
      "Someone chooses to be flirted with, you must now be flirty with that person for the rest of the evening. One sip every time you forget",
      "You have to do what someone has flatly refused to do",
      "Kiss someone in the room",
      "Guess who in the room has the best game",
      "Who in the room could you take home",
      "Take two sips",
      "The person next to you must take two sips",
      "Take a shot",
      "Drink a full glass of water",
      "Finish the rest of your beer",
      "You're out for the next three rounds",
      "Order a taxi, it's time to go home",
      "Choose a person who will be the last to leave tonight",
      "Follow an old acquaintance on Instagram",
      "Tell a secret",
      "Add the first three of the opposite gender on Snapchat quick-add",
      "Read out your ick list",
      "Secretly: Wink at the most attractive person in the game. During the evening (eye contact is important)",
      "Your body count, the person to your right must drink that many sips",
      "Try to do a handstand",
      "Show your best flirting move",
      "Take a sip if you've flirted tonight",
      "Describe your type based on personality",
      "Describe your type based on looks",
      "Number of people in the room you'd sleep with, drink that many sips",
      "You can now choose who does the next 4 'Risk its'",
      "Get one more person into the game, or chug the rest of your drink",
      "Steal a beer during the evening",
      "Give a drink to whoever has drunk the least",
      "Check the phone of the person to your left (30 seconds)",
      "Show your last photo",
      "Show your browser history to a chosen person",
      "Be honest, are you drunk",
      "Be honest, have you or are you planning to take drugs tonight",
      "Best drunk story",
      "Everyone takes a sip and says something about the person who got the colour",
      "Do 10 push-ups",
      "Describe your crush",
    ],
  },
  blasted: {
    no: [
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
      "Følg eksen din på Instagram",
      "Ta 5 slurker",
      "Del ut 5 slurker",
      "Hvem her har mest Aura",
      "Hvem er hottest",
      "Du er safe, for nå",
      "Ring en venn og si at du er gravid/far - Legg på og vent 20 minutter",
      "En i rommet som vil, skal få lov til å se kjønnsorganet ditt ikveld (30 sekunder), så lenge personen samtykker",
      "Ingen grenser — rommet bestemmer straffen",
      "I skjul: Blunk med et øye, til den peneste i spillet. Iløpet av kvelden (øyekontakt er viktig)",
      "Hva er din bodycount, personen til høyre må drikke så mange slurker",
      "Prøv å stå på henda",
      "Vis ditt beste flørtetriks",
      "Ta en slurk hvis du har flørtet ikveld",
      "Beskriv din type basert på personlighet",
      "Beskriv din type basert på utseende",
      "Antall personer i rommet du hadde ligget med, drikk så så mange slurker",
      "Du kan nå velge hvem som skal gjøre de 4 neste \"Risk it\"",
      "Du skal få med en til i spillet, eller chug resten av drinken",
      "Stjel en øl iløpet av kvelden",
      "Gi en drink til den som har drukket minst",
      "Sjekk mobilen til personen til venstre for deg (30 sekunder)",
      "Hold eller bli holdt rundt av forrige spiller, de 5 neste rundene",
      "15 cm unna max - Stirr hverandre i øynene i 15 sekunder",
      "Hvis din biggest fumble",
      "Fortell en vits",
      "Fortell en gåte",
      "Hvem er kjekkest i rommet",
      "Hvem er penest i rommet",
      "Si navnet på en kollega du kunne ligget med",
      "Kjøp en nattpølse til en person",
      "Du skal ta med deg en suvernir fra utestedet",
      "Du er safe, for nå",
      "Du må gjøre det en har blånektet for",
      "Kyss en i rommet",
      "Gjett hvem i rommet som har best draget",
      "Hvem i rommet kunne du tatt med deg hjem",
      "Kyss personen til venstre eller ta 3 shots",
      "Drikk et helt glass med vann",
      "Drikk opp resten av ølen",
      "Hvilken kollega misliker du mest",
      "Fiks deg en date fra tinder nå",
      "La alle personene rundt deg, sende en pickupline til en du ikke kjenner på instagram",
      "Like alle på tinder, du skal prøve å møte den første matchen ila kvelden",
      "Du må gjøre det du blånektet for sist",
      "Spill imposter iløpet av kvelden",
      "Alle skåler, du tar to slurker",
      "Få nummeret til noen ikveld",
      "Når onanerte du sist",
      "Hvem lå du med sist",
      "Gå inn på profilen til en, lik 3 gamle bilder",
      "Add 2 personer fra quick add på snapchat",
      "Lag en tiktok video der dere spiller dette spillet",
      "Film neste challenge og del den på story, eller ta 3 shots",
      "Følg exen din på instagram",
      "Slide inn i dms på exen din",
      "Følg personen bestevennen din dater atm, på instagram",
      "loyalty test: Hvem dater vennen din, slide inn i DM's på personen",
      "loyalty test: Send DM til partneren til en rundt bordet",
      "loyalty test: Hadde du byttet parteren din for 100 milioner",
      "Hvis du møtte en ånd, hva hadde dine tre ønsker vært",
      "Kiss, marry or kill, personene i rommet",
      "Bestill den turen, den solo turen du alltid har tenkt på. Eller ta 3 shots",
      "Gjør 10 push-ups",
      "Mystery Shot: Alle i rommet heller litt drikke i din kopp",
      "Bytt outfit med personen til venstre for deg",
      "7 Minutes in Heaven: Du bestemmer hvem de to skal være. Nektelse: 9 shots fordelt på dere 3",
      "Post et ultrabilde av en baby på instagram. La stå i 20 minutter",
      "Send: \"Jeg vet hva du gjorde\" til en du dater",
    ],
    en: [
      "Call a stranger and tell them you love them",
      "Take off two items of clothing",
      "Kiss the person with the most fingers on the screen",
      "Let the room decide a text you have to write on your body with a pen",
      "Tell your darkest secret",
      "Let everyone look through your phone for 1 minute",
      "Do something you've never done in front of everyone",
      "Send your ex 'we should talk'",
      "Blindfold: opposite gender kisses you, guess who",
      "Everyone can ask you ONE question and you MUST answer honestly",
      "Follow your ex on Instagram",
      "Take 5 sips",
      "Hand out 5 sips",
      "Who here has the most Aura",
      "Who is the hottest",
      "You're safe, for now",
      "Call a friend and say you're pregnant/a father - hang up and wait 20 minutes",
      "Someone in the room who wants to can see your genitals tonight (30 seconds), as long as the person consents",
      "No limits — the room decides the punishment",
      "Secretly: Wink at the most attractive person in the game. During the evening (eye contact is important)",
      "Your body count, the person to your right must drink that many sips",
      "Try to do a handstand",
      "Show your best flirting move",
      "Take a sip if you've flirted tonight",
      "Describe your type based on personality",
      "Describe your type based on looks",
      "Number of people in the room you'd sleep with, drink that many sips",
      "You can now choose who does the next 4 'Risk its'",
      "Get one more person into the game, or chug the rest of your drink",
      "Steal a beer during the evening",
      "Give a drink to whoever has drunk the least",
      "Check the phone of the person to your left (30 seconds)",
      "Hold or be held by the previous player for the next 5 rounds",
      "15 cm max distance - stare into each other's eyes for 15 seconds",
      "What's your biggest fumble",
      "Tell a joke",
      "Tell a riddle",
      "Who is the most handsome in the room",
      "Who is the most beautiful in the room",
      "Name a coworker you could have slept with",
      "Buy someone a hot dog",
      "You must take a souvenir from the venue",
      "You're safe, for now",
      "You have to do what someone has flatly refused to do",
      "Kiss someone in the room",
      "Guess who in the room has the best game",
      "Who in the room could you take home",
      "Kiss the person to your left or take 3 shots",
      "Drink a full glass of water",
      "Finish the rest of your beer",
      "Which coworker do you dislike the most",
      "Get yourself a date from Tinder right now",
      "Let all the people around you send a pickup line to someone they don't know on Instagram",
      "Like everyone on Tinder, try to meet the first match during the evening",
      "You have to do what you refused last time",
      "Play imposter during the evening",
      "Everyone cheers, you take two sips",
      "Get someone's number tonight",
      "When did you last masturbate",
      "Who did you last sleep with",
      "Go to someone's profile, like 3 old photos",
      "Add 2 people from quick add on Snapchat",
      "Make a TikTok video where you're playing this game",
      "Film the next challenge and share it on your story, or take 3 shots",
      "Follow your ex on Instagram",
      "Slide into your ex's DMs",
      "Follow the person your best friend is currently dating on Instagram",
      "Loyalty test: Who is your friend dating, slide into that person's DMs",
      "Loyalty test: Send a DM to the partner of someone at the table",
      "Loyalty test: Would you swap your partner for 100 million",
      "If you met a genie, what would your three wishes be",
      "Kiss, marry or kill, the people in the room",
      "Book that trip, the solo trip you've always thought about. Or take 3 shots",
      "Do 10 push-ups",
      "Mystery Shot: Everyone in the room pours a little of their drink into your cup",
      "Swap outfits with the person to your left",
      "7 Minutes in Heaven: You decide who the two people are. Refusal: 9 shots split between the three of you",
      "Post an ultrasound photo of a baby on Instagram. Leave it up for 20 minutes",
      "Send: 'I know what you did' to someone you're dating",
    ],
  },
};

const MODE_COLORS = {
  chill:   ["#0a1a0e", "#0d2a14", "#0a1a0e"],
  date:    ["#1A0A14", "#100609", "#1A0A14"],
  drunk:   ["#080f1a", "#0a1830", "#080f1a"],
  nasj:    ["#140a04", "#241208", "#140a04"],
  blasted: ["#140606", "#240a0a", "#140606"],
};

const MODE_ACCENT = {
  chill:   "#4ade80",
  date:    "#EC4899",
  drunk:   "#60a5fa",
  nasj:    "#fb923c",
  blasted: "#f87171",
};

const MODE_LABEL = {
  chill:   "CHILL",
  date:    "DATE",
  drunk:   "DRUNK",
  nasj:    "NASJ",
  blasted: "BLASTED",
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

  const lang = t("no", "en", "en");
  const modeQuestions = QUESTIONS[mode]?.[lang] || QUESTIONS[mode]?.no || QUESTIONS.chill.no;

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

  const instructText = lang === "no"
    ? "Legg minst 2 fingre på skjermen for å starte"
    : "Place at least 2 fingers on the screen to start";
  const maxPlayersText = lang === "no" ? "Maks 7 spillere" : "Max 7 players";
  const challengeLabel = lang === "no" ? "UTFORDRING" : "CHALLENGE";
  const continueText = lang === "no" ? "Fortsett →" : "Continue →";
  const endGameText = lang === "no" ? "Avslutt spillet" : "End game";

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

      {/* Gold glow blobs */}
      <View style={[styles.glowBlobTop, { backgroundColor: accent + "25" }]} />
      <View style={[styles.glowBlobBottom, { backgroundColor: accent + "15" }]} />

      <Bubble size={50} left={30}       delay={0}    duration={16000} color={accent} />
      <Bubble size={30} left={150}      delay={3000} duration={20000} color={accent} />
      <Bubble size={70} left={width-90} delay={1500} duration={18000} color={accent} />
      <Bubble size={40} left={width-40} delay={5000} duration={22000} color={accent} />

      {gameState === "intro" && (
        <Animated.View style={[styles.backWrap, { opacity: fadeAnim }]}>
          <TouchableOpacity style={[styles.backBtn, { borderColor: accent + "40" }]} onPress={() => navigation.goBack()}>
            <Text style={[styles.backText, { color: accent }]}>←</Text>
          </TouchableOpacity>
          <View style={[styles.modePill, { backgroundColor: accent + "18", borderColor: accent + "55" }]}>
            <Text style={[styles.modeLabel, { color: accent }]}>{MODE_LABEL[mode] || mode.toUpperCase()}</Text>
          </View>
        </Animated.View>
      )}

      {gameState === "intro" && (
        <Animated.View style={[styles.center, { opacity: fadeAnim }]}>
          <Text style={styles.logo}>🤾</Text>
          <Text style={[styles.title, { color: accent }]}>RISK IT</Text>
          <Text style={[styles.sub, { color: accent + "BB" }]}>{(MODE_LABEL[mode] || mode).toUpperCase()} MODE</Text>
          <View style={[styles.instructBox, { borderColor: accent + "30", backgroundColor: accent + "0A" }]}>
            <Text style={[styles.instruct, { color: accent + "CC" }]}>{instructText}</Text>
          </View>
          <Text style={[styles.subSmall, { color: accent + "55" }]}>{maxPlayersText}</Text>
        </Animated.View>
      )}

      {gameState === "playing" && (
        <View style={styles.center} pointerEvents="none">
          <Text style={[styles.countdown, { color: accent + "30" }]}>{countdown}</Text>
        </View>
      )}

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

      {gameState === "result" && (
        <View style={styles.resultOverlay}>
          <View style={styles.resultCard}>
            <View style={[styles.resultAccent, { backgroundColor: accent }]} />
            <Text style={[styles.resultLabel, { color: accent + "99" }]}>{challengeLabel}</Text>
            <Text style={styles.resultQuestion}>{question}</Text>
            <TouchableOpacity
              style={[styles.continueBtn, { backgroundColor: accent }]}
              onPress={resetGame}
              activeOpacity={0.85}
            >
              <Text style={[styles.continueBtnText]}>{continueText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeLink} onPress={() => navigation.popToTop()}>
              <Text style={styles.homeLinkText}>{endGameText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  glowBlobTop: {
    position: "absolute",
    top: -120,
    left: width / 2 - 150,
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  glowBlobBottom: {
    position: "absolute",
    bottom: -100,
    right: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
  },

  backWrap: {
    position: "absolute", top: 56, left: 20, right: 20,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    zIndex: 10,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    alignItems: "center", justifyContent: "center",
  },
  backText: { fontSize: 18, fontWeight: "900" },
  modePill: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 999, borderWidth: 1,
  },
  modeLabel: { fontSize: 13, fontWeight: "800", letterSpacing: 1 },

  center: {
    flex: 1, alignItems: "center", justifyContent: "center",
  },
  logo: { fontSize: 60, marginBottom: 8 },
  title: { fontSize: 52, fontWeight: "900", letterSpacing: 4, marginBottom: 4 },
  sub: { fontSize: 16, fontWeight: "800", letterSpacing: 2, marginBottom: 36 },
  instructBox: {
    borderRadius: 16, paddingHorizontal: 24, paddingVertical: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  instruct: { fontSize: 15, textAlign: "center", fontWeight: "600" },
  subSmall: { fontSize: 13 },

  countdown: {
    fontSize: 130, fontWeight: "900", letterSpacing: -4,
  },

  fingerDot: {
    position: "absolute",
    width: 88, height: 88, borderRadius: 44,
  },

  resultOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  resultCard: {
    width: width - 48,
    backgroundColor: "rgba(10,10,20,0.82)",
    borderRadius: 28, padding: 28,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  resultAccent: {
    position: "absolute", top: 0, left: 0, right: 0, height: 3,
  },
  resultLabel: {
    fontSize: 12,
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