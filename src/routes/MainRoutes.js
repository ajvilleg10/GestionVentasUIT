import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import AsistenteDeVentas from 'pages/asistente-ventas';
import RpsSiguientesJefeVentas from 'pages/jefe-ventas/reunionPersonalSemanal/tabs/RpsSiguientesJefeVentas';
import RpsTodasJefeVentas from 'pages/jefe-ventas/reunionPersonalSemanal/tabs/RpsTodasJefeVentas';
import RpsDetalles from 'pages/jefe-ventas/reunionPersonalSemanal/rpsDetalles/RpsDetalles';
import TransferenciaContactosJefeVentas from 'pages/jefe-ventas/transferenciaContactos/TransferenciaContactosJefeVentas';

// pages routing
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));

const Welcome = Loadable(lazy(() => import('pages/Welcome')));

// Prospecto Vendedor
const Proyecto100 = Loadable(lazy(() => import('pages/prospecto-vendedor/proyecto100/Proyecto100')));
const Registro = Loadable(lazy(() => import('pages/prospecto-vendedor/registro/Registro')));
const DescripcionGeneral = Loadable(lazy(() => import('pages/prospecto-vendedor/registro/tabs/DescripcionGeneral')));
const FormularioDeRegistro = Loadable(lazy(() => import('pages/prospecto-vendedor/registro/tabs/FormularioDeRegistro')));
const DocumentosContractuales = Loadable(lazy(() => import('pages/prospecto-vendedor/registro/tabs/DocumentosContractuales')));
const CambiarContrasena = Loadable(lazy(() => import('pages/prospecto-vendedor/registro/tabs/CambiarContrasena')));

// Vendedor
const VolumenVentasComparativo = Loadable(lazy(() => import('pages/vendedor/dashboard/VolumenVentasComparativo')));
const VolumenVentas = Loadable(lazy(() => import('pages/vendedor/dashboard/VolumenVentas')));
const GestionVentas = Loadable(lazy(() => import('pages/vendedor/dashboard/GestionVentas')));
const NegociosCerrar = Loadable(lazy(() => import('pages/vendedor/dashboard/NegociosxCerrar')));
// Dashboards
const DashboardVendedor = Loadable(lazy(() => import('pages/vendedor/dashboard')));
// Gestion
const Contactos = Loadable(lazy(() => import('pages/vendedor/contactos/Contactos')));
const ContactosTelefonicos = Loadable(lazy(() => import('pages/vendedor/contactos/contactoDetailsTabs/contactosTelefonicos')));
const Citas = Loadable(lazy(() => import('pages/vendedor/contactos/contactoDetailsTabs/citas')));
const Referidos = Loadable(lazy(() => import('pages/vendedor/contactos/contactoDetailsTabs/referidos')));
const Cotizaciones = Loadable(lazy(() => import('pages/vendedor/contactos/contactoDetailsTabs/cotizaciones')));
const Contratos = Loadable(lazy(() => import('pages/vendedor/contactos/contactoDetailsTabs/contratos')));
const ActividadesPendientes = Loadable(lazy(() => import('pages/vendedor/actividades-pendientes/index')));
// Reportes
const ReporteContactos = Loadable(lazy(() => import('pages/vendedor/reportes/contactos')));
const ReporteGestionContactos = Loadable(lazy(() => import('pages/vendedor/reportes/gestion_contactos')));
const ReporteCitas = Loadable(lazy(() => import('pages/vendedor/reportes/citas')));
const ReporteContratos = Loadable(lazy(() => import('pages/vendedor/reportes/contratos')));
const ReporteNegociosCerrar = Loadable(lazy(() => import('pages/vendedor/reportes/negocios_cerrar')));

// Asistente de Ventas
const DashboardAsistente = Loadable(lazy(() => import('pages/asistente-ventas/dashboard')));
const DescripcionGeneralAsistente = Loadable(lazy(() => import('pages/asistente-ventas/registro/tabs/DescripcionGeneral')));
const FormularioDeRegistroAsistente = Loadable(lazy(() => import('pages/asistente-ventas/registro/tabs/FormularioDeRegistro')));
const DocumentosContractualesAsistente = Loadable(lazy(() => import('pages/asistente-ventas/registro/tabs/DocumentosContractuales')));
const CapacitacionInicial = Loadable(lazy(() => import('pages/asistente-ventas/capacitacionInicial/CapacitacionInicial')));
const ReunionPersonalSemanal = Loadable(lazy(() => import('pages/asistente-ventas/reunionPersonalSemanal/index')));
const Asistencia = Loadable(lazy(() => import('pages/asistente-ventas/reunionPersonalSemanal/tables/Asistencia')));
const ActaMejoramiento = Loadable(lazy(() => import('pages/asistente-ventas/reunionPersonalSemanal/tables/ActaMejoramiento')));
const ComiteSemanal = Loadable(lazy(() => import('pages/asistente-ventas/comite-semanal-gerencial')));

