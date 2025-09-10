import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ExploreScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://shop.nextiamarketing.com/wp-json/wc/v3/products", {
        auth: {
          username: "ck_3861249787bfadc6a12201ac0feb1dde2e558c1a", // 🔹 API Key
          password: "cs_bf739ec3a22a9cfc080e013346626d32ae502e71", // 🔹 API Secret
        },
        params: { per_page: 20 }, // más productos
      })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/productos/${item.id}`)}
          >
            <Image source={{ uri: item.images[0]?.src }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price} MXN</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  image: { width: 100, height: 100, resizeMode: "contain" },
  name: { fontSize: 14, fontWeight: "bold", textAlign: "center", marginVertical: 5 },
  price: { fontSize: 14, color: "#28a745" },
});
