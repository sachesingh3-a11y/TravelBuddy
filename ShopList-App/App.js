import { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
} from 'react-native';

import { PRODUCTS } from './data/products';
import ProductCard from './components/ProductCard';

export default function App() {

  // =========================
  // 🔍 SEARCH
  // =========================
  const [search, setSearch] = useState('');

  // =========================
  // 🔄 REFRESH
  // =========================
  const [refreshing, setRefreshing] = useState(false);

  // =========================
  // 🎯 FILTER KATEGORI
  // =========================
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // =========================
  // 🔳 GRID / LIST
  // =========================
  const [numColumns, setNumColumns] = useState(1);

  // =========================
  // 🔽 SORT
  // =========================
  const [sortBy, setSortBy] = useState('default');

  // =========================
  // 🔄 REFRESH FUNCTION
  // =========================
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // =========================
  // 📦 AMBIL KATEGORI
  // =========================
  const categories = ['Semua', ...new Set(PRODUCTS.map(item => item.category))];

  // =========================
  // 🔍 FILTER + 🎯 + 🔽 SORT
  // =========================
  const filteredData = PRODUCTS
    .filter(item => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        selectedCategory === 'Semua' || item.category === selectedCategory;

      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'low') return a.price - b.price;
      if (sortBy === 'high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <View style={{ flex: 1 }}>

      {/* ========================= */}
      {/* 🔍 SEARCH BAR */}
      {/* ========================= */}
      <TextInput
        placeholder="Cari produk..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          margin: 10,
          padding: 8,
          borderRadius: 8,
        }}
      />

      {/* ========================= */}
      {/* 🎛️ FILTER KATEGORI */}
      {/* ========================= */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', margin: 10 }}>
        {categories.map((cat) => (
          <Text
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={{
              padding: 8,
              margin: 4,
              borderRadius: 20,
              backgroundColor: selectedCategory === cat ? '#007bff' : '#ddd',
              color: selectedCategory === cat ? '#fff' : '#000',
            }}
          >
            {cat}
          </Text>
        ))}
      </View>

      {/* ========================= */}
      {/* 🔘 TOGGLE GRID */}
      {/* ========================= */}
      <Text
        onPress={() => setNumColumns(numColumns === 1 ? 2 : 1)}
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: '#28a745',
          color: '#fff',
          textAlign: 'center',
          borderRadius: 8,
        }}
      >
        Toggle {numColumns === 1 ? 'Grid' : 'List'}
      </Text>

      {/* ========================= */}
      {/* 🔽 SORT */}
      {/* ========================= */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
        <Text onPress={() => setSortBy('low')} style={{ padding: 8 }}>Harga ↑</Text>
        <Text onPress={() => setSortBy('high')} style={{ padding: 8 }}>Harga ↓</Text>
        <Text onPress={() => setSortBy('rating')} style={{ padding: 8 }}>Rating ⭐</Text>
      </View>

      {/* ========================= */}
      {/* 📋 FLATLIST */}
      {/* ========================= */}
      <FlatList
        key={numColumns}
        numColumns={numColumns}
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}

        // ❌ EMPTY STATE
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ fontSize: 40 }}>😢</Text>
            <Text>Tidak ada produk ditemukan</Text>
            <Text>Coba kata kunci lain</Text>
          </View>
        )}

        // 🔄 REFRESH
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
}