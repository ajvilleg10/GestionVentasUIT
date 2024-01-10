import { useEffect } from "react";
import { dispatch, useSelector } from "store";
import { setInitData } from "store/reducers/reportes";
import axios from "utils/axios";

const useReporteReuniones = ({ tipo_reunion }) => {

  const currentUser = useSelector(state => state.user);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`/reportes/reuniones/${currentUser.id}`, { params: { tipo_reunion } });
        const data = response.data;
        dispatch(setInitData({ data: data.data ?? [] }));
      } catch (error) {
        console.error(`Reporte de reuniones: ${tipo_reunion}`, error);
      }
    };

    fetchData();

  }, []);


};

export default useReporteReuniones;
