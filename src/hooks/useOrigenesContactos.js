/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useOrigenesContactos = () => {
  const [origenes, setOrigenes] = useState([
    'Proyecto 100',
    'BCS',
    'Cita Nueva Concretada',
    'Cita Seguimiento',
    'Cita Cierre',
    'Cita Casual'
  ]);

  // TODO: Descomentar esto y usar un endpoint
  // useEffect(() => {
  //   const getEstados = async () => {
  //     const response = await axios.get('/estadosContactos');
  //     setEstados(response.data);
  //   };
  //   getEstados();
  // }, []);

  return origenes;
};

export default useOrigenesContactos;
