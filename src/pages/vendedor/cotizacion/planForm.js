import { FormControl, FormControlLabel, FormGroup, Grid, InputLabel, List, ListItem, MenuItem, Select, Checkbox, TextField } from "@mui/material";
import useProductos from "hooks/vendedor/useProductos";
import { useEffect, useState } from 'react';

const PlanesFormulario = ({ formik }) => {

  const { planes, anexos } = useProductos();

  const [anexoS, setAnexoS] = useState([]);

  // useEffect(() => {

  //   const tempAnexos = anexos?.map((a, i) => ({
  //     id: a.id,
  //     monto: a.monto,
  //     nombre: a.nombre,
  //     checked: false,
  //     index: i
  //   }));

  //   setAnexoS(tempAnexos);

  // }, [anexos]);

  return (
    <List sx={{ py: 0 }}>
      <ListItem divider>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2} display="flex" alignItems="center">
            <InputLabel>Tipo de plan</InputLabel>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <Select
                id="planSelect"
                name="plan"
                value={formik.values.plan}
                onChange={formik.handleChange}
              >
                {planes?.map((plan) => (
                  <MenuItem value={plan.id} key={plan.id}>
                    {plan.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </ListItem>
      <ListItem divider>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2} display="flex" alignItems="center">
            <InputLabel>Anexos</InputLabel>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormGroup fullWidth>
              {anexos?.map((a) => (
                <FormControlLabel key={a.id} control={<Checkbox checked={a.checked} onChange={(e) => { console.log(e.target.checked, a.index) }} />} label={a.nombre} />
              ))}
            </FormGroup>
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );
};

export default PlanesFormulario;
