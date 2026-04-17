import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../utils/theme';

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  validState,
  message,
  returnKeyType = 'default',
  onSubmitEditing,
  inputRef,
  secureText = false,
}) {
  const getBorderColor = () => {
    if (validState === 'valid') return '#28a745';
    if (validState === 'error') return '#dc3545';
    return COLORS.border;
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        ref={inputRef}
        style={[styles.input, { borderColor: getBorderColor() }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureText}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {message && (
        <Text style={[styles.message, validState === 'error' && styles.errorMessage]}>
          {message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: COLORS.bgCard,
    color: COLORS.textPrimary,
  },
  message: {
    fontSize: 12,
    marginTop: 4,
    color: COLORS.textMuted,
  },
  errorMessage: {
    color: '#dc3545',
  },
});