export const swaggerDocs = {
  openapi: '3.0.0',
  info: {
    version: '2.3.0',
    title: 'DL_CGI Interface Spec'
  },
  servers: [
    {
      url: 'http://sunpowerconsole.com/cgi-bin',
      description: 'actual pvs'
    }
  ],
  paths: {
    '/swagger.json': {
      'x-swagger-pipe': 'swagger_raw'
    },
    '/dl_cgi/network/interfaceConfig/dhcp/{networkType}': {
      get: {
        tags: ['network'],
        summary: 'This tells the PVS to renew the DHCP lease',
        operationId: 'renewDHCPLease',
        parameters: [
          {
            name: 'networkType',
            in: 'path',
            description: 'enpoint of a networkType to renew the status',
            required: true,
            schema: {
              type: 'string',
              enum: ['eth', 'wifi', 'plc']
            }
          }
        ],
        responses: {
          '200': {
            description: 'Good to go',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/statusOK'
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ['network'],
        summary: 'This tells the PVS to release the DHCP lease',
        operationId: 'releaseDHCPLease',
        parameters: [
          {
            name: 'networkType',
            in: 'path',
            description: 'enpoint of a networkType to release the status',
            required: true,
            schema: {
              type: 'string',
              enum: ['eth', 'wifi', 'plc']
            }
          }
        ],
        responses: {
          '200': {
            description: 'Good to go',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/statusOK'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/network/powerProduction': {
      get: {
        tags: ['powerProduction'],
        summary: 'This gets power production status',
        operationId: 'getPowerProduction',
        responses: {
          '200': {
            description: 'Get power production status',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/powerProductionStatus'
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['powerProduction'],
        summary: 'Update Interface configuration',
        operationId: 'setPowerProduction',
        requestBody: {
          description:
            'Settings for how the user wants the Interface Configuration to look.',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/powerProductionSetting'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Good to go',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/statusOK'
                }
              }
            }
          },
          '405': {
            description: 'Invalid input'
          },
          '500': {
            description: 'Could not turn power production on or off'
          }
        }
      }
    },
    '/dl_cgi/network/checkCellPrimary': {
      post: {
        tags: ['network'],
        summary:
          'This tells the PVS to begin checking for permission to set cellular as a primary network interface',
        operationId: 'beginCheckingCellPrimary',
        requestBody: {
          description: 'The address to look up',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  address: {
                    type: 'string'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description:
              'Successfully started checking for permissions to set cellular as primary',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/statusOK'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/network/interfaceConfig/{networkType}': {
      post: {
        tags: ['network'],
        summary: 'Update Interface configuration',
        operationId: 'updateInterfaceConfig',
        parameters: [
          {
            name: 'networkType',
            in: 'path',
            description:
              'enpoint of a networkType to update the interfaceConfiguration data',
            required: true,
            schema: {
              type: 'string',
              enum: ['eth', 'wifi', 'plc']
            }
          }
        ],
        requestBody: {
          description:
            'Settings for how the user wants the Interface Configuration to look.',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/interfaceConfiguration'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Good to go',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/interfaceConfiguration'
                }
              }
            }
          },
          '405': {
            description: 'Invalid input'
          }
        }
      },
      get: {
        tags: ['network'],
        summary: 'Get the Interface configuration',
        operationId: 'getInterfaceConfig',
        parameters: [
          {
            name: 'networkType',
            in: 'path',
            description:
              'enpoint of a networkType to get the interfaceConfiguration data',
            required: true,
            schema: {
              type: 'string',
              enum: ['eth', 'wifi', 'plc']
            }
          }
        ],
        responses: {
          '200': {
            description:
              "If DHCP is true then don't pay attention to any of the other attributes",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/interfaceConfiguration'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/network/firewallSettings': {
      post: {
        tags: ['firewallSettings'],
        summary: 'Update the firewall network settings',
        operationId: 'updateFirewallSettings',
        requestBody: {
          description: 'Update the firewall Settings entered by the user',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/FirewallSettingsConfiguration'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'The firewall settings have been successFully updated',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/FirewallSettingsConfiguration'
                }
              }
            }
          },
          '500': {
            description:
              "There's been some kind of failure, check the status message",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Failure'
                }
              }
            }
          }
        }
      },
      get: {
        tags: ['firewallSettings'],
        summary: 'Get the firewall network settings',
        operationId: 'getFirewallSettings',
        responses: {
          '200': {
            description:
              'Returns all the FireWall settings array from the network',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/FirewallSettingsConfiguration'
                }
              }
            }
          },
          '500': {
            description:
              "There's been some kind of failure, check the status message",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Failure'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/network/settings': {
      post: {
        tags: ['network'],
        summary: 'Update the general network settings',
        operationId: 'updateGeneralNetworkSettings',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/generalSettings'
              }
            }
          },
          description:
            'operation to update the general settings request by the user',
          required: true
        },
        responses: {
          '200': {
            description: 'updated the general settings successfully',
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/generalSettings'
                }
              }
            }
          },
          '500': {
            description:
              "There's been some kind of failure, check the status message",
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/failure'
                }
              }
            }
          }
        }
      },
      get: {
        tags: ['network'],
        summary: 'Get the general network settings',
        operationId: 'getGeneralNetworkSettings',
        responses: {
          '200': {
            description: 'Returns the general settings object from the network',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/generalSettings'
                }
              }
            }
          },
          '500': {
            description:
              "There's been some kind of failure, check the status message",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/failure'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/network/interfaces': {
      get: {
        tags: ['network'],
        summary: 'Get list of network interfaces',
        operationId: 'getNetworkInterfaces',
        responses: {
          '200': {
            description: 'A list of network devices',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/networkInterfaces'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/network/getPingableDevices': {
      get: {
        tags: ['network'],
        summary: 'Get pingable network devices from devices.lua',
        operationId: 'getPingableDevices',
        responses: {
          '200': {
            description: 'A list of pingable devices',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/pingableDevices'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/network/ping': {
      get: {
        tags: ['network'],
        summary: 'Get the status of the ping',
        operationId: 'pingStatus',
        responses: {
          '200': {
            description: 'Information that is output by the ping process',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PingData'
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['network'],
        summary: 'Start a ping',
        operationId: 'startPing',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PingOptions'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'Ping Started',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/resultSucceed'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/network/traceroute': {
      get: {
        tags: ['network'],
        summary: 'Get the status of the traceroute',
        operationId: 'tracerouteStatus',
        responses: {
          '200': {
            description: 'Information that is output by the traceroute process',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/traceRouteObject'
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['network'],
        summary: 'Start a traceroute',
        operationId: 'startTraceroute',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/tracerouteOptions'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'Traceroute Started',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/resultSucceed'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/network/whitelist': {
      get: {
        tags: ['network'],
        summary: 'Get all whitelist entries',
        operationId: 'getWhitelist',
        responses: {
          '200': {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/whitelist'
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['network'],
        summary: 'Add a whitelist object',
        operationId: 'addWhitelist',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/whitelist'
                }
              }
            }
          },
          description: 'whitelist object that needs to be added',
          required: true
        },
        responses: {
          '405': {
            description: 'Invalid input'
          }
        }
      }
    },
    '/dl_cgi/candidates': {
      get: {
        tags: ['candidates'],
        summary:
          'Get a detailed list of candidate devices. WARNING: these have not necessarily been discovered yet',
        operationId: 'getCandidates',
        responses: {
          '200': {
            description: 'A list of candidate devices',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Candidate'
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['candidates'],
        summary:
          "Add a list of devices to the candidates. Candidates are queued to be checked for connectivity problems. The candididates will be checked in the background, one by one. You can immediately start polling the list with getCandidates() to monitor the progress. Once all candidates have been checked (and reach either state OK or one of the ERRORS) the state of the candidates won't change anymore. If you want to recheck a candidate just submit it again.",
        operationId: 'setCandidates',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                items: {
                  properties: {
                    DEVICE_TYPE: {
                      description: 'The device type of the candidate',
                      enum: ['Inverter'],
                      type: 'string'
                    },
                    SERIAL: {
                      description: 'The serial number of the candidate',
                      type: 'string'
                    }
                  },
                  type: 'object'
                },
                type: 'array'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Acknowledge the candidates have been added'
          }
        }
      }
    },
    '/dl_cgi/p2p/pair': {
      post: {
        tags: ['p2p'],
        summary: 'pair',
        operationId: 'pair',
        description: 'Pair a client with the p2p socket',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/p2pPairingInfo'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'p2p client paired',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/p2pClientPaired'
                }
              }
            }
          },
          '500': {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/dl_cgi/discovery': {
      post: {
        tags: ['discovery'],
        summary: 'start discovering devices',
        operationId: 'discover',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  NumDevices: {
                    type: 'number',
                    default: 200
                  },
                  MIType: {
                    type: 'string',
                    enum: ['ALL', 'ENPH', 'SBT']
                  },
                  Device: {
                    type: 'string',
                    enum: [
                      'allnomi',
                      'all',
                      'Metstation',
                      'allplusmime',
                      'allnoinverters',
                      'storage'
                    ]
                  },
                  Interfaces: {
                    type: 'array',
                    items: {
                      type: 'string',
                      enum: [
                        'mime',
                        'net',
                        'ttyUSB0',
                        'ttyUSB1',
                        'ttyUSB2',
                        'local'
                      ]
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          },
          '503': {
            description:
              'dl_cgi is processing previously POSTed deviceList.  A discovery should not be initiated unless a GET of /dl_cgi/devices indicates progress is 100%',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/failure'
                }
              }
            }
          }
        }
      },
      get: {
        tags: ['discovery'],
        description: 'Get discovery progress',
        operationId: 'getDiscoveryProgress',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DiscoverProgressList'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/devices/list': {
      get: {
        tags: ['devices'],
        description:
          "Get the device list. DO NOT FOLLOW THIS PATTERN WITH /LIST, someone clobbered the /devices endpoint already with something that doesn't make sense but we're not going to undo that now because clients have probably already been written to fit it",
        operationId: 'getDevices',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DeviceList'
                }
              }
            }
          },
          '503': {
            description:
              'dl_cgi is processing previously POSTed deviceList.  A correct deviceList is not available unless a GET of /dl_cgi/devices/list indicates progress is 100%',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/failure'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/devices/met/calibration': {
      post: {
        tags: ['met'],
        operationId: 'setMetCalibration',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['Device'],
                properties: {
                  Device: {
                    type: 'string',
                    description:
                      'The serial number of the met device to be calibrated'
                  },
                  at1: {
                    type: 'number',
                    description: 'Sensor tamb low (degC)'
                  },
                  at2: {
                    type: 'number',
                    description: 'Sensor tamb hi (degC)'
                  },
                  ws1: {
                    type: 'number',
                    description: 'Sensor wsp low (mps)'
                  },
                  ws2: {
                    type: 'number',
                    description: 'Sensor wsp hi (mps)'
                  },
                  ghi1: {
                    type: 'number',
                    description: 'Sensor ghi low (wpm2)'
                  },
                  ghi2: {
                    type: 'number',
                    description: 'Sensor ghi hi (wpm2)'
                  },
                  wd1: {
                    type: 'number',
                    description: 'Sensor wdir low (deg)'
                  },
                  wd2: {
                    type: 'number',
                    description: 'Sensor wdir hi (deg)'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/devices/meter/parameters': {
      post: {
        tags: ['meter'],
        operationId: 'setMeterParameters',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['Device'],
                properties: {
                  Device: {
                    type: 'string',
                    description:
                      'The serial number of the meter device to be configured'
                  },
                  ctRatedCurrent: {
                    type: 'number'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/communication/interfaces': {
      get: {
        tags: ['network'],
        operationId: 'getInterfaces',
        description: 'Get all information for all communications interfaces',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CommunicationsInterfaces'
                }
              }
            }
          },
          '503': {
            description: 'this failed to get the information',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/failure'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/communication/interface/{interface}': {
      get: {
        tags: ['network'],
        operationId: 'getInterface',
        description: 'Get all information for a specific interface',
        parameters: [
          {
            name: 'interface',
            in: 'path',
            required: true,
            description: 'The interface you want to get data about',
            schema: {
              type: 'string',
              enum: ['cell', 'plc', 'sta0', 'wan']
            }
          }
        ],
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CommunicationsInterfaces'
                }
              }
            }
          },
          '503': {
            description: 'this failed to get the information requested',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/failure'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/communication/AP/enable': {
      post: {
        tags: ['wifi'],
        operationId: 'enableAccessPoint',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/communication/AP/disable': {
      post: {
        tags: ['wifi'],
        operationId: 'disableAccessPoint',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/communication/ap': {
      get: {
        tags: ['wifi'],
        description: 'Get the available Access Points',
        operationId: 'accessPoints',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CommunicationAp'
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['wifi'],
        summary: 'connect to an AP (deprecated, will always succeed)',
        operationId: 'connectToAccessPoint',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['mode'],
                properties: {
                  mode: {
                    type: 'string',
                    enum: ['psk', 'wps-pbc', 'wps-pin']
                  },
                  ssid: {
                    type: 'string',
                    description: 'Required in PSK mode'
                  },
                  password: {
                    type: 'string',
                    description: 'Required in PSK mode'
                  },
                  pin: {
                    type: 'string',
                    description: 'Required in WPS-PIN mode'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          },
          '400': {
            description: 'error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/communication/sta': {
      get: {
        tags: ['wifi'],
        description: 'Get the available Access Points',
        operationId: 'accessPoints_v3',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CommunicationAp'
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['wifi'],
        summary: 'connect to an AP',
        operationId: 'connectToAccessPoint_v3',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['mode'],
                properties: {
                  mode: {
                    type: 'string',
                    enum: ['psk', 'wps-pbc', 'wps-pin']
                  },
                  ssid: {
                    type: 'string',
                    description: 'Required in PSK mode'
                  },
                  password: {
                    type: 'string',
                    description: 'Required in PSK mode'
                  },
                  pin: {
                    type: 'string',
                    description: 'Required in WPS-PIN mode'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          },
          '400': {
            description: 'error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/communication/sta/disconnect': {
      post: {
        tags: ['wifi'],
        operationId: 'disableWifiStation',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/communication/cellular/primary/auth': {
      get: {
        tags: ['cellular'],
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    cell_primary_auth: {
                      type: 'string',
                      example: 'false'
                    },
                    result: {
                      $ref: '#/components/schemas/resultenum'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/communication/cellular/primary': {
      get: {
        tags: ['cellular'],
        operationId: 'isCellularPrimary',
        responses: {
          '200': {
            description: 'Request processed',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    cell_primary: {
                      type: 'string',
                      enum: ['true', 'false']
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['cellular'],
        operationId: 'setCellularPrimary',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    cell_primary: {
                      type: 'string',
                      example: 'True'
                    },
                    result: {
                      $ref: '#/components/schemas/resultenum'
                    }
                  }
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ['cellular'],
        operationId: 'unsetCellularPrimary',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    cell_primary: {
                      type: 'string',
                      enum: ['true', 'false']
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/communication/cellular/purchased': {
      get: {
        tags: ['cellular'],
        operationId: 'isCellularPurchased',
        responses: {
          '200': {
            description: 'Request processed',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    cell_purchased: {
                      type: 'string',
                      enum: ['true', 'false']
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['cellular'],
        operationId: 'setCellularPurchased',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    cell_purchased: {
                      type: 'string',
                      enum: ['true', 'false']
                    },
                    result: {
                      $ref: '#/components/schemas/resultenum'
                    }
                  }
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ['cellular'],
        operationId: 'unsetCellularPurchased',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    cell_purchased: {
                      type: 'string',
                      enum: ['true', 'false']
                    },
                    result: {
                      $ref: '#/components/schemas/resultenum'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/communication/plc/pair': {
      post: {
        tags: ['plc'],
        operationId: 'pairPLC',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/devices': {
      post: {
        tags: ['devices'],
        summary: 'add or delete devices from DL',
        description:
          'Tell the PVS which devices to claim by sending it the whole list of devices',
        operationId: 'startClaim',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ClaimOperationList'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Claiming devices has started',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/result'
                }
              }
            }
          },
          '500': {
            description:
              "There's been some kind of failure, check the status message",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/failure'
                }
              }
            }
          },
          '503': {
            description:
              'dl_cgi is processing previously POSTed deviceList.  POSTing a new deviceList is not allowed unless a GET of /dl_cgi/devices indicates progress is 100%',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/failure'
                }
              }
            }
          }
        }
      },
      get: {
        tags: ['devices'],
        summary: 'get progress on CRUD',
        description: 'Check the status of the devices that are being claimed',
        operationId: 'getClaim',
        responses: {
          '200': {
            description: "We're still doing okay on this claiming thing",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/progress'
                }
              }
            }
          },
          '500': {
            description:
              "There's been some kind of failure, check the status message",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/failure'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/devices/replace': {
      post: {
        tags: ['devices'],
        summary: 'replace devices attached to the PVS',
        description:
          'Tell the PVS which devices to add or delete by sending it the whole list of devices. The process will happen in background and can be monitored using GET /devices',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ClaimOperationList'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Replacing devices has started',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/result'
                }
              }
            }
          },
          '500': {
            description:
              "There's been some kind of failure, check the status message",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/failure'
                }
              }
            }
          },
          '503': {
            description:
              'dl_cgi is processing previously POSTed deviceList.  POSTing a new deviceList is not allowed unless a GET of /dl_cgi/devices indicates progress is 100%',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/failure'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/firmware/upgrade': {
      post: {
        tags: ['firmware'],
        description: 'Start the firmware upgrade',
        operationId: 'startUpgrade',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['url'],
                properties: {
                  url: {
                    type: 'string'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ['firmware'],
        description: 'Cancel the firmware upgrade',
        operationId: 'cancelUpgrade',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          }
        }
      },
      get: {
        tags: ['firmware'],
        description: 'Get the status of the upgrade currently in progress',
        operationId: 'getUpgradeStatus',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    supervisor: {
                      $ref: '#/components/schemas/SupervisorInfo'
                    },
                    uptime: {
                      type: 'string',
                      example: '6087'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/firmware/new_version': {
      get: {
        tags: ['firmware'],
        description: 'Check if a new firmware is available',
        operationId: 'getNewFirmwareVersion',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    url: {
                      type: 'string',
                      example:
                        'https://fw-assets-pvs6-dev.dev-edp.sunpower.com/staging-prod-adama/249/fwup/fwup.lua'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/commissioning/start': {
      post: {
        tags: ['commissioning'],
        description: 'Start commissioning',
        operationId: 'startCommissioning',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/commissioning/stop': {
      post: {
        tags: ['commissioning'],
        description: 'End commissioning',
        operationId: 'stopCommissioning',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/commission/config': {
      post: {
        tags: ['commission'],
        description: 'Commission to EDP',
        operationId: 'sendConfig',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/statusOK'
                }
              }
            }
          },
          '503': {
            description: 'The request was not recognized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/failure'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/commission/decommission': {
      post: {
        tags: ['commission'],
        description: 'Decommission previous PVS from EDP',
        operationId: 'decommissionOldPVS',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  site_key: {
                    type: 'string',
                    description: 'The site key'
                  },
                  serial_number: {
                    type: 'string',
                    description: 'The serial number of the PVS'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/statusOK'
                }
              }
            }
          },
          '503': {
            description: 'The request was not recognized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/failure'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/supervisor/info': {
      get: {
        tags: ['pvs'],
        description: 'Get info about the PVS (model, version etc.)',
        operationId: 'getSupervisorInfo',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      $ref: '#/components/schemas/resultenum'
                    },
                    supervisor: {
                      $ref: '#/components/schemas/SupervisorInfo'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/supervisor/serial_number': {
      post: {
        tags: ['pvs'],
        operationId: 'setSupervisorSerialNumber',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['From', 'To'],
                properties: {
                  From: {
                    type: 'string'
                  },
                  To: {
                    type: 'string'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/meta': {
      post: {
        tags: ['meta'],
        operationId: 'setMetaData',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  metaData: {
                    type: 'object',
                    properties: {
                      site_key: {
                        type: 'string',
                        description: 'The site key of the site from EDP'
                      },
                      devices: {
                        type: 'array',
                        items: {
                          $ref:
                            '#/components/schemas/PostCommissionDeviceObject'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Good to go',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/statusOK'
                }
              }
            }
          },
          '503': {
            description: 'The request was not recognized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/failure'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/panels/layout': {
      post: {
        tags: ['panels'],
        operationId: 'setPanelsLayout',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/panelsLayout'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Good to go',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/statusOK'
                }
              }
            }
          },
          '400': {
            description: 'The edp-layout set script failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/failure'
                }
              }
            }
          },
          '500': {
            description: 'dl:::run_shellCmd failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/failure'
                }
              }
            }
          }
        }
      },
      get: {
        tags: ['panels'],
        operationId: 'getPanelsLayout',
        responses: {
          '200': {
            description:
              'The panels layout, from EDP with fallback to the one stored on the PVS',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      $ref: '#/components/schemas/panelsLayout'
                    },
                    success: {
                      type: 'boolean'
                    }
                  }
                }
              }
            }
          },
          '400': {
            description: 'The edp-layout get script failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/failure'
                }
              }
            }
          },
          '500': {
            description: 'dl:::run_shellCmd failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/failure'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/grid/voltage': {
      get: {
        tags: ['grid'],
        description: 'Get the current grid export limit',
        operationId: 'getGridVoltage',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    grid_voltage: {
                      type: 'number',
                      example: 240,
                      enum: [208, 240]
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['grid'],
        operationId: 'setGridVoltage',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['grid_voltage'],
                properties: {
                  grid_voltage: {
                    type: 'number',
                    enum: [208, 240]
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/grid/export_limit': {
      get: {
        tags: ['grid'],
        description: 'Get the current grid export limit',
        operationId: 'getGridExportLimit',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    enabled: {
                      type: 'number',
                      example: 1
                    },
                    factor: {
                      type: 'number',
                      example: 1
                    },
                    limit: {
                      type: 'number',
                      example: -1
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['grid'],
        operationId: 'setGridExportLimit',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['Limit'],
                properties: {
                  Limit: {
                    type: 'number',
                    enum: [-1, 0],
                    description: '-1 means no limit, 0 means self-supply yes'
                  },
                  Factor: {
                    type: 'string'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/grid/profiles': {
      get: {
        tags: ['grid'],
        description: 'List the available grid profiles',
        operationId: 'getGridProfiles',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    creation: {
                      type: 'number',
                      example: 1555973178
                    },
                    profiles: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/GridProfile'
                      }
                    },
                    success: {
                      type: 'boolean'
                    },
                    result: {
                      $ref: '#/components/schemas/resultenum'
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['grid'],
        operationId: 'refreshGridProfiles',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    creation: {
                      type: 'number',
                      example: 1574091578
                    },
                    profiles: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/GridProfile'
                      }
                    },
                    result: {
                      $ref: '#/components/schemas/resultenum'
                    },
                    success: {
                      type: 'boolean'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/grid/profile': {
      get: {
        tags: ['grid'],
        description: 'Get current grid profile',
        operationId: 'getGridProfile',
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    active_id: {
                      type: 'string',
                      example: 'a81641c29c2ee61f55807d9435dc4898805b2840'
                    },
                    active_name: {
                      type: 'string',
                      example: 'IEEE-1547'
                    },
                    pending_id: {
                      type: 'string',
                      example: 'a81641c29c2ee61f55807d9435dc4898805b2840'
                    },
                    pending_name: {
                      type: 'string',
                      example: 'IEEE-1547'
                    },
                    percent: {
                      type: 'number',
                      example: 100
                    },
                    supported_by: {
                      type: 'string',
                      enum: ['ALL', 'MIXED', 'NONE']
                    },
                    status: {
                      type: 'string',
                      example: 'success'
                    },
                    result: {
                      $ref: '#/components/schemas/resultenum'
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['grid'],
        operationId: 'set',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['ID', 'lazy'],
                properties: {
                  ID: {
                    type: 'string'
                  },
                  lazy: {
                    type: 'integer',
                    description: '1 == lazy, 0 == not lazy'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/grid/zero_export_meter': {
      post: {
        tags: ['grid'],
        operationId: 'setGridZeroExportMeterType',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['type'],
                properties: {
                  type: {
                    type: 'string',
                    enum: ['net', 'consumption']
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatalessResponse'
                }
              }
            }
          }
        }
      }
    },
    '/upload_firmware': {
      post: {
        tags: ['firmware'],
        operationId: 'uploadFirmware',
        summary: 'Upload a firmware image to the PVS',
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  firmware: {
                    type: 'string',
                    format: 'binary'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description:
              'Upload was processed (successful or unsuccessfully, more details in the body)',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      description:
                        'The status code. 200 is OK, all others are errors.',
                      type: 'integer'
                    },
                    body: {
                      type: 'object',
                      properties: {
                        message: {
                          description: 'The error message',
                          type: 'string'
                        },
                        url: {
                          description: 'The URL of the uploaded firmware',
                          type: 'string'
                        },
                        version: {
                          description: 'The version of the uploaded firmware',
                          type: 'string'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/upload-grid-profiles': {
      post: {
        tags: ['firmware'],
        operationId: 'uploadGridProfiles',
        summary: 'Upload grid profiles to the PVS',
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  file: {
                    type: 'string',
                    format: 'binary'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description:
              'Upload was processed (successful or unsuccessfully, more details in the body)',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      description:
                        'The status code. 200 is OK, all others are errors.',
                      type: 'integer'
                    },
                    body: {
                      type: 'object',
                      properties: {
                        message: {
                          description: 'The error message',
                          type: 'string'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/upgrade-packages': {
      post: {
        tags: ['firmware'],
        summary: 'Upgrade packages contained in the uploaded signed bundle',
        operationId: 'upgradePackages',
        requestBody: {
          content: {
            'application/octet-stream': {
              schema: {
                description: 'Signed bundle containing the packages to upgrade',
                type: 'string',
                format: 'binary'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Upload was processed successfully'
          },
          '400': {
            description: 'Bad Request'
          },
          '500': {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/dl_cgi/energy-storage-system/pre-discover': {
      get: {
        tags: ['commissioning'],
        description: 'returns list of all devices along with discovery errors.',
        operationId: 'getDeviceList',
        responses: {
          '200': {
            description: "Here's the device list",
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    last_updated: {
                      $ref: '#/components/schemas/DateDesc'
                    },
                    pre_discovery_report: {
                      $ref: '#/components/schemas/PreDiscoveryReport'
                    },
                    errors: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/CommissioningError'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/energy-storage-system/component-mapping': {
      post: {
        tags: ['commissioning'],
        description: 'Trigger component mapping',
        operationId: 'startComponentMapping',
        responses: {
          '200': {
            description: 'Successfully started component mapping',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      enum: ['Starting device pre-discovery...']
                    }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Could not find devices',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      enum: ['Could not find devices... ']
                    },
                    errors: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/CommissioningError'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      get: {
        tags: ['commissioning'],
        description: 'Get component mapping (hierarchy)',
        operationId: 'getComponentMapping',
        responses: {
          '200': {
            description: "Here's the device map or hierarchy",
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    component_mapping_status: {
                      $ref: '#/components/schemas/StepStatus'
                    },
                    component_mapping: {
                      $ref: '#/components/schemas/ComponentMapping'
                    },
                    errors: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/CommissioningError'
                      }
                    }
                  }
                }
              }
            }
          },
          '204': {
            description: 'No mapping information available'
          }
        }
      }
    },
    '/upload-ess-firmware': {
      post: {
        tags: ['commissioning'],
        summary: 'Upload EQS Components Firmware Images to the PVS',
        operationId: 'uploadExternalFirmware',
        requestBody: {
          content: {
            'application/octet-stream': {
              schema: {
                description: 'Firmware image for an ESS component',
                type: 'string',
                format: 'binary'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Upload was processed successfully'
          },
          '400': {
            description: 'Bad Request'
          },
          '500': {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/dl_cgi/energy-storage-system/firmware/update': {
      post: {
        tags: ['commissioning'],
        description: 'Triggers firmware update for all storage components.',
        operationId: 'updateFw',
        responses: {
          '200': {
            description: 'Successfully started component firmware update.'
          }
        }
      }
    },
    '/dl_cgi/energy-storage-system/firmware/status': {
      get: {
        tags: ['commissioning'],
        description: 'Get the status of the firmware update process.',
        operationId: 'getFirmwareUpdateStatus',
        responses: {
          '200': {
            description: 'Got the firmware update status',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    firmware_update_status: {
                      $ref: '#/components/schemas/StepStatus'
                    },
                    status_report: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/FirmwareUpdateStatus'
                      }
                    },
                    errors: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/CommissioningError'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/energy-storage-system/status': {
      get: {
        tags: ['commissioning'],
        description:
          'Returns status of all devices, along with parameter errors',
        operationId: 'getEssStatus',
        responses: {
          '200': {
            description: "Here's ESS Status",
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    ess_report: {
                      $ref: '#/components/schemas/EssStatusReport'
                    },
                    errors: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/CommissioningError'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/equinox-system-check/list': {
      get: {
        tags: ['commissioning'],
        description: 'Returns list of all possible equinox system checks',
        operationId: 'getSystemHealthCheckList',
        responses: {
          '200': {
            description: 'List of System Health Checks that can be run',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    check_lists: {
                      $ref: '#/components/schemas/SystemHealthCheckList'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/dl_cgi/equinox-system-check': {
      post: {
        tags: ['commissioning'],
        operationId: 'runSystemHealthCheck',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['run_type'],
                properties: {
                  run_type: {
                    type: 'string',
                    enum: ['ALL', 'PLATFORM', 'ACPV', 'STORAGE']
                  },
                  list: {
                    type: 'array',
                    items: {
                      type: 'string',
                      description: 'List of check names to be run'
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Successfully started system health-check...'
          },
          '410': {
            description: 'All requested health checks are unsupported'
          }
        }
      },
      get: {
        tags: ['commissioning'],
        operationId: 'getSystemHealthReport',
        responses: {
          '200': {
            description: "Here's the Equinox Health Report",
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    progress: {
                      type: 'number'
                    },
                    check_status: {
                      $ref: '#/components/schemas/StepStatus'
                    },
                    checks: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/SystemHealthCheckListStatus'
                      }
                    },
                    status: {
                      $ref: '#/components/schemas/EquinoxSystemStatus'
                    },
                    errors: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/CommissioningError'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      resultenum: {
        type: 'string',
        enum: ['succeed', 'error']
      },
      progress: {
        type: 'object',
        required: ['percent'],
        properties: {
          result: {
            $ref: '#/components/schemas/resultenum'
          },
          percent: {
            type: 'number'
          }
        }
      },
      result: {
        type: 'object',
        required: ['result'],
        properties: {
          result: {
            $ref: '#/components/schemas/resultenum'
          },
          success: {
            type: 'boolean'
          },
          msg: {
            type: 'string'
          }
        }
      },
      failure: {
        type: 'object',
        properties: {
          status: {
            type: 'string'
          }
        }
      },
      CommunicationsInterfaces: {
        type: 'object',
        properties: {
          result: {
            type: 'string',
            enum: ['succeed', 'fail']
          },
          networkstatus: {
            type: 'object',
            properties: {
              interfaces: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    ssid: {
                      type: 'string',
                      example: 'Laneakea'
                    },
                    status: {
                      type: 'string',
                      example: 'not registered'
                    },
                    pairing: {
                      type: 'string',
                      example: 'unpaired'
                    },
                    speed: {
                      type: 'integer',
                      example: 5
                    },
                    is_primary: {
                      type: 'boolean',
                      example: true,
                      description:
                        'this is the primary interface, only shows for cell interface'
                    },
                    link: {
                      type: 'string',
                      example: 'connected'
                    },
                    interface: {
                      type: 'string',
                      example: 'wan'
                    },
                    internet: {
                      type: 'string',
                      example: 'up'
                    },
                    ipaddr: {
                      type: 'string',
                      example: '192.168.0.125'
                    },
                    mode: {
                      type: 'string',
                      example: 'wan'
                    },
                    modem: {
                      type: 'string',
                      example: 'MODEM_OK'
                    },
                    sms: {
                      type: 'string',
                      example: 'reachable'
                    },
                    state: {
                      type: 'string',
                      example: 'up'
                    }
                  }
                }
              },
              system: {
                type: 'object',
                properties: {
                  interface: {
                    type: 'string',
                    description: 'the name of an interface',
                    example: 'wan'
                  },
                  internet: {
                    type: 'string',
                    description: 'internet status',
                    example: 'up'
                  },
                  sms: {
                    type: 'string',
                    description: 'sms status',
                    example: 'reachable'
                  }
                }
              },
              ts: {
                type: 'string',
                description: 'the system timestamp',
                example: 1575501242
              }
            }
          }
        }
      },
      DiscoverProgress: {
        type: 'object',
        required: ['TYPE', 'PROGR', 'NFOUND'],
        properties: {
          TYPE: {
            type: 'string'
          },
          PROGR: {
            type: 'integer'
          },
          NFOUND: {
            type: 'integer'
          }
        }
      },
      DiscoverProgressList: {
        type: 'object',
        required: ['progress', 'complete', 'result'],
        properties: {
          progress: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/DiscoverProgress'
            }
          },
          complete: {
            type: 'boolean'
          },
          result: {
            $ref: '#/components/schemas/resultenum'
          }
        }
      },
      ClaimOpEnum: {
        type: 'string',
        enum: ['add', 'delete', 'noop'],
        description: 'Indicates what operation should be done to a device.'
      },
      ClaimOperation: {
        description:
          'This object is a subset of DeviceDetail.  The intent is that the output from DeviceDetail can be used as DeviceOperation but only the following items are REQUIRED.  Code should only touch OPERATION.  Everything else should be considered a read-only property.',
        type: 'object',
        required: ['OPERATION', 'MODEL', 'SERIAL', 'TYPE'],
        properties: {
          OPERATION: {
            $ref: '#/components/schemas/ClaimOpEnum'
          },
          MODEL: {
            type: 'string',
            description:
              'Model type of the device to operate on.  Should be the same value as what came from DeviceDetail'
          },
          SERIAL: {
            type: 'string',
            description:
              'Serial number of the device to operate on.  Should be the same value as what came from DeviceDetail'
          },
          TYPE: {
            type: 'string',
            description:
              'Device type of the device to operate on.   Should be the same value as what came from DeviceDetail'
          }
        }
      },
      ClaimOperationList: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/ClaimOperation'
        }
      },
      DeviceDetail: {
        type: 'object',
        description: 'All the metadata describing a device',
        properties: {
          OPERATION: {
            $ref: '#/components/schemas/ClaimOpEnum'
          },
          panid: {
            type: 'number',
            description:
              "PAN ID is used to determine whether an MI is A) Un-associated (panid = 0), B) owned by 'me' (mi.panid == pvs.panid) or C) owned by someone else (mi.panid != 0 && mi.panid != pvs.panid)"
          },
          rssi: {
            type: 'number',
            description:
              'Received signal strength indicator.  Systems will tend to clump together by their Receive Signal Strength Indicator'
          },
          ISDETAIL: {
            type: 'string',
            description: 'Legacy field'
          },
          SERIAL: {
            type: 'string',
            description: 'Legacy field'
          },
          TYPE: {
            type: 'string',
            description: 'Legacy field'
          },
          STATE: {
            type: 'string',
            description: 'Legacy field'
          },
          STATEDESCR: {
            type: 'string',
            description: 'Legacy field'
          },
          MODEL: {
            type: 'string',
            description: 'Legacy field'
          },
          DESCR: {
            type: 'string',
            description: 'Legacy field'
          },
          DEVICE_TYPE: {
            type: 'string',
            description: 'Legacy field'
          },
          SWVER: {
            type: 'string',
            description: 'Legacy field'
          },
          PORT: {
            type: 'string',
            description: 'Legacy field'
          },
          MOD_SN: {
            type: 'string',
            description: 'Legacy field'
          },
          NMPLT_SKU: {
            type: 'string',
            description: 'Legacy field'
          },
          DATATIME: {
            type: 'string',
            description: 'Legacy field'
          },
          ltea_3phsum_kwh: {
            type: 'string',
            description: 'Legacy field'
          },
          p_3phsum_kw: {
            type: 'string',
            description: 'Legacy field'
          },
          vln_3phavg_v: {
            type: 'string',
            description: 'Legacy field'
          },
          i_3phsum_a: {
            type: 'string',
            description: 'Legacy field'
          },
          v_mppt1_v: {
            type: 'string',
            description: 'Legacy field'
          },
          i_mppt1_a: {
            type: 'string',
            description: 'Legacy field'
          },
          t_htsnk_degc: {
            type: 'string',
            description: 'Legacy field'
          },
          freq_hz: {
            type: 'string',
            description: 'Legacy field'
          },
          CURTIME: {
            type: 'string',
            description: 'Legacy field'
          }
        }
      },
      DeviceList: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/DeviceDetail'
        }
      },
      SupervisorInfo: {
        type: 'object',
        properties: {
          FWVER: {
            type: 'string',
            example: '1.0.0'
          },
          MODEL: {
            type: 'string',
            example: 'PVS6'
          },
          SERIAL: {
            type: 'string',
            example: 'ZT184585000549A0069'
          },
          SWVER: {
            type: 'string',
            example: '2019.11, Build 5000'
          },
          SCVER: {
            type: 'number',
            example: 16504
          },
          EASICVER: {
            type: 'number',
            example: 67072
          },
          WNVER: {
            type: 'number',
            example: 3000
          },
          BUILD: {
            type: 'number',
            example: 5000
          }
        }
      },
      PostCommissionDeviceObject: {
        type: 'object',
        properties: {
          DEVICE_TYPE: {
            type: 'string',
            description: 'Device type',
            enum: [
              'LOGGER',
              'INVERTER',
              'POWER_METER',
              'MET_STATION',
              'GROUND_CURRENT_MONITOR',
              'ESS',
              'DCM_CONTROLLER',
              'TRANSFER_SWITCH',
              'BATTERY',
              'STORAGE_INVERTER',
              'STORAGE_GATEWAY'
            ],
            example: 'STORAGE_GATEWAY'
          },
          SERIAL: {
            type: 'string',
            description: 'Serial number of device',
            example: 'ZT992019230700A0032'
          },
          OPERATION: {
            type: 'string',
            description:
              'Operations available. \n * `REMOVE` - **Removes all associated devices in hierarchy**',
            enum: ['COMM', 'BIND', 'REMOVE'],
            example: 'COMM'
          },
          SUBTYPE: {
            type: 'string',
            description: 'Subtypes available',
            enum: [
              'GROSS_CONSUMPTION_LINESIDE',
              'GROSS_PRODUCTION',
              'NET_CONSUMPTION_LOADSIDE',
              'NOT_USED',
              'STORAGE_METER',
              'UNKNOWN_TYPE'
            ],
            example: 'GROSS_CONSUMPTION_LINESIDE'
          },
          MODEL: {
            type: 'string',
            description: 'Name of the device model',
            example: 'PV Supervisor PVS6'
          }
        },
        required: ['SERIAL', 'DEVICE_TYPE', 'MODEL', 'OPERATION']
      },
      GridProfile: {
        type: 'object',
        properties: {
          default: {
            type: 'boolean'
          },
          filename: {
            type: 'string',
            example: '8c9c4170.meta'
          },
          id: {
            type: 'string',
            example: '8c9c4170457c88f6dcee7216357681d580a3b9bd'
          },
          name: {
            type: 'string',
            example: 'HECO OMH R14H (Legacy)'
          },
          selfsupply: {
            type: 'boolean'
          },
          zipcodes: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                max: {
                  type: 'number',
                  example: 96898
                },
                min: {
                  type: 'number',
                  example: 96701
                }
              }
            }
          }
        }
      },
      p2pPairingInfo: {
        type: 'object',
        properties: {
          client_name: {
            type: 'string',
            example: 'CM2'
          },
          fingerprint: {
            type: 'string',
            example: '22:66:74:4b:97:bf:9a:af:b2:70:4e:4b:79:9c:f6:2f'
          }
        }
      },
      p2pClientPaired: {
        type: 'object',
        properties: {
          status: {
            type: 'integer',
            example: 200
          },
          body: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'p2p client paired.'
              }
            }
          }
        }
      },
      inverters: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/inverter'
        }
      },
      inverter: {
        type: 'object',
        properties: {
          serialNumber: {
            type: 'string'
          }
        }
      },
      aps: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/ap'
        }
      },
      ap: {
        type: 'object',
        properties: {
          attributes: {
            type: 'string',
            example: 'wpa-psk'
          },
          bssid: {
            type: 'string',
            example: '5c:f4:ab:a7:df:18'
          },
          channel: {
            type: 'string',
            example: '6'
          },
          frequency: {
            type: 'string',
            example: '2437'
          },
          rssi: {
            type: 'string',
            example: '-13'
          },
          ssid: {
            type: 'string',
            example: 'ZyXEL'
          }
        }
      },
      CommunicationAp: {
        type: 'object',
        properties: {
          aps: {
            $ref: '#/components/schemas/aps'
          },
          result: {
            $ref: '#/components/schemas/resultenum'
          }
        }
      },
      DiscoveryInverters: {
        description: 'Inverters that were found or not found',
        type: 'object',
        properties: {
          stringInverters: {
            type: 'object',
            properties: {
              found: {
                $ref: '#/components/schemas/inverters'
              },
              missing: {
                $ref: '#/components/schemas/inverters'
              }
            }
          },
          microInverters: {
            type: 'object',
            properties: {
              found: {
                $ref: '#/components/schemas/inverters'
              },
              missing: {
                $ref: '#/components/schemas/inverters'
              }
            }
          }
        }
      },
      DatalessResponse: {
        description: 'Request processed',
        type: 'object',
        properties: {
          result: {
            $ref: '#/components/schemas/resultenum'
          },
          line: {
            type: 'number',
            description: 'The line in the source code that generated the error'
          },
          description: {
            type: 'string'
          }
        },
        required: ['result']
      },
      powerProductionSetting: {
        type: 'object',
        properties: {
          powerProduction: {
            type: 'string',
            enum: ['On', 'Off']
          }
        }
      },
      powerProductionStatus: {
        type: 'object',
        properties: {
          powerProduction: {
            type: 'string',
            enum: ['On', 'Off']
          },
          result: {
            type: 'string'
          }
        }
      },
      statusOK: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: ['ok']
          },
          info: {
            type: 'string'
          }
        },
        required: ['status']
      },
      interfaceConfiguration: {
        type: 'object',
        properties: {
          networkType: {
            type: 'string',
            enum: ['PLC', 'ETH', 'WIFI']
          },
          configurationType: {
            type: 'string',
            enum: ['DHCP', 'STATIC']
          },
          ipAddress: {
            type: 'string'
          },
          subnetMask: {
            type: 'string'
          },
          gateway: {
            type: 'string'
          },
          dnsServer: {
            type: 'string'
          }
        }
      },
      Failure: {
        type: 'object',
        properties: {
          status: {
            type: 'string'
          }
        }
      },
      FirewallSetting: {
        type: 'object',
        properties: {
          firewallSettingsId: {
            description:
              'Some unique string that can be used to reference this single firewallSetting from the firewallSettings list.',
            type: 'string'
          },
          external: {
            type: 'object',
            properties: {
              device: {
                type: 'string'
              },
              port: {
                type: 'string'
              }
            }
          },
          internal: {
            type: 'object',
            properties: {
              device: {
                type: 'string'
              },
              port: {
                type: 'string'
              }
            }
          },
          protocol: {
            type: 'string'
          },
          enable: {
            type: 'boolean'
          }
        }
      },
      FirewallSettingsConfiguration: {
        type: 'object',
        properties: {
          FirewallSettings: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/FirewallSetting'
            }
          }
        }
      },
      generalSettings: {
        type: 'object',
        properties: {
          lan2PortMode: {
            type: 'string'
          },
          lan1IpAddress: {
            type: 'string'
          },
          lan1Netmask: {
            type: 'string'
          },
          lan1dhcpRange: {
            type: 'string'
          },
          dhcpStatus: {
            type: 'string'
          }
        }
      },
      resultSucceed: {
        type: 'object',
        properties: {
          result: {
            type: 'string',
            enum: ['succeed', 'fail']
          }
        },
        required: ['result']
      },
      PingData: {
        type: 'object',
        properties: {
          status: {
            description:
              'how we decide to keep polling or not. If pending, keep polling, if success, stop polling. if fail, we failed',
            type: 'string',
            enum: ['pending', 'success', 'fail']
          },
          source: {
            description: 'the output of the ping call',
            type: 'string'
          }
        },
        required: ['status']
      },
      networkInterfaces: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/networkInterface'
        }
      },
      networkInterface: {
        type: 'object',
        properties: {
          interface: {
            description: 'The interface name',
            type: 'string'
          },
          alias: {
            description: 'What should be displayed to the user',
            type: 'string'
          }
        }
      },
      PingOptions: {
        type: 'object',
        properties: {
          address: {
            description: 'The ip address to ping',
            type: 'string'
          },
          interface: {
            description:
              "The interface on the PVS to ping through. If this isn't specified we use any of them",
            type: 'string'
          },
          pingCount: {
            type: 'integer'
          }
        },
        required: ['address', 'pingCount']
      },
      pingableDevices: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/pingableDevice'
        }
      },
      pingableDevice: {
        type: 'object',
        properties: {
          address: {
            description: 'The IP Address of the device',
            type: 'string'
          },
          alias: {
            description:
              'The name of the device that should be displayed to the user',
            type: 'string'
          }
        }
      },
      tracerouteOptions: {
        type: 'object',
        properties: {
          address: {
            description: 'The ip address to traceroute to',
            type: 'string'
          },
          interface: {
            description:
              'The interface on the PVS to traceroute through, if this is not provided we use any interface. Valid interfaces come form the dl_cgi to get network interfaces',
            type: 'string'
          }
        }
      },
      traceRouteObject: {
        type: 'object',
        properties: {
          status: {
            description: 'The process ID of the traceroute that was started',
            type: 'string',
            enum: ['pending', 'success', 'fail']
          },
          source: {
            description:
              'The output of the traceroute call that gets called from the PVS to wherever',
            type: 'string'
          }
        },
        required: ['status']
      },
      whitelist: {
        type: 'object',
        properties: {
          hostname: {
            type: 'string'
          }
        }
      },
      Candidate: {
        type: 'object',
        properties: {
          DEVICE_TYPE: {
            description: 'The type of the device',
            enum: ['Inverter'],
            type: 'string'
          },
          HWVER: {
            description: "The version of the MI's hardware",
            type: 'integer'
          },
          MODEL: {
            description: 'The model of the MI',
            enum: [
              'AC_Module_Type_C',
              'AC_Module_Type_D',
              'AC_Module_Type_E',
              'AC_Module_Type_G'
            ],
            type: 'string'
          },
          MODELNO: {
            description:
              'The model of the MI, as a number (10=type D, 11=type E, 12=type G)',
            enum: [10, 11, 12],
            type: 'integer'
          },
          MOD_SN: {
            description: 'The name of the PV',
            type: 'string'
          },
          NMPLT_SKU: {
            description: 'The model of the PV',
            type: 'string'
          },
          SERIAL: {
            description: 'The serial number of the device',
            type: 'string'
          },
          STATEDESCR: {
            description: 'The state of the candidate device',
            enum: [
              'NEW',
              'PINGING',
              'PING_OK',
              'PING_ERROR',
              'GETTING_VERSION_INFORMATION',
              'VERSION_INFORMATION_OK',
              'VERSION_INFORMATION_ERROR',
              'GETTING_PLC_STATS',
              'PLC_STATS_OK',
              'PLC_STATS_ERROR',
              'GETTING_PV_INFO',
              'PV_INFO_OK',
              'PV_INFO_ERROR',
              'OK'
            ],
            type: 'string'
          },
          SWVER: {
            description: "The version of the MI's firmware",
            type: 'integer'
          },
          ltea_3phsum_kwh: {
            description: 'The lifetime energy generated by the MI',
            type: 'number'
          },
          origin: {
            description: 'The origin of the details in this object',
            enum: ['mime'],
            type: 'string'
          },
          panid: {
            description: 'The PANID',
            type: 'integer'
          },
          rssi: {
            description: 'The quality of the communication with the MI',
            type: 'integer'
          }
        }
      },
      panelsLayout: {
        type: 'object',
        required: ['panels'],
        properties: {
          panels: {
            type: 'array',
            items: {
              type: 'object',
              required: ['inverterSerialNumber'],
              properties: {
                inverterSerialNumber: {
                  type: 'string',
                  example: 'E00121852036002'
                },
                xCoordinate: {
                  type: 'number',
                  example: 482
                },
                yCoordinate: {
                  type: 'number',
                  example: 1277
                },
                azimuth: {
                  type: 'number',
                  example: 0
                },
                planeRotation: {
                  type: 'number',
                  example: 0
                },
                slope: {
                  type: 'number',
                  example: 0
                }
              }
            }
          }
        }
      },
      ValueAndUnit: {
        type: 'object',
        properties: {
          value: {
            type: 'number'
          },
          unit: {
            type: 'string'
          }
        }
      },
      DateDesc: {
        type: 'string',
        pattern: '^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}$',
        description: 'YYYY-MM-DD HH:MM:SS',
        example: '2020-02-15 01:23:45'
      },
      StepStatus: {
        type: 'string',
        example: 'RUNNING',
        enum: ['NOT_RUNNING', 'RUNNING', 'FAILED', 'SUCCEEDED']
      },
      EssDeviceType: {
        type: 'string',
        example: 'MIDC',
        enum: [
          'MIO',
          'MIDC',
          'GATEWAY',
          'BATTERY',
          'MICRO_INVERTER',
          'STORAGE_INVERTER'
        ]
      },
      DeviceFwVersion: {
        type: 'string',
        example: '1.2.3',
        pattern: '^\\d{1}.\\d{1}.\\d{1}$'
      },
      PreDiscoveryDevice: {
        type: 'object',
        properties: {
          serial_number: {
            type: 'string'
          },
          device_type: {
            $ref: '#/components/schemas/EssDeviceType'
          },
          device_fw_ver: {
            $ref: '#/components/schemas/DeviceFwVersion'
          }
        }
      },
      PreDiscoveryDevices: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/PreDiscoveryDevice'
        }
      },
      EssDevice: {
        type: 'object',
        properties: {
          serial_number: {
            type: 'string'
          },
          last_mapped: {
            $ref: '#/components/schemas/DateDesc'
          },
          device_type: {
            $ref: '#/components/schemas/EssDeviceType'
          },
          device_fw_ver: {
            $ref: '#/components/schemas/DeviceFwVersion'
          }
        }
      },
      CommissioningError: {
        type: 'object',
        properties: {
          error_name: {
            type: 'string',
            example: 'UNDER_VOLT_ALARM'
          },
          last_occurrence: {
            $ref: '#/components/schemas/DateDesc'
          },
          error_code: {
            type: 'string',
            example: '4.5.1'
          },
          device_sn: {
            type: 'string',
            example: '048572340857NND',
            description: 'Serial number of device with error'
          },
          error_message: {
            type: 'string',
            example: 'Critical: low battery SOH.'
          },
          value: {
            $ref: '#/components/schemas/ValueAndUnit'
          }
        }
      },
      EnergyStorageSystem: {
        type: 'object',
        properties: {
          inverter: {
            $ref: '#/components/schemas/EssDevice'
          },
          mio_board: {
            $ref: '#/components/schemas/EssDevice'
          },
          batteries: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/EssDevice'
            }
          }
        }
      },
      PreDiscoveryReport: {
        type: 'object',
        properties: {
          devices: {
            $ref: '#/components/schemas/PreDiscoveryDevices'
          }
        }
      },
      ComponentMapping: {
        type: 'object',
        properties: {
          ess_list: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/EnergyStorageSystem'
            }
          },
          hub_plus: {
            $ref: '#/components/schemas/EssDevice'
          },
          gateway: {
            $ref: '#/components/schemas/EssDevice'
          }
        }
      },
      FirmwareUpdateStatus: {
        type: 'object',
        properties: {
          serial_number: {
            type: 'string'
          },
          fw_ver_from: {
            $ref: '#/components/schemas/DeviceFwVersion'
          },
          fw_ver_to: {
            $ref: '#/components/schemas/DeviceFwVersion'
          },
          progress: {
            type: 'number'
          },
          device_type: {
            $ref: '#/components/schemas/EssDeviceType'
          }
        }
      },
      BatteryStatus: {
        type: 'object',
        properties: {
          serial_number: {
            type: 'string'
          },
          last_updated: {
            $ref: '#/components/schemas/DateDesc'
          },
          battery_amperage: {
            $ref: '#/components/schemas/ValueAndUnit',
            description: 'Average current for all modules in the bank.'
          },
          battery_voltage: {
            $ref: '#/components/schemas/ValueAndUnit',
            description: 'Average voltage for all modules in the bank.'
          },
          state_of_charge: {
            $ref: '#/components/schemas/ValueAndUnit',
            description:
              'State of charge (ChaState) minus storage reserve (MinRsvPct) times capacity rating (AhrRtg).'
          },
          temperature: {
            $ref: '#/components/schemas/ValueAndUnit',
            description: 'Average temperature for all modules in the bank.'
          }
        }
      },
      InverterStatus: {
        type: 'object',
        properties: {
          serial_number: {
            type: 'string'
          },
          last_updated: {
            $ref: '#/components/schemas/DateDesc'
          },
          ac_current: {
            $ref: '#/components/schemas/ValueAndUnit',
            description: 'AC Current'
          },
          phase_a_current: {
            $ref: '#/components/schemas/ValueAndUnit',
            description: 'Phase A current'
          },
          phase_b_current: {
            $ref: '#/components/schemas/ValueAndUnit',
            description: 'Phase B current'
          },
          a_n_voltage: {
            $ref: '#/components/schemas/ValueAndUnit',
            description: 'a-neutral voltage'
          },
          b_n_voltage: {
            $ref: '#/components/schemas/ValueAndUnit',
            description: 'b-neutral voltage'
          },
          ac_power: {
            $ref: '#/components/schemas/ValueAndUnit',
            description: 'inverter power'
          },
          temperature: {
            $ref: '#/components/schemas/ValueAndUnit',
            description: 'inverter temperature'
          }
        }
      },
      HubPlusStatus: {
        type: 'object',
        properties: {
          serial_number: {
            type: 'string'
          },
          last_updated: {
            $ref: '#/components/schemas/DateDesc'
          },
          contactor_error: {
            type: 'string',
            enum: [
              'NONE',
              'STUCK_OPEN',
              'STUCK_CLOSED_OR_MM_OPEN',
              'MM_CLOSED',
              'MM_STUCK_OPEN',
              'MM_STUCK_CLOSED',
              'UNKNOWN'
            ]
          },
          contactor_position: {
            type: 'string',
            enum: ['UNKNOWN', 'OPEN', 'CLOSED']
          },
          grid_voltage_state: {
            type: 'string',
            enum: [
              'METER_VOLTAGE_IN_RANGE',
              'METER_VOLTAGE_OUT_RANGE',
              'METER_PHASE_LOSS',
              'METER_MISS_CONNECTION'
            ]
          },
          grid_frequency_state: {
            type: 'string',
            enum: ['METER_FREQ_IN_RANGE', 'METER_FREQ_OUT_RANGE']
          },
          load_voltage_state: {
            type: 'string',
            enum: [
              'METER_VOLTAGE_IN_RANGE',
              'METER_VOLTAGE_OUT_RANGE',
              'METER_PHASE_LOSS',
              'METER_MISS_CONNECTION'
            ]
          },
          load_frequency_state: {
            type: 'string',
            enum: ['METER_FREQ_IN_RANGE', 'METER_FREQ_OUT_RANGE']
          },
          hub_temperature: {
            $ref: '#/components/schemas/ValueAndUnit',
            description: 'temperature in degrees C'
          },
          hub_humidity: {
            $ref: '#/components/schemas/ValueAndUnit',
            description: 'relative humidity in percent'
          },
          jump_start_voltage: {
            $ref: '#/components/schemas/ValueAndUnit',
            description: 'jumpstart voltage'
          },
          aux_port_voltage: {
            $ref: '#/components/schemas/ValueAndUnit',
            description: 'Auxiliary port voltage'
          },
          main_voltage: {
            $ref: '#/components/schemas/ValueAndUnit',
            description: '12V rail on the MIDC'
          },
          inverter_connection_voltage: {
            $ref: '#/components/schemas/ValueAndUnit',
            description:
              'This voltage indicates the connectivity of the XW, 1.43V if XW not connected, .86V if XW is connected, 0.03V if RPO switch is closed to ground'
          },
          grid_phase1_voltage: {
            $ref: '#/components/schemas/ValueAndUnit'
          },
          grid_phase2_voltage: {
            $ref: '#/components/schemas/ValueAndUnit'
          },
          load_phase1_voltage: {
            $ref: '#/components/schemas/ValueAndUnit'
          },
          load_phase2_voltage: {
            $ref: '#/components/schemas/ValueAndUnit'
          }
        }
      },
      EssStatusReport: {
        type: 'object',
        properties: {
          last_updated: {
            $ref: '#/components/schemas/DateDesc'
          },
          battery_status: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/BatteryStatus'
            }
          },
          ess_status: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/EnergyStorageSystemStatus'
            }
          },
          hub_plus_status: {
            $ref: '#/components/schemas/HubPlusStatus'
          },
          inverter_status: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/InverterStatus'
            }
          },
          ess_state: {
            type: 'object',
            properties: {
              storage_controller_status: {
                description:
                  'The status of the storage controller. This informs the user about whether the system is set up and operational.',
                type: 'string',
                enum: ['UNKNOWN', 'NOT_RUNNING', 'RUNNING']
              },
              operational_mode: {
                description:
                  'The operational mode of the storage system. This defines how the storage controller behaves.',
                type: 'string',
                enum: [
                  'UNKNOWN',
                  'STANDBY',
                  'MANUAL_CHARGE',
                  'MANUAL_DCM',
                  'DCM',
                  'TARIFF_OPTIMIZER',
                  'ENERGY_ARBITRAGE',
                  'SELF_CONSUMPTION',
                  'BACKUP_ONLY',
                  'HECO_ZERO_EXPORT'
                ]
              },
              permission_to_operate: {
                description:
                  'The PTO state of the system. If true, the controller will operate based on the operational_mode. If false, the controller will charge the system to a set SOC and hold.',
                type: 'boolean'
              }
            }
          }
        }
      },
      EnergyStorageSystemStatus: {
        type: 'object',
        properties: {
          last_updated: {
            $ref: '#/components/schemas/DateDesc'
          },
          serial_number: {
            type: 'string'
          },
          enclosure_humidity: {
            $ref: '#/components/schemas/ValueAndUnit',
            description: 'enclosure humidity in percent'
          },
          enclosure_temperature: {
            $ref: '#/components/schemas/ValueAndUnit',
            description: 'enclosure temperature in degrees C'
          },
          ess_meter_reading: {
            type: 'object',
            properties: {
              last_updated: {
                $ref: '#/components/schemas/DateDesc'
              },
              agg_power: {
                $ref: '#/components/schemas/ValueAndUnit'
              },
              meter_a: {
                type: 'object',
                properties: {
                  reading: {
                    $ref: '#/components/schemas/PhaseReading'
                  }
                }
              },
              meter_b: {
                type: 'object',
                properties: {
                  reading: {
                    $ref: '#/components/schemas/PhaseReading'
                  }
                }
              }
            }
          }
        }
      },
      PhaseReading: {
        type: 'object',
        properties: {
          last_updated: {
            $ref: '#/components/schemas/DateDesc'
          },
          current: {
            $ref: '#/components/schemas/ValueAndUnit'
          },
          voltage: {
            $ref: '#/components/schemas/ValueAndUnit'
          },
          power: {
            $ref: '#/components/schemas/ValueAndUnit'
          }
        }
      },
      SystemHealthCheckList: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            check_type: {
              type: 'string',
              enum: ['ALL', 'PLATFORM', 'ACPV', 'STORAGE']
            },
            check_list: {
              items: {
                type: 'object',
                properties: {
                  check_name: {
                    type: 'string'
                  }
                }
              }
            }
          }
        }
      },
      SystemHealthCheckListStatus: {
        type: 'object',
        properties: {
          check_name: {
            type: 'string'
          },
          progress: {
            type: 'number'
          },
          status: {
            type: 'string',
            enum: ['FAILED', 'RUNNING', 'SUCCEEDED', 'UNSUPPORTED', 'WAITING']
          },
          errors: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        }
      },
      EquinoxSystemStatus: {
        type: 'object',
        properties: {
          last_updated: {
            $ref: '#/components/schemas/DateDesc'
          },
          backup_inverter_nameplate_power: {
            type: 'object',
            properties: {
              last_updated: {
                $ref: '#/components/schemas/DateDesc',
                description:
                  'Time at which backup power calculation was last run'
              },
              power: {
                $ref: '#/components/schemas/ValueAndUnit'
              }
            }
          },
          non_backup_inverter_nameplate_power: {
            type: 'object',
            properties: {
              last_updated: {
                $ref: '#/components/schemas/DateDesc',
                description:
                  'Time at which non-backup power calculation was last run'
              },
              power: {
                $ref: '#/components/schemas/ValueAndUnit'
              }
            }
          },
          aggregate_mi_production_reading: {
            type: 'object',
            description:
              'Aggregated average power over polling interval of MIs',
            properties: {
              last_updated: {
                $ref: '#/components/schemas/DateDesc'
              },
              agg_power: {
                $ref: '#/components/schemas/ValueAndUnit'
              }
            }
          },
          production_meter_reading: {
            type: 'object',
            properties: {
              last_updated: {
                $ref: '#/components/schemas/DateDesc'
              },
              agg_power: {
                $ref: '#/components/schemas/ValueAndUnit'
              },
              meter: {
                type: 'object',
                properties: {
                  reading: {
                    $ref: '#/components/schemas/PhaseReading'
                  }
                }
              }
            }
          },
          consumption_meter_reading: {
            type: 'object',
            properties: {
              last_updated: {
                $ref: '#/components/schemas/DateDesc'
              },
              agg_power: {
                $ref: '#/components/schemas/ValueAndUnit'
              },
              meter_a: {
                type: 'object',
                properties: {
                  reading: {
                    $ref: '#/components/schemas/PhaseReading'
                  },
                  current_transducer_status: {
                    type: 'string',
                    enum: ['OK', 'NOT_FOUND', 'UNKNOWN']
                  }
                }
              },
              meter_b: {
                type: 'object',
                properties: {
                  reading: {
                    $ref: '#/components/schemas/PhaseReading'
                  },
                  current_transducer_status: {
                    type: 'string',
                    enum: ['OK', 'NOT_FOUND']
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}