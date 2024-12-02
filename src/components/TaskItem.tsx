import React, { useState } from "react";
import { Task } from "../interfaces/task.interface";
import axiosClient from "../utils/axiosClient";
import { SlPencil } from "react-icons/sl";
import { HiOutlineTrash } from "react-icons/hi2";

interface TaskItemProps {
  task: Task;
  handleDeleteTask: (taskId: number) => void;
}

const TaskItem = ({ task, handleDeleteTask }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [isComplete, setIsComplete] = useState(task.done);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBlur = async () => {
    if (editedName.trim() === "") {
      setEditedName(task.name);
      setIsEditing(false);
      return;
    }

    try {
      await axiosClient.patch(`/tasks/${task.id}`, { name: editedName });
      task.name = editedName;
    } catch (error) {
      console.error("Failed to update task:", error);
      setEditedName(task.name);
    } finally {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      setEditedName(task.name);
      setIsEditing(false);
    }
  };

  const toggleComplete = () => {
    setIsComplete(!isComplete);

    axiosClient
      .patch(`/tasks/${task.id}`, { done: !isComplete })
      .catch((err) => {
        console.error("Failed to update task status:", err);
        setIsComplete(isComplete);
      });
  };

  return (
    <tr className="hover:bg-gray-100">
      <td className="p-4">
        <input
          type="checkbox"
          checked={isComplete}
          onChange={toggleComplete}
          className="form-checkbox h-4 w-4 text-blue-600"
        />
      </td>
      <td className="p-4">
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="border rounded px-2 py-1 w-full focus:ring focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span
            onClick={handleEditClick}
            className={`cursor-pointer ${
              isComplete ? "line-through text-gray-500" : ""
            }`}
          >
            {task.name}
          </span>
        )}
      </td>
      <td className="p-4">{task.dueDate || "-"}</td>
      <td className="p-4">
        <span
          className={`px-2 py-1 rounded text-sm ${
            task.tag === "High"
              ? "bg-red-100 text-red-700"
              : task.tag === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : task.tag === "Low"
              ? "bg-gray-100 text-gray-700"
              : "bg-gray-200"
          }`}
        >
          {task.tag || "None"}
        </span>
      </td>
      <td className="p-4">{task.weather ? `${task.weather} °C` : ""}</td>
      <td className="p-4 flex items-center gap-2">
        <SlPencil
          className="text-gray-900 hover:text-blue-700 cursor-pointer"
          onClick={handleEditClick}
        />
        <HiOutlineTrash
          className="text-gray-900 hover:text-red-700 cursor-pointer"
          onClick={() => handleDeleteTask(task.id)}
        />
      </td>
    </tr>
  );
};

export default TaskItem;
