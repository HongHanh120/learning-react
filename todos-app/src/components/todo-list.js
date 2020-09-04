import React , { Component } from 'react';
import _ from 'lodash';
import TodoListItem from "./todo-list-item";

class TodoList extends Component {
    renderTodoItems() {
        const props = _.omit(this.props, 'todos');
        return _.map(this.props.todos, (todo, index) =>
            <TodoListItem key={index} {...todo} {...props} />)
    }

    render() {
        return (
            <div className="list form-horizontal">
                { this.renderTodoItems() }
            </div>
        );
    }
}

export default TodoList