export const safeCall = fn => {
  const call = window
    ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame
    : () => setTimeout(fn, 0)

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
  return elm
}

export const getSmallerMask = (maskList, length) => {
  return maskList
    .reduce((acc, mask) => (acc.map.length < length)
            || (length <= mask.map.length && mask.map.length < acc.map.length)
      ? mask
      : acc)
}

export const createkMap = mask => {
  const maskArr = Array.isArray(mask) ? mask : [ mask ]
  return maskArr
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
