import React, { useState } from "react";
import { StyleSheet, TextInput, View, Button, Keyboard } from "react-native";

export function AddTask({ onAddTask }) {
  const [text, setText] = useState("");

  const handleChangeText = (inputText) => {
    setText(inputText);
  };

  //Extra 2 fixed: now checks for an empty text before adding
  const handleAddTask = () => {
    if (text.trim().length > 0) {
      console.log(`Add button has been pressed with task - ${text}`); 
      onAddTask(text);
      setText("");
      Keyboard.dismiss(); 
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add new task"
        value={text}
        onChangeText={handleChangeText}
      />
      <Button title="Add" onPress={handleAddTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    marginRight: 10,
    padding: 10,
    borderBottomColor: "#999",
  },
});