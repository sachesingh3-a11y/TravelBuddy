import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Alert,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { PRODUCTS } from './data/products';
import ProductCard from './components/ProductCard';

export default function App() {
  // State untuk search query
  const [searchQuery, setSearchQuery] = useState('');

  // useMemo: hitung filteredProducts HANYA saat searchQuery berubah
  // ini lebih efisien daripada filter biasa di dalam render
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return PRODUCTS;  // jika search kosong, tampilkan semua
    }
    const query = searchQuery.toLowerCase().trim();
    return PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);  // dependency: hanya re-compute saat searchQuery berubah

  const handleProductPress = (product) => {
    Alert.alert(product.name, `Harga: Rp ${product.price.toLocaleString('id-ID')}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛍️ Toko Kita</Text>

        {/* ===== SEARCH BAR ===== */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari produk atau kategori..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}   // update state setiap ketik
            autoCorrect={false}             // matikan autocorrect
          />
          {/* Tombol clear — hanya muncul saat ada text */}
          {searchQuery.length > 0 && (
            <Text
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}  // reset search
            >
              ✕
            </Text>
          )}
        </View>

        {/* Info hasil pencarian */}
        <Text style={styles.resultInfo}>
          {searchQuery
            ? `${filteredProducts.length} hasil untuk "${searchQuery}"`
            : `${PRODUCTS.length} produk tersedia`}
        </Text>
      </View>

      {/* FlatList — sekarang pakai filteredProducts bukan PRODUCTS */}
      <FlatList
        data={filteredProducts}             // ← pakai data yang sudah difilter
        renderItem={({ item }) => (
          <ProductCard item={item} onPress={handleProductPress} />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>
              Produk "{searchQuery}" tidak ditemukan
            </Text>
            <Text style={styles.emptyHint}>
              Coba kata kunci lain
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 12 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
  },
  clearButton: {
    fontSize: 14,
    color: '#9ca3af',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  resultInfo: { fontSize: 12, color: '#6b7280' },
  listContent: { paddingVertical: 12, paddingBottom: 32 },
  emptyContainer: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 56, marginBottom: 12 },
  emptyText: { fontSize: 16, color: '#374151', fontWeight: '600', textAlign: 'center', marginBottom: 4 },
  emptyHint: { fontSize: 13, color: '#9ca3af' },
}); 