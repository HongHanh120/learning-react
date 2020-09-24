import React, {Component} from 'react';
import Form from './form';
import _ from 'lodash';
import TodoList from "./todo-list";

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
        let found = false;
        let index;
        // const found_todo = _.find(this.state.todos, todo => todo.task === old_task);
        for(let i = 0; i < todos.length; i++) {
            if (todos[i].task === old_task) {
                // const index = todos.indexOf(todos[i]);
                found = true;
                index = i;
            }
        }
        if(found) {
            todos[index].task = new_task;
            console.log(typeof todos[index].task)
        }

        // if (index > -1) {
        //     todos[index].task = new_task;
        // }
        console.log(old_task + "+" + new_task);
        this.setState({todos: this.state.todos});
        // console.log(index);

    }

    deleteTask(task) {
        let index = todos.indexOf(todos[task]);
        if(index > -1) {
            todos.splice(index, 1);
        }
        // _.remove(this.state.todos, todo => todo.task === task);
        this.setState({todos: this.state.todos});
    }

    toggleTask(task) {
        // const found_todo = _.find(this.state.todos, todo => todo.task === task);
        let index = todos.indexOf(todos[task]);
        if(index > -1){
            todos[index].is_completed = !todos[index].is_completed;
        }
        this.setState({todos: this.state.todos})
    }
}

export default App