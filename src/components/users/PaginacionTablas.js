import { TablePagination } from '@mui/material';
import { useEffect, useState } from 'react';

import { PAGE_SIZE } from 'utils/constants';
import { parseInt } from 'lodash';

const Paginacion = ({ data: usuarios, setPageRows, page, setPage, rowsPerPage, setRowsPerPage }) => {

  // const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE);
  // const [page, setPage] = useState(0);
  // const [pageRows, setPageRows] = useState([]);

  useEffect(() => {
    const rows = usuarios.slice(0, PAGE_SIZE);
    setPageRows(rows);
  }, [usuarios]);

  const onPageChange = (_, value) => {

    setPage(value);

    let l = 0;
    let r = 0;

    if (value < 1) {
      l = 0;
      r = rowsPerPage;
    } else {
      l = (value) * rowsPerPage;
      r = (value + 1) * rowsPerPage;
    }

    const rows = usuarios.slice(l, r);
    setPageRows(rows);

  };

  const handleChangeRowsPerPage = (event) => {

    let size = parseInt(event.target.value, 10);
    setRowsPerPage(size);

    setPage(0);
    if (size > usuarios.length) {
      setPageRows(usuarios);
    } else {
      const rows = usuarios.slice(0, size);
      setPageRows(rows);
    }

  };

  return (

    <TablePagination
      sx={{ display: 'flex', justifyContent: 'flex-start' }}
      component="div"
      count={usuarios.length}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      showLastButton
      showFirstButton
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[5, 10, 20, 50]}
      labelRowsPerPage={'Registros por página'}
      labelDisplayedRows={({ from, to, count }) => {
        return `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
      }}
    />
  );

};

export default Paginacion;
