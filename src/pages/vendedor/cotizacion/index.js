import {
  Grid,
  List,
  ListItem,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import { useState } from 'react';
import useContactosCotizacion from "hooks/vendedor/useContactosCotizacion";

const Cotizacion = () => {

  const contactos = useContactosCotizacion();
  const [cSelect, setCSelected] = useState('');

  return (
    <List sx={{ py: 0 }}>
      <ListItem divider>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InputLabel htmlFor="tipoDeUsuario">Tipo de Usuario*</InputLabel>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Select
                id="tipoDeUsuarioSelect"
                name="tipoDeUsuario"
                value={cSelect}
                onChange={(e) => setCSelected(e.target.value)}
              >
                {contactos?.map((contacto) => (
                  <MenuItem value={contacto.id} key={contacto.id}>
                    {`${contacto.nombres} ${contacto.apellidos}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );

};

// {/* <Grid container spacing={3} sx={{ paddingTop: 3, border: "1px black solid", width: "100%" }} bgcolor="white"> */}

export default Cotizacion;
