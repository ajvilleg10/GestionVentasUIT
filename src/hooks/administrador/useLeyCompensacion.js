import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useLeyCompensacion = () => {
    const [leyCompensacionBack, setLeyCompensacion] = useState();

    const createConfParametros = async (formData) => {
        try {
            const response = await axios.post('/administrador/leyCompensacion', formData);
            setLeyCompensacion(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchLeyCompensacion = async () => {
        try {
            const response = await axios.get(`/administrador/leyCompensacion`);
            delete response.data["id"];
            setLeyCompensacion(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLeyCompensacion();
    }, []);

    return { leyCompensacionBack, createConfParametros };
};

export default useLeyCompensacion;