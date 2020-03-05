import React from 'react';

import {Navbar} from './components';
import Routes from './routes';

const App = () => {
  window.localStorage.setItem('cartContents', JSON.stringify([]));

  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
