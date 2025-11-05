import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DetailScreen() {
  useEffect(() => {
    console.log("DetailScreen mounted");
    return () => console.log("DetailScreen unmounted");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Detail Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18 },
});
