import React, { useState } from 'react';
import {
  Text,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';

import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import { globalStyles } from './styles/globalStyles';

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  // ADD TASK
  const handleAddTask = () => {
    if (task.trim() === '') {
      alert('Task tidak boleh kosong!');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: task,
      completed: false,
    };

    setTaskList([...taskList, newTask]);
    setTask('');
  };

  // DELETE
  const handleDelete = (id) => {
    setTaskList(taskList.filter(item => item.id !== id));
  };

  // TOGGLE DONE
  const toggleDone = (id) => {
    const updated = taskList.map(item =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    );
    setTaskList(updated);
  };

  // COUNTER
  const completedCount = taskList.filter(t => t.completed).length;

  return (
    <KeyboardAvoidingView style={globalStyles.container}>

      <Text style={globalStyles.title}>MyTaskList</Text>

      <TaskInput
        task={task}
        setTask={setTask}
        onAdd={handleAddTask}
      />

      <Text style={globalStyles.counter}>
        {completedCount} dari {taskList.length} selesai
      </Text>

      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={globalStyles.empty}>
            Belum ada task 🚀
          </Text>
        }
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            onDelete={handleDelete}
            onToggle={toggleDone}
          />
        )}
      />

    </KeyboardAvoidingView>
  );
}