// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { AppstoreOutlined, ContactsOutlined, ChromeOutlined } from '@ant-design/icons';

// icons
const icons = { AppstoreOutlined, ContactsOutlined, ChromeOutlined };

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const CEO = {
    id: 'CEO',
    type: 'group',
    children: [
        {
            id: 'dashboardCEO',
            title: <FormattedMessage id="dashboard" />,
            type: 'collapse',
            //url: '/dashboard',
            icon: icons.AppstoreOutlined,
            children: [
                {
                    id: 'dashboardCEO_0',
                    title: <FormattedMessage id="dashboardCEO_0" defaultMessage="Ranking Ventas" values={{ br: <br /> }}
                    />,
                    type: 'item',
                    url: '/dashboard/RankingVentasJS',
                    icon: icons.AppstoreOutlined,
                },
                {
                    id: 'dashboardCEO_1',
                    title: <FormattedMessage id="dashboardCEO_1" defaultMessage="Análisis Modo Contacto" values={{ br: <br /> }}
                    />,
                    type: 'item',
                    url: '/dashboard/AnalisisModoContactoJS',
                    icon: icons.AppstoreOutlined,
                },
                {
                    id: 'gestionVentasSucursalVentas',
                    title: <FormattedMessage id="gestionVentasJefeVentasJS" defaultMessage="Gestión Ventas" values={{br: <br/>}}
                    />,
                    type: 'item',
                    url: '/jefe/dashboard/gestionVentasJefeSucursal',
                    icon: icons.AppstoreOutlined,
                  },
                  {
                    id: 'volumenVentasJefeVentas',
                    title: <FormattedMessage id="volumenVentasJefeSucursal" defaultMessage="Volumen Ventas" values={{br: <br/>}}
                    />,
                    type: 'item',
                    url: '/jefe/dashboard/volumenVentasJefeSucursal',
                    icon: icons.AppstoreOutlined,
                  },
            ]
        },
    ]
};

export default CEO;
