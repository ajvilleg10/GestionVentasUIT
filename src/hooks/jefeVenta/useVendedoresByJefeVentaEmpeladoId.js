import { useEffect, useState } from "react";
import { useSelector } from "store";
import axios from "utils/axios";

const useVendedoresByJefeVentaEmpeladoId = () => {

  const user = useSelector(state => state.user);
  const [vendedores, setVendedores] = useState([]);

  useEffect(() => {

    const getVendedores = async () => {

      if (user.alias === 'vendedor') {
        console.log('Vendedor, no se hace la peticion');
        return;
      }

      try {
        const response = await axios.get(`/vendedores/jefeVentaEmpleadoId/${user.id}`);
        setVendedores(response.data);

        console.log('Vendedores jefe: ', response.data);

      } catch (error) {
        console.error('Error al obtener vendedores de jefe de ventas', error);
      }
    };

    getVendedores();

  }, [user])
  
  return vendedores;
}

export default useVendedoresByJefeVentaEmpeladoId;
