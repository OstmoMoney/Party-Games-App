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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  MidnightBackground,
  GlassCard,
  MODE_THEME,
  COLORS,
  FONT,
} from "../../components/MidnightUI";
import { drawDrinkCard, hasSessionCrew } from "../../session";
import { tapLight, celebrate } from "../../haptics";
import { addStats } from "../../stats";

const { width, height } = Dimensions.get("window");

const STATEMENTS = {
  chill: {
    no: [
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
      "Hvem her bruker mest penger på klær?",
      "Hvem her bruker mest penger på unødvendige ting?",
      "Hvem her er mest gjerrig?",
      "Hvem her er mest sjenerøs?",
      "Hvem her er mest sannsynlig til å bli politiker?",
      "Hvem her googler symptomene sine mest?",
      "Hvem her har flest abonnementer?",
      "Hvem her er mest sannsynlig til å glemme å betale regninger?",
      "Hvem her snakker mest med seg selv?",
      "Hvem her er mest sannsynlig til å vinne i Lotto?",
      "Hvem her tar flest selfies?",
      "Hvem her er mest sannsynlig til å bli influencer?",
      "Hvem her er dårligst til å parkere?",
      "Hvem her er mest sannsynlig til å krasje bilen?",
      "Hvem her er mest barnslig?",
      "Hvem her er mest voksen?",
      "Hvem her ler høyest?",
      "Hvem her snorker verst?",
      "Hvem her er mest sannsynlig til å bli kåret til årets ansatt?",
      "Hvem her er mest sannsynlig til å bli sparket fra jobben?",
      "Hvem her bruker mest tid på sosiale medier?",
      "Hvem her er mest sannsynlig til å glemme hvor de parkerte?",
      "Hvem her er mest pinlig på dansegulvet?",
      "Hvem her er mest sannsynlig til å lese alle bøkene de kjøper?",
      "Hvem her er mest sannsynlig til å begynne på et hobbyprosjekt og aldri fullføre?",
      "Hvem her sjekker tarot eller horoskop?",
      "Hvem her tar lengst tid på dusjen?",
      "Hvem her er mest sannsynlig til å bli foreldrenes favoritt?",
      "Hvem her er flinkest til å pakke koffert?",
      "Hvem her glemmer alltid noe når de skal ut?",
      "Hvem her er mest sannsynlig til å betale for hele bordet?",
      "Hvem her er mest pingle?",
      "Hvem her er modigst?",
      "Hvem her er mest sannsynlig til å hoppe i strikk?",
      "Hvem her er mest skeptisk til alt nytt?",
      "Hvem her tar flest sjanser?",
      "Hvem her er mest sannsynlig til å bli kjent med naboene?",
      "Hvem her er mest sannsynlig til å ha en hemmelig hobby?",
      "Hvem her hadde verst stil på ungdomsskolen?",
      "Hvem her var teitest som tenåring?",
      "Hvem her er mest sannsynlig til å bli rik på noe sært?",
      "Hvem her bruker flest emojier?",
      "Hvem her er verst til å parkere parallelt?",
      "Hvem her er mest sannsynlig til å gå seg vill på kjøpesenter?",
      "Hvem her klager mest på været?",
      "Hvem her er mest sannsynlig til å bli verdens beste forelder?",
      "Hvem her er flinkest til å ta vare på planter?",
      "Hvem her dreper alle planter de eier?",
      "Hvem her bruker mest tid på å velge film?",
      "Hvem her sovner først foran TV-en?",
      "Hvem her er mest sannsynlig til å sjekke telefonen midt i samtalen?",
      "Hvem her sender flest meme i chatten?",
      "Hvem her er mest sannsynlig til å bli stoppet i sikkerhetskontrollen?",
      "Hvem her er mest sannsynlig til å miste passet sitt?",
      "Hvem her er mest sannsynlig til å diskutere på Facebook?",
      "Hvem her tar feil avgjørelse 9 av 10 ganger?",
      "Hvem her overlever lengst i en zombie-apokalypse?",
      "Hvem her dør først i en zombie-apokalypse?",
      "Hvem her er mest sannsynlig til å bli forelsket i feil person?",
      "Hvem her er best på å holde nyttårsforsetter?",
    ],
    en: [
      "Who here is most likely to fall asleep at the party?",
      "Who here spends the most time in front of the mirror?",
      "Who here is most likely to forget your birthday?",
      "Who here eats the most unhealthily?",
      "Who here is most addicted to their phone?",
      "Who here is most likely to be late?",
      "Who here is best at keeping secrets?",
      "Who here is the most dramatic?",
      "Who here is most likely to become famous?",
      "Who here is the best liar?",
      "Who here is most likely to take the wrong train home?",
      "Who here is the most stubborn?",
      "Who here is most likely to cry at a movie?",
      "Who here is worst at replying to messages?",
      "Who here is most likely to become a millionaire?",
      "Who here sleeps the most?",
      "Who here is best at making excuses?",
      "Who here is most likely to lose their keys?",
      "Who here is the tidiest at home?",
      "Who here is most likely to become a teacher?",
      "Who here is worst at sticking to a diet?",
      "Who here is most likely to live abroad?",
      "Who here is the best cook?",
      "Who here is the most competitive?",
      "Who here is most likely to become a police officer?",
      "Who here is most likely to make impulsive decisions?",
      "Who here is the best dancer?",
      "Who here is most likely to have 10 cats?",
      "Who here is most likely to get married first?",
      "Who here is most likely to never get married?",
      "Who here is the best singer?",
      "Who here is most likely to have double standards?",
      "Who here is most likely to help a stranger?",
      "Who here is most likely to become a YouTuber?",
      "Who here is most likely to sleep until noon?",
      "Who here is most likely to cheat on a partner?",
      "Who here is the funniest when drunk?",
      "Who here is worst at staying in touch?",
      "Who here is most likely to miss the bus?",
      "Who here is most likely to start a business?",
      "Who here spends the most on clothes?",
      "Who here spends the most on unnecessary things?",
      "Who here is the stingiest?",
      "Who here is the most generous?",
      "Who here is most likely to become a politician?",
      "Who here googles their symptoms the most?",
      "Who here has the most subscriptions?",
      "Who here is most likely to forget to pay bills?",
      "Who here talks to themselves the most?",
      "Who here is most likely to win the lottery?",
      "Who here takes the most selfies?",
      "Who here is most likely to become an influencer?",
      "Who here is the worst at parking?",
      "Who here is most likely to crash a car?",
      "Who here is the most childish?",
      "Who here is the most mature?",
      "Who here laughs the loudest?",
      "Who here snores the worst?",
      "Who here is most likely to be employee of the year?",
      "Who here is most likely to get fired?",
      "Who here spends the most time on social media?",
      "Who here is most likely to forget where they parked?",
      "Who here is the most embarrassing on the dance floor?",
      "Who here is most likely to actually read all the books they buy?",
      "Who here is most likely to start a hobby project and never finish?",
      "Who here checks tarot or horoscopes?",
      "Who here takes the longest shower?",
      "Who here is most likely to be their parents' favourite?",
      "Who here is best at packing a suitcase?",
      "Who here always forgets something on the way out?",
      "Who here is most likely to pay for the whole table?",
      "Who here is the biggest wimp?",
      "Who here is the bravest?",
      "Who here is most likely to go bungee jumping?",
      "Who here is most sceptical of everything new?",
      "Who here takes the most risks?",
      "Who here is most likely to befriend the neighbours?",
      "Who here is most likely to have a secret hobby?",
      "Who here had the worst style in middle school?",
      "Who here was the nerdiest as a teenager?",
      "Who here is most likely to get rich doing something weird?",
      "Who here uses the most emojis?",
      "Who here is the worst at parallel parking?",
      "Who here is most likely to get lost in a shopping centre?",
      "Who here complains about the weather the most?",
      "Who here is most likely to be the world's best parent?",
      "Who here is best at keeping plants alive?",
      "Who here kills every plant they own?",
      "Who here spends the most time choosing a film?",
      "Who here falls asleep in front of the TV first?",
      "Who here is most likely to check their phone mid-conversation?",
      "Who here sends the most memes in the chat?",
      "Who here is most likely to be stopped at airport security?",
      "Who here is most likely to lose their passport?",
      "Who here is most likely to argue on Facebook?",
      "Who here makes the wrong decision 9 out of 10 times?",
      "Who here would survive the longest in a zombie apocalypse?",
      "Who here would die first in a zombie apocalypse?",
      "Who here is most likely to fall for the wrong person?",
      "Who here is best at keeping New Year's resolutions?",
    ],
  },
  date: {
    no: [
      "Hvem her er mest sannsynlig til å falle for feil person?",
      "Hvem her er mest romantisk?",
      "Hvem her sender flest hjerte-emojier?",
      "Hvem her er mest sannsynlig til å planlegge den perfekte date?",
      "Hvem her faller fortest for noen?",
      "Hvem her er mest sjalu av natur?",
      "Hvem her er best på å flørte?",
      "Hvem her ville vært mest sannsynlig til å be om et nummer?",
      "Hvem her er mest sannsynlig til å gifte seg først?",
      "Hvem her er mest sannsynlig til å ha et hemmelig crush akkurat nå?",
      "Hvem her er best til å holde på følelser?",
      "Hvem her er mest sannsynlig til å sende blomster?",
      "Hvem her er mest sannsynlig til å gråte på en romantisk film?",
      "Hvem her er mest sannsynlig til å skrive et kjærlighetsdikt?",
      "Hvem her er mest sannsynlig til å dra på spontan weekendtur med noen de liker?",
      "Hvem her er mest sannsynlig til å planlegge en overraskelsesdate?",
      "Hvem her er mest sannsynlig til å falle for en fremmed på en kafe?",
      "Hvem her er best til å holde en relasjon levende?",
      "Hvem her er mest sannsynlig til å bli den store kjærligheten for noen?",
      "Hvem her er mest sannsynlig til å si jeg elsker deg først?",
      "Hvem her er mest sannsynlig til å stole blindt på partneren sin?",
      "Hvem her er mest sannsynlig til å ofre noe stort for kjærligheten?",
      "Hvem her er mest sannsynlig til å ha en langdistanserelasjon?",
      "Hvem her er mest sannsynlig til å bli forelsket på reise?",
      "Hvem her er mest sannsynlig til å be noen ut på date i dag?",
    ],
    en: [
      "Who here is most likely to fall for the wrong person?",
      "Who here is the most romantic?",
      "Who here sends the most heart emojis?",
      "Who here is most likely to plan the perfect date?",
      "Who here falls for someone the fastest?",
      "Who here is the most naturally jealous?",
      "Who here is the best at flirting?",
      "Who here is most likely to ask for someone's number?",
      "Who here is most likely to get married first?",
      "Who here is most likely to have a secret crush right now?",
      "Who here is best at hiding their feelings?",
      "Who here is most likely to send flowers?",
      "Who here is most likely to cry at a romantic film?",
      "Who here is most likely to write a love poem?",
      "Who here is most likely to go on a spontaneous weekend trip with someone they like?",
      "Who here is most likely to plan a surprise date?",
      "Who here is most likely to fall for a stranger at a café?",
      "Who here is best at keeping a relationship exciting?",
      "Who here is most likely to be someone's great love?",
      "Who here is most likely to say I love you first?",
      "Who here is most likely to trust their partner blindly?",
      "Who here is most likely to sacrifice something big for love?",
      "Who here is most likely to be in a long distance relationship?",
      "Who here is most likely to fall in love while travelling?",
      "Who here is most likely to ask someone out today?",
    ],
  },
  drunk: {
    no: [
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
      "Hvem her drikker mest billig sprit?",
      "Hvem her tåler minst alkohol?",
      "Hvem her tåler mest alkohol?",
      "Hvem her er mest sannsynlig til å bli skikkelig klein i morgen?",
      "Hvem her er mest sannsynlig til å si 'jeg elsker deg' i kveld?",
      "Hvem her er mest sannsynlig til å ringe ekssjefen full?",
      "Hvem her er mest sannsynlig til å ende opp på en helt annen by i morgen?",
      "Hvem her er mest sannsynlig til å våkne opp uten klær?",
      "Hvem her er mest sannsynlig til å våkne med et fremmed nummer i telefonen?",
      "Hvem her er mest sannsynlig til å ha kline med en kollega?",
      "Hvem her er mest sannsynlig til å ha hatt sjekka opp noen sin kjæreste?",
      "Hvem her synger høyest når de er full?",
      "Hvem her gråter på toalettet?",
      "Hvem her tror de er morsommere enn de er når de er fulle?",
      "Hvem her blir mest filosofisk når de er fulle?",
      "Hvem her snakker mest tull når de drikker?",
      "Hvem her flørter med alt og alle når de er fulle?",
      "Hvem her er mest sannsynlig til å havne i slagsmål?",
      "Hvem her er mest sannsynlig til å miste skoene?",
      "Hvem her er mest sannsynlig til å våkne i en busk?",
      "Hvem her sender flest fyllemeldinger?",
      "Hvem her ringer eksen først?",
      "Hvem her er mest sannsynlig til å sovne på dansegulvet?",
      "Hvem her er mest sannsynlig til å pisse i en bakgate?",
      "Hvem her er mest sannsynlig til å glemme hvor de bor?",
      "Hvem her er mest sannsynlig til å havne i feil leilighet?",
      "Hvem her er mest sannsynlig til å miste lommeboka?",
      "Hvem her er mest sannsynlig til å bestille 5 kebab på vei hjem?",
      "Hvem her er mest sannsynlig til å bli forelsket på dansegulvet?",
      "Hvem her er mest sannsynlig til å sjekke opp bartenderen?",
      "Hvem her gir flest komplimenter når de er fulle?",
      "Hvem her er mest sannsynlig til å forsøke å klatre på noe?",
      "Hvem her er mest sannsynlig til å miste en sko?",
      "Hvem her drikker andres drinker uten å spørre?",
      "Hvem her er mest sannsynlig til å gråte over en sang?",
      "Hvem her er mest sannsynlig til å fortelle alle hemmelighetene sine?",
      "Hvem her er mest sannsynlig til å bli stengt ute fra utestedet?",
      "Hvem her starter alltid 'la oss ta en til'?",
      "Hvem her er mest sannsynlig til å ha klint med to forskjellige på samme kveld?",
      "Hvem her klemmer alle de møter når de er fulle?",
      "Hvem her er mest sannsynlig til å knuse et glass i kveld?",
      "Hvem her er mest sannsynlig til å bestille flytaxi midt i fylla?",
      "Hvem her snakker for høyt når de er fulle?",
      "Hvem her hvisker rart når de er fulle?",
      "Hvem her er mest sannsynlig til å danse alene i et hjørne?",
      "Hvem her er mest sannsynlig til å ta selfies med fremmede?",
      "Hvem her er mest sannsynlig til å forelske seg i en bartender?",
      "Hvem her er mest sannsynlig til å havne på afterparty hos noen ukjente?",
      "Hvem her er mest sannsynlig til å våkne med tatovering?",
      "Hvem her er mest sannsynlig til å våkne i feil seng?",
      "Hvem her er mest sannsynlig til å våkne uten å huske noe fra kvelden?",
      "Hvem her er mest sannsynlig til å miste et helt døgn på fest?",
      "Hvem her tar over musikken på festen uten lov?",
      "Hvem her gir verste råd når de er fulle?",
      "Hvem her drikker fortest fra flaska?",
      "Hvem her er mest sannsynlig til å lyve om hvor mye de har drukket?",
      "Hvem her er mest sannsynlig til å bestille mer drikke i taxien hjem?",
      "Hvem her er mest sannsynlig til å sjekke opp noens forelder ved en feil?",
    ],
    en: [
      "Who here has had the most one night stands?",
      "Who here is most likely to kiss a stranger tonight?",
      "Who here is worst at staying sober?",
      "Who here is most likely to call their ex tonight?",
      "Who here is best in bed?",
      "Who here has done the most embarrassing thing while drunk?",
      "Who here is most likely to throw up tonight?",
      "Who here is the best at flirting?",
      "Who here is most likely to have sex tonight?",
      "Who here is the most aggressive when drunk?",
      "Who here is most likely to dance on a table?",
      "Who here is most likely to go home with a stranger?",
      "Who here is best at picking people up?",
      "Who here is most likely to cry while drunk tonight?",
      "Who here is most likely to lose their phone tonight?",
      "Who here is most likely to need babysitting tonight?",
      "Who here has the most sexual partners?",
      "Who here is most likely to spend an hour in the bathroom?",
      "Who here is most likely to start drama tonight?",
      "Who here is most likely to kiss someone in this room?",
      "Who here drinks the fastest?",
      "Who here is best at taking shots?",
      "Who here is most likely to fall asleep in a taxi?",
      "Who here is most likely to call their mum while drunk?",
      "Who here is most likely to do something they'll regret tomorrow?",
      "Who here is most likely to keep going to the next bar?",
      "Who here is most likely to steal food on the way home?",
      "Who here is most likely to send an unfortunate photo?",
      "Who here behaves the worst when drunk?",
      "Who here is most likely to cause trouble with security?",
      "Who here is most likely to have had sex in a public place?",
      "Who here is best at staying on their feet all night?",
      "Who here is most likely to miss the last bus on purpose?",
      "Who here is most likely to kiss two different people tonight?",
      "Who here is most likely to end up at the police station?",
      "Who here is most likely to get stopped by a bouncer?",
      "Who here is most likely to cook at 4am?",
      "Who here is most likely to get sent home early?",
      "Who here is most likely to meet their next partner tonight?",
      "Who here is last to go to sleep tonight?",
      "Who here drinks the cheapest alcohol?",
      "Who here handles alcohol the least?",
      "Who here handles alcohol the most?",
      "Who here is most likely to feel awful tomorrow?",
      "Who here is most likely to say 'I love you' tonight?",
      "Who here is most likely to drunk call their old boss?",
      "Who here is most likely to wake up in a different city?",
      "Who here is most likely to wake up without clothes?",
      "Who here is most likely to wake up with a stranger's number?",
      "Who here is most likely to have hooked up with a coworker?",
      "Who here is most likely to have hit on someone's partner?",
      "Who here sings the loudest when drunk?",
      "Who here cries in the bathroom?",
      "Who here thinks they're funnier than they are when drunk?",
      "Who here gets the most philosophical when drunk?",
      "Who here talks the most nonsense when drinking?",
      "Who here flirts with everyone when drunk?",
      "Who here is most likely to get into a fight?",
      "Who here is most likely to lose their shoes?",
      "Who here is most likely to wake up in a bush?",
      "Who here sends the most drunk texts?",
      "Who here calls their ex first?",
      "Who here is most likely to fall asleep on the dance floor?",
      "Who here is most likely to pee in an alley?",
      "Who here is most likely to forget where they live?",
      "Who here is most likely to end up in the wrong apartment?",
      "Who here is most likely to lose their wallet?",
      "Who here is most likely to order 5 kebabs on the way home?",
      "Who here is most likely to fall in love on the dance floor?",
      "Who here is most likely to hit on the bartender?",
      "Who here gives the most compliments when drunk?",
      "Who here is most likely to try to climb something?",
      "Who here is most likely to lose a shoe?",
      "Who here drinks other people's drinks without asking?",
      "Who here is most likely to cry over a song?",
      "Who here is most likely to spill all their secrets?",
      "Who here is most likely to get kicked out of the bar?",
      "Who here always starts 'let's have one more'?",
      "Who here is most likely to have kissed two different people the same night?",
      "Who here hugs everyone they meet when drunk?",
      "Who here is most likely to smash a glass tonight?",
      "Who here is most likely to order a helicopter taxi mid-drunk?",
      "Who here talks too loudly when drunk?",
      "Who here whispers weirdly when drunk?",
      "Who here is most likely to dance alone in a corner?",
      "Who here is most likely to take selfies with strangers?",
      "Who here is most likely to fall for a bartender?",
      "Who here is most likely to end up at an afterparty with strangers?",
      "Who here is most likely to wake up with a tattoo?",
      "Who here is most likely to wake up in the wrong bed?",
      "Who here is most likely to wake up remembering nothing?",
      "Who here is most likely to lose a whole day to partying?",
      "Who here takes over the music at a party without permission?",
      "Who here gives the worst advice when drunk?",
      "Who here drinks fastest from the bottle?",
      "Who here is most likely to lie about how much they've drunk?",
      "Who here is most likely to order more drinks in the taxi home?",
      "Who here is most likely to accidentally hit on someone's parent?",
    ],
  },
  nasj: {
    no: [
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
      "Hvem her har kysset noen i dette rommet?",
      "Hvem her har hatt sex med noen mer enn 10 år eldre?",
      "Hvem her har hatt sex mens andre var i rommet?",
      "Hvem her har hatt en one night stand med en kompis?",
      "Hvem her ville hatt sex med noen her i kveld?",
      "Hvem her har fått eller sendt nakenbilder til noen de kjenner?",
      "Hvem her har hatt en friends-with-benefits-avtale?",
      "Hvem her har hatt sex på et toalett?",
      "Hvem her har klint med noen av samme kjønn?",
      "Hvem her har hatt sex på en flyplass?",
      "Hvem her har hatt sex på en flyreise?",
      "Hvem her har hatt sex i en heis?",
      "Hvem her har hatt sex i foreldrenes seng?",
      "Hvem her har hatt sex hjemme hos en venn?",
      "Hvem her har hatt sex på et omkledningsrom?",
      "Hvem her har hatt sex utendørs på en parkbenk?",
      "Hvem her har sneket seg ut etter en one night stand?",
      "Hvem her har lyget om antall sexpartnere?",
      "Hvem her har hatt sex med kollega?",
      "Hvem her har hatt sex med sjefen sin?",
      "Hvem her har klint med noen og angret med en gang?",
      "Hvem her har hatt et crush på en venns søsken?",
      "Hvem her har hatt sex med en venns søsken?",
      "Hvem her har hatt sex på et bryllup?",
      "Hvem her har hatt sex i et prøverom?",
      "Hvem her har hatt sex i en park?",
      "Hvem her har hatt sex på en festival?",
      "Hvem her har sneket noen inn hjemme hos foreldrene?",
      "Hvem her har dratt på date bare for å få sex?",
      "Hvem her har hatt sex på en jobbreise?",
      "Hvem her har sagt feil navn under sex?",
      "Hvem her har vært i en åpen relasjon?",
      "Hvem her har vært på swingerklubb?",
      "Hvem her har vært på strippeklubb?",
      "Hvem her har gitt en lap dance?",
      "Hvem her har sett porno sammen med noen?",
      "Hvem her har hatt videosex?",
      "Hvem her har hatt sex med noen de møtte samme dag?",
      "Hvem her har vært på en blind date som endte i sex?",
      "Hvem her har sendt nudes mens de var på jobb?",
      "Hvem her har hatt sex i et badekar?",
      "Hvem her har hatt sex i en jacuzzi?",
      "Hvem her har klint med noens kjæreste?",
      "Hvem her har drevet sexting med en kollega?",
      "Hvem her har gjort noe seksuelt de aldri har innrømmet?",
      "Hvem her har angret bittert på en seksuell hendelse?",
      "Hvem her har lekt med tanken på utroskap nylig?",
      "Hvem her har hatt sex med en eks lenge etter bruddet?",
      "Hvem her har en kink de aldri har fortalt om?",
      "Hvem her har hatt sex med noen de møtte på en app?",
      "Hvem her har klint med noen for å gjøre eksen sjalu?",
      "Hvem her har vært forelsket i to samtidig?",
    ],
    en: [
      "Who here has had sex in a public place?",
      "Who here has sent nudes to the wrong person?",
      "Who here has had sex with someone in this room?",
      "Who here has had a threesome?",
      "Who here has flirted with a friend's partner?",
      "Who here has cheated on someone?",
      "Who here has had sex on a first date?",
      "Who here has said 'I love you' without meaning it?",
      "Who here has had two partners at the same time?",
      "Who here has had sex at work?",
      "Who here has ghosted someone after sex?",
      "Who here has had sex with someone who was in a relationship?",
      "Who here has sexted a stranger?",
      "Who here has had sex in a car?",
      "Who here has let someone believe they were together when they weren't?",
      "Who here has had sex with someone over 35?",
      "Who here has slept with a friend's ex?",
      "Who here has shared a bed with someone here and wants to again?",
      "Who here has had sex and not remembered it?",
      "Who here has been caught in the act?",
      "Who here has had a secret affair?",
      "Who here has had sex with someone they didn't actually like?",
      "Who here has posted something sexual online?",
      "Who here has let someone think they were exclusive when they weren't?",
      "Who here has had sex with two people from the same friend group?",
      "Who here has used someone just for sex?",
      "Who here has deleted evidence from their phone?",
      "Who here has had sex in a hotel room that wasn't theirs?",
      "Who here has paid for sex or been paid?",
      "Who here has had a crush on a married person?",
      "Who here has filmed sex?",
      "Who here has hooked up on a beach?",
      "Who here has had sex in a stranger's house?",
      "Who here has had a situationship that got too serious?",
      "Who here has kissed someone in this room?",
      "Who here has had sex with someone more than 10 years older?",
      "Who here has had sex while others were in the room?",
      "Who here has had a one night stand with a close friend?",
      "Who here would have sex with someone here tonight?",
      "Who here has received or sent nudes to someone they know?",
      "Who here has had a friends-with-benefits arrangement?",
      "Who here has had sex in a toilet?",
      "Who here has kissed someone of the same gender?",
      "Who here has had sex at an airport?",
      "Who here has had sex on a flight?",
      "Who here has had sex in an elevator?",
      "Who here has had sex in their parents' bed?",
      "Who here has had sex at a friend's place?",
      "Who here has had sex in a changing room?",
      "Who here has had sex outdoors on a park bench?",
      "Who here has sneaked out after a one night stand?",
      "Who here has lied about their body count?",
      "Who here has had sex with a coworker?",
      "Who here has had sex with their boss?",
      "Who here has kissed someone and immediately regretted it?",
      "Who here has had a crush on a friend's sibling?",
      "Who here has had sex with a friend's sibling?",
      "Who here has had sex at a wedding?",
      "Who here has had sex in a changing room?",
      "Who here has had sex in a park?",
      "Who here has had sex at a festival?",
      "Who here has snuck someone into their parents' house?",
      "Who here has gone on a date just to get sex?",
      "Who here has had sex on a work trip?",
      "Who here has said the wrong name during sex?",
      "Who here has been in an open relationship?",
      "Who here has been to a swingers club?",
      "Who here has been to a strip club?",
      "Who here has given a lap dance?",
      "Who here has watched porn with someone?",
      "Who here has had video sex?",
      "Who here has had sex with someone they met the same day?",
      "Who here has been on a blind date that ended in sex?",
      "Who here has sent nudes while at work?",
      "Who here has had sex in a bathtub?",
      "Who here has had sex in a jacuzzi?",
      "Who here has kissed someone's partner?",
      "Who here has sexted a coworker?",
      "Who here has done something sexual they've never admitted?",
      "Who here has bitterly regretted a sexual experience?",
      "Who here has recently entertained thoughts of cheating?",
      "Who here has had sex with an ex long after the breakup?",
      "Who here has a kink they've never told anyone about?",
      "Who here has had sex with someone they met on an app?",
      "Who here has kissed someone to make their ex jealous?",
      "Who here has been in love with two people at once?",
    ],
  },
  blasted: {
    no: [
      "Hvem her har drukket og kjørt?",
      "Hvem her har stjålet som voksen?",
      "Hvem her har lurt noen ut av penger?",
      "Hvem her har solgt noe ulovlig?",
      "Hvem her har gjort noe som kan ødelegge karrieren?",
      "Hvem her har mobbet noen uten å be om unnskyldning?",
      "Hvem her har spredt et rykte de visste var løgn?",
      "Hvem her har truet noen?",
      "Hvem her har ødelagt noe verdifullt med vilje?",
      "Hvem her har stukket av fra en ulykke?",
      "Hvem her har gjort noe ingen i dette rommet vet om?",
      "Hvem her har tatt hevn på en eks på en ekstrem måte?",
      "Hvem her har vært med på noe de vet var galt?",
      "Hvem her har spilt på noens psykiske helse for å kontrollere dem?",
      "Hvem her har hatt en hemmelig identitet på nett?",
      "Hvem her har gjort noe som ville sjokkert alle her?",
      "Hvem her har løyet i et seriøst forhold i flere år?",
      "Hvem her har bedradd noen for penger?",
      "Hvem her har hjulpet noen med å skjule noe?",
      "Hvem her har en hemmelighet ingen i familien vet om?",
      "Hvem her har gjort noe så ille at de aldri kan fortelle det?",
      "Hvem her har hatt en hemmelig dobbeltkonto?",
      "Hvem her har snoket i andres telefon?",
      "Hvem her har lest meldingene til kjæresten i smug?",
      "Hvem her har stjålet penger fra familie?",
      "Hvem her har lurt en venn for egen vinning?",
      "Hvem her har lyget til politiet?",
      "Hvem her har lyget i et jobbintervju og fått jobben?",
      "Hvem her har jukset på en eksamen?",
      "Hvem her har betalt noen for å gjøre lekser?",
      "Hvem her har slettet meldinger før partneren så dem?",
      "Hvem her har funnet noe på partnerens telefon de aldri konfronterte dem om?",
      "Hvem her har latt noen ta skylden for noe de gjorde?",
      "Hvem her har anonymt skrevet noe stygt om noen på nett?",
      "Hvem her har laget en fake-konto for å sjekke noen?",
      "Hvem her har catfishet noen?",
      "Hvem her har sagt opp en jobb på en virkelig dårlig måte?",
      "Hvem her har stjålet fra en arbeidsgiver?",
      "Hvem her har lyget på CV-en?",
      "Hvem her har sabotert en kollegas arbeid?",
      "Hvem her har spredt en hemmelighet de lovet å beholde?",
      "Hvem her har sviktet en bestevenn på en stygg måte?",
      "Hvem her har dumpet noen via melding?",
      "Hvem her har ghostet noen som virkelig brydde seg?",
      "Hvem her har vært utro i et seriøst forhold?",
      "Hvem her har vært utro mer enn én gang?",
      "Hvem her har vært den 'andre' i en affære?",
      "Hvem her har visst at noen var utro og ikke sagt det?",
      "Hvem her har stjålet en kjæreste fra en bestevenn?",
      "Hvem her har en hemmelighet som kan ødelegge et vennskap her?",
      "Hvem her har snakket dritt om alle her bak ryggen deres?",
      "Hvem her har vurdert å forlate partneren sin nylig?",
      "Hvem her har stalket en eks på sosiale medier i månedsvis?",
      "Hvem her har laget en falsk profil for å sjekke en eks?",
      "Hvem her har gått gjennom partnerens søkehistorikk?",
      "Hvem her har sjekket noens DM-er uten lov?",
      "Hvem her har vært tatt på fersken og kommet seg unna med en løgn?",
      "Hvem her har lyget om hvor mye de drikker?",
      "Hvem her har skyldt på alkohol for noe de mente?",
      "Hvem her har gjort noe i fylla som ødela et vennskap?",
      "Hvem her har sendt en melding i fylla som forandret alt?",
      "Hvem her har vært involvert i drama de aldri innrømmet at de startet?",
      "Hvem her har en hemmelighet de tar med seg i graven?",
      "Hvem her har vært falsk mot noen i denne gjengen?",
      "Hvem her har sagt nei til å hjelpe en venn i krise?",
      "Hvem her har følt skadefryd da en venn opplevde noe vondt?",
      "Hvem her har stjålet en idé fra noen og tatt æren?",
      "Hvem her har latt noen andre ta straffen?",
      "Hvem her har baksnakket alle her i dette rommet?",
      "Hvem her har gjort noe ulovlig og sluppet unna?",
      "Hvem her har en hemmelighet om noen i dette rommet?",
      "Hvem her ville løpt ut av rommet hvis sannheten kom frem nå?",
    ],
    en: [
      "Who here has drunk and driven?",
      "Who here has stolen something as an adult?",
      "Who here has scammed someone out of money?",
      "Who here has sold something illegal?",
      "Who here has done something that could ruin their career?",
      "Who here has bullied someone without apologising?",
      "Who here has spread a rumour they knew was a lie?",
      "Who here has threatened someone?",
      "Who here has intentionally destroyed something valuable?",
      "Who here has fled the scene of an accident?",
      "Who here has done something no one in this room knows about?",
      "Who here has taken extreme revenge on an ex?",
      "Who here has been involved in something they know was wrong?",
      "Who here has manipulated someone's mental health to control them?",
      "Who here has had a secret online identity?",
      "Who here has done something that would shock everyone here?",
      "Who here has lied in a serious relationship for years?",
      "Who here has defrauded someone for money?",
      "Who here has helped someone hide something?",
      "Who here has a secret no one in their family knows about?",
      "Who here has done something so bad they can never tell anyone?",
      "Who here has had a secret second account?",
      "Who here has snooped through someone else's phone?",
      "Who here has secretly read their partner's messages?",
      "Who here has stolen money from family?",
      "Who here has tricked a friend for personal gain?",
      "Who here has lied to the police?",
      "Who here has lied in a job interview and got the job?",
      "Who here has cheated on an exam?",
      "Who here has paid someone to do their homework?",
      "Who here has deleted messages before their partner saw them?",
      "Who here has found something on their partner's phone and never confronted them?",
      "Who here has let someone else take the blame for something they did?",
      "Who here has anonymously written something mean about someone online?",
      "Who here has created a fake account to spy on someone?",
      "Who here has catfished someone?",
      "Who here has quit a job in a really bad way?",
      "Who here has stolen from an employer?",
      "Who here has lied on their CV?",
      "Who here has sabotaged a colleague's work?",
      "Who here has spread a secret they promised to keep?",
      "Who here has betrayed a best friend in a horrible way?",
      "Who here has dumped someone over text?",
      "Who here has ghosted someone who really cared?",
      "Who here has cheated in a serious relationship?",
      "Who here has cheated more than once?",
      "Who here has been the 'other person' in an affair?",
      "Who here has known someone was cheating and said nothing?",
      "Who here has stolen a partner from a best friend?",
      "Who here has a secret that could destroy a friendship here?",
      "Who here has talked badly about everyone here behind their backs?",
      "Who here has recently considered leaving their partner?",
      "Who here has stalked an ex on social media for months?",
      "Who here has created a fake profile to spy on an ex?",
      "Who here has gone through their partner's search history?",
      "Who here has checked someone's DMs without permission?",
      "Who here has been caught and talked their way out of it with a lie?",
      "Who here has lied about how much they drink?",
      "Who here has blamed alcohol for something they actually meant?",
      "Who here has done something while drunk that destroyed a friendship?",
      "Who here has sent a message while drunk that changed everything?",
      "Who here has been involved in drama they never admitted to starting?",
      "Who here has a secret they'll take to the grave?",
      "Who here has been fake to someone in this group?",
      "Who here has refused to help a friend in crisis?",
      "Who here has felt satisfaction when a friend experienced something bad?",
      "Who here has stolen an idea and taken the credit?",
      "Who here has let someone else take the punishment?",
      "Who here has talked badly about everyone in this room?",
      "Who here has done something illegal and got away with it?",
      "Who here has a secret about someone in this room?",
      "Who here would run out of the room if the truth came out right now?",
    ],
  },
};

