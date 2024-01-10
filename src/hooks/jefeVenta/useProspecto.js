import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useProspecto = (id) => {
  const [prospecto, setProspecto] = useState([]);
  useEffect(() => {
    const getProspecto = async () => {
      try {
        const response = await axios.get(`/actividades/sinAprobar/prospectoVendedores/empleado/${id}`);
        console.log(response.data);
        setProspecto(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProspecto();
  }, []);
  return prospecto;
}

export default useProspecto;

