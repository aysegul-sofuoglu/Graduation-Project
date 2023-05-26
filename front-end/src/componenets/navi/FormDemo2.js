import alertify from "alertifyjs";
import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export default class FormDemo2 extends Component {
  state = { firstName:"", lastName:"", userName:"", email: "", password: "", address: "" };

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    alertify.success(this.state.userName + " veritabanına kaydedildi!");
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="firtName">İsim</Label>
            <Input
              type="firtName"
              name="firtName"
              id="firtName"
              placeholder="İsim giriniz"
              onChange={this.handleChange}
            ></Input>
          </FormGroup>

          <FormGroup>
            <Label for="lastName">Soyad</Label>
            <Input
              type="lastName"
              name="lastName"
              id="lastName"
              placeholder="Soyad giriniz"
              onChange={this.handleChange}
            ></Input>
          </FormGroup>

          <FormGroup>
            <Label for="userName">Kullanıcı Adı</Label>
            <Input
              type="userName"
              name="userName"
              id="userName"
              placeholder="Kullanıcı adı giriniz"
              onChange={this.handleChange}
            ></Input>
          </FormGroup>

          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email giriniz"
              onChange={this.handleChange}
            ></Input>
          </FormGroup>

          <FormGroup>
            <Label for="password">Şifre</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Şifre giriniz"
              onChange={this.handleChange}
            ></Input>
          </FormGroup>

          <FormGroup>
            <Label for="address">Adres</Label>
            <Input
              type="textarea"
              name="address"
              id="address"
              placeholder="Adres giriniz"
              onChange={this.handleChange}
            ></Input>
          </FormGroup>
          <Button type="submit">KAYDET</Button>
        </Form>
      </div>
    );
  }
}
