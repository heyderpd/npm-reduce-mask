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
  if (hasSelection(elm)) {
    return -1
  }

  return elm.selectionEnd > elm.selectionStart
    ? elm.selectionEnd
    : elm.selectionStart
}

export const setValidCursor = (elm, cursor) => {
  if (!elm) {
    return
  }

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
}
