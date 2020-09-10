import React, {Component} from 'react';

class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_editing: false,
            hover: false,
            hover_edit: false,
            hover_delete: false,
            hover_save: true,
            hover_cancel: false
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
                <label className="col-md-8 text left">
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input className="form-control input-sm" type="text" defaultValue={task} ref="input"/>
                    </form>
                </label>
            )
        }

        if (this.state.hover) {
            task_style.color = '#212529';
        }

        return (
            <label className="col-md-8 text-left text"
                   style={task_style}
                   onClick={this.props.toogleTask.bind(this, task)}
                   onMouseEnter={this.toogleHover.bind(this)}
                   onMouseLeave={this.toogleHover.bind(this)}> {task}
            </label>
        )
    }

    renderActionSection() {
        let edit_icon_style, delete_icon_style, save_icon_style, cancel_icon_style;
        if (this.state.hover_edit) {
            edit_icon_style = {
                color: '#007BFF'
            }
        }

        if (this.state.hover_delete) {
            delete_icon_style = {
                color: '#d9534f'
            }
        }

        if (this.state.hover_save) {
            save_icon_style = {
                color: '#007BFF'
            }
        }

        if (this.state.hover_cancel) {
            cancel_icon_style = {
                color: '#d9534f'
            }
        }

        if (this.state.is_editing) {
            return (
                <div className="col-md-3 text-right">
                    <span className="fa fa-save" onClick={this.onSaveClick.bind(this)}
                          style={save_icon_style} onMouseEnter={this.toogleHoverSave.bind(this)}
                          onMouseLeave={this.toogleHoverSave.bind(this)}> </span>
                    &nbsp; &nbsp; &nbsp;
                    <span className="fa fa-close" onClick={this.onCancelClick.bind(this)}
                          style={cancel_icon_style} onMouseEnter={this.toogleHoverCancel.bind(this)}
                          onMouseLeave={this.toogleHoverCancel.bind(this)}> </span>
                </div>
            )
        }

        return (
            <div className="col-md-3 text-right">
                <span className="fa fa-edit" onClick={this.onEditClick.bind(this)}
                      style={edit_icon_style} onMouseEnter={this.toogleHoverEdit.bind(this)}
                      onMouseLeave={this.toogleHoverEdit.bind(this)}> </span>
                &nbsp; &nbsp; &nbsp;
                <span className="fa fa-trash" onClick={this.props.deleteTask.bind(this, this.props.task)}
                      style={delete_icon_style} onMouseEnter={this.toogleHoverDelete.bind(this)}
                      onMouseLeave={this.toogleHoverDelete.bind(this)}> </span>
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
                {this.renderTaskSection()}
                {this.renderActionSection()}
            </div>
        )
    }

    toogleHover = () => {
        this.setState({hover: !this.state.hover})
    };

    toogleHoverEdit = () => {
        this.setState({hover_edit: !this.state.hover_edit})
    };

    toogleHoverDelete = () => {
        this.setState({hover_delete: !this.state.hover_delete})
    };

    toogleHoverSave = () => {
        this.setState({hover_save: !this.state.hover_save})
    };

    toogleHoverCancel = () => {
        this.setState({hover_cancel: !this.state.hover_cancel})
    };

    componentDidUpdate() {
        if (this.props.is_editing) {
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