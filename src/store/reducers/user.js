// third-party
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  type: '',
  id: 0,
  tipo_cuenta_id: 0,
  cuenta_id: 0,
  alias: '',
  empleadoInfo: {},
  nombres: '',
  apellidos: ''
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setUserType(state, action) {
    //   state.type = action.payload.userType;
    // },
    // setUserId(state, action) {
    //   state.id = action.payload.userId;
    // },
    setTipoCuentaId(state, action) {
      state.tipo_cuenta_id = action.payload.tipo_cuenta_id;
      state.type = action.payload.userType;
      state.alias = action.payload.alias
    },
    setCuentaId(state, action) {
      state.cuenta_id = action.payload.cuenta_id;
    },
    // setCuentaAlias(state, action) {
    //   state.alias = action.payload.alias
    // },
    setEmpleadoInfo(state, action) {
      state.empleadoInfo = action.payload.empleadoInfo
      state.id = action.payload.userId;
    },
    setNombreCompleto(state, action) {
      state.nombres = action.payload.nombres;
      state.apellidos = action.payload.apellidos;
    }
  }
});

export const { setTipoCuentaId, setCuentaId, setEmpleadoInfo, setNombreCompleto } = user.actions;
export default user.reducer;
