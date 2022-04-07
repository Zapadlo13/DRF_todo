import React from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import './bootstrap/css/bootstrap.min.css'
import './bootstrap/css/sticky-footer-navbar.css'
import Menu from "./components/Menu.js";
import UserList from "./components/User.js";
import {ProjectList, ProjectDetail} from './components/Project.js'
import TodoList from "./components/ToDo.js";
import Footer from "./components/Footer.js";
import NotFound404 from "./components/NotFound404.js";
import Cookies from "universal-cookie";
import LoginForm from './components/Auth.js'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import ProjectForm from "./components/ProjectForm.js";
import ToDoForm from "./components/ToDoForm.js";

const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            navbarItems: [
                {name: 'Users', href: '/'},
                {name: 'Projects', href: '/projects'},
                {name: 'Todos', href: '/todos'},
            ],
            users: [],
            projects: [],
            project: {},
            todos: [],
            token: '',
        }

    }


    createProject(name, repository, user) {

        const headers = this.get_headers()
        const data = {name: name, repository: repository, users: user}
        axios.post(DOMAIN + 'projects/', data, {headers}).then(
            response => {

                this.load_data()
            }
        ).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })

    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(DOMAIN + `projects/${id}`, {headers}).then(
            response => {
                this.load_data()

            }
        ).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    deleteToDo(id) {
        const headers = this.get_headers()
        axios.delete(DOMAIN + `todos/${id}`, {headers}).then(
            response => {
                this.load_data()

            }
        ).catch(error => {
            console.log(error)
            this.setState({todos: []})
        })
    }

    createTodo(project, text, creator) {

        const headers = this.get_headers()

        console.log('project:' + project)
        console.log('creator:' + creator)
        console.log('text:' + text)

        const data = {project: project, text: text, creator: creator}
        axios.post(DOMAIN + 'todos/', data, {headers}).then(
            response => {

                this.load_data()
            }
        ).catch(error => {
            console.log(error)
            this.setState({todos: []})
        })

    }

    logout() {
        this.set_token('')
    }

    load_data() {

        const headers = this.get_headers()

        axios.get(DOMAIN + 'users/', {headers}).then(response => {
            this.setState({
                'users': response.data
            })
        }).catch(error => console.log(error))

        axios.get(DOMAIN + 'projects/', {headers}).then(response => {
            this.setState({
                'projects': response.data
            })
        }).catch(error => console.log(error))

        axios.get(DOMAIN + 'todos/', {headers}).then(response => {
            this.setState({
                'todos': response.data
            })
        }).catch(error => console.log(error))
    }

    is_aut() {
        return !!this.state.token
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
        console.log(this.state.token)
    }

    get_token_from_cookies() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        if ((token != "") & (token != null)) {
            this.setState({'token': token}, () => this.load_data())
        }
    }

    get_token(username, password) {
        console.log('username:' + username + ' password:' + password)
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: username,
            password: password
        }).then(response => {
            this.set_token(response.data['token'])
            window.open('http://localhost:3000/');
        }).catch(error => console.log(error))

    }

    get_headers() {
        console.log('test')
        let headers = {

            'Content-Type': 'application/json'
        }
        console.log(this.is_aut())
        if (this.is_aut()) {
            console.log(`Token ${this.state.token}`)
            headers['Authorization'] = `Token ${this.state.token}`
        }


        return headers
    }

    getProject(id) {
        console.log('call')
        console.log(get_url(`projects/${id}`))
        axios.get(get_url(`projects/${id}`))
            .then(response => {
                console.log(response.data)
                this.setState({projects: response.data})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_cookies()

    }

    render() {
        return (
            <BrowserRouter>
                <header>
                    <Menu navbarItems={this.state.navbarItems} token={this.state.token} logout={() => this.logout()}/>
                </header>
                <main role="main" className="flex-shrink-0">
                    <div className="container">
                        <Switch>

                            <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                            <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users}
                                                                                               createProject={(name, repository, user) => this.createProject(name, repository, user)}/>}/>
                            <Route exact path='/projects'
                                   component={() => <ProjectList projects={this.state.projects}
                                                                 deleteProject={(id) => this.deleteProject(id)}/>}/>
                            <Route exact path='/todos/create' component={() => <ToDoForm users={this.state.users}
                                                                                         projects={this.state.projects}
                                                                                         createTodo={(project, text, creator) => this.createTodo(project, text, creator)}/>}/>
                            <Route exact path='/todos' component={() => <TodoList todos={this.state.todos}
                                                                                  deleteToDo={(id) => this.deleteToDo(id)}
                            />}/>
                            <Route exact path='/login' component={() => <LoginForm
                                get_token={(username, password) => this.get_token(username, password)}/>}/>

                            <Route path="/project/:id"
                                   children={<ProjectDetail getProject={(id) => this.getProject(id)}
                                                            item={this.state.project}/>}/>
                            <Redirect from='/users' to='/'/>
                            <Route component={NotFound404}/>
                        </Switch>


                    </div>
                </main>
                <Footer/>
            </BrowserRouter>


        )
    }
}

export default App;