import { useEffect } from "react";
import { dispatch, useSelector } from "store";
import { setInitData } from "store/reducers/reportes";
import axios from "utils/axios";

// TODO: cambiar la gestion por contratos
const useReporteContratos = () => {

  const currentUser = useSelector(state => state.user);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await axios.get(`/reportes/contratos/${currentUser.id}`);
        const data = response.data;

        dispatch(setInitData({ data: data.data ?? [] }));

      } catch (error) {
        console.error('Reporte de contratos: ', error);
      }

    };

    fetchData();

  }, []);

};

export default useReporteContratos;
