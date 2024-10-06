import { COLORS } from "@/constants/colors";
import { useFonts } from "expo-font";
import { Stack, useNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const navigation = useNavigation();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: COLORS.foreground },
        contentStyle: { backgroundColor: COLORS.background },
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="return-up-back" size={24} color={COLORS.title} />
            </Pressable>
          ) : null,
      }}
    >
      <Stack.Screen name="index" options={{ title: "React Native UI Tips" }} />
      <Stack.Screen
        name="animated-check"
        options={{ title: "Animated Check" }}
      />
      <Stack.Screen
        name="swipe-to-reveal"
        options={{ title: "Swipe To Reveal" }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
