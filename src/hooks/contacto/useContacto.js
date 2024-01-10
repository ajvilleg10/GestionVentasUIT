import React, { useEffect, useState } from 'react'
import axios from 'utils/axios';
import useCurrentUser from 'hooks/useCurrentUser';
import { useDispatch } from 'store';
// import { useSelector } from 'store';
import { setInitialContactos } from 'store/reducers/transferenciaContactosSlice';

const useContacto = () => {
  // const [contactos, setContactos] = useState([]);
  // const { empleadoInfo, tipoCuentaInfo, cuentaInfo } = useCurrentUser();
  const dispatch = useDispatch();
  // const contactosr = useSelector((state) => state.transferenciaContactos.contactos);

  const getContactosFromDB = async (jefeVentaEmpleadoId) => {
    try {
      // console.log('cuentaInfo?.empleado_id', cuentaInfo?.empleado_id);
      const response = await axios.get(`contactos/jefeVentaEmpleadoId/${jefeVentaEmpleadoId}`);
      // console.log('response.data', response.data);
      // setContactos(response.data);

      dispatch(setInitialContactos(response.data));

    } catch (error) {
      console.log(error.message);
    }
  };

  const updateTransferirContactos = async (formData) => {
    try {
      const response = await axios.put(`/contactos/some`, formData)

      return response.data
    } catch (error) {
      console.log(error.message);
    }
  }

  // useEffect(() => {
  //   getContactosFromDB();
  // }, [cuentaInfo]);

  return { updateTransferirContactos, getContactosFromDB };

}

export default useContacto