const GestionQuincenal = Loadable(lazy(() => import('pages/asistente-ventas/gestion-quincenal/index')));
const GestionMensual = Loadable(lazy(() => import('pages/asistente-ventas/gestion-mensual/index')));
const VerificacionCitas = Loadable(lazy(() => import('pages/asistente-ventas/verificacion-citas-nuevas-concretadas/index')));
const SegundaCitaConcretada = Loadable(lazy(() => import('pages/asistente-ventas/verificacion-citas-nuevas-concretadas/segundaCitaConcretada')));
const ReporteVendedor = Loadable(lazy(() => import('pages/asistente-ventas/reportes/vendedor')));

// Dashboards Jefe de Sucursal

const AnalisisContactosJS = Loadable(lazy(() => import('pages/jefe-sucursal/dashboard/AnalisisModoContactosJS')));
const RankingVentasJS = Loadable(lazy(() => import('pages/jefe-sucursal/dashboard/RankingVentasJS')));
// const VolumenVentasJefeSucursal = Loadable(lazy(() => import('pages/jefe-sucursal/dashboard/dashboardVolumenVenta/VolumenVentas')));
const GestionVentasJefeSucursal = Loadable(lazy(() => import('pages/jefe-sucursal/dashboard/dashboardsGestionVentas/GestionVentas')));

// Dashboards Director

const AnalisisContactosDS = Loadable(lazy(() => import('pages/director/dashboard/AnalisisModoContactosDS')));
const RankingVentasDS = Loadable(lazy(() => import('pages/director/dashboard/RankingVentasDS')));
// const VolumenVentasDirector = Loadable(lazy(() => import('pages/director/dashboard/dashboardVolumenVenta/VolumenVentas')));
const GestionVentasDirector = Loadable(lazy(() => import('pages/director/dashboard/dashboardsGestionVentas/GestionVentas')));

// Dashboards Jefe de ventas
const DashboardJefeVentas = Loadable(lazy(() => import('pages/jefe-ventas/dashboard')));
const AnalisisContactos = Loadable(lazy(() => import('pages/jefe-ventas/dashboard/AnalisisModoContactos')));
const RankingVentas = Loadable(lazy(() => import('pages/jefe-ventas/dashboard/RankingVentas')));
// const VolumenVentasJefeVentas = Loadable(lazy(() => import('pages/jefe-ventas/dashboard/dashboardVolumenVenta/VolumenVentas')));
const GestionVentasJefeVentas = Loadable(lazy(() => import('pages/jefe-ventas/dashboard/dashboardsGestionVentas/GestionVentas')));

// Gestion
const ActividadesPendientesJefeVentas = Loadable(lazy(() => import('pages/jefe-ventas/ActividadesPendientes')));
const DescripcionGeneralJefeVentas = Loadable(lazy(() => import('pages/jefe-ventas/registro/tabs/DescripcionGeneral')));
const FormularioDeRegistroJefeVentas = Loadable(lazy(() => import('pages/jefe-ventas/registro/tabs/FormularioDeRegistro')));
const DocumentosContractualesJefeVentas = Loadable(lazy(() => import('pages/jefe-ventas/registro/tabs/DocumentosContractuales')));
const ReunionPersonalSemanalJefeVentas = Loadable(lazy(() => import('pages/jefe-ventas/reunionPersonalSemanal/index')));
const AsistenciaJefeVentas = Loadable(lazy(() => import('pages/jefe-ventas/reunionPersonalSemanal/tables/Asistencia')));
const ActaMejoramientoJefeVentas = Loadable(lazy(() => import('pages/jefe-ventas/reunionPersonalSemanal/tables/ActaMejoramiento')));
const PresupuestoAnualReal = Loadable(lazy(() => import('pages/jefe-ventas/presupuestoAnualReal/index')));
const ComiteSemanalJefeVenta = Loadable(lazy(() => import('pages/jefe-ventas/comiteSemanalGerencial/index')));
const GestionQuincenalJefeVenta = Loadable(lazy(() => import('pages/jefe-ventas/capacitacionQuincenal/index')));
const GestionMensualJefeVenta = Loadable(lazy(() => import('pages/jefe-ventas/comiteMensualVentas/index')));

