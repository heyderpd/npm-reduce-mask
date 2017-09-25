const assert = require('assert')

import { hasSelection, getCursor, setValidCursor, getSmallerMask, createkMap } from '../src/utils'

describe('getSmallerMask', function() {
  const maskList = [
    {map: {length: 8}},
    {map: {length: 10}},
    {map: {length: 11}},
  ]
  const expected = {
    7: 8,
    8: 8,
    9: 10,
    10: 10,
    11: 11,
    12: 11
  }

  Object.keys(expected).map(input => {
    const output = expected[input]
    it(String(input), () => assert.equal(
      getSmallerMask(maskList, input).map.length,
      output))
  })
})

describe('createkMap', function() {
  const cpf = {
    map:  [ 0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13 ],
    mask: [ '_', '_', '_', '.', '_', '_', '_', '.', '_', '_', '_', '-', '_', '_' ]
  }
  const cnpj = {
    map:  [ 0, 1, 3, 4, 5, 7, 8, 9, 11, 12, 13, 14, 16, 17 ],
    mask: [ '_', '_', '.', '_', '_', '_', '.', '_', '_', '_', '/', '_', '_', '_', '_', '-', '_', '_' ]
  }
  const expected = [ cpf, cnpj ]

  it('string', () => {
    const mask = '___.___.___-__'
    const expected = [ cpf ]

    assert.deepEqual(
      createkMap(mask),
      expected)
  })

  it('one', () => {
    const mask = ['___.___.___-__']
    const expected = [ cpf ]

    assert.deepEqual(
      createkMap(mask),
      expected)
  })

  it('two', () => {
    const mask = ['___.___.___-__', '__.___.___/____-__']
    const expected = [ cpf, cnpj ]

    assert.deepEqual(
      createkMap(mask),
      expected)
  })
})

describe('hasSelection', function() {
  GLOBAL.document = {createElement: () => ({selectionStart: 1, selectionEnd: 2})}

  it('undefined and false', () => {
    assert.deepEqual(
      hasSelection(),
      true)
    assert.deepEqual(
      hasSelection(false),
      true)
    assert.deepEqual(
      hasSelection(undefined),
      true)
  })

  it('test with elm', () => {
    assert.deepEqual(
      hasSelection({selectionStart: 'a', selectionEnd: 'b'}),
      false)
    assert.deepEqual(
      hasSelection({selectionStart: 1, selectionEnd: 2}),
      true)
  })
})

describe('getCursor', function() {
  it('invalid elm', () => {
    const elm = {selectionStart: 'a', selectionEnd: 'b'}

    assert.deepEqual(
      getCursor(elm),
      -1)
  })

  it('elm cursor', () => {
    const elm = {selectionStart: 3, selectionEnd: 3}

    assert.deepEqual(
      getCursor(elm),
      3)
  })

  it('elm select', () => {
    const elm = {selectionStart: 1, selectionEnd: 5}

    assert.deepEqual(
      getCursor(elm),
      5)
  })
})

describe('setValidCursor', function() {
  it('valid elm', () => {
    assert.deepEqual(
      setValidCursor({ selectionStart: 3, selectionEnd: 3, value: '12345' }, 2),
      { selectionStart: 2, selectionEnd: 2, value: '12345' })
  })

  it('invalid cursor', () => {
    assert.deepEqual(
      setValidCursor({ selectionStart: 3, selectionEnd: 3, value: '12345' }),
      { selectionStart: 5, selectionEnd: 5, value: '12345' })
  })
})
