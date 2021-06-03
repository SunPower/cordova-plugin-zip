import React from 'react'
import { storiesOf } from '@storybook/react'
import { configureStore } from 'state/store'
import { Provider } from 'react-redux'

import PrecommissioningConfigs from '.'
import { rmaModes } from 'state/reducers/rma'
import { fwupStatus } from '../../state/reducers/firmware-update'
import { clone } from 'ramda'

const standardScenario = {
  pvs: {
    model: 'PVS6'
  },
  global: {
    canAccessScandit: true
  },
  rma: {
    rmaMode: rmaModes.NONE
  },
  inventory: {
    bom: [
      { item: 'AC_MODULES', value: '0' },
      { item: 'DC_MODULES', value: '0' },
      { item: 'STRING_INVERTERS', value: '0' },
      { item: 'EXTERNAL_METERS', value: '0' },
      { item: 'ESS', value: '0' }
    ]
  },
  systemConfiguration: {
    meter: {
      consumptionCT: 1,
      productionCT: 1,
      ratedCurrent: 100
    },
    gridBehavior: {
      selectedOptions: {
        gridVoltage: 240,
        profile: {
          selfsupply: false,
          zipcodes: [
            {
              max: 96162,
              min: 90001
            }
          ],
          filename: '816bf330.meta',
          id: '816bf3302d337a42680b996227ddbc46abf9cd05',
          name: 'IEEE-1547a-2014 + 2020 CA Rule21'
        },
        lazyGridProfile: 0,
        exportLimit: -1
      },
      profiles: [],
      gridVoltage: {
        grid_voltage: 240,
        measured: 0,
        selected: 0
      }
    }
  },
  devices: {
    found: []
  },
  site: {
    site: {
      siteKey: 'ABCDE'
    }
  }
}

const fetchingGridProfiles = {
  pvs: {
    model: 'PVS6'
  },
  global: {
    canAccessScandit: true
  },
  rma: {
    rmaMode: rmaModes.NONE
  },
  inventory: {
    bom: [
      { item: 'AC_MODULES', value: '0' },
      { item: 'DC_MODULES', value: '0' },
      { item: 'STRING_INVERTERS', value: '0' },
      { item: 'EXTERNAL_METERS', value: '0' },
      { item: 'ESS', value: '0' }
    ]
  },
  systemConfiguration: {
    meter: {
      consumptionCT: 1,
      productionCT: 1,
      ratedCurrent: 100
    },
    gridBehavior: {
      fetchingGridBehavior: true,
      selectedOptions: {
        gridVoltage: 240,
        profile: {},
        lazyGridProfile: 0,
        exportLimit: -1
      },
      profiles: [],
      gridVoltage: {
        grid_voltage: 240,
        measured: 0,
        selected: 0
      }
    }
  },
  devices: {
    found: []
  },
  site: {
    site: {
      siteKey: 'ABCDE'
    }
  }
}

const errorWhileUploadingGridProfiles = {
  pvs: {
    model: 'PVS6'
  },
  global: {
    canAccessScandit: true
  },
  rma: {
    rmaMode: rmaModes.NONE
  },
  inventory: {
    bom: [
      { item: 'AC_MODULES', value: '0' },
      { item: 'DC_MODULES', value: '0' },
      { item: 'STRING_INVERTERS', value: '0' },
      { item: 'EXTERNAL_METERS', value: '0' },
      { item: 'ESS', value: '0' }
    ]
  },
  systemConfiguration: {
    meter: {
      consumptionCT: 1,
      productionCT: 1,
      ratedCurrent: 100
    },
    gridBehavior: {
      fetchingGridBehavior: false,
      selectedOptions: {
        gridVoltage: 240,
        profile: {},
        lazyGridProfile: 0,
        exportLimit: -1
      },
      profiles: [],
      gridVoltage: {
        grid_voltage: 240,
        measured: 0,
        selected: 0
      }
    },
    firmwareUpdate: {
      status: fwupStatus.ERROR_GRID_PROFILE
    }
  },
  devices: {
    found: []
  },
  site: {
    site: {
      siteKey: 'ABCDE'
    }
  }
}

