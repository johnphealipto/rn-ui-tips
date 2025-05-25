import { Dimensions, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");

const SwipeToReveal = () => {
  const scrollX = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <Animated.FlatList
      data={["Slide 1", "Slide 2"]}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={({ item }) => (
        <View
          style={{
            width,
            height: 100,
            paddingHorizontal: 20,
            // backgroundColor: COLORS.foreground,
          }}
        >
          <Text>{item}</Text>
        </View>
      )}
      contentContainerStyle={{
        justifyContent: "center",
        backgroundColor: "red",
        height: 100,
      }}
      style={{ alignContent: "center" }}
      horizontal
      pagingEnabled
      snapToAlignment="center"
      onScroll={handleScroll}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default SwipeToReveal;
