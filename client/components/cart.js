import React from 'react';
import {connect} from 'react-redux';
import {fetchCart} from '../store/cart';
import Loader from 'react-loader-spinner';
import {Link} from 'react-router-dom';

class Cart extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId;
    console.log(this.props.match);
    this.props.fetchCart(userId);
  }

  render() {
    if (this.props.loading) {
      return <Loader type="Hearts" color="blue" height={600} width={600} />;
    } else if (!this.props.items || this.props.items.length === 0) {
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
  items: state.cart.products,
  loading: state.cart.loading
});

const mapDispatchToProps = dispatch => ({
  fetchCart: userId => dispatch(fetchCart(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
