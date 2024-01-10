import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'utils/axios';

const useContactos = () => {

  const [contactosBack, setContactos] = useState([]);
  const [statsBack, setStatsBack] = useState({ citas_concreatadas: 7, contratos_cerrar: 80, cita: 7, contactos_referidos: 4 })
  const user = useSelector((state) => state.user);

  const fetchContactos = async ({ nombres = '', apellidos = '', cleanedPhoneNumber = '', origen = '', estadoId = '' }) => {
    try {
      const response = await axios.get(`/contactos/empleados/${user.id}?nombres=${nombres}&apellidos=${apellidos}&numero_celular=${cleanedPhoneNumber}&parentezco=&origen_contacto=${origen}&estado_contacto_id=${estadoId}`
      );
      setContactos(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  const fetchStats = async ({ nombres = '', apellidos = '', cleanedPhoneNumber = '', origen = '', estadoId = '' }) => {
    try {
      const response = await axios.get(`/contactos/empleados/${user.id}?nombres=${nombres}&apellidos=${apellidos}&numero_celular=${cleanedPhoneNumber}&parentezco=&origen_contacto=${origen}&estado_contacto_id=${estadoId}`
      );
      setContactos(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  const createContactos = async (formdata) => {
    try {
      const response = await axios.post('/contactos/', { ...formdata, "empleado_id": user.id });
      await fetchContactos({ nombres: '', apellidos: '', cleanedPhoneNumber: '', origen: '', estadoId: '' });
    } catch (e) {
      throw e;
    }
  }

  useEffect(() => {
    fetchContactos({ nombres: '', apellidos: '', cleanedPhoneNumber: '', origen: '', estadoId: '' })
    //fetchStats()
  }, []);

  return { contactosBack, statsBack, createContactos, fetchContactos };
};

export default useContactos;
