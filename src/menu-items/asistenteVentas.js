// assets
import { DashboardOutlined, BookOutlined, CalendarOutlined, LineChartOutlined,UsergroupAddOutlined, CheckCircleOutlined, SolutionOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

// ==============================|| MENU ITEMS - SUPPORT ||============================== //
const icons = {
  DashboardOutlined,
  BookOutlined,
  CalendarOutlined,
  LineChartOutlined,
  UsergroupAddOutlined,
  CheckCircleOutlined,
  SolutionOutlined,
  VideoCameraOutlined
};

const asistenteVentas = {
  id: 'asistenteVentas',
  title: <FormattedMessage id="asistenteVentas" />,
  type: 'group',
  children: [
    {
      id: 'dashboard-asistente',
      title: 'Dashboard',
      type: 'item',
      url: '/asistente/dashboard',
      icon: icons.DashboardOutlined
    },
    {
      id: 'registro-prospectos',
      title: 'Prospectos Vendedores',
      type: 'item',
      url: '/registro/prospectos',
      icon: icons.UsergroupAddOutlined
    },
    {
      id: 'citas-nuevas-concretadas',
      title: 'Verificación De Citas',
      type: 'item',
      url: '/verificacionCitas',
      icon: icons.CheckCircleOutlined
    },
    {
      id: 'capacitacion-inicial',
      title: 'Capacitación Inicial',
      type: 'item',
      url: '/capacitacionInicial',
      icon: icons.VideoCameraOutlined
    },
    {
      id: 'reunion-personal-semanal',
      title: 'Reunion Personal Semanal',
      type: 'item',
      url: '/reunionPersonalSemanal',
      icon: icons.CalendarOutlined
    },
    {
      id: 'comite-semanal-gerencial',
      title: 'Comité Semanal Gerencial',
      type: 'item',
      url: '/comiteSemanalGerencial',
      icon: icons.SolutionOutlined
    },
    {
      id: 'gestion-quincenal',
      title: 'Capacitación Quincenal',
      type: 'item',
      url: '/gestionQuincenal',
      icon: icons.BookOutlined
    },
    {
      id: 'gestion-mensual',
      title: 'Comité Mensual de Ventas',
      type: 'item',
      url: '/gestionMensual',
      icon: icons.LineChartOutlined
    },
    // {
    //   id: 'asistente-reportes',
    //   title: 'Reportes',
    //   type: 'collapse',
    //   icon: icons.SketchOutlined,
    //   children: [
    //     {
    //       id: 'asistente-reportes-vendedores',
    //       title: 'Vendedores',
    //       type: 'item',
    //       url: '/asistente/reportes/vendedor'
    //     }
    //   ]
    // },
  ]
};

export default asistenteVentas;
