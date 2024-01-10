import { useState, useEffect } from "react";
import { dispatch, useSelector } from "store";
import { setInitData } from "store/reducers/reportes";
import axios from "utils/axios";

const useReporteContactos = () => {

  const [contactos, setContactos] = useState([]);
  const currentUser = useSelector(state => state.user);

  useEffect(() => {

    const fetchContactos = async () => {

      try {

        const response = await axios.get(`/reportes/contactos/${currentUser.id}`);
        const data = response.data;

        dispatch(setInitData({ data: data.data ?? [] }));
        setContactos(data.data ?? []);

      } catch (error) {
        console.error('Reporte de contactos: ', error);
      }

    };

    fetchContactos();

  }, []);

  return { contactos };

};

export default useReporteContactos;
