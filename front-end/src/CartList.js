import React, { Component } from 'react'
import { Button, Table } from 'reactstrap'

export default class CartList extends Component {

  renderCart(){
    return(
      <Table striped>
        <thead>
          <tr>
           
            <th>ÜRÜN</th>
            <th>FİYAT</th>
            <th>STOK</th>
            <th>ADED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.cart.map(cartItem=>(
              <tr key={cartItem.product.id}>
               
                <td>{cartItem.product.name}</td>
                <td>{cartItem.product.price}</td>
                <td>{cartItem.product.stock}</td>
                <td>{cartItem.quantity}</td>
                <td>
                  <Button color='danger' onClick={()=>this.props.removeFromCart(cartItem.product)}>
                    SİL
                  </Button>
                </td>

              </tr>
            ))
          }
        </tbody>
      </Table>
    )
  }


  render() {
    return (
      <div>
        {this.renderCart()}
      </div>
    )
  }
}
