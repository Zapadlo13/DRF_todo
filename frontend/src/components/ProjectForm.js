import React from "react";


class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', repository: '', user: []}
    }


    handleUserChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'user': []
            })
            return;
        }

        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
            console.log(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'user': users
        })
    }


    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value

            }
        )
    }

    handleRepositoryChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value

            }
        )
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.repository, this.state.user)

        event.preventDefault()
    }


    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <div className="form-group">
                    <label for="login">Name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label for="login">Repository</label>
                    <input type="text" className="form-control" name="repository" value={this.state.repository}
                           onChange={(event) => this.handleRepositoryChange(event)}/>
                </div>
                
                <div>
                    <select className="form-control" name="user" multiple
                            onChange={(event) => this.handleUserChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}> {item.username}</option>)}

                    </select>
                </div>


                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );

    }

}

export default ProjectForm