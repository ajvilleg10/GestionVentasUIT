const { createSlice } = require("@reduxjs/toolkit");

// Estos nombres corresponden a los nombres de los tipos de reuniones en utils/constants.js
const initialState = {
  semanal: {
    reuniones: [],
    size: 0
  },
  quincenal: {
    reuniones: [],
    size: 0
  },
  mensual: {
    reuniones: [],
    size: 0
  }
};

export const reunionGeneralSlice = createSlice({
  name: 'reunionGeneral',
  initialState,
  reducers: {
    addReunion: (state, action) => {

      if (Array.isArray(action.payload.data)){
        for(const r of action.payload.data) {
          state[action.payload.tipo_reunion].reuniones.push(r);
        }
      } else {
        state[action.payload.tipo_reunion].reuniones.push(action.payload.data);
      }
    },
    setInitialReuniones: (state, action) => {
      state[action.payload.tipo_reunion].reuniones = action.payload.data;
    },
    updateReunion: (state, action) => {
      const { reuniones } = state[action.payload.tipo_reunion];

      const reunion_index = reuniones.findIndex(obj => obj.id === action.payload.reunion_id);

      reuniones[reunion_index] = {
        ...reuniones[reunion_index],
        ...action.payload.data
      };
    },
    deleteReunion: (state, action) => {
      const id = action.payload.id;
      const { reuniones } = state[action.payload.tipo_reunion];

      state[action.payload.tipo_reunion].reuniones = reuniones.filter((r) => r.id !== id);
    },
    setReunionSent: (state, action) => {

      const { reuniones } = state[action.payload.tipo_reunion];
      const reunion_index = reuniones.findIndex(obj => obj.id === action.payload.reunion_id);

      reuniones[reunion_index] = {
        ...reuniones[reunion_index],
        completada: true
      };

    },
    setMailSent: (state, action) => {

      const { reuniones } = state[action.payload.tipo_reunion];
      const reunion_index = reuniones.findIndex(obj => obj.id === action.payload.reunion_id);

      reuniones[reunion_index] = {
        ...reuniones[reunion_index],
        updated_date: false
      };

    }
  }
});

export const { addReunion, setInitialReuniones, updateReunion, deleteReunion, setMailSent, setReunionSent } = reunionGeneralSlice.actions;
export default reunionGeneralSlice.reducer;
