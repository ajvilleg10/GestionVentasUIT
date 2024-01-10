import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useTiposCuentas = () => {
  const [tiposCuentas, setTiposCuentas] = useState([]);

  useEffect(() => {
    const getTiposCuentas = async () => {
      const response = await axios.get('/tiposCuentas/admin');
      setTiposCuentas(response.data);
    };
    getTiposCuentas();
  }, []);

  return tiposCuentas;
};

export default useTiposCuentas;
