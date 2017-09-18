import React from 'react'

const createMaskValue = (mask, maskMap) => elm => {
  const nomask = elm
    .value
    .replace(/\D/g, '')
    .split('')
  const limit = nomask.length

  const maskedValue = maskMap
    .reduce((acc, placeHolder, key) => {
      if (key < limit) {
        acc[placeHolder] = nomask[key]
      }
      return acc
    }, mask.split(''))

  const lastChar = maskMap[limit - 1] >= 0
    ? maskMap[limit - 1] + 1
    : maskedValue.length

  return maskedValue
    .slice(0, lastChar)
    .join('')
}

const createGetValidCursor = maskMap => elm => {
  if (elm && elm.selectionStart >= 0) {
    const cursor = elm.selectionStart

    if (maskMap.indexOf(cursor -1) < 0) {
      const validCursor = maskMap
        .reduceRight((acc, maskKey) => {
          return cursor < maskKey
            ? maskKey
            : acc
        }, -1)
      return validCursor

    } else {
      return cursor
    }
  }
}

const moveCursor = (elm, cursor) => {
  if (cursor >= 0 && elm && elm.selectionStart >= 0) {
    elm.selectionStart = elm.selectionEnd = cursor
  }
}

const applyMask = ({ mask, onChange }) => {
  const maskMap = mask
    .split('')
    .reduce((acc, char, key) => {
      if (char === '_') {
        acc.push(Number(key))
      }
      return acc
    }, [])

  const maskValue = createMaskValue(mask, maskMap)
  const getValidCursor = createGetValidCursor(maskMap)

  return evt => {
    evt.preventDefault()
    try {
      const elm = evt.target
      if (elm && elm.value && elm.value.length) {
        const cursor = getValidCursor(elm)
        elm.value = maskValue(elm)
        moveCursor(elm, cursor)
      }
      onChange(evt)
      return elm

    } catch (err) {
      onChange(evt)
    }
  }
}

const inputMask = props => (
  <input
    {...props}
    type='text'
    onChange={applyMask(props)}
  />)

export default inputMask
