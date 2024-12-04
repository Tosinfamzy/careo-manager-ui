import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm";
import { Task } from "../interfaces/task.interface";
import axiosClient from "../utils/axiosClient";
import useUser from "../hooks/useUser";
import { Modal, Button } from "flowbite-react";
import { FaSistrix } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("access_token") || "";
  const { data } = useUser(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.log("No token found, redirecting to login page");
      navigate("/login");
      return;
    }

    const fetchTasks = async () => {
      try {
        if (data && data.id) {
          const response = await axiosClient.get(
            `${import.meta.env.VITE_API_URL}/users/${data.id}`
          );
          setTasks(response.data.tasks);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (data) {
      fetchTasks();
    }
  }, [data, token, navigate]);

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const tasksToDo = filteredTasks.filter((task) => !task.done);
  const tasksDone = filteredTasks.filter((task) => task.done);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div
      data-testid="task-page"
      className="min-h-screen bg-gray-50 w-10/12 justify-center mx-auto"
    >
      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">My Tasks for the Next Month</h1>
          <div className="mb-6 flex">
            <div className="relative w-full hidden sm:block">
              <FaSistrix className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 mr-2"
                placeholder="Search tasks..."
              />
            </div>
            <Button
              color="light"
              onClick={handleLogout}
              className="hidden sm:block"
            >
              Logout
            </Button>
          </div>
        </div>
        <Button color="success" onClick={toggleModal}>
          + Add Task
        </Button>
        <Modal show={isModalOpen} onClose={toggleModal}>
          <Modal.Header>Add a New Task</Modal.Header>
          <Modal.Body>
            <AddTaskForm setTasks={setTasks} onClose={toggleModal} />
          </Modal.Body>
        </Modal>
        <h2 className="text-lg font-semibold mt-8 mb-4">Tasks to do</h2>
        <TaskList tasks={tasksToDo} setTasks={setTasks} />
        <h2 className="text-lg font-semibold mt-8 mb-4">Tasks done</h2>
        <TaskList tasks={tasksDone} setTasks={setTasks} showCompleted={true} />
      </main>
    </div>
  );
};

export default TaskPage;
