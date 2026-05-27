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
    "Hvem her er mest sannsynlig til å sluke alle blokker for venners drikking?",
    "Hvem her er mest sannsynlig til å ha klint med to forskjellige på samme kveld?",
    "Hvem her klemmer alle de møter når de er fulle?",
    "Hvem her er mest sannsynlig til å knuse et glass i kveld?",
    "Hvem her er mest sannsynlig til å bestille flytaxi midt i fylla?",
    "Hvem her er mest sannsynlig til å ha klart å miste jakke nummer 3 i år?",
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
    "Hvem her har hatt sex i en kirke eller på et hellig sted?",
    "Hvem her har dratt på date bare for å få sex?",
    "Hvem her har hatt sex på en jobbreise?",
    "Hvem her har sagt feil navn under sex?",
    "Hvem her har vært i en åpen relasjon?",
    "Hvem her har vært på swingerklubb?",
    "Hvem her har vært på strippeklubb?",
    "Hvem her har gitt en lap dance?",
    "Hvem her har sett porno sammen med noen?",
    "Hvem her har sendt en lydmelding av seksuell art?",
    "Hvem her har hatt videosex?",
    "Hvem her har hatt sex med noen de møtte samme dag?",
    "Hvem her har vært på en blind date som endte i sex?",
    "Hvem her har bestilt en escort eller vurdert det?",
    "Hvem her har sendt nudes mens de var på jobb?",
    "Hvem her har hatt sex i et garasjeanlegg?",
    "Hvem her har hatt sex på en jobbfest?",
    "Hvem her har hatt sex i et badekar?",
    "Hvem her har hatt sex i en jacuzzi?",
    "Hvem her har hatt sex i et offentlig basseng?",
    "Hvem her har klint med noens kjæreste?",
    "Hvem her har drevet sexting med en kollega?",
    "Hvem her har hatt sex med en lærer eller foreleser?",
    "Hvem her har gjort noe seksuelt de aldri har innrømmet?",
    "Hvem her har hatt sex med noen som var langt yngre?",
    "Hvem her har angret bittert på en seksuell hendelse?",
    "Hvem her har hatt sex på en sofa hjemme hos venner?",
    "Hvem her har lekt med tanken på utroskap nylig?",
    "Hvem her har hatt sex med en eks lenge etter bruddet?",
    "Hvem her har en kink de aldri har fortalt om?",
    "Hvem her har gjort noe i sengen som overrasket dem selv?",
    "Hvem her har hatt sex med noen de møtte på en app?",
    "Hvem her har hatt sex på taket?",
    "Hvem her har hatt sex på en balkong?",
    "Hvem her har hatt sex med noen samme dag de møtte dem?",
    "Hvem her har klint med noen for å gjøre eksen sjalu?",
    "Hvem her har hatt sex bare for å få noe gratis?",
    "Hvem her har vært forelsket i to samtidig?",
  ],
  blasted: [
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
    "Hvem her har bedrade noen for penger?",
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
    "Hvem her har sendt en melding og angret så mye at de slettet appen?",
    "Hvem her har sagt opp en jobb på en virkelig dårlig måte?",
    "Hvem her har stjålet fra en arbeidsgiver?",
    "Hvem her har lyget på CV-en?",
    "Hvem her har sabotert en kollegas arbeid?",
    "Hvem her har spredt en hemmelighet de lovet å beholde?",
    "Hvem her har sviktet en bestevenn på en stygg måte?",
    "Hvem her har dumpet noen på en virkelig kjip måte?",
    "Hvem her har dumpet noen via melding?",
    "Hvem her har ghostet noen som virkelig brydde seg?",
    "Hvem her har latt være å fortelle en partner om en eks de fortsatt ser?",
    "Hvem her har vært utro i et seriøst forhold?",
    "Hvem her har vært utro mer enn én gang?",
    "Hvem her har vært utro med en av partnerens venner?",
    "Hvem her har hatt sex med en eks mens de var i et nytt forhold?",
    "Hvem her har vært den 'andre' i en affære?",
    "Hvem her har visst at noen var utro og ikke sagt det?",
    "Hvem her har stjålet en kjæreste fra en bestevenn?",
    "Hvem her har en hemmelighet som kan ødelegge et vennskap her?",
    "Hvem her har en hemmelighet som kan ødelegge et forhold her?",
    "Hvem her har snakket dritt om alle her bak ryggen deres?",
    "Hvem her har vurdert å forlate partneren sin nylig?",
    "Hvem her har en mappe med slettede meldinger fra en eks?",
    "Hvem her har stalket en eks på sosiale medier i månedsvis?",
    "Hvem her har laget en falsk profil for å sjekke en eks?",
    "Hvem her har gått gjennom partnerens søkehistorikk?",
    "Hvem her har sjekket noens DM-er uten lov?",
    "Hvem her har en mistanke om at partneren er utro, men ikke konfrontert?",
    "Hvem her har vært tatt på fersken og kommet seg unna med en løgn?",
    "Hvem her har sniket seg ut av et hjem etter en pinlig natt?",
    "Hvem her har lyget om hvor mye de drikker?",
    "Hvem her har lyget om hva de har gjort på fest?",
    "Hvem her har skyldt på alkohol for noe de mente?",
    "Hvem her har gjort noe i fylla som ødela et vennskap?",
    "Hvem her har gjort noe i fylla som ødela et forhold?",
    "Hvem her har sendt en melding i fylla som forandret alt?",
    "Hvem her har hatt en blackout og fått høre noe sjokkerende dagen etter?",
    "Hvem her har våknet og vært redd for hva de gjorde kvelden før?",
    "Hvem her har vært involvert i drama de aldri innrømmet at de startet?",
    "Hvem her har en hemmelighet de tar med seg i graven?",
    "Hvem her har snakket nedlatende om en venn til andre venner?",
    "Hvem her har vært falsk mot noen i denne gjengen?",
    "Hvem her har sagt nei til å hjelpe en venn i krise?",
    "Hvem her har følt skadefryd da en venn opplevde noe vondt?",
    "Hvem her har misunnet en venn så mye at det ble kjipt?",
    "Hvem her har stjålet en idé fra noen og tatt æren?",
    "Hvem her har tatt æren for noe de ikke gjorde på jobb?",
    "Hvem her har latt noen andre ta straffen?",
    "Hvem her har baksnakket alle her i dette rommet?",
    "Hvem her har gjort noe som er strafferettslig på en arbeidsplass?",
    "Hvem her har gjort noe ulovlig og sluppet unna?",
    "Hvem her har vært utsatt for noe de aldri har snakket om?",
    "Hvem her har en hemmelighet om noen i dette rommet?",
    "Hvem her vet noe om en av oss som vi ikke vet selv?",
    "Hvem her har gjort noe i kveld de allerede angrer på?",
    "Hvem her ville løyet om de fikk dette spørsmålet?",
    "Hvem her har holdt en hemmelighet i over ti år?",
    "Hvem her har gjort noe som påvirket noens liv negativt for alltid?",
    "Hvem her har hjulpet noen å gjøre noe ulovlig?",
    "Hvem her har vært i en situasjon hvor de burde meldt fra, men lot være?",
    "Hvem her har gjemt unna ting fra partneren sin?",
    "Hvem her har gjort noe i kveld de håper ingen tar opp igjen?",
    "Hvem her har en hemmelighet de er sikre på at en annen her allerede vet?",
    "Hvem her ville løpt ut av rommet hvis sannheten kom frem nå?",
  ],
};

