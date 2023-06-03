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
          <Link
            to={"/"}
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
              fontSize: "25px",
            }}
          >
            TAKeIT
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse Collapse isOpen={isOpen} navbar>
          <Nav className="navbar-nav ml-auto">
            {!isLoggedIn && (
              <NavItem>
                <NavLink>
                  <Link
                    to="/login/"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Giriş
                  </Link>
                </NavLink>
              </NavItem>
            )}
            {isLoggedIn && (
              <NavItem className="ml-auto">
                <NavLink>
                  <Link
                    to="/"
                    onClick={handleLogout}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Çıkış
                  </Link>
                </NavLink>
              </NavItem>
            )}
            <NavItem className="ml-auto">
              <NavLink>
                <Link
                  to="/saveproduct"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Ürün Ekle
                </Link>
              </NavLink>
            </NavItem>
            <CartSummary></CartSummary>
          </Nav>
        </Collapse>
      </Navbar>

      <style>
        {`
        .navbar-nav.ml-auto {
          margin-left: auto;
        }

        .navbar-nav.ml-auto .nav-link {
          margin-left: 200px;
        }
      `}
      </style>
    </div>
  );
}

export default Navi;
