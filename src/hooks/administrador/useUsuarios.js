import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useUsuarios = () => {

  const [usuarios, setUsuarios] = useState([]);

  const crearUsuario = async (data) => {
    const response = await axios.post('/empleados/admin', data);
    console.log(response.data);

    fetchUsers();
  };

  const fetchUsers = async () => {
    const response = await axios.get('/empleados');
    console.log(response.data);
    setUsuarios(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { usuarios, crearUsuario };

};

export default useUsuarios;
