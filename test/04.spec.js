import React, { Component } from 'react'
import { jsdom } from 'jsdom'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import assert from 'assert'

import ReactMask from '../src/index'

configure({ adapter: new Adapter() })

describe('changes state and props in time', function() {
  let result = {}, wrapper
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

  before(() => {
    const doc = jsdom('<!doctype html><html><body><div id="root"></div></body></html>')
    global.document = doc
    global.window = doc.defaultView
    wrapper = mount(
      <ReactMask
        mask={['____-____']}
        onChange={onChange}
        onBlur={onBlur}
      />)
  })

  after(() => {
    delete global.document
    delete global.window
  })

  it('basic', () => {
    assert.deepEqual(
      wrapper.props(),
      { mask: ['____-____'], onChange, onBlur, onBlur })
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
      wrapper.props(),
      { mask: ['____-____'], onChange, onBlur, defaultValue })
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
      wrapper.props(),
      { mask: ['____-____'], onChange, onBlur, defaultValue })
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
      wrapper.props(),
      { mask: ['____-____'], onChange, onBlur, defaultValue: '852' })
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
      wrapper.props(),
      { mask: ['___-___-__'], onChange, onBlur, defaultValue: '852' })
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
      wrapper.props(),
      { mask: ['___-___-__'], onChange, onBlur, defaultValue: '852' })
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
      wrapper.props(),
      { mask: ['___-___-__'], onChange, onBlur, defaultValue: '852' })
    assert.deepEqual(
      wrapper.state(),
      { value: '852-852-85', isChanged: true })
    assert.deepEqual(
      result,
      { value: '85285285', maskedValue: '852-852-85' })
  })
})
