export interface Task {
  id: number;
  name: string;
  dueDate?: string;
  tag?: string;
  done: boolean;
  weather?: string;
}
