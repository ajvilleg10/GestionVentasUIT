import { useEffect, useState } from "react";
import { useSelector } from "store";
import axios from "utils/axios";

const useCotizaciones = () => {

  const [cotizaciones, setCotizaciones] = useState([]);
  const contacto = useSelector(state => state.contactoSeleccionado);

  useEffect(() => {

    const fetchCotizaciones = async () => {
      try {

        const response = await axios.get(`/contactos/cotizaciones/${contacto.id}`);
        setCotizaciones(response.data);

      } catch (e) {

        console.error('Error al obtener las cotizaciones de un contacto', e);

      }
    }

    fetchCotizaciones();

  }, []);

  return cotizaciones;
};

export default useCotizaciones;
