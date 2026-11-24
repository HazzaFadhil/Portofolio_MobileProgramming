import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function RegisterScreen() {
  // State lokal untuk 3 input utama
  const [nama, setNama] = useState('');
  const [noHp, setNoHp] = useState('');
  const [password, setPassword] = useState('');

  // State pendukung Form UX
  const [securePassword, setSecurePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [lastRegistered, setLastRegistered] = useState(null);

  const handleRegister = () => {
    // Bersihkan pesan error sebelumnya
    setErrorMessage('');

    // Validasi sederhana (Form UX)
    if (!nama.trim() || !noHp.trim() || !password.trim()) {
      setErrorMessage('Semua kolom (Nama, Nomor HP, dan Password) wajib diisi.');
      return;
    }

    if (noHp.trim().length < 8) {
      setErrorMessage('Nomor HP minimal 8 digit.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password minimal terdiri dari 6 karakter.');
      return;
    }

    // Menutup keyboard saat submit
    Keyboard.dismiss();

    const userData = {
      nama: nama.trim(),
      noHp: noHp.trim(),
      password: password,
    };

    setLastRegistered(userData);

    // Menampilkan notifikasi Alert berisi status berhasil & data input
    Alert.alert(
      'Register Berhasil ✅',
      `Nama: ${userData.nama}\nNomor HP: ${userData.noHp}\nPassword: ${userData.password}`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset form setelah user menekan OK
            setNama('');
            setNoHp('');
            setPassword('');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.flexOne}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.card}>
              <Text style={styles.title}>Buat Akun Baru</Text>
              <Text style={styles.subtitle}>
                Lengkapi data di bawah ini untuk mendaftar.
              </Text>

              {/* Feedback Error Inline (Form UX) */}
              {errorMessage ? (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>⚠️ {errorMessage}</Text>
                </View>
              ) : null}

              {/* Input 1: Nama */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nama Lengkap</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan nama lengkap"
                  placeholderTextColor="#9ca3af"
                  value={nama}
                  onChangeText={(text) => {
                    setNama(text);
                    if (errorMessage) setErrorMessage('');
                  }}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              </View>

              {/* Input 2: Nomor HP */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nomor HP</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Contoh: 081234567890"
                  placeholderTextColor="#9ca3af"
                  value={noHp}
                  onChangeText={(text) => {
                    // Hanya izinkan angka
                    const numericOnly = text.replace(/[^0-9]/g, '');
                    setNoHp(numericOnly);
                    if (errorMessage) setErrorMessage('');
                  }}
                  keyboardType="phone-pad"
                  returnKeyType="next"
                />
              </View>

              {/* Input 3: Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordWrapper}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Minimal 6 karakter"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errorMessage) setErrorMessage('');
                    }}
                    secureTextEntry={securePassword}
                    autoCapitalize="none"
                    returnKeyType="done"
                    onSubmitEditing={handleRegister}
                  />
                  <TouchableOpacity
                    style={styles.toggleBtn}
                    onPress={() => setSecurePassword((prev) => !prev)}
                  >
                    <Text style={styles.toggleText}>
                      {securePassword ? 'Lihat' : 'Sembunyi'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Tombol Register */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleRegister}
                activeOpacity={0.8}
              >
                <Text style={styles.submitButtonText}>Register</Text>
              </TouchableOpacity>

              {/* Ringkasan data terakhir yang berhasil didaftarkan di layar */}
              {lastRegistered && (
                <View style={styles.resultBox}>
                  <Text style={styles.resultTitle}>Data Terdaftar Terakhir:</Text>
                  <Text style={styles.resultItem}>Nama: {lastRegistered.nama}</Text>
                  <Text style={styles.resultItem}>No. HP: {lastRegistered.noHp}</Text>
                  <Text style={styles.resultItem}>Password: {lastRegistered.password}</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  flexOne: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },
  errorBox: {
    backgroundColor: '#fef2f2',
    borderColor: '#fca5a5',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 13,
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#f9fafb',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#f9fafb',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  toggleText: {
    color: '#2563eb',
    fontWeight: '600',
    fontSize: 13,
  },
  submitButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultBox: {
    marginTop: 20,
    padding: 14,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  resultTitle: {
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 6,
    fontSize: 14,
  },
  resultItem: {
    color: '#1f2937',
    fontSize: 13,
    marginBottom: 2,
  },
});