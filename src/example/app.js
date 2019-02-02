import React, { Component } from 'react'

import ReactMask from '../class'

import './stylesheets/style.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }
    this.onChange = this.onChange.bind(this)
  }

  async componentDidMount () {}

  onChange(evt) {
    const { value, maskedValue } = evt.target
    this.setState({ value, maskedValue })
  }

  render() {
    return (
      <div className="App">
        <p>
          <span>value:</span>
          <span>{this.state.value}</span>
        </p>
        <p>
          <span>masked:</span>
          <span>{this.state.maskedValue}</span>
        </p>
        <ReactMask
          mask={['____-____']}
          onChange={this.onChange}
          onBlur={this.onChange}
        />
        {/* <input
          type="range"
          min="1"
          max="100"
          value="50"
          class="slider"
          onChange={fdasfdsdf}
        ></input>*/}
      </div>
    );
  }
}

export default App
