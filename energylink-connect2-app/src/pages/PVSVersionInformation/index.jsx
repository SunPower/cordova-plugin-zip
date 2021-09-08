import moment from 'moment'
import React from 'react'

import appVersion from '../../macros/appVersion.macro'

import * as releaseNotes from './releaseNotes.json'

import Collapsible from 'components/Collapsible'
import { useI18n } from 'shared/i18n'
import { createMarkup } from 'shared/utils'

const { versions = [] } = releaseNotes.default

function VersionInformation({ currentVersion = appVersion() }) {
  const t = useI18n()
  return (
    <section className="version-info is-flex tile is-vertical has-text-weight-bold pt-0 pr-10 pl-10 full-height">
      <h1 className="has-text-centered is-uppercase pb-20">
        {t('PRO_CONNECT_VERSION_INFORMATION')}
      </h1>

      <div className="body has-text-white">
        {versions.map((version, index) => {
          const versionNumber = version.versionNumber
          const title = `${t('VERSION')} ${versionNumber}`
          const isFirstVersionInList = index === 0
          const { releaseDate, bodyMarkdown } = version
          return (
            <div className="version" key={index}>
              {//show the previous release notes title
              //above the second set of release notes.
              index === 1 && (
                <div className="previous-release-notes">
                  {t('PREVIOUS_RELEASE_NOTES')}
                </div>
              )}
              <Collapsible title={title} expanded={isFirstVersionInList}>
                <div className="releaseDate">
                  {t('RELEASE_DATE')} {moment(releaseDate).format('MM/DD/YYYY')}
                </div>
                <div
                  className="content"
                  dangerouslySetInnerHTML={createMarkup(bodyMarkdown)}
                />
              </Collapsible>
            </div>
          )
        })}
      </div>

      <div className="currentVersion">
        {t('CURRENT_VERSION')} {currentVersion}
      </div>
    </section>
  )
}

export default VersionInformation
