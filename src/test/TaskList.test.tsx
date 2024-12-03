import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskList from "../components/TaskList";
import { Task } from "../interfaces/task.interface";

const mockTasks: Task[] = [
  {
    id: 1,
    name: "Task 1",
    dueDate: "2023-12-31",
    tag: "High",
    done: false,
    weather: "25",
  },
  {
    id: 2,
    name: "Task 2",
    dueDate: "2023-11-30",
    tag: "Medium",
    done: true,
    weather: "20",
  },
];

const setTasks = jest.fn();

describe("TaskList", () => {
  it("renders task list correctly", () => {
    const { getByText } = render(
      <TaskList tasks={mockTasks} setTasks={setTasks} />
    );

    expect(getByText("Task 1")).toBeInTheDocument();
    expect(getByText("Task 2")).toBeInTheDocument();
  });

  it("renders completed tasks correctly", () => {
    const { getByText } = render(
      <TaskList tasks={mockTasks} setTasks={setTasks} showCompleted={true} />
    );

    expect(getByText("Task 2")).toBeInTheDocument();
    expect(getByText("Task 1")).not.toBeInTheDocument();
  });
});
