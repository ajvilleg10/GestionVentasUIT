import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialData: [],
  showData:[]
};

const reportesSlice = createSlice({
  name: 'reportes',
  initialState,
  reducers: {
    setInitData: (state, action) => {
      state.initialData = action.payload.data;
      state.showData = action.payload.data;
    },
    setShowData: (state, action) => {
      state.showData = action.payload.data;
    }
  }
});

export const { setInitData, setShowData } = reportesSlice.actions;
export default reportesSlice.reducer;
