import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  SafeAreaView,
  StatusBar
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const handleAddTask = () => {
    if (task.trim().length === 0) {
      Alert.alert('Oops!', 'Tugas tidak boleh kosong, Bro.');
      return;
    }
    const newTask = {
      id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      text: task,
      completed: false,
    };
    setTaskList([...taskList, newTask]);
    setTask('');
    Keyboard.dismiss();
  };

  const deleteTask = (id) => {
    setTaskList(taskList.filter((item) => item.id !== id));
  };

  const toggleComplete = (id) => {
    setTaskList(
      taskList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = taskList.filter((t) => t.completed).length;

  const renderTaskItem = ({ item }) => (
    <View style={styles.itemCard}>
      <TouchableOpacity 
        style={styles.itemTextContainer} 
        onPress={() => toggleComplete(item.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.statusDot, item.completed && styles.statusDotDone]} />
        <Text style={[styles.itemText, item.completed && styles.itemTextDone]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => deleteTask(item.id)} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <Text style={styles.deleteBtn}>Hapus</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e293b" />
      <View style={styles.header}>
        <Text style={styles.title}>Sache&apos;s Task Manager</Text>
        <Text style={styles.subtitle}>
          {completedCount} selesai dari {taskList.length} total
        </Text>
      </View>

      <FlatList
        data={taskList}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        style={{ flex: 1 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada tugas hari ini. Santai dulu!</Text>
          </View>
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={styles.inputWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Tulis tugas baru...'}
          placeholderTextColor={'#94a3b8'}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask} activeOpacity={0.8}>
          <View style={styles.addBtn}>
            <Text style={styles.addBtnText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    paddingTop: Platform.OS === 'android' ? 60 : 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#1e293b',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 5,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  itemCard: {
    backgroundColor: '#1e293b',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#38bdf8',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  itemTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ef4444',
    marginRight: 10,
  },
  statusDotDone: {
    backgroundColor: '#22c55e',
  },
  itemText: {
    color: '#f8fafc',
    fontSize: 16,
  },
  itemTextDone: {
    textDecorationLine: 'line-through',
    color: '#64748b',
  },
  deleteBtn: {
    color: '#f87171',
    fontWeight: '600',
    padding: 5,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 16,
    textAlign: 'center',
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#1e293b',
    borderRadius: 30,
    borderColor: '#334155',
    borderWidth: 1,
    width: '80%',
    color: '#f8fafc',
  },
  addBtn: {
    width: 55,
    height: 55,
    backgroundColor: '#38bdf8',
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addBtnText: {
    color: '#0f172a',
    fontSize: 30,
    fontWeight: 'bold',
  },
});