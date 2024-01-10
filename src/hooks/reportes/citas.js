import { useEffect } from "react";
import { dispatch, useSelector } from "store";
import { setInitData } from "store/reducers/reportes";
import axios from "utils/axios";

const useReporteCitas = () => {

  const currentUser = useSelector(state => state.user);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await axios.get(`/reportes/citas/${currentUser.id}`);
        const data = response.data;

        console.log('data', data);
        dispatch(setInitData({ data: data.data ?? [] }));

      } catch (error) {
        console.error('Reporte de citas: ', error);
      }

    };

    fetchData();

  }, []);

};

export default useReporteCitas;
