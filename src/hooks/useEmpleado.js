import { dispatch, useSelector } from 'store';
import { updateUser } from 'store/reducers/users';
import { setNombreCompleto as setNombreUser } from 'store/reducers/userSeleccionado';
import { setNombreCompleto as setNombreProspecto } from 'store/reducers/prospectoSeleccionado';
import { setNombreCompleto as setNombreCurrent } from 'store/reducers/user';
import axios from 'utils/axios';

const useEmpleado = () => {

  const user = useSelector(state => state.user);
  const userSeleccionado = useSelector(state => state.userSeleccionado);
  const prospectoSeleccionado = useSelector(state => state.prospectoSeleccionado);

  const updateProspectoInfo = async (empleado) => {

    const response = await axios.put(`/empleados/updateProspectoVendedorInfo/${user.id}`, empleado);
    const data = response.data;
    return data;

  };

  const updateDescripcionGeneral = async (empleado) => {

    const response = await axios.put(`/empleados/updateDescripcionGeneral/${userSeleccionado.id}`, empleado);

    dispatch(setNombreUser({ nombres: empleado.nombres, apellidos: empleado.apellidos }));
    dispatch(updateUser({ userID: userSeleccionado.id, data: empleado }));

    const data = response.data;
    return data;

  };

  const updateDescripcionGeneralProspecto = async (empleado) => {

    const response = await axios.put(`/empleados/updateDescripcionGeneral/${prospectoSeleccionado.id}`, empleado);
    dispatch(setNombreProspecto({ nombres: empleado.nombres, apellidos: empleado.apellidos }));

    const data = response.data;
    return data;

  }

  const updateDescripcionGeneralUser = async (empleado) => {

    const response = await axios.put(`/empleados/updateDescripcionGeneral/${user.id}`, empleado);
    dispatch(setNombreCurrent({ nombres: empleado.nombres, apellidos: empleado.apellidos }));

    const data = response.data;
    return data;

  }

  return { updateProspectoInfo, updateDescripcionGeneral, updateDescripcionGeneralProspecto, updateDescripcionGeneralUser};

};

export default useEmpleado;
