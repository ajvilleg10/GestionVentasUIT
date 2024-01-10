import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'utils/axios';

const useCitasConcretadas = () => {

    const currentUser = useSelector((state) => state.user);
    const [citasConcretadasBack, setCitasConcretadasBack] = useState();
  
    const fetchCitaConcretadaBack = async () => {
      try {
        const response = await axios.post(`/asistenteVenta/verificacionCitas/citasAll`, { "asistente": currentUser.id });
        setCitasConcretadasBack(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
        fetchCitaConcretadaBack();
    }, []);
  
    return { citasConcretadasBack, fetchCitaConcretadaBack };
  };

  
export {useCitasConcretadas};