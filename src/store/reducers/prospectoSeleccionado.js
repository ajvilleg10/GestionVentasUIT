// third-party
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  id: 0,
  tipo_cuenta: {},
  cuenta_id: 0,
  nombres: '',
  apellidos: ''
};

const prospectoSeleccionado = createSlice({
  name: 'prospectoSeleccionado',
  initialState,
  reducers: {
    setId(state, action) {
      state.id = action.payload.id;
    },
    setTipoCuenta(state, action) {
      state.tipo_cuenta = action.payload.tipo_cuenta;
    },
    setCuentaId(state, action) {
      state.cuenta_id = action.payload.cuenta_id;
    },
    setNombreCompleto(state, action) {
      state.nombres = action.payload.nombres;
      state.apellidos = action.payload.apellidos;
    }
  }
});

export const { setId, setTipoCuenta, setCuentaId, setNombreCompleto } = prospectoSeleccionado.actions;
export default prospectoSeleccionado.reducer;
