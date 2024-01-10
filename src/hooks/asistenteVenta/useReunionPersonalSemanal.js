import axios from 'utils/axios';
import { reunionPersonalSemanalFormat, reunionPersonalSemanalFormatItem, createJefeconVendedores } from 'utils/reunionFormat';
import { addReunionesRPS, setInitialReunionesRPS, setInitialSize } from 'store/reducers/reunionesRPSSlice';
import { useSelector, useDispatch } from 'store';
import { useEffect } from 'react';


const useReunionPersonalSemanal = () => {

  // const reuniones = useSelector((state) => state.reunion.reunionesRPS);
  // console.log('reuniones111', reuniones);
  const size = useSelector((state) => state.reunion.size);
  const dispatch = useDispatch();

  const createReunionPersonalSemanal = async (formData) => {
    try {
      const response = await axios.post('/reuniones/reunionesRPS', formData);
      // console.log('response.data', response.data);
      const reunion = reunionPersonalSemanalFormatItem(response.data, size + 1);
      console.log('reunion hook', reunion);
      dispatch(addReunionesRPS(reunion));
      // getAllReunionesRPS();
      
    } catch (error) {
      console.log(error);
    }


  };

  const getAllReunionesRPS = async () => {
    try {
      const response = await axios.get('/reuniones/reunionesRPS');

      const reuniones = reunionPersonalSemanalFormat(response.data);
      // dispatch(setInitialReunionesRPS(reuniones));
      // dispatch(setInitialSize(reuniones.length));
      // console.log('reuniones is, hook', reuniones);
      // console.log('reponse.data', response.data);
      // const startTime = window.performance.now();
      // const endTime = window.performance.now();
      // console.log('time', endTime - startTime);

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

  const deleteReunionesRPS = async (id) => {
    try {
      const response = await axios.delete(`/reuniones/reunionesRPS/${id}`);
      console.log(`deleted reunion with ID ${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const sendMailWhenUpdate = async (id) => {
    try {
      const response = await axios.post(`/reuniones/reunionesRPS/sendMail/${id}`);
      console.log('response.data', response.data);
      return response.data;
      
    } catch (error) {
      console.log(error);
    }
  }

  // fetch the reuniones list when the hook is mounted
  // useEffect(() => {
    
  //   getAllReunionesRPS();
    
  // }, []);

  const updateReunionesRPS = async (id, formData) => {
    console.log('update', id,  formData);
    try {
      const response = await axios.put(`/reuniones/reunionesRPS/${id}`, formData);

      return response.data;
      
    } catch (error) {
      console.log(error);
    }
  }

  return { 
    createReunionPersonalSemanal, 
    getAllReunionesRPS, 
    createJefeConVendedores,
    deleteReunionesRPS,
    updateReunionesRPS,
    sendMailWhenUpdate
  };
};

export default useReunionPersonalSemanal;

