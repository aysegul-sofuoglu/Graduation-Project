import React, { Component } from "react";
import { Table } from "reactstrap";

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
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.name}</th>
              
                <td>{product.detail}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
              </tr>
            ))}

          </tbody>
        </Table>
      </div>
    );
  }
}
