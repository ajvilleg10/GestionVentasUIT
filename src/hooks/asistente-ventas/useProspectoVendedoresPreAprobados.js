import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useProspectoVendedoresAprobados = () => {
  const [prospectosVendedores, setProspectosVendedores] = useState([]);

  const fetchProspectosVendedores = async () => {
    try {
      const response = await axios.get('/empleados/prospectosVendedoresCapacitacion');
      console.log(response.data);
      setProspectosVendedores(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProspectosVendedores();
  }, []);

  return { prospectosVendedores };
};

export default useProspectoVendedoresAprobados;
