import { useState, useEffect } from 'react';
import { useSelector } from 'store';
import axios from 'utils/axios';

const useUserSeleccionado = () => {

  const [currentUser, setCurrentUser] = useState({});
  const user = useSelector((state) => state.userSeleccionado);

  useEffect(() => {

    const getEmpleadoInfo = async () => {

      if (!user.id) return;

      const empleado = await axios.get(`/empleados/${user.id}`);
      const tipoCuenta = await axios.get(`/tiposCuentas/${user.tipo_cuenta.id}`);
      const cuenta = await axios.get(`/cuentas/${user.cuenta_id}`);

      const userInfo = {
        empleadoInfo: empleado.data,
        tipoCuentaInfo: tipoCuenta.data,
        cuentaInfo: cuenta.data
      };

      setCurrentUser(userInfo);

    };

    getEmpleadoInfo();

  }, [user]);

  return currentUser;
};

export default useUserSeleccionado;