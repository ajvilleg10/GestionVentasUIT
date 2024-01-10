import { useState, useEffect } from 'react';
import axios from 'utils/axios';
import useCurrentUser from './useCurrentUser';

const useContactosProyecto100 = () => {

  const user = useCurrentUser();
  const [contactos, setContactos] = useState([]);
  const [isProyecto100Enviado, setIsProyecto100Enviado] = useState(false);

  const fetchContactosProyecto100 = async () => {

    if (!user?.empleadoInfo) return;

    try {
      const response = await axios.get(`/contactos/empleados/${user?.empleadoInfo?.id}`);
      setContactos(response.data);
    } catch (error) {

      console.log(error);

    }
  };

  const addContacto = async (newContact) => {

    console.log('empleado_id: ', user.empleadoInfo.id);
    await axios.post('/contactos', {
      ...newContact,
      origen_contacto: 'Proyecto 100',
      empleado_id: user.empleadoInfo.id,
      estado_contacto_id: 1
    });

    fetchContactosProyecto100();
  };

  const fetchActividad = async () => {

    if (!user?.empleadoInfo) return;

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

    //Crea notificacion
    //tipo_cuenta_id de jefe de ventas
    const tipo_cuenta_jefe_ventas_id = 5;

    await axios.post('/notificaciones', {
      mensaje: `El empleado ${user?.empleadoInfo?.nombres + ' ' + user?.empleadoInfo?.apellidos} ha enviado el proyecto 100`,
      tipo_cuenta_id: tipo_cuenta_jefe_ventas_id,
      empleado_id: user.empleadoInfo.jefe_venta.empleado_id
    });

    await fetchActividad();
  };

  useEffect(() => {

    fetchContactosProyecto100();
    fetchActividad();

  }, [user]);

  return { contactos, addContacto, enviarContactos, isProyecto100Enviado };
};

export default useContactosProyecto100;
