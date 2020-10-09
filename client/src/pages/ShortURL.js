import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import API from '../utils/API';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    width: '80%',
  },
  button: {
    backgroundColor: '#ab9b95',
    color: 'white',
  },
  form: {
    display: 'contents',
  },
  text: {
    fontWeight: 'bold',
  },
  table: {
    margin: '20px',
  },
}));

export default function ShortURL() {
  const classes = useStyles();

  const [urlInput, setUrlInput] = useState('');
  const [urls, setUrls] = useState([]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setUrlInput(value);
  };

  const handleSubmitUrl = async () => {
    const url = await API.createShortUrl({ long: urlInput });
    console.log(url);
  };

  useEffect(() => {
    const fetchUrls = async () => {
      const allUrl = await API.getUrls();
      setUrls(allUrl.data.shortUrls);
    };
    fetchUrls();
  }, [urls]);

  return (
    <Grid container justify='center'>
      <Grid item xs={10} className={classes.form}>
        <TextField
          className={classes.textField}
          id='longUrl'
          variant='filled'
          label='URL'
          value={urlInput}
          onChange={handleInputChange}
        />
        <Button
          variant='contained'
          onClick={handleSubmitUrl}
          className={classes.button}
        >
          Shorten
        </Button>
      </Grid>
      <Grid item xs={10} className={classes.table}>
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell className={classes.text}>Original URL</TableCell>
                <TableCell className={classes.text}>Short URL</TableCell>
                <TableCell className={classes.text}>Click Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {urls.map((url) => (
                <TableRow key={url._id}>
                  <TableCell component='th' scope='row'>
                    <Link href={url.long}>{url.long}</Link>
                  </TableCell>
                  <TableCell>
                    <Link href={url.short}>{url.short}</Link>
                  </TableCell>
                  <TableCell>{url.counter}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
