import { Table } from "flowbite-react";
import TaskItem from "./TaskItem";
import { Task } from "../interfaces/task.interface";
import { FaStream } from "react-icons/fa";

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  showCompleted?: boolean;
}

const TaskList = ({
  tasks,
  setTasks,
  showCompleted = false,
}: TaskListProps) => {
  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <Table className="w-full rounded border-2">
      <Table.Head>
        <Table.HeadCell></Table.HeadCell>
        <Table.HeadCell className="flex items-center flex-row">
          <FaStream className="mr-2" />
          Task Name
        </Table.HeadCell>
        <Table.HeadCell>Due Date</Table.HeadCell>
        <Table.HeadCell>Tag</Table.HeadCell>
        {!showCompleted && <Table.HeadCell>Actions</Table.HeadCell>}
      </Table.Head>
      <Table.Body className="divide-y ">
        {tasks.map((task) =>
          showCompleted ? (
            <tr key={task.id} className="hover:bg-white-100">
              <td className="p-4">
                <input
                  type="checkbox"
                  checked={task.done}
                  className="form-checkbox h-4 w-4"
                  disabled
                />
              </td>
              <td className="p-4">{task.name}</td>
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
            </tr>
          ) : (
            <TaskItem
              key={task.id}
              task={task}
              handleDeleteTask={handleDeleteTask}
            />
          )
        )}
      </Table.Body>
    </Table>
  );
};

export default TaskList;
