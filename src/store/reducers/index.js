// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import snackbar from './snackbar';
import user from './user';
import auth from './auth';
import prospectoSeleccionado from './prospectoSeleccionado';
import reunion from './reunionesRPSSlice';
import contactoSeleccionado from './contactoSeleccionado';
import transferenciaContactos from './transferenciaContactosSlice';
import userSeleccionado from './userSeleccionado';
import reunionGeneral from './reunionGeneral';
import reportes from './reportes';
import users from './users';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  snackbar,
  user,
  auth,
  prospectoSeleccionado,
  contactoSeleccionado,
  reunion,
  transferenciaContactos,
  userSeleccionado,
  reunionGeneral,
  reportes,
  users
});

export default reducers;
