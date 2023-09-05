import { useEffect, useState, useRef } from 'react';
import { Button, FlatList, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { authentication, db } from './src/services/firebaseConnection';
//import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, set, onValue, remove, update } from 'firebase/database'
import uuid from 'react-native-uuid';
import Feather from 'react-native-vector-icons/Feather';

import Login from './src/components/Login';
import TaskList from './src/components/TaskList';

export default function Apps() {

  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const inputRef = useRef(null);
  const [key, setKey] = useState('');

  //Busca tarefas
  useEffect(() => {
    if (!user) {
      return; // Retorna se o usuário for nulo para evitar a execução do código abaixo
    }
  
    const dbObject = ref(db, 'tarefas/' + user);
  
    onValue(dbObject, (snapshot) => {
      const newTasks = [];
      snapshot?.forEach((childItem) => {
        let data = {
          key: childItem.key,
          nome: childItem.val().nome
        };
        newTasks.push(data);
      });
      setTasks(newTasks);
    });
  }, [user]);


  //Adiciona uma tarefa
  function handleAdd() {
    if (newTask === '')
      return;
  
    let chave = uuid.v4();


    if(key !== '') {
      update(ref(db, 'tarefas/' + user + '/' + key), {
        nome: newTask
      })
      .then( () => {
        const taskIndex = tasks.findIndex( item => item.key === key )
        let taskClone = tasks;
        taskClone[taskindex].nome = newTask

        setTasks([...taskClone])

      })
      Keyboard.dismiss();
      setNewTask('');
      setKey('');
      return;
    }
  
    set(ref(db, 'tarefas/' + user + '/' + chave), {
      nome: newTask
    }).then(() => {
      setTasks(oldTasks => [...oldTasks, {
        key: chave,
        nome: newTask
      }])
  
    })
    Keyboard.dismiss();
    setNewTask('');
  }




 //Deleta uma tarefa
  function handleDelete(key) {
    //const dbObject = ref(db, 'tarefas/' + user + '/' + key);
    remove(ref(db, 'tarefas/' + user + '/' + key))
    .then( () => {
      const findTasks = task.filter( item => item.key !== key)
      setTasks(findTasks);
    })
  }

  function handleEdit(data) {
    setKey(data.key);
    setNewTask(data.nome);
    inputRef.current.focus();
  }

  function cancelEdit() {
    setKey('');
    setNewTask('');
    Keyboard.dismiss();
  }


  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />
  }


  return (
    <SafeAreaView style={styles.container}>

    { key.length > 0 && (
        <View style={{ flexDirection: 'row', marginBottom: 8}}>
        <TouchableOpacity onPress={cancelEdit}>
          <Feather name='x-circle' color='#FF0000' size={20} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 5, color:'#FF0000' }}>
          Você está editando uma tarefa
        </Text>
      </View>
    )}
      


      <View style={styles.ContainerTask}>
        <TextInput
          style={styles.input}
          placeholder='Proxima tarefa'
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          ref={inputRef}
        />

        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit} />
        )}
      />



    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6fc',
    paddingTop: 40,
    paddingHorizontal: 10
  },
  input: {
    flex: 1,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    borderColor: '#141414',
    backgroundColor: '#FFF',
    height: 45
  },

  ContainerTask: {
    flexDirection: 'row'
  },

  buttonAdd: {
    backgroundColor: '#141414',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4
  },

  buttonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold'
  }
});