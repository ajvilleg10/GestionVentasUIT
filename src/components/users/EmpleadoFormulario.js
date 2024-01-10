import {
  Grid,
  List,
  ListItem,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
  Button,
  useMediaQuery
} from '@mui/material';

import { useState } from 'react';

const EmpleadoFormulario = ({ formik, tipos, asistentes, jefesDeVentas }) => {

  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [selectJefe, setJefeSelected] = useState(false);
  const [directorSelected, setDirectorSelected] = useState(false);
  const [vendedorSelected, setVendedorSelected] = useState(false);

  return (
    <form onSubmit={formik.handleSubmit}>
      <List>
        <ListItem divider={!matchDownMD}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <InputLabel id="tipoDeUsuario">Tipo de Usuario*</InputLabel>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={formik.touched.tipoDeUsuario && Boolean(formik.errors.tipoDeUsuario)}>
                <Select
                  labelId="tipoDeUsuario"
                  id="tipoDeUsuarioSelect"
                  name="tipoDeUsuario"
                  value={formik.values.tipoDeUsuario}
                  onChange={(e) => {

                    const tipo = tipos.filter((t) => t.id === Number(e.target.value))[0];

                    setVendedorSelected(tipo.alias === 'prospecto_vendedor');
                    setJefeSelected(tipo.alias === 'jefe_ventas');
                    setDirectorSelected(tipo.alias === 'director_operaciones');

                    formik.setFieldValue('user_type', tipo.alias);
                    formik.handleChange(e);

                  }}
                >
                  {tipos?.map((tipoUsuario) => (
                    <MenuItem value={tipoUsuario.id} key={tipoUsuario.id}>
                      {tipoUsuario.nombre_tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {(formik.touched.tipoDeUsuario && Boolean(formik.errors.tipoDeUsuario)) && (
                <FormHelperText error>
                  {formik.errors.tipoDeUsuario}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </ListItem>
        {selectJefe && (
          <ListItem divider={!matchDownMD}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={2} display="flex" alignItems="center">
                <InputLabel id="asistente_ventas_id">Asistente de Ventas*</InputLabel>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={formik.touched.asistente_ventas_id && Boolean(formik.errors.asistente_ventas_id)}>
                  <Select
                    id="asistente_ventas_id_select"
                    name="asistente_ventas_id"
                    value={formik.values.asistente_ventas_id}
                    onChange={formik.handleChange}
                  >
                    {asistentes.length === 0 && (
                      <MenuItem disabled value={'empty'} key={'empty'}>
                        No existen asistentes de venta
                      </MenuItem>
                    )}
                    {asistentes.map((asistente) => (
                      <MenuItem value={asistente.id} key={asistente.id}>
                        {`${asistente.Empleado.nombres} ${asistente.Empleado.apellidos}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {(formik.touched.asistente_ventas_id && Boolean(formik.errors.asistente_ventas_id)) && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {' '}
                    {formik.errors.asistente_ventas_id}{' '}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
          </ListItem>
        )}
        {!directorSelected && (
          <ListItem divider={!matchDownMD}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={2} display="flex" alignItems="center">
                <InputLabel id="oficina">Oficina*</InputLabel>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={formik.touched.oficina && Boolean(formik.errors.oficina)}>
                  <Select
                    labelId="oficina"
                    id="oficinaSelect"
                    name="oficina"
                    value={formik.values.oficina}
                    disabled
                  // onChange={formik.handleChange}
                  >
                    <MenuItem value={formik.values.oficina}>
                      {formik.values.oficina}
                    </MenuItem>
                    {/* {OFICINAS.map((oficina) => ( */}
                    {/*   <MenuItem value={oficina} key={oficina}> */}
                    {/*     {oficina} */}
                    {/*   </MenuItem> */}
                    {/* ))} */}
                  </Select>
                </FormControl>
                {/* {(formik.touched.oficina && Boolean(formik.errors.oficina)) && ( */}
                {/*   <FormHelperText error id="standard-weight-helper-text-email-login"> */}
                {/*     {' '} */}
                {/*     {formik.errors.oficina}{' '} */}
                {/*   </FormHelperText> */}
                {/* )} */}
              </Grid>
            </Grid>
          </ListItem>
        )}
        <ListItem divider={!matchDownMD}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <InputLabel htmlFor="nombres">Nombres*</InputLabel>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                id="nombres"
                name="nombres"
                value={formik.values.nombres}
                onChange={formik.handleChange}
                error={formik.touched.nombres && Boolean(formik.errors.nombres)}
                helperText={formik.touched.nombres && formik.errors.nombres}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem divider={!matchDownMD}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <InputLabel htmlFor="apellidos">Apellidos*</InputLabel>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                id="apellidos"
                name="apellidos"
                value={formik.values.apellidos}
                onChange={formik.handleChange}
                error={formik.touched.apellidos && Boolean(formik.errors.apellidos)}
                helperText={formik.touched.apellidos && formik.errors.apellidos}
              />
            </Grid>
          </Grid>
        </ListItem>
        {vendedorSelected && (
          <>
            <ListItem divider={!matchDownMD}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={2} display="flex" alignItems="center">
                  <InputLabel id="asistente_ventas_id">Jefe de Ventas*</InputLabel>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={formik.touched.jefe_ventas_id && Boolean(formik.errors.jefe_ventas_id)}>
                    <Select
                      id="jefe_ventas_id_select"
                      name="jefe_ventas_id"
                      value={formik.values.jefe_ventas_id}
                      onChange={formik.handleChange}
                    >
                      {jefesDeVentas.length === 0 && (
                        <MenuItem disabled value={'empty-j'} key={'empty-j'}>
                          No existen jefes de venta
                        </MenuItem>
                      )}
                      {jefesDeVentas.map((jefe) => (
                        <MenuItem value={jefe.id} key={jefe.id}>
                          {`${jefe.Empleado.nombres} ${jefe.Empleado.apellidos}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {(formik.touched.jefe_ventas_id && Boolean(formik.errors.jefe_ventas_id)) && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {' '}
                      {formik.errors.jefe_ventas_id}{' '}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </ListItem>
          </>
        )}
        <ListItem divider={!matchDownMD}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <InputLabel htmlFor="email">Correo*</InputLabel>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem divider={!matchDownMD}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <InputLabel htmlFor="password">Contraseña*</InputLabel>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem divider={!matchDownMD}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <InputLabel htmlFor="trabajo_actual">Trabajo actual*</InputLabel>
            </Grid>
            <Grid item xs={12} md={1}>
              <FormControl fullWidth>
                <Select
                  id="trabajo_actual_select_id"
                  name="trabajo_actual"
                  value={formik.values.trabajo_actual}
                  onChange={formik.handleChange}
                >
                  <MenuItem value={'NO'}>{'NO'}</MenuItem>
                  <MenuItem value={'SI'}>{'SI'}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Nombre de la empresa actual"
                disabled={formik.values.trabajo_actual === 'NO'}
                variant="outlined"
                id="nombre_empresa"
                name="nombre_empresa"
                value={formik.values.nombre_empresa}
                onChange={formik.handleChange}
                error={formik.touched.nombre_empresa && Boolean(formik.errors.nombre_empresa)}
                helperText={formik.touched.nombre_empresa && formik.errors.nombre_empresa}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem divider={!matchDownMD}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting}
              >
                Crear
              </Button>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </form>
  );
}

export default EmpleadoFormulario;
