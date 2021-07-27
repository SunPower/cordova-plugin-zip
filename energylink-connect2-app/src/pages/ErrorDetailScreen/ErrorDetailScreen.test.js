import React from 'react'
import ErrorDetailScreen from './ErrorDetail'
import { eqsSteps } from 'state/reducers/storage'
import * as i18n from 'shared/i18n'

describe('ErrorDetailScreen page', () => {
  const provider = {
    storage: {
      currentStep: eqsSteps.PREDISCOVERY
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
    const component = mountWithProvider(<ErrorDetailScreen />)(provider)
    expect(component).toMatchSnapshot()
  })
})
