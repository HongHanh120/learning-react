import React, {Component} from 'react';
import Form from './form'

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
}

export default App;