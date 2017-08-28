import React from 'react'

const getCursor = elm => {
  if (elm)  {
    return elm.selectionEnd > elm.selectionStart
      ? elm.selectionEnd
      : elm.selectionStart
  }
  return -1
}

const getClearValuesAndCursor = elm => {
  const cursor = getCursor(elm)
  const values = elm
    .value
    .split('')
    .map(char => /\d/
      .test(char)
        ? char
        : undefined)
  const offset = cursor >= 0
    ? values
      .reduce(
      (acc, char, index) => (index < cursor && char === undefined)
        ? acc +1
        : acc,
      0)
    : 0
  return {
    cursor: cursor -offset,
    values: values.filter(Boolean)
  }
}

const createMaskValue = (mask, maskMap) => {
  const splitMask = mask.split('')

  return nomask => {
    const limit = nomask.length
    if (limit) {
      const maskedValue = maskMap
        .reduce((acc, placeHolder, index) => {
          if (index < limit) {
            acc[placeHolder] = nomask[index]
          }
          return acc
        }, splitMask)

      const lastChar = maskMap[limit - 1] >= 0
        ? maskMap[limit - 1] + 1
        : maskedValue.length
      return maskedValue.slice(0, lastChar).join('')
    }
    return ''
  }
}

const createSetValidCursor = maskMap => (elm, cursor) => {
  const validCursor = maskMap[cursor]
  if (validCursor >= 0 && elm && elm.selectionStart >= 0) {
    elm.selectionStart = validCursor
    elm.selectionEnd = validCursor
  }
}

const applyMask = ({ mask }) => {
  const maskMap = mask
    .split('')
    .reduce((acc, char, key) => {
      if (char === '_') {
        acc.push(Number(key))
      }
      return acc
    }, [])
  const maskValue = createMaskValue(mask, maskMap)
  const setValidCursor = createSetValidCursor(maskMap)

  return evt => {
    evt.preventDefault()
    const elm = evt.target
    const { cursor, values } = getClearValuesAndCursor(elm)
    elm.value = maskValue(values)
    setValidCursor(elm, cursor)
    return elm
  }
}

export default props => (<input {...props} type='text' onChange={applyMask(props)} />)
