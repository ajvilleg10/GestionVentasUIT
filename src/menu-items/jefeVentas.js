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

const jefeVentas = {
  id: 'jefeVentas',
  title: <FormattedMessage id="jefeVentas" />,
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
      id: 'actividadesPendientesJefeVentas',
      title: 'Actividades Pendientes',
      type: 'item',
      url: '/actividadesPendientesJefeVentas',
      icon: icons.ChromeOutlined
    },
    {
      id: 'reunionPersonalSemanal',
      title: 'Reunion Personal Semanal',
      type: 'item',
      url: '/reunionPersonalSemanalJefeVentas',
      icon: icons.ChromeOutlined
    },
  ]
};

export default jefeVentas;
