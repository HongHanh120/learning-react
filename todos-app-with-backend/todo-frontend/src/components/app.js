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
        };

        // axios.get(`http://localhost:5000/api/v1/todos/`)
        //     .then(res => {
        //         this.setState({todos: res.data.data});
        //         console.log(this.state.todos);
        //     })
        //     .catch(function (error) {
        //         console.log(error)
        //     })
        this.getTaskList()
    }

    render() {
        return (
            <div>
                <h1>Todo App</h1>
                <div className="todo-list-container">
                    <Form
                        todos={this.state.todos}
                        createTask={this.createTask.bind(this)}
                        getTaskList={this.getTaskList.bind(this)}
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


    getTaskList() {
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

        this.getTaskList();
        this.setState({todos: this.state.todos});
    }

    saveTask(old_task, new_task) {
        const found_todo = _.find(this.state.todos, todo => todo.task === old_task);
        found_todo.task = new_task;

        axios.put(`http://localhost:5000/api/v1/todos/${found_todo._id}`, {
            task: found_todo.task,
            completed: found_todo.completed
        })
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
        const found_todo = _.find(this.state.todos, todo => todo.task === task);
        console.log(found_todo._id);
        axios.delete(`http://localhost:5000/api/v1/todos/${found_todo._id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.getTaskList();
            })
            .catch((error) => {
                console.log(error)
            });
        this.setState({todos: this.state.todos});
    }

    toggleTask(task) {
        const found_todo = _.find(this.state.todos, todo => todo.task === task);
        if (found_todo.completed)
            found_todo.completed = false;
        else
            found_todo.completed = true;

        axios.put(`http://localhost:5000/api/v1/todos/${found_todo._id}`, {task: task, completed: found_todo.completed})
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error)
            });
        this.setState({todos: this.state.todos});
    }
}

export default App