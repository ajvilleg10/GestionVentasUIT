import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useAsistenteVentas = () => {

  const [asistentes, setAsistentes] = useState([]);

  useEffect(() => {

    const getAsistentes = async () => {
      try {
        const response = await axios.get('/asistentesVentas');
        console.log(response.data);
        setAsistentes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAsistentes();
  }, []);

  return asistentes;
};

export default useAsistenteVentas;
