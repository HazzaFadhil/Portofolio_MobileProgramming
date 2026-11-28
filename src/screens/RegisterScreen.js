import React, { useState, useRef, useEffect } from 'react';
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
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function RegisterScreen({ onRegisterSuccess }) {
  const [nama, setNama] = useState('');
  const [noHp, setNoHp] = useState('');
  const [password, setPassword] = useState('');

  const [securePassword, setSecurePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animasi loop + interpolate (rotate) saat memproses registrasi
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const loopRef = useRef(null);
  const timeoutRef = useRef(null);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    return () => {
      loopRef.current?.stop();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startSpinner = () => {
    rotateAnim.setValue(0);
    loopRef.current = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );
    loopRef.current.start();
  };

  const stopSpinner = () => {
    loopRef.current?.stop();
  };

  const handleRegister = () => {
    if (isSubmitting) return;
    setErrorMessage('');

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

    Keyboard.dismiss();
    setIsSubmitting(true);
    startSpinner();

    const userData = {
      nama: nama.trim(),
      noHp: noHp.trim(),
      password,
    };

    timeoutRef.current = setTimeout(() => {
      stopSpinner();
      setIsSubmitting(false);

      Alert.alert(
        'Register Berhasil ✅',
        `Nama: ${userData.nama}\nNomor HP: ${userData.noHp}\nPassword: ${userData.password}`,
        [
          {
            text: 'OK',
            onPress: () => {
              setNama('');
              setNoHp('');
              setPassword('');
              if (onRegisterSuccess) {
                onRegisterSuccess(userData);
              }
            },
          },
        ]
      );
    }, 1000);
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

              {errorMessage ? (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>⚠️ {errorMessage}</Text>
                </View>
              ) : null}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nama Lengkap</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan nama lengkap"
                  placeholderTextColor="#9ca3af"
                  value={nama}
                  editable={!isSubmitting}
                  onChangeText={(text) => {
                    setNama(text);
                    if (errorMessage) setErrorMessage('');
                  }}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nomor HP</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Contoh: 081234567890"
                  placeholderTextColor="#9ca3af"
                  value={noHp}
                  editable={!isSubmitting}
                  onChangeText={(text) => {
                    const numericOnly = text.replace(/[^0-9]/g, '');
                    setNoHp(numericOnly);
                    if (errorMessage) setErrorMessage('');
                  }}
                  keyboardType="phone-pad"
                  returnKeyType="next"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordWrapper}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Minimal 6 karakter"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    editable={!isSubmitting}
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
                    disabled={isSubmitting}
                    onPress={() => setSecurePassword((prev) => !prev)}
                  >
                    <Text style={styles.toggleText}>
                      {securePassword ? 'Lihat' : 'Sembunyi'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.submitButton, isSubmitting && styles.disabledButton]}
                onPress={handleRegister}
                disabled={isSubmitting}
                activeOpacity={0.8}
              >
                {isSubmitting ? (
                  <View style={styles.loadingRow}>
                    <Animated.View
                      style={[styles.miniSpinner, { transform: [{ rotate }] }]}
                    />
                    <Text style={styles.submitButtonText}>Memproses...</Text>
                  </View>
                ) : (
                  <Text style={styles.submitButtonText}>Register</Text>
                )}
              </TouchableOpacity>
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
  disabledButton: {
    opacity: 0.8,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  miniSpinner: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.35)',
    borderTopColor: '#ffffff',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});