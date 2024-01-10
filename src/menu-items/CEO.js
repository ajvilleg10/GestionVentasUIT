// third-party
import { FormattedMessage } from 'react-intl';


// assets
import { DashboardOutlined, CrownOutlined,FileTextOutlined } from '@ant-design/icons';
// ==============================|| MENU ITEMS - SUPPORT ||============================== //
const icons = {
  DashboardOutlined,
  CrownOutlined,
  FileTextOutlined 
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
            icon: icons.DashboardOutlined
            ,
            children: [
                {
                    id: 'dashboardCEO_0',
                    title: <FormattedMessage id="dashboardCEO_0" defaultMessage="CEO" values={{ br: <br /> }}
                    />,
                    type: 'item',
                    url: '/dashboard/dashboardCEO',
                    icon: icons.CrownOutlined
                },
            ]
        },
        {
            id: "ceo-reportes",
            title: 'Reportes',
            type: 'collapse',
            icon: icons.FileTextOutlined,
            children: [
                {
                    id: 'ceo-reportes-contactos',
                    title: 'Contactos',
                    type: 'item',
                    url: '/ceo/reportes/contactos',
                  },
                  {
                    id: 'ceo-reportes-gestion-contactos',
                    title: 'Gestión de contactos',
                    type: 'item',
                    url: '/ceo/reportes/gestionContactos',
                  },
                  {
                    id: 'ceo-reportes-citas',
                    title: 'Citas',
                    type: 'item',
                    url: '/ceo/reportes/citas',
                  },
                  {
                    id: 'ceo-reportes-contratos',
                    title: 'Contratos',
                    type: 'collapse',
                    children: [
                      {
                        id: 'ceo-reportes-contratos-negocios-cerrados',
                        title: 'Negocios Cerrados',
                        type: 'item',
                        url: '/ceo/reportes/negociosCerrados'
                      },
                      {
                        id: 'ceo-reportes-contratos-negocios-por-cerrar',
                        title: 'Negocios por Cerrar',
                        type: 'item',
                        url: '/ceo/reportes/negociosCerrar'
                      },
                    ]
                  },
                  {
                    id: 'ceo-reportes-vendedores',
                    title: 'Vendedores',
                    type: 'item',
                    url: '/ceo/reportes/vendedores'
                  },
                  {
                    id: 'ceo-reportes-ventas-nuevas',
                    title: 'Ventas nuevas',
                    type: 'item',
                    url: '/ceo/reportes/ventasNuevas'
                  },
                  {
                    id: 'ceo-reportes-renovaciones',
                    title: 'Renovaciones',
                    type: 'item',
                    url: '/ceo/reportes/renovaciones'
                  },
                  {
                    id: 'ceo-reportes-reuniones',
                    title: 'Reuniones',
                    type: 'collapse',
                    children: [
                      {
                        id: 'ceo-reportes-reunines-cqv',
                        title: 'Capacitación quincenal',
                        type: 'item',
                        url: '/ceo/reportes/reuniones/capacitacionQuincenal'
                      },
                      {
                        id: 'ceo-reportes-reuniones-cmv',
                        title: 'Comité mensual',
                        type: 'item',
                        url: '/ceo/reportes/reuniones/comiteMensual'
                      },
                      {
                        id: 'ceo-reportes-reuniones-csg',
                        title: 'Comité semanal',
                        type: 'item',
                        url: '/ceo/reportes/reuniones/comiteSemanal'
                      },
                      {
                        id: 'ceo-reportes-reuniones-rps',
                        title: 'Reunión personal semanal',
                        type: 'item',
                        url: '/ceo/reportes/reuniones/reunionPersonalSemanal'
                      },
                    ],
                  },
                  {
                    id: 'ceo-reportes-capacitacion-inicial',
                    title: 'Capacitación inicial',
                    type: 'item',
                    url: '/ceo/reportes/capacitacionInicial'
                  },
                  {
                    id: 'ceo-reportes-transaferencia-contactos',
                    title: 'Transferencia de contactos',
                    type: 'item',
                    url: '/ceo/reportes/transaferenciaContactos'
                  },
            ]
        }
    ]
};

export default CEO;
