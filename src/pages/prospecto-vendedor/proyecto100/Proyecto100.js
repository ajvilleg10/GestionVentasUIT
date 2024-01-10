// eslint-disable no-unused-vars
import {
  Box,
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Grid,
} from "@mui/material";

import { dispatch } from "store";
import { openSnackbar } from "store/reducers/snackbar";

import { useFormik } from "formik";
import * as yup from "yup";

import React, { useState, useEffect } from "react";
import ContactosEnviadosDialog from "./Dialog";
import { Link as RouterLink } from "react-router-dom";
import useContactosProyecto100 from "hooks/useContactosProyecto100";
import { EmptyTable } from "components/third-party/ReactTable";

const validationSchema = yup.object({
  nombres: yup
    .string()
    .matches(/^[^\d]+$/, "Nombre incorrecto")
    .required("Campo requerido"),
  apellidos: yup
    .string()
    .matches(/^[^\d]+$/, "Apellido incorrecto")
    .required("Campo requerido"),
  numero_celular: yup
    .string()
    .required("Campo requerido")
    .test("phone_number", "Número de celular inválido", (value) => {
      if (value === undefined) return true;
      return value.match(/^09\d{8}$/);
    }),
  comentarios: yup.string().required("Campo requerido"),
  parentezco: yup
    .string()
    .matches(/^[^\d]+$/, "Parentesco incorrecto")
    .required("Campo requerido"),
});

const headCells = [
  {
    id: "nombres",
    align: "center",
    disablePadding: true,
    label: "Nombres",
  },
  {
    id: "apellidos",
    align: "center",
    disablePadding: true,
    label: "Apellidos",
  },
  {
    id: "celular",
    align: "center",
    disablePadding: false,
    label: "Celular",
  },
  {
    id: "parentezco",
    align: "center",
    disablePadding: false,
    label: "Parentesco",
  },
  {
    id: "comentarios",
    align: "center",
    disablePadding: false,
    label: "Comentarios",
  },
];

// TODO: Recuperar desde la base, configuracion del admin
const CANTIDAD_CONTACTOS = 2;

function OrderTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const Proyecto = () => {
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [sendConfirmationOpen, setSendConfirmationOpen] = useState(false);
  const [selected] = useState([]);
  const [send, setSend] = useState(false);

  const { contactos, addContacto, enviarContactos, isProyecto100Enviado } =
    useContactosProyecto100();

  const isSelected = (id) => selected.indexOf(id) !== -1;

  useEffect(() => {
    if (contactos.length == CANTIDAD_CONTACTOS) {
      setIsFormDisabled(true);
      setSend(true);
    } else {
      setIsFormDisabled(false);
      setSend(false); // Close the confirmation modal if the contact count is less than CANTIDAD_CONTACTOS
    }
  }, [contactos]);

  const initialFormValues = {
    nombres: "",
    apellidos: "",
    numero_celular: "",
    comentarios: "",
    parentezco: "",
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log("select form submit - ", values);

      const snackbar = {
        open: true,
        variant: "alert",
        alert: {},
        close: false,
      };

      try {
        await addContacto({
          nombres: values.nombres,
          apellidos: values.apellidos,
          numero_celular: values.numero_celular,
          comentarios: values.comentarios,
          parentezco: values.parentezco,
        });

        snackbar.message = "Contacto agregado con èxito";
        snackbar.alert.color = "success";

        formik.setValues(initialFormValues);
        formik.setErrors({});
        formik.setTouched({});
      } catch (error) {
        console.log(error);

        snackbar.message = "Error al crear el contacto";
        snackbar.alert.color = "error";
      } finally {
        formik.setSubmitting(false); // Ensure that the form is not stuck in a submitting state
        dispatch(openSnackbar(snackbar));
      }
    },
  });

  const enviarContactosHandler = async () => {
    const snackbar = {
      open: true,
      variant: "alert",
      alert: {},
      close: false,
    };

    // Open the confirmation modal
  setSendConfirmationOpen(true);

  try {
    // Await the enviarContactos function
    await enviarContactos();

    // If everything is fine, dispatch a success message
    snackbar.message = "Proyecto 100 enviado con éxito";
      snackbar.alert.color = "success";

    // Dispatch the snackbar message;
    dispatch(openSnackbar(snackbar));
    return true;
  } catch (error) {
    console.error(error);

    // If an error occurs, dispatch an error message
    snackbar.message = error.message;
      snackbar.alert.color = "error";

      // Dispatch the snackbar message;
      dispatch(openSnackbar(snackbar));
      return false;
  } finally {
    // Close the confirmation modal
    setSendConfirmationOpen(false);
  }

    {/*try {
      await enviarContactos();

      snackbar.message = "Proyecto 100 enviado con éxito";
      snackbar.alert.color = "success";
      dispatch(openSnackbar(snackbar));

      return true;
    } catch (error) {
      console.error(error);

      snackbar.message = error.message;
      snackbar.alert.color = "error";
      dispatch(openSnackbar(snackbar));

      return false;
    }*/}
  };

  return (
    <>
      <Box>
        <Box mt={2}>
          <form onSubmit={formik.handleSubmit}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" mb={2}>
                Agregar contactos
              </Typography>
              <Grid container spacing={0}>
                <Grid item md={2} xs={2}>
                  <TextField
                    label="Nombres"
                    variant="outlined"
                    size="small"
                    id="nombres"
                    name="nombres"
                    value={formik.values.nombres}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.nombres && Boolean(formik.errors.nombres)
                    }
                    helperText={formik.touched.nombres && formik.errors.nombres}
                    disabled={isFormDisabled}
                  />
                </Grid>
                <Grid item md={2} xs={2}>
                  <TextField
                    label="Apellidos"
                    variant="outlined"
                    size="small"
                    id="apellidos"
                    name="apellidos"
                    value={formik.values.apellidos}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.apellidos &&
                      Boolean(formik.errors.apellidos)
                    }
                    helperText={
                      formik.touched.apellidos && formik.errors.apellidos
                    }
                    disabled={isFormDisabled}
                  />
                </Grid>
                <Grid item md={2} xs={2}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Telefono"
                    minLength={10}
                    id="celular"
                    name="numero_celular"
                    value={formik.values.numero_celular}
                    onChange={formik.handleChange}
                    inputProps={{ maxLength: 10 }}
                    error={
                      formik.touched.numero_celular &&
                      Boolean(formik.errors.numero_celular)
                    }
                    helperText={
                      formik.touched.numero_celular &&
                      formik.errors.numero_celular
                    }
                    disabled={isFormDisabled}
                  />
                </Grid>
                <Grid item md={2} xs={2}>
                  <TextField
                    label="Parentesco"
                    variant="outlined"
                    size="small"
                    id="parentezco"
                    name="parentezco"
                    value={formik.values.parentezco}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.parentezco &&
                      Boolean(formik.errors.parentezco)
                    }
                    helperText={
                      formik.touched.parentezco && formik.errors.parentezco
                    }
                    disabled={isFormDisabled}
                  />
                </Grid>
                <Grid item md={2} xs={2}>
                  <TextField
                    label="Comentarios"
                    variant="outlined"
                    size="small"
                    id="comentarios"
                    name="comentarios"
                    value={formik.values.comentarios}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.comentarios &&
                      Boolean(formik.errors.comentarios)
                    }
                    helperText={
                      formik.touched.comentarios && formik.errors.comentarios
                    }
                    disabled={isFormDisabled}
                  />
                </Grid>
                <Grid item md={2} xs={2} display="flex" justifyContent="end">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isFormDisabled}
                    style={{ maxHeight: "40px" }}
                  >
                    Agregar
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Box>
        <Box mt={2}>
          <TableContainer
            sx={{ width: "100%", overflowX: "auto" }}
            style={{ width: "100%" }}
          >
            <Table>
              <OrderTableHead />
              <TableBody>
                {contactos.length === 0 ? (
                  <EmptyTable
                    msg="No existen contactos"
                    colSpan={headCells.length}
                  />
                ) : (
                  contactos.map((row, index) => {
                    const isItemSelected = isSelected(row.id);

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                      >
                        <TableCell align="center">{row.nombres}</TableCell>
                        <TableCell align="center">{row.apellidos}</TableCell>
                        <TableCell align="center">
                          {row.numero_celular}
                        </TableCell>
                        <TableCell align="center">{row.parentezco}</TableCell>
                        <TableCell align="center">{row.comentarios}</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={0} py={3}>
            <Grid
              item
              md={12}
              xs={12}
              display="flex"
              justifyContent="right"
              alignItems="center"
            >
                <ContactosEnviadosDialog
                  onOpenDialog={enviarContactosHandler}
                  isProyecto100Enviado={isProyecto100Enviado}
                  confirmationOpen={sendConfirmationOpen}
                  onCloseConfirmation={() => setSendConfirmationOpen(false)}
                />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Proyecto;
