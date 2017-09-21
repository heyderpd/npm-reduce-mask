import React from 'react'

const changeWithLimit = (onChange, maxLength) => evt => {
  evt.preventDefault()
  try {
    const elm = evt.target
    if (maxLength.length > 0) {
      if (elm.value.length > 0) {
        elm.value = elm.value.substring(0, Number(maxLength))
      }
    }
    onChange(evt)
    return elm

  } catch (err) {
    onChange(evt)
  }
}

const InputNumber = ({ onChange, maxLength,...props }) => (
  <input
    {...props}
    type='number'
    onChange={changeWithLimit(onChange, maxLength)}
  />)

export default InputNumber