import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RegisterScreen from './src/screens/RegisterScreen';

export default function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  const skills = ['JavaScript', 'React Native', 'C++', 'HTML & CSS'];

  // Jika belum register, tampilkan halaman RegisterScreen terlebih dahulu
  if (!isRegistered) {
    return (
      <RegisterScreen
        onRegisterSuccess={(userData) => {
          setRegisteredUser(userData);
          setIsRegistered(true);
        }}
      />
    );
  }

  // Setelah register berhasil, tampilkan halaman utama (profil)
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Image
            source={require('./assets/image.png')}
            style={styles.image}
            resizeMode="cover"
          />

          <Text style={styles.name}>Fadhil Hazza Iswadinata</Text>
          <Text style={styles.major}>Teknik Informatika</Text>

          {registeredUser && (
            <View style={styles.registeredBadge}>
              <Text style={styles.registeredText}>
                Terdaftar sebagai: {registeredUser.nama} ({registeredUser.noHp})
              </Text>
            </View>
          )}

          <View style={styles.line} />

          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.description}>
            Saya adalah seorang mahasiswa Teknik Informatika yang memiliki minat
            dalam pengembangan perangkat lunak dan teknologi.
          </Text>

          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {skills.map((item) => (
              <View key={item} style={styles.skillBadge}>
                <Text style={styles.skillText}>{item}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setIsRegistered(false)}
          >
            <Text style={styles.backButtonText}>Kembali ke Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#301c1c',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#301c1c',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  major: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 12,
  },
  registeredBadge: {
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  registeredText: {
    fontSize: 12,
    color: '#1e40af',
    fontWeight: '600',
    textAlign: 'center',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 20,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  skillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#301c1c',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
});