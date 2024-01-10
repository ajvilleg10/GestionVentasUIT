import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { dispatch } from 'store';
import { setTipoCuentaId, setCuentaId, setEmpleadoInfo, setNombreCompleto } from 'store/reducers/user';
import useAuth from 'hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //

// TODO: usar la info del usuario para mostrar solo las paginas necesarias
const AuthGuard = ({ children }) => {

  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    if (!isLoggedIn) {

      navigate('login', {
        state: {
          from: location.pathname
        },
        replace: true
      });

    } else {

      if(location.state?.from === '') dispatch(setNombreCompleto({ nombres: user?.empleadoInfo?.nombres, apellidos: user?.empleadoInfo?.apellidos }));
      dispatch(setCuentaId({ cuenta_id: user?.id }));
      dispatch(setTipoCuentaId({
        tipo_cuenta_id: user?.tipo_cuenta?.id,
        userType: user?.tipo_cuenta?.nombre_tipo,
        alias: user?.tipo_cuenta?.alias
      }));
      dispatch(setEmpleadoInfo({
        empleadoInfo: user?.empleadoInfo,
        userId: user?.empleado_id
      }));

    }
  }, [isLoggedIn, navigate, location, user]);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
