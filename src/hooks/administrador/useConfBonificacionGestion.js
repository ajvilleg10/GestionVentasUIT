import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useConfBonificacionGestionVendedor = () => {
  const [bonVendedor, setBonVendedor] = useState();

  const createBonVendedor = async (formData) => {
    try {
      const response = await axios.post('/administrador/confBonificacionGestion/vendedor', formData);
      response.data.map((dic) => { return delete dic["id"] });
      setBonVendedor(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBonVendedor = async () => {
    try {
      const response = await axios.get(`/administrador/confBonificacionGestion/vendedor`);
      response.data.map((dic) => { return delete dic["id"] });
      setBonVendedor(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBonVendedor();
  }, []);



  return { bonVendedor, createBonVendedor };
};

const useConfBonificacionGestionAsistenteVentas = () => {
  const [bonAV, setBonAV] = useState();

  const createBonAV = async (formData) => {
    try {
      const response = await axios.post('/administrador/confBonificacionGestion/asistenteVentas', formData);
      delete response.data["id"];
      setBonAV(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBonAV = async () => {
    try {
      const response = await axios.get(`/administrador/confBonificacionGestion/asistenteVentas`);
      delete response.data["id"];
      setBonAV(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBonAV();
  }, []);



  return { bonAV, createBonAV };
};

const useConfBonificacionGestionJefeVentas = () => {
  const [bonJV, setBonJV] = useState();

  const createBonJV = async (formData) => {
    try {
      const response = await axios.post('/administrador/confBonificacionGestion/jefeventas', formData);
      delete response.data["id"];
      setBonJV(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBonAV = async () => {
    try {
      const response = await axios.get(`/administrador/confBonificacionGestion/jefeventas`);
      delete response.data["id"];
      setBonJV(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBonAV();
  }, []);



  return { bonJV, createBonJV };
};

export { useConfBonificacionGestionVendedor, useConfBonificacionGestionAsistenteVentas, useConfBonificacionGestionJefeVentas };