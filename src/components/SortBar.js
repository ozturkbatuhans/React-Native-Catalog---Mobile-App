import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SORT_KEYS } from "../utils/sorting";

function SortButton({ label, active, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, active && styles.btnActive]}>
      <Text style={[styles.btnText, active && styles.btnTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function SortBar({ sortKey, onChange }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>Sort:</Text>
      <SortButton
        label="Rating ↓"
        active={sortKey === SORT_KEYS.RATING_DESC}
        onPress={() => onChange(SORT_KEYS.RATING_DESC)}
      />
      <SortButton
        label="Price ↑"
        active={sortKey === SORT_KEYS.PRICE_ASC}
        onPress={() => onChange(SORT_KEYS.PRICE_ASC)}
      />
      <SortButton
        label="Price ↓"
        active={sortKey === SORT_KEYS.PRICE_DESC}
        onPress={() => onChange(SORT_KEYS.PRICE_DESC)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, columnGap: 8, paddingBottom: 8 },
  label: { marginRight: 8, fontWeight: "600" },
  btn: { paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: "#ddd", borderRadius: 8 },
  btnActive: { backgroundColor: "#111", borderColor: "#111" },
  btnText: { fontSize: 13, color: "#111" },
  btnTextActive: { color: "#fff" },
});
