/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useTiposActividades = () => {

  const [tiposActividades, setTiposActividades] = useState(['Llamada agendada', 'Llamada pendiente']);

  // TODO: Descomentar esto y usar un endpoint
  // useEffect(() => {
  //   const getEstados = async () => {
  //     const response = await axios.get('/estadosContactos');
  //     setEstados(response.data);
  //   };
  //   getEstados();
  // }, []);

  return tiposActividades;
};

export default useTiposActividades;
