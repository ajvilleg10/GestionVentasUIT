// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { AppstoreOutlined, ContactsOutlined, ChromeOutlined } from '@ant-design/icons';

// icons
const icons = { AppstoreOutlined, ContactsOutlined, ChromeOutlined };

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const vendedor = {
  id: 'vendedor',
  title: <FormattedMessage id="vendedor" />,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: icons.AppstoreOutlined
    },
    {
      id: 'contactos',
      title: <FormattedMessage id="contactos" />,
      type: 'item',
      url: '/contactos',
      icon: icons.ContactsOutlined
    },
    {
      id: 'actividadesPendientes',
      title: 'Actividades Pendientes',
      type: 'item',
      url: '/actividadesPendientes',
      icon: icons.ChromeOutlined
    }
  ]
};

export default vendedor;
