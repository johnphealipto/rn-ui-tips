import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { COLORS } from "@/constants/colors";

const ICON_SIZE = 14;
const ORANGE_COLOR = "#FC7F3C";

const CheckItem = ({
  label,
  checked,
  onPress,
}: {
  label: string;
  checked: boolean;
  onPress: () => void;
}) => {
  const expand = useSharedValue(0);

  useEffect(() => {
    expand.value = withTiming(checked ? 1 : 0, { duration: 100 });
  }, [checked, expand]);

  const animatedContStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      expand.value,
      [0, 1],
      [COLORS.foreground, COLORS.orange]
    );

    return { borderColor };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      expand.value,
      [0, 1],
      [COLORS.text, COLORS.orange]
    );

    return { color };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const width = interpolate(expand.value, [0, 1], [0, ICON_SIZE]);
    const scale = interpolate(expand.value, [0, 1], [0, 1]);
    const left = interpolate(expand.value, [0, 1], [0, 5]);
    const opacity = interpolate(expand.value, [0, 1], [0, 1]);

    const handleSpringValue = (value: number) => {
      if (checked) {
        return withSpring(value, { duration: 500 });
      }
      return value;
    };

    return {
      opacity,
      marginLeft: left,
      width: handleSpringValue(width),
      transform: [{ scale: handleSpringValue(scale) }],
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[styles.container, animatedContStyle]}>
        <Animated.Text style={animatedTextStyle}>{label}</Animated.Text>
        <Animated.View style={animatedIconStyle}>
          <Octicons
            name="check-circle-fill"
            size={ICON_SIZE}
            color={ORANGE_COLOR}
          />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default CheckItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: COLORS.foreground,
  },
});
