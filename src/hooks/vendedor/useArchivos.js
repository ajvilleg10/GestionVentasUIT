import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useArchivos = (id) => {

  const [archivosFinal, setArchivosFinal] = useState(undefined);

  useEffect(() => {

    const fetchArchivos = async (id) => {

      try {

        const response = await axios.get(`/archivos/empleado/${id}`);

        const { archivos } = response.data;
        if (archivos.length == 0) throw new Error('No existen archivos de ningun tipo');

        const archivosURL = await Promise.all(archivos.map(async (a) => {

          const fileResponse = await fetch(`${process.env.REACT_APP_API_URL}archivos/download/${a.id}`);
          const blob = await fileResponse.blob();
          return {
            ...a,
            blob
          };

        }));

        const final = Object.groupBy(archivosURL, ({ tipo }) => tipo);

        setArchivosFinal(final);

      } catch (error) {

        console.error(error);

      }

    };

    fetchArchivos(id);

  }, []);

  const crearArchivo = async (data) => {

    const response = await axios.post('/archivos', data);
    return response.data;

  };

  const updateArchivo = async (id, data) => {

    const response = await axios.put(`/empleados/updateAceptacion/${id}`, data);
    console.log(response.data);

    return response.data;

  };

  return { archivos: archivosFinal, crearArchivo, updateArchivo };
};

export default useArchivos;
