import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

const HomePage = () => {
  return (
    <View>
      <Link href="/animated-check" style={styles.reset_cont}>
        <Text>Animated Check</Text>
      </Link>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  reset_cont: { alignItems: "center" },
});
