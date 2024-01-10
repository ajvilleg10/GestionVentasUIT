import { useState, useEffect } from 'react';
import axios from 'utils/axios';
import useCurrentUser from './useCurrentUser';

const useContactosProyecto100 = () => {
  const user = useCurrentUser();
  const [contactos, setContactos] = useState([]);
  const [isProyecto100Enviado, setIsProyecto100Enviado] = useState(false);

  const fetchContactosProyecto100 = async () => {
    try {
      const response = await axios.get(`/contactos/empleados/${user?.empleadoInfo?.id}`);
      setContactos(response.data);
      console.log("s");
    } catch (error) {
      console.log(error);
    }
  };

  const addContacto = async (newContact) => {
    await axios.post('/contactos', {
      ...newContact,
      origen_contacto: 'Proyecto 100',
      empleado_id: user.empleadoInfo.id,
      estado_contacto_id: 1
    });
    fetchContactosProyecto100();
  };

  const fetchActividad = async () => {
    const response = await axios.get(`/actividades/proyecto100/${user?.empleadoInfo?.id}`);
    console.log(response);
    if (response.data !== null) {
      setIsProyecto100Enviado(true);
    }
  };

  const enviarContactos = async () => {
    await axios.post('/actividades', {
      tipo_actividad: 'Contactos',
      pre_aprobada: false,
      aprobada: false,
      origen: 'Proyecto 100',
      empleado_id: user.empleadoInfo.id
    });
    await axios.post('/notificaciones', {
      mensaje: `Proyecto 100 enviado por ${user?.empleadoInfo?.nombres + ' ' + user?.empleadoInfo?.apellidos}`,
      tipo_cuenta_id: 4
    });
    await fetchActividad();
  };

  useEffect(() => {
    fetchContactosProyecto100();
    fetchActividad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { contactos, addContacto, enviarContactos, isProyecto100Enviado };
};

export default useContactosProyecto100;
