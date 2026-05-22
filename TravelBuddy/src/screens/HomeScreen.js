import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react';
import { DESTINATIONS } from '../data/destinations';

export default function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Detail', { destination: item })}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardLocation}>📍 {item.location}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>{item.price}</Text>
          <Text style={styles.viewBadge}>Detail</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerSubtitle}>Discover Your Next Adventure</Text>
        <Text style={styles.headerTitle}>Destinations</Text>
      </View>
      <FlatList
        data={DESTINATIONS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  headerContainer: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 6, backgroundColor: '#fff' },
  headerSubtitle: { fontSize: 13, color: '#00b894', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#2d3436', marginTop: 2 },
  listContainer: { padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 20, overflow: 'hidden', elevation: 4, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  cardImage: { width: '100%', height: 190 },
  cardContent: { padding: 16 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#2d3436' },
  cardLocation: { fontSize: 14, color: '#636e72', marginVertical: 6 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  cardPrice: { fontSize: 16, fontWeight: 'bold', color: '#00b894' },
  viewBadge: { fontSize: 12, fontWeight: '600', color: '#fff', backgroundColor: '#00b894', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 }
});