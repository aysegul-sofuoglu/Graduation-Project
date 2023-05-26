import React, { Component } from "react";
import Navi from "../navi/Navi";
import { Route, Routes } from "react-router-dom";
import { Container} from "reactstrap";
import FormDemo from "../navi/FormDemo"
import FormDemo2 from "../navi/FormDemo2"

import Dashboard from "./Dashboard";
import cartDetail from "../cart/cartDetail";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";

export default class App extends Component {


  render() {
  

    return (
      
        <Container>
          <Navi/>
          <Routes>
            <Route path="/" exact Component={Dashboard} ></Route>
            <Route path="/produuct" exact Component={Dashboard} ></Route>
            <Route path="/cart" exact Component={cartDetail} ></Route>
            <Route path="/form1" element={<FormDemo/>}></Route>
            <Route path="/form2" element={<FormDemo2/>}></Route>
            <Route path="/saveproduct/:productId" element={<AddOrUpdateProduct/>}></Route>
          </Routes>
       

          
        </Container>
     
    );
  }
}
