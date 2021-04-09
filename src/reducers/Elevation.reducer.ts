import { SET_ELEVATION } from '../actions/Elevation.action';

interface IElevation {
  type: string,
  open: boolean
}

export interface IElevationSchema {
  switchboards: Array<{
    name: string,
    panels: Array<{
      name: string,
      compartments: Array<{
        rowSpan: number,
        columns: Array<{
          type: string,
          name: string,
          assetID: string | false,
          nonInteractive: boolean
        }>
      }>
    }>
  }>
}

const initialState:IElevationSchema = {
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
                  assetID: '453abff100514e52ab7d29542b550271',
                  nonInteractive: false,
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
                  assetID: 'd2e991fbd0034ed486c12dbc320e3c51',
                  nonInteractive: false
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
                  name: 'QT02',
                  assetID: 'bd5af39bddc84a9a9be0957a75f67286',
                  nonInteractive: false
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
                  name: 'QT01',
                  assetID: 'c3a342559e9545d491b1c54963798e98',
                  nonInteractive: false
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
              columns: []
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
                  assetID: 'f40c525703c84859ba3f708cc3d977d2',
                  nonInteractive: false
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
                  assetID: 'e4cafb60f3954a64b08243b461fc7a52',
                  nonInteractive: false
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
                  assetID: '926887d50bb546779f3127c1030388c9',
                  nonInteractive: false
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
                  assetID: 'c640bbe8e3bb4a8598960fcdd89e7086',
                  nonInteractive: false
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
                  assetID: '683b67da12ee48f3bfd0511a0d0bb223',
                  nonInteractive: false
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
                  assetID: false,
                  nonInteractive: true
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
                  assetID: 'bc5ae158e8934c38aff4f52a6b07ecdf',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT02',
                  assetID: '2615561162614fe19f7e6bd788b6f241',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT03',
                  assetID: 'bc4a33865d59406e83f142ff1035f1a6',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT04',
                  assetID: '00e42c7810c844d4a1b39eb6da4274f1',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT05',
                  assetID: '0ce676a0fe1f4da89d354662d734343a',
                  nonInteractive: false
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
                  assetID: 'a2545aa2e8894067b730830d323a1c9c',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT07',
                  assetID: '8968bd1b87ad463bb4b7e235a518f14d',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT08',
                  assetID: '32666fa87cfe4cb3b3cb14056fd4a8e8',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT11',
                  assetID: '7d8a11f8818e4cbdb11f88d2c416013b',
                  nonInteractive: false
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
                  assetID: false,
                  nonInteractive: true
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
                  assetID: 'c271c0ea6641492184c731ff7fd42ace',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT02',
                  assetID: '3fbec3101b0b4380895b11d59b9b8099',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT11',
                  assetID: 'cb659c511ab34ff5bf5927380ad19e0a',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT12',
                  assetID: 'c0cea6c7ea4b4e7088b6433863e4e467',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT13',
                  assetID: 'ad762349da8a4e0faf1a7c16d23fe2a5',
                  nonInteractive: false
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
                  assetID: '2869823e0aa242f8b70df7e990bd3c3e',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT21',
                  assetID: '1fd7c385632747ea9735256ebbbdb921',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT22',
                  assetID: '3af0f2f394f84713ac08baafbbdef459',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT23',
                  assetID: '86f91ddf6fd5457c874f561d9641c54f',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT24',
                  assetID: 'e156f91288d44696891462f693551588',
                  nonInteractive: false
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
                  assetID: false,
                  nonInteractive: true
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
                  assetID: 'b2e4cfa16be7497f8db1a07040e37c17',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QM02',
                  assetID: '1a8fc42c62c149e9ad2ae68357879097',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QM03',
                  assetID: 'ec450582d4c84600ac0da086bca3802d',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QM04',
                  assetID: 'bd21a78f5ae449a7a1f414e9591ad42e',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QP01',
                  assetID: '40ffdbf4ecc14f3eb645c9cb675a9030',
                  nonInteractive: false
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
                  assetID: '17507f5b44c74398892c7021a9bd3c66',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QP03',
                  assetID: '45665da871dd4538886ff5b9f63b352a',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QP04',
                  assetID: '3afe9aaaf4b8426a8d547b73116c0ef6',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QB01',
                  assetID: '699277409d0440ff94672a3dc95ff6d2',
                  nonInteractive: false
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
                  assetID: 'a091a640fcf04c2498a297e3e0d4204f',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QB03',
                  assetID: '23f2d3d5dd0844fea6c5395425d036f5',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QB04',
                  assetID: 'e406f47cf36046e2b5086c2ea49b1f42',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT01',
                  assetID: 'c25b12cad8614e5e8e6b14a563ba93da',
                  nonInteractive: false
                }
              ]
            },
            {
              rowSpan: 1,
              columns: [
                {
                  type: 'outgoingFeeder3VAHorizontal',
                  name: 'QT02',
                  assetID: '4d164cd6f766448ea82f9350745b01ca',
                  nonInteractive: false
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