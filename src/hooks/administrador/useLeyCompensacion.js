import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useLeyCompensacion = (anio) => {
    const [leyCompensacionBack, setLeyCompensacion] = useState();

    const createCompensacion = async (formData) => {
        try {
            const response = await axios.post('/administrador/leyCompensacion', formData);
            if (response.status === 201)
                setLeyCompensacion(response.data);
            else
                throw new Error('Error al configurar');
        } catch (error) {
            throw new Error('Error al configurar');
        }
    };

    const fetchLeyCompensacion = async () => {
        try {
            const response = await axios.get(`/administrador/leyCompensacion/${anio}`);
            response.data.map((row, index) => {
                delete row["id"]
            })
            setLeyCompensacion(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLeyCompensacion();
    }, []);

    return { leyCompensacionBack, createCompensacion };
};

export default useLeyCompensacion;