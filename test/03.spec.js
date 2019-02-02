import React, { Component } from 'react'
import { createDom, destroyDom, shallow } from './enzyme.config'
import assert from 'assert'

import ReactMask from '../src/class'

describe('react test', function() {
  let wrapper = null

  before(createDom)

  after(destroyDom)

  afterEach(() => wrapper.unmount())

  it('undefined', () => {
    wrapper = shallow(<ReactMask />)
    assert.deepEqual(
      wrapper.state(),
      { value: '', isChanged: false })
  })

  it('with mask', () => {
    wrapper = shallow(<ReactMask mask={['___-___']} />)
    assert.deepEqual(
      wrapper.state(),
      { value: '', isChanged: false })
  })

  it('with defaultValue', () => {
    wrapper = shallow(<ReactMask defaultValue='456789' />)
    assert.deepEqual(
      wrapper.state(),
      { value: '456789', isChanged: false })
  })

  it('with mask and defaultValue', () => {
    wrapper = shallow(<ReactMask mask={['___-___']} defaultValue='456789' />)
    assert.deepEqual(
      wrapper.state(),
      { value: '456-789', isChanged: false })
  })

  const sendChange = (wrapper, value) => {
    const event = { target: { value }, preventDefault: x=>x }
    wrapper.simulate('change', event)
  }

  it('basic', () => {
    let result
    const onChange = evt => result = evt.target.value

    wrapper = shallow(
      <ReactMask
        mask={['___-___']}
        defaultValue={456789}
        onChange={onChange}
      />)

    assert.deepEqual(
      wrapper.state(),
      { value: '456-789', isChanged: false })

    sendChange(wrapper, '753951')

    assert.equal(
      result,
      '753951')

    assert.deepEqual(
      wrapper.state(),
      { value: '753-951', isChanged: true })

    sendChange(wrapper, '852-654xx')

    assert.equal(
      result,
      '852654')

    assert.deepEqual(
      wrapper.state(),
      { value: '852-654', isChanged: true })
  })

  it('advance', () => {
    let result
    const onChange = evt => result = evt.target.value

    wrapper = shallow(
      <ReactMask
        mask={['___-___', '___-xy____*_']}
        defaultValue={'852852'}
        onChange={onChange}
      />)

    assert.deepEqual(
      wrapper.state(),
      { value: '852-852', isChanged: false })

    sendChange(wrapper, '753951753951')

    assert.deepEqual(
      result,
      '75395175')

    assert.deepEqual(
      wrapper.state(),
      { value: '753-xy9517*5', isChanged: true })

    sendChange(wrapper, '852-6547')

    assert.equal(
      result,
      '8526547')

    assert.deepEqual(
      wrapper.state(),
      { value: '852-xy6547', isChanged: true })

    sendChange(wrapper, '')

    assert.equal(
      result,
      '')

    assert.deepEqual(
      wrapper.state(),
      { value: '', isChanged: true })
  })
})
