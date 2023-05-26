import React, { Component } from "react";
import { FormGroup, Label, Input, Button} from "reactstrap";

export default class FormDemo extends Component {
  state = { email: "", password: "" };
  onChangeHandler = (event) => {
    // this.setState({userName:event.target.value})

    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    alert(this.state.userName);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              name="email"
              onChange={this.onChangeHandler}
              type="text"
            ></Input>

            <Label>Şifre</Label>
            <Input
              name="password"
              onChange={this.onChangeHandler}
              type="text"
            ></Input>
          </FormGroup>

          
          <Button type="submit">KAYDET</Button>
        </form>
      </div>
    );
  }
}
