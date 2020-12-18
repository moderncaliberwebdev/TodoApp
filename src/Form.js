import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './Form.css'
import Todo from './Todo'

class Form extends Component {
    constructor() {
        super()

        this.state = {
            inputText: "",
            allToDos: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleEvent = this.handleEvent.bind(this)
        this.removeToDo = this.removeToDo.bind(this)
        this.changeCheck = this.changeCheck.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target

        this.setState({
            [name]: value
        })
    }

    mapTodos() {
        let todoCompArr = this.state.allToDos.map(list => 
            (
                <Todo 
                    key={list[1]}
                    id={list[1]}
                    text={list[0]}
                    isChecked={list[2]}
                    changeCheck={this.changeCheck}
                    removeTodo={this.removeToDo}
                />
            )
        )
        this.props.getTodos(todoCompArr)
        this.props.isNoTodo(this.state.allToDos)
    }

    handleEvent() {
        if(this.state.inputText !== "") {
            let toDoArray = [[this.state.inputText, uuidv4(), false]];
            this.setState({
                allToDos: [...this.state.allToDos].concat(toDoArray),
                inputText: ""
            }, () => {
                this.mapTodos()
                localStorage.setItem("todos", JSON.stringify(this.state.allToDos))
            })
        }
    }

    removeToDo(removedId) {
        const allToDos = this.state.allToDos
        const filteredArray = allToDos.filter(item => item[1] !== removedId)
        this.setState({
            allToDos: filteredArray
        }, () => {
            this.mapTodos()
            localStorage.setItem("todos", JSON.stringify(this.state.allToDos))
        })
    }

    changeCheck(uuid) {
        const allToDos = this.state.allToDos
        for(let i = 0; i < allToDos.length; i++) {
            if(allToDos[i][1] === uuid) {
                allToDos[i][2] = !allToDos[i][2]
            }
        } 
        this.setState({
            allToDos: allToDos
        }, () => {
            localStorage.setItem("todos", JSON.stringify(this.state.allToDos))
        })
    }


    componentDidMount() {
        this.props.isNoTodo(this.state.allToDos)
        if(localStorage.length !== 0) {
            this.setState({
                allToDos: JSON.parse(localStorage.getItem("todos"))
            }, () => {
                this.mapTodos()
            })
        }
    }

    render() {
        return (
            <div className="form">
                <input 
                    className="form__input"
                    type="text"
                    name="inputText"
                    value={this.state.inputText}
                    onChange={this.handleChange}
                />
                <h1 
                    className="form__addButton"
                    onClick={this.handleEvent}
                >
                    +
                </h1>
            </div>
        )
    }
}

export default Form
