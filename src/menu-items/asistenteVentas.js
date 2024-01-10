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

const asistenteVentas = {
  id: 'asistenteVentas',
  //title: <FormattedMessage id="asistenteVentas" />,
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
      id: 'registro-prospectos',
      title: 'Prospectos Vendedores',
      type: 'item',
      url: '/registro/prospectos',
      icon: icons.ChromeOutlined
    },
    {
      id: 'verificacion-citas',
      title: 'Verificación de Citas Nuevas Concretadas',
      type: 'item',
      url: '/verificacionCitas',
      icon: icons.ChromeOutlined
    },
    {
      id: 'capacitacion-inicial',
      title: 'Capacitación Inicial',
      type: 'item',
      url: '/capacitacionInicial',
      icon: icons.ChromeOutlined
    },
    {
      id: 'reunion-personal-semanal',
      title: 'Reunion Personal Semanal',
      type: 'item',
      url: '/reunionPersonalSemanal',
      icon: icons.ChromeOutlined
    },
    {
      id: 'gestion-quincenal',
      title: 'Gestión Quincenal',
      type: 'item',
      url: '/gestionQuincenal',
      icon: icons.ChromeOutlined
    },
    {
      id: 'gestion-mensual',
      title: 'Gestión Mensual',
      type: 'item',
      url: '/gestionMensual',
      icon: icons.ChromeOutlined
    }
  ]
};

export default asistenteVentas;
