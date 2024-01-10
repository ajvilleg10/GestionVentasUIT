import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import AsistenteDeVentas from 'pages/asistente-ventas';

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
const Dashboard = Loadable(lazy(() => import('pages/vendedor/Dashboard')));
const Contactos = Loadable(lazy(() => import('pages/vendedor/contactos/Contactos')));
const ContactosTelefonicos = Loadable(lazy(() => import('pages/vendedor/contactos/contactoDetailsTabs/contactosTelefonicos')));
const Citas = Loadable(lazy(() => import('pages/vendedor/contactos/contactoDetailsTabs/citas')));
const Referidos = Loadable(lazy(() => import('pages/vendedor/contactos/contactoDetailsTabs/referidos')));
const Cotizaciones = Loadable(lazy(() => import('pages/vendedor/contactos/contactoDetailsTabs/cotizaciones')));
const Contratos = Loadable(lazy(() => import('pages/vendedor/contactos/contactoDetailsTabs/contratos')));
const ActividadesPendientes = Loadable(lazy(() => import('pages/vendedor/actividades-pendientes/index')));

// Asistente de Ventas
const DescripcionGeneralAsistente = Loadable(lazy(() => import('pages/asistente-ventas/registro/tabs/DescripcionGeneral')));
const FormularioDeRegistroAsistente = Loadable(lazy(() => import('pages/asistente-ventas/registro/tabs/FormularioDeRegistro')));

const CapacitacionInicial = Loadable(lazy(() => import('pages/asistente-ventas/capacitacionInicial/CapacitacionInicial')));

const ReunionPersonalSemanal = Loadable(lazy(() => import('pages/asistente-ventas/reunionPersonalSemanal/index')));
const Asistencia = Loadable(lazy(() => import('pages/asistente-ventas/reunionPersonalSemanal/tables/Asistencia')));
const ActaMejoramiento = Loadable(lazy(() => import('pages/asistente-ventas/reunionPersonalSemanal/tables/ActaMejoramiento')));

const GestionQuincenal = Loadable(lazy(() => import('pages/asistente-ventas/gestion-quincenal/index')));
const GestionMensual = Loadable(lazy(() => import('pages/asistente-ventas/gestion-mensual/index')));
const VerificacionCitas = Loadable(lazy(() => import('pages/asistente-ventas/verificacion-citas-nuevas-concretadas/index')));
const SegundaCitaConcretada = Loadable(lazy(() => import('pages/asistente-ventas/verificacion-citas-nuevas-concretadas/segundaCitaConcretada')));

// Jefe de Ventas
const ActividadesPendientesJefeVentas = Loadable(lazy(() => import('pages/jefe-ventas/ActividadesPendientes')));

// Administrador
const ConfiguracionParametros = Loadable(lazy(() => import('pages/administrador/conf-parametros')));
const ConfiguracionBonificacionGestion = Loadable(lazy(() => import('pages/administrador/conf-bonificacion-gestion')));
const ConfiguracionLeyCompensacion = Loadable(lazy(() => import('pages/administrador/conf-ley-compensacion')));
const TablaComisiones = Loadable(lazy(() => import('pages/administrador/tablas_comisiones')));
const AnulacionContratos = Loadable(lazy(() => import('pages/administrador/anulacion_contrato')));
const RegistroUsuario = Loadable(lazy(() => import('pages/administrador/registro_usuario')));
const DescripcionGeneralAsistenteAdmin = Loadable(lazy(() => import('pages/administrador/registro_usuario/registro_asistenteVentas/tabs/DescripcionGeneral')));
const FormularioDeRegistroAsistenteAdmin = Loadable(lazy(() => import('pages/administrador/registro_usuario/registro_asistenteVentas/tabs/FormulariodeRegistro')));
const DocumentosContractualesAsistenteAdmin = Loadable(lazy(() => import('pages/administrador/registro_usuario/registro_asistenteVentas/tabs/DocumentosContractuales')));


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
              element: <DocumentosContractuales />
            }
          ]
        },
        {
          path: 'proyecto100',
          element: <Proyecto100 />
        },
        {
          path: 'dashboard',
          element: <Dashboard />
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
          element: <ActividadesPendientesJefeVentas />
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
          path: 'registroUsuario',
          element: <RegistroUsuario />,
          children: [{
            path: 'asistenteVentas',
            children: [
              {
                path: 'descripcionGeneral',
                element: <DescripcionGeneralAsistenteAdmin />
              },
              {
                path: 'formularioDeRegistro',
                element: <FormularioDeRegistroAsistenteAdmin />
              },
              {
                path: 'documentosContractuales',
                element: <DocumentosContractualesAsistenteAdmin />
              }
            ]
          },
          {
            path: 'vendedor',
            children: [
              {
                path: 'descripcionGeneral',
                element: <DescripcionGeneralAsistenteAdmin />
              },
              {
                path: 'formularioDeRegistro',
                element: <FormularioDeRegistroAsistenteAdmin />
              },
              {
                path: 'documentosContractuales',
                element: <DocumentosContractualesAsistenteAdmin />
              }
            ]
          },
          {
            path: 'jefeVentas',
            children: [
              {
                path: 'descripcionGeneral',
                element: <DescripcionGeneralAsistenteAdmin />
              },
              {
                path: 'formularioDeRegistro',
                element: <FormularioDeRegistroAsistenteAdmin />
              },
              {
                path: 'documentosContractuales',
                element: <DocumentosContractualesAsistenteAdmin />
              }
            ]
          },
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
