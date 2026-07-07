// Kveldens spillere — lever kun i minnet og nullstilles når appen
// startes på nytt. Settes fra PlayersScreen og leses av spillene.

let sessionPlayers = [];

export function setSessionPlayers(names) {
  sessionPlayers = names.map((n) => n.trim()).filter(Boolean);
}

export function getSessionPlayers() {
  return [...sessionPlayers];
}

// Minst to spillere = vi kan adressere folk med navn i spillene
export function hasSessionCrew() {
  return sessionPlayers.length >= 2;
}

const randomOf = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ---------- Drikkekort med navn ---------- */
/* Flettes inn mellom spørsmålene i Snusleken når kveldens spillere   */
/* er lagt inn — «Peter, ta en slurk», «Jon, gi ut en slurk» osv.     */

const DRINK_CARD_TEMPLATES = {
  no: [
    "{name}, ta en slurk 🍺",
    "{name}, gi ut en slurk til valgfri person",
    "{name}, ta en shot eller gi ut to slurker",
    "{name}, alle andre tar en slurk — du står over",
    "{name}, ta en slurk sammen med personen til venstre for deg",
    "{name}, gi ut tre slurker — fordel dem som du vil",
    "{name}, ta to slurker hvis du har telefonen i lomma",
    "{name}, velg en som må ta en slurk sammen med deg",
  ],
  en: [
    "{name}, take a sip 🍺",
    "{name}, give out a sip to anyone you choose",
    "{name}, take a shot or give out two sips",
    "{name}, everyone else takes a sip — you sit this one out",
    "{name}, take a sip together with the person on your left",
    "{name}, give out three sips — split them however you want",
    "{name}, take two sips if your phone is in your pocket",
    "{name}, pick someone who has to take a sip with you",
  ],
};

export function drawDrinkCard(lang) {
  if (!hasSessionCrew()) return null;
  const templates = DRINK_CARD_TEMPLATES[lang] || DRINK_CARD_TEMPLATES.en;
  return randomOf(templates).replace("{name}", randomOf(sessionPlayers));
}

/* ---------- Navn på drikkeinstruksjoner ---------- */
/* «Ta en shot» → «Peter, ta en shot» der en spiller allerede er valgt */

const DRINK_WORDS = /slurk|shot|drikk|drink|sip|chug/i;

export function addressDrinkLine(text, name) {
  if (!name || !text || !DRINK_WORDS.test(text)) return text;
  return `${name}, ${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}
