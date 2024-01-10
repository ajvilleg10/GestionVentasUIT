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
    ]
};

export default CEO;
