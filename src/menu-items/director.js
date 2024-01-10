// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { AppstoreOutlined, ContactsOutlined, ChromeOutlined } from '@ant-design/icons';

// icons
const icons = { AppstoreOutlined, ContactsOutlined, ChromeOutlined };
// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const director = {
    id: 'director',
    type: 'group',
    children: [
        {
            id: 'dashboardDirector',
            title: <FormattedMessage id="dashboard" />,
            type: 'collapse',
            //url: '/dashboard',
            icon: icons.AppstoreOutlined,
            children: [
                {
                    id: 'dashboardCEO_1',
                    title: <FormattedMessage id="dashboardCEO_1" defaultMessage="Análisis Modo Contacto" values={{ br: <br /> }}
                    />,
                    type: 'item',
                    url: '/dashboard/AnalisisModoContactoDS',
                    icon: icons.AppstoreOutlined,
                },
                {
                    id: 'dashboard_1',
                    title: <FormattedMessage id="dashboard_1" defaultMessage="Volumen Ventas" values={{ br: <br /> }}
                    />,
                    type: 'item',
                    url: '/dashboard/VolumenVentasDirec',
                    icon: icons.AppstoreOutlined,
                },
                {
                    id: 'dashboardCEO_1',
                    title: <FormattedMessage id="dashboardCEO_1" defaultMessage="Ranking Ventas" values={{ br: <br /> }}
                    />,
                    type: 'item',
                    url: '/dashboard/RankingVentasDS',
                    icon: icons.AppstoreOutlined,
                },
                {
                    id: 'gestionVentasDirector',
                    title: <FormattedMessage id="gestionVentasDirector" defaultMessage="Gestión Ventas" values={{br: <br/>}}
                    />,
                    type: 'item',
                    url: '/jefe/dashboard/gestionVentasDirector',
                    icon: icons.AppstoreOutlined,
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
