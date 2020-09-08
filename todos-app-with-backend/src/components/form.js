import React, {Component} from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
    };

    render() {
        return (
            <form className="create form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div className="col-md-10">
                        <input className="form-control"
                               type="text"
                               value={this.state.value}
                               onChange={this.handleChange}
                               placeholder="What needs to be done?"/>
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-default">Create</button>
                    </div>
                </div>
            </form>
        )
    }
};

export default Form;


