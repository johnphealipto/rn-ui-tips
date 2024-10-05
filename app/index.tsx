import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Href, Link } from "expo-router";
import { COLORS } from "@/constants/colors";

const TIPS: {
  link: Href;
  label: string;
}[] = [
  {
    link: "/animated-check",
    label: "Animated Check Button",
  },
  {
    link: "/animated-check",
    label: "Animated Check Button",
  },
];

const HomePage = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={TIPS}
        keyExtractor={(_, idx) => idx.toString()}
        contentContainerStyle={{ gap: 20 }}
        renderItem={({ item }) => (
          <Link href={item.link} style={styles.link}>
            {item.label}
          </Link>
        )}
      />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: { padding: 20 },
  link: { backgroundColor: COLORS.foreground, padding: 15 },
});
