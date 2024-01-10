// third-party
import { FormattedMessage } from 'react-intl';


// assets
import { DashboardOutlined, CrownOutlined } from '@ant-design/icons';
// ==============================|| MENU ITEMS - SUPPORT ||============================== //
const icons = {
  DashboardOutlined,
  CrownOutlined,
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
    ]
};

export default CEO;
