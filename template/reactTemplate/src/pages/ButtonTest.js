import React, { Component } from 'react';
import ContextTest from '@/pages/ContextTest';

class ButtonTest extends Component {
    static contextType = ContextTest;

    render() {
        return (
            <div>
                <ContextTest.Consumer>
                    {({ background, color, toggle }) => (
                        <div>
                            <div>background: {background}</div>
                            <div>color: {color}</div>
                            <button
                                onClick={toggle} //调用回调
                                style={{ backgroundColor: background }}>
                                Toggle Theme
                            </button>
                        </div>
                    )}
                </ContextTest.Consumer>

            </div>
        )
    }
}

export default ButtonTest