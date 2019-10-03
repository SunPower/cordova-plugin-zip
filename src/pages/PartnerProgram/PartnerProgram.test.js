import React from 'react'
import { shallow } from 'enzyme'
import PartnerProgram from '.'
import * as i18n from '../../shared/i18n'

describe('PartnerProgram page', () => {
  beforeEach(() => {
    jest
      .spyOn(i18n, 'useI18n')
      .mockImplementation(path => (key, ...params) =>
        `${key.toUpperCase()} ${params.join('_')}`.trim()
      )
  })

  it('renders without crashing', () => {
    const component = shallow(<PartnerProgram />)
    expect(component).toMatchSnapshot()
  })
})
