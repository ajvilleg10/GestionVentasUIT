import { useEffect, useState } from 'react';
import axios from 'utils/axios';

const useAdminConfig = () => {

  const [config, setConfig] = useState(undefined);

  useEffect(() => {

    const fetchConfig = async () => {

      try {
        const response = await axios.get('/administrador/confParametros');
        setConfig(response.data);
      } catch (error) {
        console.error('Error al obtener la configuracion de admin', error);
      }

    };

    fetchConfig();

  }, []);

  return config;

};

export default useAdminConfig;
