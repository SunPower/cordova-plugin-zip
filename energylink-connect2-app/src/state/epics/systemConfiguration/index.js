import { fetchBatteriesEpic } from 'state/epics/systemConfiguration/fetchBatteriesEpic'
import { fetchGridBehaviorEpic } from './fetchGridBehavior'
import { fetchNetworkAPsEpic } from './fetchNetworkAPsEpic'
import { connectNetworkAPEpic } from './connectNetworkAPEpic'
import { submitConfigurationEpic } from './submitConfigEpic'
import { fetchInterfacesEpic } from './fetchInterfacesEpic'
import { fetchRSEEpic } from './fetchRSEEpic'
import { setRSEEpic, pollRSEEpic } from './setRSEEpic'
import { submitConfigObjectEpic } from './submitConfigObjectEpic'

export default [
  fetchGridBehaviorEpic,
  fetchNetworkAPsEpic,
  connectNetworkAPEpic,
  submitConfigurationEpic,
  fetchBatteriesEpic,
  fetchInterfacesEpic,
  fetchRSEEpic,
  setRSEEpic,
  pollRSEEpic,
  submitConfigObjectEpic
]
