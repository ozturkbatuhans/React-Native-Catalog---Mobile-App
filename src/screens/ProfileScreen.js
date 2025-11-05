import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function ProfileScreen() {
  useEffect(() => {
    console.log("ProfileScreen mounted");
    return () => console.log("ProfileScreen unmounted");
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/icon.png")} style={styles.avatar} />
      <Text style={styles.name}>Batu</Text>
      <Text style={styles.role}>Programmeren Student – Vives Hogeschool</Text>
      <Text style={styles.contact}>batuhan.ozturk@student.vives.be</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  avatar: { width: 100, height: 100, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "bold" },
  role: { fontSize: 16 },
  contact: { fontSize: 14, color: "gray" },
});
