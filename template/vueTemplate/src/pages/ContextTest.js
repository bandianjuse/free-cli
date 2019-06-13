import React from 'react';

export const defaultValue = {
    background: 'red',
    color: 'white',
    toggle: () => { }
}

export default React.createContext(defaultValue);
