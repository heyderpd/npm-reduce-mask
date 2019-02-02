import React, { Component } from 'react'
import createMask, { cloneEvt, safeFx } from './mask'
import { ifNumberConvertToString, fakeFx } from './utils'

class PureInputMask extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: props.value || '',
      isChanged: false
    }
    this.updateValue = this.updateValue.bind(this)
    this.getDefaultValue = this.getDefaultValue.bind(this)
    this.bindMaskAndOnChange = this.bindMaskAndOnChange.bind(this)
    this.evaluateMask = this.evaluateMask.bind(this)
    this.maskValue = fakeFx
    this.onChange = fakeFx
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

  evaluateMask(isChangedPropMask, propValue) {
    const { value, isChanged } = this.state
    isChangedPropMask && this.bindMaskAndOnChange()

    if (isChanged) {
      this.setState({ value: this.maskValue(value) })

    } else {
      const _defval = value || this.getDefaultValue()
      this.setState({ value: this.maskValue(_defval) })
    }
  }

  componentDidUpdate(prevProps) {
    const { mask, defaultValue, onChange, value } = this.props
    const isChangedPropMask = mask !== prevProps.mask
      || defaultValue !== prevProps.defaultValue
      || onChange !== prevProps.onChange
    if (value !== prevProps.value) {
      this.updateValue(value)
    }
    if (isChangedPropMask) {
      this.evaluateMask(isChangedPropMask, value)
      return true
    }
    return false
  }

  componentWillMount() {
    this.evaluateMask(true)
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
