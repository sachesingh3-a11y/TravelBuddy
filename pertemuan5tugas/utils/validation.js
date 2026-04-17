/**
 * Validation utilities for email and password
 */

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return { valid: false, message: 'Email tidak boleh kosong' };
  }
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Format email tidak valid' };
  }
  return { valid: true, message: '' };
}

export function validatePassword(password) {
  if (!password) {
    return { valid: false, message: 'Password tidak boleh kosong' };
  }
  if (password.length < 6) {
    return { valid: false, message: 'Password minimal 6 karakter' };
  }
  return { valid: true, message: '' };
}

export function validateName(name) {
  if (!name) {
    return { valid: false, message: 'Nama tidak boleh kosong' };
  }
  if (name.length < 2) {
    return { valid: false, message: 'Nama minimal 2 karakter' };
  }
  return { valid: true, message: '' };
}

export function validatePhone(phone) {
  const sanitized = sanitizePhone(phone);
  if (!sanitized) {
    return { valid: false, message: 'Nomor telepon tidak boleh kosong' };
  }
  if (sanitized.length < 10) {
    return { valid: false, message: 'Nomor telepon minimal 10 digit' };
  }
  return { valid: true, message: '' };
}

export function validateConfirmPassword(password, confirm) {
  if (!confirm) {
    return { valid: false, message: 'Konfirmasi password tidak boleh kosong' };
  }
  if (password !== confirm) {
    return { valid: false, message: 'Password tidak cocok' };
  }
  return { valid: true, message: '' };
}

export function sanitizePhone(phone) {
  return phone.replace(/\D/g, '');
}

export function getInitials(name) {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
}