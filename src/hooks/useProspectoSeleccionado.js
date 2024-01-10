import { useState, useEffect } from 'react';
import { useSelector } from 'store';
import axios from 'utils/axios';

const useProspectoSeleccionado = () => {
  const [currentProspecto, setCurrentProspecto] = useState({});

  const prospectoSeleccionado = useSelector((state) => state.prospectoSeleccionado);

  useEffect(() => {
    const getEmpleadoInfo = async () => {
      if (prospectoSeleccionado.id == 0) return;

      const response = await axios.get(`/empleados/${prospectoSeleccionado.id}`);
      const empleadoInfo = response.data;
      const response2 = await axios.get(`/tiposCuentas/${prospectoSeleccionado.tipo_cuenta_id}`);
      const response3 = await axios.get(`/cuentas/${prospectoSeleccionado.cuenta_id}`);

      const tipoCuentaInfo = response2.data;
      const cuentaInfo = response3.data;
      const prospectoSeleccionadoInfo = {
        empleadoInfo,
        tipoCuentaInfo,
        cuentaInfo
      };
      console.log(prospectoSeleccionadoInfo);
      setCurrentProspecto(prospectoSeleccionadoInfo);
    };
    getEmpleadoInfo();
  }, [prospectoSeleccionado]);

  return currentProspecto;
};

export default useProspectoSeleccionado;
