import React, {Component} from 'react';
import TodoItem from "./todo-item";
import _ from 'lodash';

class TodoList extends Component {
    renderTodoItems = () => {
        const props = _.omit(this.props, 'todos');
        const rows = this.props.todos.map((row, index) =>
            <TodoItem key={index} {...row} {...props}/>
        );
        return rows;
    };

    render() {
        return (
            <div className="list form-horizontal">
                { this.renderTodoItems() }
            </div>
        )
    }
}

export  default TodoList
