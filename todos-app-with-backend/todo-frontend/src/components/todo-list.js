import React, {Component} from 'react';
import TodoItem from "./todo-item";
import axios from 'axios';

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {todos_collection: []};
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/v1/todos/`)
            .then(res => {
                this.setState({todos_collection: res.data.data});
                console.log(this.state.todos_collection);
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    renderTodoItems() {
        if (!this.state.todos_collection.length) {
            return null;
        }

        this.state.todos_collection.map((data, index) => {
            // console.log(data.completed + data._id)
        });

        return (
            this.state.todos_collection.map((data, index) =>
                <TodoItem task={data.task} key={index} completed={data.completed} id={data._id}
                          handleToggle={this.handleToggle.bind(this)}
                          handleDelete={this.handleDelete.bind(this)}
                          handleSave={this.handleSave.bind(this)}
                />
            )
        );
    }

    handleToggle = () => {
        this.props.toggleTask(this.props.task);
    };

    handleDelete = () => {
        this.props.deleteTask(this.props.task);
    };

    handleSave = (oldTask, newTask) => {
        this.props.saveTask(oldTask, newTask)
    };

    render() {
        return (
            <div className="list form-horizontal">
                {this.renderTodoItems()}
            </div>
        )
    }
}

export default TodoList;