import { useState, useEffect } from "react";
import { useSelector } from "store";
import axios from "utils/axios";

const useReporteContactos = () => {

  const [contactos, setContactos] = useState([]);
  const currentUser = useSelector(state => state.user);

  useEffect(() => {

    const fetchContactos = async () => {

      try {

        const response = await axios.get(`/contactos/empleados/${currentUser.id}`);
        const data = response.data;
        console.log(data);
        setContactos(data);

      } catch (error) {

        console.error('Reporte de contactos: ', error);

      }

    };

    fetchContactos();

  }, []);

  return { contactos };

};

export default useReporteContactos;
