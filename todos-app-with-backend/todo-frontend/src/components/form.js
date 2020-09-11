import React, {Component} from 'react';
import _ from 'lodash';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            error: null,
            hover: false,
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
        let button_style;
        if(this.state.hover) {
            button_style = {background: '#d9534f', cursor: 'pointer', 'color': 'white'}
        }
        else {
            button_style = {background: '#007BFF', color: 'white'}
        }

        return (
            <form className="create form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group row">
                    <div className="col-md-10">
                        <input className="form-control"
                               type="text"
                               onChange={this.handleChange}
                               placeholder="What needs to be done?"
                               ref="input"
                        />
                    </div>
                    <div className="col-md-2">
                        <button type="submit"
                                className="btn"
                                style={button_style}
                                onMouseEnter={this.toogleHover}
                                onMouseLeave={this.toogleHover}
                        >Create</button>
                        {/*{console.log(this.state.hover)}*/}
                    </div>
                </div>
                {this.renderError()}
            </form>
        )
    }

    toogleHover = () => {
        this.setState({hover: !this.state.hover});
    };

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


