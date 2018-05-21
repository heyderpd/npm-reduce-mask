const assert = require('assert')

import { createkMap } from '../src/utils'
import createMask, { getClearValuesAndCursor, createMaskValue, createSetValidCursor } from '../src/mask'
global.window = false

describe('getClearValuesAndCursor', function() {
  it('simple', () => {
    const elm = { selectionStart: 3, selectionEnd: 3, value: '12345' }

    assert.deepEqual(
      getClearValuesAndCursor(elm),
      { cursor: 3,
        values: ['1', '2', '3', '4', '5'] })
  })

  it('dirt string', () => {
    const elm = { selectionStart: 5, selectionEnd: 6, value: '12 d6*-/*- fgs  d++3 45' }

    assert.deepEqual(
      getClearValuesAndCursor(elm),
      { cursor: 3,
        values: ['1', '2', '6', '3', '4', '5'] })
  })
})

describe('createMaskValue basic', function() {
  const maskMap = createkMap('___.___.___-__')
  const maskValue = createMaskValue(maskMap)

  it('less', () => {
    assert.deepEqual(
      maskValue('123456789'),
      '123.456.789')
  })

  it('equal', () => {
    assert.deepEqual(
      maskValue('12345678912'),
      '123.456.789-12')
  })

  it('more', () => {
    assert.deepEqual(
      maskValue('12345678912345'),
      '123.456.789-12')
  })
})

describe('createMaskValue mult mask', function() {
  const maskMap = createkMap(['____-____', '(__) _____-____'])
  const maskValue = createMaskValue(maskMap)

  it('one: less', () => {
    assert.deepEqual(
      maskValue('123456'),
      '1234-56')
  })

  it('one: equal', () => {
    assert.deepEqual(
      maskValue('12345678'),
      '1234-5678')
  })

  it('one: more', () => {
    assert.deepEqual(
      maskValue('123456789'),
      '(12) 34567-89')
  })

  it('second: equal', () => {
    assert.deepEqual(
      maskValue('12345678912'),
      '(12) 34567-8912')
  })

  it('second: more', () => {
    assert.deepEqual(
      maskValue('12345678912345'),
      '(12) 34567-8912')
  })
})

describe('createSetValidCursor', function() {
  const maskMap = createkMap(['____-____', '(__) _____-____'])
  const setValidCursor = createSetValidCursor(maskMap)

  it('test 0', () => {
    const elm = { selectionStart: 0, selectionEnd: 0, value: '=1 2k34-5' }
    const { cursor, values } = getClearValuesAndCursor(elm)

    assert.deepEqual(
      setValidCursor(elm, values, cursor),
      { selectionStart: 0, selectionEnd: 0, value: '=1 2k34-5' })
  })

  it('test 4', () => {
    const elm = { selectionStart: 4, selectionEnd: 4, value: '=1 2k34-5' }
    const { cursor, values } = getClearValuesAndCursor(elm)

    assert.deepEqual(
      setValidCursor(elm, values, cursor),
      { selectionStart: 2, selectionEnd: 2, value: '=1 2k34-5' })
  })

  it('test 7,8', () => {
    const elm = { selectionStart: 7, selectionEnd: 8, value: '=1 2k34-5' }
    const { cursor, values } = getClearValuesAndCursor(elm)

    assert.deepEqual(
      setValidCursor(elm, values, cursor),
      { selectionStart: 5, selectionEnd: 5, value: '=1 2k34-5' })
  })
})

describe('createMask and onChange pass', function() {
  let count = 0
  const countFx = () => count += 3

  const reacElm = { mask: ['____-____', '(__) _____-____'], onChange: countFx }
  const { maskValue, onChange } = createMask(reacElm, x=>x)
  const evt = {
    preventDefault: x=>x,
    target: { selectionStart: 5, selectionEnd: 5, value: '=1 2k34-5' }
  }

  it('small', () => {
    assert.deepEqual(
      onChange(evt),
      { selectionStart: 2, selectionEnd: 2, value: '1234-5' })
  })

  it('big', () => {
    evt.target.value = '=169 20k*304-85 169 20k*304-85 169 20k*304-85 169 20k*304-85'
    assert.deepEqual(
      onChange(evt),
      { selectionStart: 2, selectionEnd: 2, value: '(16) 92030-4851' })
  })

  it('onChange', () => {
    onChange({})
    assert.deepEqual(
      9,
      count)
  })
})
