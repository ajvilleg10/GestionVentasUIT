import { useState, useEffect } from 'react';
import { useSelector } from 'store';
import axios from 'utils/axios';

const useJefesVentas = () => {

  const user = useSelector(state => state.user);
  const [jefesVentas, setJefesVentas] = useState([]);

  useEffect(() => {

    const getJefesVentas = async () => {

      try {
        const response = await axios.get('/asistentesVentas/jefesVenta/all', { params: { asistente_id: user.id } });
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
