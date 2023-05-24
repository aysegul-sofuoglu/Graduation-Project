import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavItem,NavLink
} from "reactstrap";

export default class CartSummary extends Component {
  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          SEPET - {this.props.cart.length}
        </DropdownToggle>
        <DropdownMenu end>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
                <Badge color="danger" onClick={()=>this.props.removeFromCart(cartItem.product)}>X</Badge>
              {cartItem.product.name}
              <Badge color="success">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))}

          <DropdownItem divider />
          <DropdownItem>
            <Link to="cart">Sepete Git</Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  renderEmty(){
    return(
        <NavItem>
            <NavLink>Sepet Boş</NavLink>
        </NavItem>
    );
  }

  render() {
    return <div>
        {this.props.cart.length>0?this.renderSummary():this.renderEmty()}
    </div>;
  }
}
