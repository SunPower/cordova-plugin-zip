import React, { useEffect } from 'react'
import clsx from 'clsx'
import {
  anyPass,
  compose,
  cond,
  isEmpty,
  isNil,
  length,
  lt,
  filter,
  map,
  path,
  propEq
} from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { useI18n } from 'shared/i18n'
import { GET_INTERFACES_INIT } from 'state/actions/systemConfiguration'

import './InterfacesWidget.scss'

function InterfacesWidget() {
  const dispatch = useDispatch()
  const t = useI18n()

  const { data, isFetching, error } = useSelector(
    path(['systemConfiguration', 'interfaces'])
  )

  const { serialNumber } = useSelector(path(['pvs']))

  useEffect(() => {
    dispatch(GET_INTERFACES_INIT())
  }, [dispatch])

  return (
    <section className="iw is-flex collapsible pl-0">
      <div className="pvs">
        <span className="sp-pvs has-text-white" />
      </div>
      <div className="ifs ml-5">
        <div className="mb-5 has-text-white is-uppercase">{serialNumber}</div>
        {isFetching ? t('LOADING') : showInterfaces(data, error, t)}
      </div>
    </section>
  )
}

const isntPLC = iface => iface.interface !== 'plc'
const getInterfaces = t => compose(map(getInterface(t)), filter(isntPLC))

const showInterfaces = (data, error, t) =>
  hasData(data) && isNil(error) ? getInterfaces(t)(data) : t('NO_DATA')

const hasData = compose(lt(0), length)
const ICON = {
  sta0: 'sp-wifi',
  cell: 'sp-cell',
  wan: 'sp-eth'
}

const getInterface = t => ifc => (
  <Interface
    key={ifc.interface}
    icon={ICON[ifc.interface]}
    name={getInterfaceName(t)(ifc)}
  />
)

function Interface({ icon, name }) {
  const classes = clsx(icon, 'mr-10 has-text-white')
  return (
    <p className="if">
      <span className={classes} />
      {name}
    </p>
  )
}

// String -> Object -> String
const getInterfaceName = t =>
  cond([
    [propEq('interface', 'cell'), withDefault('provider', t)],
    [propEq('interface', 'sta0'), withDefault('ssid', t)],
    [propEq('interface', 'wan'), withDefault('ipaddr', t)]
  ])

// String -> Object -> String
const withDefault = (prop, t) => obj => {
  const iface = obj['interface'] === 'sta0' ? 'wifi' : obj['interface']
  return hasEmptyValue(obj[prop])
    ? `${t('NO_CONNECTION')} (${iface})`
    : `${obj[prop]} (${iface})`
}

const hasEmptyValue = anyPass([isNil, isEmpty])

export default InterfacesWidget
