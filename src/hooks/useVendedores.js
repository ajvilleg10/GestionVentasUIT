import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useVendedores = () => {
  const [vendedores, setVendedores] = useState([]);

  useEffect(() => {
    const getVendedores = async () => {
      const response = await axios.get('/vendedores');
      setVendedores(response.data);
    };
    getVendedores();
  }, []);

  return vendedores;
};

export default useVendedores;
