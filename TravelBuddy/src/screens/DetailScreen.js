import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react';
import { AppContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

export default function DetailScreen({ route, navigation }) {
  const { destination } = route.params;
  const { favorites, toggleFavorite } = useContext(AppContext);
  
  const isFavorite = favorites.some(fav => fav.id === destination.id);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: destination.image }} style={styles.heroImage} />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#2d3436" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <View style={styles.titleTextContainer}>
              <Text style={styles.title}>{destination.name}</Text>
              <Text style={styles.location}>📍 {destination.location}</Text>
            </View>
            <TouchableOpacity style={[styles.favBtn, isFavorite && styles.favBtnActive]} onPress={() => toggleFavorite(destination)}>
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={26} 
                color={isFavorite ? "#fff" : "#636e72"} 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Estimasi Biaya</Text>
            <Text style={styles.priceValue}>{destination.price}</Text>
          </View>

          <View style={styles.divider} />
          <Text style={styles.descriptionTitle}>Tentang Destinasi</Text>
          <Text style={styles.description}>{destination.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  imageContainer: { position: 'relative' },
  heroImage: { width: '100%', height: 320 },
  backButton: { position: 'absolute', top: 16, left: 16, backgroundColor: 'rgba(255,255,255,0.9)', padding: 10, borderRadius: 25, elevation: 5 },
  contentContainer: { padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24, backgroundColor: '#fff', marginTop: -20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titleTextContainer: { flex: 1, paddingRight: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2d3436' },
  location: { fontSize: 15, color: '#636e72', marginTop: 6 },
  favBtn: { backgroundColor: '#f1f2f6', padding: 12, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  favBtnActive: { backgroundColor: '#ff7675' },
  priceContainer: { backgroundColor: '#f5f6fa', padding: 14, borderRadius: 12, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceLabel: { fontSize: 14, color: '#636e72', fontWeight: '500' },
  priceValue: { fontSize: 18, fontWeight: 'bold', color: '#00b894' },
  divider: { height: 1, backgroundColor: '#dfe6e9', marginVertical: 20 },
  descriptionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2d3436', marginBottom: 10 },
  description: { fontSize: 15, color: '#2d3436', lineHeight: 24, textAlign: 'justify' }
});