const MODE_STYLE = {
  chill: {
    color: "#25D98A",
    soft: "rgba(37,217,138,0.22)",
    bg: ["#101A16", "#07100D", "#050711"],
    emoji: "😊",
    label: "Chill",
  },

  drunk: {
    color: "#4F7BFF",
    soft: "rgba(79,123,255,0.22)",
    bg: ["#10162A", "#080B19", "#050711"],
    emoji: "🍻",
    label: "Drunk",
  },

  nasj: {
    color: "#FB923C",
    soft: "rgba(251,146,60,0.22)",
    bg: ["#24160D", "#100A08", "#050711"],
    emoji: "🔥",
    label: "Nasj",
  },

  blasted: {
    color: "#F87171",
    soft: "rgba(248,113,113,0.22)",
    bg: ["#241012", "#100709", "#050711"],
    emoji: "💀",
    label: "Blasted",
  },
};

const shuffle = (arr) => {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

export default function ZYNBoxScreen({ navigation, route }) {
  const mode = route?.params?.mode || "chill";

  const style = MODE_STYLE[mode] || MODE_STYLE.chill;

  const createDeck = () => shuffle(STATEMENTS[mode] || STATEMENTS.chill);

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
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),

        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const floatY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const nextCard = () => {
    Animated.parallel([
      Animated.timing(cardOpacity, {
        toValue: 0,
        duration: 170,
        useNativeDriver: true,
      }),

      Animated.timing(cardTranslate, {
        toValue: -30,
        duration: 170,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (index + 1 >= deck.length) {
        setDone(true);
        return;
      }

      setIndex((prev) => prev + 1);

      cardTranslate.setValue(30);

      Animated.parallel([
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),

        Animated.timing(cardTranslate, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
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

      <LinearGradient
        colors={style.bg}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View
        style={[
          styles.glowBlob,
          {
            backgroundColor: style.soft,
          },
        ]}
      />

      <LinearGradient
        colors={["rgba(5,7,17,0)", "#050711"]}
        style={styles.fadeBottom}
      />

      {!done ? (
        <Animated.View
          style={[
            styles.inner,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* TOP */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>

            <View
              style={[
                styles.modePill,
                {
                  borderColor: `${style.color}40`,
                },
              ]}
            >
              <Text style={styles.modeEmoji}>{style.emoji}</Text>

              <Text
                style={[
                  styles.modeText,
                  {
                    color: style.color,
                  },
                ]}
              >
                {style.label}
              </Text>
            </View>

            <View style={styles.counter}>
              <Text
                style={[
                  styles.counterText,
                  {
                    color: style.color,
                  },
                ]}
              >
                {index + 1}/{deck.length}
              </Text>
            </View>
          </View>

          {/* HERO */}
          <View style={styles.hero}>
            <Text style={styles.heroEyebrow}>ZYN BOX</Text>

            <Text style={styles.heroTitle}>
              Throw{"\n"}the box
            </Text>

            <Text style={styles.heroSub}>
              Les spørsmålet høyt og kast boksen til personen som passer best.
            </Text>

            <Animated.View
              style={[
                styles.heroEmojiWrap,
                {
                  transform: [{ translateY: floatY }, { rotate: "-8deg" }],
                },
              ]}
            >
              <Text style={styles.heroEmoji}>📦</Text>
            </Animated.View>
          </View>

          {/* CARD */}
          <View style={styles.cardArea}>
            <View
              style={[
                styles.cardBack,
                {
                  borderColor: `${style.color}18`,
                },
              ]}
            />

            <Animated.View
              style={[
                styles.card,
                {
                  opacity: cardOpacity,
                  transform: [{ translateY: cardTranslate }],
                  borderColor: `${style.color}28`,
                },
              ]}
            >
              <View
                style={[
                  styles.cardLine,
                  {
                    backgroundColor: style.color,
                  },
                ]}
              />

              <Text
                style={[
                  styles.cardLabel,
                  {
                    color: style.color,
                  },
                ]}
              >
                KAST BOKSEN TIL...
              </Text>

              <Text style={styles.statementText}>{deck[index]}</Text>
            </Animated.View>
          </View>

          {/* BUTTON */}
          <View style={styles.bottomWrap}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.throwBtn}
              onPress={nextCard}
            >
              <LinearGradient
                colors={[style.color, "#B92BFF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.throwGradient}
              >
                <Text style={styles.throwText}>KAST OG NESTE →</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : (
        <View style={styles.doneWrap}>
          <Animated.View
            style={[
              styles.doneEmojiWrap,
              {
                transform: [{ translateY: floatY }, { rotate: "-8deg" }],
              },
            ]}
          >
            <Text style={styles.doneEmoji}>📦</Text>
          </Animated.View>

          <Text style={styles.doneTitle}>Box empty!</Text>

          <Text style={styles.doneSub}>
            Dere fullførte alle{"\n"}
            <Text style={{ color: style.color, fontWeight: "900" }}>
              {deck.length} spørsmålene
            </Text>
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.restartBtn}
            onPress={restart}
          >
            <LinearGradient
              colors={[style.color, "#B92BFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.restartGradient}
            >
              <Text style={styles.restartText}>SPILL IGJEN 🔄</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => navigation.popToTop()}
          >
            <Text style={styles.homeBtnText}>← Tilbake til hjem</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050711",
  },

  glowBlob: {
    position: "absolute",
    top: -170,
    right: -170,
    width: width * 1.15,
    height: width * 1.15,
    borderRadius: 999,
  },

  fadeBottom: {
    position: "absolute",
    top: height * 0.35,
    left: 0,
    right: 0,
    height: height * 0.6,
  },

  inner: {
    flex: 1,
    paddingTop: 58,
    paddingHorizontal: 22,
    paddingBottom: 40,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  backBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
  },

  modePill: {
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: "rgba(8,11,25,0.8)",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  modeEmoji: {
    fontSize: 16,
    marginRight: 8,
  },

  modeText: {
    fontSize: 13,
    fontWeight: "900",
  },

  counter: {
    height: 50,
    minWidth: 50,
    borderRadius: 25,
    backgroundColor: "rgba(8,11,25,0.8)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  counterText: {
    fontSize: 12,
    fontWeight: "900",
  },

  hero: {
    minHeight: 220,
    justifyContent: "flex-end",
    marginBottom: 26,
  },

  heroEyebrow: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 3,
    marginBottom: 16,
  },

  heroTitle: {
    color: "#fff",
    fontSize: 48,
    lineHeight: 52,
    fontWeight: "900",
    letterSpacing: -2,
  },

  heroSub: {
    marginTop: 18,
    color: "rgba(255,255,255,0.58)",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
    width: width * 0.7,
  },

  heroEmojiWrap: {
    position: "absolute",
    right: -8,
    bottom: 8,
  },

  heroEmoji: {
    fontSize: 110,
  },

  cardArea: {
    flex: 1,
    justifyContent: "center",
  },

  cardBack: {
    position: "absolute",
    left: 12,
    right: 12,
    top: 20,
    bottom: 0,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    transform: [{ rotate: "-2deg" }],
  },

  card: {
    minHeight: 280,
    borderRadius: 32,
    backgroundColor: "rgba(8,11,25,0.82)",
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 30,
    justifyContent: "center",
    overflow: "hidden",
  },

  cardLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },

  cardLabel: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2.5,
    marginBottom: 22,
  },

  statementText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 30,
    lineHeight: 40,
    fontWeight: "900",
    letterSpacing: -1,
  },

  bottomWrap: {
    paddingTop: 20,
  },

  throwBtn: {
    height: 62,
    borderRadius: 22,
    overflow: "hidden",
  },

  throwGradient: {
    flex: 1,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  throwText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  doneWrap: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  doneEmojiWrap: {
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
  },

  doneSub: {
    textAlign: "center",
    color: "rgba(255,255,255,0.55)",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
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

  homeBtnText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 14,
    fontWeight: "700",
  },
});