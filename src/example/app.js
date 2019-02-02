import React, { Component } from 'react'

import ReactMask from '../class'

import './stylesheets/style.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '123456789012345'
    }
    this.onChange = this.onChange.bind(this)
  }

  async componentDidMount () {}

  onChange(evt) {
    const { maskedValue, target } = evt
    const { value } = target
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
        <p>
          <ReactMask
            id="mask-01"
            mask={['R$ __.___']}
            defaultValue={this.state.value}
            onChange={this.onChange}
            onBlur={this.onChange}
          />
        </p>
        <p>
          <ReactMask
            id="mask-02"
            mask={['(__) ____.____']}
            defaultValue={this.state.value}
            onChange={this.onChange}
            onBlur={this.onChange}
          />
        </p>
        <p>
          <ReactMask
            id="mask-02"
            mask={['__.___.___-_', '___.___.___-__']}
            defaultValue={this.state.value}
            onChange={this.onChange}
            onBlur={this.onChange}
          />
        </p>
        <p>
          <input
            id="slider-01"
            type="range"
            min="0"
            max="99999999"
            value={this.state.value}
            onChange={this.onChange}
          ></input>
        </p>
      </div>
    )
  }
}

export default App
