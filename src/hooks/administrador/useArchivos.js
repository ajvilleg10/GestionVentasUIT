import { useState, useEffect } from 'react';
import axios from 'utils/axios';
import { useSelector } from 'store';

const useArchivos = () => {

  const user = useSelector((state) => state.userSeleccionado);
  const [archivos, setArchivos] = useState(undefined);

  useEffect(() => {

    const fetchArchivos = async (id) => {

      const serviceToken = window.localStorage.getItem('serviceToken');

      const headers = {
        authorization: `Bearer ${serviceToken}`
      };

      try {

        const response = await axios.get(`/archivos/asistente/${id}`, { headers });
        const { archivos } = response.data ?? [];
        if (archivos.length == 0) throw new Error('No existen archivos de ningun tipo');

        const archivosURL = await Promise.all(archivos.map(async (a) => {
          const fileResponse = await fetch(`${process.env.REACT_APP_API_URL}archivos/download/${a.id}`, { headers });
          const blob = await fileResponse.blob();
          return {
            ...a,
            blob
          };
        }));

        const final = {};

        archivosURL.forEach((a) => {
          const { tipo, ...resto } = a;
          final[tipo] = { tipo, ...resto };
        });

        setArchivos(final);

      } catch (error) {

        console.error(error);

      }

    };

    fetchArchivos(user.id);

  }, []);

  const crearArchivo = async (data) => {
    const response = await axios.post('/archivos/admin', data);
    return response.data;
  };

  const updateArchivo = async (id, data) => {
    const response = await axios.put(`/empleados/updateAceptacion/${id}`, data);
    return response.data;
  };


  return { archivos, crearArchivo, updateArchivo };

};

export default useArchivos;
