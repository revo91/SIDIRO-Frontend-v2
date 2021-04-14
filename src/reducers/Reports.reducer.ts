import { SET_REPORTS_STRUCTURE } from '../actions/Reports.action';

interface IReports {
  type: string,
  open: boolean
}

interface IGroupsStructure {
  groups?: IGroupStructure
}

interface IGroupStructure {
  [name: string]: {
    plName: string,
    enName: string,
    consistsOf: Array<IGroupElementStructure> | Array<string>
  }
}

interface IGroupElementStructure {
  feederName: string,
  feederDescription: string,
  assetID: string,
}

const initialState = {
  groups: {
    productionTotalGroup: {
      plName: 'Produkcja',
      enName: 'Production total',
      consistsOf: ['buildingInstallationGroup', 'heatingCoolingGroup', 'line34Group', 'line35Group', 'line36Group', 'line37Group']
    },
    warehouseGroup: {
      plName: 'Magazyny',
      enName: 'Warehouse',
      consistsOf: [{
        feederName: 'RM1',
        feederDescription: 'Rozdzielnica magazyn 29-40/A-B1',
        assetID: 'b2e4cfa16be7497f8db1a07040e37c17'
      },
      {
        feederName: 'RM2',
        feederDescription: 'Rozdzielnica magazyn 29-40/B1-D',
        assetID: '1a8fc42c62c149e9ad2ae68357879097'
      },
      {
        feederName: 'RM3',
        feederDescription: 'Rozdzielnica magazyn 13-29/A-D',
        assetID: 'ec450582d4c84600ac0da086bca3802d'
      },
      {
        feederName: 'RM4',
        feederDescription: 'Rozdzielnica magazyn 1-13/A-D',
        assetID: 'bd21a78f5ae449a7a1f414e9591ad42e'
      }]
    },
    officesGroup: {
      plName: 'Biura',
      enName: 'Offices',
      consistsOf: [{
        feederName: 'RSER',
        feederDescription: 'Serwerownia',
        assetID: '699277409d0440ff94672a3dc95ff6d2'
      },
      {
        feederName: 'RB0',
        feederDescription: 'Biurowiec parter',
        assetID: 'a091a640fcf04c2498a297e3e0d4204f'
      },
      {
        feederName: 'RB1',
        feederDescription: 'Biurowiec piętro',
        assetID: '23f2d3d5dd0844fea6c5395425d036f5'
      },
      {
        feederName: 'Rezerwa',
        feederDescription: 'Rezerwa',
        assetID: 'e406f47cf36046e2b5086c2ea49b1f42'
      }]
    },
    carChargingGroup: {
      plName: 'Ładowanie samochodów',
      enName: 'Car charging',
      consistsOf: [{
        feederName: 'Samochody elektryczne',
        feederDescription: 'Samochody elektryczne',
        assetID: 'c640bbe8e3bb4a8598960fcdd89e7086'
      }]
    },
    line34Group: {
      plName: 'Linia produkcyjna L34',
      enName: 'Production line L34',
      consistsOf: [{
        feederName: 'RT-1A-1',
        feederDescription: 'Casting',
        assetID: 'bc5ae158e8934c38aff4f52a6b07ecdf'
      },
      {
        feederName: 'RT-1B-1',
        feederDescription: 'Winding',
        assetID: 'bc4a33865d59406e83f142ff1035f1a6'
      },
      {
        feederName: 'RT-2-1',
        feederDescription: 'Mixing L34&L35',
        assetID: 'c92acf6b6b0f452bb4cb88011ec4dba6'
      },
      {
        feederName: 'Blender RB34',
        feederDescription: 'Falownik',
        assetID: 'cb659c511ab34ff5bf5927380ad19e0a'
      },
      {
        feederName: 'MIXER ZTM34',
        feederDescription: 'Falownik',
        assetID: '1fd7c385632747ea9735256ebbbdb921'
      }]
    },
    line35Group: {
      plName: 'Linia produkcyjna L35',
      enName: 'Production line L35',
      consistsOf: [{
        feederName: 'RT-1A-2',
        feederDescription: 'Casting',
        assetID: '2615561162614fe19f7e6bd788b6f241'
      },
      {
        feederName: 'RT-1B-2',
        feederDescription: 'Winding',
        assetID: '00e42c7810c844d4a1b39eb6da4274f1'
      },
      {
        feederName: 'RT-2-1',
        feederDescription: 'Mixing L34&L35',
        assetID: '52906d2ea93d4af098233d1434df327e'
      },
      {
        feederName: 'Blender RB35',
        feederDescription: 'Falownik',
        assetID: 'c0cea6c7ea4b4e7088b6433863e4e467'
      },
      {
        feederName: 'MIXER ZTM35',
        feederDescription: 'Falownik',
        assetID: '3af0f2f394f84713ac08baafbbdef459'
      }]
    },
    line36Group: {
      plName: 'Linia produkcyjna L36',
      enName: 'Production line L36',
      consistsOf: [{
        feederName: 'RT-1C-1',
        feederDescription: 'Casting',
        assetID: '0ce676a0fe1f4da89d354662d734343a'
      },
      {
        feederName: 'RT-1D-1',
        feederDescription: 'Winding',
        assetID: '8968bd1b87ad463bb4b7e235a518f14d'
      },
      {
        feederName: 'RT-2-2',
        feederDescription: 'Mixing L36&L37',
        assetID: '7e77bd333f39408fa69306ef63770cc7'
      },
      {
        feederName: 'Blender RB36',
        feederDescription: 'Falownik',
        assetID: 'ad762349da8a4e0faf1a7c16d23fe2a5'
      },
      {
        feederName: 'MIXER ZTM36',
        feederDescription: 'Falownik',
        assetID: '86f91ddf6fd5457c874f561d9641c54f'
      }]
    },
    line37Group: {
      plName: 'Linia produkcyjna L37',
      enName: 'Production line L37',
      consistsOf: [{
        feederName: 'RT-1C-2',
        feederDescription: 'Casting',
        assetID: 'a2545aa2e8894067b730830d323a1c9c'
      },
      {
        feederName: 'RT-1D-2',
        feederDescription: 'Winding',
        assetID: '32666fa87cfe4cb3b3cb14056fd4a8e8'
      },
      {
        feederName: 'RT-2-2',
        feederDescription: 'Mixing L36&L37',
        assetID: '2288d1cb41d048dcbb50f7c75ad1a858'
      },
      {
        feederName: 'Blender RB37',
        feederDescription: 'Falownik',
        assetID: '2869823e0aa242f8b70df7e990bd3c3e'
      },
      {
        feederName: 'MIXER ZTM37',
        feederDescription: 'Falownik',
        assetID: 'e156f91288d44696891462f693551588'
      }]
    },
    buildingInstallationGroup: {
      plName: 'Stacja budynkowa dla linii produkcyjnych',
      enName: 'Building installation for production lines',
      consistsOf: [{
        feederName: 'RP1',
        feederDescription: 'Rozdzielnica produkcja L34 & L35',
        assetID: '40ffdbf4ecc14f3eb645c9cb675a9030'
      },
      {
        feederName: 'RP2',
        feederDescription: 'Rozdzielnica produkcja L36 & L37',
        assetID: '17507f5b44c74398892c7021a9bd3c66'
      },
      {
        feederName: 'RP3',
        feederDescription: 'Rozdzielnica produkcja MIXING ROOM',
        assetID: '45665da871dd4538886ff5b9f63b352a'
      },
      {
        feederName: 'Rezerwa',
        feederDescription: 'Rezerwa',
        assetID: '3afe9aaaf4b8426a8d547b73116c0ef6'
      }]
    },
    heatingCoolingGroup: {
      plName: 'Ogrzewanie, chłodzenie, sprężone powietrze',
      enName: 'Heating, Cooling, Compressed Air',
      consistsOf: [{
        feederName: 'HVPP-4',
        feederDescription: 'Kompresory',
        assetID: '683b67da12ee48f3bfd0511a0d0bb223'
      },
      {
        feederName: 'FD-400A',
        feederDescription: 'Wieża chłodnica',
        assetID: '7d8a11f8818e4cbdb11f88d2c416013b'
      },
      {
        feederName: 'RPOM',
        feederDescription: 'Pompownia wody',
        assetID: 'c25b12cad8614e5e8e6b14a563ba93da'
      },
      {
        feederName: 'RK',
        feederDescription: 'Kotłownia',
        assetID: '4d164cd6f766448ea82f9350745b01ca'
      }]
    }
  }
}

export const ReportsReducer = (state = initialState, action: IReports) => {
  switch (action.type) {
    case SET_REPORTS_STRUCTURE:
      return {
        ...state,
        open: action.open
      }
    default:
      return state
  }
}