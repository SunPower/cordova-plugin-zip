import FirmwareReleaseNotes from 'pages/FirmwareReleaseNotes'
import FirmwaresMenu from 'pages/Firmwares/MenuComponent'
import GiveFeedback from 'pages/GiveFeedback'
import Settings from 'pages/Settings'
import VersionInformation from 'pages/VersionInformation'
import paths from 'routes/paths'

export default [
  {
    icon: 'sp-map',
    text: 'CHANGE_ADDRESS',
    to: paths.PROTECTED.ROOT.path,
    display: true
  },
  {
    icon: 'sp-update',
    text: 'MANAGE_FIRMWARES',
    component: FirmwaresMenu,
    display: true
  },
  {
    icon: 'sp-info',
    text: 'VERSION_INFORMATION',
    component: VersionInformation,
    display: true
  },
  {
    icon: 'sp-feedback',
    text: 'GIVE_FEEDBACK',
    component: GiveFeedback,
    display: true
  },
  {
    text: 'FIRMWARE_RELEASE_NOTES',
    component: FirmwareReleaseNotes,
    display: false
  },
  {
    icon: 'sp-gear',
    text: 'SETTINGS',
    component: Settings,
    display: true
  }
]
