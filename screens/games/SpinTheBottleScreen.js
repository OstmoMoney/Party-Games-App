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
    "Hvem her ville du dratt på date med?",
    "Hva er det rareste du gjør når du er alene?",
    "Hvem var ditt første crush?",
    "Hva er den verste løgnen du har sluppet unna med?",
    "Hvilken kjendis har du hatt et crush på?",
    "Hva er den pinligste sangen i playlisten din?",
    "Hvem her har du sjekket Instagram til oftest?",
    "Hva er den rareste drømmen du har hatt nylig?",
    "Hva er den pinligste tingen mamma har sett deg gjøre?",
    "Hva er det mest barnslige du fortsatt gjør?",
    "Hva er den siste løgnen du fortalte?",
    "Hvem her tror du blir rikest?",
    "Hvilket TV-show er du flau over å se på?",
    "Hva er det mest pinlige du har googlet?",
    "Hvem her ville du byttet liv med en uke?",
    "Hva er det rareste du har tatt med hjem fra fest?",
    "Hva er det dummeste du har kranglet om?",
    "Hvem her har du snakket mest dritt om?",
    "Hva er den verste presangen du har gitt?",
    "Hva er det dummeste du har brukt penger på?",
    "Hvem her er du mest sjalu på?",
    "Hva er den siste tingen du gråt over?",
    "Hva er den dummeste regelen du har brutt?",
    "Hvem her ville du tatt med på en øde øy?",
    "Hva er det første du gjør om morgenen?",
    "Hva er den rareste maten du har likt?",
    "Hva er det lengste du har gått uten å dusje?",
    "Hvem her er du mest enig med politisk?",
    "Hva er den teiteste filmen du gråt på?",
    "Hva er det pinligste klesplagget du eier?",
    "Hvem her ville du gått til om du trengte hjelp?",
    "Hva er den dummeste skaden du har fått?",
    "Hva er den siste meldingen du angret på å ha sendt?",
    "Hvem her ville du delt en hemmelighet med?",
    "Hva er det rareste du har hatt med på rommet?",
    "Hva er det første du legger merke til hos noen?",
    "Hvem her ville du aldri delt rom med?",
    "Hva er den rareste vanen din om kvelden?",
    "Hva er det dummeste du har trodd på som barn?",
    "Hvem her har du kranglet mest med?",
    "Hva er den pinligste tingen du har sagt foran klassen?",
    "Hva er den siste tingen du så på Youtube?",
    "Hvem her ville du tatt med på en road trip?",
    "Hva er det dummeste du har sagt foran et crush?",
    "Hva er den rareste tingen i romet ditt akkurat nå?",
    "Hvem her sender du flest meldinger til?",
    "Hva er den mest pinlige tingen du gjorde som tenåring?",
    "Hva er den dummeste avgjørelsen du har tatt det siste året?",
    "Hva er den rareste komplimenten du har fått?",
    "Hvem her ville du valgt som forsvarer i retten?",
    "Hva er det rareste du har sagt i søvne?",
    "Hva er den siste filmen som faktisk fikk deg til å gråte?",
    "Hva er det mest sære du har bestilt på McDonald's?",
    "Hvem her har du tenkt på i dag?",
    "Hva er den dummeste fobien din?",
    "Hva er det pinligste du har gjort foran lærere?",
    "Hva er den rareste tingen du har funnet i lommen?",
    "Hvem her ville du tatt med deg på et folkemøte?",
    "Hva er den siste hvite løgnen du fortalte foreldrene dine?",
    "Hva er det rareste du har gjort for å unngå noen?",
    "Hva er den siste tingen du tok et bilde av?",
    "Hvem her ville du valgt som romkamerat?",
    "Hva er det dummeste du har kjøpt full?",
    "Hva er det første du sjekker når du våkner?",
    "Hva er den rareste hobbyen du har hatt?",
    "Hvem her ler du mest av?",
    "Hva er det pinligste foreldrene dine har sagt foran venner?",
    "Hva er den siste sangen du sang høyt?",
    "Hva er den dummeste konkurransen du har vært med i?",
    "Hva er det rareste du har gjort på en flytur?",
    "Hva er den teiteste tatoveringen du har vurdert?",
    "Hvem her er mest lik deg?",
    "Hva er det dummeste du har skrevet i en skoleoppgave?",
    "Hva er den siste serien du droppet midt i?",
    "Hva er det rareste kallenavnet du har hatt?",
    "Hvem her ville du valgt som personlig trener?",
    "Hva er det pinligste du har gjort på buss eller bane?",
    "Hva er den siste tingen du brente på kjøkkenet?",
    "Hva er det dummeste du har låtet over?",
    "Hvem her ville du delt siste pizzabit med?",
    "Hva er den rareste kommentaren du har fått på et bilde?",
    "Hva er det mest pinlige som har skjedd på jobb eller skole?",
    "Hva er den dummeste konspirasjonsteorien du har trodd på?",
    "Hvem her ville du aldri lånt penger til?",
    "Hva er det rareste du har sett på t-banen?",
    "Hva er den siste appen du slettet?",
    "Hva er den dummeste tingen du har kranglet med en søsken om?",
    "Hva er det pinligste du har sagt til noen du synes er attraktiv?",
    "Hvem her ville du gått på date for moro skyld?",
    "Hva er den rareste tingen du har søkt opp i smug?",
    "Hva er den siste hemmeligheten en venn fortalte deg?",
    "Hva er det dummeste du har latet som du forsto?",
    "Hvem her ville du valgt som fadder for barnet ditt?",
    "Hva er det rareste du har tenkt på akkurat nå?",
    "Hva er den siste tingen du leste som faktisk fikk deg til å le høyt?",
    "Hva er det mest pinlige du har gjort for oppmerksomhet?",
    "Hvem her ville du valgt som date til skoleballet?",
    "Hva er den rareste tingen foreldrene dine fortsatt sier?",
    "Hva er den siste vanen du prøvde å slutte med?",
  ],
  drunk: [
    "Hvem her ville du klint med hvis du måtte velge?",
    "Hva er det villeste du har gjort på fest?",
    "Hvem her tiltrekkes du mest av i kveld?",
    "Hva er den siste fyllemeldingen du sendte?",
    "Hvem her ville du tatt med hjem hvis du var singel?",
    "Hva er det mest pinlige du har gjort full?",
    "Hvem her synes du er mest attraktiv akkurat nå?",
    "Hva er det rareste du har våknet opp til?",
    "Hvem her flørter du mest med?",
    "Hva er det villeste du har gjort på et nachspiel?",
    "Hvem her ville du valgt som date i kveld?",
    "Hva er det dummeste du har gjort for å få oppmerksomhet?",
    "Hvem her ville du gitt et kyss på kinnet?",
    "Hva er den verste hangoveren du har hatt?",
    "Hvem her ville du spilt strip-poker med?",
    "Hva er den dummeste meldingen du har sendt full?",
    "Hvem her er fineste i kveld?",
    "Hva er det villeste du har sagt i en taxi?",
    "Hvem her ville du sneket deg ut med?",
    "Hva er det pinligste du har gjort på dansegulvet?",
    "Hvem her ville du valgt om du måtte kline med en?",
    "Hva er den rareste tingen du har gjort på vei hjem?",
    "Hvem her har du sett på en ny måte i kveld?",
    "Hva er den siste personen du har tenkt på seksuelt?",
    "Hvem her ville du valgt som drikkemakker resten av livet?",
    "Hva er den verste avgjørelsen du har tatt full?",
    "Hvem her tror du flørter mest med deg?",
    "Hva er det rareste du har spist på vei hjem?",
    "Hvem her ville du valgt om alle her var single?",
    "Hva er den mest pinlige fyllesangen du har sunget?",
    "Hvem her ville du blitt med hjem til?",
    "Hva er det villeste du har gjort på en jobb-fest?",
    "Hvem her ville du tatt med på blind date?",
    "Hva er den siste tingen du angret dypt på dagen etter?",
    "Hvem her ville du valgt som backup-partner om 10 år?",
    "Hva er den dummeste konkurransen du har gjort på fest?",
    "Hvem her ville du valgt om du måtte gå naken foran en?",
    "Hva er det villeste du har gjort i en taxi?",
    "Hvem her tror du har sjekket deg ut mest i kveld?",
    "Hva er den rareste personen du har klint med?",
    "Hvem her ville du tatt en runde med på et hotell?",
    "Hva er den dummeste tingen du har sagt til en bartender?",
    "Hvem her ville du sendt nudes til om du måtte?",
    "Hva er den verste afterparty-historien din?",
    "Hvem her ville du blitt sammen med hvis du var nødt?",
    "Hva er det mest pinlige du har sagt full til en eks?",
    "Hvem her ville du gitt en bodyshot til?",
    "Hva er det dummeste du har bestilt på pizzeriaen klokken 4?",
    "Hvem her ville du tatt et bilde sammen med naken?",
    "Hva er den verste utenfor-festen-opplevelsen din?",
    "Hvem her tror du blir mest pinlig i kveld?",
    "Hva er den siste personen du klintet med?",
    "Hvem her ville du valgt som flørt for kvelden?",
    "Hva er det villeste du har gjort i et baderom på fest?",
    "Hvem her tror du sjekket deg opp om de ikke kjente deg?",
    "Hva er det dummeste du har lovt noen i fylla?",
    "Hvem her ville du gått på en hytte med?",
    "Hva er den rareste fyllesnacken din?",
    "Hvem her ville du delt seng med uten å gjøre noe?",
    "Hva er den dummeste tatoveringen du nesten fikk full?",
    "Hvem her ville du klint med på et utested?",
    "Hva er det villeste du har gjort uten å fortelle vennene dine?",
    "Hvem her ville du valgt om dere måtte gifte dere i Vegas i kveld?",
    "Hva er den siste tingen du gjorde som overrasket deg selv?",
    "Hva er det dummeste du har sagt foran et crush full?",
    "Hvem her ville du sneket deg på kjøkkenet med?",
    "Hva er det villeste flørtet du har sluppet unna med?",
    "Hvem her tror du ville sagt ja til å klin med deg?",
    "Hva er den siste tingen du gjorde du ikke tør å fortelle?",
    "Hvem her ville du valgt som hemmelig flørt?",
    "Hva er det mest pinlige du har gjort i fylla på offentlig sted?",
    "Hvem her ville du valgt om du måtte sove i samme seng?",
    "Hva er den rareste personen du har sjekket opp?",
    "Hvem her tror du ville klart å forføre deg?",
    "Hva er det villeste du har gjort på en strand-fest?",
    "Hvem her ville du tatt med på et eskapadeoppdrag?",
    "Hva er den dummeste tingen du har sendt på Snapchat full?",
    "Hvem her ville du valgt om du måtte gå på en ekte date i morgen?",
    "Hva er den verste fylletabben din?",
    "Hvem her ville du valgt som natt-makker uten sex?",
    "Hva er det villeste du har gjort på en jobbtur?",
    "Hvem her tror du ville passet best med deg seksuelt?",
    "Hva er den dummeste meldingen du har sett en venn sende full?",
    "Hvem her tror du har tenkt på å klin med deg?",
    "Hva er det rareste du har gjort på et utested?",
    "Hvem her ville du valgt om dere måtte være sammen i et år?",
    "Hva er den dummeste tingen du har sagt på en date i fylla?",
    "Hvem her ville du blitt med på badet med?",
    "Hva er det villeste du har gjort etter midnatt?",
    "Hvem her tror du har drømt om deg?",
    "Hva er den rareste flørten du har fått?",
    "Hvem her ville du valgt om du fikk et kyss gratis?",
    "Hva er det villeste du har gjort på en VIP-bord?",
    "Hvem her ville du tatt med deg hjem bare for å sove?",
    "Hva er den dummeste tingen du har gjort på et ferieparadis?",
    "Hvem her ville du valgt for en hemmelig affære?",
    "Hva er det villeste du har sagt på et nachspiel?",
    "Hvem her tror du ville passet best som rebound?",
    "Hva er det dummeste du har gjort for å unngå å reise hjem?",
    "Hva er det villeste du har gjort som ingen vet om?",
  ],
  nasj: [
    "Hva er det villeste du har gjort i sengen?",
    "Hvem her ville du hatt sex med om du måtte velge?",
    "Hva er fantasien du aldri har turt å nevne?",
    "Hvem her har du tenkt på seksuelt?",
    "Hva er det mest spontane stedet du har hatt sex på?",
    "Hvem her tror du er best i sengen?",
    "Hva er det lengste du har gått uten sex?",
    "Hvem her ville du valgt som første gang om alt var nullstilt?",
    "Hva er det rareste du har gjort med en partner?",
    "Hvem her ville du hatt en hemmelig affære med?",
    "Hva er det første du tenker på når du ser noen attraktiv?",
    "Hvem her tror du ville overrasket i sengen?",
    "Hva er det villeste du har sagt under sex?",
    "Hvem her har du sjekket ut nylig?",
    "Hva er den ene fantasien du aldri har fortalt en partner?",
    "Hvem her ville du valgt som first kiss om du fikk velge på nytt?",
    "Hva er det villeste du har gjort på en første date?",
    "Hvem her tror du ville matchet best med deg seksuelt?",
    "Hva er det mest pinlige som har skjedd under sex?",
    "Hvem her ville du valgt for en threesome?",
    "Hva er det villeste du har sendt på melding?",
    "Hvem her tror du tenker på deg seksuelt?",
    "Hva er det lengste du har sextet med noen?",
    "Hvem her ville du valgt om du måtte ha en ny partner i morgen?",
    "Hva er den dummeste grunnen du har droppet å ha sex med noen?",
    "Hvem her har du fantasert om?",
    "Hva er det mest spontane du har gjort seksuelt?",
    "Hvem her ville du hatt sex med om dere var fremmede?",
    "Hva er det villeste en partner har bedt deg om?",
    "Hvem her tror du har god utholdenhet?",
    "Hva er det første du la merke til seksuelt hos en eks?",
    "Hvem her ville du valgt om du måtte tilbringe en natt med noen?",
    "Hva er det mest pinlige du har gjort for å imponere noen?",
    "Hvem her tror du har sett mest på deg?",
    "Hva er det villeste sex-stedet du har drømt om?",
    "Hvem her ville du valgt om dere var sammen på en hytte alene?",
    "Hva er det rareste komplimentet du har fått under sex?",
    "Hvem her tror du har snakket om deg på den måten?",
    "Hva er det mest spontane møtet du har endt opp i sengen med?",
    "Hvem her ville du valgt for en hemmelig dating-app date?",
    "Hva er den ene tingen du alltid har lyst til å prøve?",
    "Hvem her ville du valgt om dere var de siste på jorden?",
    "Hva er det villeste sted du har klint?",
    "Hvem her tror du ville passet best i langvarig forhold?",
    "Hva er det villeste du har gjort på en helgetur?",
    "Hvem her ville du valgt om du fikk en time uten konsekvenser?",
    "Hva er det første du gjør når du møter en attraktiv person?",
    "Hvem her tror du har sendt nudes nylig?",
    "Hva er den teiteste grunnen du har stoppet midt i?",
    "Hvem her ville du valgt som hemmelig fuckbuddy?",
    "Hva er det villeste du har gjort på et hotellrom?",
    "Hvem her tror du har et hemmelig vilt liv?",
    "Hva er det rareste stedet du har klint?",
    "Hvem her ville du valgt om du måtte date noen i denne gjengen?",
    "Hva er den ene egenskapen du tiltrekkes mest av?",
    "Hvem her tror du har tenkt på deg på badet?",
    "Hva er det villeste du har gjort i et omkledningsrom?",
    "Hvem her tror du ville sagt ja til hva som helst?",
    "Hva er det mest pinlige du har sagt etter sex?",
    "Hvem her ville du valgt om du fikk et nakenbilde i retur?",
    "Hva er den lengste sex-tørken din?",
    "Hvem her tror du har fantasert om en kollega?",
    "Hva er det villeste du har gjort på en strand?",
    "Hvem her ville du valgt om du måtte ta nakenbilder av en?",
    "Hva er den ene grensen du flyttet for å gjøre noen glade?",
    "Hvem her tror du har en kink ingen vet om?",
    "Hva er det rareste du har gjort for å gjøre noen kåt?",
    "Hvem her ville du valgt for en sex-app match?",
    "Hva er det villeste du har gjort i en bil?",
    "Hvem her tror du tar mest sjanser i sengen?",
    "Hva er den mest pinlige avbrytelsen du har opplevd?",
    "Hvem her ville du valgt om du fikk én natt uten regler?",
    "Hva er det villeste du har gjort på en ferie?",
    "Hvem her tror du ville vært overraskende dominant?",
    "Hva er den siste personen du flørtet hardt med?",
    "Hvem her ville du valgt om du var singel og hadde lyst på noe enkelt?",
    "Hva er det villeste du har sett på sosiale medier nylig?",
    "Hvem her tror du har en mer aktiv sex-liv enn de viser?",
    "Hva er den dummeste grunnen til at du droppet sex?",
    "Hvem her ville du valgt om du måtte sende en flørtende melding?",
    "Hva er det villeste forslaget du har fått?",
    "Hvem her tror du ville passet best på date med en eks av deg?",
    "Hva er det mest pinlige som har skjedd på en sex-date?",
    "Hva er det villeste du har gjort for å holde et forhold spennende?",
    "Hvem her tror du har vurdert å gjøre noe vilt?",
    "Hva er den lengste sex-økten du har hatt?",
    "Hvem her ville du valgt for en hemmelig morgenmøte?",
    "Hva er den ene tingen som alltid får deg i stemning?",
    "Hvem her tror du tenker mest på det daglig?",
    "Hva er den mest pinlige tingen en partner har funnet ut om deg?",
    "Hvem her ville du valgt om du måtte ha en wingman på date?",
    "Hva er det villeste du har gjort spontant?",
    "Hvem her tror du har et hemmelig forhold akkurat nå?",
    "Hva er det rareste stedet du har fantasert om sex?",
    "Hvem her ville du valgt om du måtte velge mellom alle her?",
    "Hva er den ene tingen du aldri vil prøve?",
    "Hvem her tror du har en partner du ikke vet om?",
    "Hva er den siste sex-drømmen du husker?",
    "Hva er det villeste du har gjort på et sommerstevne eller festival?",
    "Hvem her ville du valgt om du fikk én siste natt før verdens slutt?",
  ],
  blasted: [
    "Hva er den ene hemmeligheten ingen i rommet vet?",
    "Hvem her har du faktisk fantasert om?",
    "Hva er den verste tingen du har gjort mot en eks?",
    "Hvem her ville du gjort det med uten å fortelle partneren din?",
    "Hva er den mest skammelige tingen du har gjort i et forhold?",
    "Hvem her har du tenkt på når du var alene?",
    "Hva er den hemmeligheten som kan ødelegge alt?",
    "Hvem her ville du gjort noe forbudt med?",
    "Hva er det villeste du har gjort som ingen vet om?",
    "Hvem her har du sett på på en måte du ikke skulle?",
    "Hva er den verste tingen du har spredd om noen?",
    "Hvem her har du baksnakket mest?",
    "Hva er den mørkeste hemmeligheten fra et tidligere forhold?",
    "Hvem her tror du har en hemmelighet om deg?",
    "Hva er det villeste du har gjort etter en krangel?",
    "Hvem her ville du gjort det med bare for hevn?",
    "Hva er det mest manipulerende du har gjort?",
    "Hvem her vet noe om deg du ikke vil at andre skal vite?",
    "Hva er den dypeste skammen du bærer?",
    "Hvem her har du løyet til om noe stort?",
    "Hva er den ene tingen du aldri vil tilstå overfor familien?",
    "Hvem her ville du gjort noe ulovlig sammen med?",
    "Hva er det villeste du har gjort for penger?",
    "Hvem her tror du har gjort noe verre enn deg?",
    "Hva er den siste store løgnen du fortalte til en partner?",
    "Hvem her har du forrådt på en måte de ikke vet om?",
    "Hva er det mest skadelige du har gjort mot deg selv?",
    "Hvem her har du sjekket ut mens partneren din var der?",
    "Hva er den verste tingen du har gjort for å hevne deg?",
    "Hvem her vet du ville sviktet deg om de fikk sjansen?",
    "Hva er det villeste du har gjort under påvirkning?",
    "Hvem her ville du valgt om du måtte ødelegge ett vennskap?",
    "Hva er den ene tingen du har gjort som du fortrenger?",
    "Hvem her ville du valgt for en helt hemmelig affære?",
    "Hva er det villeste du har lest i andres meldinger?",
    "Hvem her har du gjort noe verre mot enn de aner?",
    "Hva er den mest sjokkerende tingen du har gjort på fest?",
    "Hvem her har du hatt drømmer om du aldri vil innrømme?",
    "Hva er den ene tingen du angrer mest på i et tidligere forhold?",
    "Hvem her har du følt noe forbudt for?",
    "Hva er det villeste du har gjort på jobb?",
    "Hvem her har du brukt for egen fordel?",
    "Hva er den siste tingen du gjorde som faktisk var galt?",
    "Hvem her ville du valgt om du måtte forlate alle andre?",
    "Hva er den mest skamfulle erfaringen din seksuelt?",
    "Hvem her vet du har snakket dritt om deg?",
    "Hva er det villeste du har gjort uten partnerens viten?",
    "Hvem her ville du faktisk fjernet fra livet ditt?",
    "Hva er den hemmeligheten du tar med deg i graven?",
    "Hvem her har du gjort noe med du ville benekte?",
    "Hva er det dummeste du har risikert alt for?",
    "Hvem her ville du valgt om du måtte avsløre en hemmelighet?",
    "Hva er det villeste du har gjort for å holde noen?",
    "Hvem her har du følt urettferdig hat mot?",
    "Hva er den verste meldingen du har sendt og aldri innrømmet?",
    "Hvem her tror du ville ødelagt deg om de kunne?",
    "Hva er det mest sjokkerende du har gjort i et forhold?",
    "Hva er den dypeste sannheten om deg ingen vet?",
    "Hvem her ville du gått bak ryggen til for å få noe?",
    "Hva er det villeste du har gjort for å bli kvitt noen?",
    "Hvem her har en hemmelighet du aldri vil dele?",
    "Hva er den mest skadelige tingen du har sagt i sinne?",
    "Hvem her ville du valgt om du måtte gjøre noe ulovlig sammen?",
    "Hva er den siste personen du har sjekket Instagram til i smug?",
    "Hvem her ville du forført om det ikke fikk konsekvenser?",
    "Hva er det villeste du har gjort på en utenlandsreise?",
    "Hvem her har du sett nakenbilder av uten lov?",
    "Hva er den ene tingen som ville sjokkert foreldrene dine mest?",
    "Hvem her har du fantasert om mens du var sammen med en annen?",
    "Hva er det villeste du har gjort i en åpen forhold-situasjon?",
    "Hvem her vet noe om deg som kunne fått deg sparket?",
    "Hva er den ene avgjørelsen som forandret livet og du angrer på?",
    "Hvem her har du følt noe sterkt for og aldri sagt?",
    "Hva er det villeste du har gjort i en bryllupshelg?",
    "Hvem her ville du valgt om du måtte være utro en gang?",
    "Hva er den ene meldingen du sendte som du har slettet bevis på?",
    "Hvem her har du gjort noe med du angrer dypt på?",
    "Hva er den verste tingen du har gjort i et hemmelig sjalusianfall?",
    "Hvem her tror du ville krysset linjen med deg om du ba?",
    "Hva er det villeste du har gjort på en jobbreise?",
    "Hvem her ville du valgt for en hemmelig sext-utveksling?",
    "Hva er den ene løgnen du fortalte for å beholde et forhold?",
    "Hvem her har du gjort noe seksuelt med du holdt skjult?",
    "Hva er det villeste du har gjort etter et brudd?",
    "Hvem her ville du valgt for en helg uten regler?",
    "Hva er den mørkeste fantasien du holder for deg selv?",
    "Hvem her har du gjort noe mot du aldri kan gjøre godt igjen?",
    "Hva er det mest skamfulle du har gjort full?",
    "Hvem her ville du faktisk valgt om dere var alene på en øy?",
    "Hva er den siste tingen du gjorde og fortrengte?",
    "Hvem her tror du har en hemmelig dobbeltsiden?",
    "Hva er det villeste du har gjort uten å si til noen?",
    "Hvem her ville du gjort det med selv om det betydde å miste alt?",
    "Hva er den ene hemmeligheten som faktisk plager deg?",
    "Hvem her har du forelsket deg i og aldri sagt fra om?",
    "Hva er det mest sjokkerende du har gjort i fylla?",
    "Hvem her ville du valgt om du fikk én syndefri natt?",
    "Hva er den verste tingen du har latt skje uten å gripe inn?",
    "Hva er den ene sannheten du frykter mest skal komme ut?",
    "Hvem her ville du gjort noe galt med uten å angre?",
  ],
};
 
