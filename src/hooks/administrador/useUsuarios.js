import { useEffect } from 'react';
import { dispatch } from 'store';
import { activateUser, addUser, inactiveUser, setUsers } from 'store/reducers/users';
import axios from 'utils/axios';

const useUsuarios = ({ activos }) => {

  const crearUsuario = async (user) => {
    const response = await axios.post('/empleados/admin', user);
    const { data } = response.data;
    
    dispatch(addUser(data));
  };

  const desactivarUsuario = async (id) => {

    const response = await axios.delete(`/empleados/desactivar/${id}`);
    dispatch(inactiveUser({ userID: id }));
    console.log('response desactivar', response.data);
    return response.data;

  };

  const activarUsuario = async (id) => {

    const response = await axios.put(`/empleados/activar/${id}`);
    dispatch(activateUser({ userID: id }));
    console.log('response activar', response.data);
    return response.data;

  };

  useEffect(() => {

    const fetchUsers = async () => {
      const response = await axios.get(`/empleados?activos=${activos}`);
      const data = response.data;

      dispatch(setUsers(data));
    };

    fetchUsers();

  }, []);

  return { crearUsuario, desactivarUsuario, activarUsuario };

};

export default useUsuarios;
