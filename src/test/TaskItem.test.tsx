import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskItem from "../components/TaskItem";
import { Task } from "../interfaces/task.interface";

const mockTask: Task = {
  id: 1,
  name: "Test Task",
  dueDate: "2023-12-31",
  tag: "High",
  done: false,
  weather: "25",
};

const handleDeleteTask = jest.fn();

describe("TaskItem", () => {
  it("renders task details correctly", () => {
    const { getByText } = render(
      <TaskItem task={mockTask} handleDeleteTask={handleDeleteTask} />
    );

    expect(getByText("Test Task")).toBeInTheDocument();
    expect(getByText("2023-12-31")).toBeInTheDocument();
    expect(getByText("High")).toBeInTheDocument();
    expect(getByText("25 °C")).toBeInTheDocument();
  });

  it("toggles task completion status", () => {
    const { getByRole } = render(
      <TaskItem task={mockTask} handleDeleteTask={handleDeleteTask} />
    );

    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("edits task name", () => {
    const { getByText, getByRole } = render(
      <TaskItem task={mockTask} handleDeleteTask={handleDeleteTask} />
    );

    const taskName = getByText("Test Task");
    fireEvent.click(taskName);

    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "Updated Task" } });
    fireEvent.blur(input);

    expect(getByText("Updated Task")).toBeInTheDocument();
  });

  it("deletes task", () => {
    const { getByRole } = render(
      <TaskItem task={mockTask} handleDeleteTask={handleDeleteTask} />
    );

    const deleteButton = getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(handleDeleteTask).toHaveBeenCalledWith(mockTask.id);
  });
});
