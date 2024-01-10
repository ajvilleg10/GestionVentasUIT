// TODO: poner en base Oficina, titulos, ciudades y estados civiles
export const OFICINAS = ['Guayaquil - Ecuador'];
export const TITULOS = ['Ingeniero', 'Economista', 'Bachiller', 'No aplica (N/A)', 'Otro (especifique)'];
export const CIUDADES = ['Guayaquil', 'Quito', 'Cuenca', 'Otro (especifique)'];
export const ESTADOS_CIVILES = ['Soltero', 'Casado', 'Viudo', 'Divorciado', 'Unión de hecho'];

export const ASISTENCIA = { 'SI': true, 'NO': false };
export const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
export const MODALIDADES = ['Virtual', 'Presencial']
export const MIERCOLES = 3;
export const VIERNES = 5;
export const MAXIMO_DIAS_CAPACITACION = 5;

export const PAGE_SIZE = 10;

export const REUNION = {
  Mensual: 'mensual',
  Semanal: 'semanal',
  Quincenal: 'quincenal'
}

export const DOCUMENTOS_CONTRACTUALES = {
  Cedula: 'Copia de Cédula',
  Contrato: 'Contrato Laboral',
  CV: 'Hoja de Vida'
}

export const ROLES = {
  asistente: 'asistente',
  prospecto: 'prospecto_vendedor',
  admin: 'admin',
  jefeV: 'jefe_ventas',
  director: 'director_operaciones',
  jefeS: 'jefe_sucursal',
  vendedor: 'vendedor',
  ceo: 'ceo'
};

export const REDIRECCIONES = {
  asistente: '/asistente/dashboard',
  prospecto_vendedor: "/registro",
  admin: '/admin/registro/usuarios',
  jefe_ventas: '/dashboard/AnalisisModoContactos',
  director_operaciones: "/dashboard/AnalisisModoContactoDS",
  jefe_sucursal: "/dashboard/RankingVentasJS",
  vendedor: '/dashboard/volumenVentas',
  ceo: '/dashboard/dashboardCEO'
};
