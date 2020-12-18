import React, { Component, Fragment } from "react";
import Form from './Form'
import './App.css'

class App extends Component {
    constructor() {
      super()

      this.state = {
        noInput: <p>You have no Todo Items yet</p>,
        todoList: ""
      }

      this.isNoTodo = this.isNoTodo.bind(this)
      this.getTodos = this.getTodos.bind(this)
    }

    isNoTodo(inputArray) {
      let noInput = inputArray.length === 0 ? <p>You have no Todo Items yet</p> : null
      this.setState({
        noInput: noInput
      })
    }

    getTodos(todoCompArr) {
      this.setState({
        todoList: todoCompArr
      })
    }

  render() {
    return (
      <div className="app">
        <Form 
          isNoTodo={this.isNoTodo}
          getTodos={this.getTodos}
        />
          <div>{this.state.noInput}</div>
          <div className="todoList">
            {this.state.todoList}
          </div>
      </div>
    );
  }
}

export default App;