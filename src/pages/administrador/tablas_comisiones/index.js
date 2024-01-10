import {
    Grid,
} from '@mui/material';

// third-party
import TablaSelectorUsuario from './tabla-selector-usuario';

// eslint-disable-next-line no-unused-vars
const TablaComisiones = () => {

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TablaSelectorUsuario />
                </Grid>
            </Grid>
        </>
    );
};

export default TablaComisiones;