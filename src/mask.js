import { isString } from 'pytils'

import {
  getCursor,
  setValidCursor,
  safeCall,
  getSmallerMask,
  createkMap,
  ifNumberConvertToString,
  onlyNumbers,
  isArrayOfStringsAndHasLenght
} from './utils'

export const getClearValuesAndCursor = elm => {
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

const isValidArrayOfMask = obj => isString(obj) || isArrayOfStringsAndHasLenght(obj)

export const createMaskValue = maskList => originalValue => {
  const values = ifNumberConvertToString(originalValue)
  if (maskList === null) {
    return originalValue
  }
  const nomask = isString(values) ? onlyNumbers(values).split('') : values

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

export const createSetValidCursor = maskList => (elm, values, cursor) => {
  if (!elm) {
    return
  }

  const maskObj = getSmallerMask(maskList, values.length)
  return setValidCursor(elm, maskObj.map[cursor])
}

export const cloneEvt = evt => ({
  ...evt,
  target: {
    ...evt.target,
    value: onlyNumbers(evt.target.value),
    maskedValue: evt.target.value
  }
})

export const safeFx = fx => typeof fx === 'function' ? fx : x => x

const createMask = ({ mask, onChange, updateValue }) => {
  const safeOnChange = safeFx(onChange)
  const safeUpdateValue = safeFx(updateValue)

  const maskMap = createkMap(mask)
  const maskValue = createMaskValue(maskMap)
  const setValidCursor = createSetValidCursor(maskMap)

  const onChangeReduce = evt => {
    const elm = evt && evt.target
    try {
      evt.preventDefault()
      const { cursor, values } = getClearValuesAndCursor(elm)

      elm.value = maskValue(values)
      safeUpdateValue(elm.value)
      safeCall(() => setValidCursor(elm, values, cursor))

      const fakeEvt = cloneEvt(evt)
      safeOnChange(fakeEvt)

    } catch (error) {
      safeOnChange(evt)
    }
    return elm
  }

  return {
    maskValue,
    onChange: onChangeReduce
  }
}

export default createMask
