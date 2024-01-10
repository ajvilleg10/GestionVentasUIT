// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  UserAddOutlined,
  SettingOutlined,
  DollarOutlined,
  BookOutlined,
  TableOutlined,
  CloseCircleOutlined,
  CalculatorOutlined
} from '@ant-design/icons';

// ==============================|| MENU ITEMS - SUPPORT ||============================== //
const icons = {
  UserAddOutlined,
  SettingOutlined,
  DollarOutlined,
  BookOutlined,
  TableOutlined,
  CloseCircleOutlined,
  CalculatorOutlined,
};

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
      icon: icons.BookOutlined
    },
    {
      id: 'welcome4',
      title: <FormattedMessage id="Tablas de Comisiones" />,
      type: 'item',
      url: '/confTablaComisiones',
      icon: icons.TableOutlined
    },
    {
      id: 'welcome6',
      title: <FormattedMessage id="Anulación de Contratos" />,
      type: 'item',
      url: '/anulacionContratos',
      icon: icons.CloseCircleOutlined
    },
    {
      id: 'welcome7',
      title: "Liquidación",
      type: 'item',
      url: '/liquidacion',
      icon: icons.CalculatorOutlined
    }
  ]
};

export default administrador;
