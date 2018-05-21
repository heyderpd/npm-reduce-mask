import React, { Component } from 'react'
import { jsdom } from 'jsdom'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import assert from 'assert'

import ReactMask from '../src/mask-react'

configure({ adapter: new Adapter() })

const initDom = () => {
  const doc = jsdom('<!doctype html><html><body><div id="root"></div></body></html>')
  global.document = doc
  global.window = doc.defaultView
}

const removeDom = () => {
  delete global.document
  delete global.window
}

describe('react test', function() {
  before(initDom)

  after(removeDom)

  it('undefined', () => {
    const wrapper = mount(<ReactMask />)
    assert.deepEqual(
      wrapper.state(),
      { defaultValue: '', value: '' })
  })

  it('with mask', () => {
    const wrapper = mount(<ReactMask mask={['___-___']} />)
    assert.deepEqual(
      wrapper.state(),
      { defaultValue: '', value: '' })
  })


  it('with defaultValue', () => {
    const wrapper = mount(<ReactMask defaultValue='456789' />)
    assert.deepEqual(
      wrapper.state(),
      { defaultValue: '456789', value: '' })
  })

  it('with mask and defaultValue', () => {
    const wrapper = mount(<ReactMask mask={['___-___']} defaultValue='456789' />)
    assert.deepEqual(
      wrapper.state(),
      { defaultValue: '456-789', value: '' })
  })

  const sendChange = (wrapper, value) => {
    const event = { target: { value }, preventDefault: x=>x }
    wrapper.simulate('change', event)
  }

  it('basic', () => {
    let result
    const onChange = evt => result = evt.target.value

    const wrapper = mount(
      <ReactMask
        mask={['___-___']}
        defaultValue={456789}
        onChange={onChange}
      />)

    assert.deepEqual(
      wrapper.state(),
      { defaultValue: '456-789', value: '' })

    sendChange(wrapper, '753951')

    assert.equal(
      result,
      '753951')

    assert.deepEqual(
      wrapper.state(),
      { defaultValue: '456-789', value: '753-951' })

    sendChange(wrapper, '852-654xx')

    assert.equal(
      result,
      '852654')

    assert.deepEqual(
      wrapper.state(),
      { defaultValue: '456-789', value: '852-654' })
  })

  it('advance', () => {
    let result
    const onChange = evt => result = evt.target.value

    const wrapper = mount(
      <ReactMask
        mask={['___-___', '___-xy____*_']}
        defaultValue={'852852'}
        onChange={onChange}
      />)

    assert.deepEqual(
      wrapper.state(),
      { defaultValue: '852-852', value: '' })

    sendChange(wrapper, '753951753951')

    assert.deepEqual(
      result,
      '75395175')

    assert.deepEqual(
      wrapper.state(),
      { defaultValue: '852-852', value: '753-xy9517*5' })

    sendChange(wrapper, '852-6547')

    assert.equal(
      result,
      '8526547')

    assert.deepEqual(
      wrapper.state(),
      { defaultValue: '852-852', value: '852-xy6547' })
  })
})
