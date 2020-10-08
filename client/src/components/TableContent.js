import React from 'react';
import { TableBody, TableCell, TableRow } from '@material-ui/core';

export default function TableContent({ users, rowsPerPage, emptyRows, page }) {
  return (
    <TableBody>
      {(rowsPerPage > 0
        ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : users
      ).map((user) => (
        <TableRow key={user._id}>
          <TableCell component='th' scope='user'>
            {user.name}
          </TableCell>
          <TableCell style={{ width: 160 }}>{user.phoneNumber}</TableCell>
          <TableCell style={{ width: 160 }}>{user.email}</TableCell>
        </TableRow>
      ))}

      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}
