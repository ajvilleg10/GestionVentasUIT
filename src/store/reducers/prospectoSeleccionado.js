// third-party
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  id: 0,
  tipo_cuenta_id: 0,
  cuenta_id: 0
};

const prospectoSeleccionado = createSlice({
  name: 'prospectoSeleccionado',
  initialState,
  reducers: {
    setId(state, action) {
      state.id = action.payload.id;
    },
    setTipoCuentaId(state, action) {
      state.tipo_cuenta_id = action.payload.tipo_cuenta_id;
    },
    setCuentaId(state, action) {
      state.cuenta_id = action.payload.cuenta_id;
    }
  }
});

export const { setId, setTipoCuentaId, setCuentaId } = prospectoSeleccionado.actions;
export default prospectoSeleccionado.reducer;
