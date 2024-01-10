import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useJefesVentas = () => {
  const [jefesVentas, setJefesVentas] = useState([]);

  useEffect(() => {
    const getJefesVentas = async () => {
      try {
        const response = await axios.get('/empleados/jefesVentas');
        console.log(response.data);
        setJefesVentas(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getJefesVentas();
  }, []);

  return jefesVentas;
};

export default useJefesVentas;
