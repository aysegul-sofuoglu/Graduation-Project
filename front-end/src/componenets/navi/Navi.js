import React, { useState } from "react";
import {
  Nav,
  NavLink,
  NavItem,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Navbar,
} from "reactstrap";
import CartSummary from "../cart/cartSummary";
import { Link } from "react-router-dom";

function Navi(props) {
  const [isOpen, setIsOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  

  const handleLogout = () => {
    localStorage.removeItem("token");
    
    setIsLoggedIn(false);
    
    console.log("Çıkış işlemi başarılı");
    
  };

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <Navbar {...props}>
        <NavbarBrand>
          <Link to={"/"}>TAKeIT</Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse Collapse isOpen={isOpen} navbar>
          <Nav className="navbar-nav me-auto mb-2 mb-lg-0">

          {!isLoggedIn && (
            <NavItem>
              <NavLink>
                <Link to="/login/">Login</Link>
              </NavLink>
            </NavItem>
          )}
            {isLoggedIn && (
              <NavItem>
                <NavLink>
                  <Link to="/" onClick={handleLogout}>
                    Çıkış
                  </Link>
                </NavLink>
              </NavItem>
            )}
            <NavItem>
              <NavLink>
                <Link to="/saveproduct">Ürün Ekle</Link>
              </NavLink>
            </NavItem>
            <CartSummary></CartSummary>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navi;
