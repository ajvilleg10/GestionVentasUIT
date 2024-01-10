import { Grid, List, ListItem, MenuItem, Select} from "@mui/material";
import { useState } from "react";
import RegistroAsistenteVentas from "./registro_asistenteVentas/RegistroAsistenteVentas";
import RegistroJefeVentas from "./registro_jefeVentas/RegistroJefeVentas";
import RegistroVendedor from "./registro_vendedor/RegistroVendedor";


const ConfRegistroSelector = () => {

    const [tipoUsuario, setTipoUsuario] = useState(0);

    return (
        <>
            <List sx={{ py: 0 }} dense>
                <ListItem>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={2} display="flex" alignItems="center">
                            <label>Tipo de Usuario</label>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Select value={tipoUsuario} onChange={(tipo) => setTipoUsuario(tipo.target.value)} defaultValue={tipoUsuario}>
                                <MenuItem key={0} value={0}>Asistente de ventas</MenuItem>
                                <MenuItem key={1} value={1}>Jefe de Ventas</MenuItem>
                                <MenuItem key={2} value={2}>Vendedor</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem>
                    {tipoUsuario === 0 ? <RegistroAsistenteVentas /> : null}
                    {tipoUsuario === 1 ? <RegistroJefeVentas /> : null}
                    {tipoUsuario === 1 ? <RegistroVendedor/> : null}
                </ListItem>
            </List>
        </>
    )
}

export default ConfRegistroSelector;