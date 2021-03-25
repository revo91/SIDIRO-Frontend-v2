import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { BarChart } from './BarChart.component';
import { PieChart } from './PieChart.component';
import { SiemensColors, SiemensAccentBlue, SiemensAccentRed, SiemensAccentYellow } from '../utilities/SiemensColors.utility';
import { SiemensColorsAlpha } from '../utilities/SiemensColors.utility';
import { LineChart } from './LineChart.component';
import { UniversalTabs } from './UniversalTabs.component';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { DatePicker } from "@material-ui/pickers";
import { UniversalTable } from './UniversalTable.component';
import Divider from '@material-ui/core/Divider';
import { forEachChild } from 'typescript';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: '0px 10px'
    },
    select: {
      width: '100%'
    }
  }),
);

export const Reports = () => {
  const { t } = useTranslation();
  const [sampleData1, setSampleData1] = React.useState<Array<number>>([2478, 5267, 734, 784])
  const [productionTotal, setProductionTotal] = React.useState<Array<number>>([100, 100, 100, 100, 100, 100])
  const [line37, setLine37] = React.useState<Array<number>>([100, 100, 100, 100, 100])
  const [sampleTimeSeriesData, setSampleTimeSeriesData] = React.useState<Array<{ t: number | Date, y: number }>>([{ t: new Date(2021, 1, 1), y: 10 }, { t: new Date(2021, 1, 5), y: 10 }, { t: new Date(2021, 1, 9), y: 10 }])
  const [dateFrom, changeDateFrom] = React.useState<Date | null>(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const classes = useStyles()
  const [energyType, setEnergyType] = React.useState('0');

  const handleEnergyType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEnergyType(event.target.value as string);
  };

  React.useEffect(() => {
    let interval = setInterval(() => {
      setSampleData1(sampleData1.map(() => Math.round(Math.random() * 1000) / 10))
      setProductionTotal(productionTotal.map(() => Math.round(Math.random() * 1000) / 20))
      setLine37(line37.map(() => Math.round(Math.random() * 1000) / 40))


      setSampleTimeSeriesData(sampleTimeSeriesData.map((data) => {
        return {
          t: data.t,
          y: Math.round(Math.random() * 100) / 100
        }
      }))
    }, 10000)
    return () => clearInterval(interval)
  }, [sampleData1, sampleTimeSeriesData, productionTotal, line37])

  const energyConsumptionTab = (
    <Grid container spacing={2} >
      <Grid item xs={12} sm={9}>
        <DatePicker
          cancelLabel={t('datePicker.cancelButton')}
          autoOk
          label={'Wybierz miesiąc'}
          value={dateFrom}
          onChange={changeDateFrom}
          fullWidth
          views={['month']}
          format="MM/yyyy"
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button className={classes.button}
          variant="contained"
          color="primary"
        >
          Eksport PDF
      </Button>
        <Button className={classes.button}
          variant="contained"
          color="primary"
        >
          Eksport CSV
      </Button>
      </Grid>
      <Grid item xs={12} style={{ marginBottom: '0px', marginTop: '30px' }}>
        <Typography gutterBottom variant="h5">Całościowe zużycie energii czynnej</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <PieChart
          chartTitle=""
          data={{
            labels: ["HVPP-4", "HVPP-2", "HVPP-3", "Samochody elektryczne"],
            datasets: [
              {
                label: "",
                backgroundColor: [SiemensColors.tealLight, SiemensColors.redDark, SiemensColors.redLight, SiemensColors.blueDark, SiemensColors.yellowDark],
                data: sampleData1
              }
            ]
          }}
        />

      </Grid>
      <Grid item xs={12} md={6}>
        <UniversalTable
          columns={['Nazwa grupy', 'Zużycie energii czynnej']}
          rows={[['Produkcja', `${sampleData1[0]} kWh`], ['Magazyny', `${sampleData1[1]} kWh`], ['Biura', `${sampleData1[2]} kWh`], ['Ładowanie samochodów', `${sampleData1[3]} kWh`], ['Zużycie całkowite', `${sampleData1[0] + sampleData1[1] + sampleData1[2] + sampleData1[3]} kWh`]]}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      {/* NEXTLEVEL */}
      <Grid item xs={12} style={{ marginBottom: '0px', marginTop: '30px' }}>
        <Typography gutterBottom variant="h5">Production total</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <PieChart
          chartTitle=""
          data={{
            labels: ["Linia produkcyjna L34", "Linia produkcyjna L35", "Linia produkcyjna L36", "Linia produkcyjna L37", "Stacja budynkowa dla linii produkcyjnych", "Ogrzewanie, chłodzenie, sprężone powietrze"],
            datasets: [
              {
                label: "",
                backgroundColor: [SiemensAccentBlue.dark3, SiemensAccentBlue.light1, SiemensAccentRed.dark3, SiemensAccentRed.light1, SiemensAccentYellow.dark3, SiemensAccentYellow.light1],
                data: productionTotal
              }
            ]
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <UniversalTable
          columns={['Nazwa grupy', 'Zużycie energii czynnej']}
          rows={[['Linia produkcyjna L34', `${productionTotal[0]} kWh`], ['Linia produkcyjna L35', `${productionTotal[1]} kWh`], ['Linia produkcyjna L36', `${productionTotal[2]} kWh`], ['Linia produkcyjna L37', `${productionTotal[3]} kWh`],
          ['Stacja budynkowa dla linii produkcyjnych', `${productionTotal[4]} kWh`], ['Ogrzewanie, chłodzenie, sprężone powietrze', `${productionTotal[5]} kWh`], ['Zużycie całkowite', `${productionTotal[0] + productionTotal[1] + productionTotal[2] + productionTotal[3] + productionTotal[4] + productionTotal[5]} kWh`]]}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      {/* NEXTLEVEL */}
      <Grid item xs={12} style={{ marginBottom: '0px', marginTop: '30px' }}>
        <Typography gutterBottom variant="h5">Line 37</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <PieChart
          chartTitle=""
          data={{
            labels: ["Formowanie", "Nawijanie", "Mieszanie", "Blender RB37", "Mikser ZTM37"],
            datasets: [
              {
                label: "",
                backgroundColor: [SiemensAccentBlue.dark3, SiemensAccentBlue.light1, SiemensAccentRed.dark3, SiemensAccentRed.light1, SiemensAccentYellow.dark3],
                data: line37
              }
            ]
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <UniversalTable
          columns={['Nazwa grupy', 'Zużycie energii czynnej']}
          rows={[['Formowanie', `${line37[0]} kWh`], ['Nawijanie', `${line37[1]} kWh`], ['Mieszanie', `${line37[2]} kWh`], ['Blender RB37', `${line37[3]} kWh`],
          ['Mikser ZTM37', `${line37[4]} kWh`], ['Zużycie całkowite', `${line37[0] + line37[1] + line37[2] + line37[3] + line37[4]} kWh`]]}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>


















      {/* <BarChart
          chartTitle="barchart"
          data={{
            labels: ["Africa", "Asia", "Europe", "Latin America", "North Americaa"],
            datasets: [
              {
                label: "Population (millions)",
                backgroundColor: [SiemensColorsAlpha.tealLightAlpha, SiemensColorsAlpha.redDarkAlpha, SiemensColorsAlpha.redLightAlpha, SiemensColorsAlpha.blueDarkAlpha, SiemensColorsAlpha.yellowDarkAlpha],
                borderColor: [SiemensColors.tealLight, SiemensColors.redDark, SiemensColors.redLight, SiemensColors.blueDark, SiemensColors.yellowDark],
                borderWidth: 2,
                data: sampleData1,
                
              }
            ]
          }} 
          /> */}

      <Grid item xs={12}>
        {/* <PieChart
          chartTitle="something"
          data={{
            labels: ["Africa", "Asia", "Europe", "Latin America", "North Americaa"],
            datasets: [
              {
                label: "Population (millions)",
                backgroundColor: [SiemensColors.tealLight, SiemensColors.redDark, SiemensColors.redLight, SiemensColors.blueDark, SiemensColors.yellowDark],
                data: sampleData1
              }
            ]
          }} 
          /> */}
      </Grid>
      <Grid item xs={12}>
        {/* <LineChart
          data={{
            datasets: [
              {
                label: "dataset1",
                backgroundColor: SiemensColors.tealLight,
                borderColor: SiemensColors.tealLight,
                fill: false,
                lineTension: 0,
                data: sampleTimeSeriesData
              },
              {
                label: "dataset2",
                backgroundColor: SiemensColors.yellowDark,
                borderColor: SiemensColors.yellowDark,
                fill: false,
                lineTension: 0,
                data: [{ t: new Date(2021, 1, 1), y: 5 }, { t: new Date(2021, 1, 5), y: 7 }, { t: new Date(2021, 1, 9), y: 6 }]
              }
            ]
          }} 
          /> */}
      </Grid>
    </Grid>
  )

  const usageProfileTab = (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <DatePicker
          cancelLabel={t('datePicker.cancelButton')}
          autoOk
          label={'Wybierz miesiąc'}
          value={dateFrom}
          onChange={changeDateFrom}
          fullWidth
          views={['month']}
          format="MM/yyyy"
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl className={classes.select}>
          <InputLabel id="breaker-select-label">Energia</InputLabel>
          <Select
            fullWidth
            labelId="breaker-select-label"
            id="breaker-select"
            value={energyType}
            onChange={handleEnergyType}
          >
            <MenuItem value={0}>Energia czynna</MenuItem>
            <MenuItem value={10}>Energia bierna indukcyjna</MenuItem>
            <MenuItem value={20}>Energia bierna pojemnościowa</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button className={classes.button}
          variant="contained"
          color="primary"
        >
          Eksport PDF
      </Button>
        <Button className={classes.button}
          variant="contained"
          color="primary"
        >
          Eksport CSV
      </Button>
      </Grid>
      <Grid item xs={2}>
        <FormControl className={classes.select}>
          <InputLabel id="breaker-select-label">Wybierz rozdzielnicę</InputLabel>
          <Select
            fullWidth
            labelId="breaker-select-label"
            id="breaker-select"
            value={energyType}
            onChange={handleEnergyType}
          >
            <MenuItem value={0}>HVPP-1</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <FormControl className={classes.select}>
          <InputLabel id="breaker-select-label">Wybierz odbiór</InputLabel>
          <Select
            fullWidth
            labelId="breaker-select-label"
            id="breaker-select"
            value={energyType}
            onChange={handleEnergyType}
          >
            <MenuItem value={0}>QT01</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <BarChart
          chartTitle=""
          data={{
            labels: ["2021-01-01", "2021-01-02", "2021-01-03", "2021-01-04", "2021-01-05", "2021-01-06", "2021-01-07", "2021-01-08", "2021-01-09", "2021-01-10", "2021-01-11", "2021-01-12", "2021-01-13", "2021-01-14", "2021-01-15", "2021-01-16",
              "2021-01-16", "2021-01-17", "2021-01-18", "2021-01-19", "2021-01-20", "2021-01-21", "2021-01-22", "2021-01-23", "2021-01-24", "2021-01-25", "2021-01-26", "2021-01-27", "2021-01-28", "2021-01-29", "2021-01-30"],
            datasets: [
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.redDark, SiemensColors.redDark, SiemensColors.redDark, SiemensColors.redDark, SiemensColors.redDark],
                borderColor: [SiemensColors.redDark, SiemensColors.redDark, SiemensColors.redDark, SiemensColors.redDark, SiemensColors.redDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.tealLight, SiemensColors.tealLight, SiemensColors.tealLight, SiemensColors.tealLight, SiemensColors.tealLight],
                borderColor: [SiemensColors.tealLight, SiemensColors.tealLight, SiemensColors.tealLight, SiemensColors.tealLight, SiemensColors.tealLight],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              }
              , {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              },
              {
                label: "Energia czynna [kWh]",
                backgroundColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderColor: [SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark, SiemensColors.blueDark],
                borderWidth: 2,
                data: sampleData1,
              }
            ]
          }}
        />
      </Grid>
      <Grid item xs={12} style={{ marginBottom: '0px', marginTop: '30px' }}>
        <Typography gutterBottom variant="h5">Całościowa energia czynna</Typography>
      </Grid>
    </Grid>
  )

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h2' gutterBottom>{t('reportsPage.title')}</Typography>
        </Grid>
      </Grid>
      <UniversalTabs
        name='Reports'
        tabs={[
          {
            label: 'Miesięczne zużycie energii',
            content: energyConsumptionTab
          },
          {
            label: 'Profil zużycia energii',
            content: usageProfileTab
          },
          {
            label: 'Moce 15-minutowe',
            content: <p>Power demand tab content</p>
          },
          {
            label: 'Parametry zasilania',
            content: <p>Supply parameters tab content</p>
          },
          {
            label: 'Parametry odbiorów',
            content: <p>Infeeds parameters tab content</p>
          }
        ]}
      />
    </React.Fragment>
  )
}