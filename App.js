import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Animated, Dimensions } from "react-native";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { t } from "./i18n";
import { MidnightBackground, COLORS, FONT } from "./components/MidnightUI";
import { useFonts } from "expo-font";
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
  Archivo_700Bold,
  Archivo_800ExtraBold,
  Archivo_900Black,
} from "@expo-google-fonts/archivo";
import { SpaceGrotesk_600SemiBold } from "@expo-google-fonts/space-grotesk";
import IntroScreen from "./screens/IntroScreen";
import BirthdayScreen from "./screens/BirthdayScreen";
import PlayersScreen from "./screens/PlayersScreen";
import HomeScreen from "./screens/HomeScreen";
import ModeSelectScreen from "./screens/ModeSelectScreen";
import NeverHaveIEverScreen from "./screens/games/NeverHaveIEverScreen";
import ImposterScreen from "./screens/games/ImposterScreen";
import ZYNBoxScreen from "./screens/games/ZYNBoxScreen";
import RiskItScreen from "./screens/games/RiskItScreen";
import SpinTheBottleScreen from "./screens/games/SpinTheBottleScreen";

const { width, height } = Dimensions.get("window");
const Stack = createNativeStackNavigator();

function ComingSoonScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#0d0a18", alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 48, marginBottom: 16 }}>🚧</Text>
      <Text style={{ color: "#fff", fontSize: 24, fontWeight: "900" }}>
        {t("Kommer snart", "Coming soon", "近日公開")}
      </Text>
      <Text style={{ color: "rgba(255,255,255,0.3)", marginTop: 8, fontSize: 13 }}>
        {t("Dette spillet er under utvikling", "This game is under development", "このゲームは開発中です")}
      </Text>
    </View>
  );
}

// Skalert mot 390pt referansebredde — "BUZ"/"ZED" skal nesten fylle bredden
const SPLASH_FONT_SIZE = Math.round(104 * Math.min(width / 390, 1.1));

function SplashScreen({ onDone }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const exitAnim = useRef(new Animated.Value(1)).current;
  const riseAnim = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(riseAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start(() => {
      setTimeout(() => {
        Animated.timing(exitAnim, {
          toValue: 0, duration: 400, useNativeDriver: true,
        }).start(() => onDone());
      }, 2000);
    });
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 999, opacity: exitAnim, backgroundColor: COLORS.bg,
      }}
    >
      <MidnightBackground variant="splash" />

      {/* Konfettiprikker — små fargeaksenter som i designet */}
      <View style={{ position: "absolute", top: height * 0.655, right: width * 0.17, width: 7, height: 7, borderRadius: 2, backgroundColor: COLORS.purple }} />
      <View style={{ position: "absolute", top: height * 0.77, right: width * 0.3, width: 9, height: 9, borderRadius: 5, backgroundColor: COLORS.pink }} />
      <View style={{ position: "absolute", top: height * 0.25, left: width * 0.12, width: 5, height: 5, borderRadius: 3, backgroundColor: COLORS.softPink, opacity: 0.7 }} />

      <Animated.View
        style={{
          flex: 1, justifyContent: "center", paddingHorizontal: 32,
          opacity: fadeAnim, transform: [{ translateY: riseAnim }],
        }}
      >
        <Text
          style={{
            fontFamily: FONT.label, fontSize: 12, letterSpacing: 5,
            color: COLORS.pink, marginBottom: 18,
          }}
        >
          TONIGHT'S GONNA BE GOOD
        </Text>

        <Svg width={width - 64} height={SPLASH_FONT_SIZE * 1.85}>
          <Defs>
            <SvgLinearGradient id="splashZed" x1="0%" y1="0%" x2="100%" y2="30%">
              <Stop offset="0" stopColor={COLORS.pink} />
              <Stop offset="1" stopColor={COLORS.purple} />
            </SvgLinearGradient>
          </Defs>
          <SvgText
            fill="#ffffff"
            fontFamily={FONT.black}
            fontSize={SPLASH_FONT_SIZE}
            letterSpacing="-2"
            x="0"
            y={SPLASH_FONT_SIZE * 0.8}
          >
            BUZ
          </SvgText>
          <SvgText
            fill="url(#splashZed)"
            fontFamily={FONT.black}
            fontSize={SPLASH_FONT_SIZE}
            letterSpacing="-2"
            x="0"
            y={SPLASH_FONT_SIZE * 1.72}
          >
            ZED
          </SvgText>
        </Svg>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 14, marginTop: 24 }}>
          <View style={{ width: 26, height: 2, borderRadius: 1, backgroundColor: COLORS.pink }} />
          <Text style={{ fontFamily: FONT.regular, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
            pouring the drinks…
          </Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [initialRoute, setInitialRoute] = useState(null);
  const [initialParams, setInitialParams] = useState({});

  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Archivo_700Bold,
    Archivo_800ExtraBold,
    Archivo_900Black,
    SpaceGrotesk_600SemiBold,
  });

  useEffect(() => {
    // Navn og fødselsdato lagres permanent — kveldens spillere gjør ikke det,
    // så returnerende brukere starter alltid på "Hvem spiller du med i dag?"
    Promise.all([
      AsyncStorage.getItem("playerName"),
      AsyncStorage.getItem("playerBirthdate"),
    ]).then(([savedName, savedBirthdate]) => {
      if (!savedName || savedName.length < 2) {
        setInitialRoute("Intro");
      } else if (!savedBirthdate) {
        setInitialRoute("Birthday");
        setInitialParams({ playerName: savedName });
      } else {
        setInitialRoute("Players");
        setInitialParams({ playerName: savedName });
      }
    });
  }, []);

  if (!initialRoute || !fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false, animation: "fade" }}
        >
          <Stack.Screen
            name="Intro"
            component={IntroScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="Birthday"
            component={BirthdayScreen}
            initialParams={initialRoute === "Birthday" ? initialParams : {}}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="Players"
            component={PlayersScreen}
            initialParams={initialRoute === "Players" ? initialParams : {}}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="ModeSelect" component={ModeSelectScreen} />
          <Stack.Screen name="NeverHaveIEver" component={NeverHaveIEverScreen} />
          <Stack.Screen name="Imposter" component={ImposterScreen} />
          <Stack.Screen name="ZYNBox" component={ZYNBoxScreen} />
          <Stack.Screen name="RiskIt" component={RiskItScreen} />
          <Stack.Screen name="SpinTheBottle" component={SpinTheBottleScreen} />
          <Stack.Screen name="ComingSoon" component={ComingSoonScreen} />
        </Stack.Navigator>
        {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}