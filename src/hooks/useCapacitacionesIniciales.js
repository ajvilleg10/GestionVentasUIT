import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useCapacitacionesIniciales = () => {
  const [capacitacionesIniciales, setCapacitacionesIniciales] = useState([]);

  const fetchCapacitacionesIniciales = async () => {
    try {
      const response = await axios.get('/capacitacionesIniciales');
      console.log(response.data);
      setCapacitacionesIniciales(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createCapacitacionInicialAndRefresh = async (formData) => {
    const response = await axios.post('/capacitacionesIniciales', formData);
    console.log(response);
    fetchCapacitacionesIniciales();
  };

  const searchCapacitacionInicial = async (params) => {
    try {
      const response = await axios.get('/capacitacionesIniciales');
      console.log(response.data);
      console.log(params);
      setCapacitacionesIniciales(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCapacitacionInicial = async (id) => {
    try {
      const response = await axios.delete(`/capacitacionesIniciales/${id}`);
      console.log(response);
      return response;
    }
    catch (error) {
      console.log(error);
      console.log('error deleting capacitacionInicial in the custom hooks');
    }
    
    
  };

  // Fetch the prospectos vendedores list when the hook is mounted
  useEffect(() => {
    fetchCapacitacionesIniciales();
  }, []);

  return { capacitacionesIniciales, createCapacitacionInicialAndRefresh, searchCapacitacionInicial, deleteCapacitacionInicial };
};

export default useCapacitacionesIniciales;
