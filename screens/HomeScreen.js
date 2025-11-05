import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  useEffect(() => {
    console.log("HomeScreen mounted");
    return () => console.log("HomeScreen unmounted");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Home Screen</Text>
      <Button title="Go to Detail" onPress={() => navigation.navigate("Detail")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18 },
});