// Waterfall-regelen gjelder i alle modes: personen til venstre og høyre
// for deg må alltid drikke når du får snusboksen igjen.
const WATERFALL = {
  no: "WATERFALL! Fra nå av: hver gang du får snusboksen, må personen til venstre og høyre for deg drikke",
  en: "WATERFALL! From now on: every time you get the box, the person to your left and right must drink",
};

const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// Hvert ~6. kort blir et drikkekort med navn når kveldens spillere er lagt inn
const DRINK_CARD_INTERVAL = 6;

export default function ZYNBoxScreen({ navigation, route }) {
  const mode = route?.params?.mode || "chill";
  const style = MODE_THEME[mode] || MODE_THEME.chill;
  const insets = useSafeAreaInsets();

  const createDeck = () => {
    const lang = t("no", "en", "en");
    const modeStatements = STATEMENTS[mode];
    const statements = modeStatements?.[lang] || modeStatements?.no || [];
    // Waterfall er med i alle modes — én gang per runde
    const shuffled = shuffle([...statements, WATERFALL[lang] || WATERFALL.en]);

    // Kortene er objekter slik at drikkekort («Peter, ta en slurk») kan
    // flettes inn mellom spørsmålene med egen etikett på kortet.
    const deck = [];
    shuffled.forEach((text, i) => {
      deck.push({ text, drink: false });
      if (hasSessionCrew() && (i + 1) % DRINK_CARD_INTERVAL === 0) {
        const card = drawDrinkCard(lang);
        if (card) deck.push({ text: card, drink: true });
      }
    });
    return deck;
  };

  const [deck, setDeck] = useState(createDeck);
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const cardTranslate = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const floatY = floatAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });

  const lang = t("no", "en", "en");
  const currentCard = deck[index];
  const cardLabelText = currentCard?.drink
    ? (lang === "no" ? "DRIKKEKORT 🍺" : "DRINK CARD 🍺")
    : (lang === "no" ? "KAST BOKSEN TIL..." : "THROW THE BOX TO...");
  const heroSubText = lang === "no"
    ? "Les spørsmålet høyt og kast boksen til personen som passer best."
    : "Read the statement out loud and throw the box to whoever fits best.";
  const throwBtnText = currentCard?.drink
    ? (lang === "no" ? "SKÅL, NESTE →" : "CHEERS, NEXT →")
    : (lang === "no" ? "KAST OG NESTE →" : "THROW AND NEXT →");
  const doneSubText = lang === "no" ? "Dere fullførte alle" : "You completed all";
  const questionsText = lang === "no" ? "spørsmålene" : "statements";
  const restartText = lang === "no" ? "SPILL IGJEN 🔄" : "PLAY AGAIN 🔄";
  const intensityText = lang === "no" ? "BYTT INTENSITET →" : "CHANGE INTENSITY →";
  const backText = lang === "no" ? "← Tilbake til hjem" : "← Back home";

  // Runde fullført: feir med haptikk og legg runden til i statistikken
  useEffect(() => {
    if (done) {
      celebrate();
      addStats({ rounds: 1 });
    }
  }, [done]);

  const nextCard = () => {
    tapLight();
    Animated.parallel([
      Animated.timing(cardOpacity, { toValue: 0, duration: 170, useNativeDriver: true }),
      Animated.timing(cardTranslate, { toValue: -30, duration: 170, useNativeDriver: true }),
    ]).start(() => {
      if (index + 1 >= deck.length) {
        setDone(true);
        return;
      }
      setIndex((prev) => prev + 1);
      cardTranslate.setValue(30);
      Animated.parallel([
        Animated.timing(cardOpacity, { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.timing(cardTranslate, { toValue: 0, duration: 220, useNativeDriver: true }),
      ]).start();
    });
  };

  const restart = () => {
    const newDeck = createDeck();
    setDeck(newDeck);
    setIndex(0);
    setDone(false);
    cardOpacity.setValue(1);
    cardTranslate.setValue(0);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <MidnightBackground glowColor={style.color} />

      {!done ? (
        <Animated.View
          style={[
            styles.inner,
            { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 20 },
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              accessibilityRole="button"
              accessibilityLabel={lang === "no" ? "Tilbake" : "Go back"}
            >
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
            <View style={styles.modePill}>
              <Text style={styles.modeEmoji}>{style.emoji}</Text>
              <Text style={[styles.modeText, { color: style.color }]}>{style.label}</Text>
            </View>
            <View style={styles.counter}>
              <Text style={[styles.counterText, { color: style.color }]}>{index + 1}/{deck.length}</Text>
            </View>
          </View>

          <View style={styles.hero}>
            <Text style={styles.heroEyebrow}>{lang === "no" ? "SNUSLEKEN" : "ZYN BOX"}</Text>
            <View style={styles.heroTitleRow}>
              <Text style={styles.heroTitle}>{lang === "no" ? "Kast boksen" : "Throw the box"}</Text>
              <Animated.Text style={[styles.heroEmoji, { transform: [{ translateY: floatY }] }]}>
                📦
              </Animated.Text>
            </View>
            <Text style={styles.heroSub}>{heroSubText}</Text>
          </View>

          <View style={styles.cardArea}>
            <Animated.View style={{ opacity: cardOpacity, transform: [{ translateY: cardTranslate }] }}>
              <GlassCard radius={28} contentStyle={styles.cardContent}>
                <View style={[styles.cardAccentBar, { backgroundColor: style.color }]} />
                <Text style={[styles.cardLabel, { color: style.color }]}>{cardLabelText}</Text>
                <Text style={styles.statementText}>{currentCard?.text}</Text>
              </GlassCard>
            </Animated.View>
          </View>

          <View style={styles.bottomWrap}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.throwBtn}
              onPress={nextCard}
              accessibilityRole="button"
              accessibilityLabel={lang === "no" ? "Neste kort" : "Next card"}
            >
              <LinearGradient colors={style.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.throwGradient}>
                <Text style={styles.throwText}>{throwBtnText}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : (
        <View style={styles.doneWrap}>
          <Animated.View style={{ transform: [{ translateY: floatY }] }}>
            <View style={[styles.doneEmojiWrap, { borderColor: `${style.color}4D`, backgroundColor: `${style.color}24` }]}>
              <Text style={styles.doneEmoji}>📦</Text>
            </View>
          </Animated.View>
          <Text style={styles.doneTitle}>{lang === "no" ? "Boksen er tom!" : "Box empty!"}</Text>
          <Text style={styles.doneSub}>
            {doneSubText}{"\n"}
            <Text style={[styles.doneHighlight, { color: style.color }]}>{deck.length} {questionsText}</Text>
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.restartBtn}
            onPress={restart}
            accessibilityRole="button"
            accessibilityLabel={lang === "no" ? "Spill igjen" : "Play again"}
          >
            <LinearGradient colors={style.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.restartGradient}>
              <Text style={styles.restartText}>{restartText}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.intensityBtn, { borderColor: `${style.color}66` }]}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel={lang === "no" ? "Bytt intensitet" : "Change intensity"}
          >
            <Text style={[styles.intensityText, { color: style.color }]}>{intensityText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => navigation.popToTop()}
            accessibilityRole="button"
            accessibilityLabel={lang === "no" ? "Tilbake til hjem" : "Back home"}
          >
            <Text style={styles.homeBtnText}>{backText}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  inner: { flex: 1, paddingHorizontal: 24 },

  /* ---------- Toppbar ---------- */
  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24 },
  backBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: "rgba(255,255,255,0.07)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", alignItems: "center", justifyContent: "center" },
  backText: { color: COLORS.text, fontSize: 20, marginTop: -1 },
  modePill: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.07)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: 999, paddingVertical: 9, paddingHorizontal: 16 },
  modeEmoji: { fontSize: 15 },
  modeText: { fontFamily: FONT.bold, fontSize: 14 },
  counter: { backgroundColor: "rgba(255,255,255,0.07)", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", borderRadius: 999, paddingVertical: 9, paddingHorizontal: 14 },
  counterText: { fontFamily: FONT.bold, fontSize: 13 },

  /* ---------- Hero ---------- */
  hero: { marginBottom: 20 },
  heroEyebrow: { fontFamily: FONT.label, fontSize: 11, letterSpacing: 3, color: COLORS.text50 },
  heroTitleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginTop: 10, gap: 12 },
  heroTitle: { flex: 1, fontFamily: FONT.extra, fontSize: 38, lineHeight: 40, letterSpacing: -1, color: COLORS.text },
  heroEmoji: { fontSize: 40, lineHeight: 44 },
  heroSub: { marginTop: 10, maxWidth: width * 0.8, fontFamily: FONT.regular, fontSize: 14, lineHeight: 20, color: COLORS.text60 },

  /* ---------- Kort ---------- */
  cardArea: { flex: 1, justifyContent: "center" },
  cardContent: { minHeight: 260, paddingHorizontal: 24, paddingVertical: 30, alignItems: "center", justifyContent: "center" },
  cardAccentBar: { width: 36, height: 4, borderRadius: 2, marginBottom: 18 },
  cardLabel: { textAlign: "center", fontFamily: FONT.label, fontSize: 11, letterSpacing: 3, marginBottom: 16 },
  statementText: { color: COLORS.text, textAlign: "center", fontFamily: FONT.extra, fontSize: 27, lineHeight: 35, letterSpacing: -0.5 },

  /* ---------- Knapp ---------- */
  bottomWrap: { paddingTop: 20 },
  throwBtn: { borderRadius: 16, overflow: "hidden" },
  throwGradient: { paddingVertical: 17, alignItems: "center", justifyContent: "center" },
  throwText: { color: COLORS.text, fontFamily: FONT.bold, fontSize: 15, letterSpacing: 2 },

  /* ---------- Ferdig ---------- */
  doneWrap: { flex: 1, paddingHorizontal: 24, justifyContent: "center", alignItems: "center" },
  doneEmojiWrap: { width: 110, height: 110, borderRadius: 32, borderWidth: 1, alignItems: "center", justifyContent: "center", marginBottom: 24 },
  doneEmoji: { fontSize: 60 },
  doneTitle: { color: COLORS.text, fontFamily: FONT.extra, fontSize: 36, letterSpacing: -1, marginBottom: 12 },
  doneSub: { textAlign: "center", fontFamily: FONT.regular, fontSize: 16, lineHeight: 24, color: COLORS.text55, marginBottom: 32 },
  doneHighlight: { fontFamily: FONT.extra },
  restartBtn: { width: "100%", borderRadius: 16, overflow: "hidden", marginBottom: 12 },
  restartGradient: { borderRadius: 16, paddingVertical: 17, alignItems: "center", justifyContent: "center" },
  restartText: { color: COLORS.text, fontFamily: FONT.bold, fontSize: 15, letterSpacing: 2 },
  intensityBtn: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1.5,
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  intensityText: { fontFamily: FONT.bold, fontSize: 13, letterSpacing: 2 },
  homeBtn: { paddingVertical: 12 },
  homeBtnText: { fontFamily: FONT.semi, fontSize: 14, color: COLORS.text40 },
});