import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f8',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },

  addBtn: {
    backgroundColor: '#4CAF50',
    padding: 12,
    marginLeft: 10,
    borderRadius: 8,
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 3,
  },

  taskText: {
    fontSize: 16,
  },

  doneText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },

  delete: {
    color: 'red',
    fontWeight: 'bold',
  },

  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },

  counter: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});