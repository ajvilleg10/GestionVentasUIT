// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { SwapOutlined, DashboardOutlined, AreaChartOutlined, BookOutlined, CalendarOutlined, FileTextOutlined, PieChartOutlined, SettingOutlined, SolutionOutlined, TrophyOutlined, ClockCircleOutlined } from '@ant-design/icons';
// ==============================|| MENU ITEMS - SUPPORT ||============================== //
const icons = {
  SwapOutlined,
  DashboardOutlined,
  AreaChartOutlined,
  BookOutlined,
  CalendarOutlined,
  FileTextOutlined,
  PieChartOutlined,
  SettingOutlined,
  SolutionOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
};

const jefeVentas = {
  id: 'jefeVentas',
  type: 'group',
  children: [

    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'collapse',
      // url: '/jefe/dashboard',
      icon: icons.DashboardOutlined,
      children: [
        {
          id: 'dashboard_0',
          title: <FormattedMessage id="dashboard_0" defaultMessage="Analisis Modo Contacto" values={{br: <br/>}}
          />,
          type: 'item',
          url: '/dashboard/AnalisisModoContactos',
          icon: icons.PieChartOutlined
        },
        {
          id: 'dashboard_1',
          title: <FormattedMessage id="dashboard_1" defaultMessage="Ranking de Ventas" values={{br: <br/>}}
          />,
          type: 'item',
          url: '/dashboard/RankingVentas',
          icon: icons.TrophyOutlined
        },
        {
          id: 'gestionVentasJefeVentas',
          title: <FormattedMessage id="gestionVentasJefeVentas" defaultMessage="Gestión Ventas" values={{br: <br/>}}
          />,
          type: 'item',
          url: '/jefe/dashboard/gestionVentasJefeVentas',
          icon: icons.SettingOutlined
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
      icon: icons.ClockCircleOutlined
    },
    {
      id: 'reunionPersonalSemanal',
      title: 'Reunion Personal Semanal',
      type: 'item',
      url: '/reunionPersonalSemanalJefeVentas',
      icon: icons.CalendarOutlined
    },
    {
      id: 'comite-semanal-gerencial',
      title: 'Comité Semanal Gerencial',
      type: 'item',
      url: '/comiteSemanalGerencialJefeVenta',
      icon: icons.SolutionOutlined
    },
    {
      id: 'capacitacion-quincenal',
      title: 'Capacitacion Quincenal de Ventas',
      type: 'item',
      url: '/capacitacionQuincenalJefeVenta',
      icon: icons.BookOutlined
    },
    {
      id: 'comite-mensual-venta',
      title: 'Comité Mensual de Ventas',
      type: 'item',
      url: '/comiteMensualVentasJefeVenta',
      icon: icons.SolutionOutlined
    },
    {
      id: 'transferenciaContactos',
      title: 'Transferencia de Contactos',
      type: 'item',
      url: 'jefeVentas/transferenciaContactos',
      icon: icons.SwapOutlined
    },
    {
      id: 'presupuestoRealAnual',
      title: 'Presupuesto Anual vs Real',
      type: 'item',
      url: '/presupuestoRealAnuals',
      icon: icons.AreaChartOutlined
    },
    {
      id: 'jefeventas-reportes',
      title: 'Reportes',
      type: 'collapse',
      icon: icons.FileTextOutlined,
      children: [
        {
          id: 'jefeventas-reportes-contactos',
          title: 'Contactos',
          type: 'item',
          url: '/jefe/reportes/contactos',
        },
        {
          id: 'jefeventas-reportes-gestion-contactos',
          title: 'Gestión de contactos',
          type: 'item',
          url: '/jefe/reportes/gestionContactos',
        },
        {
          id: 'jefeventas-reportes-citas',
          title: 'Citas',
          type: 'item',
          url: '/jefe/reportes/citas',
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
