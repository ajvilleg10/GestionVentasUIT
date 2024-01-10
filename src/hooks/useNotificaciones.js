import { useState, useEffect } from 'react';
import axios from 'utils/axios';
import { useSelector } from 'store';

const useNotificaciones = () => {
  const user = useSelector((state) => state.user);
  const [notificaciones, setNotificaciones] = useState([]);

  const getNotificaciones = async () => {
    const response = await axios.get(`/notificaciones/tipoCuenta/${user?.tipo_cuenta_id}`);
    setNotificaciones(response.data);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getNotificaciones();
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return notificaciones;
};

export default useNotificaciones;
