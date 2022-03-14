import { storiesOf } from '@storybook/react'
import { clone } from 'ramda'
import React from 'react'
import { Provider } from 'react-redux'

import RMADevices from '.'

import { configureStore } from 'state/store'

const hasStorage = {
  devices: {
    found: [
      {
        DETAIL: 'detail',
        STATE: 'working',
        STATEDESCR: 'Working',
        SERIAL: 'ZT201785000549A0744',
        MODEL: 'PV Supervisor PVS6',
        HWVER: '6.02',
        SWVER: '2020.10, Build 8615',
        DEVICE_TYPE: 'PVS',
        DATATIME: '2020,11,04,19,25,00',
        dl_err_count: '0',
        dl_comm_err: '90',
        dl_skipped_scans: '0',
        dl_scan_time: '55',
        dl_untransmitted: '2665',
        dl_uptime: '16080',
        dl_cpu_load: '0.56',
        dl_mem_used: '67608',
        dl_flash_avail: '104231',
        panid: 496069316,
        CURTIME: '2020,11,04,19,29,12'
      },
      {
        ISDETAIL: true,
        SERIAL: 'SW2040850005505.00003',
        TYPE: 'HUB+',
        STATE: 'error',
        STATEDESCR: 'Error',
        MODEL: 'Model-MIDC-rev5',
        DESCR: 'HUB+ SW2040850005505.00003',
        DEVICE_TYPE: 'HUB+',
        SWVER: '0.7.0',
        PORT: 'P0, Modbus, Slave 220',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,12'
      },
      {
        ISDETAIL: true,
        SERIAL: 'Serial-MIO-Saturn',
        TYPE: 'EQUINOX-MIO',
        STATE: 'working',
        STATEDESCR: 'Working',
        MODEL: 'Model-MIO-Saturn',
        DESCR: 'ESS Hub Serial-MIO-Saturn',
        DEVICE_TYPE: 'ESS Hub',
        SWVER: '0.6.4',
        PORT: 'P0, Modbus, Slave 221',
        DATATIME: '2020,11,04,19,28,59',
        t_degc: '39',
        humidity: '14',
        v_dcdc_spply_v: '11.375',
        v_spply_v: '11.364',
        v_gateway_v: '11.364',
        fan_actv_fl: '0',
        fw_error: '0',
        event_history: '70',
        origin: 'data_logger',
        OPERATION: 'noop',
        PARENT: '00001B3DDACD_178_15',
        CURTIME: '2020,11,04,19,29,12'
      },
      {
        ISDETAIL: true,
        SERIAL: 'F21917000870',
        TYPE: 'GATEWAY',
        STATE: 'error',
        STATEDESCR: 'Error',
        MODEL: 'SchneiderElectric-ConextGateway',
        DESCR: 'Gateway F21917000870',
        DEVICE_TYPE: 'Gateway',
        SWVER: 'V1',
        PORT: 'P0, SunSpec, Slave 1',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,13'
      },
      {
        ISDETAIL: true,
        SERIAL: '00001B3DDACD',
        TYPE: 'SCHNEIDER-XWPRO',
        STATE: 'error',
        STATEDESCR: 'Error',
        MODEL: 'SchneiderElectric-XW6848-21',
        DESCR: 'Storage Inverter 00001B3DDACD',
        DEVICE_TYPE: 'Storage Inverter',
        SWVER: 'V1',
        PORT: 'P0, SunSpec, Slave 10',
        origin: 'data_logger',
        OPERATION: 'noop',
        PARENT: '00001B3DDACD_178_15',
        CURTIME: '2020,11,04,19,29,13'
      },
      {
        ISDETAIL: true,
        SERIAL: 'F2191700087033685504',
        TYPE: 'EQUINOX-BMS',
        STATE: 'error',
        STATEDESCR: 'Error',
        MODEL: 'SchneiderElectric-SP1',
        DESCR: 'ESS BMS F2191700087033685504',
        DEVICE_TYPE: 'ESS BMS',
        SWVER: '1.2',
        PORT: 'P0, SunSpec, Slave 231',
        origin: 'data_logger',
        OPERATION: 'noop',
        PARENT: '00001B3DDACD_178_15',
        CURTIME: '2020,11,04,19,29,13'
      },
      {
        ISDETAIL: true,
        SERIAL: 'PVS6M20170744p',
        TYPE: 'PVS5-METER-P',
        STATE: 'working',
        STATEDESCR: 'Working',
        MODEL: 'PVS6M0400p',
        DESCR: 'Power Meter PVS6M20170744p',
        DEVICE_TYPE: 'Power Meter',
        SWVER: '3000',
        PORT: '',
        DATATIME: '2020,11,04,19,29,13',
        ct_scl_fctr: '50',
        net_ltea_3phsum_kwh: '1004.4',
        p_3phsum_kw: '0',
        q_3phsum_kvar: '0',
        s_3phsum_kva: '0',
        tot_pf_rto: '1',
        freq_hz: '0',
        CAL0: '50',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,14'
      },
      {
        ISDETAIL: true,
        SERIAL: 'PVS6M20170744c',
        TYPE: 'PVS5-METER-C',
        STATE: 'working',
        STATEDESCR: 'Working',
        MODEL: 'PVS6M0400c',
        DESCR: 'Power Meter PVS6M20170744c',
        DEVICE_TYPE: 'Power Meter',
        SWVER: '3000',
        PORT: '',
        DATATIME: '2020,11,04,19,29,13',
        ct_scl_fctr: '100',
        net_ltea_3phsum_kwh: '-879.94',
        p_3phsum_kw: '0',
        q_3phsum_kvar: '0',
        s_3phsum_kva: '0',
        tot_pf_rto: '0',
        freq_hz: '0',
        i1_a: '0.0682',
        i2_a: '0.069',
        v1n_v: '0',
        v2n_v: '0',
        v12_v: '0',
        p1_kw: '0',
        p2_kw: '0',
        neg_ltea_3phsum_kwh: '954.97',
        pos_ltea_3phsum_kwh: '74.99',
        CAL0: '100',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,14'
      },
      {
        ISDETAIL: true,
        SERIAL: '178',
        TYPE: 'BATTERY',
        STATE: 'error',
        STATEDESCR: 'Error',
        MODEL: 'PA -Komodo 1.1',
        DESCR: 'Battery 178',
        DEVICE_TYPE: 'Battery',
        SWVER: '1.2',
        PORT: 'P0, None, Slave 0',
        origin: 'data_logger',
        OPERATION: 'noop',
        PARENT: '00001B3DDACD_178_15',
        CURTIME: '2020,11,04,19,29,14'
      },
      {
        ISDETAIL: true,
        SERIAL: '15',
        TYPE: 'BATTERY',
        STATE: 'error',
        STATEDESCR: 'Error',
        MODEL: 'PA -Komodo 1.1',
        DESCR: 'Battery 15',
        DEVICE_TYPE: 'Battery',
        SWVER: '1.2',
        PORT: 'P0, None, Slave 0',
        origin: 'data_logger',
        OPERATION: 'noop',
        PARENT: '00001B3DDACD_178_15',
        CURTIME: '2020,11,04,19,29,14'
      },
      {
        ISDETAIL: true,
        SERIAL: '00001B3DDACD_178_15',
        TYPE: 'EQUINOX-ESS',
        STATE: 'error',
        STATEDESCR: 'Error',
        MODEL: 'SPWR-Equinox-model',
        DESCR: 'Energy Storage System 00001B3DDACD_178_15',
        DEVICE_TYPE: 'Energy Storage System',
        SWVER: '0',
        PORT: 'P0, Parent, Slave 0',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,15'
      },
      {
        ISDETAIL: true,
        SERIAL: 'E00121943009545',
        TYPE: 'SOLARBRIDGE',
        STATE: 'working',
        STATEDESCR: 'Working',
        MODEL: 'AC_Module_Type_E',
        DESCR: 'Inverter E00121943009545',
        DEVICE_TYPE: 'Inverter',
        SWVER: '4.18.2',
        PORT: '',
        MOD_SN: '',
        NMPLT_SKU: '',
        DATATIME: '2020,11,04,19,28,59',
        ltea_3phsum_kwh: '258.6419',
        p_3phsum_kw: '0',
        vln_3phavg_v: '0',
        i_3phsum_a: '0',
        p_mppt1_kw: '0.001',
        v_mppt1_v: '63.12',
        i_mppt1_a: '0.01',
        t_htsnk_degc: '38',
        freq_hz: '67.98',
        stat_ind: '0',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,15'
      },
      {
        ISDETAIL: true,
        SERIAL: 'E00121919007686',
        TYPE: 'SOLARBRIDGE',
        STATE: 'working',
        STATEDESCR: 'Working',
        MODEL: 'AC_Module_Type_E',
        DESCR: 'Inverter E00121919007686',
        DEVICE_TYPE: 'Inverter',
        PANEL: 'SPR-X20-327-BLK-E-AC',
        SWVER: '4.18.98',
        PORT: '',
        MOD_SN: '',
        NMPLT_SKU: '',
        DATATIME: '2020,11,04,19,28,59',
        ltea_3phsum_kwh: '403.9664',
        p_3phsum_kw: '0',
        vln_3phavg_v: '0',
        i_3phsum_a: '0',
        p_mppt1_kw: '0.0008',
        v_mppt1_v: '63.3',
        i_mppt1_a: '0.01',
        t_htsnk_degc: '38',
        freq_hz: '0',
        stat_ind: '0',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,15'
      },
      {
        ISDETAIL: true,
        SERIAL: 'E00121943002955',
        TYPE: 'SOLARBRIDGE',
        STATE: 'working',
        STATEDESCR: 'Working',
        MODEL: 'AC_Module_Type_E',
        DESCR: 'Inverter E00121943002955',
        DEVICE_TYPE: 'Inverter',
        PANEL: 'SPR-X20-327-BLK-E-AC',
        SWVER: '4.18.2',
        PORT: '',
        MOD_SN: '',
        NMPLT_SKU: '',
        DATATIME: '2020,11,04,19,29,14',
        ltea_3phsum_kwh: '266.5025',
        p_3phsum_kw: '0',
        vln_3phavg_v: '0',
        i_3phsum_a: '0',
        p_mppt1_kw: '0.0002',
        v_mppt1_v: '63.84',
        i_mppt1_a: '0',
        t_htsnk_degc: '33',
        freq_hz: '67.98',
        stat_ind: '0',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,15'
      },
      {
        ISDETAIL: true,
        SERIAL: 'E00121919021437',
        TYPE: 'SOLARBRIDGE',
        STATE: 'working',
        STATEDESCR: 'Working',
        MODEL: 'AC_Module_Type_E',
        DESCR: 'Inverter E00121919021437',
        DEVICE_TYPE: 'Inverter',
        PANEL: 'SPR-X20-327-BLK-E-AC',
        SWVER: '4.18.98',
        PORT: '',
        MOD_SN: '',
        NMPLT_SKU: '',
        DATATIME: '2020,11,04,19,29,14',
        ltea_3phsum_kwh: '370.536',
        p_3phsum_kw: '0',
        vln_3phavg_v: '0',
        i_3phsum_a: '0',
        p_mppt1_kw: '0.0006',
        v_mppt1_v: '63.08',
        i_mppt1_a: '0.01',
        t_htsnk_degc: '36',
        freq_hz: '0',
        stat_ind: '0',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,15'
      },
      {
        ISDETAIL: true,
        SERIAL: 'E00121943008883',
        TYPE: 'SOLARBRIDGE',
        STATE: 'working',
        STATEDESCR: 'Working',
        MODEL: 'AC_Module_Type_E',
        DESCR: 'Inverter E00121943008883',
        DEVICE_TYPE: 'Inverter',
        PANEL: 'SPR-X20-327-BLK-E-AC',
        SWVER: '4.18.2',
        PORT: '',
        MOD_SN: '',
        NMPLT_SKU: '',
        DATATIME: '2020,11,04,19,29,14',
        ltea_3phsum_kwh: '257.4213',
        p_3phsum_kw: '0',
        vln_3phavg_v: '0',
        i_3phsum_a: '0',
        p_mppt1_kw: '0.0003',
        v_mppt1_v: '62.94',
        i_mppt1_a: '0',
        t_htsnk_degc: '39',
        freq_hz: '67.98',
        stat_ind: '0',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,16'
      }
    ]
  },
  storage: {
    prediscovery: {
      pre_discovery_report: {
        devices: [
          {
            device_fw_ver: '10600.386',
            device_type: 'STORAGE_INVERTER',
            serial_number: '00001B3DDACD'
          },
          {
            device_fw_ver: '0',
            device_type: 'BATTERY',
            serial_number: 'F2191700087033685504'
          },
          {
            device_fw_ver: 'v1.08.415',
            device_type: 'GATEWAY',
            serial_number: 'F21917000870'
          },
          {
            device_fw_ver: '0.6.13',
            device_type: 'MIDC',
            serial_number: 'Serial-MIDC-Saturn'
          },
          {
            device_fw_ver: '0.6.3',
            device_type: 'MIO',
            serial_number: 'Serial-MIO-Saturn'
          }
        ]
      }
    }
  },
  rma: {},
  pvs: {
    model: 'PVS6'
  }
}
const noStorage = {
  devices: {
    found: [
      {
        DETAIL: 'detail',
        STATE: 'working',
        STATEDESCR: 'Working',
        SERIAL: 'ZT201785000549A0744',
        MODEL: 'PV Supervisor PVS6',
        HWVER: '6.02',
        SWVER: '2020.10, Build 8615',
        DEVICE_TYPE: 'PVS',
        DATATIME: '2020,11,04,19,25,00',
        dl_err_count: '0',
        dl_comm_err: '90',
        dl_skipped_scans: '0',
        dl_scan_time: '55',
        dl_untransmitted: '2665',
        dl_uptime: '16080',
        dl_cpu_load: '0.56',
        dl_mem_used: '67608',
        dl_flash_avail: '104231',
        panid: 496069316,
        CURTIME: '2020,11,04,19,29,12'
      },
      {
        ISDETAIL: true,
        SERIAL: 'SW2040850005505.00003',
        TYPE: 'HUB+',
        STATE: 'error',
        STATEDESCR: 'Error',
        MODEL: 'Model-MIDC-rev5',
        DESCR: 'HUB+ SW2040850005505.00003',
        DEVICE_TYPE: 'HUB+',
        SWVER: '0.7.0',
        PORT: 'P0, Modbus, Slave 220',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,12'
      },
      {
        ISDETAIL: true,
        SERIAL: 'Serial-MIO-Saturn',
        TYPE: 'EQUINOX-MIO',
        STATE: 'working',
        STATEDESCR: 'Working',
        MODEL: 'Model-MIO-Saturn',
        DESCR: 'ESS Hub Serial-MIO-Saturn',
        DEVICE_TYPE: 'ESS Hub',
        SWVER: '0.6.4',
        PORT: 'P0, Modbus, Slave 221',
        DATATIME: '2020,11,04,19,28,59',
        t_degc: '39',
        humidity: '14',
        v_dcdc_spply_v: '11.375',
        v_spply_v: '11.364',
        v_gateway_v: '11.364',
        fan_actv_fl: '0',
        fw_error: '0',
        event_history: '70',
        origin: 'data_logger',
        OPERATION: 'noop',
        PARENT: '00001B3DDACD_178_15',
        CURTIME: '2020,11,04,19,29,12'
      },
      {
        ISDETAIL: true,
        SERIAL: 'F21917000870',
        TYPE: 'GATEWAY',
        STATE: 'error',
        STATEDESCR: 'Error',
        MODEL: 'SchneiderElectric-ConextGateway',
        DESCR: 'Gateway F21917000870',
        DEVICE_TYPE: 'Gateway',
        SWVER: 'V1',
        PORT: 'P0, SunSpec, Slave 1',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,13'
      },
      {
        ISDETAIL: true,
        SERIAL: '00001B3DDACD',
        TYPE: 'SCHNEIDER-XWPRO',
        STATE: 'error',
        STATEDESCR: 'Error',
        MODEL: 'SchneiderElectric-XW6848-21',
        DESCR: 'Storage Inverter 00001B3DDACD',
        DEVICE_TYPE: 'Storage Inverter',
        SWVER: 'V1',
        PORT: 'P0, SunSpec, Slave 10',
        origin: 'data_logger',
        OPERATION: 'noop',
        PARENT: '00001B3DDACD_178_15',
        CURTIME: '2020,11,04,19,29,13'
      },
      {
        ISDETAIL: true,
        SERIAL: 'F2191700087033685504',
        TYPE: 'EQUINOX-BMS',
        STATE: 'error',
        STATEDESCR: 'Error',
        MODEL: 'SchneiderElectric-SP1',
        DESCR: 'ESS BMS F2191700087033685504',
        DEVICE_TYPE: 'ESS BMS',
        SWVER: '1.2',
        PORT: 'P0, SunSpec, Slave 231',
        origin: 'data_logger',
        OPERATION: 'noop',
        PARENT: '00001B3DDACD_178_15',
        CURTIME: '2020,11,04,19,29,13'
      },
      {
        ISDETAIL: true,
        SERIAL: 'PVS6M20170744p',
        TYPE: 'PVS5-METER-P',
        STATE: 'working',
        STATEDESCR: 'Working',
        MODEL: 'PVS6M0400p',
        DESCR: 'Power Meter PVS6M20170744p',
        DEVICE_TYPE: 'Power Meter',
        SWVER: '3000',
        PORT: '',
        DATATIME: '2020,11,04,19,29,13',
        ct_scl_fctr: '50',
        net_ltea_3phsum_kwh: '1004.4',
        p_3phsum_kw: '0',
        q_3phsum_kvar: '0',
        s_3phsum_kva: '0',
        tot_pf_rto: '1',
        freq_hz: '0',
        CAL0: '50',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,14'
      },
      {
        ISDETAIL: true,
        SERIAL: 'PVS6M20170744c',
        TYPE: 'PVS5-METER-C',
        STATE: 'working',
        STATEDESCR: 'Working',
        MODEL: 'PVS6M0400c',
        DESCR: 'Power Meter PVS6M20170744c',
        DEVICE_TYPE: 'Power Meter',
        SWVER: '3000',
        PORT: '',
        DATATIME: '2020,11,04,19,29,13',
        ct_scl_fctr: '100',
        net_ltea_3phsum_kwh: '-879.94',
        p_3phsum_kw: '0',
        q_3phsum_kvar: '0',
        s_3phsum_kva: '0',
        tot_pf_rto: '0',
        freq_hz: '0',
        i1_a: '0.0682',
        i2_a: '0.069',
        v1n_v: '0',
        v2n_v: '0',
        v12_v: '0',
        p1_kw: '0',
        p2_kw: '0',
        neg_ltea_3phsum_kwh: '954.97',
        pos_ltea_3phsum_kwh: '74.99',
        CAL0: '100',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,14'
      },
      {
        ISDETAIL: true,
        SERIAL: '178',
        TYPE: 'BATTERY',
        STATE: 'error',
        STATEDESCR: 'Error',
        MODEL: 'PA -Komodo 1.1',
        DESCR: 'Battery 178',
        DEVICE_TYPE: 'Battery',
        SWVER: '1.2',
        PORT: 'P0, None, Slave 0',
        origin: 'data_logger',
        OPERATION: 'noop',
        PARENT: '00001B3DDACD_178_15',
        CURTIME: '2020,11,04,19,29,14'
      },
      {
        ISDETAIL: true,
        SERIAL: '15',
        TYPE: 'BATTERY',
        STATE: 'error',
        STATEDESCR: 'Error',
        MODEL: 'PA -Komodo 1.1',
        DESCR: 'Battery 15',
        DEVICE_TYPE: 'Battery',
        SWVER: '1.2',
        PORT: 'P0, None, Slave 0',
        origin: 'data_logger',
        OPERATION: 'noop',
        PARENT: '00001B3DDACD_178_15',
        CURTIME: '2020,11,04,19,29,14'
      },
      {
        ISDETAIL: true,
        SERIAL: 'E00121943009545',
        TYPE: 'SOLARBRIDGE',
        STATE: 'working',
        STATEDESCR: 'Working',
        MODEL: 'AC_Module_Type_E',
        DESCR: 'Inverter E00121943009545',
        DEVICE_TYPE: 'Inverter',
        PANEL: 'SPR-X20-327-BLK-E-AC',
        SWVER: '4.18.2',
        PORT: '',
        MOD_SN: '',
        NMPLT_SKU: '',
        DATATIME: '2020,11,04,19,28,59',
        ltea_3phsum_kwh: '258.6419',
        p_3phsum_kw: '0',
        vln_3phavg_v: '0',
        i_3phsum_a: '0',
        p_mppt1_kw: '0.001',
        v_mppt1_v: '63.12',
        i_mppt1_a: '0.01',
        t_htsnk_degc: '38',
        freq_hz: '67.98',
        stat_ind: '0',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,15'
      },
      {
        ISDETAIL: true,
        SERIAL: 'E00121919007686',
        TYPE: 'SOLARBRIDGE',
        STATE: 'working',
        STATEDESCR: 'Working',
        MODEL: 'AC_Module_Type_E',
        DESCR: 'Inverter E00121919007686',
        DEVICE_TYPE: 'Inverter',
        PANEL: 'SPR-X20-327-BLK-E-AC',
        SWVER: '4.18.98',
        PORT: '',
        MOD_SN: '',
        NMPLT_SKU: '',
        DATATIME: '2020,11,04,19,28,59',
        ltea_3phsum_kwh: '403.9664',
        p_3phsum_kw: '0',
        vln_3phavg_v: '0',
        i_3phsum_a: '0',
        p_mppt1_kw: '0.0008',
        v_mppt1_v: '63.3',
        i_mppt1_a: '0.01',
        t_htsnk_degc: '38',
        freq_hz: '0',
        stat_ind: '0',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,15'
      },
      {
        ISDETAIL: true,
        SERIAL: 'E00121943002955',
        TYPE: 'SOLARBRIDGE',
        STATE: 'working',
        STATEDESCR: 'Working',
        MODEL: 'AC_Module_Type_E',
        DESCR: 'Inverter E00121943002955',
        DEVICE_TYPE: 'Inverter',
        PANEL: 'SPR-X20-327-BLK-E-AC',
        SWVER: '4.18.2',
        PORT: '',
        MOD_SN: '',
        NMPLT_SKU: '',
        DATATIME: '2020,11,04,19,29,14',
        ltea_3phsum_kwh: '266.5025',
        p_3phsum_kw: '0',
        vln_3phavg_v: '0',
        i_3phsum_a: '0',
        p_mppt1_kw: '0.0002',
        v_mppt1_v: '63.84',
        i_mppt1_a: '0',
        t_htsnk_degc: '33',
        freq_hz: '67.98',
        stat_ind: '0',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,15'
      },
      {
        ISDETAIL: true,
        SERIAL: 'E00121919021437',
        TYPE: 'SOLARBRIDGE',
        STATE: 'working',
        STATEDESCR: 'Working',
        MODEL: 'AC_Module_Type_E',
        DESCR: 'Inverter E00121919021437',
        DEVICE_TYPE: 'Inverter',
        PANEL: 'SPR-X20-327-BLK-E-AC',
        SWVER: '4.18.98',
        PORT: '',
        MOD_SN: '',
        NMPLT_SKU: '',
        DATATIME: '2020,11,04,19,29,14',
        ltea_3phsum_kwh: '370.536',
        p_3phsum_kw: '0',
        vln_3phavg_v: '0',
        i_3phsum_a: '0',
        p_mppt1_kw: '0.0006',
        v_mppt1_v: '63.08',
        i_mppt1_a: '0.01',
        t_htsnk_degc: '36',
        freq_hz: '0',
        stat_ind: '0',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,15'
      },
      {
        ISDETAIL: true,
        SERIAL: 'E00121943008883',
        TYPE: 'SOLARBRIDGE',
        STATE: 'working',
        STATEDESCR: 'Working',
        MODEL: 'AC_Module_Type_E',
        DESCR: 'Inverter E00121943008883',
        DEVICE_TYPE: 'Inverter',
        PANEL: 'SPR-X20-327-BLK-E-AC',
        SWVER: '4.18.2',
        PORT: '',
        MOD_SN: '',
        NMPLT_SKU: '',
        DATATIME: '2020,11,04,19,29,14',
        ltea_3phsum_kwh: '257.4213',
        p_3phsum_kw: '0',
        vln_3phavg_v: '0',
        i_3phsum_a: '0',
        p_mppt1_kw: '0.0003',
        v_mppt1_v: '62.94',
        i_mppt1_a: '0',
        t_htsnk_degc: '39',
        freq_hz: '67.98',
        stat_ind: '0',
        origin: 'data_logger',
        OPERATION: 'noop',
        CURTIME: '2020,11,04,19,29,16'
      }
    ]
  },
  storage: {
    prediscovery: {
      pre_discovery_report: {
        devices: [
          {
            device_fw_ver: '10600.386',
            device_type: 'STORAGE_INVERTER',
            serial_number: '00001B3DDACD'
          },
          {
            device_fw_ver: '0',
            device_type: 'BATTERY',
            serial_number: 'F2191700087033685504'
          },
          {
            device_fw_ver: 'v1.08.415',
            device_type: 'GATEWAY',
            serial_number: 'F21917000870'
          },
          {
            device_fw_ver: '0.6.13',
            device_type: 'MIDC',
            serial_number: 'Serial-MIDC-Saturn'
          },
          {
            device_fw_ver: '0.6.3',
            device_type: 'MIO',
            serial_number: 'Serial-MIO-Saturn'
          }
        ]
      }
    }
  },
  rma: {},
  pvs: {
    model: 'PVS6'
  }
}

