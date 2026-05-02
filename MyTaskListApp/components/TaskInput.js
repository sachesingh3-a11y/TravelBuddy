import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';

import { globalStyles } from '../styles/globalStyles';

export default function TaskInput({ task, setTask, onAdd }) {
  return (
    <View style={globalStyles.inputContainer}>
      
      <TextInput
        style={globalStyles.input}
        placeholder="Masukkan task..."
        value={task}
        onChangeText={setTask}
      />

      <TouchableOpacity style={globalStyles.addBtn} onPress={onAdd}>
        <Text style={globalStyles.btnText}>Tambah</Text>
      </TouchableOpacity>

    </View>
  );
}