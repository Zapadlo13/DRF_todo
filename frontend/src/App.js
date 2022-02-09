import React from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User.js";


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        // const users = [
        //     {
        //         'username': 'Фёдор',
        //         'first_name': 'Фёдор',
        //         'last_name': 'Достоевский',
        //         'email': 1821
        //     },
        //     {
        //         'username': 'Александр',
        //         'first_name': 'Александр',
        //         'last_name': 'Грин',
        //         'email': 1880
        //     },
        // ]
        // this.setState(
        //     {
        //         'users': users
        //     }
        // )


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
                <UserList users={this.state.users}/>
            </div>
        )
    }
}

export default App;