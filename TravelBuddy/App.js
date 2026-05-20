// App.js — Entry point aplikasi Travel Buddy
import React from 'react';
// IMPORT SELESAI: Menggabungkan komponen dasar, scroll, tombol, dan input teks
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

// ======= Create Navigators =======
const Stack = createNativeStackNavigator();  // Stack Navigator untuk linear flow
const Tab = createBottomTabNavigator();       // Tab Navigator untuk bottom tabs

// ======= Data Destinasi =======
const destinations = [
  { id: 1, name: 'Bali', description: 'Pulau dewata dengan pantai eksotis', rating: 4.8 },
  { id: 2, name: 'Jakarta', description: 'Ibu kota dengan kehidupan malam seru', rating: 3.9 },
  { id: 3, name: 'Yogyakarta', description: 'Kota budaya dengan sejarah panjang', rating: 4.7 },
];

// ======= Screen Components =======

// 1. Home Screen (Menampilkan list destinasi terpopuler)
function HomeScreen({ navigation }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' }}>
          Popular Destinations
        </Text>
        {destinations.map((dest) => (
          <TouchableOpacity
            key={dest.id}
            onPress={() => navigation.navigate('Detail', { destination: dest })}  // ← Kirim data ke detail
            style={{
              backgroundColor: '#f5f5f5',
              padding: 12,
              marginBottom: 10,
              borderRadius: 8,
              borderLeftWidth: 4,
              borderLeftColor: '#00b894',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>
              {dest.name}
            </Text>
            <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
              {dest.description}
            </Text>
            <Text style={{ fontSize: 12, color: '#00b894', marginTop: 4, fontWeight: '600' }}>
              ⭐ {dest.rating}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// 2. Detail Screen (Menerima params data destinasi dari HomeScreen)
function DetailScreen({ route }) {
  const destination = route.params?.destination;  

  if (!destination) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text>Pilih destinasi terlebih dahulu di Home.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#00b894', marginBottom: 16 }}>
        📍 {destination.name}
      </Text>
      <View style={{ backgroundColor: '#f5f5f5', padding: 16, borderRadius: 8, marginBottom: 16 }}>
        <Text style={{ fontSize: 14, color: '#333', lineHeight: 20 }}>
          {destination.description}
        </Text>
      </View>
      <View style={{ backgroundColor: '#fff9e6', padding: 12, borderRadius: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#f39c12' }}>
          Rating: {destination.rating} ⭐
        </Text>
      </View>
    </View>
  );
}

// 3. Search Screen (Form Input untuk mencari sesuatu)
function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigasi langsung ke halaman hasil pencarian di dalam Stack yang sama
      navigation.navigate('SearchResults', { query: searchQuery });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>🔍 Search</Text>
      <TextInput
        placeholder="Search destination..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          padding: 10,
          borderRadius: 8,
          marginBottom: 12,
          fontSize: 14,
        }}
      />
      <TouchableOpacity
        onPress={handleSearch}
        style={{
          backgroundColor: '#00b894',
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

// 4. Search Results Screen (Menampilkan teks kata kunci yang dicari)
function SearchResultsScreen({ route }) {
  const query = route.params?.query || '';
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 18, color: '#333' }}>Hasil pencarian untuk: </Text>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#00b894', marginTop: 8 }}>"{query}"</Text>
    </View>
  );
}

// 5. Favorites Screen (Placeholder untuk tab favorit)
function FavoritesScreen() {
  const favorites = [
    { id: 1, name: 'Bali' },
    { id: 3, name: 'Yogyakarta' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>❤️ My Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={{ color: '#999' }}>No favorites yet</Text>
      ) : (
        <View>
          {favorites.map((fav) => (
            <View
              key={fav.id}
              style={{
                backgroundColor: '#ffe8e8',
                padding: 12,
                marginBottom: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#d32f2f' }}>
                ❤️ {fav.name}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

// ======= Stack Navigators =======

// Home Stack: Alur dari Home Utama → Klik Kartu → Pindah ke Detail
function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#00b894' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: '🏠 Home' }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: '📍 Destination Detail' }}
      />
    </Stack.Navigator>
  );
}

// Search Stack: Alur dari Form Input Search → Klik Cari → Masuk ke Hasil Pencarian
function SearchStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#00b894' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="SearchMain" 
        component={SearchScreen} 
        options={{ title: '🔍 Search Destination' }} 
      />
      <Stack.Screen 
        name="SearchResults" 
        component={SearchResultsScreen} 
        options={{ title: '🚀 Search Results' }} 
      />
    </Stack.Navigator>
  );
}

// ======= Tab Navigator (Bottom Tabs) =======
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,  // Biar stack navigator di atas yang handle header masing-masing
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') iconName = 'home';
          if (route.name === 'SearchTab') iconName = 'search';
          if (route.name === 'FavoritesTab') iconName = 'heart';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00b894',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: { backgroundColor: '#f5f5f5', paddingBottom: 5 },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStackNavigator} // Menggunakan Search Stack agar bisa menumpuk layar hasil
        options={{ title: 'Search' }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{ title: 'Favorites' }}
      />
    </Tab.Navigator>
  );
}

// ======= Main App Component =======
export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}