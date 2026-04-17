import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, Alert 
} from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  
  // State untuk data form
  const [form, setForm] = useState({ name: '', email: '', phone: '', pass: '', confirm: '' });
  // State untuk menyimpan pesan error spesifik tiap field
  const [errors, setErrors] = useState({});

  // Fungsi Validasi Real-time & Submit
  const validate = () => {
    let sErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (!form.name) sErrors.name = "Nama lengkap wajib diisi";
    
    if (!form.email) {
      sErrors.email = "Email tidak boleh kosong";
    } else if (!emailRegex.test(form.email)) {
      sErrors.email = "Format email tidak valid (contoh: user@mail.com)";
    }

    if (!form.phone) {
      sErrors.phone = "Nomor telepon wajib diisi";
    } else if (!phoneRegex.test(form.phone) || form.phone.length < 10) {
      sErrors.phone = "Minimal 10 digit angka";
    }

    if (form.pass.length < 6) sErrors.pass = "Password minimal 6 karakter";
    
    if (form.pass !== form.confirm) sErrors.confirm = "Konfirmasi password tidak cocok";

    setErrors(sErrors);

    // Jika tidak ada error (object sErrors kosong)
    if (Object.keys(sErrors).length === 0) {
      Alert.alert("Success 🛡️", "Akun berhasil dibuat!", [
        { text: "Lanjut", onPress: () => router.push({ pathname: '/home', params: { userName: form.name } }) }
      ]);
    }
  };

  // Helper untuk menentukan warna border
  const getBorderStyle = (field) => {
    if (errors[field]) return styles.inputError;
    if (form[field] && !errors[field]) return styles.inputSuccess;
    return styles.inputDefault;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Join the Network 🛡️</Text>
          
          {/* Input Nama */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <TextInput 
              style={[styles.input, getBorderStyle('name')]} 
              placeholder="Masukkan nama" 
              onChangeText={(t) => setForm({...form, name: t})} 
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          {/* Input Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={[styles.input, getBorderStyle('email')]} 
              placeholder="user@example.com" 
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(t) => setForm({...form, email: t})} 
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Input Phone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nomor Telepon</Text>
            <TextInput 
              style={[styles.input, getBorderStyle('phone')]} 
              placeholder="08123xxx" 
              keyboardType="phone-pad"
              onChangeText={(t) => setForm({...form, phone: t})} 
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </View>

          {/* Input Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput 
              style={[styles.input, getBorderStyle('pass')]} 
              placeholder="******" 
              secureTextEntry 
              onChangeText={(t) => setForm({...form, pass: t})} 
            />
            {errors.pass && <Text style={styles.errorText}>{errors.pass}</Text>}
          </View>

          {/* Input Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Konfirmasi Password</Text>
            <TextInput 
              style={[styles.input, getBorderStyle('confirm')]} 
              placeholder="******" 
              secureTextEntry 
              onChangeText={(t) => setForm({...form, confirm: t})} 
            />
            {errors.confirm && <Text style={styles.errorText}>{errors.confirm}</Text>}
          </View>

          <TouchableOpacity style={styles.button} onPress={validate} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Buat Akun Sekarang</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  scrollContainer: { padding: 25, flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#1E1B4B' },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 5 },
  input: { 
    backgroundColor: '#FFF', 
    padding: 15, 
    borderRadius: 12, 
    borderWidth: 1.5,
    fontSize: 16
  },
  inputDefault: { borderColor: '#E5E7EB' },
  inputError: { borderColor: '#EF4444' },
  inputSuccess: { borderColor: '#10B981' },
  errorText: { color: '#EF4444', fontSize: 12, marginTop: 4, marginLeft: 2 },
  button: { 
    backgroundColor: '#4F46E5', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 20,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});