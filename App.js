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
import SpinTheBottleScreen from "./screens/games/SpinTheBottleScreen";

const { height } = Dimensions.get("window");
const Stack = createNativeStackNavigator();

function ComingSoonScreen() {
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
      <LinearGradient
        colors={["#0D0D0D", "#0D0D0D"]}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
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

          {/* Ølglass */}
          <View style={{ width: 120, height: 170, marginBottom: 32, alignItems: "center" }}>
            {/* Kork */}
            <View style={{ width: 14, height: 8, borderRadius: 3, backgroundColor: "#7C3AED", marginBottom: 2 }} />
            {/* Hals */}
            <View style={{
              width: 22, height: 20,
              borderTopLeftRadius: 4, borderTopRightRadius: 4,
              borderWidth: 2.5, borderBottomWidth: 0,
              borderColor: "#7C3AED", backgroundColor: "transparent",
            }} />
            {/* Kropp + håndtak */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{
                width: 70, height: 100, borderRadius: 12,
                borderWidth: 2.5, borderColor: "#7C3AED",
                backgroundColor: "rgba(124,58,237,0.12)", overflow: "hidden",
              }}>
                {/* Skum */}
                <View style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 32,
                  backgroundColor: "rgba(255,255,255,0.88)",
                  borderTopLeftRadius: 10, borderTopRightRadius: 10,
                }} />
                {/* Refleks */}
                <View style={{
                  position: "absolute", left: 8, top: 38,
                  width: 5, height: 45, borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.12)",
                }} />
                {/* Bobler */}
                <View style={{ position: "absolute", left: 16, top: 55, width: 7, height: 7, borderRadius: 4, backgroundColor: "#7C3AED", opacity: 0.6 }} />
                <View style={{ position: "absolute", left: 32, top: 48, width: 5, height: 5, borderRadius: 3, backgroundColor: "#FF2C66", opacity: 0.55 }} />
                <View style={{ position: "absolute", left: 46, top: 62, width: 6, height: 6, borderRadius: 3, backgroundColor: "#7C3AED", opacity: 0.45 }} />
                <View style={{ position: "absolute", left: 24, top: 72, width: 5, height: 5, borderRadius: 3, backgroundColor: "#FF2C66", opacity: 0.4 }} />
              </View>
              {/* Håndtak høyre side */}
              <View style={{
                width: 22, height: 50,
                borderTopRightRadius: 14, borderBottomRightRadius: 14,
                borderWidth: 2.5, borderLeftWidth: 0,
                borderColor: "#FF2C66", backgroundColor: "transparent",
                marginLeft: -2,
              }} />
            </View>
            {/* Bunn */}
            <View style={{
              width: 70, height: 9, borderRadius: 5,
              backgroundColor: "rgba(124,58,237,0.25)",
              borderWidth: 1.5, borderColor: "#7C3AED", marginTop: -2,
            }} />
          </View>

          {/* BUZZED tekst */}
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{ fontSize: 56, fontWeight: "900", color: "#7C3AED", letterSpacing: 4 }}>BUZZ</Text>
            <Text style={{ fontSize: 56, fontWeight: "900", color: "#FF2C66", letterSpacing: 4 }}>ED</Text>
          </View>

          {/* Linje */}
          <View style={{ width: 180, height: 1.5, backgroundColor: "#7C3AED", opacity: 0.3, marginTop: 12 }} />

          {/* Undertekst */}
          <Text style={{ color: "rgba(255,255,255,0.28)", fontSize: 13, fontWeight: "700", letterSpacing: 4, marginTop: 12 }}>
            DRINKING GAME
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.13)", fontSize: 11, fontWeight: "600", letterSpacing: 3, marginTop: 6 }}>
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
        <Stack.Screen name="SpinTheBottle" component={SpinTheBottleScreen} />
        <Stack.Screen name="ComingSoon" component={ComingSoonScreen} />
      </Stack.Navigator>

      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
    </NavigationContainer>
  );
}