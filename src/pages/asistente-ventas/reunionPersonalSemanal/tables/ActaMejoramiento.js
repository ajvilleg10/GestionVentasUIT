import { Grid, List, ListItem, InputLabel, TextField, Button } from '@mui/material';

const ActaMejoramiento = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <List sx={{ py: 0 }} dense>
          <ListItem>
            <Grid container spacing={3}>
              <Grid item xs={12} md={2} display="flex" alignItems="center">
                <InputLabel id="antecedentes">Antecedentes</InputLabel>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-multiline-flexible"
                  label=""
                  multiline
                  fullWidth
                  placeholder="Hello, I am Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a
                more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at."
                disabled
                />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container spacing={3}>
              <Grid item xs={12} md={2} display="flex" alignItems="center">
                <InputLabel id="compromiso">Compromiso</InputLabel>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-multiline-flexible"
                  label=""
                  multiline
                  fullWidth
                  placeholder="Hello, I am Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a
                more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at."
                disabled
                />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container spacing={3}>
              <Grid item xs={12} md={2} display="flex" alignItems="center">
                <InputLabel id="meta">Meta</InputLabel>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-multiline-flexible"
                  label=""
                  multiline
                  fullWidth
                  placeholder="Hello, I am Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a
                more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at."
                disabled
                />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container spacing={3}>
              <Grid item xs={12} md={9} display="flex" alignItems="center"></Grid>
              <Grid item xs={12} md={3}>
                <Button disabled type="submit" variant="contained" fullWidth>
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

ActaMejoramiento.propTypes = {};

export default ActaMejoramiento;
