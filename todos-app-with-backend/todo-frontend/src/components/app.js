import React, {Component} from 'react';
import Form from './form'
import TodoList from "./todo-list";
import _ from 'lodash'
import axios from 'axios'

const todos = [];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: todos
        };

        // api.get('/').then(res => {
        //     console.log(res.data);
        //     this.setState({todos: res.data})
        // })
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

    createTask(task) {
        const {todos} = this.state;

        todos.push({
            id: Date.now(),
            task,
            is_completed: false
        });

        this.setState({todos: this.state.todos})
    }

    saveTask(oldTask, newTask) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask)
        foundTodo.task = newTask;
        this.setState({todos: this.state.todos});
    }

    deleteTask(task) {
        _.remove(this.state.todos, todo => todo.task === task);
        this.setState({todo: this.state.todos})
    }

    toggleTask(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === task);
        foundTodo.is_completed = !foundTodo.is_completed;
        this.setState({todos: this.state.todos})
    }
}

export default App;
