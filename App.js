import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Animated, Dimensions } from "react-native";
import { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import IntroScreen from "./screens/IntroScreen";
import HomeScreen from "./screens/HomeScreen";
import ModeSelectScreen from "./screens/ModeSelectScreen";
import NeverHaveIEverScreen from "./screens/games/NeverHaveIEverScreen";
import ImposterScreen from "./screens/games/ImposterScreen";
import ZYNBoxScreen from "./screens/games/ZYNBoxScreen";
import RiskItScreen from "./screens/games/RiskItScreen";

const { width, height } = Dimensions.get("window");
const Stack = createNativeStackNavigator();

function ComingSoonScreen({ route }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#0B0B14", alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 48, marginBottom: 16 }}>🚧</Text>
      <Text style={{ color: "#fff", fontSize: 24, fontWeight: "900" }}>Kommer snart</Text>
      <Text style={{ color: "rgba(255,255,255,0.3)", marginTop: 8, fontSize: 13 }}>
        Dette spillet er under utvikling
      </Text>
    </View>
  );
}

function SplashScreen({ onDone }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const exitAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
    ]).start(() => {
      setTimeout(() => {
        Animated.timing(exitAnim, { toValue: 0, duration: 500, useNativeDriver: true }).start(() => {
          onDone();
        });
      }, 1800);
    });
  }, []);

  return (
    <Animated.View style={{
      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 999, opacity: exitAnim,
    }}>
      <LinearGradient colors={["#0D0D0D", "#0D0D0D"]} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

        {/* Bakgrunns-glow */}
        <View style={{
          position: "absolute", width: 400, height: 400, borderRadius: 200,
          backgroundColor: "#7C3AED", opacity: 0.06, top: height / 2 - 300,
        }} />
        <View style={{
          position: "absolute", width: 300, height: 300, borderRadius: 150,
          backgroundColor: "#FF2C66", opacity: 0.05, top: height / 2 - 100,
        }} />

        <Animated.View style={{
          alignItems: "center",
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}>
          {/* Ølglass SVG */}
          <View style={{ width: 160, height: 200, marginBottom: 32 }}>
            <svg_placeholder />
          </View>

          {/* Ølglass tegnet med Views */}
          <View style={{ width: 140, height: 190, marginBottom: 32, position: "relative" }}>
            {/* Glass kropp */}
            <View style={{
              position: "absolute", top: 0, left: 10, right: 30,
              bottom: 0, borderRadius: 16,
              borderWidth: 3, borderColor: "#7C3AED",
            }} />
            {/* Håndtak */}
            <View style={{
              position: "absolute", right: 0, top: 40,
              width: 36, height: 70, borderRadius: 18,
              borderWidth: 3, borderColor: "#FF2C66",
              borderLeftWidth: 0,
            }} />
            {/* Skum */}
            <View style={{
              position: "absolute", top: 3, left: 13, right: 33,
              height: 44, borderRadius: 12,
              backgroundColor: "#fff", opacity: 0.9,
            }} />
            {/* Øl */}
            <View style={{
              position: "absolute", top: 47, left: 13, right: 33,
              bottom: 3, borderRadius: 12,
              backgroundColor: "#7C3AED", opacity: 0.2,
            }} />
            {/* Bobler */}
            <View style={{ position: "absolute", width: 8, height: 8, borderRadius: 4, backgroundColor: "#7C3AED", opacity: 0.6, left: 30, top: 100 }} />
            <View style={{ position: "absolute", width: 6, height: 6, borderRadius: 3, backgroundColor: "#FF2C66", opacity: 0.55, left: 55, top: 85 }} />
            <View style={{ position: "absolute", width: 5, height: 5, borderRadius: 2.5, backgroundColor: "#7C3AED", opacity: 0.45, left: 40, top: 130 }} />
            <View style={{ position: "absolute", width: 7, height: 7, borderRadius: 3.5, backgroundColor: "#FF2C66", opacity: 0.5, left: 70, top: 115 }} />
            <View style={{ position: "absolute", width: 5, height: 5, borderRadius: 2.5, backgroundColor: "#7C3AED", opacity: 0.4, left: 25, top: 150 }} />
          </View>

          {/* Tekst */}
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{
              fontSize: 56, fontWeight: "900", color: "#7C3AED", letterSpacing: 4,
            }}>BUZZ</Text>
            <Text style={{
              fontSize: 56, fontWeight: "900", color: "#FF2C66", letterSpacing: 4,
            }}>ED</Text>
          </View>

          {/* Linje */}
          <View style={{ width: 180, height: 1.5, backgroundColor: "#7C3AED", opacity: 0.3, marginTop: 12 }} />

          <Text style={{
            color: "rgba(255,255,255,0.28)", fontSize: 13,
            fontWeight: "700", letterSpacing: 4, marginTop: 12,
          }}>
            DRINKING GAME
          </Text>
          <Text style={{
            color: "rgba(255,255,255,0.13)", fontSize: 11,
            fontWeight: "600", letterSpacing: 3, marginTop: 6,
          }}>
            TURN THE NIGHT LOOSE
          </Text>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ModeSelect" component={ModeSelectScreen} />
        <Stack.Screen name="NeverHaveIEver" component={NeverHaveIEverScreen} />
        <Stack.Screen name="Imposter" component={ImposterScreen} />
        <Stack.Screen name="ZYNBox" component={ZYNBoxScreen} />
        <Stack.Screen name="RiskIt" component={RiskItScreen} />
        <Stack.Screen name="ComingSoon" component={ComingSoonScreen} />
      </Stack.Navigator>

      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
    </NavigationContainer>
  );
}