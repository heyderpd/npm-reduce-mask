import React from 'react'

import { hasSelection } from './utils'
import PureInputMask from './mask'
import InputNumber from './simple'

const InputMask = (props) => {
  return hasSelection()
    ? (<PureInputMask  {...props} />)
    : (<InputNumber  {...props} />)
}

export default InputMask