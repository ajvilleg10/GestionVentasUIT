// third-party
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  users: [],
};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const { userID, data } = action.payload;
      const userIndex = state.users.findIndex((u) => u.id === userID);

      state.users[userIndex] = {
        ...state.users[userIndex],
        ...data
      };
    },
    inactiveUser: (state, action) => {
      const { userID } = action.payload;
      const userIndex = state.users.findIndex((u) => u.id === userID);

      state.users[userIndex].Cuenta[0].esta_activo = false;
    },
    activateUser: (state, action) => {
      const { userID } = action.payload;
      const userIndex = state.users.findIndex((u) => u.id === userID);

      state.users[userIndex].Cuenta[0].esta_activo = true;
    },
  }
});

export const { setUsers, addUser, updateUser, inactiveUser, activateUser } = users.actions;
export default users.reducer;
