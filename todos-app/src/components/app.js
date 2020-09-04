import React, { Component } from 'react';
const message = <h1>Hello React</h1>;
class App extends Component {
    render() {
        return (
            <div>
                {message}
            </div>
        );
    }
}

export default App;