import React, {Component} from 'react';
import Form from './form';
import _ from 'lodash';
import TodoList from "./todo-list";
import axios from "axios";

const todos = [];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: todos
        }
    }

    render() {
        return (
            <div>
                <h1>Todo App</h1>
                <div className="todo-list-container">
                    <Form
                        todos={this.state.todos}
                        createTask={this.createTask.bind(this)}
                    />
                    <TodoList
                        todos={this.state.todos}
                        saveTask={this.saveTask.bind(this)}
                        deleteTask={this.deleteTask.bind(this)}
                        toggleTask={this.toggleTask.bind(this)}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/v1/todos/`)
            .then(res => {
                this.setState({todos: res.data.data});
                console.log(this.state.todos);
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    createTask(task) {
        const {todos} = this.state;

        todos.push({
            id: Date.now(),
            task,
            is_completed: false
        });
        this.setState({todos: this.state.todos});
    }

    saveTask(old_task, new_task) {
        const found_todo = _.find(this.state.todos, todo => todo.task === old_task);
        found_todo.task = new_task;

        axios.put(`http://localhost:5000/api/v1/todos/${found_todo._id}`, {task: found_todo.task, completed: found_todo.completed})
            .then(res => {
                console.log(res);
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error)
            });
        this.setState({todos: this.state.todos});
    }

    deleteTask(task) {
        let index = todos.indexOf(todos[task]);
        if (index > -1) {
            todos.splice(index, 1);
        }
        // _.remove(this.state.todos, todo => todo.task === task);
        this.setState({todos: this.state.todos});
    }

    toggleTask(task) {
        // const found_todo = _.find(this.state.todos, todo => todo.task === task);
        let index = todos.indexOf(todos[task]);
        if (index > -1) {
            todos[index].is_completed = !todos[index].is_completed;
        }
        this.setState({todos: this.state.todos})
    }
}

export default App