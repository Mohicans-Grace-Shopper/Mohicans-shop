import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => (
  <div>
    <center>
      <h2>Hmmm... Something very strange is brewing. </h2>
    </center>
    <img
      src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cleanpng.com%2Fpng-cauldron-computer-icons-clip-art-cauldron-817308%2F&psig=AOvVaw0onMLaMmUQoyTnMSFYJU3z&ust=1583609370253000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOD5quLKhugCFQAAAAAdAAAAABAD"
      style={{
        width: 600,
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
export default NotFound;
