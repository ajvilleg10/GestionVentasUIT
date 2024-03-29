// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DashboardOutlined, PieChartOutlined, SettingOutlined, BarChartOutlined, TrophyOutlined } from '@ant-design/icons';

// ==============================|| MENU ITEMS - SUPPORT ||============================== //
const icons = {
  DashboardOutlined,
  PieChartOutlined,
  SettingOutlined,
  BarChartOutlined,
  TrophyOutlined,
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
    ]
};

export default director;
