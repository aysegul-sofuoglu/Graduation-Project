import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions"
import { connect } from "react-redux";
import { Table, Button } from "reactstrap";
import alertify from "alertifyjs";

class cartDetail extends Component {

  addToCart = (product) => {
    this.props.actions.addToCart({ quantity: 1, product });
    alertify.success(product.name + " sepete eklendi!");
  };

    removeFromCart(product){
        this.props.actions.removeFromCart(product);
        alertify.error(product.name + " sepetten silindi!")
    }

  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
             
              <th>ÜRÜN</th>
              <th>FİYAT</th>
              <th>ADED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.cart && this.props.cart.map(cartItem => (
              <tr key={cartItem.product.id}>
                <th scope="row">{cartItem.product.name}</th>
              
                <td>{cartItem.product.price}</td>
                <td>{cartItem.quantity}</td>
                <td><Button onClick={()=>this.removeFromCart(cartItem.product)} color="danger">-</Button>
                <Button onClick={()=>this.addToCart(cartItem.product)} color="success">+</Button>
                </td>
              </tr>
            ))}

          </tbody>
        </Table>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch){
    return{
        actions:{
            removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
            addToCart: bindActionCreators(cartActions.addToCart, dispatch),
        }
    }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(cartDetail);