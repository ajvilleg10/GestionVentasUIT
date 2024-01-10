import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contactos: []
}

export const transferenciaContactosSlice = createSlice({
  name: 'transferenciaContactos',
  initialState,
  reducers: {
    setInitialContactos(state, action) {
      state.contactos = action.payload;
    },
    updateContactos(state, action) {
      // vendedor: empleado_id
      const { 
        id,
        empleado_id,
        Empleado
      } = action.payload;
      const contactos = state.contactos.map((contacto) => {
        if (id.includes(contacto.id)) {
          contacto.empleado_id = empleado_id;
          contacto.Empleado = Empleado;
        }
        return contacto;
      });
      state.contactos = contactos;
    }
  }

})

export const { setInitialContactos, updateContactos } = transferenciaContactosSlice.actions;
export default transferenciaContactosSlice.reducer;