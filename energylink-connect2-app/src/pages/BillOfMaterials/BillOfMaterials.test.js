import React from 'react'
import BillOfMaterials from '.'
import * as i18n from '../../shared/i18n'
import * as reactRedux from 'react-redux'
import * as utils from 'shared/utils'
describe('BillOfMaterials component', () => {
  let dispatchMock
  let isIosMock
  beforeEach(() => {
    dispatchMock = jest.fn()
    isIosMock = jest.fn().mockReturnValue(true)
    jest.spyOn(utils, 'isIos').mockImplementation(() => isIosMock)
    jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => dispatchMock)
    jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => dispatchMock)
    jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => ({
      MODULES: 0,
      lat_deg: 20.6881818,
      long_deg: -103.4218501
    }))
    jest
      .spyOn(i18n, 'useI18n')
      .mockImplementation(path => (key, ...params) =>
        `${key.toUpperCase()} ${params.join('_')}`.trim()
      )
  })
  test('render correctly', () => {
    const { component } = mountWithProvider(<BillOfMaterials />)({
      user: {
        data: {
          phone: '555-555-5555',
          name: 'Solar Cindy'
        }
      },
      site: {
        address1: '123 St Ave',
        latitude: 20.6881818,
        longitude: -103.4218501
      }
    })
    expect(component).toMatchSnapshot()
  })
})
