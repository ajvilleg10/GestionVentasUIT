import { useState, useEffect } from 'react';
import { useSelector } from 'store';
import axios from 'utils/axios';

const useProspectosVendedores = () => {

  const user = useSelector(state => state.user);
  const [prospectosVendedores, setProspectosVendedores] = useState([]);

  const fetchProspectosVendedores = async () => {

    try {
      const response = await axios.get('/empleados/prospectosVendedores', { params: { asistente_id: user.id } });
      setProspectosVendedores(response.data);
    } catch (error) {
      console.log(error);
    }

  };

  const createProspectoVendedorAndRefresh = async (formData) => {
    const response = await axios.post('/empleados/createProspectoVendedorAndCuenta', formData);
    console.log(response);
    fetchProspectosVendedores();
  };

  // Fetch the prospectos vendedores list when the hook is mounted
  useEffect(() => {
    fetchProspectosVendedores();
  }, []);

  return { prospectosVendedores, createProspectoVendedorAndRefresh };
};

export default useProspectosVendedores;
