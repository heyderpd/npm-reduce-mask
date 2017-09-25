import React from 'react'
import applyMask from './mask'

const PureInputMask = ({ maxLength, ...props }) => (<input {...props} type='tel' onChange={applyMask(props)} />)

export default PureInputMask
