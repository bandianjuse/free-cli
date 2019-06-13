import React, { Component } from 'react';
import TestComponent from './TestComponent';
import Child from './Child'
import HookTest from './HookTest';
import logo from '@/assets/images/logo.png';
import '@/assets/scss/main.scss';
import ContextTest, { defaultValue } from '@/pages/ContextTest';



@TestComponent
class Test extends Component {
    state = {
        ...defaultValue,
        toggle: () => {
            this.setState({
                background: '#ccc'
            })
        }
    };

    render() {
        const addContent = () => 'test!abcddd';

        return (
            <ContextTest.Provider value={this.state}>
                <Child />
                <HookTest name="prop-name" />
                <img src={logo} />
                {addContent()}
            </ContextTest.Provider>
        )
    }
}

export default Test