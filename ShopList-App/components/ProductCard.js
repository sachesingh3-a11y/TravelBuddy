import { View, Text, StyleSheet } from 'react-native';

export default function ProductCard({ product }) {
  return (
    <View style={styles.card}>
      <Text style={styles.image}>{product.image}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Text>{product.category}</Text>
      <Text>Rp {product.price}</Text>
      <Text>⭐ {product.rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1, // penting buat grid
    backgroundColor: '#fff',
    padding: 12,
    margin: 8,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    fontSize: 40,
  },
  name: {
    fontWeight: 'bold',
  },
});