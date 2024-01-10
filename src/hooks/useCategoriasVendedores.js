import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useCategoriasVendedores = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const getCategorias = async () => {
      const response = await axios.get('/categoriasVendedores');
      setCategorias(response.data);
    };
    getCategorias();
  }, []);

  return categorias;
};

export default useCategoriasVendedores;
