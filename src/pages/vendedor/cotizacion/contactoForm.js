import { Grid, InputLabel, List, ListItem, TextField } from "@mui/material";

const ContactoFormulario = ({ formik }) => {

  return (
    <List sx={{ py: 0 }}>
      <ListItem divider>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2} display="flex" alignItems="center">
            <InputLabel>Número de cédula</InputLabel>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="numero_cedula_id"
              name="numero_cedula"
              value={formik.values.numero_cedula}
              onChange={formik.handleChange}
              inputProps={{ maxLength: 10 }}
              error={formik.touched.numero_cedula && Boolean(formik.errors.numero_cedula)}
              helperText={formik.touched.numero_cedula && formik.errors.numero_cedula}
            />
          </Grid>
          <Grid item md={1} />
          <Grid item xs={12} md={2} display="flex" alignItems="center">
            <InputLabel>Email</InputLabel>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="email_id"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              inputProps={{ maxLength: 100 }}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item md={1} />
        </Grid>
      </ListItem>
      <ListItem divider>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2} display="flex" alignItems="center">
            <InputLabel>Nombres</InputLabel>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="nombres_id"
              name="nombres"
              value={formik.values.nombres}
              onChange={formik.handleChange}
              inputProps={{ maxLength: 100 }}
              error={formik.touched.nombres && Boolean(formik.errors.nombres)}
              helperText={formik.touched.nombres && formik.errors.nombres}
            />
          </Grid>
          <Grid item md={1} />
          <Grid item xs={12} md={2} display="flex" alignItems="center">
            <InputLabel>Número de celular</InputLabel>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="numero_celular_id"
              name="numero_celular"
              value={formik.values.numero_celular}
              onChange={formik.handleChange}
              inputProps={{ maxLength: 10 }}
              error={formik.touched.numero_celular && Boolean(formik.errors.numero_celular)}
              helperText={formik.touched.numero_celular && formik.errors.numero_celular}
            />
          </Grid>
          <Grid item md={1} />
        </Grid>
      </ListItem>
      <ListItem divider>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2} display="flex" alignItems="center">
            <InputLabel>Apellidos</InputLabel>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="apellidos_id"
              name="apellidos"
              value={formik.values.apellidos}
              onChange={formik.handleChange}
              inputProps={{ maxLength: 100 }}
              error={formik.touched.apellidos && Boolean(formik.errors.apellidos)}
              helperText={formik.touched.apellidos && formik.errors.apellidos}
            />
          </Grid>
          <Grid item md={1} />
          <Grid item xs={12} md={2} display="flex" alignItems="center">
            <InputLabel>Teléfono</InputLabel>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="telefono_id"
              name="telefono"
              value={formik.values.telefono}
              onChange={formik.handleChange}
              inputProps={{ maxLength: 10 }}
              error={formik.touched.telefono && Boolean(formik.errors.telefono)}
              helperText={formik.touched.telefono && formik.errors.telefono}
            />
          </Grid>
          <Grid item md={1} />
        </Grid>
      </ListItem>
    </List>
  );

};

export default ContactoFormulario;
