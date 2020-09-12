import React, {Component} from 'react';
import TodoItem from "./todo-item";
import _ from 'lodash';
import axios from 'axios'

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {todos_collection: []}
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/v1/todos/`)
            .then(res => {
                const data = res.data;
                this.setState({todos_collection: data});
                console.log(this.state.todos_collection);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    renderTodoItems (todos_collection) {
        // const props = _.omit(this.props, 'todos');
        return todos_collection.map((data, index) => {
        //     // return <TodoItem key={index} {...row} {...props}/>
                return <TodoItem obj={data} key={index} />;
            })
    };

    render() {
        return (
            <div className="list form-horizontal">
                {this.renderTodoItems(this.state.todos_collection)}
            </div>
        )
    }
}

export default TodoList
