import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import IntroScreen from "./screens/IntroScreen";
import HomeScreen from "./screens/HomeScreen";
import ModeSelectScreen from "./screens/ModeSelectScreen";
import NeverHaveIEverScreen from "./screens/games/NeverHaveIEverScreen";
import ImposterScreen from "./screens/games/ImposterScreen";
import ZYNBoxScreen from "./screens/games/ZYNBoxScreen";
import RiskItScreen from "./screens/games/RiskItScreen";

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

export default function App() {
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
    </NavigationContainer>
  );
}