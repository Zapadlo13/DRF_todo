import React from 'react'


const Menu = () => {
    return (

        <body>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <a href="#" className="navbar-brand">
                {/*<img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" width="30" height="30" alt="logo">*/}
            </a>
            <a href="#" className="navbar-brand">
                {/*<img src="https://nuxtjs.org/logos/nuxt-square-white.svg" width="30" height="30" alt="logo">*/}
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a href="#" className="nav-link">Главная</a>
                    </li>
                    <li className="nav-item ">
                        <a href="#" className="nav-link">Пользователи</a>
                    </li>
                </ul>

                <a href="#" className="btn btn-outline-light mr-2">Вход</a>
                <a href="#" className="btn btn-outline-light mr-2">Регистрация</a>
                <a href="#" className="btn btn-outline-light">Выход</a>
            </div>
        </nav>
        <script src="//stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"
                integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
                crossOrigin="anonymous"></script>
        </body>
    )
}

export default Menu