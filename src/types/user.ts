import { Task } from "./task";

export interface User {
  id: number | null;
  tasks: Task[];
  token: string | null;
  username: string | null;
}
