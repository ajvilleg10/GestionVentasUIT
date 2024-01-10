import { useState, useEffect } from 'react';
import axios from 'utils/axios';
import { useSelector } from 'store';

const useNotificaciones = () => {
  const user = useSelector((state) => state.user);
  const [notificaciones, setNotificaciones] = useState([]);
  console.log('Notificactions hook, user', user,"tipo_cuenta_id", user?.tipo_cuenta_id,'empleado_id:', user?.id);

  const data = {
    empleado_id: user?.id,
    tipo_cuenta_id: user?.tipo_cuenta_id
  }
  
  const getNotificaciones = async () => {

    try {
      console.log('dataaa', data);
  
      const response = await axios.get('/notificaciones/byTipoCuenta/empleado', { params: data });
      console.log('response.data', response.data);
      setNotificaciones(response.data);
      
    } catch (error) {
      console.log(error);
    }
    
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getNotificaciones();
      console.log('Notificaciones actualizadas');
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const updateNotificaciones = async (id, data) => {
    try {
      const response = await axios.put(`/notificaciones/${id}`, data);
      console.log('update response.data', response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return { notificaciones, updateNotificaciones };
};

export default useNotificaciones;
