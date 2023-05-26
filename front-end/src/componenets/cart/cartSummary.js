import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as cartActions from "../../redux/actions/cartActions"
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavItem,
  NavLink,
} from "reactstrap";
import { bindActionCreators } from "redux";
import alertify from "alertifyjs";

class cartSummary extends Component {


  removeFromCart(product){
    this.props.actions.removeFromCart(product);
    alertify.error(product.name + " sepetten silindi!")
}



  renderEmpty() {
    return (
      <NavItem>
        <NavLink>Sepet Boş</NavLink>
      </NavItem>
    );
  }

  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          SEPET - {this.props.cart.length}
        </DropdownToggle>
        <DropdownMenu end>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              <Badge
                color="danger"
                onClick={() => this.removeFromCart(cartItem.product)}>
                X
              </Badge>
              {cartItem.product.name}
              <Badge color="success">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))}

          <DropdownItem divider />
          <DropdownItem>
            <Link to={"/cart"}>Sepete Git</Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
    return{
        actions:{
            removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
        }
    }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(cartSummary);
