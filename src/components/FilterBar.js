import React, { useMemo } from "react";
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from "react-native";

export default function FilterBar({ data, category, onCategoryChange, inStockOnly, onToggleStock }) {
  // derive categories from data
  const categories = useMemo(() => {
    const set = new Set(data.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>In stock only</Text>
        <Switch value={inStockOnly} onValueChange={onToggleStock} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catRow}>
        {categories.map((c) => {
          const active = c === category;
          return (
            <TouchableOpacity
              key={c}
              onPress={() => onCategoryChange(c)}
              style={[styles.catChip, active && styles.catChipActive]}
            >
              <Text style={[styles.catText, active && styles.catTextActive]}>{c}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  label: { fontWeight: "600" },
  catRow: { columnGap: 8 },
  catChip: { borderWidth: 1, borderColor: "#ddd", borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 },
  catChipActive: { backgroundColor: "#111", borderColor: "#111" },
  catText: { fontSize: 13, color: "#111" },
  catTextActive: { color: "#fff" },
});
