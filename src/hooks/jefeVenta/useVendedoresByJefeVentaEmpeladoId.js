import useCurrentUser from "hooks/useCurrentUser";
import { useEffect, useState } from "react";
import axiosServices from "utils/axios";

const useVendedoresByJefeVentaEmpeladoId = () => {
  const [vendedores, setVendedores] = useState([]);
  const { empleadoInfo, tipoCuentaInfo, cuentaInfo } = useCurrentUser();

  useEffect(() => {
    const getVendedores = async () => {
      try {
        // console.log('vendedores by jefe venta empleado id');
        // console.log('cuentaInfo?.empleado_id', cuentaInfo?.empleado_id);
        const response = await axiosServices.get(`/vendedores/jefeVentaEmpleadoId/${cuentaInfo?.empleado_id}`);
        // console.log('vendedoresss', response.data);
        setVendedores(response.data);

      } catch (error) {
        console.log(error);
      }
    };
    getVendedores();
  }, [cuentaInfo])
  
  return vendedores;
}

export default useVendedoresByJefeVentaEmpeladoId