import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'utils/axios';

const useGestionVentas = ({ mes, anio }) => {
    const [gestionesBack, setGestionesBack] = useState({});
    const user = useSelector((state) => state.user);

    const fetchGestiones = async ({ mes = mes, anio = anio }) => {
        try {
            const response = await axios.post('', { empleado: user.id, anio: anio, mes: mes });
            setGestionesBack(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchGestiones();
    }, []);

    return {gestionesBack, fetchGestiones}

}

export { useGestionVentas };