// Reportes
const ReporteContactosJefe = Loadable(lazy(() => import('pages/jefe-ventas/reportes/contactos')));
const ReporteGestionContactosJefe = Loadable(lazy(() => import('pages/jefe-ventas/reportes/gestion_contactos')));
const ReporteCitasJefe = Loadable(lazy(() => import('pages/jefe-ventas/reportes/citas')));
const ReporteNegociosCerradosJefe = Loadable(lazy(() => import('pages/jefe-ventas/reportes/contratos/negocios_cerrados')));
const ReporteNegociosPorCerrarJefe = Loadable(lazy(() => import('pages/jefe-ventas/reportes/contratos/negocios_por_cerrar')));
const ReporteVendedores = Loadable(lazy(() => import('pages/jefe-ventas/reportes/vendedores')));

// Administrador
const ConfiguracionParametros = Loadable(lazy(() => import('pages/administrador/conf-parametros')));
const ConfiguracionBonificacionGestion = Loadable(lazy(() => import('pages/administrador/conf-bonificacion-gestion')));
const ConfiguracionLeyCompensacion = Loadable(lazy(() => import('pages/administrador/conf-ley-compensacion')));
const TablaComisiones = Loadable(lazy(() => import('pages/administrador/tablas_comisiones')));
const AnulacionContratos = Loadable(lazy(() => import('pages/administrador/anulacion_contrato')));
const RegistroUsuario = Loadable(lazy(() => import('pages/administrador/registro_usuario')));

