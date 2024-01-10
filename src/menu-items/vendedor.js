// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  BorderOutlined,
  BoxPlotOutlined,
  ChromeOutlined,
  DeploymentUnitOutlined,
  GatewayOutlined,
  MenuUnfoldOutlined,
  QuestionOutlined,
  SmileOutlined,
  StopOutlined
} from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  MenuUnfoldOutlined,
  BoxPlotOutlined,
  StopOutlined,
  BorderOutlined,
  SmileOutlined,
  GatewayOutlined,
  QuestionOutlined,
  DeploymentUnitOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const vendedor = {
  id: 'vendedor',
  //title: <FormattedMessage id="vendedor" />,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: icons.ChromeOutlined
    },
    {
      id: 'contactos',
      title: <FormattedMessage id="contactos" />,
      type: 'item',
      url: '/contactos',
      icon: icons.ChromeOutlined
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
