import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function HomeScreen() {
  const { userName } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🛰️</Text>
      <Text style={styles.welcome}>Welcome, {userName || 'Agent'}!</Text>
      <Text style={styles.subtitle}>Sistem pengamanan data telah aktif.</Text>
      
      <TouchableOpacity style={styles.logout} onPress={() => router.replace('/')}>
        <Text style={{color: 'white'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEF2FF' },
  emoji: { fontSize: 80, marginBottom: 20 },
  welcome: { fontSize: 28, fontWeight: 'bold', color: '#312E81' },
  subtitle: { fontSize: 16, color: '#6366F1', marginTop: 10 },
  logout: { marginTop: 40, backgroundColor: '#EF4444', padding: 10, borderRadius: 8 }
});