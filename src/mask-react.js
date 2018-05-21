import React, { Component } from 'react'
import createMask from './mask'
import { ifNumberConvertToString } from './utils'

class PureInputMask extends Component {

  constructor(props) {
    super(props)
    this.state = {
      defaultValue: '',
      value: ''
    }
  }

  updateValue(value) {
    this.setState({ value })
  }

  componentWillMount() {
    const { maskValue, onChange } = createMask(this.props, this.updateValue.bind(this))
    this.onChange = onChange

    const value = ifNumberConvertToString(this.props.defaultValue || '')
    this.setState({
      defaultValue: maskValue(value)
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
