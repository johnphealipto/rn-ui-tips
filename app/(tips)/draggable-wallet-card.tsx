import { triggerHapticFeedback } from "@/constants/utils";
import { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const CARD_HEIGHT = 170;
const WALLET_HEIGHT = 200;
const WALLET_RADIUS = 15;
const CARD_OUT_OFFSET_Y = -160;
const SECONDARY_CARD_TOP = -35;
const WALLET_WIDTH = Dimensions.get("screen").width - 30;

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

const DraggableWalletCard = () => {
  const rotation = useSharedValue(0);
  const isHidden = useSharedValue(0);
  const isCardOut = useSharedValue(0);
  const offset = useSharedValue({ x: 0, y: 0 });

  const [isHiddenState, setIsHiddenState] = useState(false);

  const animatedWalletStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      offset.value.y,
      [0, CARD_OUT_OFFSET_Y],
      [1, 0.9],
      // isCardOut.value ? [1, 0.9] : [0.9, 1],
      "clamp"
    );

    return { transform: [{ scale: withTiming(scale) }] };
  }, [offset]);

  const animatedSecondaryCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      offset.value.y,
      [0, CARD_OUT_OFFSET_Y],
      [0.95, 0.85],
      // isCardOut.value ? [0.95, 0.85] : [0.85, 0.95],
      "clamp"
    );
    const top = interpolate(
      isHidden.value,
      [0, 1],
      [SECONDARY_CARD_TOP, -4],
      "clamp"
    );
    return { top: withSpring(top), transform: [{ scale: withTiming(scale) }] };
  }, [offset, isHidden]);

  const animatedPrimaryCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      offset.value.y,
      [0, CARD_OUT_OFFSET_Y],
      [1, 1.05],
      // isCardOut.value ? [1, 1.05] : [1.05, 1],
      "clamp"
    );
    const top = interpolate(
      isHidden.value,
      [0, 1],
      [0, -(SECONDARY_CARD_TOP / 2)],
      "clamp"
    );
    const zIndex = interpolate(isCardOut.value, [0, 1], [3, 5], "clamp");

    return {
      zIndex,
      top: withSpring(top),
      transform: [
        { rotate: `${rotation.value}deg` },
        { translateY: withSpring(offset.value.y) },
        { scale },
      ],
    };
  }, [offset, isHidden, rotation]);

  const onDragGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (isHidden.value) return; // If hidden, do nothing

      // Calculate angle based on X and Y drag (in radians)
      const _radians = Math.atan2(e.translationY, e.translationX);
      const _degrees = _radians * (180 / Math.PI); // Convert to degrees
      const adjusted = _degrees + 90; // Adjusted
      const normalized = adjusted % 45; // Normalize by 45deg
      rotation.value = normalized; // Invert the angle for more realistic gesture

      // Set offset to values
      offset.value = {
        x: e.translationX,
        y: e.translationY,
      };

      // console.log(e.translationY);

      // if (e.translationY <= CARD_OUT_OFFSET_Y) return;

      // let isReset = !isCardOut.value;

      // if (isReset) {
      //   isCardOut.value = 1;
      // } else {
      //   isCardOut.value = 0;
      // }
    })
    .onEnd(() => {
      rotation.value = 0;
      offset.value = {
        x: 0,
        y: 0,
      };
    });

  const composed = Gesture.Race(onDragGesture);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.container}>
        <Animated.View style={[styles.wallet_back, animatedWalletStyle]} />
        <GestureDetector gesture={composed}>
          <Animated.View
            style={[styles.card, styles.primary_card, animatedPrimaryCardStyle]}
          >
            <Text>DraggableWallard</Text>
            <Text>DraggableWallard</Text>
          </Animated.View>
        </GestureDetector>
        <Animated.View
          style={[
            styles.card,
            styles.secondary_card,
            animatedSecondaryCardStyle,
          ]}
        >
          <Text>DraggableWalletCard</Text>
          <Text>DraggableWalletCard</Text>
        </Animated.View>
        <AnimatedImageBackground
          source={require("../../assets/others/leather-texture.jpg")}
          style={[styles.wallet_front, animatedWalletStyle]}
          borderRadius={WALLET_RADIUS}
        >
          <Pressable
            style={styles.view_balance}
            onPress={() => {
              setTimeout(() => {
                triggerHapticFeedback();
              }, 100);
              isHidden.value = isHidden.value ? 0 : 1;
              setIsHiddenState((prevState) => !prevState);
            }}
          >
            <Text style={{ fontSize: 12, color: "white" }}>
              {isHiddenState ? "Show" : "Hide"} Balance
            </Text>
          </Pressable>
        </AnimatedImageBackground>
      </View>
    </View>
  );
};

export default DraggableWalletCard;

const styles = StyleSheet.create({
  container: {
    position: "relative",

    shadowRadius: 10,
    shadowOpacity: 0.2,
    shadowColor: "#000",
    elevation: 5, // Android
    shadowOffset: { width: 0, height: 10 },
  },
  wallet_back: {
    width: WALLET_WIDTH,
    height: WALLET_HEIGHT,
    backgroundColor: "#1e1e1e",
    borderRadius: WALLET_RADIUS,
    overflow: "hidden",
  },
  wallet_front: {
    bottom: 0,
    zIndex: 4,
    height: 170,
    width: WALLET_WIDTH,
    position: "absolute",
    borderRadius: WALLET_RADIUS,
    backgroundColor: "#1e1e1e",
  },
  view_balance: {
    right: 20,
    bottom: 20,
    paddingVertical: 8,
    position: "absolute",
    paddingHorizontal: 15,
    borderRadius: WALLET_RADIUS * 5,
    backgroundColor: "rgba(30,30,30,0.85)",
  },
  card: {
    left: 10,
    height: CARD_HEIGHT,
    position: "absolute",
    width: WALLET_WIDTH - 20,
    marginHorizontal: "auto",
    borderRadius: WALLET_RADIUS,
  },
  primary_card: {
    zIndex: 3,
    backgroundColor: "red",
  },
  secondary_card: {
    zIndex: 2,
    backgroundColor: "blue",
  },
});

// If primary card is out (z-index: 5 & scale: 1.25),
// Other scale should be 0.95
