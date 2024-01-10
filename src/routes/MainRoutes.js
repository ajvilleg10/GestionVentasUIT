import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import RpsSiguientesJefeVentas from 'pages/jefe-ventas/reunionPersonalSemanal/tabs/RpsSiguientesJefeVentas';
import RpsTodasJefeVentas from 'pages/jefe-ventas/reunionPersonalSemanal/tabs/RpsTodasJefeVentas';
import RpsDetalles from 'pages/jefe-ventas/reunionPersonalSemanal/rpsDetalles/RpsDetalles';
import TransferenciaContactosJefeVentas from 'pages/jefe-ventas/transferenciaContactos/TransferenciaContactosJefeVentas';

// const Welcome = Loadable(lazy(() => import('pages/Welcome')));
// const CambiarContrasena = Loadable(lazy(() => import('pages/prospecto-vendedor/registro/tabs/CambiarContrasena')));

// Paginas de mantenimiento
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));

// PROSPECTO VENDEDOR
const Proyecto100 = Loadable(lazy(() => import('pages/prospecto-vendedor/proyecto100/Proyecto100')));
const Registro = Loadable(lazy(() => import('pages/prospecto-vendedor/registro/Registro')));
const DescripcionGeneral = Loadable(lazy(() => import('pages/prospecto-vendedor/registro/tabs/DescripcionGeneral')));
const FormularioDeRegistro = Loadable(lazy(() => import('pages/prospecto-vendedor/registro/tabs/FormularioDeRegistro')));
const DocumentosContractuales = Loadable(lazy(() => import('pages/prospecto-vendedor/registro/tabs/DocumentosContractuales')));

// ASISTENTE DE VENTAS
// Item 1
const DashboardAsistente = Loadable(lazy(() => import('pages/asistente-ventas/dashboard')));
// Item 3
const AsistenteDeVentas = Loadable(lazy(() => import('pages/asistente-ventas')));
const DescripcionGeneralAsistente = Loadable(lazy(() => import('pages/asistente-ventas/registro/tabs/DescripcionGeneral')));
const FormularioDeRegistroAsistente = Loadable(lazy(() => import('pages/asistente-ventas/registro/tabs/FormularioDeRegistro')));
const DocumentosContractualesAsistente = Loadable(lazy(() => import('pages/asistente-ventas/registro/tabs/DocumentosContractuales')));
// Item 4
const VerificacionCitas = Loadable(lazy(() => import('pages/asistente-ventas/verificacion-citas-nuevas-concretadas/index')));
const SegundaCitaConcretada = Loadable(lazy(() => import('pages/asistente-ventas/verificacion-citas-nuevas-concretadas/segundaCitaConcretada')));
// Item 5
const CapacitacionInicial = Loadable(lazy(() => import('pages/asistente-ventas/capacitacionInicial/CapacitacionInicial')));
// Item 6
const ReunionPersonalSemanal = Loadable(lazy(() => import('pages/asistente-ventas/reunionPersonalSemanal/index')));
const Asistencia = Loadable(lazy(() => import('pages/asistente-ventas/reunionPersonalSemanal/tables/Asistencia')));
const ActaMejoramiento = Loadable(lazy(() => import('pages/asistente-ventas/reunionPersonalSemanal/tables/ActaMejoramiento')));
// Item 7
const ComiteSemanal = Loadable(lazy(() => import('pages/asistente-ventas/comite-semanal-gerencial')));
// Item 8
const GestionQuincenal = Loadable(lazy(() => import('pages/asistente-ventas/gestion-quincenal/index')));
// Item 9
const GestionMensual = Loadable(lazy(() => import('pages/asistente-ventas/gestion-mensual/index')));
// Item 10
// const ReporteVendedor = Loadable(lazy(() => import('pages/asistente-ventas/reportes/vendedor')));

// VENDEDOR
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
// const Cotizacion = Loadable(lazy(() => import('pages/vendedor/cotizacion')));
// Reportes
const ReporteContactos = Loadable(lazy(() => import('pages/vendedor/reportes/contactos')));
const ReporteGestionContactos = Loadable(lazy(() => import('pages/vendedor/reportes/gestion_contactos')));
const ReporteCitas = Loadable(lazy(() => import('pages/vendedor/reportes/citas')));
const ReporteContratos = Loadable(lazy(() => import('pages/vendedor/reportes/contratos')));
const ReporteNegociosCerrar = Loadable(lazy(() => import('pages/vendedor/reportes/negocios_cerrar')));

// const InformacionUsuario = Loadable(lazy(() => import('pages/asistente-ventas/informacion/Informacion')));
// const DescripcionGeneralUser = Loadable(lazy(() => import('pages/asistente-ventas/informacion/tabs/DescripcionGeneral')));

// Dashboards Jefe de Sucursal

const AnalisisContactosJS = Loadable(lazy(() => import('pages/jefe-sucursal/dashboard/AnalisisModoContactosJS')));
const RankingVentasJS = Loadable(lazy(() => import('pages/jefe-sucursal/dashboard/RankingVentasJS')));
// const VolumenVentasJefeSucursal = Loadable(lazy(() => import('pages/jefe-sucursal/dashboard/dashboardVolumenVenta/VolumenVentas')));
const GestionVentasJefeSucursal = Loadable(lazy(() => import('pages/jefe-sucursal/dashboard/dashboardsGestionVentas/GestionVentas')));

