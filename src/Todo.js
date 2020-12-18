import React, { Component } from 'react'
import './Todo.css'

class Todo extends Component{
    constructor(props) {
        super(props)

        this.state = {
            isChecked: this.props.isChecked
        }
        this.toggleCheck = this.toggleCheck.bind(this)
    }

    toggleCheck(event) {
        const { name } = event.target
        this.setState({
            [name]: !this.state.isChecked
        }, () => {
            this.props.changeCheck(this.props.id)
        })
    }

    render() {
        return (
            <div className="todo">
                <input 
                    className="todo__checkbox"
                    type="checkbox"
                    name="isChecked"
                    checked={this.state.isChecked}
                    onChange={this.toggleCheck}
                />
                <p className="todo__text">{this.props.text} </p>
                <p 
                    className="todo__deleteButton"
                    onClick={() => {this.props.removeTodo(this.props.id)}}
                >
                    x
                </p>
            </div>
        )
    }
}

export default Todo
