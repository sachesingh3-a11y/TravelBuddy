import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default function HomeScreen() {

  // STATE INPUT
  const [ket, setKet] = useState('');
  const [nominal, setNominal] = useState('');

  // STATE ARRAY TRANSAKSI
  const [transaksi, setTransaksi] = useState([]);

  // FUNCTION TAMBAH TRANSAKSI
  const tambahTransaksi = (tipe) => {

    // VALIDASI INPUT
    if (ket === '' || nominal === '') {
      alert('Input tidak boleh kosong!');
      return;
    }

    const dataBaru = {
      id: Date.now().toString(),
      ket: ket,
      nominal: parseInt(nominal),
      tipe: tipe,
    };

    // TAMBAH DATA KE ARRAY
    setTransaksi([...transaksi, dataBaru]);

    // RESET INPUT
    setKet('');
    setNominal('');
  };

  // HITUNG TOTAL SALDO
  const totalSaldo = transaksi.reduce((total, item) => {

    if (item.tipe === 'masuk') {
      return total + item.nominal;
    } else {
      return total - item.nominal;
    }

  }, 0);

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <Text style={styles.title}>
        💳 DompetKu
      </Text>

      <Text style={styles.subtitle}>
        Saldo Saat Ini
      </Text>

      <Text style={styles.balance}>
        Rp {totalSaldo.toLocaleString('id-ID')}
      </Text>

      {/* INPUT DESKRIPSI */}
      <TextInput
        placeholder="Masukkan Deskripsi"
        value={ket}
        onChangeText={setKet}
        style={styles.input}
      />

      {/* INPUT NOMINAL */}
      <TextInput
        placeholder="Masukkan Nominal"
        value={nominal}
        onChangeText={setNominal}
        keyboardType="numeric"
        style={styles.input}
      />

      {/* BUTTON PEMASUKAN */}
      <TouchableOpacity
        style={styles.btnIncome}
        onPress={() => tambahTransaksi('masuk')}
      >
        <Text style={styles.btnText}>
          + Tambah Pemasukan
        </Text>
      </TouchableOpacity>

      {/* BUTTON PENGELUARAN */}
      <TouchableOpacity
        style={styles.btnExpense}
        onPress={() => tambahTransaksi('keluar')}
      >
        <Text style={styles.btnText}>
          - Tambah Pengeluaran
        </Text>
      </TouchableOpacity>

      {/* TITLE HISTORY */}
      <Text style={styles.historyTitle}>
        Riwayat Transaksi
      </Text>

      {/* LIST TRANSAKSI */}
      <FlatList
        data={transaksi}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (

          <View style={styles.itemContainer}>

            <View>
              <Text style={styles.itemText}>
                {item.ket}
              </Text>

              <Text style={styles.typeText}>
                {item.tipe === 'masuk'
                  ? 'Pemasukan'
                  : 'Pengeluaran'}
              </Text>
            </View>

            <Text
              style={[
                styles.amountText,
                {
                  color:
                    item.tipe === 'masuk'
                      ? 'green'
                      : 'red',
                }
              ]}
            >
              {item.tipe === 'masuk' ? '+' : '-'}
              Rp {item.nominal.toLocaleString('id-ID')}
            </Text>

          </View>

        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 50,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#222',
  },

  subtitle: {
    fontSize: 18,
    color: '#666',
  },

  balance: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#000',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
  },

  btnIncome: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  btnExpense: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },

  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  historyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
  },

  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },

  typeText: {
    marginTop: 4,
    color: '#777',
  },

  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

});