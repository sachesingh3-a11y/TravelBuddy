import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { globalStyles } from '../styles/globalStyles';

export default function TaskItem({ item, onDelete, onToggle }) {
  return (
    <View style={globalStyles.card}>

      {/* TEXT */}
      <TouchableOpacity onPress={() => onToggle(item.id)}>
        <Text
          style={[
            globalStyles.taskText,
            item.completed && globalStyles.doneText
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>

      {/* DELETE */}
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Text style={globalStyles.delete}>Hapus</Text>
      </TouchableOpacity>

    </View>
  );
}