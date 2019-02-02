import React, { Component } from 'react'
import { createDom, destroyDom, shallow } from './enzyme.config'
import assert from 'assert'

import ReactMask from '../src/index'

describe('changes state and props in time', function() {
  let result = {}, wrapper = null
  const onChange = evt => {
    const { value, maskedValue } = evt.target
    result = { value, maskedValue }
  }
  const onBlur = onChange

  const defaultValue = '123456'
  const sendChange = value => {
    const event = { target: { value }, preventDefault: x=>x }
    wrapper.simulate('change', event)
  }
  const ignoreProps = ['onChange', 'onBlur', 'type']
  const ignoreSomeProps = oriObj => {
    const newObj = {}
    Object.keys(oriObj).map(key => {
      if (ignoreProps.indexOf(key) < 0) {
        newObj[key] = oriObj[key]
      }
    })
    return newObj
  }

  before(() => {
    createDom()
    wrapper = shallow(
      <ReactMask
        mask={['____-____']}
        onChange={onChange}
        onBlur={onBlur}
      />)
  })

  after(() => {
    wrapper.unmount()
    createDom()
  })

  it('basic', () => {
    assert.deepEqual(
      ignoreSomeProps(wrapper.props()),
      { mask: ['____-____'], value: '' })
    assert.deepEqual(
      wrapper.state(),
      { value: '', isChanged: false })
    assert.deepEqual(
      result,
      {})
  })

  it('set defaultValue', () => {
    wrapper.setProps({ defaultValue })

    assert.deepEqual(
      ignoreSomeProps(wrapper.props()),
      { mask: ['____-____'], value: '1234-56' })
    assert.deepEqual(
      wrapper.state(),
      { value: '1234-56', isChanged: false })
    assert.deepEqual(
      result,
      {})
  })

  it('send value', () => {
    sendChange('753951753951')

    assert.deepEqual(
      ignoreSomeProps(wrapper.props()),
      { mask: ['____-____'], value: '7539-5175' })
    assert.deepEqual(
      wrapper.state(),
      { value: '7539-5175', isChanged: true })
    assert.deepEqual(
      result,
      { value: '75395175', maskedValue: '7539-5175' })
  })

  it('set defaultValue again', () => {
    wrapper.setProps({ defaultValue: '852' })

    assert.deepEqual(
      ignoreSomeProps(wrapper.props()),
      { mask: ['____-____'], value: '7539-5175' })
    assert.deepEqual(
      wrapper.state(),
      { value: '7539-5175', isChanged: true })
    assert.deepEqual(
      result,
      { value: '75395175', maskedValue: '7539-5175' })
  })

  it('set mask again', () => {
    wrapper.setProps({ mask: ['___-___-__'] })

    assert.deepEqual(
      ignoreSomeProps(wrapper.props()),
      { mask: ['___-___-__'], value: '753-951-75' })
    assert.deepEqual(
      wrapper.state(),
      { value: '753-951-75', isChanged: true })
    assert.deepEqual(
      result,
      { value: '75395175', maskedValue: '7539-5175' })
  })

  it('send value again', () => {
    sendChange('8%$528#$52852852')

    assert.deepEqual(
      ignoreSomeProps(wrapper.props()),
      { mask: ['___-___-__'], value: '852-852-85' })
    assert.deepEqual(
      wrapper.state(),
      { value: '852-852-85', isChanged: true })
    assert.deepEqual(
      result,
      { value: '85285285', maskedValue: '852-852-85' })
  })

  it('onBlur', () => {
    wrapper.simulate('blur')

    assert.deepEqual(
      ignoreSomeProps(wrapper.props()),
      { mask: ['___-___-__'], value: '852-852-85' })
    assert.deepEqual(
      wrapper.state(),
      { value: '852-852-85', isChanged: true })
    assert.deepEqual(
      result,
      { value: '85285285', maskedValue: '852-852-85' })
  })
})
