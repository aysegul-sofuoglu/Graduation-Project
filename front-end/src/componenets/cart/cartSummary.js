import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as cartActions from "../../redux/actions/cartActions";
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
import { RiShoppingCartLine } from "react-icons/ri";

class cartSummary extends Component {
  addToCart = (product) => {
    this.props.actions.addToCart({ quantity: 1, product });
    alertify.success(product.name + " sepete eklendi!");
  };

  removeFromCart(product) {
    this.props.actions.removeFromCart(product);
    alertify.error(product.name + " sepetten silindi!");
  }

  renderEmpty() {
    return (
      <NavItem>
        <NavLink>
          <RiShoppingCartLine size={20} />
        </NavLink>
      </NavItem>
    );
  }

  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          <RiShoppingCartLine size={20} />
          <Badge color="secondary">{this.props.cart.length}</Badge>
        </DropdownToggle>
        <DropdownMenu end>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="mr-2">{cartItem.product.name}</span>
                  <Badge color="success">{cartItem.quantity}</Badge>
                </div>
                <div>
                  <Badge
                    color="danger"
                    onClick={() => this.removeFromCart(cartItem.product)}
                    style={{ cursor: "pointer" }}
                  >
                    -
                  </Badge>
                  <Badge
                    color="success"
                    onClick={() => this.addToCart(cartItem.product)}
                    style={{ cursor: "pointer" }}
                  >
                    +
                  </Badge>
                </div>
              </div>
            </DropdownItem>
          ))}

          <DropdownItem divider />
          <DropdownItem>
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "16px",
              }}
              to={"/cart"}
            >
              Sepete Git
            </Link>
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

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
    },
  };
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(cartSummary);
