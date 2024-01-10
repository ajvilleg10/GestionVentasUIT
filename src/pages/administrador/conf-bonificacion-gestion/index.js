import {
    Grid,
} from '@mui/material';

// third-party
import ConfBonificacionSelector from './bonificacion-selector-usuario';

// eslint-disable-next-line no-unused-vars
const Conf_bonificacion_gestion = () => {

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ConfBonificacionSelector />
                </Grid>
            </Grid>
        </>
    );
};

export default Conf_bonificacion_gestion;