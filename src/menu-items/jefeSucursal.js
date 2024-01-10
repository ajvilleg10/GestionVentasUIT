// third-party
import { FormattedMessage } from 'react-intl';
// assets
import { TrophyOutlined, PieChartOutlined, SettingOutlined, DashboardOutlined } from '@ant-design/icons';

// ==============================|| MENU ITEMS - SUPPORT ||============================== //
const icons = {
  TrophyOutlined,
  PieChartOutlined,
  SettingOutlined,
  DashboardOutlined,
};

const CEO = {
    id: 'CEO',
    type: 'group',
    children: [
        {
            id: 'dashboardCEO',
            title: <FormattedMessage id="dashboard" />,
            type: 'collapse',
            //url: '/dashboard',
            icon: icons.DashboardOutlined,
            children: [
                {
                    id: 'dashboardCEO_0',
                    title: <FormattedMessage id="dashboardCEO_0" defaultMessage="Ranking Ventas" values={{ br: <br /> }}
                    />,
                    type: 'item',
                    url: '/dashboard/RankingVentasJS',
                    icon: icons.TrophyOutlined
                },
                {
                    id: 'dashboardCEO_1',
                    title: <FormattedMessage id="dashboardCEO_1" defaultMessage="Análisis Modo Contacto" values={{ br: <br /> }}
                    />,
                    type: 'item',
                    url: '/dashboard/AnalisisModoContactoJS',
                    icon: icons.PieChartOutlined
                },
                {
                    id: 'gestionVentasSucursalVentas',
                    title: <FormattedMessage id="gestionVentasJefeVentasJS" defaultMessage="Gestión Ventas" values={{br: <br/>}}
                    />,
                    type: 'item',
                    url: '/jefe/dashboard/gestionVentasJefeSucursal',
                    icon: icons.SettingOutlined
                  },
                //   {
                //     id: 'volumenVentasJefeVentas',
                //     title: <FormattedMessage id="volumenVentasJefeSucursal" defaultMessage="Volumen Ventas" values={{br: <br/>}}
                //     />,
                //     type: 'item',
                //     url: '/jefe/dashboard/volumenVentasJefeSucursal',
                //     icon: icons.AppstoreOutlined,
                //   },


            ]
        },
        {
            id: "jefe-sucursal-reportes",
            title: 'Reportes',
            type: 'collapse',
            icon: icons.FileTextOutlined,
            children: [
                {
                    id: 'jefe-sucursal-reportes-contactos',
                    title: 'Contactos',
                    type: 'item',
                    url: '/jefe-sucursal/reportes/contactos',
                  },
                  {
                    id: 'jefe-sucursal-reportes-gestion-contactos',
                    title: 'Gestión de contactos',
                    type: 'item',
                    url: '/jefe-sucursal/reportes/gestionContactos',
                  },
                  {
                    id: 'jefe-sucursal-reportes-citas',
                    title: 'Citas',
                    type: 'item',
                    url: '/jefe-sucursal/reportes/citas',
                  },
                  {
                    id: 'jefe-sucursal-reportes-contratos',
                    title: 'Contratos',
                    type: 'collapse',
                    children: [
                      {
                        id: 'jefe-sucursal-reportes-contratos-negocios-cerrados',
                        title: 'Negocios Cerrados',
                        type: 'item',
                        url: '/jefe-sucursal/reportes/negociosCerrados'
                      },
                      {
                        id: 'jefe-sucursal-reportes-contratos-negocios-por-cerrar',
                        title: 'Negocios por Cerrar',
                        type: 'item',
                        url: '/jefe-sucursal/reportes/negociosCerrar'
                      },
                    ]
                  },
                  {
                    id: 'jefe-sucursal-reportes-vendedores',
                    title: 'Vendedores',
                    type: 'item',
                    url: '/jefe-sucursal/reportes/vendedores'
                  },
                  {
                    id: 'jefe-sucursal-reportes-ventas-nuevas',
                    title: 'Ventas nuevas',
                    type: 'item',
                    url: '/jefe-sucursal/reportes/ventasNuevas'
                  },
                  {
                    id: 'jefe-sucursal-reportes-renovaciones',
                    title: 'Renovaciones',
                    type: 'item',
                    url: '/jefe-sucursal/reportes/renovaciones'
                  },
                  {
                    id: 'jefe-sucursal-reportes-reuniones',
                    title: 'Reuniones',
                    type: 'collapse',
                    children: [
                      {
                        id: 'jefe-sucursal-reportes-reunines-cqv',
                        title: 'Capacitación quincenal',
                        type: 'item',
                        url: '/jefe-sucursal/reportes/reuniones/capacitacionQuincenal'
                      },
                      {
                        id: 'jefe-sucursal-reportes-reuniones-cmv',
                        title: 'Comité mensual',
                        type: 'item',
                        url: '/jefe-sucursal/reportes/reuniones/comiteMensual'
                      },
                      {
                        id: 'jefe-sucursal-reportes-reuniones-csg',
                        title: 'Comité semanal',
                        type: 'item',
                        url: '/jefe-sucursal/reportes/reuniones/comiteSemanal'
                      },
                      {
                        id: 'jefe-sucursal-reportes-reuniones-rps',
                        title: 'Reunión personal semanal',
                        type: 'item',
                        url: '/jefe-sucursal/reportes/reuniones/reunionPersonalSemanal'
                      },
                    ],
                  },
                  {
                    id: 'jefe-sucursal-reportes-capacitacion-inicial',
                    title: 'Capacitación inicial',
                    type: 'item',
                    url: '/jefe-sucursal/reportes/capacitacionInicial'
                  },
                  {
                    id: 'jefe-sucursal-reportes-transaferencia-contactos',
                    title: 'Transferencia de contactos',
                    type: 'item',
                    url: '/jefe-sucursal/reportes/transaferenciaContactos'
                  },
            ]
          }
    ]
};

export default CEO;
