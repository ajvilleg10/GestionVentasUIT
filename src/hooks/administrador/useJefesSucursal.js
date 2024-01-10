import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useJefesSucursal = () => {

  const [jefes, setJefes] = useState([]);

  useEffect(() => {

    const getJefes = async () => {
      try {
        const response = await axios.get('/jefesSucursal');
        console.log(response.data);
        setJefes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getJefes();
  }, []);

  return jefes;
};

export default useJefesSucursal;
