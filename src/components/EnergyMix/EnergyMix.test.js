import React from 'react'
import * as reactRedux from 'react-redux'
import EnergyMix from '.'
import { shallow } from 'enzyme'
import * as i18n from '../../shared/i18n'
import moment from 'moment'

describe('EnergyMix component', () => {
  beforeEach(() => {
    let dispatchMock = jest.fn()
    jest
      .spyOn(i18n, 'useI18n')
      .mockImplementation(path => (key, ...params) =>
        `${key.toUpperCase()} ${params.join('_')}`.trim()
      )
    jest
      .spyOn(i18n, 'useI18n')
      .mockImplementation(path => (key, ...params) =>
        `${key.toUpperCase()} ${params.join('_')}`.trim()
      )
    jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => dispatchMock)
  })
  it('renders propertly', () => {
    const component = shallow(
      <EnergyMix
        date={moment('2019-10-09T11:00:00.000Z')}
        solar={2.3}
        storage={1}
        grid={1}
        homeUsage={4.3}
      />
    )
    expect(component).toMatchSnapshot()
  })
})
