import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'
import CategoryList from '../categories/CategoryList'
import ProductList from '../products/ProductList'

export default class Dashboard extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
            <Col xs="3">
                <CategoryList></CategoryList>
            </Col>
            <Col xs="9">
                <ProductList></ProductList>
            </Col>
        </Row>
      </Container>
    )
  }
}
