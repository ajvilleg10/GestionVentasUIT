import { FormattedMessage } from 'react-intl';
import { AppstoreOutlined, ContactsOutlined } from '@ant-design/icons';
import { DescriptionOutlined, ContactPage, ScheduleOutlined } from '@mui/icons-material';

const icons = { 
  AppstoreOutlined, 
  ContactsOutlined, 
  DescriptionOutlined,
  ScheduleOutlined,
  ContactPage
};

const vendedor = {
  id: 'vendedor',
  //title: <FormattedMessage id="vendedor" />,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'collapse',
      //url: '/dashboard',
      icon: icons.AppstoreOutlined,
      children: [
        {
          id: 'dashboard_0',
          title: <FormattedMessage id="dashboard_0" defaultMessage="Volumen Ventas" values={{br: <br/>}}
          />,
          type: 'item',
          url: '/dashboard/volumenVentas',
          icon: icons.AppstoreOutlined,
        },
        {
          id: 'dashboard_1',
          title: <FormattedMessage id="dashboard_1" defaultMessage="Comparativo" values={{br: <br/>}}
          />,
          type: 'item',
          url: '/dashboard/volumenVentasComparativo',
          icon: icons.AppstoreOutlined,
        },
        {
          id: 'dashboard_2',
          title: <FormattedMessage id="dashboard_2" defaultMessage="Negocios por Cerrar" values={{br: <br/>}}
          />,
          type: 'item',
          url: '/dashboard/negociosCerrar',
          icon: icons.AppstoreOutlined,
        },{
          id: 'dashboard_3',
          title: <FormattedMessage id="dashboard_3" defaultMessage="Gestión de Ventas" values={{br: <br/>}}
          />,
          type: 'item',
          url: '/dashboard/GestionVentas',
          icon: icons.AppstoreOutlined,
        },
      ]
    },
    {
      id: 'contactos',
      title: <FormattedMessage id="contactos" />,
      type: 'item',
      url: '/contactos',
      icon: icons.ContactsOutlined
    },
    {
      id: 'actividadesPendientes',
      title: 'Actividades Pendientes',
      type: 'item',
      url: '/actividadesPendientes',
      icon: icons.ScheduleOutlined
    },
    {
      id: 'vendedor-reportes',
      title: 'Reportes',
      type: 'collapse',
      icon: icons.DescriptionOutlined,
      children: [
        {
          id: 'vendedor-reportes-contactos',
          title: 'Contactos',
          type: 'item',
          // icon: icons.ContactPage,
          url: '/vendedor/reportes/contactos'
        },
        {
          id: 'vendedor-reportes-gestion-contactos',
          title: 'Gestión de contactos',
          type: 'item',
          url: '/vendedor/reportes/gestionContactos'
        },
        {
          id: 'vendedor-reportes-citas',
          title: 'Citas',
          type: 'item',
          url: '/vendedor/reportes/citas'
        },
        {
          id: 'vendedor-reportes-contratos',
          title: 'Contratos',
          type: 'item',
          url: '/vendedor/reportes/contratos'
        },
        {
          id: 'vendedor-reportes-negocios',
          title: 'Negocios por cerrar',
          type: 'item',
          url: '/vendedor/reportes/negocios'
        }
      ]
    },
  ]
};

export default vendedor;
