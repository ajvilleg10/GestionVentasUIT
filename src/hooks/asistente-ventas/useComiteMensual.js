import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useComitesMensuales = () => {

  const [reuniones, setReuniones] = useState([]);

  const fetchReuniones = async () => {

    try {
      const response = await axios.get('/comitesMensuales');
      console.log('response reuniones', response);
      setReuniones(response.data);
    } catch (error) {
      console.error('get de reuniones', error);
    }

  };

  const crearReunion = async (data) => {

    const response = await axios.post('/comitesMensuales', data);
    console.log('post comite mensual', response);
    fetchReuniones();

  };

  const deleteReunion = async (id) => {

    const response = await axios.delete(`/comitesMensuales/${id}`);
    console.log('delete comite mensual', response);
    fetchReuniones();

  }

  const updateAsistencia = async (id, data) => {

    const response = await axios.put(`/comitesMensuales/asistencia/${id}`, data);
    console.log(response);
    fetchReuniones();

  };

  const updateReunion = async (id, data) => {

    const response = await axios.put(`/comitesMensuales/${id}`, data);
    console.log(response);
    fetchReuniones();

  };

  useEffect(() => { 
    fetchReuniones();
  }, []);

  return { reuniones, crearReunion, fetchReuniones, deleteReunion, updateReunion, updateAsistencia };

}

export default useComitesMensuales;

// const useCapacitacionQuincenal = () => {
//   const [capacitaciones, setCapacitaciones] = useState([]);

//   const fetchCapacitaciones = async () => {

//     try {
//       const response = await axios.get('/capacitacionesQuincenales');
//       console.log(response.data);
//       setCapacitaciones(response.data);
//     } catch (error) {
//       console.log(error);
//     }

//   };

//   const createCapacitacionQuincenalAndRefresh = async (data) => {
//     const response = await axios.post('/capacitacionesQuincenales', data);
//     console.log(response.data);
//     fetchCapacitaciones();
//   };

//   const deleteCapacitacionQuincenalAndRefresh = async (id) => {
//     const response = await axios.delete(`/capacitacionesQuincenales/${id}`);
//     console.log(response);
//     fetchCapacitaciones();
//   };

//   const updateAsistenciaCapacitacionQuincenalAndRefresh = async (id, data) => {
//     const response = await axios.put(`/capacitacionesQuincenales/asistencia/${id}`, data);
//     console.log(response);
//     fetchCapacitaciones();
//   };
  
//   const updateCapacitacionQuincenalAndRefresh = async (id, data) => {
//     console.log('Actualizar info de capacitacion');
//     const response = await axios.put(`/capacitacionesQuincenales/${id}`, data);
//     console.log(response);
//     fetchCapacitaciones();
//   };

//   useEffect(() => {
//     fetchCapacitaciones();
//   }, []);

//   return { capacitaciones, createCapacitacionQuincenalAndRefresh, deleteCapacitacionQuincenalAndRefresh, updateAsistenciaCapacitacionQuincenalAndRefresh, updateCapacitacionQuincenalAndRefresh };
// };

// export default useCapacitacionQuincenal;