const errorWhileFetchingGridProfiles = {
  pvs: {
    model: 'PVS6'
  },
  global: {
    canAccessScandit: true
  },
  rma: {
    rmaMode: rmaModes.NONE
  },
  inventory: {
    bom: [
      { item: 'AC_MODULES', value: '0' },
      { item: 'DC_MODULES', value: '0' },
      { item: 'STRING_INVERTERS', value: '0' },
      { item: 'EXTERNAL_METERS', value: '0' },
      { item: 'ESS', value: '0' }
    ]
  },
  systemConfiguration: {
    meter: {
      consumptionCT: 1,
      productionCT: 1,
      ratedCurrent: 100
    },
    gridBehavior: {
      fetchingGridBehavior: false,
      err: 'Error While Fetching Grid Profiles',
      selectedOptions: {
        gridVoltage: 240,
        profile: {},
        lazyGridProfile: 0,
        exportLimit: -1
      },
      profiles: [],
      gridVoltage: {
        grid_voltage: 240,
        measured: 0,
        selected: 0
      }
    }
  },
  devices: {
    found: []
  },
  site: {
    site: {
      siteKey: 'ABCDE'
    }
  }
}

storiesOf('Precommissioning Configs', module)
  .add('Config is valid', () => {
    const { store } = configureStore(standardScenario)

    return (
      <div className="full-min-height pt-20 pb-20">
        <Provider store={store}>
          <PrecommissioningConfigs />
        </Provider>
      </div>
    )
  })
  .add('Fetching Grid Profiles', () => {
    const { store } = configureStore(fetchingGridProfiles)

    return (
      <div className="full-min-height pt-20 pb-20">
        <Provider store={store}>
          <PrecommissioningConfigs />
        </Provider>
      </div>
    )
  })
  .add('Error while uploading Grid Profiles', () => {
    const { store } = configureStore(errorWhileUploadingGridProfiles)

    return (
      <div className="full-min-height pt-20 pb-20">
        <Provider store={store}>
          <PrecommissioningConfigs />
        </Provider>
      </div>
    )
  })
  .add('Error while fetching Grid Profiles', () => {
    const { store } = configureStore(errorWhileFetchingGridProfiles)

    return (
      <div className="full-min-height pt-20 pb-20">
        <Provider store={store}>
          <PrecommissioningConfigs />
        </Provider>
      </div>
    )
  })

let PVS5standardScenario = clone(standardScenario)
let PVS5fetchingGridProfiles = clone(fetchingGridProfiles)
let PVS5errorWhileUploadingGridProfiles = clone(errorWhileUploadingGridProfiles)
let PVS5errorWhileFetchingGridProfiles = clone(errorWhileFetchingGridProfiles)
PVS5standardScenario.pvs.model = 'PVS5'
PVS5fetchingGridProfiles.pvs.model = 'PVS5'
PVS5errorWhileUploadingGridProfiles.pvs.model = 'PVS5'
PVS5errorWhileFetchingGridProfiles.pvs.model = 'PVS5'

storiesOf('Precommissioning Configs', module)
  .add('PVS5 Config is valid', () => {
    const { store } = configureStore(PVS5standardScenario)

    return (
      <div className="full-min-height pt-20 pb-20">
        <Provider store={store}>
          <PrecommissioningConfigs />
        </Provider>
      </div>
    )
  })
  .add('PVS5 Fetching Grid Profiles', () => {
    const { store } = configureStore(PVS5fetchingGridProfiles)

    return (
      <div className="full-min-height pt-20 pb-20">
        <Provider store={store}>
          <PrecommissioningConfigs />
        </Provider>
      </div>
    )
  })
  .add('PVS5 Error while uploading Grid Profiles', () => {
    const { store } = configureStore(PVS5errorWhileUploadingGridProfiles)

    return (
      <div className="full-min-height pt-20 pb-20">
        <Provider store={store}>
          <PrecommissioningConfigs />
        </Provider>
      </div>
    )
  })
  .add('PVS5 Error while fetching Grid Profiles', () => {
    const { store } = configureStore(PVS5errorWhileFetchingGridProfiles)

    return (
      <div className="full-min-height pt-20 pb-20">
        <Provider store={store}>
          <PrecommissioningConfigs />
        </Provider>
      </div>
    )
  })
