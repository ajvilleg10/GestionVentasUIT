// assets
import { AppstoreOutlined, BookOutlined, ChromeOutlined, SketchOutlined } from '@ant-design/icons';
// icons
const icons = { AppstoreOutlined, BookOutlined, ChromeOutlined, SketchOutlined };

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const asistenteVentas = {
  id: 'asistenteVentas',
  type: 'group',
  children: [
    {
      id: 'dashboard-asistente',
      title: 'Dashboard',
      type: 'item',
      url: '/asistente/dashboard',
      icon: icons.AppstoreOutlined
    },
    {
      id: 'registro-prospectos',
      title: 'Prospectos Vendedores',
      type: 'item',
      url: '/registro/prospectos',
      icon: icons.BookOutlined
    },
    // {
    //   id: 'citas-nuevas-concretadas',
    //   title: 'Verificación De Citas',
    //   type: 'item',
    //   url: '/verificacionCitas',
    //   icon: icons.BookOutlined
    // },
    {
      id: 'verificacion-citas',
      title: 'Verificación de Citas',
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
      id: 'comite-semanal-gerencial',
      title: 'Comité Semanal Gerencial',
      type: 'item',
      url: '/comiteSemanalGerencial',
      icon: icons.ChromeOutlined
    },
    {
      id: 'gestion-quincenal',
      // title: <div style={{ display:'flex', justifyContent:'left' }}> Capacitación Quincenal de <br/> Ventas</div>,
      title: 'Capacitación Quincenal de Ventas',
      type: 'item',
      url: '/gestionQuincenal',
      icon: icons.ChromeOutlined
    },
    {
      id: 'gestion-mensual',
      title: 'Comité Mensual de Ventas',
      type: 'item',
      url: '/gestionMensual',
      icon: icons.ChromeOutlined
    },
    {
      id: 'asistente-reportes',
      title: 'Reportes',
      type: 'collapse',
      icon: icons.SketchOutlined,
      children: [
        {
          id: 'asistente-reportes-vendedores',
          title: 'Vendedores',
          type: 'item',
          url: '/asistente/reportes/vendedor'
        }
      ]
    },
  ]
};

export default asistenteVentas;
