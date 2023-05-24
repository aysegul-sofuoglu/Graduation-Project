import React, { useState } from "react";
import { Nav, NavLink, NavItem, Collapse, NavbarToggler,NavbarBrand,Navbar} from "reactstrap";
import CartSummary from "./CartSummary";
import { Link } from "react-router-dom";

function Navi(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <Navbar {...props}>
 
        <NavbarBrand href="/">TAKeIT</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse Collapse isOpen={isOpen} navbar>
          <Nav className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavItem>
              <Link to="/form1/">Form Demo1</Link>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
            <CartSummary removeFromCart={props.removeFromCart} cart={props.cart}/>
          </Nav>
     
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navi;
