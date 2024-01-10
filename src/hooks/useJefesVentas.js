import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useJefesVentas = () => {
  const [jefesDeVentas, setJefesVentas] = useState([]);

  const fetchJefesVenta = async () => {
    try {
      const response = await axios.get('/empleados/jefesVentas');
      console.log('efes', response.data);
      setJefesVentas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJefesVenta();
  }, []);

  return { fetchJefesVenta, jefesDeVentas };
};

export default useJefesVentas;