const DescripcionGeneralAdmin = Loadable(lazy(() => import('pages/administrador/registro_usuario/registro/tabs/DescripcionGeneral')));
const DocumentosContractualesAdmin = Loadable(lazy(() => import('pages/administrador/registro_usuario/registro/tabs/DocumentosContractuales')));
const FormularioDeRegistroAdmin = Loadable(lazy(() => import('pages/administrador/registro_usuario/registro/tabs/FormularioDeRegistro')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'welcome',
          element: <Welcome />
        },
        {
          path: 'registro',
          element: <Registro />,
          children: [
            {
              path: 'descripcionGeneral',
              element: <DescripcionGeneral />
            },
            {
              path: 'formularioDeRegistro',
              element: <FormularioDeRegistro />
            },
            {
              path: 'cambioContrasena',
              element: <CambiarContrasena />
            },
            {
              path: 'documentosContractuales',
              element: <DocumentosContractuales />
            }
          ]
        },
        {
          path: 'registro/prospectos',
          element: <AsistenteDeVentas />,
          children: [
            {
              path: 'descripcionGeneral',
              element: <DescripcionGeneralAsistente />
            },
            {
              path: 'formularioDeRegistro',
              element: <FormularioDeRegistroAsistente />
            },
            {
              path: 'cambioContrasena',
              element: <CambiarContrasena />
            },
            {
              path: 'documentosContractuales',
              element: <DocumentosContractualesAsistente />
            }
          ]
        },
        {
          path: '/verificacionCitas',
          element: <VerificacionCitas />
        },
        {
          path: 'proyecto100',
          element: <Proyecto100 />
        },
        {
          path: 'dashboard/',
          children: [
            {
              path: 'volumenVentasComparativo',
              element: <VolumenVentasComparativo />
            },
            {
              path: 'volumenVentas',
              element: <VolumenVentas />
            },
            {
              path: 'negociosCerrar',
              element: <NegociosCerrar />
            },
            {
              path: 'GestionVentas',
              element: <GestionVentas />
            },
          ]
        },
        {
          path: 'contactos',
          element: <Contactos />,
          children: [
            {
              path: 'contactosTelefonicos',
              element: <ContactosTelefonicos />
            },
            {
              path: 'citas',
              element: <Citas />
            },
            {
              path: 'referidos',
              element: <Referidos />
            },
            {
              path: 'cotizaciones',
              element: <Cotizaciones />
            },
            {
              path: 'contratos',
              element: <Contratos />
            }
          ]
        },
        {
          path: 'actividadesPendientes',
          element: <ActividadesPendientes />
        },
        {
          path: 'capacitacionInicial',
          element: <CapacitacionInicial />
        },
        {
          path: 'VerificacionCitas',
          element: <VerificacionCitas />,
          children: [
            {
              path: 'segundaCitaConcretada',
              element: <SegundaCitaConcretada />
            }
          ]
        },
        {
          path: 'reunionPersonalSemanal',
          element: <ReunionPersonalSemanal />,
          children: [
            {
              path: 'asistencia',
              element: <Asistencia />
            },
            {
              path: 'actaMejoramiento',
              element: <ActaMejoramiento />
            }
          ]
        },
        {
          path: 'actividadesPendientesJefeVentas',
          element: <ActividadesPendientesJefeVentas />,
          children: [
            {
              path: 'descripcionGeneral',
              element: <DescripcionGeneralJefeVentas />
            },
            {
              path: 'formularioDeRegistro',
              element: <FormularioDeRegistroJefeVentas />
            },
            {
              path: 'documentosContractuales',
              element: <DocumentosContractualesJefeVentas />
            }
          ]
        },
        {
          path: 'reunionPersonalSemanalJefeVentas',
          element: <ReunionPersonalSemanalJefeVentas />,
          children: [
            {
              path: 'asistencia',
              element: <AsistenciaJefeVentas />
            },
            {
              path: 'actaMejoramiento',
              element: <ActaMejoramientoJefeVentas />
            }
          ]
        },
        {
          path: 'reunionPersonalSemanalJefeVentas',
          element: <ReunionPersonalSemanalJefeVentas />,
          children: [
            {
              path: 'rps/pendientes',
              element: <RpsSiguientesJefeVentas />
            },
            {
              path: 'rps/cerradas',
              element: <RpsTodasJefeVentas />
            }
          ]
        },
        {
          path: 'reunionPersonalSemanalJefeVentas/rps/pendientes/detalles/:idReunion',
          element: <RpsDetalles />
        },
        {
          path: 'jefeVentas/transferenciaContactos',
          element: <TransferenciaContactosJefeVentas />
        },
        {
          path: 'gestionQuincenal',
          element: <GestionQuincenal />
        },
        {
          path: 'capacitacionQuincenalJefeVenta',
          element: <GestionQuincenalJefeVenta />
        },
        {
          path: 'comiteMensualVentasJefeVenta',
          element: <GestionMensualJefeVenta />
        },
        {
          path: 'gestionMensual',
          element: <GestionMensual />
        },
        {
          path: 'comiteSemanalGerencial',
          element: <ComiteSemanal />
        },
        {
          path: 'comiteSemanalGerencialJefeVenta',
          element: <ComiteSemanalJefeVenta />
        },
        {
          path: 'confParametros',
          element: <ConfiguracionParametros />
        },
        {
          path: 'confBonificacionGestion',
          element: <ConfiguracionBonificacionGestion />
        },
        {
          path: 'confLeyCompensacion',
          element: <ConfiguracionLeyCompensacion />
        },
        {
          path: 'confTablaComisiones',
          element: <TablaComisiones />
        },
        {
          path: 'anulacionContratos',
          element: <AnulacionContratos />
        },
        {
          path: '/asistente/dashboard',
          element: <DashboardAsistente />
        },
        {
          path: '/asistente/reportes/vendedor',
          element: <ReporteVendedor />
        },
        {
          path: '/vendedor/reportes/contactos',
          element: <ReporteContactos />
        },
        {
          path: '/vendedor/reportes/citas',
          element: <ReporteCitas />
        },
        {
          path: '/vendedor/reportes/gestionContactos',
          element: <ReporteGestionContactos />
        },
        {
          path: '/vendedor/reportes/contratos',
          element: <ReporteContratos />
        },
        {
          path: '/vendedor/reportes/negocios',
          element: <ReporteNegociosCerrar />
        },
        {
          path: '/jefe/dashboard',
          element: <DashboardJefeVentas />
        },
        // {
        //   path: 'jefe/dashboard/volumenVentasJefeVentas',
        //   element: <VolumenVentasJefeVentas />
        // },
        {
          path: '/jefe/dashboard/gestionVentasJefeVentas',
          element: <GestionVentasJefeVentas />
        },

        {
          path: '/dashboard/AnalisisModoContactos',
          element: <AnalisisContactos />
        },

        {
          path: '/dashboard/RankingVentas',
          element: <RankingVentas />
        },


        //JEFE SUCURSAL
        {
          path: '/dashboard/AnalisisModoContactoJS',
          element: <AnalisisContactosJS />
        },
        {
          path: '/dashboard/RankingVentasJS',
          element: <RankingVentasJS />
        },
        // {
        //   path: '/jefe/dashboard/volumenVentasJefeSucursal',
        //   element: <VolumenVentasJefeVentas />
        // },
        {
          path: '/jefe/dashboard/gestionVentasJefeSucursal',
          element: <GestionVentasJefeSucursal/>
        },



        //DIRECTOR
        {
          path: '/dashboard/AnalisisModoContactoDS',
          element: <AnalisisContactosDS />
        },

        {
          path: '/dashboard/RankingVentasDS',
          element: <RankingVentasDS />
        },
        // {
        //   path: '/jefe/dashboard/volumenVentasDirector',
        //   element: <VolumenVentasJefeVentas />
        // },
        {
          path: '/jefe/dashboard/gestionVentasDirector',
          element: <GestionVentasDirector />
        },




        {
          path: '/jefe/reportes/contactos',
          element: <ReporteContactosJefe />
        },
        {
          path: '/jefe/reportes/gestionContactos',
          element: <ReporteGestionContactosJefe />
        },
        {
          path: '/jefe/reportes/citas',
          element: <ReporteCitasJefe />
        },
        {
          path: '/jefe/reportes/negociosCerrados',
          element: <ReporteNegociosCerradosJefe />
        },
        {
          path: '/jefe/reportes/negociosCerrar',
          element: <ReporteNegociosPorCerrarJefe />
        },
        {
          path: '/jefe/reportes/vendedores',
          element: <ReporteVendedores />
        },
        {
          path: '/admin/registro/usuarios',
          element: <RegistroUsuario />,
          children: [
            {
              path: 'descripcionGeneral',
              element: <DescripcionGeneralAdmin />
            },
            {
              path: 'formularioDeRegistro',
              element: <FormularioDeRegistroAdmin />
            },
            {
              path: 'documentosContractuales',
              element: <DocumentosContractualesAdmin />
            }
          ]
        },
      ]
    },
    {
      path: '/maintenance',
      element: <CommonLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        }
      ]
    },
  ]
};

