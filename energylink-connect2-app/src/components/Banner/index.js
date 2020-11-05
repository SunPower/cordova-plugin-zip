import React from 'react'
import './banner.scss'
import { either, isDebug } from 'shared/utils'

const Banner = ({ flavor = '' }) =>
  either(
    isDebug,
    <div className="development-banner">{flavor.split('-').pop()}</div>
  )

export default Banner
