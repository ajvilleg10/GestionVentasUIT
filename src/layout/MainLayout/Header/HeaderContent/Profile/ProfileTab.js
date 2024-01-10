import PropTypes from 'prop-types';
import { useState } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { 
  LogoutOutlined, 
  UserOutlined,
  FormOutlined,
  FileOutlined
} from '@ant-design/icons';

import { useNavigate } from 'react-router';

const ProfileTab = ({ handleLogout, handleCloseMenu }) => {

  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (_, index, route) => {

    setSelectedIndex(index);
    handleCloseMenu();

    navigate(`/informacion/${route}`, {
      state: {
        tab: index 
      }
    });

  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton onClick={(event) => handleListItemClick(event, 0, 'descripcionGeneral')}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Información general" />
      </ListItemButton>
      <ListItemButton onClick={(event) => handleListItemClick(event, 1, 'informacionDeRegistro')}>
        <ListItemIcon>
          <FormOutlined />
        </ListItemIcon>
        <ListItemText primary="Información de registro" />
      </ListItemButton>
      <ListItemButton onClick={(event) => handleListItemClick(event, 2, 'documentosContractuales')}>
        <ListItemIcon>
          <FileOutlined />
        </ListItemIcon>
        <ListItemText primary="Documentos contractuales" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 3} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Cerrar sesión" />
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func
};

export default ProfileTab;
