import { configure, mount as _mount, shallow as _shallow } from 'enzyme'
import { jsdom } from 'jsdom'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

export const createDom = () => {
  const doc = jsdom('<!doctype html><html><body><div id="root"></div></body></html>')
  global.document = doc
  global.window = doc.defaultView
}

export const destroyDom = () => {
  delete global.document
  delete global.window
}

export const mount = _mount
export const shallow = _shallow
