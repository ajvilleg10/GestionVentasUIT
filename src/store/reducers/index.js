// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import snackbar from './snackbar';
import user from './user';
import auth from './auth';
import prospectoSeleccionado from './prospectoSeleccionado';
import reunion from './reunionSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  snackbar,
  user,
  auth,
  prospectoSeleccionado,
  reunion,
});

export default reducers;
