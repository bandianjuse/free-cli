import React, { Component } from 'react';
import logo from '@/assets/images/logo.png';
import '@/assets/scss/main.scss';



class App extends Component {
    render() {


        return (
            <div>
                <img src={logo} />
                <h1>Welcome to use FREE-CLI!</h1>
            </div>
        )
    }
}

export default App