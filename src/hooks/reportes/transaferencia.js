import { useEffect } from "react";
import { dispatch, useSelector } from "store";
import { setInitData } from "store/reducers/reportes";
import axios from "utils/axios";

const useReporteTransferenciaContactos = () => {

  const currentUser = useSelector(state => state.user);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`/reportes/transferencia/${currentUser.id}`);
        const data = response.data;
        dispatch(setInitData({ data: data.data ?? [] }));
      } catch (error) {
        console.error('Reporte de transferencia de contactos: ', error);
      }
    };

    fetchData();

  }, []);


};

export default useReporteTransferenciaContactos;
