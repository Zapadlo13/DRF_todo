import React from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import './bootstrap/css/bootstrap.min.css'
import './bootstrap/css/sticky-footer-navbar.css'
import Menu from "./components/Menu.js";
import UserList from "./components/User.js";
import Footer from "./components/Footer.js";


const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            navbarItems: [
                {name: 'Users', href: '/'},
                // {name: 'Todo', href: '/todo'},
            ],
            users: []
        }
    }


    componentDidMount() {

        axios.get('http://127.0.0.1:8000/api/users/').then(response => {
            // const authors = response.data
            this.setState({
                'users': response.data
            })
        }).catch(error => console.log(error))

    }

    render() {
        return (
            <div>
                <header>
                    <Menu navbarItems={this.state.navbarItems}/>
                </header>
                <main role="main" className="flex-shrink-0">
                    <div className="container">
                        <UserList users={this.state.users}/>
                    </div>
                </main>
                <Footer/>
            </div>


        )
    }
}

export default App;