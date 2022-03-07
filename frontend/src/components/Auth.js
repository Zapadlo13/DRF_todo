import React from 'react'


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {login: '', password: ''}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        console.log(this.state.login + ' ' + this.state.password)
        this.props.get_token(this.state.login, this.state.password)
        event.preventDefault()
    }

    render() {
        return (
            <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header"><h3 className="text-center font-weight-light my-4">Авторизация</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <div className="form-group">
                            <label className="small mb-1">Имя пользователя</label>
                            <input class='form-control py-4' type="text" name="login"
                                   placeholder="Введите имя пользователя" value={this.state.login}
                                   onChange={(event) => this.handleChange(event)}/>
                        </div>
                        <div className="form-group">
                            <label className="small mb-1">Пароль</label>
                            <input class='form-control py-4' type="password" name="password"
                                   placeholder="Введите пароль" value={this.state.password}
                                   onChange={(event) => this.handleChange(event)}/>
                        </div>
                        <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                            <input class="btn btn-primary" type="submit" value="Авторизоваться"/>
                        </div>
                    </form>

                </div>


            </div>
        );
    }
}

export default LoginForm