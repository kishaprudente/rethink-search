import React, { useEffect, useState } from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import SearchBar from './components/SearchBar';
import PaginatedTable from './components/PaginatedTable';
import API from './utils/API';

const App = () => {
  const [searchUser, setSearchUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    // setSearchCountry(value);
  };

  const handleKeyPress = (e) => {
    const { value } = e.target;
    if (e.keyCode === 13) {
      console.log('name:', value);
      handleSearch();
    }
  };

  const handleSearch = () => {};

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const queryPage = page + 1;
      const response = await API.getUsers(queryPage, rowsPerPage);
      console.log(response.data.results);
      setUsers(response.data.results);
      setLoading(false);
    };
    fetchUsers();
  }, [page, rowsPerPage]);

  return (
    <div>
      <SearchBar
        handleInputChange={handleInputChange}
        handleKeyPress={handleKeyPress}
      />
      <Grid container justify='center'>
        <Grid item xs={10} style={{ margin: '30px' }}>
          <PaginatedTable
            loading={loading}
            users={users}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            emptyRows={emptyRows}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
