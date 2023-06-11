import React, { Component } from "react";
import { Badge, Table, Button } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

class ProductList extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");

    if (!token) {
      this.props.actions.getProducts();
    } else {
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);

      if (decodedToken.role === "seller") {
        const sellerId = decodedToken.userId;
        this.props.actions.getProductsBySeller(sellerId);
      } else {
        console.error("User is not authorized to access seller products.");
      }
    }
  }

  addToCart = (product) => {
    this.props.actions.addToCart({ quantity: 1, product });
    alertify.success(product.name + " sepete eklendi!");
  };

  render() {
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwt_decode(token) : null;

    if (decodedToken && decodedToken.role === "seller") {
      return (
        <div>
          <h3>
            <Badge color="warning">ÜRÜNLER</Badge>
            <Badge color="success">{this.props.currentCategory.category}</Badge>
          </h3>
          <Table>
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Detay</th>
                <th>Fiyat</th>
                <th>Stok</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.products &&
                this.props.products.map((product) => {
                  if (product.seller_id === decodedToken.userId) {
                    return (
                      <tr key={product.id}>
                        <th scope="row">
                          {" "}
                          <Link
                            style={{
                              textDecoration: "none",
                              color: "black",
                              fontWeight: "bold",
                              fontSize: "16px",
                            }}
                            to={"/saveproduct/" + product.id}
                          >
                            {product.name}
                          </Link>
                        </th>

                        <td>{product.detail}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>
                          <Button
                            onClick={() => this.addToCart(product)}
                            color="success"
                          >
                            SEPETE EKLE
                          </Button>
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
            </tbody>
          </Table>
        </div>
      );
    } else if (!token || decodedToken.role === "customer") {
      return (
        <div>
          <h3>
            <Badge color="warning">ÜRÜNLER</Badge>
            <Badge color="success">{this.props.currentCategory.category}</Badge>
          </h3>
          <Table>
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Detay</th>
                <th>Fiyat</th>
                <th>Stok</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.products &&
                this.props.products.map((product) => {
                  return (
                    <tr key={product.id}>
                      <th scope="row">
                        {" "}
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                          to={"/saveproduct/" + product.id}
                        >
                          {product.name}
                        </Link>
                      </th>

                      <td>{product.detail}</td>
                      <td>{product.price}</td>
                      <td>{product.stock}</td>
                      <td>
                        <Button
                          onClick={() => this.addToCart(product)}
                          color="success"
                        >
                          SEPETE EKLE
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer,
    user: state.userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
      getProductsBySeller: bindActionCreators(
        productActions.getProductsBySeller,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
