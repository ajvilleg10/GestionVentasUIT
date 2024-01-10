// assets
import {
  DashboardOutlined,
  BookOutlined,
  CalendarOutlined,
  LineChartOutlined,
  UsergroupAddOutlined,
  CheckCircleOutlined,
  SolutionOutlined,
  VideoCameraOutlined,
  FileTextOutlined
} from '@ant-design/icons';

import { FormattedMessage } from 'react-intl';

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const icons = {
  DashboardOutlined,
  BookOutlined,
  CalendarOutlined,
  LineChartOutlined,
  UsergroupAddOutlined,
  CheckCircleOutlined,
  SolutionOutlined,
  VideoCameraOutlined,
  FileTextOutlined
};

const asistenteVentas = {
  id: 'asistenteVentas',
  title: <FormattedMessage id="asistenteVentas" />,
  type: 'group',
  children: [
    {
      id: 'dashboard-asistente',
      title: 'Dashboard',
      type: 'item',
      url: '/asistente/dashboard',
      icon: icons.DashboardOutlined
    },
    {
      id: 'registro-prospectos',
      title: 'Prospectos Vendedores',
      type: 'item',
      url: '/registro/prospectos',
      icon: icons.UsergroupAddOutlined
    },
    {
      id: 'citas-nuevas-concretadas',
      title: 'Verificación De Citas',
      type: 'item',
      url: '/verificacionCitas',
      icon: icons.CheckCircleOutlined
    },
    {
      id: 'capacitacion-inicial',
      title: 'Capacitación Inicial',
      type: 'item',
      url: '/capacitacionInicial',
      icon: icons.VideoCameraOutlined
    },
    {
      id: 'reunion-personal-semanal',
      title: 'Reunion Personal Semanal',
      type: 'item',
      url: '/reunionPersonalSemanal',
      icon: icons.CalendarOutlined
    },
    {
      id: 'comite-semanal-gerencial',
      title: 'Comité Semanal Gerencial',
      type: 'item',
      url: '/comiteSemanalGerencial',
      icon: icons.SolutionOutlined
    },
    {
      id: 'gestion-quincenal',
      title: 'Capacitación Quincenal',
      type: 'item',
      url: '/gestionQuincenal',
      icon: icons.BookOutlined
    },
    {
      id: 'gestion-mensual',
      title: 'Comité Mensual de Ventas',
      type: 'item',
      url: '/gestionMensual',
      icon: icons.LineChartOutlined
    },
    {
      id: "asistente-reportes",
      title: 'Reportes',
      type: 'collapse',
      icon: icons.FileTextOutlined,
      children: [
          {
              id: 'asistente-reportes-contactos',
              title: 'Contactos',
              type: 'item',
              url: '/asistente/reportes/contactos',
            },
            {
              id: 'asistente-reportes-gestion-contactos',
              title: 'Gestión de contactos',
              type: 'item',
              url: '/asistente/reportes/gestionContactos',
            },
            {
              id: 'asistente-reportes-citas',
              title: 'Citas',
              type: 'item',
              url: '/asistente/reportes/citas',
            },
            {
              id: 'asistente-reportes-contratos',
              title: 'Contratos',
              type: 'collapse',
              children: [
                {
                  id: 'asistente-reportes-contratos-negocios-cerrados',
                  title: 'Negocios Cerrados',
                  type: 'item',
                  url: '/asistente/reportes/negociosCerrados'
                },
                {
                  id: 'asistente-reportes-contratos-negocios-por-cerrar',
                  title: 'Negocios por Cerrar',
                  type: 'item',
                  url: '/asistente/reportes/negociosCerrar'
                },
              ]
            },
            {
              id: 'asistente-reportes-vendedores',
              title: 'Vendedores',
              type: 'item',
              url: '/asistente/reportes/vendedores'
            },
            {
              id: 'asistente-reportes-ventas-nuevas',
              title: 'Ventas nuevas',
              type: 'item',
              url: '/asistente/reportes/ventasNuevas'
            },
            {
              id: 'asistente-reportes-renovaciones',
              title: 'Renovaciones',
              type: 'item',
              url: '/asistente/reportes/renovaciones'
            },
            {
              id: 'asistente-reportes-reuniones',
              title: 'Reuniones',
              type: 'collapse',
              children: [
                {
                  id: 'asistente-reportes-reunines-cqv',
                  title: 'Capacitación quincenal',
                  type: 'item',
                  url: '/asistente/reportes/reuniones/capacitacionQuincenal'
                },
                {
                  id: 'asistente-reportes-reuniones-cmv',
                  title: 'Comité mensual',
                  type: 'item',
                  url: '/asistente/reportes/reuniones/comiteMensual'
                },
                {
                  id: 'asistente-reportes-reuniones-csg',
                  title: 'Comité semanal',
                  type: 'item',
                  url: '/asistente/reportes/reuniones/comiteSemanal'
                },
                {
                  id: 'asistente-reportes-reuniones-rps',
                  title: 'Reunión personal semanal',
                  type: 'item',
                  url: '/asistente/reportes/reuniones/reunionPersonalSemanal'
                },
              ],
            },
            {
              id: 'asistente-reportes-capacitacion-inicial',
              title: 'Capacitación inicial',
              type: 'item',
              url: '/asistente/reportes/capacitacionInicial'
            },
            {
              id: 'asistente-reportes-transaferencia-contactos',
              title: 'Transferencia de contactos',
              type: 'item',
              url: '/asistente/reportes/transaferenciaContactos'
            },
      ]
    }
  ]
};

export default asistenteVentas;
