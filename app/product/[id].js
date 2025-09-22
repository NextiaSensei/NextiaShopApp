import { WOO_API_URL, WOO_CONSUMER_KEY, WOO_CONSUMER_SECRET } from "@env";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProductoDetalle() {
  const { id } = useLocalSearchParams(); // 📌 Recibe el ID del producto
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Si no hay ID, no hace nada

    axios.get(`${WOO_API_URL}/products/${id}`, {
  auth: {
    username: WOO_CONSUMER_KEY,
    password: WOO_CONSUMER_SECRET,
  },
})
      .then((res) => {
        setProducto(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando producto:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!producto) {
    return (
      <View style={styles.center}>
        <Text>No se encontró el producto.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Imagen del producto */}
      {producto.images?.length > 0 && (
        <Image
          source={{ uri: producto.images[0].src }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      {/* Nombre */}
      <Text style={styles.title}>{producto.name}</Text>

      {/* Precio */}
      <Text style={styles.price}>${producto.price} MXN</Text>

      {/* Descripción */}
      <Text style={styles.description}>
        {producto.description.replace(/<\/?[^>]+(>|$)/g, "")}
      </Text>

      {/* Botón agregar */}
      <Button title="Agregar al carrito 🛒" onPress={() => alert("Producto agregado")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  image: { width: "100%", height: 300, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  price: { fontSize: 20, color: "green", marginBottom: 10 },
  description: { fontSize: 16, color: "#555", marginBottom: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
