import { SET_DEVICE_DATA_DIALOG_OPEN } from '../actions/DeviceDataDialog.action';

interface IDeviceDataDialog {
  type: string,
  open: boolean,
  deviceName: string,
  deviceType: string
}

export interface IDiagramStructure {
  diagrams: Array<{
    name: string,
    assetID?: string,
    sections: Array<{
      name: string,
      infeeds?: Array<{
        name: string,
        tableName: string,
        type: string,
        breaker: {
          name: string,
          type: string,
          assetID: string,
          state?: number,
          tableName?: string
        }
      }>,
      breakers?: Array<{
        name: string,
        tableName: string,
        type: string,
        assetID: string
        nextSwitchboardName?: string,
        state?: number
      }>,
      coupling?: {
        name: string,
        type: string,
        assetID: string,
        tableName?: string
      }
    }>
  }>
}

const initialState: IDiagramStructure = {
  diagrams: [
    {
      name: 'RG-MDP1',
      assetID: 'fb338fea96ae45749922905455eda2d4', //global asset for events
      sections: [
        {
          name: '1',
          infeeds: [
            {
              name: 'TR',
              tableName: 'Transformator',
              type: 'transformer',
              breaker: {
                name: 'Q0',
                type: 'drawOutCircuitBreaker',
                assetID: '453abff100514e52ab7d29542b550271'
              }
            },
            {
              name: 'GEN',
              tableName: 'Generator',
              type: 'generator',
              breaker: {
                name: 'QAG',
                type: 'drawOutCircuitBreaker',
                assetID: 'd2e991fbd0034ed486c12dbc320e3c51',
              }
            }
          ],
          breakers: [
            {
              name: 'QT02',
              tableName: 'Reserve',
              type: 'circuitBreaker',
              assetID: 'bd5af39bddc84a9a9be0957a75f67286',
              nextSwitchboardName: undefined
            }
          ],
          coupling: {
            name: 'QT01',
            type: 'couplingBreaker',
            assetID: 'c3a342559e9545d491b1c54963798e98'
          }
        },

        {
          name: '2',
          infeeds: undefined,
          breakers: [
            {
              name: 'QT01',
              tableName: 'HVPP-1',
              type: 'circuitBreaker',
              assetID: 'f40c525703c84859ba3f708cc3d977d2',
              nextSwitchboardName: 'HVPP-1'
            },
            {
              name: 'QT02',
              tableName: 'HVPP-2',
              type: 'circuitBreaker',
              assetID: 'e4cafb60f3954a64b08243b461fc7a52',
              nextSwitchboardName: 'HVPP-2'
            },
            {
              name: 'QT03',
              tableName: 'HVPP-3',
              type: 'circuitBreaker',
              assetID: '926887d50bb546779f3127c1030388c9',
              nextSwitchboardName: 'HVPP-3'
            },
            {
              name: 'QT04',
              tableName: 'Compress.',
              type: 'circuitBreaker',
              assetID: 'c640bbe8e3bb4a8598960fcdd89e7086',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT05',
              tableName: 'Res./charg.',
              type: 'circuitBreaker',
              assetID: '683b67da12ee48f3bfd0511a0d0bb223',
              nextSwitchboardName: undefined
            }
          ],
          coupling: undefined
        },
      ]
    },
    {
      name: 'HVPP-1',
      assetID: '0262043356314a8db5406237072193a8', //global asset for events
      sections: [
        {
          name: '1',
          infeeds: [
            {
              //only breaker here, infeed from above switchboard, type: '' to not show anything
              name: '',
              tableName: '',
              type: '',
              breaker: {
                name: 'Q0',
                tableName: 'RG-MDP1',
                type: 'infeedBreaker',
                assetID: 'f40c525703c84859ba3f708cc3d977d2', // assetID of parent breaker !!
                state: 1, // fixed state for non monitored breaker
              }
            }
          ],
          breakers: [
            {
              name: 'QT01',
              tableName: 'L34-Cast.',
              type: 'circuitBreaker',
              assetID: 'bc5ae158e8934c38aff4f52a6b07ecdf',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT02',
              tableName: 'L35-Cast.',
              type: 'circuitBreaker',
              assetID: '2615561162614fe19f7e6bd788b6f241',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT03',
              tableName: 'L34-Wind.',
              type: 'circuitBreaker',
              assetID: 'bc4a33865d59406e83f142ff1035f1a6',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT04',
              tableName: 'L35-Wind.',
              type: 'circuitBreaker',
              assetID: '00e42c7810c844d4a1b39eb6da4274f1',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT05',
              tableName: 'L36-Cast.',
              type: 'circuitBreaker',
              assetID: '0ce676a0fe1f4da89d354662d734343a',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT11',
              tableName: 'Cooling',
              type: 'circuitBreaker',
              assetID: '7d8a11f8818e4cbdb11f88d2c416013b',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT06',
              tableName: 'L37-Cast.',
              type: 'circuitBreaker',
              assetID: 'a2545aa2e8894067b730830d323a1c9c',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT7',
              tableName: 'L36-Wind.',
              type: 'circuitBreaker',
              assetID: '8968bd1b87ad463bb4b7e235a518f14d',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT8',
              tableName: 'L37-Wind.',
              type: 'circuitBreaker',
              assetID: '32666fa87cfe4cb3b3cb14056fd4a8e8',
              nextSwitchboardName: undefined
            }
          ],
          coupling: undefined
        }
      ]
    },
    {
      name: 'HVPP-2',
      assetID: 'd29d308d9a2941809751dccdfa6b464d', //global asset for events
      sections: [
        {
          name: '1',
          infeeds: [
            {
              //only breaker here, infeed from above switchboard, type: '' to not show anything
              name: '',
              tableName: '',
              type: '',
              breaker: {
                name: 'Q0',
                type: 'infeedBreaker',
                tableName: 'RG-MDP1',
                assetID: 'e4cafb60f3954a64b08243b461fc7a52', // assetID of parent breaker !!
                state: 1, // fixed state for non monitored breaker
              }
            }
          ],
          breakers: [
            {
              name: 'QT01',
              tableName: 'L34&L35 Mix.',
              type: 'circuitBreaker',
              assetID: 'c271c0ea6641492184c731ff7fd42ace',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT02',
              tableName: 'L36&L37 Mix.',
              type: 'circuitBreaker',
              assetID: '3fbec3101b0b4380895b11d59b9b8099',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT11',
              tableName: 'Blend. RB34',
              type: 'circuitBreaker',
              assetID: 'cb659c511ab34ff5bf5927380ad19e0a',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT12',
              tableName: 'Blend. RB35',
              type: 'circuitBreaker',
              assetID: 'c0cea6c7ea4b4e7088b6433863e4e467',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT13',
              tableName: 'Blend. RB36',
              type: 'circuitBreaker',
              assetID: 'ad762349da8a4e0faf1a7c16d23fe2a5',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT14',
              tableName: 'Blend. RB37',
              type: 'circuitBreaker',
              assetID: '2869823e0aa242f8b70df7e990bd3c3e',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT21',
              tableName: 'Mix. ZTM34',
              type: 'circuitBreaker',
              assetID: '1fd7c385632747ea9735256ebbbdb921',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT22',
              tableName: 'Mix. ZTM35',
              type: 'circuitBreaker',
              assetID: '3af0f2f394f84713ac08baafbbdef459',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT23',
              tableName: 'Mix. ZTM36',
              type: 'circuitBreaker',
              assetID: '86f91ddf6fd5457c874f561d9641c54f',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT24',
              tableName: 'Mix. ZTM37',
              type: 'circuitBreaker',
              assetID: 'e156f91288d44696891462f693551588',
              nextSwitchboardName: undefined
            },
          ],
          coupling: undefined
        }
      ]
    },
    {
      name: 'HVPP-3',
      assetID: '4f1ca548b2224ad795227e686473cc0a', //global asset for events
      sections: [
        {
          name: '1',
          infeeds: [
            {
              //only breaker here, infeed from above switchboard, type: '' to not show anything
              name: '',
              tableName: '',
              type: '',
              breaker: {
                name: 'Q0',
                type: 'infeedBreaker',
                tableName: 'RG-MDP1',
                assetID: '926887d50bb546779f3127c1030388c9', // assetID of parent breaker !!
                state: 1, // fixed state for non monitored breaker
              }
            }
          ],
          breakers: [
            {
              name: 'QM01',
              tableName: '29-40/A-B1',
              type: 'circuitBreaker',
              assetID: 'b2e4cfa16be7497f8db1a07040e37c17',
              nextSwitchboardName: undefined
            },
            {
              name: 'QM02',
              tableName: '29-40/B1-D',
              type: 'circuitBreaker',
              assetID: '1a8fc42c62c149e9ad2ae68357879097',
              nextSwitchboardName: undefined
            },
            {
              name: 'QM03',
              tableName: '13-29/A-D',
              type: 'circuitBreaker',
              assetID: 'ec450582d4c84600ac0da086bca3802d',
              nextSwitchboardName: undefined
            },
            {
              name: 'QM04',
              tableName: '1-13/A-D',
              type: 'circuitBreaker',
              assetID: 'bd21a78f5ae449a7a1f414e9591ad42e',
              nextSwitchboardName: undefined
            },
            {
              name: 'QP01',
              tableName: 'L34&L35 Cas.',
              type: 'circuitBreaker',
              assetID: '40ffdbf4ecc14f3eb645c9cb675a9030',
              nextSwitchboardName: undefined
            },
            {
              name: 'QP02',
              tableName: 'L36&L37 Cas.',
              type: 'circuitBreaker',
              assetID: '17507f5b44c74398892c7021a9bd3c66',
              nextSwitchboardName: undefined
            },
            {
              name: 'QP03',
              tableName: 'Mixing r.1',
              type: 'circuitBreaker',
              assetID: '45665da871dd4538886ff5b9f63b352a',
              nextSwitchboardName: undefined
            },
            {
              name: 'QP04',
              tableName: 'Reserve',
              type: 'circuitBreaker',
              assetID: '3afe9aaaf4b8426a8d547b73116c0ef6',
              nextSwitchboardName: undefined
            },
            {
              name: 'QB01',
              tableName: 'IT Room',
              type: 'circuitBreaker',
              assetID: '699277409d0440ff94672a3dc95ff6d2',
              nextSwitchboardName: undefined
            },
            {
              name: 'QB02',
              tableName: 'Office gr.',
              type: 'circuitBreaker',
              assetID: 'a091a640fcf04c2498a297e3e0d4204f',
              nextSwitchboardName: undefined
            },
            {
              name: 'QB03',
              tableName: 'Office 1f.',
              type: 'circuitBreaker',
              assetID: '23f2d3d5dd0844fea6c5395425d036f5',
              nextSwitchboardName: undefined
            },
            {
              name: 'QB04',
              tableName: 'Reserve',
              type: 'circuitBreaker',
              assetID: 'e406f47cf36046e2b5086c2ea49b1f42',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT01',
              tableName: 'Pump Room',
              type: 'circuitBreaker',
              assetID: 'c25b12cad8614e5e8e6b14a563ba93da',
              nextSwitchboardName: undefined
            },
            {
              name: 'QT02',
              tableName: 'Boiler room',
              type: 'circuitBreaker',
              assetID: '4d164cd6f766448ea82f9350745b01ca',
              nextSwitchboardName: undefined
            },
          ],
          coupling: undefined
        }
      ]
    }
  ]
}

export const OverviewReducer = (state = initialState, action: IDeviceDataDialog) => {
  switch (action.type) {
    case SET_DEVICE_DATA_DIALOG_OPEN:
      return {
        ...state,
        open: action.open,
        deviceName: action.deviceName,
        deviceType: action.deviceType
      }
    default:
      return state
  }
}