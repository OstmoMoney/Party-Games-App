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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const ROUND_SIZE = 25;

const QUESTIONS = {
  chill: {
    no: [
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
      "Jeg har aldri latet som jeg er opptatt for å unngå noen",
      "Jeg har aldri stjålet godteri fra en butikk som barn",
      "Jeg har aldri vunnet et spill ved å jukse",
      "Jeg har aldri latt som jeg var travel for å se viktig ut",
      "Jeg har aldri sagt 'jeg er snart der' når jeg ikke engang hadde begynt å kle på meg",
      "Jeg har aldri unngått å svare på en melding i dagevis",
      "Jeg har aldri brukt andres sjampo uten å spørre",
      "Jeg har aldri latt som jeg ikke var hjemme når noen banket på",
      "Jeg har aldri tatt en matboks fra jobben som ikke var min",
      "Jeg har aldri latt som jeg likte en gave jeg hatet",
      "Jeg har aldri byttet sete på fly for å unngå noen jeg kjente",
      "Jeg har aldri latt som jeg ikke snakker et språk for å slippe en samtale",
      "Jeg har aldri betalt noen for å gjøre skolearbeid for meg",
      "Jeg har aldri hatt en falsk profil på nett",
      "Jeg har aldri latt som jeg var noen andre på telefonen",
      "Jeg har aldri blitt eskortert ut av et fly",
      "Jeg har aldri vunnet penger på kasino",
      "Jeg har aldri vært på TV eller i avisa",
      "Jeg har aldri dratt på ferie helt alene",
      "Jeg har aldri sabotert noen andres plan for å få det som jeg vil",
      "Jeg har aldri brukt over en time på å finne noe å se på Netflix",
      "Jeg har aldri svart i feil gruppechat",
      "Jeg har aldri falt på is foran mange mennesker",
      "Jeg har aldri sovet med sokkene på",
      "Jeg har aldri glemt å dempe mikrofonen på et videomøte",
      "Jeg har aldri grått av en reklame",
      "Jeg har aldri spist hele posen med potetgull alene på én kveld",
      "Jeg har aldri googlet symptomene mine og konkludert med at jeg er alvorlig syk",
      "Jeg har aldri lagt meg uten å pusse tennene og latet som det var greit",
      "Jeg har aldri tatt bilde av noen på gata som stilte seg foran motivet mitt",
    ],
    en: [
      "I have never stolen anything",
      "I have never drunk texted someone I shouldn't have",
      "I have never cheated on someone",
      "I have never been on a yacht",
      "I have never hit someone",
      "I have never forgotten a friend's birthday",
      "I have never sneaked out of a boring date",
      "I have never faked being sick to skip work",
      "I have never googled myself",
      "I have never pretended to laugh at a joke I didn't get",
      "I have never ridden a bus without a ticket",
      "I have never been kicked out of a place",
      "I have never taken a selfie on the toilet",
      "I have never read the ending of a book first",
      "I have never stalked an ex on Instagram",
      "I have never eaten someone else's food in the fridge",
      "I have never lied about my age",
      "I have never cancelled plans at the last minute",
      "I have never drunk milk straight from the carton",
      "I have never talked to myself out loud",
      "I have never pretended to understand a movie I slept through",
      "I have never won an argument I knew I was wrong about",
      "I have never called the wrong number and said nothing",
      "I have never taken a double portion and said it was single",
      "I have never skipped a workout and lied about it",
      "I have never bought something expensive and hidden it from family",
      "I have never regretted a tattoo or piercing",
      "I have never forgotten someone's name right after meeting them",
      "I have never pretended to be busy to avoid someone",
      "I have never stolen candy from a shop as a child",
      "I have never won a game by cheating",
      "I have never pretended to be busy to look important",
      "I have never said 'I'm on my way' when I hadn't even started getting ready",
      "I have never ignored a message for days",
      "I have never used someone else's shampoo without asking",
      "I have never pretended not to be home when someone knocked",
      "I have never taken someone else's lunchbox at work",
      "I have never pretended to like a gift I hated",
      "I have never switched seats on a plane to avoid someone I knew",
      "I have never pretended not to speak a language to avoid a conversation",
      "I have never paid someone to do my schoolwork",
      "I have never had a fake profile online",
      "I have never pretended to be someone else on the phone",
      "I have never been escorted off a plane",
      "I have never won money at a casino",
      "I have never been on TV or in the news",
      "I have never gone on holiday completely alone",
      "I have never sabotaged someone else's plan to get my own way",
      "I have never spent over an hour deciding what to watch on Netflix",
      "I have never replied to the wrong group chat",
      "I have never slipped on ice in front of a crowd",
      "I have never slept with my socks on",
      "I have never forgotten to mute myself on a video call",
      "I have never cried at a commercial",
      "I have never eaten an entire bag of crisps alone in one sitting",
      "I have never googled my symptoms and convinced myself I was seriously ill",
      "I have never gone to bed without brushing my teeth and told myself it was fine",
      "I have never accidentally walked into someone else's photo",
    ],
  },
  date: {
    no: [
      "Jeg har aldri sendt en melding til feil person",
      "Jeg har aldri stalket en person i rommet",
      "Jeg har aldri løyet om å være opptatt",
      "Jeg har aldri falt for en venn",
      "Jeg har aldri gjort noe kriminelt",
      "Jeg har aldri sendt en melding og angret med en gang",
      "Jeg har aldri kysset noen på første date",
      "Jeg har aldri ligget på første date",
      "Jeg har aldri vært obsessed i en person",
      "Jeg har aldri forelsket meg i personligheten til en",
      "Jeg har aldri hacket noen",
      "Jeg har aldri delt noe for personlig for tidlig",
      "Jeg har aldri googlet noen før en date",
      "Jeg har aldri brukt timer på å velge hva jeg skulle ha på",
      "Jeg har aldri skrevet en melding om penger tilbake fra en date",
      "Jeg har aldri chaset",
      "Jeg har aldri latt som jeg ikke brydde meg når jeg egentlig gjorde det",
      "Jeg har aldri sagt jeg elsker deg, til en jeg dater",
      "Jeg har aldri onanert, den siste måneden",
      "Jeg har aldri hatt en crush på en kollega",
      "Jeg har aldri bedt om et nummer",
      "Jeg har aldri stukket av fra en kjedelig date (Story time)",
      "Jeg har aldri løyet om hva jeg leter etter i et forhold",
      "Jeg har aldri hatt følelser for to personer samtidig",
      "Jeg har aldri latet som jeg var over noen når jeg ikke var det",
      "Jeg har aldri falt for kun smilet til en",
      "Jeg har aldri spandert mer enn jeg burde",
      "Jeg har aldri datet flere på en gang",
      "Jeg har aldri støttet pride",
      "Jeg har aldri hatt en svært kontroversiell mening",
      "Jeg har aldri lurt på om jeg er gay",
      "Jeg har aldri tenkt på deg, på et dypere nivå",
      "Jeg har aldri dagdrømt om personen jeg dater nå",
      "Jeg har aldri vært en hoe / fuckboy",
      "Jeg har aldri screenshotten en samtale for å vise vennene mine",

"Jeg har aldri sjekket om noen er online etter de ikke svarte",
"Jeg har aldri falt for noen jeg visste var feil for meg",
"Jeg har aldri sendt en melding og later som det var en feil",
"Jeg har aldri googlet horoskopet til noen jeg liker",
"Jeg har aldri tenkt på en annen person under sex",
"Jeg har aldri latet som jeg kom for å slippe unna",
"Jeg har aldri hatt en hemmelig dating app mens jeg datet noen",
"Jeg har aldri fortalt den jeg dater nå, til noen",
"Jeg har aldri latt en ex komme tilbake etter de løy",
"Jeg har aldri lagret nummeret til noen under et falskt navn",
"Jeg har aldri ønsket at en venn var singel, slik at noe kunne skje",
"Jeg har aldri sendt blomster eller gave til noen anonymt",
"Jeg har aldri kysset noen bare for å se hva som ville skje",
"Jeg har aldri skrevet noe til noen, men aldri sendt det",
"Jeg har aldri vært på en date som fikk meg til å grine etterpå",
"Jeg har aldri latt noen tro de var spesiell bare for å beholde oppmerksomheten",
"Jeg har aldri falt for noen raskere enn jeg vil innrømme",
"Jeg har aldri hatt en fantasirelasjon i hodet som aldri ble til noe",
"Jeg har aldri sett på bilder av en ex og savnet dem",
"Jeg har aldri valgt bort noen god fordi tajmingen var feil",
"Jeg har aldri googlet «er dette kjærlighet» etter en date",
"Jeg har aldri latt en kompliment leve i hodet mitt i dagevis",
"Jeg har aldri forandret meg selv for å imponere noen",
"Jeg har aldri fortalt noen at de er grunnen til at jeg smiler",
"Jeg har aldri angret på ikke å ha sagt noe til noen jeg hadde følelser for",
"Jeg har aldri latt noen gå fordi jeg var redd for å bli såret",
"Jeg har aldri sett en fremmed og tenkt «det er typen min»",
"Jeg har aldri holdt hendene til noen og kjent hjertet banke raskere",
"Jeg har aldri forventa mindre av en på første date",
"Jeg har aldri overgått forventningene mine til daten min",
"Jeg har aldri sett en romantisk film alene",
    ],
    en: [
      "I have never texted the wrong person",
      "I have never stalked someone in this room",
      "I have never lied about being busy",
      "I have never fallen for a friend",
      "I have never done something criminal",
      "I have never sent a message and instantly regretted it",
      "I have never kissed someone on a first date",
      "I have never slept with someone on a first date",
      "I have never been obsessed with someone",
      "I have never fallen for someone's personality alone",
      "I have never hacked someone",
      "I have never shared something too personal too soon",
      "I have never googled someone before a date",
      "I have never spent hours deciding what to wear",
      "I have never texted someone asking for money back after a date",
      "I have never been the one chasing",
      "I have never pretended not to care when I really did",
      "I have never said I love you to someone I was dating",
      "I have never masturbated in the last month",
      "I have never had a crush on a coworker",
      "I have never asked for someone's number",
      "I have never walked out of a boring date (Story time)",
      "I have never lied about what I'm looking for in a relationship",
      "I have never had feelings for two people at the same time",
      "I have never pretended to be over someone when I wasn't",
      "I have never fallen for someone just because of their smile",
      "I have never spent more than I should on a date",
      "I have never dated multiple people at once",
      "I have never supported pride",
      "I have never had a very controversial opinion",
      "I have never wondered if I'm gay",
      "I have never thought about you on a deeper level",
      "I have never daydreamed about the person I'm currently dating",
      "I have never been a hoe / fuckboy",
      "I have never screenshotted a conversation to show my friends",
      "I have never checked if someone was online after they didn't reply",
      "I have never fallen for someone I knew was wrong for me",
      "I have never sent a message and pretended it was a mistake",
      "I have never googled someone's horoscope because I liked them",
      "I have never thought about someone else during sex",
      "I have never faked finishing to get out of it",
      "I have never had a secret dating app while seeing someone",
      "I have never told anyone about the person I'm currently dating",
      "I have never let an ex come back after they lied",
      "I have never saved someone's number under a fake name",
      "I have never wished a friend was single so something could happen",
      "I have never sent flowers or a gift anonymously",
      "I have never kissed someone just to see what would happen",
      "I have never written something to someone but never sent it",
      "I have never been on a date that made me cry afterwards",
      "I have never let someone believe they were special just to keep their attention",
      "I have never fallen for someone faster than I want to admit",
      "I have never had a fantasy relationship in my head that never became real",
      "I have never looked through photos of an ex and missed them",
      "I have never turned down someone truly good because the timing was wrong",
      "I have never googled 'is this love' after a date",
      "I have never let a compliment live in my head for days",
      "I have never changed myself to impress someone",
      "I have never told someone they are the reason I smile",
      "I have never regretted not saying something to someone I had feelings for",
      "I have never let someone go because I was scared of getting hurt",
      "I have never seen a stranger and thought 'that's my type'",
      "I have never held someone's hand and felt my heart beat faster",
      "I have never expected less of someone on a first date",
      "I have never exceeded my own expectations on a date",
      "I have never watched a romantic movie alone",
    ],
  },
  drunk: {
    no: [
      "Jeg har aldri kysset noen jeg møtte samme kveld",
      "Jeg har aldri sendt en melding til eksen full om natten",
      "Jeg har aldri danset på et bord",
      "Jeg har aldri drukket til jeg kastet opp",
      "Jeg har aldri hatt one night stand",
      "Jeg har aldri flørtet med noen for å få gratis drikke",
      "Jeg har aldri sovnet på et toalett på fest",
      "Jeg har aldri stjålet drinken til en annen, ute",
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
      "Jeg har aldri vært en hater i kommentarfeltet",
      "Jeg har aldri forsøkt å kysse noen som ikke ville det",
      "Jeg har aldri shottet vann for å late som at jeg drikker",
      "Jeg har aldri sovnet med pizza i ovnen etter fylla",
      "Jeg har aldri gått inn på feil fest",
      "Jeg har aldri tatt feil jakke hjem fra fest",
      "Jeg har aldri bestilt mat full og glemt det til neste morgen",
      "Jeg har aldri ringt feil taxi og kjørt med den uansett",
      "Jeg har aldri sunget karaoke uten å kunne en eneste tekstlinje",
      "Jeg har aldri mistet telefonen på fest og funnet den igjen på do",
      "Jeg har aldri snakket flytende et språk jeg ikke kan, full",
      "Jeg har aldri danset med noen og trodd det gikk bra, men fått vite det ikke gjorde det",
    ],
    en: [
      "I have never kissed someone I met the same night",
      "I have never drunk texted an ex in the middle of the night",
      "I have never danced on a table",
      "I have never drunk until I threw up",
      "I have never had a one night stand",
      "I have never flirted to get free drinks",
      "I have never fallen asleep on a toilet at a party",
      "I have never stolen someone else's drink at a bar",
      "I have never stolen a car",
      "I have never smoked weed",
      "I have never tried harder drugs",
      "I have never gone on dates with different people on the same day",
      "I have never been high in front of my parents",
      "I have never played chess while drunk",
      "I have never robbed someone",
      "I have never had multiple friends with benefits",
      "I have never had a crazy fling or ex",
      "I have never blacked out",
      "I have never stripped",
      "I have never done cosplay",
      "I have never had sex in the woods",
      "I have never had sex in a car",
      "I have never received oral sex in a public place",
      "I have never been a player",
      "I have never lied about my age",
      "I have never sent a pickup line",
      "I have never flirted with someone I wasn't attracted to",
      "I have never woken up at someone's place and regretted it",
      "I have never lied to get sex",
      "I have never slept with someone over 40",
      "I have never had a kink no one here will ever know about",
      "I have never been someone's wingman",
      "I have never lied about my body count",
      "I have never flirted with a friend's partner",
      "I have never played this game before",
      "I have never been to Korea",
      "I have never done BDSM",
      "I have never been banned from a bar",
      "I have never been a hater in the comments",
      "I have never tried to kiss someone who didn't want it",
      "I have never done water shots to pretend I was drinking",
      "I have never fallen asleep with pizza in the oven after a night out",
      "I have never walked into the wrong party",
      "I have never taken the wrong jacket home from a party",
      "I have never ordered food while drunk and forgotten about it until morning",
      "I have never gotten into the wrong taxi and just gone with it",
      "I have never done karaoke without knowing a single line of the song",
      "I have never lost my phone at a party and found it in the bathroom",
      "I have never spoken a language fluently while drunk that I normally can't",
      "I have never danced with someone thinking it went well but been told otherwise",
    ],
  },
  nasj: {
    no: [
      "Jeg har aldri hatt sex på en offentlig plass",
      "Jeg har aldri sett på andres telefon uten å spørre",
      "Jeg har aldri hatt sex mens noen andre var i rommet",
      "Jeg har aldri sendt nakenbilder",
      "Jeg har aldri vært tredjehjulet med vilje",
      "Jeg har aldri hatt sex på første date",
      "Jeg har aldri hatt to relasjoner på en gang",
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
    en: [
      "I have never had sex in a public place",
      "I have never looked through someone's phone without asking",
      "I have never had sex while others were in the room",
      "I have never sent nudes",
      "I have never intentionally been a third wheel",
      "I have never had sex on a first date",
      "I have never been in two relationships at once",
      "I have never let someone believe we were exclusive when we weren't",
      "I have never had sex in a stranger's house not knowing who owns it",
      "I have never had an affair",
      "I have never slept with my boss or an employee",
      "I have never sexted a stranger",
      "I have never filmed myself without planning it",
      "I have never had sex in a car",
      "I have never had sex at a beach party",
      "I have never lied about using protection",
      "I have never slept with a friend's ex",
      "I have never used a dating app just to see if someone I know is on it",
      "I have never paid for sex or been paid",
      "I have never had a crush on a married person and acted on it",
      "I have never posted something sexual online",
      "I have never had sex at work",
      "I have never had a situationship that got way too complicated",
      "I have never refused to admit something was a relationship",
      "I have never slept with two people from the same friend group",
      "I have never deleted evidence from my phone",
      "I have never played on someone's feelings to get something",
      "I have never used someone just for sex and been honest about it",
      "I have never had a one night stand with someone I knew well",
      "I have never had sex while in a relationship with someone else",
      "I have never had sex in a hotel room that wasn't mine",
      "I have never said 'I love you' to get out of a situation",
      "I have never had sex and not remembered it",
      "I have never been caught in the act",
      "I have never shared a bed with someone without anything happening but wanted it to",
      "I have never had a threesome",
      "I have never ghosted someone after sex",
      "I have never said the wrong name during sex",
      "I have never had sex with someone more than 10 years older or younger",
      "I have never fantasized about someone in this room",
    ],
  },
  blasted: {
    no: [
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
    en: [
      "I have never taken photos of someone without them knowing",
      "I have never hacked someone's account",
      "I have never stolen from a shop as an adult",
      "I have never been paid for something illegal",
      "I have never tried drugs",
      "I have never driven too fast and risked other people's lives",
      "I have never sold something I didn't own",
      "I have never scammed someone out of money",
      "I have never been involved in something criminal",
      "I have never watched something online I'm ashamed of",
      "I have never used someone else's money without asking",
      "I have never had sex for payment",
      "I have never played with someone's feelings on purpose for a long time",
      "I have never destroyed something valuable on purpose",
      "I have never spread a rumour I knew was a lie",
      "I have never taken revenge on an ex in a way I regret",
      "I have never been attracted to someone in this room without saying it",
      "I have never done something sexual I've never told anyone about",
      "I have never been part of a threesome against my will",
      "I have never done something on camera that could ruin my career",
      "I have never tried something sexual that is illegal",
      "I have never been involved in a fight that ended with police",
      "I have never sold nudes",
      "I have never drunk and driven",
      "I have never overdosed on something",
      "I have never been blackmailed",
      "I have never cheated in a serious relationship",
      "I have never done something I don't remember that hurt someone else",
      "I have never stolen a partner from a best friend",
      "I have never lied to the police",
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

const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const cleanQuestion = (question) => {
  return question
    .replace(/^Jeg har aldri\s+/i, "")
    .replace(/^I have never\s+/i, "");
};

export default function NeverHaveIEverScreen({ navigation, route }) {
  const playerName = route?.params?.playerName || "Player";
  const mode = route?.params?.mode || "chill";
  const style = MODE_STYLE[mode] || MODE_STYLE.chill;

  const createDeck = () => {
    const lang = t("no", "en", "en");
    const modeQuestions = QUESTIONS[mode];
    const questions = modeQuestions?.[lang] || modeQuestions?.no || [];
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
      Animated.timing(fadeAnim, { toValue: 1, duration: 650, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 650, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: 1, duration: 1900, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1900, useNativeDriver: true }),
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
      Animated.timing(cardOpacity, { toValue: 0, duration: 180, useNativeDriver: true }),
      Animated.timing(cardSlide, { toValue: -35, duration: 180, useNativeDriver: true }),
      Animated.spring(cardScale, { toValue: 0.985, useNativeDriver: true }),
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
        Animated.timing(cardOpacity, { toValue: 1, duration: 230, useNativeDriver: true }),
        Animated.timing(cardSlide, { toValue: 0, duration: 230, useNativeDriver: true }),
      ]).start(() => { setLocked(false); });
    });
  };

  const handleChoice = (hasDone) => {
    if (locked) return;
    setLocked(true);
    setChoice(hasDone);
    if (hasDone) setSips((prev) => prev + 1);
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

  const lang = t("no", "en", "en");
  const cardLabel = lang === "no" ? "JEG HAR ALDRI..." : "I HAVE NEVER...";
  const neverLabel = lang === "no" ? "ALDRI" : "NEVER";
  const doneLabel = lang === "no" ? "HAR GJORT" : "I HAVE";
  const noSipLabel = lang === "no" ? "Ingen slurk" : "No sip";
  const sipLabel = lang === "no" ? "Ta en slurk" : "Take a sip";
  const skipLabel = lang === "no" ? "Hopp over →" : "Skip →";
  const doneTitleLabel = lang === "no" ? "Runden er ferdig!" : "Round complete!";
  const doneSubLabel = lang === "no"
    ? `${playerName} tok`
    : `${playerName} took`;
  const sipsWordLabel = lang === "no" ? "slurker" : "sips";
  const doneRoundLabel = lang === "no" ? "denne runden" : "this round";
  const restartLabel = lang === "no" ? "SPILL IGJEN 🔄" : "PLAY AGAIN 🔄";
  const backLabel = lang === "no" ? "← Tilbake til hjem" : "← Back home";
  const heroSubLabel = lang === "no"
    ? "Svar ærlig. Har du gjort det, tar du en slurk."
    : "Answer honestly. If you have, take a sip.";
  const plusSipLabel = lang === "no" ? "+1 slurk 🍺" : "+1 sip 🍺";
  const neverDoneLabel = lang === "no" ? "Aldri gjort ✋" : "Never done ✋";

  if (done) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <LinearGradient colors={style.bg} locations={[0, 0.48, 1]} style={StyleSheet.absoluteFill} />
        <View style={[styles.colorBlob, { backgroundColor: style.soft }]} />
        <LinearGradient colors={["rgba(5,7,17,0)", "#050711"]} style={styles.darkFade} />
        <View style={styles.doneWrap}>
          <Animated.View style={[styles.doneIconWrap, { transform: [{ translateY: floatY }, { rotate: "-8deg" }] }]}>
            <Text style={styles.doneEmoji}>🍻</Text>
          </Animated.View>
          <Text style={styles.doneTitle}>{doneTitleLabel}</Text>
          <Text style={styles.doneSub}>
            {doneSubLabel}{" "}
            <Text style={[styles.doneHighlight, { color: style.color }]}>{sips} {sipsWordLabel}</Text>
            {"\n"}{doneRoundLabel}
          </Text>
          <TouchableOpacity activeOpacity={0.9} style={styles.restartBtn} onPress={restart}>
            <LinearGradient colors={[style.color, "#B92BFF"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.restartGradient}>
              <Text style={styles.restartText}>{restartLabel}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.popToTop()}>
            <Text style={styles.homeText}>{backLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const question = deck[index];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={style.bg} locations={[0, 0.48, 1]} style={StyleSheet.absoluteFill} />
      <View style={[styles.colorBlob, { backgroundColor: style.soft }]} />
      <LinearGradient colors={["rgba(5,7,17,0)", "#050711"]} style={styles.darkFade} />

      <Animated.View style={[styles.inner, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
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
            style={[styles.progressFill, {
              backgroundColor: style.color,
              width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }),
            }]}
          />
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>NEVER HAVE I EVER</Text>
          <Text style={styles.heroTitle}>Drink if{"\n"}you have</Text>
          <Text style={styles.heroSub}>{heroSubLabel}</Text>
          <Animated.View pointerEvents="none" style={[styles.heroIconWrap, { transform: [{ translateY: floatY }, { rotate: "-8deg" }] }]}>
            <Text style={styles.heroIcon}>🍻</Text>
          </Animated.View>
        </View>

        <View style={styles.cardArea}>
          <View style={[styles.cardBackLayer, { borderColor: `${style.color}18` }]} />
          <Animated.View style={[styles.card, {
            opacity: cardOpacity,
            transform: [{ translateY: cardSlide }, { scale: cardScale }],
            borderColor: `${style.color}30`,
          }]}>
            <View style={[styles.cardTopLine, { backgroundColor: style.color }]} />
            <Text style={[styles.cardLabel, { color: style.color }]}>{cardLabel}</Text>
            <Text style={styles.questionText}>{cleanQuestion(question)}</Text>
            {choice !== null && (
              <View style={[styles.choiceBadge, { backgroundColor: choice ? `${style.color}22` : "rgba(255,255,255,0.06)" }]}>
                <Text style={styles.choiceBadgeText}>{choice ? plusSipLabel : neverDoneLabel}</Text>
              </View>
            )}
          </Animated.View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity activeOpacity={0.88} disabled={locked} style={styles.noBtn} onPress={() => handleChoice(false)}>
            <Text style={styles.buttonEmoji}>✋</Text>
            <Text style={styles.noBtnText}>{neverLabel}</Text>
            <Text style={styles.buttonSub}>{noSipLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} disabled={locked} style={styles.yesBtn} onPress={() => handleChoice(true)}>
            <LinearGradient colors={[style.color, "#B92BFF"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.yesGradient}>
              <Text style={styles.buttonEmoji}>🍺</Text>
              <Text style={styles.yesBtnText}>{doneLabel}</Text>
              <Text style={styles.yesBtnSub}>{sipLabel}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity disabled={locked} onPress={skipQuestion} style={styles.skipBtn}>
          <Text style={styles.skipText}>{skipLabel}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050711" },
  colorBlob: { position: "absolute", top: -150, right: -180, width: width * 1.22, height: width * 1.22, borderRadius: width },
  darkFade: { position: "absolute", top: height * 0.36, left: 0, right: 0, height: height * 0.5 },
  inner: { flex: 1, paddingHorizontal: 22, paddingTop: 56, paddingBottom: 34 },
  topBar: { height: 52, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  backBtn: { width: 52, height: 52, borderRadius: 26, backgroundColor: "rgba(255,255,255,0.09)", borderWidth: 1, borderColor: "rgba(255,255,255,0.13)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#fff", fontSize: 26, fontWeight: "900", marginTop: -2 },
  modePill: { height: 52, paddingHorizontal: 18, borderRadius: 30, backgroundColor: "rgba(6, 8, 20, 0.82)", borderWidth: 1, flexDirection: "row", alignItems: "center" },
  modeEmoji: { fontSize: 18, marginRight: 8 },
  modeLabel: { fontSize: 14, fontWeight: "900" },
  sipPill: { height: 52, minWidth: 52, borderRadius: 26, backgroundColor: "rgba(6, 8, 20, 0.82)", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center", paddingHorizontal: 12, flexDirection: "row" },
  sipEmoji: { fontSize: 15, marginRight: 5 },
  sipNumber: { fontSize: 14, fontWeight: "900" },
  progressBg: { height: 5, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden", marginBottom: 34 },
  progressFill: { height: "100%", borderRadius: 999 },
  hero: { minHeight: 220, justifyContent: "flex-end", position: "relative", marginBottom: 24 },
  eyebrow: { color: "rgba(255,255,255,0.72)", fontSize: 13, fontWeight: "900", letterSpacing: 3.2, marginBottom: 18 },
  heroTitle: { color: "#fff", fontSize: 48, lineHeight: 53, fontWeight: "900", letterSpacing: -1.8 },
  heroSub: { marginTop: 18, maxWidth: width * 0.67, color: "rgba(255,255,255,0.62)", fontSize: 15, lineHeight: 21, fontWeight: "800" },
  heroIconWrap: { position: "absolute", right: -12, bottom: 4 },
  heroIcon: { fontSize: 116, opacity: 0.92 },
  cardArea: { flex: 1, justifyContent: "center", minHeight: 250 },
  cardBackLayer: { position: "absolute", left: 12, right: 12, top: 22, bottom: 4, borderRadius: 32, backgroundColor: "rgba(8,11,25,0.42)", borderWidth: 1, transform: [{ rotate: "-2deg" }] },
  card: { minHeight: 260, borderRadius: 32, backgroundColor: "rgba(8,11,25,0.82)", borderWidth: 1, paddingHorizontal: 24, paddingVertical: 28, overflow: "hidden", justifyContent: "center" },
  cardTopLine: { position: "absolute", top: 0, left: 0, right: 0, height: 4 },
  cardLabel: { fontSize: 11, fontWeight: "900", letterSpacing: 2.4, marginBottom: 22, textAlign: "center" },
  questionText: { color: "#fff", fontSize: 31, lineHeight: 39, fontWeight: "900", letterSpacing: -0.9, textAlign: "center" },
  choiceBadge: { marginTop: 22, alignSelf: "center", borderRadius: 999, paddingHorizontal: 16, paddingVertical: 9 },
  choiceBadgeText: { color: "#fff", fontSize: 13, fontWeight: "900" },
  buttonRow: { flexDirection: "row", gap: 14, marginTop: 22 },
  noBtn: { flex: 1, height: 92, borderRadius: 24, backgroundColor: "rgba(8,11,25,0.82)", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" },
  yesBtn: { flex: 1, height: 92, borderRadius: 24, overflow: "hidden" },
  yesGradient: { flex: 1, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  buttonEmoji: { fontSize: 25, marginBottom: 5 },
  noBtnText: { color: "#fff", fontSize: 14, fontWeight: "900", letterSpacing: 1 },
  yesBtnText: { color: "#fff", fontSize: 14, fontWeight: "900", letterSpacing: 1 },
  buttonSub: { color: "rgba(255,255,255,0.38)", fontSize: 11, fontWeight: "700", marginTop: 3 },
  yesBtnSub: { color: "rgba(255,255,255,0.78)", fontSize: 11, fontWeight: "700", marginTop: 3 },
  skipBtn: { alignItems: "center", paddingTop: 18, paddingBottom: 4 },
  skipText: { color: "rgba(255,255,255,0.38)", fontSize: 14, fontWeight: "800" },
  doneWrap: { flex: 1, paddingHorizontal: 24, justifyContent: "center", alignItems: "center" },
  doneIconWrap: { width: 120, height: 120, borderRadius: 36, backgroundColor: "rgba(8,11,25,0.82)", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center", marginBottom: 24 },
  doneEmoji: { fontSize: 70 },
  doneTitle: { color: "#fff", fontSize: 40, fontWeight: "900", letterSpacing: -1.5, marginBottom: 12, textAlign: "center" },
  doneSub: { textAlign: "center", color: "rgba(255,255,255,0.55)", fontSize: 16, lineHeight: 24, marginBottom: 32 },
  doneHighlight: { fontWeight: "900" },
  restartBtn: { width: "100%", height: 60, borderRadius: 22, overflow: "hidden", marginBottom: 14 },
  restartGradient: { flex: 1, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  restartText: { color: "#fff", fontSize: 15, fontWeight: "900", letterSpacing: 1.2 },
  homeBtn: { paddingVertical: 12 },
  homeText: { color: "rgba(255,255,255,0.42)", fontSize: 14, fontWeight: "800" },
});