import React, {Component} from 'react';
import TodoList from "./todo-list";

const todos = [
    {
        id: Date.now(),
        task: "Make a todo app",
        isCompleted: false
    },
    {
        id: Date.now(),
        task: "Go to watch a movie",
        isCompleted: false
    }
];

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
                <h1>React Todo-List</h1>
                <div className="td-list-con">
                    <TodoList
                        todos={ this.state.todos }
                        saveTask={ this.saveTask.bind(this) }
                        createTask = { this.createTask.bind(this) }
                        deleteTask = { this.deleteTask.bind(this) }
                        toogleTask = { this.toogleTask.bind(this) }
                    />
                </div>
            </div>
        );
    }

    createTask(task) {
        this.state.todos.push({
            id: Date.now(),
            task,
            isCompleted: false
        });
        this.setState({todos: this.state.todos})
    }

    deleteTask(taskToDelete) {
        _.remove(this.state.todos, todo => todo.task === taskToDelete);
        this.setState({todos: this.state.todos});
    }

    saveTask(oldTask, newTask) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
        foundTodo.task = newTask;
        this.setState({todos: this.state.todos});
    }

    toogleTask(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === task);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({ todos: this.state.todos });
    }
}


export default App;