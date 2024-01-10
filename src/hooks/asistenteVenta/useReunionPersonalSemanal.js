import axios from 'utils/axios';
import { reunionPersonalSemanalFormat, reunionPersonalSemanalFormatItem, createJefeconVendedores } from 'utils/reunionFormat';
import { addReunion, setInitialReuniones, setInitialSize } from 'store/reducers/reunionSlice';
import { useSelector, useDispatch } from 'store';
import { useEffect } from 'react';


const useReunionPersonalSemanal = () => {
  const size = useSelector((state) => state.reunion.size);
  // console.log('reuniones111', reuniones);
  const dispatch = useDispatch();

  const createReunionPersonalSemanal = async (formData) => {
    const response = await axios.post('/reuniones/createReunionRPS', formData);
    // const reunion = reunionPersonalSemanalFormatItem(response.data, size + 1);
    // dispatch(addReunion(reunion));
    getAllReunionesRPS();

  };

  const getAllReunionesRPS = async () => {
    try {
      const response = await axios.get('/reuniones/getAllReunionesRPS');
      const reuniones = reunionPersonalSemanalFormat(response.data);
      dispatch(setInitialReuniones(reuniones));
      dispatch(setInitialSize(reuniones.length));
      return reuniones;
      
    } catch (error) {
      console.log(error);
    }
  };

  const createJefeConVendedores = async () => {
    try {
      const jefeVentasResponse = await axios.get('/empleados/jefesVentas');
      const vendedoresResponse = await axios.get('/vendedores');
      const jefeConVendedores = createJefeconVendedores(jefeVentasResponse.data, vendedoresResponse.data);
      
      return jefeConVendedores;
    } catch (error) {
      console.log(error);
    }
  }

  // fetch the reuniones list when the hook is mounted
  useEffect(() => {
    getAllReunionesRPS();
  }, []);

  return { createReunionPersonalSemanal, getAllReunionesRPS, createJefeConVendedores };
};

export default useReunionPersonalSemanal;

