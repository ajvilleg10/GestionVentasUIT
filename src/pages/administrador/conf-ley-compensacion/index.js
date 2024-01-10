/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';

import {
  Grid,
  List,
  ListItem,
  TextField,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Stack,
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';


// third-party
import { PatternFormat } from 'react-number-format';
import PropTypes from 'prop-types';
// project import
import MainCard from 'components/MainCard';
import axios from 'utils/axios';

import { useFormik } from 'formik';
import * as yup from 'yup';

// third-party
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TableCompensacion from './tableCompensacion';

const today = dayjs();



const ConfBonificacionGestion = () => {

  const [anio, setAnio] = useState('');

  useEffect(() => {
    console.log(anio);
  }, [anio]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={3}>
          <Grid item display="flex" alignItems="start">
            <DatePicker label={'Seleccione un año'} openTo="year" views={['year']} minDate={dayjs("2023-05-01T00:00:00.000Z")} onChange={(event) => { setAnio(event.toDate().getUTCFullYear().toString()) }} />
          </Grid>
        </Grid>
        {anio && (
          < TableCompensacion key={anio} anio={anio} />)
        }
      </LocalizationProvider>
    </>
  );
};

export default ConfBonificacionGestion;