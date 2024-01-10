// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IdcardOutlined, ProjectOutlined } from '@ant-design/icons';

// ==============================|| MENU ITEMS - SUPPORT ||============================== //
const icons = {
  IdcardOutlined,
  ProjectOutlined
};

const prospectoVendedor = {
  id: 'prospectoVendedor',
  title: <FormattedMessage id="prospectoVendedor" />,
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
      icon: icons.ProjectOutlined
    }
  ]
};

export default prospectoVendedor;
