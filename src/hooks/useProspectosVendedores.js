import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useProspectosVendedores = () => {
  const [prospectosVendedores, setProspectosVendedores] = useState([]);

  const fetchProspectosVendedores = async () => {
    try {
      const response = await axios.get('/empleados/prospectosVendedores');
      console.log(response.data);
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
