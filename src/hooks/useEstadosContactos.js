import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useEstadosContactos = () => {
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    const getEstados = async () => {
      const response = await axios.get('/estadosContactos');
      setEstados(response.data);
    };
    getEstados();
  }, []);

  return estados;
};

export default useEstadosContactos;