// Vendedor
const AnalisisContactosJV = Loadable(lazy(() => import('pages/jefe-ventas/dashboard/AnalisisModoContactos')));
const CarteraJV = Loadable(lazy(() => import('pages/jefe-ventas/dashboard/CarteraActiva')));
const RankingVentasJV = Loadable(lazy(() => import('pages/jefe-ventas/dashboard/RankingVentas')));


// Dashboards Director

const AnalisisContactosDS = Loadable(lazy(() => import('pages/director/dashboard/AnalisisModoContactosDS')));
const RankingVentasDS = Loadable(lazy(() => import('pages/director/dashboard/RankingVentasDS')));
// const VolumenVentasDirector = Loadable(lazy(() => import('pages/director/dashboard/dashboardVolumenVenta/VolumenVentas')));
const GestionVentasDirector = Loadable(lazy(() => import('pages/director/dashboard/dashboardsGestionVentas/GestionVentas')));

// Dashboards Jefe de ventas
const DashboardJefeVentas = Loadable(lazy(() => import('pages/jefe-ventas/dashboard')));
const VolumenVentasJefeVentas = Loadable(lazy(() => import('pages/jefe-ventas/dashboard/dashboardVolumenVenta/VolumenVentas')));
const GestionVentasJefeVentas = Loadable(lazy(() => import('pages/jefe-ventas/dashboard/dashboardsGestionVentas/GestionVentas')));

const AnalisisContactos = Loadable(lazy(() => import('pages/jefe-ventas/dashboard/AnalisisModoContactos')));
const RankingVentas = Loadable(lazy(() => import('pages/jefe-ventas/dashboard/RankingVentas')));
// const VolumenVentasJefeVentas = Loadable(lazy(() => import('pages/jefe-ventas/dashboard/dashboardVolumenVenta/VolumenVentas')));
//const GestionVentasJefeVentas = Loadable(lazy(() => import('pages/jefe-ventas/dashboard/dashboardsGestionVentas/GestionVentas')));

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
const ReporteVentasNuevas = Loadable(lazy(() => import('pages/jefe-ventas/reportes/nuevas_ventas')));
const ReporteRenovacionesJefe = Loadable(lazy(() => import('pages/jefe-ventas/reportes/renovaciones')));
const ReporteCapacitacionQuincenalJefe = Loadable(lazy(() => import('pages/jefe-ventas/reportes/reuniones/capacitacion_quincenal')));
const ReporteComiteMensualJefe = Loadable(lazy(() => import('pages/jefe-ventas/reportes/reuniones/comite_mensual')));
const ReporteComiteSemanalJefe = Loadable(lazy(() => import('pages/jefe-ventas/reportes/reuniones/comite_semanal')));
const ReporteReunionPersonalSemanalJefe = Loadable(lazy(() => import('pages/jefe-ventas/reportes/reuniones/reunion_semanal')));
const ReporteCapacitacionInicialJefe = Loadable(lazy(() => import('pages/jefe-ventas/reportes/capacitacion_inicial')));
const ReporteTransferenciaJefe = Loadable(lazy(() => import('pages/jefe-ventas/reportes/transferencia_contactos')));

// Jefe de Sucursal
const CarteraJS = Loadable(lazy(() => import('pages/jefe-sucursal/dashboard/CustomSelect')));

// CEO
const DashboardCEO = Loadable(lazy(() => import('pages/ceo/dashboard/dashboardCEO')));

//Director
const CarteraDirect = Loadable(lazy(() => import('pages/director/dashboard/CustomSelect')));
const VolumenDirec = Loadable(lazy(() => import('pages/director/dashboard/VolumenVentasDirec')));

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
const Liquidacion = Loadable(lazy(() => import('pages/administrador/liquidacion')));

// GENERAL
const InformacionUsuario = Loadable(lazy(() => import('sections/users/informacion/Informacion')));
const DescripcionGeneralUser = Loadable(lazy(() => import('sections/users/informacion/tabs/DescripcionGeneral')));
const InformacionDeRegistro = Loadable(lazy(() => import('sections/users/informacion/tabs/InformacionDeRegistro')));
const DocumentosContractualesUser = Loadable(lazy(() => import('sections/users/informacion/tabs/DocumentosContractuales')));

