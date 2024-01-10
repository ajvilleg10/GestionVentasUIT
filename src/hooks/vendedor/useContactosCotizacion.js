import { useEffect, useState } from "react";
import { useSelector } from "store";
import axios from "utils/axios";

const useContactosCotizacion = () => {

  const [contactos, setContactos] = useState([]);
  const user = useSelector(state => state.user);

  useEffect(() => {

    const fetchContactos = async () => {
      try {

        const response = await axios.get(`/contactos/empleados/cotizacion/${user.id}`);
        setContactos(response.data);

      } catch (e) {

        console.error('Error en contactos para cotizacion', e);

      }
    }

    fetchContactos();

  }, []);

  return contactos;
};

export default useContactosCotizacion;
