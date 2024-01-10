import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useAsistenteVentas = () => {

  const [asistentes, setAsistentes] = useState([]);

  const fetchAsistentes = async () => {
    try {
      const response = await axios.get('/asistentesVentas');
      console.log('sis', response.data);
      setAsistentes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAsistentes();
  }, []);

  return { fetchAsistentes, asistentes };
};

export default useAsistenteVentas;
