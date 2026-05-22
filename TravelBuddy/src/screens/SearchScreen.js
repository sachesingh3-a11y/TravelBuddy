import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { Ionicons } from '@expo/vector-icons';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredDestinations = DESTINATIONS.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSearchItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.searchCard}
      onPress={() => navigation.navigate('Home', { screen: 'Detail', params: { destination: item } })}
    >
      <Image source={{ uri: item.image }} style={styles.searchImage} />
      <View style={styles.searchInfo}>
        <Text style={styles.searchName}>{item.name}</Text>
        <Text style={styles.searchLoc}>📍 {item.location}</Text>
        <Text style={styles.searchPrice}>{item.price}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#b2bec3" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBoxContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#b2bec3" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Cari destinasi atau lokasi..."
            placeholderTextColor="#b2bec3"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#636e72" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredDestinations}
        renderItem={renderSearchItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listPadding}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="sad-outline" size={50} color="#b2bec3" />
            <Text style={styles.emptyText}>Destinasi tidak ditemukan</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  searchBoxContainer: { padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#dfe6e9' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f2f6', borderRadius: 12, paddingHorizontal: 12, height: 46 },
  searchIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 15, color: '#2d3436' },
  listPadding: { padding: 16 },
  searchCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 14, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  searchImage: { width: 70, height: 70, borderRadius: 10 },
  searchInfo: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  searchName: { fontSize: 16, fontWeight: 'bold', color: '#2d3436' },
  searchLoc: { fontSize: 13, color: '#636e72', marginVertical: 3 },
  searchPrice: { fontSize: 14, fontWeight: '600', color: '#00b894' },
  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyText: { color: '#636e72', marginTop: 8, fontSize: 15 }
});