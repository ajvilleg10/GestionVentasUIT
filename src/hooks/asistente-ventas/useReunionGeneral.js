import { useEffect } from 'react';
import { dispatch } from 'store';
import { setInitialReuniones, addReunion } from 'store/reducers/reunionGeneral';
import axios from 'utils/axios';

const useReunionGeneral = (tipo_reunion) => {

  const fetchReuniones = async () => {
    try {

      const response = await axios.get(`/reunionGeneral?tipo_reunion=${tipo_reunion}`);
      dispatch(setInitialReuniones({ tipo_reunion, data: response.data }));
      console.log('Reuniones recuperadas');

    } catch (error) {
      console.error('Error fetchReuniones: ', error);
    }
  };

  const createNewReunion = async (data) => {

    const response = await axios.post('/reunionGeneral', data);

    dispatch(addReunion({ tipo_reunion, data: response.data.data }));
    return response.data;

  };

  const updateReunion = async (id, data) => {
    const response = await axios.put(`/reunionGeneral/${id}`, data);
    return response.data;
  };

  const deleteReunion = async (id) => {

    const response = await axios.delete(`/reunionGeneral/${id}`);
    return response.data;

  };

  const sendEmail = async (id) => {
    await axios.put(`/reunionGeneral/sendMail/${id}`);
  };

  const updateAsistencia = async (id, data) => {
    const response = await axios.put(`/reunionGeneral/asistencia/${id}`, data);
    return response.data;
  };

  useEffect(() => {
    fetchReuniones();
  }, []);

  return { createNewReunion, updateReunion, deleteReunion, sendEmail, updateAsistencia };
};

export default useReunionGeneral;
