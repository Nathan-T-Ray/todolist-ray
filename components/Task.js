import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

//Note: Joseph (-ph Joseph) kindly gave me some pointers on this first code block
export function Task({ text, onPress, onDelete, isCompleted }) {
  return (
    <View style={styles.item}>
      
      <TouchableOpacity
        onPress={onPress}
        style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
      >

        <View style={styles.square}>
          {isCompleted && <Text style={styles.checkmark}>&#10003;</Text>}
        </View>
        <Text
          style={[styles.itemText, isCompleted ? styles.completedText : null]}
        >
          {text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  square: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 16,
    backgroundColor: "rgba(141, 223, 218, 0.4)",
  },
  itemText: {
    color: "black",
    fontSize: 17,
  },
  checkmark: {
    color: "#000",
    fontSize: 15,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteButton: {
    //color: "red",
    marginLeft: "auto",
    padding: 8,
  },
  deleteButtonText: {
    color: "red",
    fontWeight: "bold",
  },
});