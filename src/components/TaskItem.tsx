import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";
import cancelIcon from "../assets/icons/cancel/X.png";

import { EditTask } from "../pages/Home";
import { Task } from "./TasksList";

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (editTask: EditTask) => void;
}
export function TaskItem({
  index,
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const textInputRef = useRef<TextInput>(null);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);

  useEffect(() => {
    if (isEditingTask) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [isEditingTask]);

  function handleStartEditing() {
    setIsEditingTask(!isEditingTask);
  }

  function handleCancelEditing() {
    setIsEditingTask(!isEditingTask);
    setTaskTitle(task.title);
  }

  function handleSubmitEditing() {
    setIsEditingTask(!isEditingTask);

    editTask({
      id: task.id,
      newTaskTitle: taskTitle,
    });
  }

  return (
    <>
      <View style={styles.viewInput}>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            //TODO - use style prop
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            editable={isEditingTask}
            value={taskTitle}
            onChangeText={(text) => setTaskTitle(text)}
            onSubmitEditing={handleSubmitEditing}
            returnKeyType="send"
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.viewButtons}>
        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ padding: 0 }}
          onPress={!isEditingTask ? handleStartEditing : handleCancelEditing}
        >
          <Image source={!isEditingTask ? editIcon : cancelIcon} />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingRight: 24, opacity: isEditingTask ? 0.2 : 1 }}
          onPress={() => removeTask(task.id)}
          disabled={isEditingTask}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  viewInput: {
    flexDirection: "row",
    width: "80%",
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  viewButtons: {
    flexDirection: "row",
  },

  separator: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
    marginRight: 5,
    marginLeft: 5,
  },
});
