import React, {Component} from 'react';
import TodoItem from "./todo-item";

class TodoList extends Component {
    constructor(props) {
        super(props);
    }

    renderTodoItems() {
        if (!this.props.todos.length) {
            return null;
        }

        return (
            this.props.todos.map((data, index) =>
                <TodoItem task={data.task} key={index} completed={data.completed} id={data._id}
                          handleToggle={this.handleToggle.bind(this)}
                          handleDelete={this.handleDelete.bind(this)}
                          handleSave={this.handleSave.bind(this)}
                />
            )
        );
    }

    handleToggle = (task) => {
        this.props.toggleTask(task);
    };

    handleDelete = (task) => {
        this.props.deleteTask(task);
    };

    handleSave = (old_task, new_task) => {
        this.props.saveTask(old_task, new_task);
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