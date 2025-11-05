import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useProducts } from "../hooks/useProducts";

export default function HomeScreen({ navigation }) {
  const { data, loading, error, isEmpty } = useProducts();

  useEffect(() => {
    console.log("HomeScreen mounted");
    return () => console.log("HomeScreen unmounted");
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.subtle}>Loading products…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load. Please try again.</Text>
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={styles.center}>
        <Text style={styles.subtle}>No products found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        keyExtractor={(item) => String(item.id)}
        estimatedItemSize={80}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("Detail", { id: item.id })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>€ {item.price} · ★ {item.rating}</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <Text style={styles.header}>Products</Text>
        }
        ItemSeparatorComponent={() => <View style={styles.sep} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  subtle: { fontSize: 14, color: "gray", marginTop: 8 },
  error: { color: "crimson", fontSize: 16 },
  header: { fontSize: 22, fontWeight: "600", padding: 16 },
  row: { paddingHorizontal: 16, paddingVertical: 12 },
  title: { fontSize: 16, fontWeight: "500" },
  meta: { fontSize: 13, color: "gray", marginTop: 4 },
  sep: { height: StyleSheet.hairlineWidth, backgroundColor: "#e5e5e5" },
});
