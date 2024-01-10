import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useTablaComisionesJefe = () => {
    const [tablaComisionesJ, setTablaComisionesJ] = useState();

    const createTablaComisionesJ = async (formData) => {
        try {
            const response = await axios.post('/administrador/tablaComisiones/JefeVentas', formData);
            response.data.map((dic) => { return delete dic["id"] });
            setTablaComisionesJ(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTablaComisionesJ = async () => {
        try {
            const response = await axios.get(`/administrador/tablaComisiones/JefeVentas`);
            response.data.map((dic) => { return delete dic["id"] });
            setTablaComisionesJ(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTablaComisionesJ();
    }, []);



    return { tablaComisionesJ, createTablaComisionesJ };
};

const useTablaComisionesVendedor = () => {
    const [tablaComisionesV, setTablaComisionesV] = useState();

    const createTablaComisionesV = async (formData) => {
        try {
            const response = await axios.post('/administrador/tablaComisiones/Vendedor', formData);
            response.data.map((dic) => { return delete dic["id"] });
            setTablaComisionesV(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTablaComisionesV = async () => {
        try {
            const response = await axios.get(`/administrador/tablaComisiones/Vendedor`);
            response.data.map((dic) => { return delete dic["id"] });
            setTablaComisionesV(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTablaComisionesV();
    }, []);



    return { tablaComisionesV, createTablaComisionesV };
};

export { useTablaComisionesJefe, useTablaComisionesVendedor };