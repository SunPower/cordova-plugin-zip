import React from 'react'
import EQSUpdateErrors from '.'
import * as i18n from 'shared/i18n'

describe('EQSUpdateErrors page', () => {
  const provider = {
    storage: {
      deviceUpdate: {
        errors: [
          {
            error_name: 'UNDER_VOLT_ALARM',
            last_occurrence: '2020-02-15 01:23:45',
            error_code: '4.5.1',
            device_sn: '048572340857NND',
            error_message: 'Critical: low battery SOH.',
            value: {
              value: 0,
              unit: 'string'
            }
          }
        ]
      }
    }
  }

  beforeEach(() => {
    jest
      .spyOn(i18n, 'useI18n')
      .mockImplementation(path => (key, ...params) =>
        `${key} ${params.join('_')}`.trim()
      )
  })

  test('render correctly', () => {
    const component = mountWithProvider(<EQSUpdateErrors />)(provider)
    expect(component).toMatchSnapshot()
  })
})
