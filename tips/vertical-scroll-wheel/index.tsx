import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  StatusBar,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
  Animated,
} from "react-native";
import React from "react";

const LIST_STATIC = {
  count: 20,
  padding: 16,
  gap: 14,
};

const VerticalScrollWheel = () => {
  const { height } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleUpdateIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentSize, contentOffset } = e.nativeEvent;
    // const index = Math.round(contentOffset.y / (listItemHeight - 32));
    const index = 0;

    console.log("contentOffsetY", contentOffset.y);
    console.log("contentSize.height", contentSize.height);
    console.log("height", height);

    if (contentOffset.y <= 0) {
      return setCurrentIndex(0);
    } else if (index >= LIST_STATIC.count) {
      return setCurrentIndex(LIST_STATIC.count);
    }
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={new Array(LIST_STATIC.count).fill("")}
        contentContainerStyle={styles.list}
        keyExtractor={(_, idx) => String(idx)}
        onScroll={handleUpdateIndex}
        renderItem={({ index }) => (
          <Animated.View
            style={[
              styles.list_item,
              // { transform: [{ scale: 0.5 }] }
            ]}
          >
            <Image
              source={require("./images/fruits.jpg")}
              style={styles.image}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "600", fontSize: 16 }}>Fruits</Text>
              <Text
                style={{
                  opacity: 0.75,
                  fontSize: 12,
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </View>
          </Animated.View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f3f3f3",
    marginTop: (StatusBar.currentHeight || 0) + 15,
  },
  list: {
    gap: LIST_STATIC.gap,
    padding: LIST_STATIC.padding,
  },
  list_item: {
    gap: 15,
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 5,
    objectFit: "cover",
  },
});

export default VerticalScrollWheel;
