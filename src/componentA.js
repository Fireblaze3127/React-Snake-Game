//test component when learning react
import React from 'react'

class ComponentA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'Hello World!'
        }

        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler() {
        let newState = Object.assign({}, this.state)
        newState.toggle = !newState.toggle
        newState.display = newState.toggle ? 'Goodbye World' : 'Hello World'
        this.setState(newState)
    }

    render() {
        return (
            <div className = 'componentA'>
                {this.state.display}
            <button onClick={this.clickHandler}>
                {this.state.toggle ? 'OFF' : 'ON'}
            </button>
            </div>
        )
    }
}

export default ComponentA