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

const prospectoVendedor = {
  id: 'prospectoVendedor',
  //title: <FormattedMessage id="prospectoVendedor" />,
  type: 'group',
  children: [
    {
      id: 'welcome',
      title: <FormattedMessage id="welcome" />,
      type: 'item',
      url: '/welcome',
      icon: icons.ChromeOutlined
    },
    {
      id: 'registro',
      title: <FormattedMessage id="registro" />,
      type: 'item',
      url: '/registro',
      icon: icons.ChromeOutlined
    },
    {
      id: 'proyecto100',
      title: <FormattedMessage id="proyecto100" />,
      type: 'item',
      url: '/proyecto100',
      icon: icons.ChromeOutlined
    }
  ]
};

export default prospectoVendedor;
