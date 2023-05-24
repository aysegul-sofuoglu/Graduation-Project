import React, { Component } from 'react'

export default class FormDemo extends Component {

    state = {userName:''}
    onChangeHandler =(event)=>{
        this.setState({userName:event.target.value})
    }

  render() {
    return (
      <div>
        <form>
            <h3>Kullanıcı Adı</h3>
            <input onChange={this.onChangeHandler} type='text'></input>
            <h3>Kullanıcı Adı {this.state.userName}</h3>
        </form>
      </div>
    )
  }
}
