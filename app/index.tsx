import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { COLORS } from "@/constants/colors";
import { RN_TIPS } from "@/constants/app";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={RN_TIPS}
        keyExtractor={(_, idx) => idx.toString()}
        style={{ flex: 1, paddingVertical: 20 }}
        contentContainerStyle={{ gap: 20 }}
        renderItem={({ item, index }) => (
          <Link href={item.link} style={styles.link}>
            <Text style={{ color: "#cacaca", fontWeight: "700" }}>
              {String(index + 1).padStart(2, "0")}.
            </Text>
            {"  "}
            {item.label}
          </Link>
        )}
      />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  link: { backgroundColor: COLORS.foreground, padding: 15 },
});
