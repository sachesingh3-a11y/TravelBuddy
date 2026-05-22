import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react';
import { AppContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useContext(AppContext);

  const renderFavItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.favCard}
      onPress={() => navigation.navigate('Home', { screen: 'Detail', params: { destination: item } })}
    >
      <Image source={{ uri: item.image }} style={styles.favImage} />
      <View style={styles.favContent}>
        <Text style={styles.favTitle}>{item.name}</Text>
        <Text style={styles.favLoc}>📍 {item.location}</Text>
        <Text style={styles.favPrice}>{item.price}</Text>
      </View>
      <Ionicons name="heart" size={24} color="#ff7675" style={styles.heartIcon} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderFavItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listPadding}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={60} color="#b2bec3" />
            <Text style={styles.emptyText}>Belum ada destinasi favorit.</Text>
            <Text style={styles.emptySub}>Klik ikon hati pada detail objek untuk menyimpan.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  listPadding: { padding: 16 },
  favCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, marginBottom: 12, padding: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  favImage: { width: 80, height: 80, borderRadius: 10 },
  favContent: { flex: 1, marginLeft: 12 },
  favTitle: { fontSize: 16, fontWeight: 'bold', color: '#2d3436' },
  favLoc: { fontSize: 13, color: '#636e72', marginVertical: 3 },
  favPrice: { fontSize: 14, fontWeight: 'bold', color: '#00b894' },
  heartIcon: { marginRight: 4 },
  emptyContainer: { alignItems: 'center', marginTop: 60, paddingHorizontal: 32 },
  emptyText: { fontSize: 16, fontWeight: 'bold', color: '#2d3436', marginTop: 12 },
  emptySub: { fontSize: 13, color: '#636e72', marginTop: 4, textAlign: 'center' }
});