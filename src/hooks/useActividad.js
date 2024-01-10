import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useActividad = () => {
  // const [actividad, setActividad] = useState(null);

  // const fetchActividad = async (formData) => {
  //   try {
  //     const response = await axios.get(`actividades/${id}`, formData);
  //     console.log(response.data);
  //     setActividad(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //formData
//   {
//     "origen": "Proyecto 100",
//     "tipo_actividad": "Contactos",
//     "pre_aprobada": true,
//     "aprobada": false
// }

  const getActividadesByEmpleadoIdByBodyData = async (id, formData) => {
    try {
      const response = await axios.get(`actividades/${id}`, formData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getActividadesByEmpleado = async (id) => {

    try {
      const response = await axios.get(`actividades/empleado/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }

  };

  // const createActividadAndRefresh = async (formData) => {
  //   const response = await axios.post(`actividades/${id}`, formData);
  //   console.log(response);
  //   fetchActividad();
  // };

  // const updateActividadAndRefresh = async (formData) => {
  //   const response = await axios.put(`actividades/${id}`, formData);
  //   console.log(response);
  //   fetchActividad();
  // };

  const deleteActividad = async (id) => {
    try {
      const response = await axios.delete(`actividades/${id}`);
      console.log(response);
      return response;
    }
    catch (error) {
      console.log(error);
      console.log('error deleting actividad in the custom hooks');
    }
  };

  const completarActividadVendedor = async (id) => {

    try {
      const response = await axios.put(`actividades/completar/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }

  };

  // Fetch the actividad when the hook is mounted
  // useEffect(() => {
  //   fetchActividad();
  // }, []);

  // return { actividad, createActividadAndRefresh, updateActividadAndRefresh, deleteActividadAndRefresh };
  return { getActividadesByEmpleadoIdByBodyData, deleteActividad, getActividadesByEmpleado, completarActividadVendedor };
};

export default useActividad;
