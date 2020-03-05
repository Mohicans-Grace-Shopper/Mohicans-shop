import React from 'react';
import {Link} from 'react-router-dom';

class ThankYou extends React.Component {
  render() {
    const userId = this.props.match.params.userId;

    return (
      <div>
        <h2>Thank you for your magical purchase!</h2>
        <p>Stirring up magic</p>
        <Link to={`/${userId}/products`}>Back to Products</Link>
      </div>
    );
  }
}

export default ThankYou;
