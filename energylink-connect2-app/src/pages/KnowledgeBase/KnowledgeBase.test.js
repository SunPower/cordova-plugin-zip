import React from 'react'

import KnowledgeBase from '.'

import * as i18n from 'shared/i18n'

const mock = jest.fn()
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    history: {
      push: mock
    }
  })
}))

describe('KnowledgeBase component', () => {
  const providerWithTutorials = {
    knowledgeBase: {
      tutorialList: [
        {
          title: 'Downloading firmware',
          video: 'https://vimeo.com/586055338'
        },
        {
          title: 'Connect + Update firmware',
          video: 'https://vimeo.com/586055438'
        },
        {
          title: 'Discover + claim',
          video: 'https://vimeo.com/586055515'
        },
        {
          title: 'Configure system',
          video: 'https://vimeo.com/586055576'
        }
      ],
      currentTutorial: {},
      status: 'fetched',
      lastSuccessfulUpdateOn: 0
    }
  }

  const providerWithoutTutorials = {
    knowledgeBase: {
      tutorialList: [],
      currentTutorial: {},
      status: 'neverFetched',
      lastSuccessfulUpdateOn: 0
    }
  }

  beforeEach(() => {
    jest
      .spyOn(i18n, 'useI18n')
      .mockImplementation(path => (key, ...params) =>
        `${key.toUpperCase()} ${params.join('_')}`.trim()
      )
  })

  test('renders correctly with tutorials', () => {
    const { component } = mountWithProvider(<KnowledgeBase />)(
      providerWithTutorials
    )
    expect(component).toMatchSnapshot()
  })

  test('renders correctly without tutorials', () => {
    const { component } = mountWithProvider(<KnowledgeBase />)(
      providerWithoutTutorials
    )
    expect(component).toMatchSnapshot()
  })
})
