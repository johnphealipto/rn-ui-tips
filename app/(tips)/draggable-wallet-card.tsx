import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const WALLET_RADIUS = 15;
const WALLET_WIDTH = Dimensions.get("screen").width - 30;

const DraggableWalletCard = () => {
  const rotation = useSharedValue(0);
  const isHidden = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        // { translateX: offset.value.x },
        { translateY: offset.value.y },
        { rotate: `${rotation.value}deg` },
      ],
    };
  }, [offset, rotation]);

  const onDragGesture = Gesture.Pan()
    .onUpdate((e) => {
      // Calculate angle based on X and Y drag (in radians)
      const _radians = Math.atan2(e.translationY, e.translationX);
      const _degrees = _radians * (180 / Math.PI); // Convert to degrees
      const adjusted = _degrees + 90; // Adjusted
      const normalized = adjusted % 10; // Normalize by 45deg
      rotation.value = -normalized; // Invert the angle for more realistic gesture

      // Set offset to values
      offset.value = {
        x: e.translationX,
        y: e.translationY,
      };
    })
    .onEnd(() => {
      rotation.value = withSpring(0);
      offset.value = {
        x: withSpring(0),
        y: withSpring(0),
      };
    });

  const composed = Gesture.Race(onDragGesture);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.View style={styles.wallet}>
        <GestureDetector gesture={composed}>
          <Animated.View
            style={[styles.card, styles.primary_card, animatedStyles]}
          >
            <Text>DraggableWallard</Text>
            <Text>DraggableWallard</Text>
          </Animated.View>
        </GestureDetector>
        <View style={[styles.card, styles.secondary_card]}>
          <Text>DraggableWalletCard</Text>
          <Text>DraggableWalletCard</Text>
        </View>
        <View style={[styles.wallet_front]}>
          <Pressable
            style={styles.view_balance}
            onPress={() => (isHidden.value = !isHidden.value)}
          >
            <Text style={{ color: "white" }}>Hide Balance</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

export default DraggableWalletCard;

const styles = StyleSheet.create({
  wallet: {
    height: 200,
    borderRadius: WALLET_RADIUS,
    position: "relative",
    backgroundColor: "#1e1e1e",
    width: WALLET_WIDTH,
  },
  wallet_front: {
    height: 170,
    borderRadius: WALLET_RADIUS,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#1e1e1e",
    width: WALLET_WIDTH,
    zIndex: 3,
  },
  view_balance: {
    right: 20,
    bottom: 20,
    paddingVertical: 10,
    position: "absolute",
    paddingHorizontal: 15,
    borderRadius: WALLET_RADIUS * 5,
    backgroundColor: "rgba(221, 43, 43, 0.5)",
  },
  card: {
    left: 10,
    height: 150,
    position: "absolute",
    width: WALLET_WIDTH - 20,
    marginHorizontal: "auto",
    borderRadius: WALLET_RADIUS,
  },
  primary_card: {
    backgroundColor: "red",
    zIndex: 2,
  },
  secondary_card: {
    zIndex: 1,
    top: -30,
    backgroundColor: "blue",
    transform: [{ scale: 0.95 }],
  },
});
