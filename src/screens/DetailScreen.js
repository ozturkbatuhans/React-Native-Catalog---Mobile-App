import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useProductDetail } from "../hooks/useProductDetail";

export default function DetailScreen() {
  const route = useRoute();
  const id = route?.params?.id;
  const { data, loading, error, isEmpty } = useProductDetail(id);

  useEffect(() => {
    console.log("DetailScreen mounted with id:", id);
    return () => console.log("DetailScreen unmounted");
  }, [id]);

  if (!id) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Invalid product id.</Text>
      </View>
    );
  }
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.subtle}>Loading product…</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load detail.</Text>
      </View>
    );
  }
  if (isEmpty) {
    return (
      <View style={styles.center}>
        <Text style={styles.subtle}>No detail found.</Text>
      </View>
    );
  }

  const img = data?.thumbnail || (data?.images?.length ? data.images[0] : undefined);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {img ? <Image source={{ uri: img }} style={styles.image} /> : null}
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.meta}>€ {data.price} · ★ {data.rating} · {data.category}</Text>
      <Text style={styles.desc}>{data.description}</Text>
      {/* 4+ alan: title, price, rating, description, image (+category) */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  subtle: { fontSize: 14, color: "gray", marginTop: 8 },
  error: { color: "crimson", fontSize: 16 },
  image: { width: "100%", height: 240, borderRadius: 8, marginBottom: 12, backgroundColor: "#eee" },
  title: { fontSize: 22, fontWeight: "600" },
  meta: { fontSize: 14, color: "gray", marginTop: 6 },
  desc: { fontSize: 15, lineHeight: 22, marginTop: 12 },
});