const DARES = {
  chill: [
    "Si én ting du liker ved alle i rommet",
    "Vis din beste dansebevegelse",
    "Snakk med en aksent til neste runde",
    "Gjør 15 push-ups",
    "Syng refrenget på din siste favorittlåt",
    "Post den siste selfien i kamerarullen din på story",
    "La personen til venstre skrive en bio for Instagram-en din",
    "Imitér en kjendis til noen gjetter hvem",
    "Ring en tilfeldig kontakt og syng bursdagssangen",
    "Vis de tre siste søkene dine på Google",
    "Lag den dummeste vitsen du kan finne på",
    "La noen rote i kjøleskapet ditt og lage deg en snack",
    "Gjør en catwalk gjennom hele rommet",
    "La gruppen velge ditt nye profilbilde",
    "Si tre ærlige komplimenter til personen til høyre",
    "Lat som du er en nyhetsanker i 30 sekunder",
    "Gjør et håndstand-forsøk",
    "Dans i ett minutt uten musikk",
    "Send en gif til de tre siste personene i chatten din",
    "Fortell den mest pinlige historien fra ungdomsskolen",
    "Lag en rap om personen til venstre",
    "Gjør din beste imitasjon av en lærer du har hatt",
    "Vis hva du har i lommene akkurat nå",
    "La gruppen velge en sang du må synge høyt",
    "Snakk med babystemme i to minutter",
    "Send et hjerte-emoji til den femte siste i chatten",
    "Gjør 10 squats mens du synger",
    "Fortell hva du tenkte da du så hver person første gang",
    "La noen tegne med øyeliner på armen din",
    "Lag en TikTok-koreografi på sparket",
    "Vis det rareste bildet i kamerarullen din",
    "Skriv en kjærlighetssang til mat på 30 sekunder",
    "Snakk i et helt minutt uten å si 'ehh'",
    "Lat som du er på jobbintervju med personen til høyre",
    "Gjør en beatbox-runde",
    "Vis den dårligste selfien du har tatt",
    "La noen velge tre tilfeldige emojier som blir din nye status",
    "Lag en reklame for en gjenstand i rommet",
    "Snakk kun med spørsmål til neste runde",
    "Gi en TED talk om hvorfor pasta er best",
    "Imitér din egen mor eller far",
    "La gruppen velge tre ord du må bruke i hver setning",
    "Gjør en pinligst-mulig dans i 20 sekunder",
    "Fortell hva du faktisk tenker om hver person, kort",
    "Send en blomster-emoji til mamma eller pappa",
    "Lag en dramatisk monolog om en gulrot",
    "Snakk som om du leser nyhetene i en time-warp",
    "La noen velge hvilken stilling du sitter i resten av runden",
    "Synge alfabetet baklengs",
    "Lag en sang av siste melding du sendte",
    "Gå i sakte film til kjøkkenet og tilbake",
    "Lat som du er en katt i ett minutt",
    "Vis den tredje siste meldingen du sendte til mamma",
    "Bytt sokker med personen til høyre",
    "Lag et nytt navn til hver person og bruk det resten av runden",
    "Gjør en sjarmoffensiv mot lampen i rommet",
    "Lat som du er sportskommentator for det som skjer i rommet nå",
    "Beskriv hver person med kun mat-sammenligninger",
    "Gjør en talkshow-introduksjon for personen til venstre",
    "La noen rote i veska eller lommeboka di",
    "Hold en motivasjonstale til en plante",
    "Snakk i rim til neste runde",
    "Lag en reklame for kjæresten du ikke har",
    "Imitér hvordan personen til høyre ler",
    "Lag den verste tegningen av personen overfor deg",
    "Si fem ord på språk du ikke kan",
    "Gjør en pinlig stretching-økt midt på gulvet",
    "Lat som du gråter dramatisk i 30 sekunder",
    "Lag en hyllestsang til den siste maten du spiste",
    "Vis ditt mest brukte filter på kameraet",
    "Lat som du er en gammel mann eller dame",
    "Lag en parodi av en sang som spilles på radio nå",
    "Gjør en pinlig poseringsserie for et imaginært bilde",
    "Snakk hviskende resten av runden",
    "Imitér gangen til en i rommet",
    "Lag en falsk værmelding for morgendagen",
    "Hold en tale til skoene dine om hvor takknemlig du er",
    "Gjør en dramatisk avslutning på en setning andre starter",
    "Bytt sko med personen til venstre",
    "Lat som du smaker på det verste du kan tenke deg",
    "Gjør en personlig trener-økt med rommet",
    "Lag en sang om det siste du kjøpte",
    "Snakk med eple i munnen i ett minutt",
    "Lag en parodi-reklame for tannkrem",
    "Gjør en dans som passer til lyden av regnet",
    "Lat som du er en robot resten av runden",
    "Hold pusten mens du teller til 20",
    "Imitér hvordan en baby spiser",
    "Lat som du sender en talemelding til en idol du har",
    "Gjør en gjennomgang av outfit-en din som om du er på catwalken",
    "Snakk med høy mickey mouse-stemme i ett minutt",
    "Beskriv smaken av salt for noen som aldri har smakt det",
    "Lag en promo for et fiktivt produkt",
    "Imitér en politiker du ikke liker",
    "Lag en stand-up-vits om noen i rommet",
    "Hopp på ett bein rundt rommet",
    "Spis noe uten å bruke hender",
    "Snakk på falsk-engelsk i to minutter",
    "Lat som du har glemt navnet ditt og prøver å huske",
    "Lat som hele rommet er på en talkshow med deg som vert",
  ],
  drunk: [
    "Ta en shot",
    "Kyss personen til venstre på kinnet",
    "La alle ta en slurk fra glasset ditt",
    "Send en flørtende melding til den fjerde siste i chatten",
    "Ring eksen din og si hei",
    "Ta av deg ett klesplagg",
    "Sitt i fanget til personen til høyre i ett minutt",
    "La noen sende en melding fra telefonen din",
    "Kyss hånden til den du synes er finest her",
    "Fortell om den villeste natten du har hatt",
    "La personen til venstre velge din neste drink",
    "Gjør en bodyshot av eller på en du velger",
    "Post en uflatterende selfie på story",
    "La alle lese de siste fem meldingene fra en valgfri chat",
    "Hvisk noe upassende i øret til den til høyre",
    "Bytt en del av antrekket med noen i rommet",
    "Si hvem du synes er finest her og hvorfor",
    "Gjør den mest forførende dansen du klarer",
    "Ring en venn og si du forelsket deg nettopp",
    "Si tre ting du finner attraktivt ved den til venstre",
    "Send en melding til den siste eks-en og spør hvordan det går",
    "Sitt på fanget til den i rommet du finner finest",
    "La gruppen velge én du må gi en lang klem",
    "Vis siste melding du sendte til et crush eller eks",
    "Gjør en lap dance-imitasjon på en stol",
    "La noen plukke et bilde å poste fra kamerarullen din",
    "Ring foreldrene dine og si du har truffet 'den rette'",
    "Drikk hele drinken din uten å puste",
    "La personen til venstre legge inn en bestilling i Foodora-appen din",
    "Ta en shot mens noen synger for deg",
    "Bytt skjorte eller topp med noen i rommet",
    "Send et kysse-emoji til de tre siste i chatten",
    "Gjør en strip-tease av sokkene dine",
    "Si den ene tingen du ville gjort med personen til høyre om dere var alene",
    "La gruppen lage en bio for Tinder-profilen din",
    "Ring noen tilfeldig og fortell en kjærlighetshistorie",
    "Sett deg på fanget til en og si tre komplimenter",
    "La noen ta en video av deg som synger høyt",
    "Vis den siste personen du flørtet med på melding",
    "Send 'jeg savner deg' til en tilfeldig kontakt",
    "Drikk en shot mens du holder øyekontakt med noen",
    "Gjør en dans som passer til en sang noen velger",
    "La en velge et bilde fra galleriet du må poste",
    "Klem hver person i rommet i ti sekunder",
    "Gjør en pinlig dans foran et speil mens andre filmer",
    "Send en flørtende melding til personen som er nest øverst i chatten",
    "Sett bartender-stemme på og lag en falsk drink-presentasjon",
    "Sitt tett inntil personen til venstre resten av runden",
    "Gi den i rommet du finner finest et kompliment om utseendet",
    "Send et hjerte til alle eks-er i kontaktlisten",
    "Gjør en romantisk talemelding til den siste i chatten",
    "Ta en shot fra noens hånd",
    "Lat som du frier til personen overfor deg",
    "Send en bilde-melding av rommet til en tilfeldig kontakt",
    "Gjør en sjekkereplikk live på en i rommet",
    "Drikk en hel slurk hver gang noen ler de neste fem minuttene",
    "Vis den nyeste personen i Snapchat-vennelisten din",
    "La personen til høyre velge ditt neste antrekk fra det som finnes her",
    "Si den ene personen i livet ditt du fortsatt tenker på",
    "Send en talemelding der du flørter til siste eks",
    "Bytt parfyme eller deodorant med noen",
    "Gjør en hot-or-not på alle her høyt",
    "Drikk noe uten å bruke hendene",
    "La gruppen lese den siste samtalen din med et crush",
    "Send 'jeg drømte om deg i natt' til en tilfeldig",
    "Hvisk noe ekkelt til den i rommet du synes er finest",
    "Gjør en sangduett med personen til venstre",
    "Lag en flørtende selfie og send til de tre siste i chatten",
    "Gå opp til speilet og si tre ekle ting høyt",
    "Drikk en shot mens du sitter i fanget til noen",
    "Vis hvilken kontakt du har i telefonen som 'ikke ta opp'",
    "La gruppen velge én du må gi en kompliment på leppene",
    "Send en melding til en bestevenn og si du har lyst på dem",
    "Gjør en strip-imitasjon med jakken din",
    "Lag en dramatisk talemelding til noen tilfeldig",
    "Ta en bilde med tungen ute og post på story",
    "Gå rundt og si én flørtende ting til hver person",
    "La personen til høyre dyppe fingeren i drinken din",
    "Send en melding der du ber om en blind date",
    "Skift navnet ditt på Snapchat til noe rart i 24 timer",
    "Sett deg fang i fang med en til, klem i 20 sekunder",
    "Drikk halvparten av drinken til personen til venstre",
    "Bytt deodorant eller sokk med noen i rommet",
    "Vis den eldste personen du har klint med (alder)",
    "La gruppen velge en flørtemelding du må sende til mamma sin venninne",
    "Gjør en strip-tease av jakken eller cardigan-en din",
    "Send 'kommer du i kveld?' til en eks",
    "Stå i en lang øyekontakt med noen i 30 sekunder",
    "La en velge hvor du tar et bilde med dem",
    "Drikk en shot mellom hver setning du sier i to minutter",
    "Vis den dårligste blind-date du har vært på",
    "Gjør en sang-tilegning til den til høyre",
    "La gruppen lage en flørtemelding du må sende",
    "Klem den lengste klemmen du klarer med en valgt person",
    "Drikk en slurk for hver person du har klint med i livet",
    "Si én ting du synes er sexy ved hver person i rommet",
    "Send en hjertemelding til en eks du fortsatt tenker på",
    "Bytt klær delvis med en valgt person",
    "Drikk hele drinken på under 30 sekunder",
    "La gruppen poste hva som helst på storyen din",
  ],
  nasj: [
    "Kyss den du synes er finest her",
    "Gi noen i rommet en lap dance i 20 sekunder",
    "Sitt i fanget til den til venstre og hvisk noe ekkelt",
    "Beskriv hva du ville gjort med personen til høyre om dere var alene",
    "La gruppen lese de siste DM-ene dine i ett minutt",
    "Send et lett-flørtende bilde til den siste i chatten",
    "Ta av deg to plagg",
    "Gjør en sexy positur mens alle tar bilde",
    "Kyss den i rommet med flest fingre oppe",
    "Fortell den villeste sex-erfaringen du har hatt",
    "La noen tegne med tusj på lavmagen din",
    "Spill 'syv minutter i paradis' med en valgt person",
    "Beskriv typen din i full detalj",
    "La gruppen velge én du må gi en lang klem og kyss på halsen",
    "La personen til venstre sette passordet på telefonen din i 10 minutter",
    "Send en sexting-åpner til en valgfri kontakt",
    "Gjør en sexy runway-walk gjennom rommet",
    "Klem en valgt person i lavmagen i 10 sekunder",
    "Beskriv den ene fantasien du tenker mest på",
    "Send et flørtende speilbilde til den tredje siste i chatten",
    "Gi noen i rommet en sensuell skuldermassasje",
    "Si én ting du finner sexy ved hver person",
    "Sitt rygg-mot-bryst med en valgt person i ett minutt",
    "Vis den siste personen du har sextet med",
    "Bytt en topp med noen og posér for et bilde",
    "Beskriv din ideelle natt med en partner",
    "Send 'jeg har en fantasi om deg' til en valgt kontakt",
    "Vis det villeste bildet i kamerarullen som ikke er upassende",
    "La gruppen velge én du må gi et kyss på halsen",
    "Beskriv den siste sex-drømmen du husker",
    "Gjør en sensuell dans for en valgt person",
    "Si den ene grensen du har flyttet for en partner",
    "La noen velge en kompliment du må gi om en kropp i rommet",
    "Send en talemelding der du flørter åpent",
    "Vis hvilken kontakt du har lagret som mest pikant",
    "Lag en flørtende lydopptak og spill av høyt",
    "La gruppen bestemme hvilken kroppsdel du skal kysse på en valgt",
    "Gi noen et kyss som varer i fem sekunder på kinnet eller halsen",
    "Beskriv hva som tenner deg mest",
    "Vis den siste flørtemeldingen du har fått",
    "La en velge en sexy positur du må holde i 30 sekunder",
    "Send et bilde av leppene dine til en valgt kontakt",
    "Vis Spotify-spillelisten du hører på når du er i stemning",
    "Gjør en dans der du tar av deg én ting underveis",
    "La gruppen velge én du må sove tett inntil resten av runden",
    "Si den ene personen i rommet du har tenkt på på den måten",
    "Send 'jeg har lyst på deg i kveld' til en eks eller flørt",
    "Beskriv din mest spontane sex-erfaring",
    "Gi noen i rommet en lang klem med ansikt mot hals",
    "Vis hvor mange du har klint med siste år",
    "Send et bilde av magen din til en valgt person",
    "La gruppen velge én du må gi en bodyshot",
    "Beskriv den lengste sex-økten du har hatt",
    "Sitt fang i fang med en valgt og se hverandre i øynene i ett minutt",
    "Lag en sex-playlist på sparket og del første sang høyt",
    "Vis hvilket emoji du sender mest i flørtemeldinger",
    "Si den ene partneren som overrasket deg mest",
    "Gjør en dans i undertøy eller liknende plagg",
    "Vis siste skjermbilde du har som er litt ekkelt",
    "Send 'kom hit nå' til en eks",
    "La en valgt person beskrive sin fantasi om deg",
    "Beskriv det villeste sex-stedet du har vært på",
    "Si én ting du har lyst til å prøve men aldri turt",
    "Gi en valgt person et eple-kyss som varer 10 sekunder",
    "Vis siste personen du har søkt opp på Instagram",
    "La gruppen velge en sex-rolle du må spille på 30 sekunder",
    "Beskriv hva en perfekt one night stand inneholder",
    "Sitt på en valgt sin fang og hvisk en hemmelig fantasi",
    "Send 'jeg våknet og tenkte på deg' til en flørt",
    "Vis siste flørten din ned tema-listen i Snapchat",
    "Gjør en stretching-rutine sakte foran rommet",
    "Vis hvilken film eller serie som tenner deg mest",
    "Si én kropps-del du elsker mest hos andre",
    "La en valgt velge et sted på kroppen din du må vise",
    "Beskriv et sted du alltid har lyst til å ha sex",
    "Send 'jeg har savnet hendene dine' til en eks",
    "Gjør en kyssende positur for et bilde med en valgt",
    "Vis hvor mange match du har på dating-app akkurat nå",
    "Si den ene personen i rommet du faktisk har drømt om",
    "Lag en talemelding der du beskriver en fantasi",
    "Bytt undertøy med ingen, men nevn fargen høyt",
    "Beskriv siste gang du følte sterk dragning",
    "La gruppen velge én du må klemme tett i 30 sekunder",
    "Send en flørtende stemme-melding til en eks",
    "Vis den ene personen i kontaktene som er pikant",
    "Si hva som er det første du gjør på en sex-date",
    "Gjør en dramatisk pose-rekke med skuldre frem",
    "Beskriv den siste personen du har klint med, med detaljer",
    "Send 'jeg vurderer å invitere deg over' til en valgt",
    "Vis siste video du har lagret som er litt sexy",
    "La en valgt skrive en flørtende melding fra telefonen din",
    "Si én ting du elsker ved et tidligere sex-liv",
    "Beskriv det rareste stedet du har klint",
    "Gi en valgt person et lite bitt i øreflippen",
    "Vis den minst kjente partneren du har hatt",
    "La gruppen bestemme hvem du må sende et hjerte til",
    "Send 'jeg drømte om noe vi gjorde sammen' til en eks",
    "Si én ting du har lyst på akkurat nå men ikke kan si høyt",
    "Beskriv hva som ville gjort en perfekt natt med en her",
    "Send et bilde av halsen din til en valgt kontakt",
  ],
  blasted: [
    "Si den ene hemmeligheten ingen i rommet vet",
    "Send en melding til en eks der du tilstår at du fortsatt tenker på dem",
    "Vis hele meldingshistorikken med en valgt eks",
    "La gruppen lese den siste flørte-samtalen i full lengde",
    "Si hvem her du faktisk har fantasert om",
    "Send 'kommer over nå' til en eks midt på natta",
    "Vis den dypeste hemmeligheten i notater-appen din",
    "La en valgt poste hva som helst på Instagram fra kontoen din",
    "Si den ene personen i rommet som har et hemmelig poeng hos deg",
    "Vis hvilken kontakt du har lagret under et falsk navn",
    "Lag en stemmemelding der du tilstår noe du aldri har sagt",
    "Send 'vi bør snakke om det som skjedde' til en eks",
    "Vis det mest pikante bildet i et skjult album",
    "La gruppen velge én å sende et tilståelses-melding til",
    "Si den siste tingen du gjorde og har angret dypt på",
    "Vis siste skjermbilde fra en privat samtale",
    "La en valgt skrive bio-en din i 24 timer",
    "Send 'jeg løy om noe viktig' til en venn",
    "Si én tilståelse om noen i denne gjengen",
    "Vis hvor mange ekser du fortsatt har lagret med navn",
    "La gruppen lese de siste DM-ene fra dating-app",
    "Send en talemelding der du innrømmer en fantasi",
    "Si den ene tingen du aldri ville fortalt foreldrene dine",
    "Vis siste gang du gråt i kameramodus",
    "La en valgt sende en melding du ikke får se på forhånd",
    "Si én ting du har gjort som ville sjokkert mamma",
    "Send 'jeg har savnet deg på en feil måte' til en eks",
    "Vis hvilken kontakt du har lagret som 'ikke svare'",
    "Si én partner du fortsatt har følelser for",
    "Lag en talemelding der du beskriver din mørkeste fantasi",
    "Vis siste ting du søkte i incognito-modus",
    "La gruppen velge én du må kysse på leppene",
    "Si én tilståelse om kjæresten eller partneren din",
    "Send 'jeg er ikke ferdig med deg' til en eks",
    "Vis den dypeste hemmeligheten i en privat chat",
    "La en valgt rote i hele kameramappen din i ett minutt",
    "Si den ene personen du har vært utro mot",
    "Vis den siste flørtemeldingen du fikk fra en du ikke burde",
    "La gruppen lese den eldste samtalen med en eks",
    "Send 'jeg har drømt om deg flere ganger' til en valgt",
    "Si én ting du har gjort i et forhold du angrer dypest på",
    "Vis siste skjermbilde du har av noens profil",
    "La en valgt poste én ting på storyen din",
    "Si den ene tingen som ville endret livet ditt om det kom ut",
    "Send 'vi burde møtes igjen' til en eks fra mer enn et år tilbake",
    "Vis hvor mange du har sextet med uten å være sammen",
    "La gruppen lage en falsk Tinder-bio for deg",
    "Si én partner du aldri burde vært med",
    "Lag en stemmemelding der du tilstår alt du tenker om en valgt",
    "Vis siste bilde du fikk som du ikke turte å vise noen",
    "Si den ene partneren som var en hemmelighet",
    "Send 'jeg vurderer hver dag å skrive til deg' til en eks",
    "Vis siste ting du gjorde da du var alene og kjedet deg",
    "La en valgt sjekke siste samtale med ditt mest pikante kontakt",
    "Si én ting du har gjort som ville ødelagt et vennskap her",
    "Vis hvilken kontakt du sender mest hjerter til",
    "La gruppen velge én å sende et flørtende voice-note til",
    "Si den dypeste skammen du har om en seksuell hendelse",
    "Vis den eldste flørte-meldingen du fortsatt har lagret",
    "Send 'jeg løy da jeg sa det var over' til en eks",
    "Si den ene tingen du gjorde i fylla og ingen vet om",
    "Lag en lang stemmemelding der du tilstår alt om en valgt person",
    "Vis hvilken person i kontaktene har et hjerte ved seg",
    "Si den ene tingen du ville endret om en partner kunne se sannheten",
    "Send 'jeg har gjort noe jeg må fortelle deg' til en venn",
    "Vis den ene gruppechatten du baksnakker andre i",
    "La en valgt lese hele den siste samtalen med eks-en din",
    "Si én tilståelse som vil overraske alle her",
    "Vis siste melding du sendte og fjernet rett etterpå",
    "La gruppen lage et innlegg du må poste fra kontoen din",
    "Si den ene tingen du har skjult fra alle nære venner",
    "Send 'jeg våknet med tankene fulle av deg' til en eks",
    "Vis hvor mye penger du har brukt på en hemmelig hobby",
    "Si den dypeste følelsen du har for en her, ingen vet om",
    "Lag en talemelding der du beskriver en hemmelig fantasi om en her",
    "Vis hvilken kontakt du har lagret med pseudonym",
    "Si én partner du fortsatt sjekker Instagram til ofte",
    "Send 'jeg klarer ikke slutte å tenke på den natten' til en eks",
    "Vis siste samtale du har slettet bevis fra",
    "La en valgt poste et bilde fra galleriet på storyen din",
    "Si den ene tingen som ville fått deg sparket fra jobb",
    "Vis hvilket bilde du har som ingen andre har sett",
    "Send 'jeg har vært utro i tankene mine med deg' til en valgt",
    "Si den ene tingen du har gjort uten samtykke fra partneren",
    "Vis siste personen du møtte i hemmelighet",
    "La gruppen velge én du må fortelle en hemmelighet til",
    "Si én ting du har gjort som ville sjokkert din nærmeste venn",
    "Send 'jeg har en hemmelighet til deg' til en valgt person",
    "Vis siste DM med noen du møtte fra en dating-app",
    "Si den dypeste tilståelsen om en eks du aldri har delt",
    "La en valgt skrive den neste bildeteksten din",
    "Vis hvor mange du har klint med uten å fortelle vennene",
    "Si den ene tingen du har gjort som du tar med deg i graven",
    "Send 'jeg orker ikke å tie lenger' til en valgt person",
    "Vis siste sexting-samtale du har lagret",
    "La gruppen lage et tilståelses-innlegg du må poste",
    "Si den ene partneren ingen tror du har vært sammen med",
    "Send 'jeg har holdt en hemmelighet for lenge' til en venn",
    "Si den ene fantasien du har om en her du aldri vil innrømme",
    "Si den dypeste sannheten om hvorfor et tidligere forhold endte",
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