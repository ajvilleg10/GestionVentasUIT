import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { dispatch } from 'store';
import { setUserType, setUserId, setTipoCuentaId, setCuentaId } from 'store/reducers/user';

// project import
import useAuth from 'hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // TODO: usar la info del usuario para mostrar solo las paginas necesarias

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('login', {
        state: {
          from: location.pathname
        },
        replace: true
      });
      navigate('login', { replace: true });
    } else {
      dispatch(setUserType({ userType: user?.tipo_cuenta?.nombre_tipo }));
      dispatch(setUserId({ userId: user?.empleado_id }));
      dispatch(setTipoCuentaId({ tipo_cuenta_id: user?.tipo_cuenta?.id }));
      dispatch(setCuentaId({ cuenta_id: user?.id }));
    }
  }, [isLoggedIn, navigate, location, user]);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
