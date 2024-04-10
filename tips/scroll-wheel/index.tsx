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
} from "react-native";
import React from "react";

const LIST_COUNT = 20;

const ScrollWheel = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [listItemHeight, setListItemHeight] = React.useState(0);

  const handleUpdateIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(contentOffsetY / (listItemHeight - 32));

    console.log("Index", currentIndex);

    if (contentOffsetY <= 0) {
      return setCurrentIndex(0);
    } else if (index >= LIST_COUNT) {
      return setCurrentIndex(LIST_COUNT);
    }
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={new Array(LIST_COUNT).fill("")}
        contentContainerStyle={styles.list}
        keyExtractor={(_, idx) => String(idx)}
        onScroll={handleUpdateIndex}
        renderItem={({ index }) => (
          <View
            style={[
              styles.list_item,
              // { transform: [{ scale: 0.5 }] }
            ]}
            onLayout={({ nativeEvent }) => {
              setListItemHeight(nativeEvent.layout.height);
            }}
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
          </View>
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
  list: { gap: 14, padding: 16 },
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

export default ScrollWheel;
