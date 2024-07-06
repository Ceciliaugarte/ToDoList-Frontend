import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  token: string | null;
  id: number | null;
  username: string | null;
  tasks: any[]; // Definir como array vacío en lugar de null
}

const initialState: UserState = {
  token: null,
  id: null,
  username: null,
  tasks: [], // Usar un array vacío en lugar de null
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
    deleteTask: (state, action: PayloadAction<number | null>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { getLoggedUser, LogOut, deleteTask } = userSlice.actions;
export default userSlice.reducer;
