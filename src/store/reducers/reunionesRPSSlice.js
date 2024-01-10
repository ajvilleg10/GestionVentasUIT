import { dayMonthYearFormat, timeShortFormat } from "utils/reunionFormat";


const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
  reunionesRPS: [],
  size: 0
}
export const reunionesRPSSlice = createSlice({
  name: 'reunion',
  initialState,
  reducers: {
    addReunionesRPS: (state, action) => {
      state.reunionesRPS.push(action.payload);
      state.size += 1;
    },
    setInitialReunionesRPS: (state, action) => {
      if (state.reunionesRPS.length === 0) {
        state.reunionesRPS = action.payload;

      }
    },
    setInitialSize: (state, action) => {
      state.size = action.payload;
    },
    removeReunionesRPS: (state, action) => {
      const itemId = action.payload;
      // state.reunionesRPS.filter((item) => {
      //   if (item.idReunion === action.payload) {
      //     console.log(`item.id is ${item.idReunion}, payload is ${action.payload}`);
      //   }
      // });
      state.reunionesRPS = state.reunionesRPS.filter((item) => item.idReunion !== itemId);
      
    },
    updateReunionesRPS: (state, action) => {
      console.log('action.payload', action.payload);
      //remmenber send id when call it
      const {
        id,
        fechaReunion,
        duracion,
        horaDesde,
        empleadoIdJefeVenta,
        empleadoIdVendedor,
        asistioJefeVenta,
        puntualCompletaJefeVenta,
        asistioVendedor,
        puntualCompletaVendedor,
      } = action.payload;

      const reunion = state.reunionesRPS.find((reunion) => reunion.idReunion === id)

      console.log('fechaReunion 54', fechaReunion);
      
      if (reunion) {
        reunion.fechaReunion = fechaReunion
        reunion.duracion = duracion
        reunion.horaDesde = horaDesde
        reunion.empleados.filter((empleado) => empleado.nombreTipoCuenta === "Jefe de Ventas").map((empleado) => {
          empleado.id = empleadoIdJefeVenta
          empleado.asistio = asistioJefeVenta
          empleado.puntualCompleta = puntualCompletaJefeVenta
        });
        reunion.empleados.filter((empleado) => empleado.nombreTipoCuenta === "Vendedor").map((empleado) => {
          empleado.id = empleadoIdVendedor
          empleado.asistio = asistioVendedor
          empleado.puntualCompleta = puntualCompletaVendedor
        });
      }
    },
    sendReunionesRPS: (state, action) => {
      console.log('action.payload', action.payload);
      //remmenber send id when call it
      const {
        id,
        enviado
      } = action.payload;

      const reunion = state.reunionesRPS.find((reunion) => reunion.idReunion === id)

      if (reunion) {
        reunion.enviado = enviado
        
      }
    }
  },
});

// console.log('reunionesRPSSlice', reunionesRPSSlice);
export const { addReunionesRPS, setInitialReunionesRPS, setInitialSize, removeReunionesRPS, updateReunionesRPS, sendReunionesRPS } = reunionesRPSSlice.actions;
export default reunionesRPSSlice.reducer;