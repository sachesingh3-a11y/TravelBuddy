import { View, Text, Image, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* SECTION FOTO */} 
      <Image
        source={require('../../assets/images/foto2.png')}
        style={styles.profilePic}
      />
      
      {/* SECTION IDENTITAS */}
      <Text style={styles.name}>Sache Deep Singh</Text>
      <Text style={styles.nim}>NIM: 243303621202</Text>
      <Text style={styles.prodi}>Prodi: Sistem Informasi</Text>

      {/* SECTION BIO */}
      <View style={styles.bioCard}>
        <Text style={styles.bioText}>
          Usaha tidak akan mengkhianati hasil
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profilePic: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#ffff99',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 5,
  },
  nim: {
    fontSize: 14,
    color: '#ffff99',
    marginBottom: 5, // Disesuaikan agar jarak prodi tidak terlalu jauh
    letterSpacing: 2,
  },
  prodi: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
  },
  bioCard: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
  },
  bioText: {
    color: '#ccc',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});