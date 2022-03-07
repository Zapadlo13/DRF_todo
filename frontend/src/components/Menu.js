import React from 'react';
import {Link} from "react-router-dom";

function NavbarItem({name, href}) {
    return (
        <li className="nav-item active">
            <Link className="nav-link" to={href}>{name}</Link>
        </li>
    )
}


export default function Navbar({navbarItems, token, logout}) {

    let login_button = ''
    console.log(token)

    if ((token != "") & (token != null)) {
        login_button = <a className="nav-link" onClick={logout}>Выйти
            <i className="fas fa-sign-in-alt"></i></a>

    } else {
        login_button = <a className="nav-link" href="/login">Войти
            <i className="fas fa-sign-in-alt"></i></a>
    }
    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <a className="navbar-brand" href="#">GeekBrains</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    {navbarItems.map((item) => <NavbarItem name={item.name} href={item.href}/>)}
                </ul>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            {login_button}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
