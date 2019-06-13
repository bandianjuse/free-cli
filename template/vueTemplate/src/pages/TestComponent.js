import React, { Component } from 'react';

export default WrappedComponent => class extends Component {
    render() {
        return (
            <div>
                <div>abc</div>
                <WrappedComponent {...this.props} />
            </div>
        )
    }
}