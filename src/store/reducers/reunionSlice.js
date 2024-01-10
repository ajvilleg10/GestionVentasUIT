const { createSlice } = require("@reduxjs/toolkit");



const initialState = {
  reuniones: [],
  size: 0
}
export const reunionSlice = createSlice({
  name: 'reunion',
  initialState,
  reducers: {
    addReunion: (state, action) => {
      state.reuniones.push(action.payload)
    },
    setInitialReuniones: (state, action) => {
      state.reuniones = action.payload;
    },
    setInitialSize: (state, action) => {
      state.size = action.payload;
    }
  },
});

// console.log('reunionSlice', reunionSlice);
export const { addReunion, setInitialReuniones, setInitialSize } = reunionSlice.actions;
export default reunionSlice.reducer;