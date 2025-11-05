import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar({ value, onChange }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by title..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
});
