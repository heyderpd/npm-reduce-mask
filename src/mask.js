import React from 'react'
import { getCursor, hasSelection, safeCall, setValidCursor } from './utils'

const getClearValuesAndCursor = elm => {
  const cursor = getCursor(elm)
  const values = elm.value.split('')
    .map(char => /\d/
      .test(char)
        ? char
        : undefined)
  const offset = values.reduce(
    (acc, char, index) => (index < cursor && char === undefined)
      ? acc +1
      : acc,
    0)
  return {
    cursor: cursor -offset,
    values: values.filter(Boolean)
  }
}

const createMaskValue = (mask, maskMap) => nomask => {
  const limit = nomask.length
  if (limit) {
    const maskedValue = maskMap.reduce((acc, placeHolder, index) => {
      if (index < limit) {
        acc[placeHolder] = nomask[index]
      }
      return acc
    }, mask.split(''))
    const lastChar = maskMap[limit - 1] >= 0
      ? maskMap[limit - 1] + 1
      : maskedValue.length
    return maskedValue.slice(0, lastChar).join('')
  }
  return ''
}

const createSetValidCursor = maskMap => (elm, cursor) => {
  if (!elm) {
    return
  }

  setValidCursor(maskMap[cursor])
}

const applyMask = ({ mask, onChange }) => {
  const safeOnChange = typeof onChange === 'function'
    ? onChange
    : x => x
  const maskMap = mask.split('').reduce((acc, char, key) => {
    if (char === '_') {
      acc.push(Number(key))
    }
    return acc
  }, [])
  const maskValue = createMaskValue(mask, maskMap)
  const setValidCursor = createSetValidCursor(maskMap)

  return evt => {
    try {
      evt.preventDefault()
      const elm = evt.target
      const { cursor, values } = getClearValuesAndCursor(elm)
      elm.value = maskValue(values)
      safeCall(() => setValidCursor(elm, cursor))
      safeOnChange(evt)
      return elm

    } catch (err) {
      safeOnChange(evt)
    }
  }
}

const PureInputMask = props => (<input {...props} type='tel' onChange={applyMask(props)} />)

export default PureInputMask