export default MainRoutes;

// {
//   // Ruta para creacion de usuarios
//   path: 'admin/usuarios/',
//   element: <RegistroUsuario />
// }m
// {
//   path: 'admin/usuarios',
//   children: [
//     {
//       path: 'descripcionGeneral',
//       element: <DescripcionGeneralAsistente />
//     },
//     {
//       path: 'formularioDeRegistro',
//       element: <FormularioDeRegistroAsistente />
//     },
//     {
//       path: 'cambioContrasena',
//       element: <CambiarContrasena />
//     },
//     {
//       path: 'documentosContractuales',
//       element: <DocumentosContractualesAsistente />
//     }
//   ]
// },
// {
//   path: 'registroUsuario',
//   element: <RegistroUsuario />,
//   children: [{
//     path: 'asistenteVentas',
//     children: [
//       {
//         path: 'descripcionGeneral',
//         element: <DescripcionGeneralAsistenteAdmin />
//       },
//       {
//         path: 'formularioDeRegistro',
//         element: <FormularioDeRegistroAsistenteAdmin />
//       },
//       {
//         path: 'documentosContractuales',
//         element: <DocumentosContractualesAsistenteAdmin />
//       }
//     ]
//   },
//   {
//     path: 'vendedor',
//     children: [
//       {
//         path: 'descripcionGeneral',
//         element: <DescripcionGeneralAsistenteAdmin />
//       },
//       {
//         path: 'formularioDeRegistro',
//         element: <FormularioDeRegistroAsistenteAdmin />
//       },
//       {
//         path: 'documentosContractuales',
//         element: <DocumentosContractualesAsistenteAdmin />
//       }
//     ]
//   },
//   {
//     path: 'jefeVentas',
//     children: [
//       {
//         path: 'descripcionGeneral',
//         element: <DescripcionGeneralAsistenteAdmin />
//       },
//       {
//         path: 'formularioDeRegistro',
//         element: <FormularioDeRegistroAsistenteAdmin />
//       },
//       {
//         path: 'documentosContractuales',
//         element: <DocumentosContractualesAsistenteAdmin />
//       }
//     ]
//   },
//   ]
// },
