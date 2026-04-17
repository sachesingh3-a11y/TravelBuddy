import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/theme';

export default function PasswordStrengthBar({ password }) {
  const getStrength = () => {
    if (!password) return { level: 0, label: '', color: COLORS.textMuted };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { level: 1, label: 'Lemah', color: '#dc3545' };
    if (score <= 4) return { level: 2, label: 'Sedang', color: '#ffc107' };
    return { level: 3, label: 'Kuat', color: '#28a745' };
  };

  const { level, label, color } = getStrength();

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={[styles.bar, { backgroundColor: level >= 1 ? color : COLORS.border }]} />
        <View style={[styles.bar, { backgroundColor: level >= 2 ? color : COLORS.border }]} />
        <View style={[styles.bar, { backgroundColor: level >= 3 ? color : COLORS.border }]} />
      </View>
      {label && <Text style={[styles.label, { color }]}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 16,
  },
  barContainer: {
    flexDirection: 'row',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  bar: {
    flex: 1,
    marginHorizontal: 1,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
});