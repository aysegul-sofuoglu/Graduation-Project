import React, { Component } from "react";
import Navi from "../navi/Navi";
import { Route, Routes } from "react-router-dom";
import { Container} from "reactstrap";
import FormDemo from "../navi/FormDemo"
import FormDemo2 from "../navi/FormDemo2"

import Dashboard from "./Dashboard";
import cartDetail from "../cart/cartDetail";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
import NotFound from "../common/NotFound";

export default class App extends Component {


  render() {
  

    return (
      
        <Container>
          <Navi/>
          <Routes>
            <Route path="/" exact Component={Dashboard} ></Route>
            <Route path="/product" exact Component={Dashboard} ></Route>
            <Route path="/cart" exact Component={cartDetail} ></Route>
            <Route path="/form1" Component={FormDemo}></Route>
            <Route path="/form2" Component={FormDemo2}></Route>
            <Route path="/saveproduct/:productId" Component={AddOrUpdateProduct} exact></Route>
            <Route path="/saveproduct" Component={AddOrUpdateProduct}></Route>
            <Route path="*" Component={NotFound} />
          </Routes>
       

          
        </Container>
     
    );
  }
}
