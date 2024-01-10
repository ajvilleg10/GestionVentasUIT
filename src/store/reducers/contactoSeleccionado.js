// third-party
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  id: 0,
  numero: 0,
};

const contactoSeleccionado = createSlice({
  name: 'contactoSeleccionado',
  initialState,
  reducers: {
    setId(state, action) {
      state.id = action.payload.id;
    },
    setNumero(state, action) {
      state.numero = action.payload.numero;
    }
  }
});

export const { setId, setNumero } = contactoSeleccionado.actions;
export default contactoSeleccionado.reducer;
