import React from 'react';
import {connect} from 'react-redux';
import {fetchCart} from '../store/cart';
import {Link} from 'react-router-dom';

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart();
  }

  render() {
    if (!this.props.items || this.props.items.length === 0) {
      return 'No Items in Cart';
    }
    return (
      <div>
        {this.props.items.map(item => {
          return (
            <div key={item.id}>
              <Link to={`/products/${item.id}`}>
                <img src={item.imageUrl} />
                <div>{item.name}</div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.cart
});

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
