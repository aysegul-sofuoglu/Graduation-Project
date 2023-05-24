import React, { Component } from "react";
import { Button, Table } from "reactstrap";

export default class ProductList extends Component {



  render() {
    return (
      <div>
        <h3>
          {this.props.info.title}-{this.props.currentCategory}
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
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.name}</th>
              
                <td>{product.detail}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td><Button onClick={()=>this.props.addToCart(product)} color="info">SEPETE EKLE</Button></td>
              </tr>
            ))}

          </tbody>
        </Table>
      </div>
    );
  }
}



