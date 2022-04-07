import React from "react";


class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {project: props.projects[0].id, text: '', creator: props.users[0].id}
    }


    handleCreatorChange(event) {

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleProjectChange(event) {

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleTextChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value

            }
        )
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.project, this.state.text, this.state.creator)

        event.preventDefault()
    }


    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <div className="form-group">
                    <label for="login">Project</label>
                    <select className="form-control" name="project"
                            onChange={(event) => this.handleProjectChange(event)}
                    >
                        {this.props.projects.map((item) => <option value={item.id}> {item.name}</option>)}

                    </select>
                </div>

                <div>
                    <label htmlFor="login">Creator</label>
                    <select className="form-control" name="creator"
                            onChange={(event) => this.handleCreatorChange(event)}
                    >
                        {this.props.users.map((item) => <option value={item.id}> {item.username}</option>)}

                    </select>
                </div>

                <div className="form-group">
                    <label for="login">Text</label>
                    <input type="text" className="form-control" name="text" value={this.state.text}
                           onChange={(event) => this.handleTextChange(event)}/>
                </div>


                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );

    }

}

export default ToDoForm