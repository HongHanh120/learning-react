import React, {Component} from 'react';

class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_editing: false,
            hover: false
        }
    }

    renderTaskSection() {
        const {task, is_completed} = this.props;

        let task_style = {
            color: is_completed ? '#007BFF' : '#d9534f',
            cursor: "pointer"
        };

        if (this.state.is_editing) {
            return (
                <label className="col-md-7 text left">
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input className="form-control input-sm" type="text" defaultValue={task} ref="input"/>
                    </form>
                </label>
            )
        }

        if(this.state.hover) {
            task_style.color = '#212529';
        }

        return (
            <label className="col-md-7 text-left text"
                   style={task_style}
                   onClick={this.props.toogleTask.bind(this, task)}
                   onMouseEnter={this.toogleHover}
                   onMouseLeave={this.toogleHover}> {task}
                {console.log(this.state.hover)}
            </label>
        )
    }

    renderActionSection() {
        if (this.state.is_editing) {
            return (
                <div className="col-md-3 text-right">
                    <span className="fa fa-save" onClick={this.onSaveClick.bind(this)}> </span>
                    &nbsp; &nbsp; &nbsp;
                    <span className="fa fa-close" onClick={this.onCancelClick.bind(this)}> </span>
                </div>
            )
        }

        return (
            <div className="col-md-3 text-right">
                <span className="fa fa-edit" onClick={this.onEditClick.bind(this)}> </span>
                &nbsp; &nbsp; &nbsp;
                <span className="fa fa-trash" onClick={this.props.deleteTask.bind(this, this.props.task)}> </span>
            </div>
        )
    }

    renderStateSection() {
        const {is_completed} = this.props;

        if (is_completed) {
            return (
                <div className="col-md-1 text-left">
                    <span className="fa fa-check-square-o"> </span>
                </div>
            )
        }

        return (
            <div className="col-md-1 text-left">
                <span className="fa fa-square-o"> </span>
            </div>
        )
    }

    render() {
        return (
            <div className="form-group row">
                {this.renderStateSection()}
                &nbsp; &nbsp; &nbsp;
                {this.renderTaskSection()}
                &nbsp; &nbsp; &nbsp;
                {this.renderActionSection()}
            </div>
        )
    }

    toogleHover() {
        this.setState({hover: !this.state.hover})
    }

    componentDidUpdate() {
        if(this.props.is_editing) {
            this.refs.input.focus();
        }
    }

    onEditClick() {
        this.setState({is_editing: true});
    }

    onCancelClick() {
        this.setState({is_editing: false});
    }

    onSaveClick(event) {
        event.preventDefault();

        const oldTask = this.props.task;
        const newTask = this.refs.input.value;
        this.props.saveTask(oldTask, newTask);
        this.setState({is_editing: false})
    }
}

export default TodoItem;