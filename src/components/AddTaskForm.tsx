import React, { useState } from "react";
import { Task } from "../interfaces/task.interface";
import axiosClient from "../utils/axiosClient";
import useUser from "../hooks/useUser";
import axios from "axios";

interface AddTaskFormProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onClose: () => void;
}

const AddTaskForm = ({ setTasks, onClose }: AddTaskFormProps) => {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tag, setTag] = useState("");

  const token = localStorage.getItem("access_token") || "";
  const { data: user } = useUser(token);

  const fetchWeather = async (city: string) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&q=${city}`
      );
      return response.data.current.temp_c;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };

  const handleAddTask = async () => {
    if (!taskName) return;

    if (!user) {
      console.error("User is not defined");
      return;
    }

    const cityMatch = taskName.match(/\b[A-Z][a-z]*\b/); // regex to find the first occurrence of a city name
    const city = cityMatch ? cityMatch[0] : null;
    const weather = city && (await fetchWeather(city));

    const newTask = {
      userId: user.id,
      name: taskName,
      dueDate,
      tag,
      done: false,
      weather,
    };
    try {
      const response = await axiosClient.post(
        `${import.meta.env.VITE_API_URL}/tasks`,
        newTask
      );
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setTaskName("");
      setDueDate("");
      setTag("");
      onClose();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div data-testid="add-task-form" className="space-y-4">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Task name"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <select
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Tag</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button
        onClick={handleAddTask}
        className="w-full py-2 bg-green-500 text-white rounded"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTaskForm;
