// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DashboardOutlined, PieChartOutlined, SettingOutlined, BarChartOutlined, TrophyOutlined, FileTextOutlined } from '@ant-design/icons';

// ==============================|| MENU ITEMS - SUPPORT ||============================== //
const icons = {
  DashboardOutlined,
  PieChartOutlined,
  SettingOutlined,
  BarChartOutlined,
  TrophyOutlined,
  FileTextOutlined
};

const director = {
    id: 'director',
    type: 'group',
    children: [
        {
            id: 'dashboardDirector',
            title: <FormattedMessage id="dashboard" />,
            type: 'collapse',
            //url: '/dashboard',
            icon: icons.DashboardOutlined,
            children: [
                {
                    id: 'dashboardCEO_1',
                    title: <FormattedMessage id="dashboardCEO_1" defaultMessage="Análisis Modo Contacto" values={{ br: <br /> }}
                    />,
                    type: 'item',
                    url: '/dashboard/AnalisisModoContactoDS',
                    icon: icons.PieChartOutlined
                },
                {
                    id: 'dashboard_1',
                    title: <FormattedMessage id="dashboard_1" defaultMessage="Volumen Ventas" values={{ br: <br /> }}
                    />,
                    type: 'item',
                    url: '/dashboard/VolumenVentasDirec',
                    icon: icons.BarChartOutlined
                },
                {
                    id: 'dashboardCEO_1',
                    title: <FormattedMessage id="dashboardCEO_1" defaultMessage="Ranking Ventas" values={{ br: <br /> }}
                    />,
                    type: 'item',
                    url: '/dashboard/RankingVentasDS',
                    icon: icons.TrophyOutlined
                },
                {
                    id: 'gestionVentasDirector',
                    title: <FormattedMessage id="gestionVentasDirector" defaultMessage="Gestión Ventas" values={{br: <br/>}}
                    />,
                    type: 'item',
                    url: '/jefe/dashboard/gestionVentasDirector',
                    icon: icons.SettingOutlined
                  },
                //   {
                //     id: 'volumenVentasDirector',
                //     title: <FormattedMessage id="volumenVentasDirector" defaultMessage="Volumen Ventas" values={{br: <br/>}}
                //     />,
                //     type: 'item',
                //     url: '/jefe/dashboard/volumenVentasDirector',
                //     icon: icons.AppstoreOutlined,
                //   },
            ]
        },
        {
            id: "director-reportes",
            title: 'Reportes',
            type: 'collapse',
            icon: icons.FileTextOutlined,
            children: [
                {
                    id: 'director-reportes-contactos',
                    title: 'Contactos',
                    type: 'item',
                    url: '/director/reportes/contactos',
                  },
                  {
                    id: 'director-reportes-gestion-contactos',
                    title: 'Gestión de contactos',
                    type: 'item',
                    url: '/director/reportes/gestionContactos',
                  },
                  {
                    id: 'director-reportes-citas',
                    title: 'Citas',
                    type: 'item',
                    url: '/director/reportes/citas',
                  },
                  {
                    id: 'director-reportes-contratos',
                    title: 'Contratos',
                    type: 'collapse',
                    children: [
                      {
                        id: 'director-reportes-contratos-negocios-cerrados',
                        title: 'Negocios Cerrados',
                        type: 'item',
                        url: '/director/reportes/negociosCerrados'
                      },
                      {
                        id: 'director-reportes-contratos-negocios-por-cerrar',
                        title: 'Negocios por Cerrar',
                        type: 'item',
                        url: '/director/reportes/negociosCerrar'
                      },
                    ]
                  },
                  {
                    id: 'director-reportes-vendedores',
                    title: 'Vendedores',
                    type: 'item',
                    url: '/director/reportes/vendedores'
                  },
                  {
                    id: 'director-reportes-ventas-nuevas',
                    title: 'Ventas nuevas',
                    type: 'item',
                    url: '/director/reportes/ventasNuevas'
                  },
                  {
                    id: 'director-reportes-renovaciones',
                    title: 'Renovaciones',
                    type: 'item',
                    url: '/director/reportes/renovaciones'
                  },
                  {
                    id: 'director-reportes-reuniones',
                    title: 'Reuniones',
                    type: 'collapse',
                    children: [
                      {
                        id: 'director-reportes-reunines-cqv',
                        title: 'Capacitación quincenal',
                        type: 'item',
                        url: '/director/reportes/reuniones/capacitacionQuincenal'
                      },
                      {
                        id: 'director-reportes-reuniones-cmv',
                        title: 'Comité mensual',
                        type: 'item',
                        url: '/director/reportes/reuniones/comiteMensual'
                      },
                      {
                        id: 'director-reportes-reuniones-csg',
                        title: 'Comité semanal',
                        type: 'item',
                        url: '/director/reportes/reuniones/comiteSemanal'
                      },
                      {
                        id: 'director-reportes-reuniones-rps',
                        title: 'Reunión personal semanal',
                        type: 'item',
                        url: '/director/reportes/reuniones/reunionPersonalSemanal'
                      },
                    ],
                  },
                  {
                    id: 'director-reportes-capacitacion-inicial',
                    title: 'Capacitación inicial',
                    type: 'item',
                    url: '/director/reportes/capacitacionInicial'
                  },
                  {
                    id: 'director-reportes-transaferencia-contactos',
                    title: 'Transferencia de contactos',
                    type: 'item',
                    url: '/director/reportes/transaferenciaContactos'
                  },
            ]
        }
    ]
};

export default director;
