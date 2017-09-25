import React from 'react'
import { getCursor, setValidCursor, safeCall, getSmallerMask, createkMap } from './utils'

const getClearValuesAndCursor = elm => {
  const cursor = getCursor(elm)
  const values = elm
    .value
    .split('')
    .map(char => /\d/
      .test(char)
        ? char
        : undefined)
  const offset = values
    .reduce(
      (acc, char, index) => (index < cursor && char === undefined)
        ? acc +1
        : acc,
      0)
  return {
    cursor: cursor -offset,
    values: values.filter(Boolean)
  }
}

const createMaskValue = maskList => nomask => {
  const limit = nomask.length
  const maskObj = getSmallerMask(maskList, limit)
  if (limit) {
    const maskedValue = maskObj.map
      .reduce((acc, placeHolder, index) => {
        if (index < limit) {
          acc[placeHolder] = nomask[index]
        }
        return acc
      }, maskObj.mask)
    const lastChar = maskObj.map[limit - 1] >= 0
      ? maskObj.map[limit - 1] + 1
      : maskedValue.length
    return maskedValue.slice(0, lastChar).join('')
  }
  return ''
}

const createSetValidCursor = maskMap => (elm, values, cursor) => {
  if (!elm) {
    return
  }

  const maskObj = getSmallerMask(maskList, values.length)
  return setValidCursor(maskObj.map[cursor])
}

const applyMask = ({ mask, onChange }) => {
  const safeOnChange = typeof onChange === 'function'
    ? onChange
    : x => x
  const maskMap = createkMap(mask)
  const maskValue = createMaskValue(maskMap)
  const setValidCursor = createSetValidCursor(maskMap)

  return evt => {
    try {
      evt.preventDefault()
      const elm = evt.target
      const { cursor, values } = getClearValuesAndCursor(elm)

      elm.value = maskValue(values)
      safeCall(() => setValidCursor(elm, values, cursor))
      safeOnChange(evt)
      return elm

    } catch (err) {
      safeOnChange(evt)
    }
  }
}

const PureInputMask = props => (<input {...props} type='tel' onChange={applyMask(props)} />)

export default PureInputMask
