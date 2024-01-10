import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useCapacitacionQuincenal = () => {
  const [capacitaciones, setCapacitaciones] = useState([]);

  const fetchCapacitaciones = async () => {

    try {
      const response = await axios.get('/capacitacionesQuincenales');
      console.log(response.data);
      setCapacitaciones(response.data);
    } catch (error) {
      console.log(error);
    }

  };

  const createCapacitacionQuincenalAndRefresh = async (data) => {
    const response = await axios.post('/capacitacionesQuincenales', data);
    console.log(response.data);
    fetchCapacitaciones();
  };

  const deleteCapacitacionQuincenalAndRefresh = async (id) => {
    const response = await axios.delete(`/capacitacionesQuincenales/${id}`);
    console.log(response);
    fetchCapacitaciones();
  };

  const updateAsistenciaCapacitacionQuincenalAndRefresh = async (id, data) => {
    const response = await axios.put(`/capacitacionesQuincenales/asistencia/${id}`, data);
    console.log(response);
    fetchCapacitaciones();
  };
  
  const updateCapacitacionQuincenalAndRefresh = async (id, data) => {
    console.log('Actualizar info de capacitacion');
    const response = await axios.put(`/capacitacionesQuincenales/${id}`, data);
    console.log(response);
    fetchCapacitaciones();
  };

  useEffect(() => {
    fetchCapacitaciones();
  }, []);

  return { capacitaciones, createCapacitacionQuincenalAndRefresh, deleteCapacitacionQuincenalAndRefresh, updateAsistenciaCapacitacionQuincenalAndRefresh, updateCapacitacionQuincenalAndRefresh };
};

export default useCapacitacionQuincenal;
