// project import
import { useSelector } from 'store';
import { FormattedMessage } from 'react-intl';
import { Box } from '@mui/material';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerUserType = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      {user?.type === null ? <Box/>: <FormattedMessage id={user?.type} />}
    </>
  );
};

export default DrawerUserType;