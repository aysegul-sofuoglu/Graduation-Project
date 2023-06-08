import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
import alertify from 'alertifyjs';

import * as cartActions from '../../redux/actions/cartActions';
import * as productActions from '../../redux/actions/productActions';

class cartDetail extends Component {
  removeFromCart = (product) => {
    this.props.actions.removeFromCart(product);
    alertify.error(`${product.name} sepetten silindi!`);

    const updatedStock = product.stock + 1;
    this.props.actions.updateProductStock(product.id, updatedStock);
  };

  addToCart = (product) => {
    this.props.actions.addToCart({ quantity: 1, product });
    alertify.success(`${product.name} sepete eklendi!`);

  
    const updatedStock = product.stock - 1;
    this.props.actions.updateProductStock(product.id, updatedStock);
  };

  calculateTotalPrice = () => {
    const { cart } = this.props;
    let totalPrice = 0;

    cart.forEach((cartItem) => {
      const productPrice = cartItem.product.price;
      const quantity = cartItem.quantity;
      const itemPrice = productPrice * quantity;
      totalPrice += itemPrice;
    });

    return totalPrice;
  };

  handleConfirmCart = () => {
    const { cart, actions } = this.props;

   
    cart.forEach((cartItem) => {
      const product = cartItem.product;
      const quantity = cartItem.quantity;

    
      const updatedStock = product.stock - quantity;
      actions.updateProductStock(product.id, updatedStock);
    });

    actions.clearCart();


    alertify.success('Sepet onaylandı!');
  };

  render() {
    const { cart } = this.props;

    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>ÜRÜN</th>
              <th>FİYAT</th>
              <th>ADET</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((cartItem) => (
              <tr key={cartItem.product.id}>
                <th scope="row">{cartItem.product.name}</th>
                <td>{cartItem.product.price}</td>
                <td>{cartItem.quantity}</td>
                <td>
                  <Button onClick={() => this.removeFromCart(cartItem.product)} color="danger">-</Button>
                  <Button onClick={() => this.addToCart(cartItem.product)} color="success">+</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>SEPET TUTARI: {this.calculateTotalPrice()} TL</div>
        <Button onClick={this.handleConfirmCart}>SEPETİ ONAYLA</Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
      updateProductStock: bindActionCreators(productActions.updateProductStock, dispatch),
      clearCart:bindActionCreators(cartActions.clearCart, dispatch)
    },
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(cartDetail);