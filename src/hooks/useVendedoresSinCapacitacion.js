import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useVendedoresSinCapacitacion = () => {
  const [vendedoresSinCapacitacion, setVendedoresSinCapacitacion] = useState([]);

  useEffect(() => {
    const getVendedoresSinCapacitacion = async () => {
      const response = await axios.get('/vendedores/sinCapacitacion');
      setVendedoresSinCapacitacion(response.data);
    };
    getVendedoresSinCapacitacion();
  }, []);

  return vendedoresSinCapacitacion;
};

export default useVendedoresSinCapacitacion;
