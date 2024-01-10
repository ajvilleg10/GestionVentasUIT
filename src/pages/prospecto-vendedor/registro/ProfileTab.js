/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { LockOutlined } from '@ant-design/icons';

function getPathIndex(pathname) {
  let selectedTab = 0;
  switch (pathname) {
    case '/registro/cambiarContrasena':
    default:
      selectedTab = 0;
  }
  return selectedTab;
}

// ==============================|| USER PROFILE - TAB ||============================== //

const ProfileTab = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selectedIndex, setSelectedIndex] = useState(getPathIndex(pathname));
  const handleListItemClick = (index, route) => {
    setSelectedIndex(index);
    navigate(route);
  };

  useEffect(() => {
    setSelectedIndex(getPathIndex(pathname));
  }, [pathname]);

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(0, '/registro/cambiarContrasena')}>
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText primary={<FormattedMessage id="cambiarContrasena" />} />
      </ListItemButton>
    </List>
  );
};

export default ProfileTab;
