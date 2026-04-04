import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';

// 1. Interface untuk tipe data Props (Industry Standard)
interface ProductCardProps {
  title: string;
  price: string;
  imageUri: string;
  hasBadge?: boolean;
}

// 2. Komponen Reusable ProductCard
function ProductCard({ title, price, imageUri, hasBadge }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: imageUri }}
          style={styles.productImage}
          resizeMode="cover" 
        />
      </View>

      <Text style={styles.productName} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.productPrice}>{price}</Text>

      {/* Logic Absolute Positioning untuk Badge */}
      {hasBadge && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>OFF</Text>
        </View>
      )}
    </View>
  );
}

// 3. Main Screen Component
export default function TechGearsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section (FlexDirection: Column) */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>TechGears Store</Text>
          <Text style={styles.headerSubtitle}>Premium Gaming Gear</Text>
        </View>

        {/* Grid Container */}
        <View style={styles.gridContainer}>
          
          {/* Baris 1 */}
          <View style={styles.row}>
            <ProductCard
              title="Gaming Mouse"
              price="Rp 850.000"
              hasBadge={true}
              imageUri="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=500"
            />
            <ProductCard
              title="Mechanical KB"
              price="Rp 1.500.000"
              imageUri="https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=500"
            />
          </View>

          {/* Baris 2 - Update: CPU Gaming i9 */}
          <View style={styles.row}>
            <ProductCard
              title="CPU Gaming i9"
              price="Rp 12.500.000"
              hasBadge={true}
              imageUri="https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=500"
            />
            <ProductCard
              title="Headset 7.1"
              price="Rp 2.200.000"
              imageUri="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500"
            />
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 4. Styling (Flexbox Mastery)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark Theme
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center', // Center Title
    marginVertical: 32,
    flexDirection: 'column',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#BB86FC', // Accent Purple
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  gridContainer: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row', // Product Grid Logic
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1E1E1E',
    width: '48%', // Responsive 2 Columns
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    position: 'relative', // Penting untuk absolute badge
  },
  imageWrapper: {
    width: '100%',
    height: 110,
    backgroundColor: '#252525',
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%', 
  },
  productName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  productPrice: {
    color: '#03DAC6', // Teal Accent for Price
    marginTop: 6,
    fontSize: 14,
    fontWeight: 'bold',
  },
  discountBadge: {
    position: 'absolute', // Absolute Position Requirement
    top: -5,
    right: -5,
    backgroundColor: '#CF6679', // Soft Red Badge
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 10,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});