// TODO: Generar un guard para que otros roles no puedan ver rutas de otros roles
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
        // {
        //   path: 'welcome',
        //   element: <Welcome />
        // },
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
            // {
            //   path: 'cambiarContrasena',
            //   element: <CambiarContrasena />
            // },
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
            // {
            //   path: 'cambioContrasena',
            //   element: <CambiarContrasena />
            // },
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
              path: 'dashboardCEO',
              element: <DashboardCEO />
            },
            {
              path: 'negociosCerrar',
              element: <NegociosCerrar />
            },
            {
              path: 'negociosCerrar',
              element: <NegociosCerrar />
            },
            {
              path: 'GestionVentas',
              element: <GestionVentas />
            },
            {
              path: 'analisisModoContactosJV',
              element: <AnalisisContactosJV />
            },
            {
              path: 'carteraActivaJV',
              element: <CarteraJV />
            },

            {
              path: 'rankingVentasJV',
              element: <RankingVentasJV />
            },
            {
              path: 'carteraActivaJS',
              element: <CarteraJS />
            },
            {
              path: 'CarteraActivaDirect',
              element: <CarteraDirect />
            },
            {
              path: 'VolumenVentasDirec',
              element: <VolumenDirec />
            }
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
        // {
        //   path: '/vendedor/cotizacionContacto',
        //   element: <Cotizacion />
        // },
        {
          path: 'actividadesPendientes',
          element: <ActividadesPendientes />
        },
        {
          path: 'capacitacionInicial',
          element: <CapacitacionInicial />
        },
        {
          path: '/asistenteVentas/verificacionCitas',
          element: <VerificacionCitas />,
        },
        {
          path: '/segundaCitaConcretada/',
          element: <SegundaCitaConcretada />,
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
          path: 'jefeVentas/presupuestoRealAnuals',
          element: <PresupuestoAnualReal />
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
          path: 'gestionQuincenal',
          element: <GestionQuincenal />
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
          path: '/informacion',
          element: <InformacionUsuario />,
          children: [
            {
              path: 'descripcionGeneral',
              element: <DescripcionGeneralUser />
            },
            {
              path: 'informacionDeRegistro',
              element: <InformacionDeRegistro />
            },
            {
              path: 'documentosContractuales',
              element: <DocumentosContractualesUser />
            }
          ]
        },
        // {
        //   path: '/asistente/reportes/vendedor',
        //   element: <ReporteVendedor />
        // },
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
        /*
        {
          path: '/jefe/dashboard',
          element: <DashboardJefeVentas />
        },*/
        {
          path: 'jefe/dashboard/volumenVentasJefeVentas',
          element: <VolumenVentasJefeVentas />
        },
        {
          path: '/jefe/dashboard/gestionVentasJefeVentas',
          element: <GestionVentasJefeVentas />
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
          element: <GestionVentasJefeSucursal />
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
          path: '/jefe/reportes/ventasNuevas',
          element: <ReporteVentasNuevas />
        },
        {
          path: '/jefe/reportes/renovaciones',
          element: <ReporteRenovacionesJefe />
        },
        {
          path: '/jefe/reportes/reuniones/capacitacionQuincenal',
          element: <ReporteCapacitacionQuincenalJefe />
        },
        {
          path: '/jefe/reportes/reuniones/comiteMensual',
          element: <ReporteComiteMensualJefe />
        },
        {
          path: '/jefe/reportes/reuniones/comiteSemanal',
          element: <ReporteComiteSemanalJefe />
        },
        {
          path: '/jefe/reportes/reuniones/reunionPersonalSemanal',
          element: <ReporteReunionPersonalSemanalJefe />
        },
        {
          path: '/jefe/reportes/capacitacionInicial',
          element: <ReporteCapacitacionInicialJefe />
        },
        {
          path: '/jefe/reportes/transaferenciaContactos',
          element: <ReporteTransferenciaJefe />
        },
        {
          path: '/liquidacion',
          element: <Liquidacion />
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

// NOTE: Futuros cambios
// TODO: Completar las rutas de los roles
const MainRoutes2 = {
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
        // RUTAS PARA PROSPECTO DE VENDEDOR
        {
          path: 'prospecto_vendedor',
          children: [
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
                  path: 'documentosContractuales',
                  element: <DocumentosContractuales />
                }
              ]
            }
          ]
        },
        {
          path: 'asistente',
          children: [
            {
              path: 'dashboard',
              element: <DashboardAsistente />
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
                  path: 'documentosContractuales',
                  element: <DocumentosContractualesAsistente />
                }
                // {
                //   path: 'cambioContrasena',
                //   element: <CambiarContrasena />
                // },
              ]
            },
            {
              path: '/verificacionCitas',
              element: <VerificacionCitas />
            },
            {
              path: '/segundaCitaConcretada/',
              element: <SegundaCitaConcretada />,
            },
            {
              path: 'capacitacionInicial',
              element: <CapacitacionInicial />
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
              path: 'comiteSemanalGerencial',
              element: <ComiteSemanal />
            },
            {
              path: 'gestionQuincenal',
              element: <GestionQuincenal />
            },
            {
              path: 'gestionMensual',
              element: <GestionMensual />
            },
          ],
        },
        // RUTAS GENERALES
        {
          path: '/informacion',
          element: <InformacionUsuario />,
          children: [
            {
              path: 'descripcionGeneral',
              element: <DescripcionGeneralUser />
            },
            {
              path: 'informacionDeRegistro',
              element: <InformacionDeRegistro />
            },
            {
              path: 'documentosContractuales',
              element: <DocumentosContractualesUser />
            }
          ]
        },
        {
          path: 'maintenance',
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
      ],
    },
  ]
};

export default MainRoutes;
