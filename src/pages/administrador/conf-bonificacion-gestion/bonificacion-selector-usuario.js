import { Grid, List, ListItem, MenuItem, Select} from "@mui/material";
import { useState } from "react";
import ConfBonificacionGestion from "./bonifcacion-vendedor";
import ConfBonificacionAsistenteVentas from "./bonificacion-asistente"
import BonificacionJefeVentas from "./bonificacion-jefe"


const ConfBonificacionSelector = () => {

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
                                <MenuItem key={0} value={0}>Vendedor</MenuItem>
                                <MenuItem key={1} value={1}>Asistente de Ventas</MenuItem>
                                <MenuItem key={2} value={2}>Jefe de Ventas</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem>
                    {tipoUsuario === 0 ? <ConfBonificacionGestion /> : null}
                    {tipoUsuario === 1 ? <ConfBonificacionAsistenteVentas /> : null}
                    {tipoUsuario === 2 ? <BonificacionJefeVentas /> : null}
                </ListItem>
            </List>
        </>
    )
}

export default ConfBonificacionSelector;