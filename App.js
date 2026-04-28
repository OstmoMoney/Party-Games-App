import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Animated, Dimensions, Image } from "react-native";
import { useEffect, useRef, useState } from "react";
import IntroScreen from "./screens/IntroScreen";
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
  const exitAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, duration: 400, useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(exitAnim, {
          toValue: 0, duration: 400, useNativeDriver: true,
        }).start(() => onDone());
      }, 2000);
    });
  }, []);

  return (
    <Animated.View style={{
      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 999, opacity: exitAnim, backgroundColor: "#000",
    }}>
      <Image
        source={require("./assets/splash.png")}
        style={{ width, height, resizeMode: "contain" }}
      />
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