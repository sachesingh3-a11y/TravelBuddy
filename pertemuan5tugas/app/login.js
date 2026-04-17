import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back! 🛰️</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          value={email} 
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          value={password} 
          onChangeText={setPassword}
          secureTextEntry 
        />
        <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.linkText}>Belum punya akun? <Text style={{fontWeight: 'bold'}}>Daftar Disini</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#F3F4F6', padding: 20 },
  card: { backgroundColor: 'white', padding: 25, borderRadius: 20, elevation: 5 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#DDD', padding: 12, borderRadius: 10, marginBottom: 15 },
  button: { backgroundColor: '#4F46E5', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  linkText: { marginTop: 15, textAlign: 'center', color: '#666' }
});