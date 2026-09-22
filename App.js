import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      
      <Profile
        nama="Fadhil Hazza Iswadinata"
        nim="4112755201250124"
        gender="Laki-laki"
        alamat="Ckm, Majalaya, Karawang"
        umur="19 Tahun"
        jurusan="Teknik Informatika"
        deskripsi="Saya adalah seorang mahasiswa yang sedang menempuh pendidikan di bidang Teknik Informatika. Saya memiliki minat yang besar dalam pengembangan perangkat lunak dan teknologi terbaru."
        skills="JavaScript, React Native, Python, HTML, CSS"
        />
      <StatusBar style="auto" />
    </View>
  );
}
    
function Profile({ nama, nim, gender, alamat, umur, jurusan, deskripsi, skills }) {
  return (
    <View>
      <Image
        source={require('./assets/image.png')}
        style={styles.image}
      />
      <Text style={styles.Text}>Profile</Text>
      <Text style={styles.Text}>{nama}</Text>
      <Text style={styles.Text}>{nim}</Text>
      <Text style={styles.Text}>{gender}</Text>
      <Text style={styles.Text}>{alamat}</Text>
      <Text style={styles.Text}>{umur}</Text>
      <Text style={styles.Text}>{jurusan}</Text>
      <Text style={styles.Text}>{deskripsi}</Text>
      <Text style={styles.Text}>{skills}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#f5f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
  Text: {
    lineHeight: 20,
    fontSize: 15,
    textAlign: 'center',
  },
  
});
