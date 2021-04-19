import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { UniversalTabs } from './UniversalTabs.component';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { DatePicker } from "@material-ui/pickers";
import { StackedBarChart } from './StackedBarChart.component';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/Root.reducer';
import { EnergyConsumptionTab } from './Reports/EnergyConsumptionTab.component';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      width: '100%'
    },
    sectionMargin: {
      marginTop: theme.spacing(3)
    }
  }),
);

export const Reports = () => {
  const { t, i18n } = useTranslation();
  const [dateFrom, changeDateFrom] = useState<Date | null>(new Date(new Date().setMonth(new Date().getMonth())));
  const classes = useStyles()
  const [energyType, setEnergyType] = useState('0');
  const reports = useSelector((state: RootState) => state.reports);
  const [energyConsumptionTabChartsData, setEnergyConsumptionTabChartsData] = useState<Array<any>>()

  const handleEnergyType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEnergyType(event.target.value as string);
  };

  const usageProfileTab = (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5} lg={5}>
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
      <Grid item xs={12} md={3} lg={3}>
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
      <Grid item xs={12} md={2} lg={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
        >
          Eksport PDF
      </Button>
      </Grid>
      <Grid item xs={12} md={2} lg={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
        >
          Eksport CSV
      </Button>
      </Grid>
      <Grid item xs={12}>
        <StackedBarChart
          chartTitle=""
          data={{
            labels: ['Standing costs', 'Running costs'], // responsible for how many bars are gonna show on the chart
            // create 12 datasets, since we have 12 items
            // data[0] = labels[0] (data for first bar - 'Standing costs') | data[1] = labels[1] (data for second bar - 'Running costs')
            // put 0, if there is no data for the particular bar
            datasets: [{
              label: 'Washing and cleaning',
              data: [0, 8],
              backgroundColor: '#22aa99'
            }, {
              label: 'Traffic tickets',
              data: [0, 2],
              backgroundColor: '#994499'
            }, {
              label: 'Tolls',
              data: [0, 1],
              backgroundColor: '#316395'
            }, {
              label: 'Parking',
              data: [5, 2],
              backgroundColor: '#b82e2e'
            }, {
              label: 'Car tax',
              data: [0, 1],
              backgroundColor: '#66aa00'
            }, {
              label: 'Repairs and improvements',
              data: [0, 2],
              backgroundColor: '#dd4477'
            }, {
              label: 'Maintenance',
              data: [6, 1],
              backgroundColor: '#0099c6'
            }, {
              label: 'Inspection',
              data: [0, 2],
              backgroundColor: '#990099'
            }, {
              label: 'Loan interest',
              data: [0, 3],
              backgroundColor: '#109618'
            }, {
              label: 'Depreciation of the vehicle',
              data: [0, 2],
              backgroundColor: '#109618'
            }, {
              label: 'Fuel',
              data: [0, 1],
              backgroundColor: '#dc3912'
            }, {
              label: 'Insurance and Breakdown cover',
              data: [4, 0],
              backgroundColor: '#3366cc'
            }]
          }}
        />
      </Grid>
      <Grid item xs={12} style={{ marginBottom: '0px', marginTop: '30px' }}>
        <Typography gutterBottom variant="h5">Całościowa energia czynna</Typography>
      </Grid>
    </Grid>
  )

  const outgoingFeedersParameters = (
    <Grid container spacing={1}>
      <Grid item xs={12} md={5} lg={5}>
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
      <Grid item xs={12} md={3} lg={3}>
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
      <Grid item xs={12} md={2} lg={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
        >
          Eksport PDF
      </Button>
      </Grid>
      <Grid item xs={12} md={2} lg={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
        >
          Eksport CSV
      </Button>
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
            label: t('reportsPage.monthlyEnergyUsage'),
            content: <EnergyConsumptionTab />
          },
          {
            label: t('reportsPage.energyUsageProfile'),
            content: usageProfileTab
          },
          {
            label: t('reportsPage.powers15min'),
            content: <p>Power demand tab content</p>
          },
          {
            label: t('reportsPage.infeedParameters'),
            content: <p>Supply parameters tab content</p>
          },
          {
            label: t('reportsPage.outgoingFeederParameters'),
            content: outgoingFeedersParameters
          }
        ]}
      />
    </React.Fragment>
  )
}