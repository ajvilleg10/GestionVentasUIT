import { useState, useEffect } from 'react';
import axios from 'utils/axios';
import { useSelector } from 'store';

const useArchivos = () => {
  const user = useSelector((state) => state.user); // Prospecto - Vendedor

  const [copiaCedula, setCopiaCedula] = useState({});
  const [archivosPorCuenta, setArchivosPorCuenta] = useState([]);
  const [contrato, setContrato] = useState({});

  useEffect(() => {
    const fetchCopiaCedula = async () => {
      try {
        const response = await axios.get(`/empleados/archivos/${user.id}?uploaded=true`);
        setCopiaCedula(response.data[0]);
      } catch (error) {
        console.error('Error en fetchCopiaCedula', error);
      }
    };

    const fetchArchivosPorCuenta = async () => {
      try {
        const response = await axios.get(`/archivos/tipoCuenta/${user.tipo_cuenta_id}`);
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

    const fetchContrato = async () => {
      try {
        const response = await axios.get(`/empleados/archivos/${user.id}?uploaded=false`);
        setContrato(response.data[0]);
      } catch (error) {
        console.error('Error en fetchContrato', error);
      }
    };

    fetchCopiaCedula();
    fetchArchivosPorCuenta();
    fetchContrato();

  }, []);

  const createArchivo = async (dataArchivo) => {
    const response = await axios.post('/archivos', dataArchivo);
    return response.data;
  };

  return { copiaCedula, archivosPorCuenta, contrato, createArchivo };
};

export default useArchivos;
