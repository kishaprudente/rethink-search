import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Table,
  TableHead,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
} from '@material-ui/core';

import TableContent from './TableContent';
import TablePaginationActions from './TablePaginationActions';

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function PaginatedTable({
  loading,
  users,
  rowsPerPage,
  page,
  emptyRows,
  handleChangePage,
  handleChangeRowsPerPage,
}) {
  const classes = useStyles2();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='custom pagination table'>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            <TableCell>
              <strong>Phone Number</strong>
            </TableCell>
            <TableCell>
              <strong>Email</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableContent
          loading={loading}
          users={users}
          rowsPerPage={rowsPerPage}
          emptyRows={emptyRows}
          page={page}
        />
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20]}
              colSpan={3}
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
