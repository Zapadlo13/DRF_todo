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
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

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
            todos: []
        }

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

        axios.get('http://127.0.0.1:8000/api/users/').then(response => {
            this.setState({
                'users': response.data
            })
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/').then(response => {
            this.setState({
                'projects': response.data
            })
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos/').then(response => {
            this.setState({
                'todos': response.data
            })
        }).catch(error => console.log(error))

    }


    render() {
        return (
            <BrowserRouter>
                <header>
                    <Menu navbarItems={this.state.navbarItems}/>
                </header>
                <main role="main" className="flex-shrink-0">
                    <div className="container">
                        <Switch>

                            <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                            <Route exact path='/projects'
                                   component={() => <ProjectList projects={this.state.projects}/>}/>
                            <Route exact path='/todos' component={() => <TodoList todos={this.state.todos}/>}/>
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