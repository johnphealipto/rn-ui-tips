import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CheckItem from "@/components/animated-check/check-item";
import { CUISINES } from "@/constants/app";

const HomePage = () => {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const handleToggleSelected = (value: string) => {
    setSelectedCuisines((prevState) => {
      if ([...prevState].includes(value)) {
        return [...prevState].filter((item) => item !== value);
      }

      return [...prevState, value];
    });
  };

  const handleReset = () => {
    setSelectedCuisines([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What are your favorite cuisines?</Text>

      <View style={styles.cuisines_wrap}>
        {CUISINES.map((item, idx) => (
          <CheckItem
            key={idx}
            label={item}
            checked={selectedCuisines.includes(item)}
            onPress={() => handleToggleSelected(item)}
          />
        ))}
      </View>

      <View style={styles.reset_cont}>
        <Pressable style={{ padding: 5 }} onPress={handleReset}>
          <Text style={{ color: "#666666" }}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", gap: 10, padding: 20 },
  title: { fontWeight: "600", fontSize: 18 },
  cuisines_wrap: { flexDirection: "row", flexWrap: "wrap", gap: 5 },
  reset_cont: { alignItems: "center" },
});
