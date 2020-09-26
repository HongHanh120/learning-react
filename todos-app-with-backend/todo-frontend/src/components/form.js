import React, {Component} from 'react';
import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            error: null,
            hover: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.toggleHover = this.toggleHover.bind(this);
    };

    handleChange(event) {
        // console.log(event.target.value);
        this.setState({value: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const taskObject = {
            task: this.state.value
        };

        axios.post('http://localhost:5000/api/v1/todos/', taskObject)
            .then(res => {
                console.log(res);
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error)
            });

        this.props.getTaskList();
        this.setState({value: ''})
    };

    componentDidMount() {
        this.refs.input.focus();
    }

    renderError() {
        if(!this.state.error){
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
            button_style = {background: '#d9534f', cursor: 'pointer', color: 'white'}
        }
        else {
            button_style = {background: '#007bff', color: 'white'}
        }
        return (
            <form className="create form-horizontal" onSubmit={this.handleSubmit}>
                <div className='form-group row'>
                    <div className='col-md-10'>
                        <input className='form-control'
                               type="text"
                               onChange={this.handleChange}
                               placeholder="What needs to be done?"
                               ref="input"
                               value={this.state.value}
                        />
                    </div>
                    <div className="col-md-2">
                        <button type="submit"
                                className="btn"
                                style={button_style}
                                onMouseEnter={this.toggleHover}
                                onMouseLeave={this.toggleHover}
                        >Create</button>
                    </div>
                </div>
                {this.renderError()}
            </form>
        )
    }

    toggleHover = () => {
        this.setState({hover: !this.state.hover})
    }

}

export default Form;