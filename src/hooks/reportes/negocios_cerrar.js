import { useEffect } from "react";
import { dispatch, useSelector } from "store";
import { setInitData } from "store/reducers/reportes";
import axios from "utils/axios";

// TODO: cambiar la gestion por negocios por cerrar
const useReporteNegociosPorCerrar = () => {

  const currentUser = useSelector(state => state.user);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await axios.get(`/reportes/negocios/${currentUser.id}`);
        const data = response.data;

        dispatch(setInitData({ data: data.data ?? [] }));

      } catch (error) {
        console.error('Reporte de negocios por cerrar: ', error);
      }

    };

    fetchData();

  }, []);

};

export default useReporteNegociosPorCerrar;
