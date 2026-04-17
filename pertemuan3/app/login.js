import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import InputField from '../components/InputField';
import { validateEmail, validatePassword } from '../utils/validation';
import { COLORS, RADIUS } from '../utils/theme';

/**
 * Screen 1 — Login
 * Features:
 *  - Email & Password input
 *  - Real-time validation
 *  - KeyboardAvoidingView agar tombol tidak tertutup keyboard
 *  - Navigasi ke Register
 */
export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [emailState, setEmailState]       = useState(null);
  const [passwordState, setPasswordState] = useState(null);
  const [emailMsg, setEmailMsg]           = useState('');
  const [passwordMsg, setPasswordMsg]     = useState('');
  const [isLoading, setIsLoading]         = useState(false);

  const passwordRef = useRef(null);

  // --- Handlers ---
  const handleEmailChange = (text) => {
    setEmail(text);
    if (text.length > 0) {
      const result = validateEmail(text);
      setEmailState(result.valid ? 'valid' : 'error');
      setEmailMsg(result.message);
    } else {
      setEmailState(null);
      setEmailMsg('');
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text.length > 0) {
      const result = validatePassword(text);
      setPasswordState(result.valid ? 'valid' : 'error');
      setPasswordMsg(result.message);
    } else {
      setPasswordState(null);
      setPasswordMsg('');
    }
  };

  const handleLogin = () => {
    // Validasi penuh saat submit
    const emailResult    = validateEmail(email);
    const passwordResult = validatePassword(password);

    setEmailState(emailResult.valid ? 'valid' : 'error');
    setEmailMsg(emailResult.message);
    setPasswordState(passwordResult.valid ? 'valid' : 'error');
    setPasswordMsg(passwordResult.message);

    if (!emailResult.valid || !passwordResult.valid) return;

    // Simulasi loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const name = email.split('@')[0];
      router.push({ pathname: '/home', params: { name, email } });
    }, 800);
  };

  const isFormReady =
    emailState === 'valid' && passwordState === 'valid';

  return (
    <SafeAreaView style={styles.safe}>
      {/* KeyboardAvoidingView — kunci agar tombol tidak tertutup keyboard */}
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header / Brand */}
          <View style={styles.header}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>SN</Text>
            </View>
            <Text style={styles.brand}>SecureNet</Text>
            <Text style={styles.brandSub}>Social Platform</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.title}>Selamat Datang</Text>
            <Text style={styles.subtitle}>Masuk ke akun kamu</Text>

            <InputField
              label="Email"
              value={email}
              onChangeText={handleEmailChange}
              placeholder="nama@email.com"
              keyboardType="email-address"
              validState={emailState}
              message={emailMsg}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />

            <InputField
              label="Password"
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="Masukkan password kamu"
              secureText={true}
              validState={passwordState}
              message={passwordMsg}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              inputRef={passwordRef}
            />

            {/* Tombol Login */}
            <TouchableOpacity
              style={[
                styles.btnPrimary,
                (!isFormReady || isLoading) && styles.btnDisabled,
              ]}
              onPress={handleLogin}
              activeOpacity={0.85}
            >
              <Text style={styles.btnText}>
                {isLoading ? 'Memverifikasi...' : 'Masuk'}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>atau</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Link ke Register */}
            <View style={styles.linkRow}>
              <Text style={styles.linkText}>Belum punya akun? </Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.link}>Daftar Disini</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>
            Data kamu dienkripsi & aman bersama kami 🔒
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  kav: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textOnPrimary,
  },
  brand: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  brandSub: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.xl,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
  btnPrimary: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginTop: 8,
  },
  btnDisabled: {
    backgroundColor: COLORS.bgSurface,
  },
  btnText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textOnPrimary,
    letterSpacing: 0.3,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    fontSize: 12,
    color: COLORS.textMuted,
    paddingHorizontal: 12,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  link: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 24,
  },
});
