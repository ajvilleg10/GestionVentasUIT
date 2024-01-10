import { useState, useEffect } from 'react';
import { useSelector } from 'store';
import axios from 'utils/axios';

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState([]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getEmpleadoInfo = async () => {
      const response = await axios.get(`/empleados/${user.id}`);
      const empleadoInfo = response.data;
      const response2 = await axios.get(`/tiposCuentas/${user.tipo_cuenta_id}`);
      const response3 = await axios.get(`/cuentas/${user.cuenta_id}`);

      const tipoCuentaInfo = response2.data;
      const cuentaInfo = response3.data;
      const userInfo = {
        empleadoInfo,
        tipoCuentaInfo,
        cuentaInfo
      };
      
      console.log('userInfo', userInfo);

      setCurrentUser(userInfo);
    };
    getEmpleadoInfo();
  }, [user]);

  return currentUser;
};

export default useCurrentUser;
