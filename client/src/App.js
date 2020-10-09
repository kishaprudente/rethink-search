import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavTab from './components/NavTab';
import Search from './pages/Search';
import ShortUrl from './pages/ShortURL';

const App = () => {
  return (
    <Router>
      <NavTab />
      <Route path='/search' component={Search} />
      <Route path='/shorturl' component={ShortUrl} />
    </Router>
  );
};

export default App;
