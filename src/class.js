import React, { Component } from 'react'
import createMask, { cloneEvt, safeFx } from './mask'
import { ifNumberConvertToString } from './utils'

class PureInputMask extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      isChanged: false
    }
  }

  updateValue(value) {
    this.setState({ value, isChanged: true })
  }

  getDefaultValue() {
    const defaultValue = ifNumberConvertToString(this.props.defaultValue || '')
    return this.maskValue(defaultValue)
  }

  bindMaskAndOnChange () {
    const { maskValue, onChange } = createMask({
      mask: this.props.mask,
      onChange: this.props.onChange,
      updateValue: value => this.updateValue(value)
    })
    this.maskValue = maskValue.bind(this)
    this.onChange = onChange.bind(this)
    this.safeOnBlur = safeFx(this.props.onBlur)
  }

  onBlur(evt) {
    try {
      this.safeOnBlur(cloneEvt(evt))

    } catch (error) {
      return evt
    }
  }

  evaluateMask() {
    const { value, isChanged } = this.state
    this.bindMaskAndOnChange()

    if (isChanged) {
      this.setState({ value: this.maskValue(value) })

    } else {
      const defaultValue = this.getDefaultValue()
      this.setState({ value: defaultValue })
    }
  }

  componentDidUpdate(prevProps) {
    const { mask, defaultValue, onChange } = this.props
    if (mask !== prevProps.mask
      || defaultValue !== prevProps.defaultValue
      || onChange !== prevProps.onChange) {

      this.evaluateMask()
      return true
    }
    return false
  }

  componentWillMount() {
    this.evaluateMask()
  }

  render () {
    const { maxLength, defaultValue, value, ...props } = this.props
    return (
      <input
        {...props}
        type='tel'
        onChange={evt => this.onChange(evt)}
        onBlur={this.onBlur.bind(this)}
        value={this.state.value}
      />
    )
  }
}

export default PureInputMask
