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
  StopOutlined,
  UserAddOutlined,
  SettingOutlined,
  DollarOutlined
} from '@ant-design/icons';

// icons
const icons = {
  UserAddOutlined,
  SettingOutlined,
  DollarOutlined,
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

// TODO: Incluir todos los id: dentro del archivo en.json - utils/locales/en.json
const administrador = {
  id: 'administrador',
  title: <FormattedMessage id="administrador" />,
  type: 'group',
  children: [
    {
      id: 'registro-usuario',
      title: "Registro de Usuario",
      type: 'item',
      url: '/admin/registro/usuarios',
      icon: icons.UserAddOutlined
    },
    {
      id: 'welcome0',
      title: <FormattedMessage id="Configuración de Parámetros" />,
      type: 'item',
      url: '/confParametros',
      icon: icons.SettingOutlined
    },
    {
      id: 'welcome1',
      title: <FormattedMessage id="Bonificación por Gestión" />,
      type: 'item',
      url: '/confBonificacionGestion',
      icon: icons.DollarOutlined
    },
    {
      id: 'welcome3',
      title: <FormattedMessage id="Ley de Compensación" />,
      type: 'item',
      url: '/confLeyCompensacion',
      icon: icons.ChromeOutlined
    },
    {
      id: 'welcome4',
      title: <FormattedMessage id="Tablas de Comisiones" />,
      type: 'item',
      url: '/confTablaComisiones',
      icon: icons.ChromeOutlined
    },
    {
      id: 'welcome6',
      title: <FormattedMessage id="Anulación de Contratos" />,
      type: 'item',
      url: '/anulacionContratos',
      icon: icons.ChromeOutlined
    }
  ]
};

export default administrador;
