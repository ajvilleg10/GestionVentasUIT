// third-party
import { FormattedMessage } from 'react-intl';
import GroupIcon from '@mui/icons-material/Group';
import TaskIcon from '@mui/icons-material/Task';
import GroupsIcon from '@mui/icons-material/Groups';
import Groups3Icon from '@mui/icons-material/Groups3';
import Groups2Icon from '@mui/icons-material/Groups2';

// assets
import {
  AppstoreOutlined,
  BorderOutlined,
  BoxPlotOutlined,
  ChromeOutlined,
  DeploymentUnitOutlined,
  GatewayOutlined,
  MenuUnfoldOutlined,
  QuestionOutlined,
  SmileOutlined,
  StopOutlined,
  ContactsOutlined,
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
  DeploymentUnitOutlined,
  ContactsOutlined,
  GroupIcon,
  TaskIcon,
  GroupsIcon,
  Groups3Icon,
  Groups2Icon,
  AppstoreOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const jefeVentas = {
  id: 'jefeVentas',
  type: 'group',
  children: [
    
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'collapse',
      // url: '/jefe/dashboard',
      icon: icons.AppstoreOutlined,
      children: [
        {
          id: 'dashboard_0',
          title: <FormattedMessage id="dashboard_0" defaultMessage="Analisis Modo Contacto" values={{br: <br/>}}
          />,
          type: 'item',
          url: '/dashboard/AnalisisModoContactos',
          icon: icons.AppstoreOutlined,
        },
        {
          id: 'dashboard_1',
          title: <FormattedMessage id="dashboard_1" defaultMessage="Ranking de Ventas" values={{br: <br/>}}
          />,
          type: 'item',
          url: '/dashboard/RankingVentas',
          icon: icons.AppstoreOutlined,
        },
        {
          id: 'gestionVentasJefeVentas',
          title: <FormattedMessage id="gestionVentasJefeVentas" defaultMessage="Gestión Ventas" values={{br: <br/>}}
          />,
          type: 'item',
          url: '/jefe/dashboard/gestionVentasJefeVentas',
          icon: icons.AppstoreOutlined,
        },
        // {
        //   id: 'volumenVentasJefeVentas',
        //   title: <FormattedMessage id="volumenVentasJefeVentas" defaultMessage="Volumen Ventas" values={{br: <br/>}}
        //   />,
        //   type: 'item',
        //   url: '/jefe/dashboard/volumenVentasJefeVentas',
        //   icon: icons.AppstoreOutlined,
        // },
        
        
      ]
      
    },

    {
      id: 'actividadesPendientesJefeVentas',
      title: 'Actividades Pendientes',
      type: 'item',
      url: '/actividadesPendientesJefeVentas',
      icon: icons.TaskIcon
    },
    {
      id: 'reunionPersonalSemanal',
      title: 'Reunion Personal Semanal',
      type: 'item',
      url: '/reunionPersonalSemanalJefeVentas',
      icon: icons.GroupIcon
    },
    {
      id: 'comite-semanal-gerencial',
      title: 'Comité Semanal Gerencial',
      type: 'item',
      url: '/comiteSemanalGerencialJefeVenta',
      icon: icons.GroupsIcon
    },
    {
      id: 'capacitacion-quincenal',
      title: 'Capacitacion Quincenal de Ventas',
      type: 'item',
      url: '/capacitacionQuincenalJefeVenta',
      icon: icons.Groups3Icon
    },
    {
      id: 'comite-mensual-venta',
      title: 'Comité Mensual de Ventas',
      type: 'item',
      url: '/comiteMensualVentasJefeVenta',
      icon: icons.Groups2Icon
    },
    {
      id: 'transferenciaContactos',
      title: 'Transferencia de Contactos',
      type: 'item',
      url: 'jefeVentas/transferenciaContactos',
      icon: icons.ContactsOutlined
    },
    {
      id: 'presupuestoRealAnual',
      title: 'Presupuesto Anual vs Real',
      type: 'item',
      url: '/presupuestoRealAnuals',
      icon: icons.ChromeOutlined
    },
    {
      id: 'jefeventas-reportes',
      title: 'Reportes',
      type: 'collapse',
      icon: icons.ChromeOutlined,
      children: [
        {
          id: 'jefeventas-reportes-contactos',
          title: 'Contactos',
          type: 'item',
          url: '/jefe/reportes/contactos'
        },
        {
          id: 'jefeventas-reportes-gestion-contactos',
          title: 'Gestión de contactos',
          type: 'item',
          url: '/jefe/reportes/gestionContactos'
        },
        {
          id: 'jefeventas-reportes-citas',
          title: 'Citas',
          type: 'item',
          url: '/jefe/reportes/citas'
        },
        {
          id: 'jefeventas-reportes-contratos',
          title: 'Contratos',
          type: 'collapse',
          children: [
            {
              id: 'jefeventas-reportes-contratos-negocios-cerrados',
              title: 'Negocios Cerrados',
              type: 'item',
              url: '/jefe/reportes/negociosCerrados'
            },
            {
              id: 'jefeventas-reportes-contratos-negocios-por-cerrar',
              title: 'Negocios por Cerrar',
              type: 'item',
              url: '/jefe/reportes/negociosCerrar'
            },
          ]
        },
        {
          id: 'jefeventas-reportes-vendedores',
          title: 'Vendedores',
          type: 'item',
          url: '/jefe/reportes/vendedores'
        },
        {
          id: 'jefeventas-reportes-ventas-nuevas',
          title: 'Ventas nuevas',
          type: 'item',
          url: '/jefe/reportes/ventasNuevas'
        },
        {
          id: 'jefeventas-reportes-renovaciones',
          title: 'Renovaciones',
          type: 'item',
          url: '/jefe/reportes/renovaciones'
        },
        {
          id: 'jefeventas-reportes-reuniones',
          title: 'Reuniones',
          type: 'collapse',
          children: [
            {
              id: 'jefeventas-reportes-reunines-cqv',
              title: 'Capacitación quincenal',
              type: 'item',
              url: '/jefe/reportes/reuniones/capacitacionQuincenal'
            },
            {
              id: 'jefeventas-reportes-reuniones-cmv',
              title: 'Comité mensual',
              type: 'item',
              url: '/jefe/reportes/reuniones/comiteMensual'
            },
            {
              id: 'jefeventas-reportes-reuniones-csg',
              title: 'Comité semanal',
              type: 'item',
              url: '/jefe/reportes/reuniones/comiteSemanal'
            },
            {
              id: 'jefeventas-reportes-reuniones-rps',
              title: 'Reunión personal semanal',
              type: 'item',
              url: '/jefe/reportes/reuniones/reunionPersonalSemanal'
            },
          ],
        },
        {
          id: 'jefeventas-reportes-capacitacion-inicial',
          title: 'Capacitación inicial',
          type: 'item',
          url: '/jefe/reportes/capacitacionInicial'
        },
        {
          id: 'jefeventas-reportes-transaferencia-contactos',
          title: 'Transferencia de contactos',
          type: 'item',
          url: '/jefe/reportes/transaferenciaContactos'
        },
      ]
    },
  ]
};

export default jefeVentas;
