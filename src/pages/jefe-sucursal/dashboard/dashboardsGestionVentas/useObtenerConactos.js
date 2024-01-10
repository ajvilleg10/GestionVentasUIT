import { useState } from 'react';
import axios from 'utils/axios';

const useObtenerContactosIdVendedor = (id) => {
  const [contactos, setContactos] = useState([]);

  const fetchContactos = async () => {
    try {
      const response = await axios.get(`/contactos/empleados/${id}`);
      setContactos(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchContactos();
  return contactos;
};

export default useObtenerContactosIdVendedor;
