import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useConfParametros = () => {
  const [confParametrosBack, setConfParametrosBack] = useState();

  const createConfParametros = async (formData) => {
    const response = await axios.post('/administrador/confParametros', formData);
    setConfParametrosBack(response.data);
  };

  const fetchConfParametros = async () => {
    try {
      const response = await axios.get(`/administrador/confParametros`);
      setConfParametrosBack(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConfParametros();
  }, []);

  return { confParametrosBack, createConfParametros };
};

export default useConfParametros;