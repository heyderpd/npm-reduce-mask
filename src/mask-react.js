import React, { Component } from 'react'
import applyMask from './mask'

class PureInputMask extends Component {

  constructor(props) {
    super(props)
    this.state = {
      defaultValue: ''
    }
  }

  componentWillMount() {
    const { maskValue, onChange } = applyMask(this.props)
    this.onChange = onChange
    this.setState({
      defaultValue: maskValue(this.props.defaultValue || '')
    })
  }

  render () {
    const { maxLength, value, ...props } = this.props
    return (
      <input
        {...props}
        type='tel'
        onChange={this.onChange}
        defaultValue={this.state.defaultValue}
      />
    )
  }
}

export default PureInputMask
