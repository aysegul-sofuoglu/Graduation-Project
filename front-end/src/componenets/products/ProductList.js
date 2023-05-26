import React, { Component } from "react";
import { Badge, Table, Button } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";

class ProductList extends Component {

  componentDidMount(){
    this.props.actions.getProducts();
  }

  addToCart=(product)=>{
    this.props.actions.addToCart({quantity:1, product})
    alertify.success(product.name + " sepete eklendi!")
  }

  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">ÜRÜNLER</Badge>
          <Badge color="success">{this.props.currentCategory.category}</Badge>

          </h3>
          <Table>
          <thead>
            <tr>
             
              <th>Name</th>
              <th>Detail</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products && this.props.products.map(product => (
              <tr key={product.id}>
                <th scope="row">{product.name}</th>
              
                <td>{product.detail}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td><Button onClick={()=>this.addToCart(product)} color="success">SEPETE EKLE</Button></td>
              </tr>
            ))}

          </tbody>
        </Table>

       

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(
        productActions.getProducts,
        dispatch
      ),
      addToCart:bindActionCreators(
        cartActions.addToCart, dispatch
      )
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
