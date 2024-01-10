import { useState, useEffect } from 'react';
import { useSelector } from 'store';
import axios from 'utils/axios';

const useGestionContactos = () => {

  const currentUser = useSelector((state) => state.user);
  const contacto = useSelector((state) => state.contactoSeleccionado);
  const [gestionContactosBack, setGestionContactosBack] = useState();

  const createGestionContactosBack = async (formData) => {
    const response = await axios.post('/vendedor/gestionContactos/gestion', formData);
    //setGestionContactosBack(response.data);
    if (response.status === 201)
      fetchGestionContactosBack();
    else
      throw new Error('Error al crear');
  };

  const deleteGestionContactosBack = async (formData) => {
    const response = await axios.post('/vendedor/gestionContactos/deleteGestion', formData);
    if (response.status === 200)
      await fetchGestionContactosBack();
    else if (response.status === 423)
      throw new Error('No es posible borrar la gestion');
    else
      throw new Error('Error al borrar la gestion');
  };

  const fetchGestionContactosBack = async () => {
    try {
      const response = await axios.post(`/vendedor/gestionContactos/gestionAll`, { "contacto": contacto.id, "vendedor": currentUser.id });
      setGestionContactosBack(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const validarNuevaObtenida = async () => {
    try {
      const response = await axios.post(`/vendedor/gestionContactos/validarNuevaObtenida`, { "contacto": contacto.id, "vendedor": currentUser.id });
      console.log(response.data)
      return response.data === true
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchGestionContactosBack();
  }, []);

  return { gestionContactosBack, createGestionContactosBack, deleteGestionContactosBack, validarNuevaObtenida };
};

const useCitasContactos = () => {

  const currentUser = useSelector((state) => state.user);
  console.log(currentUser.id);
  const contacto = useSelector((state) => state.contactoSeleccionado);
  const [citaContactosBack, setCitaContactosBack] = useState();

  const actualizarCitasBack = async (formData) => {
    const response = await axios.put('/vendedor/gestionContactos/citas', formData);
    if (response.status !== 201) {
      fetchCitaContactoBack();
      throw new Error('Error al actualizar');
    }
    fetchCitaContactoBack();
  };

  const fetchCitaContactoBack = async () => {
    try {
      const response = await axios.post(`/vendedor/gestionContactos/citasAll`, { "contacto": contacto.id, "vendedor": currentUser.id });
      setCitaContactosBack(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCitaContactoBack();
  }, []);

  return { citaContactosBack, actualizarCitasBack };
};

const useReferidos = () => {

  const currentUser = useSelector((state) => state.user);
  const contacto = useSelector((state) => state.contactoSeleccionado);
  const [referidosBack, setReferidosBack] = useState();

  const createReferidosBack = async (formData) => {
    const response = await axios.post('/vendedor/gestionContactos/referidoCreate', { ...formData, "contacto": contacto.id, "vendedor": currentUser.id });
    //setGestionContactosBack(response.data);
    if (response.status === 201)
      fetchReferidosBack();
    else
      throw new Error('Error al crear');
  };

  const fetchReferidosBack = async () => {
    try {
      const response = await axios.post(`/vendedor/gestionContactos/referidosAll`, { "contacto": contacto.id, "vendedor": currentUser.id });
      setReferidosBack(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReferidosBack();
  }, []);

  return { referidosBack, createReferidosBack };
};

const useReferidosExist = (telefono) => {

  const currentUser = useSelector((state) => state.user);

  const checkReferido = async (telefono) => {
    const response = await axios.post(`/vendedor/gestionContactos/referidoExists`, { "numero": telefono, "vendedor": currentUser.id });
    return response.data;
  };

  return { checkReferido };
};


export { useGestionContactos, useCitasContactos, useReferidos, useReferidosExist };
