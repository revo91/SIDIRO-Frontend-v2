import { SET_DEVICE_DATA_DIALOG_OPEN } from '../actions/DeviceDataDialog.action';

interface IDeviceDataDialog {
  type: string,
  open: boolean,
  deviceName: string,
  deviceType: string
}

const initialState = {
  diagrams: [
    {
      name: 'RG-MDP1',
      sections: [
        {
          infeeds: [
            {
              name: 'TR',
              tableName: 'Trafo',
              type: 'transformer',
              breaker: {
                name: 'Q00',
                type: 'drawOutCircuitBreaker',
                state: 'open'
              }
            },
            {
              name: 'GEN',
              tableName: 'Generator',
              type: 'generator',
              breaker: {
                name: 'QAG',
                type: 'drawOutCircuitBreaker',
                state: 'open'
              }
            }
          ],
          breakers: [
            {
              name: 'QT02',
              tableName: 'Reserve',
              type: 'circuitBreaker',
              state: 'open'
            }
          ],
          coupling: {
            name: 'QT01',
            type: 'circuitBreaker',
            state: 'open'
          }
        },
        {
          breakers: [
            {
              name: 'QT01',
              tableName: 'L34-35',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT02',
              tableName: 'Mixing r.1',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT03',
              tableName: 'Build. inst.',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT04',
              tableName: 'Compress.',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT05',
              tableName: 'Res./charg.',
              type: 'circuitBreaker',
              state: 'open'
            }
          ],
          coupling: {
            name: '',
            type: '',
            state: ''
          }
        }
      ]
    },
    {
      name: 'HVPP-1',
      sections: [
        {
          infeeds: [
            {
              //only breaker here, infeed from above switchboard, type: '' to not show anything
              name: '',
              tableName: '',
              type: '',
              breaker: {
                name: 'Q0',
                type: 'circuitBreaker',
                state: 'open'
              }
            }
          ],
          breakers: [
            {
              name: 'QT01',
              tableName: 'L34-Cast.',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT02',
              tableName: 'L35-Cast.',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT03',
              tableName: 'L34-Wind.',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT04',
              tableName: 'L35-Wind.',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT05',
              tableName: 'L36-Cast.',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT11',
              tableName: 'Cooling',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT6',
              tableName: 'L37-Cast.',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT7',
              tableName: 'L36-Wind.',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT8',
              tableName: 'L37-Wind.',
              type: 'circuitBreaker',
              state: 'open'
            }
          ],
          coupling: {
            name: '',
            type: '',
            state: ''
          }
        }
      ]
    },
    {
      name: 'HVPP-2',
      sections: [
        {
          infeeds: [
            {
              //only breaker here, infeed from above switchboard, type: '' to not show anything
              name: '',
              tableName: '',
              type: '',
              breaker: {
                name: 'Q0',
                type: 'circuitBreaker',
                state: 'open'
              }
            }
          ],
          breakers: [
            {
              name: 'QT01',
              tableName: 'L34&L35 Mix.',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT02',
              tableName: 'L36&L37 Mix.',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT11',
              tableName: 'Blend. RB34',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT12',
              tableName: 'Blend. RB35',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT13',
              tableName: 'Blend. RB36',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT14',
              tableName: 'Blend. RB37',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT21',
              tableName: 'Mix. ZTM34',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT22',
              tableName: 'Mix. ZTM35',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT23',
              tableName: 'Mix. ZTM36',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT24',
              tableName: 'Mix. ZTM37',
              type: 'circuitBreaker',
              state: 'open'
            },
          ],
          coupling: {
            name: '',
            type: '',
            state: ''
          }
        }
      ]
    },
    {
      name: 'HVPP-3',
      sections: [
        {
          infeeds: [
            {
              //only breaker here, infeed from above switchboard, type: '' to not show anything
              name: '',
              tableName: '',
              type: '',
              breaker: {
                name: 'Q0',
                type: 'circuitBreaker',
                state: 'open'
              }
            }
          ],
          breakers: [
            {
              name: 'QM01',
              tableName: '29-40/A-B1',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QM02',
              tableName: '29-40/B1-D',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QM03',
              tableName: '13-29/A-D',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QM04',
              tableName: '1-13/A-D',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QP01',
              tableName: 'L34&L35 Cas.',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QP02',
              tableName: 'L36&L37 Cas.',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QP03',
              tableName: 'Mixing r.1',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QP04',
              tableName: 'Reserve',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QB01',
              tableName: 'IT Room',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QB02',
              tableName: 'Office gr.',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QB03',
              tableName: 'Office 1f.',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QB04',
              tableName: 'Reserve',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT01',
              tableName: 'Pump Room',
              type: 'circuitBreaker',
              state: 'open'
            },
            {
              name: 'QT02',
              tableName: 'Boiler room',
              type: 'circuitBreaker',
              state: 'open'
            },
          ],
          coupling: {
            name: '',
            type: '',
            state: ''
          }
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