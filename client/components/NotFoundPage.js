import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <center>
      <h2>Hmmm... Something very strange is brewing. </h2>
    </center>
    <img
      src="https://pngimg.com/uploads/cauldron/cauldron_PNG22.png"
      style={{
        width: 500,
        height: 400,
        display: 'block',
        margin: 'auto',
        position: 'relative'
      }}
    />
    <center>
      <Link to="/">Return to Home Page</Link>
    </center>
  </div>
);
export default NotFoundPage;
