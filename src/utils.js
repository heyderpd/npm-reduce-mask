import { isString, isNumber, isArray, length } from 'pytils'

export const safeCall = fn => {
  const defaultFx = () => setTimeout(fn, 0)
  const call = window
    ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || defaultFx
    : defaultFx

  fn()
  call(fn)
}

export const hasSelection = elm => {
  const testElm = elm
    ? elm
    : ((document && typeof(document.createElement) === 'function')
      ? document.createElement('input')
      : {})
  return typeof(testElm.selectionStart) === 'number'
      && typeof(testElm.selectionEnd) === 'number'
}

export const getCursor = elm => {
  if (!hasSelection(elm)) {
    return -1
  }

  return elm.selectionEnd > elm.selectionStart
    ? elm.selectionEnd
    : elm.selectionStart
}

export const setValidCursor = (elm, cursor) => {
  try {
    const validCursor = cursor >= 0
      ? cursor
      : elm.value.length

    if (hasSelection(elm)) {
      elm.selectionStart = validCursor
      elm.selectionEnd = validCursor

    } else {
      const range = elm.createTextRange()
      range.collapse(true)
      range.moveStart('character', validCursor)
      range.moveEnd('character', validCursor)
      range.select()
    }
  } catch (error) {}

  return elm
}

export const getSmallerMask = (maskList, length) => {
  return maskList
    .reduce(
      (acc, mask) => (acc.map.length < length) || (length <= mask.map.length && mask.map.length < acc.map.length)
        ? mask
        : acc)
}

export const onlyNumbers = obj => isString(obj) ? obj.replace(/\D/g, '') : obj

export const ifNumberConvertToString = obj => isNumber(obj) ? String(obj) : obj

export const hasLength = obj => length(obj) > 0

export const isArrayOfStrings = obj => obj.reduce((acc, value) => isString(value) && acc, true)

export const isArrayOfStringsAndHasLenght = obj => isArray(obj)
  && hasLength(obj)
  && isArrayOfStrings(obj)

const convertToArray = mask => isArray(mask) ? mask : [mask]

export const createkMap = mask => {
  const Masks = convertToArray(mask)
  if (!isArrayOfStringsAndHasLenght(Masks)) {
    return null
  }

  return Masks
    .map(m => m.split(''))
    .map(m => m
      .reduce((acc, char, key) => {
        if (char === '_') {
          acc.map.push(Number(key))
        }
        return acc
      }, {
        map: [],
        mask: m
      }))
    .reduce((acc, m) => {
      acc[m.map.length] = m
      return acc
    }, [])
    .filter(Boolean)
}

export const fakeFx = x => x
