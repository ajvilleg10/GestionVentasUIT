import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useComitesSemanales = () => {

  const [reuniones, setReuniones] = useState([]);

  const fetchReuniones = async () => {

    try {

      const response = await axios.get('/comitesSemanales');
      console.log('response reuniones', response);
      setReuniones(response.data);

    } catch (error) {

      console.error('get de reuniones', error);

    }

  };

  const crearReunion = async (data) => {

    const response = await axios.post('/comitesSemanales', data);
    console.log('post comite mensual', response);
    fetchReuniones();

  };

  const deleteReunion = async (id) => {

    const response = await axios.delete(`/comitesSemanales/${id}`);
    console.log('suspender comite mensual', response);
    fetchReuniones();

  }

  const updateAsistencia = async (id, data) => {

    const response = await axios.put(`/comitesSemanales/asistencia/${id}`, data);
    console.log(response);
    fetchReuniones();

  };

  const updateReunion = async (id, data) => {

    const response = await axios.put(`/comitesSemanales/${id}`, data);
    console.log(response);
    fetchReuniones();

  };

  useEffect(() => { 
    fetchReuniones();
  }, []);

  return { reuniones, crearReunion, fetchReuniones, deleteReunion, updateReunion, updateAsistencia };

}

export default useComitesSemanales;
