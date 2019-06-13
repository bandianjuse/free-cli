import React, { useState, useEffect, useContext } from 'react';
import ContextTest from '@/pages/ContextTest';

export default (props) => {
    // 声明一个叫 “count” 的 state 变量。
    const [count, setCount] = useState(0);
    const value = useContext(ContextTest);
    console.log(value)
    useEffect(() => {
        // 使用浏览器的 API 更新页面标题

        document.title = `使用浏览器的${count}`;
    });
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me+
        </button>
            <button onClick={() => setCount(count - 1)}>
                Click me+
        </button>
            <button onClick={() => setCount(5)}>
                Click me=
        </button>
        </div>
    );
}
