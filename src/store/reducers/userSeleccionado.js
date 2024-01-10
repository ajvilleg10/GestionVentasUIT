// third-party
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  id: 0,
  tipo_cuenta: {},
  cuenta_id: 0
};

const userSeleccionado = createSlice({
  name: 'userSeleccionado',
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
    }
  }
});

export const { setId, setTipoCuenta, setCuentaId } = userSeleccionado.actions;
export default userSeleccionado.reducer;
