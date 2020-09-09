import React, {Component} from 'react';
import _ from 'lodash';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const input = this.refs.input;
        const task = input.value;
        // console.log(task);
        const validateInput = this.validateInput(task);

        if (validateInput) {
            this.setState({error: validateInput});
            return false;
        }

        this.setState({error: null});
        this.props.createTask(task);
        this.refs.input.value = '';
    };

    componentDidMount() {
        this.refs.input.focus();
    }

    renderError() {
        if (!this.state.error) {
            return null;
        }
        return (
            <p style={{
                padding: '5px 10px',
                background: '#d9534f',
                color: '#fff'
            }}>{this.state.error}</p>
        )
    }

    render() {
        return (
            <form className="create form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group row">
                    <div className="col-md-10">
                        <input className="form-control"
                               type="text"
                               onChange={this.handleChange}
                               placeholder="What needs to be done?"
                               ref="input"/>
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-default">Create</button>
                    </div>
                </div>
                {this.renderError()}
            </form>
        )
    }

    validateInput = (task) => {
        if (!task) {
            return "Please enter a task";
        } else if (_.find(this.props.todos, todo => todo.task === task)) {
            return "Task already exist";
        } else {
            return null;
        }
    }
};

export default Form;