const removingStorage = clone(hasStorage)
removingStorage.rma = {
  removingStorage: true,
  removingStorageError: false,
  storageRemoved: false
}

const removingStorageError = clone(hasStorage)
removingStorageError.rma = {
  removingStorage: false,
  removingStorageError: true,
  storageRemoved: false
}

const removingCommissionedMIs = clone(hasStorage)
removingCommissionedMIs.devices.found.forEach(
  device => (device.STATE = 'discovered')
)

storiesOf('RMA devices', module)
  .add('With Storage', () => {
    const { store } = configureStore(hasStorage)
    return (
      <div className="full-min-height pl-10 pr-10">
        <Provider store={store}>
          <RMADevices />
        </Provider>
      </div>
    )
  })
  .add('With Storage and removing', () => {
    const { store } = configureStore(removingStorage)
    return (
      <div className="full-min-height pl-10 pr-10">
        <Provider store={store}>
          <RMADevices />
        </Provider>
      </div>
    )
  })
  .add('With Storage and error removing', () => {
    const { store } = configureStore(removingStorageError)
    return (
      <div className="full-min-height pl-10 pr-10">
        <Provider store={store}>
          <RMADevices />
        </Provider>
      </div>
    )
  })
  .add('With Storage (PVS5)', () => {
    let hasStoragePVS5 = clone(hasStorage)
    hasStoragePVS5.pvs.model = 'PVS5'

    const { store } = configureStore(hasStoragePVS5)
    return (
      <div className="full-min-height pl-10 pr-10">
        <Provider store={store}>
          <RMADevices />
        </Provider>
      </div>
    )
  })
  .add('Without Storage', () => {
    const { store } = configureStore(noStorage)
    return (
      <div className="full-min-height pl-10 pr-10">
        <Provider store={store}>
          <RMADevices />
        </Provider>
      </div>
    )
  })
  .add('Without Storage (PVS5)', () => {
    let noStoragePVS5 = clone(noStorage)
    noStoragePVS5.pvs.model = 'PVS5'

    const { store } = configureStore(noStoragePVS5)
    return (
      <div className="full-min-height pl-10 pr-10">
        <Provider store={store}>
          <RMADevices />
        </Provider>
      </div>
    )
  })
  .add('Without Commissioned MIs', () => {
    const { store } = configureStore(removingCommissionedMIs)
    return (
      <div className="full-min-height pl-10 pr-10">
        <Provider store={store}>
          <RMADevices />
        </Provider>
      </div>
    )
  })
