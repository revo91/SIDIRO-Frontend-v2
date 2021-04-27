import {
  SET_ASSETS_REPORTS_DATA,
  SET_REPORTS_DATE
} from '../../actions/Reports/CommonReports.action';

interface ICommonReportsReducerAction {
  type: string,
  assetID: string,
  assetData: any,
  dateFrom: string,
  dateTo: string
}

interface IPowerDemandTabState {
  infeeds: Array<string> | undefined,
  outfeeds: Array<string> | undefined,
  warningThreshold: number | undefined,
  alarmThreshold: number | undefined,
  transformerLosses: number | undefined
}

const initialState: IPowerDemandTabState = {
  infeeds: ['453abff100514e52ab7d29542b550271'],
  outfeeds: ['bc5ae158e8934c38aff4f52a6b07ecdf', 'bc4a33865d59406e83f142ff1035f1a6', 'c92acf6b6b0f452bb4cb88011ec4dba6', 'cb659c511ab34ff5bf5927380ad19e0a', '1fd7c385632747ea9735256ebbbdb921', '2615561162614fe19f7e6bd788b6f241',
    '00e42c7810c844d4a1b39eb6da4274f1', '52906d2ea93d4af098233d1434df327e', 'c0cea6c7ea4b4e7088b6433863e4e467', '3af0f2f394f84713ac08baafbbdef459', '0ce676a0fe1f4da89d354662d734343a', '8968bd1b87ad463bb4b7e235a518f14d',
    '7e77bd333f39408fa69306ef63770cc7', 'ad762349da8a4e0faf1a7c16d23fe2a5', '86f91ddf6fd5457c874f561d9641c54f', 'a2545aa2e8894067b730830d323a1c9c', '32666fa87cfe4cb3b3cb14056fd4a8e8', '2288d1cb41d048dcbb50f7c75ad1a858',
    '2869823e0aa242f8b70df7e990bd3c3e', 'e156f91288d44696891462f693551588', '40ffdbf4ecc14f3eb645c9cb675a9030', '17507f5b44c74398892c7021a9bd3c66', '45665da871dd4538886ff5b9f63b352a', '3afe9aaaf4b8426a8d547b73116c0ef6',
    '683b67da12ee48f3bfd0511a0d0bb223', '7d8a11f8818e4cbdb11f88d2c416013b', 'c25b12cad8614e5e8e6b14a563ba93da', '4d164cd6f766448ea82f9350745b01ca', 'b2e4cfa16be7497f8db1a07040e37c17', '1a8fc42c62c149e9ad2ae68357879097',
    'ec450582d4c84600ac0da086bca3802d', 'bd21a78f5ae449a7a1f414e9591ad42e', '699277409d0440ff94672a3dc95ff6d2', 'a091a640fcf04c2498a297e3e0d4204f', '23f2d3d5dd0844fea6c5395425d036f5', 'e406f47cf36046e2b5086c2ea49b1f42'],
  warningThreshold: 75,
  alarmThreshold: 100,
  transformerLosses: 10
}

export const PowerDemandTabReducer = (state = initialState, action: ICommonReportsReducerAction) => {
  switch (action.type) {
    case SET_ASSETS_REPORTS_DATA:
      return {
        ...state,

      }
    case SET_REPORTS_DATE:
      return {
        ...state,
      }

    default:
      return state
  }
}