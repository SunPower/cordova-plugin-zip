import { shallow } from 'enzyme'
import React from 'react'
import * as reactRedux from 'react-redux'

import GiveFeedback from '.'

import * as i18n from 'shared/i18n'

describe('GiveFeedback component', () => {
  let dispatchMock
  beforeEach(() => {
    dispatchMock = jest.fn()
    jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => dispatchMock)
    jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => dispatchMock)
    jest
      .spyOn(i18n, 'useI18n')
      .mockImplementation(path => (key, ...params) =>
        `${key.toUpperCase()} ${params.join('_')}`.trim()
      )
  })

  test('render correctly', () => {
    const component = shallow(<GiveFeedback />)
    expect(component).toMatchSnapshot()
  })
})
