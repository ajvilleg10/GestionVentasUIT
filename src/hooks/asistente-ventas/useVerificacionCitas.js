import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'utils/axios';

const useVerificacionCitas = (id) => {
  const [verificacionesBack, setVerificacionesBack] = useState([]);
  const [modosVerificacionesBack, setModosVerificacionesBack] = useState([]);
  const [asistenteBack, setAsistenteBack] = useState("");

  const currentUser = useSelector((state) => state.user);

  const fetchVerificaciones = async () => {

    try {
      const response = await axios.get('/asistenteVenta/verificacionCitas/verificaciones/' + id);
      console.log(response.data);
      setVerificacionesBack(response.data);
    } catch (error) {
      console.log(error);
    }

  };

  const fetchModosVerificaciones = async () => {

    try {
      const response = await axios.get('/asistenteVenta/verificacionCitas/modoVerificaciones/');
      console.log(response.data);
      setModosVerificacionesBack(response.data);
    } catch (error) {
      console.log(error);
    }

  };

  const fetchNombreAsistente = async () => {

    try {
      console.log("id "+currentUser.id);
      const response = await axios.get('/empleados/empleadoInfo/' + currentUser.id);
      console.log(response.data);
      setAsistenteBack(response.data);
    } catch (error) {
      console.log(error);
    }

  };

  const createVerificacion = async (formData) => {

    const response = await axios.post('/asistenteVenta/verificacionCitas/verificaciones/createVerificacion', formData);
    console.log(response.data);
    if (response.status !== 201)
      throw new Error((response.data.error != null ? response.data.error : "Error al crear"))
    fetchVerificaciones();

  };

  useEffect(() => {
    fetchNombreAsistente();
    fetchVerificaciones();
    fetchModosVerificaciones();
  }, []);

  return { verificacionesBack, modosVerificacionesBack, asistenteBack, createVerificacion }
};

export default useVerificacionCitas;
