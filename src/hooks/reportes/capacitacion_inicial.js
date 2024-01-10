import { useEffect } from "react";
import { dispatch, useSelector } from "store";
import { setInitData } from "store/reducers/reportes";
import axios from "utils/axios";

const useReporteCapacitacionInicial = () => {

  const currentUser = useSelector(state => state.user);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`/reportes/capacitaciones/${currentUser.id}`);
        const data = response.data;
        dispatch(setInitData({ data: data.data ?? [] }));
      } catch (error) {
        console.error('Reporte de capacitaciones iniciales: ', error);
      }
    };

    fetchData();

  }, []);


};

export default useReporteCapacitacionInicial;
