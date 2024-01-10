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

const administrador = {
  id: 'administrador',
  //title: <FormattedMessage id="prospectoVendedor" />,
  type: 'group',
  children: [
    /*{
      id: 'welcome',
      title: <FormattedMessage id="welcome" />,
      type: 'item',
      url: '/welcome',
      icon: icons.ChromeOutlined
    },*/
    {
      id: 'registro_usuario',
      title: <FormattedMessage id="Registro de Usuario" />,
      type: 'item',
      url: '/registroUsuario',
      icon: icons.ChromeOutlined
    },
    {
      id: 'welcome0',
      title: <FormattedMessage id="Configuración de Parámetros" />,
      type: 'item',
      url: '/confParametros',
      icon: icons.ChromeOutlined
    },
    {
      id: 'welcome1',
      title: <FormattedMessage id="Bonificación por Gestión" />,
      type: 'item',
      url: '/confBonificacionGestion',
      icon: icons.ChromeOutlined
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
