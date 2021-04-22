import { SET_REPORTS_STRUCTURE } from '../actions/Reports.action';

interface IReports {
  type: string,
  open: boolean
}

export interface IGroupsStructure {
  groups: Array<IGroupStructure>
}

export interface IGroupStructure {
  name: string,
  plName: string,
  enName: string,
  subgroups?: Array<IGroupStructure>
  assets?: Array<IGroupElementStructure>
}

export interface IGroupElementStructure {
  feederName: string,
  feederDescription: string,
  assetID: string,
}

const initialState: IGroupsStructure = {
  groups: [
    {
      name: 'productionTotalGroup',
      plName: 'Produkcja',
      enName: 'Production total',
      subgroups: [{
        name: 'line34Group',
        plName: 'Linia produkcyjna L34',
        enName: 'Production line L34',
        assets: [{
          feederName: 'Casting - RT-1A-1',
          feederDescription: 'Casting - RT-1A-1',
          assetID: 'bc5ae158e8934c38aff4f52a6b07ecdf'
        },
        {
          feederName: 'Winding - RT-1B-1',
          feederDescription: 'Winding - RT-1B-1',
          assetID: 'bc4a33865d59406e83f142ff1035f1a6'
        },
        {
          feederName: 'Mixing L34&L35 - RT-2-1',
          feederDescription: 'Mixing L34&L35 - RT-2-1',
          assetID: 'c92acf6b6b0f452bb4cb88011ec4dba6'
        },
        {
          feederName: 'Falownik - Blender RB34',
          feederDescription: 'Falownik - Blender RB34',
          assetID: 'cb659c511ab34ff5bf5927380ad19e0a'
        },
        {
          feederName: 'Falownik - MIXER ZTM34',
          feederDescription: 'Falownik - MIXER ZTM34',
          assetID: '1fd7c385632747ea9735256ebbbdb921'
        }]
      },
      {
        name: 'line35Group',
        plName: 'Linia produkcyjna L35',
        enName: 'Production line L35',
        assets: [{
          feederName: 'Casting - RT-1A-2',
          feederDescription: 'Casting - RT-1A-2',
          assetID: '2615561162614fe19f7e6bd788b6f241'
        },
        {
          feederName: 'Winding - RT-1B-2',
          feederDescription: 'Winding - RT-1B-2',
          assetID: '00e42c7810c844d4a1b39eb6da4274f1'
        },
        {
          feederName: 'Mixing L34&L35 - RT-2-1',
          feederDescription: 'Mixing L34&L35 - RT-2-1',
          assetID: '52906d2ea93d4af098233d1434df327e'
        },
        {
          feederName: 'Falownik - Blender RB35',
          feederDescription: 'Falownik - Blender RB35',
          assetID: 'c0cea6c7ea4b4e7088b6433863e4e467'
        },
        {
          feederName: 'Falownik - MIXER ZTM35',
          feederDescription: 'Falownik - MIXER ZTM35',
          assetID: '3af0f2f394f84713ac08baafbbdef459'
        }]
      },
      {
        name: 'line36Group',
        plName: 'Linia produkcyjna L36',
        enName: 'Production line L36',
        assets: [{
          feederName: 'Casting - RT-1C-1',
          feederDescription: 'Casting - RT-1C-1',
          assetID: '0ce676a0fe1f4da89d354662d734343a'
        },
        {
          feederName: 'Winding - RT-1D-1',
          feederDescription: 'Winding - RT-1D-1',
          assetID: '8968bd1b87ad463bb4b7e235a518f14d'
        },
        {
          feederName: 'Mixing L36&L37 - RT-2-2',
          feederDescription: 'Mixing L36&L37 - RT-2-2',
          assetID: '7e77bd333f39408fa69306ef63770cc7'
        },
        {
          feederName: 'Falownik - Blender RB36',
          feederDescription: 'Falownik - Blender RB36',
          assetID: 'ad762349da8a4e0faf1a7c16d23fe2a5'
        },
        {
          feederName: 'Falownik - MIXER ZTM36',
          feederDescription: 'Falownik - MIXER ZTM36',
          assetID: '86f91ddf6fd5457c874f561d9641c54f'
        }]
      },
      {
        name: 'line37Group',
        plName: 'Linia produkcyjna L37',
        enName: 'Production line L37',
        assets: [{
          feederName: 'Casting - RT-1C-2',
          feederDescription: 'Casting - RT-1C-2',
          assetID: 'a2545aa2e8894067b730830d323a1c9c'
        },
        {
          feederName: 'Winding - RT-1D-2',
          feederDescription: 'Winding - RT-1D-2',
          assetID: '32666fa87cfe4cb3b3cb14056fd4a8e8'
        },
        {
          feederName: 'Mixing L36&L37 - RT-2-2',
          feederDescription: 'Mixing L36&L37 - RT-2-2',
          assetID: '2288d1cb41d048dcbb50f7c75ad1a858'
        },
        {
          feederName: 'Falownik - Blender RB37',
          feederDescription: 'Falownik - Blender RB37',
          assetID: '2869823e0aa242f8b70df7e990bd3c3e'
        },
        {
          feederName: 'Falownik - MIXER ZTM37',
          feederDescription: 'Falownik - MIXER ZTM37',
          assetID: 'e156f91288d44696891462f693551588'
        }]
      },
      {
        name: 'buildingInstallationGroup',
        plName: 'Stacja budynkowa dla linii produkcyjnych',
        enName: 'Building installation for production lines',
        assets: [{
          feederName: 'RP1 - QP01',
          feederDescription: 'Rozdzielnica produkcja L34 & L35',
          assetID: '40ffdbf4ecc14f3eb645c9cb675a9030'
        },
        {
          feederName: 'RP2 - QP02',
          feederDescription: 'Rozdzielnica produkcja L36 & L37',
          assetID: '17507f5b44c74398892c7021a9bd3c66'
        },
        {
          feederName: 'RP3 - QP03',
          feederDescription: 'Rozdzielnica produkcja MIXING ROOM',
          assetID: '45665da871dd4538886ff5b9f63b352a'
        },
        {
          feederName: 'Rezerwa - QP04',
          feederDescription: 'Rezerwa - QP04',
          assetID: '3afe9aaaf4b8426a8d547b73116c0ef6'
        }]
      },
      {
        name: 'heatingCoolingGroup',
        plName: 'Ogrzewanie, chłodzenie, sprężone powietrze',
        enName: 'Heating, Cooling, Compressed Air',
        assets: [{
          feederName: 'Kompresory - HVPP-4',
          feederDescription: 'Kompresory - HVPP-4',
          assetID: '683b67da12ee48f3bfd0511a0d0bb223'
        },
        {
          feederName: 'Wieża chłodnica - FD-400A',
          feederDescription: 'Wieża chłodnica - FD-400A',
          assetID: '7d8a11f8818e4cbdb11f88d2c416013b'
        },
        {
          feederName: 'Pompownia wody - RPOM',
          feederDescription: 'Pompownia wody - RPOM',
          assetID: 'c25b12cad8614e5e8e6b14a563ba93da'
        },
        {
          feederName: 'Kotłownia - RK',
          feederDescription: 'Kotłownia',
          assetID: '4d164cd6f766448ea82f9350745b01ca'
        }]
      }],
    },
    {
      name: 'warehouseGroup',
      plName: 'Magazyny',
      enName: 'Warehouse',
      assets: [{
        feederName: 'Rozdzielnica magazyn 29-40/A-B1 - RM1',
        feederDescription: 'Rozdzielnica magazyn 29-40/A-B1 - RM1',
        assetID: 'b2e4cfa16be7497f8db1a07040e37c17'
      },
      {
        feederName: 'Rozdzielnica magazyn 29-40/B1-D - RM2',
        feederDescription: 'Rozdzielnica magazyn 29-40/B1-D - RM2',
        assetID: '1a8fc42c62c149e9ad2ae68357879097'
      },
      {
        feederName: 'Rozdzielnica magazyn 13-29/A-D - RM3',
        feederDescription: 'Rozdzielnica magazyn 13-29/A-D - RM3',
        assetID: 'ec450582d4c84600ac0da086bca3802d'
      },
      {
        feederName: 'Rozdzielnica magazyn 1-13/A-D - RM4',
        feederDescription: 'Rozdzielnica magazyn 1-13/A-D - RM4',
        assetID: 'bd21a78f5ae449a7a1f414e9591ad42e'
      }]
    },
    {
      name: 'officesGroup',
      plName: 'Biura',
      enName: 'Offices',
      assets: [{
        feederName: 'RSER - QB01',
        feederDescription: 'Serwerownia',
        assetID: '699277409d0440ff94672a3dc95ff6d2'
      },
      {
        feederName: 'RB0 - QB02',
        feederDescription: 'Biurowiec parter',
        assetID: 'a091a640fcf04c2498a297e3e0d4204f'
      },
      {
        feederName: 'RB1 - QB03',
        feederDescription: 'Biurowiec piętro',
        assetID: '23f2d3d5dd0844fea6c5395425d036f5'
      },
      {
        feederName: 'Rezerwa - QB04',
        feederDescription: 'Rezerwa - QB04',
        assetID: 'e406f47cf36046e2b5086c2ea49b1f42'
      }]
    },
    {
      name: 'carChargingGroup',
      plName: 'Ładowanie samochodów',
      enName: 'Car charging',
      assets: [{
        feederName: 'Samochody elektryczne',
        feederDescription: 'Samochody elektryczne',
        assetID: 'c640bbe8e3bb4a8598960fcdd89e7086'
      }]
    }]
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