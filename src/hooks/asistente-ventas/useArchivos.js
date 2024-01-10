import { useState, useEffect } from 'react';
import axios from 'utils/axios';
// import { useSelector } from 'store';
import useProspectoSeleccionado from 'hooks/useProspectoSeleccionado';

const useArchivos = () => {
  // const user = useSelector((state) => state.user); // Asitente de ventas
  const prospecto = useProspectoSeleccionado();

  const [contrato, setContrato] = useState({});
  const [copiaCedula, setCopiaCedula] = useState({});
  const [archivosPorCuenta, setArchivosPorCuenta] = useState([]);

  useEffect(() => {
    const fetchContrato = async () => {
      if (!prospecto.empleadoInfo) return;

      try {
        const response = await axios.get(`/empleados/archivos/${prospecto?.empleadoInfo?.id}?uploaded=false`);
        setContrato(response.data[0]);
      } catch (error) {
        console.error('Error en fetchContrato', error);
      }
    };

    const fetchArchivosPorCuenta = async () => {
      try {
        const response = await axios.get(`/archivos/tipoCuenta/1`); // Este tipo de cuenta deberia ser uno mismo para prospecto y vendedor
        response.data.archivos.sort((a, b) => {
          const n1 = a.nombre.toUpperCase();
          const n2 = b.nombre.toUpperCase();
          if (n1 < n2) {
            return -1;
          } else if (n1 > n2) {
            return 1;
          } else return 0;
        });
        setArchivosPorCuenta(response.data.archivos);
      } catch(error) {
        console.error('Error en fetchArchivosPorCuenta', error);
      }
    };

    const fetchCopiaCedula = async () => {
      if (!prospecto.empleadoInfo) return;

      try {
        const response = await axios.get(`/empleados/archivos/${prospecto?.empleadoInfo?.id}?uploaded=true`);
        setCopiaCedula(response.data[0]);
      } catch (error) {
        console.log('Error en fetchCopiaCedula', error);
      }
    };

    fetchCopiaCedula();
    fetchArchivosPorCuenta();
    fetchContrato();

  }, [prospecto]);

  const createArchivo = async (dataArchivo) => {
    const response = await axios.post('/archivos', dataArchivo);
    return response.data;
  };

  return { copiaCedula: { ...copiaCedula, empleado_id: prospecto?.empleadoInfo?.id }, archivosPorCuenta, contrato, createArchivo };
};

export default useArchivos;
