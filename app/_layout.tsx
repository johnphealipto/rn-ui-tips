import "react-native-reanimated";

import { COLORS } from "@/constants/colors";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();

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
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShadowVisible: true,
          // headerBackTitleVisible: false,
          headerStyle: { backgroundColor: COLORS.foreground },
          contentStyle: { backgroundColor: COLORS.background },
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <Pressable onPress={() => router.back()}>
                <Ionicons
                  name="return-up-back"
                  size={24}
                  color={COLORS.title}
                />
              </Pressable>
            ) : null,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "React Native UI Tips",
            headerBlurEffect: "extraLight",
          }}
        />
        <Stack.Screen
          name="(tips)/animated-check"
          options={{ title: "Animated Check" }}
        />
        <Stack.Screen
          name="(tips)/swipe-to-reveal"
          options={{ title: "Swipe To Reveal" }}
        />
        <Stack.Screen
          name="(tips)/draggable-wallet-card"
          options={{ title: "Draggable Wallet Card" }}
        />
      </Stack>
      <StatusBar style="dark" />
    </GestureHandlerRootView>
  );
}
