import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types/task";

export interface UserState {
  token: string | null;
  id: number | null;
  username: string | null;
  tasks: any[];
}

const initialState: UserState = {
  token: null,
  id: null,
  username: null,
  tasks: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getLoggedUser: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    LogOut: () => {
      return initialState;
    },
    createUserTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateUserTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
    },
    deleteTask: (state, action: PayloadAction<number | null>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const {
  getLoggedUser,
  LogOut,
  createUserTask,
  deleteTask,
  updateUserTask,
} = userSlice.actions;
export default userSlice.reducer;
