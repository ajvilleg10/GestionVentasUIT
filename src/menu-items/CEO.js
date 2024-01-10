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
                    title: <FormattedMessage id="dashboardCEO_0" defaultMessage="CEO" values={{ br: <br /> }}
                    />,
                    type: 'item',
                    url: '/dashboard/dashboardCEO',
                    icon: icons.AppstoreOutlined,
                },
            ]
        },
    ]
};

export default CEO;
