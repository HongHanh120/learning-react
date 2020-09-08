import React, {Component} from 'react';
import Form from './form'

const todos = [
    {
        id: Date.now(),
        task: "Create a todo app",
        is_completed: false
    },
    {
        id: Date.now(),
        task: "Watch a movie",
        is_completed: false
    }
];

class App extends Component{
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
                    <Form todos = {this.state.todos}
                    />
                </div>
            </div>
        )
    }

}

export default App;
