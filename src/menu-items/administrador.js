import { FormattedMessage } from 'react-intl';

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
      id: 'configuracion-parametros-admin',
      title: "Configuración de Parámetros",
      type: 'item',
      url: '/confParametros',
      icon: icons.SettingOutlined
    },
    {
      id: 'bonificacion-gestionb-admiin',
      title: "Bonificación por Gestión",
      type: 'item',
      url: '/confBonificacionGestion',
      icon: icons.DollarOutlined
    },
    {
      id: 'ley-compensacion-admin',
      title: "Ley de Compensación",
      type: 'item',
      url: '/confLeyCompensacion',
      icon: icons.BookOutlined
    },
    {
      id: 'tabla-comision-admin',
      title: "Tablas de Comisiones",
      type: 'item',
      url: '/confTablaComisiones',
      icon: icons.TableOutlined
    },
    {
      id: 'anulacion-contratos-admin',
      title: "Anulación de Contratos",
      type: 'item',
      url: '/anulacionContratos',
      icon: icons.CloseCircleOutlined
    },
    {
      id: 'liquidacion-admin',
      title: "Liquidación",
      type: 'item',
      url: '/liquidacion',
      icon: icons.CalculatorOutlined
    }
  ]
};

export default administrador;
