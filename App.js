// importing required modules
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Task } from "./components/Task";
import { AddTask } from "./components/AddTask";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";


export default function App() {
  const [tasks, setTasks] = useState([]);

  // load tasks from asyncstorage when component 
  useEffect(() => {
    const loadTasks = async () => {
      try {
        // retrieving tasks from asyncstorage
        const storedTasks = await AsyncStorage.getItem("task-list");

        // if tasks exist, set state
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadTasks();
  }, []);

  const handleAddTask = async (text) => {
    const newTask = { text, isCompleted: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    await AsyncStorage.setItem("task-list", JSON.stringify(updatedTasks));
  };

  const toggleTaskCompletion = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;

    if (updatedTasks[index].isCompleted) {
      const completedTask = updatedTasks.splice(index, 1)[0];
      updatedTasks.push(completedTask);
    }

    setTasks(updatedTasks);
    await AsyncStorage.setItem("task-list", JSON.stringify(updatedTasks));
  };

  const deleteTask = async (index) => {
    const updatedTasks = [...tasks];
    // removing task at given index
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    await AsyncStorage.setItem("task-list", JSON.stringify(updatedTasks));
  };

  return (
    // wrapping main content in safeareaview
    <SafeAreaView style={styles.container}>
      <View style={styles.tasksWrapper}>
        {/* section title */}
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        {/* list of tasks */}
        <FlatList
          data={tasks}
          renderItem={({ item, index }) => (
            // task component
            <Task
              text={item.text}
              isCompleted={item.isCompleted}
              onPress={() => toggleTaskCompletion(index)}
              onDelete={() => deleteTask(index)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {/* adding new task component */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <AddTask onAddTask={handleAddTask} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  tasksWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 35,
    marginBottom: 20,
    fontWeight: "bold",
  },
});




/*
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Task from './components/Task';


export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.TaskWrapper}>
        <Text style={styles.SectionTitle}>Today's Tasks!</Text>
        <View style={styles.Task}>
          <Task text="Task 1"/>
          <Task text="Task 2"/>
          <Task text="Task 3"/>
          <Task text="Task 4"/>
          <Task text="Task 5"/>
        </View>
        
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  TaskWrapper: {
    textAllign: 'left',
    paddingTop: 40,
    paddingHorizontal: 20,
  },

  addTaskContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
  },

  SectionTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    paddingBottom: 32,
  },
});

*/