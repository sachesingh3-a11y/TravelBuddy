import os

file_content = """import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const validateEmail = (email) => {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!email) return { valid: false, message: 'Email tidak boleh kosong' };
  if (!regex.test(email)) return { valid: false, message: 'Format email tidak valid' };
  return { valid: true, message: '' };
};

const validatePassword = (password) => {
  if (!password) return { valid: false, message: 'Password tidak boleh kosong' };
  if (password.length < 6) return { valid: false, message: 'Password minimal 6 karakter' };
  return { valid: true, message: '' };
};

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    const emailResult = validateEmail(email);
    const passResult = validatePassword(password);

    if (!emailResult.valid) {
      Alert.alert('Error', emailResult.message);
      return;
    }
    if (!passResult.valid) {
      Alert.alert('Error', passResult.message);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const name = email.split('@')[0];
      router.push({ pathname: '/home', params: { name, email } });
    }, 800);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back! 🛰️</Text>
        <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={setEmail} keyboardType='email-address' editable={!isLoading} />
        <TextInput style={styles.input} placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry editable={!isLoading} />
        <TouchableOpacity style={[styles.button, isLoading && styles.buttonDisabled]} onPress={handleLogin} disabled={isLoading}>
          <Text style={styles.buttonText}>{isLoading ? 'Memverifikasi...' : 'Masuk'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/register')} disabled={isLoading}>
          <Text style={styles.linkText}>Belum punya akun? Daftar Disini</Text>
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
  buttonDisabled: { backgroundColor: '#D1D5DB' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  linkText: { marginTop: 15, textAlign: 'center', color: '#4F46E5', fontWeight: '600' },
});"""

filepath = r'c:\projek 2026\pertemuan5tugas\app\index.js'
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(file_content)

print("File created successfully!")
