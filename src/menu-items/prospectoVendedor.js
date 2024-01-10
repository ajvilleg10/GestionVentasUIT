// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { AppstoreOutlined, IdcardOutlined, FileDoneOutlined } from '@ant-design/icons';

// icons
const icons = {
  IdcardOutlined,
  FileDoneOutlined,
  AppstoreOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const prospectoVendedor = {
  id: 'prospectoVendedor',
  //title: <FormattedMessage id="prospectoVendedor" />,
  type: 'group',
  children: [
    {
      id: 'registro',
      title: <FormattedMessage id="registro" />,
      type: 'item',
      url: '/registro',
      icon: icons.IdcardOutlined
    },
    {
      id: 'proyecto100',
      title: <FormattedMessage id="proyecto100" />,
      type: 'item',
      url: '/proyecto100',
      icon: icons.FileDoneOutlined
    }
  ]
};

export default prospectoVendedor;
