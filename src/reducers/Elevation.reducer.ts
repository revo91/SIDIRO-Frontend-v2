import { SET_ELEVATION } from '../actions/Elevation.action';

interface IElevation {
  type: string,
  open: boolean
}

const initialState = {
  switchboards: [
    {
      name: 'RG-MDP1',
      panels: [
        {
          name: 'RG MDP1.1',
          compartments: [
            {
              rowSpan: 4,
              columns: []
            },
            {
              rowSpan: 4,
              columns: [
                {
                  type: 'infeed3WL',
                  name: 'Q0',
                  assetID: 'circuitDiagramName'
                }
              ]
            }
          ]
        },
        {
          name: 'RG MDP1.2',
          compartments: [
            {
              rowSpan: 4,
              columns: []
            },
            {
              rowSpan: 4,
              columns: [
                {
                  type: 'infeed3WL',
                  name: 'QAG',
                  assetID: 'circuitDiagramName'
                }
              ]
            }
          ]
        },
        {
          name: 'RG MDP1.3',
          compartments: [
            {
              rowSpan: 4,
              columns: []
            },
            {
              rowSpan: 4,
              columns: [
                {
                  type: 'infeed3WL',
                  name: 'QTG02',
                  assetID: 'circuitDiagramName'
                }
              ]
            }
          ]
        },
        {
          name: 'RG MDP1.4',
          compartments: [
            {
              rowSpan: 4,
              columns: []
            },
            {
              rowSpan: 4,
              columns: [
                {
                  type: 'infeed3WL',
                  name: 'QTG01',
                  assetID: 'circuitDiagramName'
                }
              ]
            }
          ]
        },
        {
          name: 'RG MDP1.5',
          compartments: [
            {
              rowSpan: 4,
              columns: []
            },
            {
              rowSpan: 4,
              columns: [
                {
                  type: 'infeed3WL',
                  name: 'QBK',
                  assetID: 'circuitDiagramName'
                }
              ]
            }
          ]
        },
        {
          name: 'RG MDP1.6',
          compartments: [
            {
              rowSpan: 4,
              columns: []
            },
            {
              rowSpan: 4,
              columns: [
                {
                  type: 'infeed3WL',
                  name: 'QT01',
                  assetID: 'circuitDiagramName'
                }
              ]
            }
          ]
        },
        {
          name: 'RG MDP1.7',
          compartments: [
            {
              rowSpan: 4,
              columns: []
            },
            {
              rowSpan: 4,
              columns: [
                {
                  type: 'infeed3WL',
                  name: 'QT02',
                  assetID: 'circuitDiagramName'
                }
              ]
            }
          ]
        },
        {
          name: 'empty',
          compartments: []
        },
        {
          name: 'RG MDP1.8',
          compartments: [
            {
              rowSpan: 4,
              columns: []
            },
            {
              rowSpan: 4,
              columns: [
                {
                  type: 'infeed3WL',
                  name: 'QT03',
                  assetID: 'circuitDiagramName'
                }
              ]
            }
          ]
        },
        {
          name: 'RG MDP1.9',
          compartments: [
            {
              rowSpan: 4,
              columns: []
            },
            {
              rowSpan: 4,
              columns: [
                {
                  type: 'infeed3WL',
                  name: 'QT04',
                  assetID: 'circuitDiagramName'
                }
              ]
            }
          ]
        },
        {
          name: 'RG MDP1.10',
          compartments: [
            {
              rowSpan: 4,
              columns: []
            },
            {
              rowSpan: 4,
              columns: [
                {
                  type: 'infeed3WL',
                  name: 'QT05',
                  assetID: 'circuitDiagramName'
                }
              ]
            }
          ]
        },
        {
          name: 'RG MDP1.11',
          compartments: []
        },
        {
          name: 'RG MDP1.12',
          compartments: []
        },
        {
          name: 'RG MDP1.13',
          compartments: []
        },
        {
          name: 'RG MDP1.14',
          compartments: []
        },
      ]
    },
    {
      name: 'HVPP-1',
      panels: [
        {
          name: 'HVPP-1.1',
          compartments: [
            {
              rowSpan: 4,
              columns: []
            },
            {
              rowSpan: 4,
              columns: [
                {
                  type: 'infeed3WL',
                  name: 'Q0',
                  assetID: 'circuitDiagramName'
                }
              ]
            }
          ]
        },
        {
          name: 'HVPP-1.2',
          compartments: [
            {
              rowSpan: 1,
              columns: []
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT01',
                  assetID: 'circuitDiagramName'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT02',
                  assetID: 'circuitDiagramName'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT03',
                  assetID: 'circuitDiagramName'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT04',
                  assetID: 'circuitDiagramName'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT05',
                  assetID: 'circuitDiagramName'
                }
              ]
            },
          ]
        },
        {
          name: '',
          compartments: []
        },
        {
          name: 'HVPP-1.3',
          compartments: [
            {
              rowSpan: 1,
              columns: []
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT06',
                  assetID: 'circuitDiagramName'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT07',
                  assetID: 'circuitDiagramName'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT08',
                  assetID: 'circuitDiagramName'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT11',
                  assetID: 'circuitDiagramName'
                }
              ]
            }
          ]
        }

      ]
    },
    {
      name: 'HVPP-2',
      panels: [
        {
          name: 'HVPP-2.1',
          compartments: [
            {
              rowSpan: 4,
              columns: []
            },
            {
              rowSpan: 4,
              columns: [
                {
                  type: 'infeed3WL',
                  name: 'Q0',
                  assetID: 'asd'
                }
              ]
            }
          ]
        },
        {
          name: 'HVPP-2.2',
          compartments: [
            {
              rowSpan: 1,
              columns: []
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT01',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT02',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT11',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT12',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT13',
                  assetID: 'asd'
                }
              ]
            }
          ]
        },
        {
          name: '',
          compartments: []
        },
        {
          name: 'HVPP-2.3',
          compartments: [
            {
              rowSpan: 1,
              columns: []
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT14',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT21',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT22',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT23',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT24',
                  assetID: 'asd'
                }
              ]
            }
          ]
        }
      ]
    },
    //HVPP-3
    {
      name: 'HVPP-3',
      panels: [
        {
          name: 'HVPP-3.1',
          compartments: [
            {
              rowSpan: 4,
              columns: []
            },
            {
              rowSpan: 4,
              columns: [
                {
                  type: 'infeed3WL',
                  name: 'Q0',
                  assetID: 'asd'
                }
              ]
            }
          ]
        },
        {
          name: 'HVPP-3.2',
          compartments: [
            {
              rowSpan: 1,
              columns: []
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QM01',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QM02',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QM03',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QM04',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QP01',
                  assetID: 'asd'
                }
              ]
            }
          ]
        },
        {
          name: '',
          compartments: []
        },
        {
          name: 'HVPP-3.3',
          compartments: [
            {
              rowSpan: 1,
              columns: []
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QP02',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QP03',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QP04',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QB01',
                  assetID: 'asd'
                }
              ]
            },
          ]
        },
        {
          name: 'HVPP-3.4',
          compartments: [
            {
              rowSpan: 1,
              columns: []
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QB02',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QB03',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QB04',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT01',
                  assetID: 'asd'
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT02',
                  assetID: 'asd'
                }
              ]
            }
          ]
        },
        {
          name: '',
          compartments: []
        },
      ]
    }
  ]
}

export const ElevationReducer = (state = initialState, action: IElevation) => {
  switch (action.type) {
    case SET_ELEVATION:
      return {
        ...state,
        open: action.open
      }
    default:
      return state
  }
}