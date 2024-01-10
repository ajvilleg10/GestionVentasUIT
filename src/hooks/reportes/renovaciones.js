import { useEffect } from "react";
import { dispatch, useSelector } from "store";
import { setInitData } from "store/reducers/reportes";
import axios from "utils/axios";

const useReporteRenovaciones = () => {

  const currentUser = useSelector(state => state.user);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`/reportes/gestion/${currentUser.id}`);
        const data = response.data;
        dispatch(setInitData({ data: data.data ?? [] }));
      } catch (error) {
        console.error('Reporte de renovaciones: ', error);
      }
    };

    fetchData();

  }, []);


};

export default useReporteRenovaciones;
