import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
    },
  }),
);

export const PowermonitorSettingsTab = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [warningThreshold, setWarningThreshold] = useState<string>('0')
  const [alarmThreshold, setAlarmThreshold] = useState<string>('0')
  const [transformerPowerLoss, setTransformerPowerLoss] = useState<string>('0')
  const [checkboxes, setCheckboxes] = React.useState({
    loadMonitorActive: true,
    sendEventsActive: true,
    sendEmailsActive: true,
    notificationsActive: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxes({ ...checkboxes, [event.target.name]: event.target.checked });
  };

  return (
    <Grid container spacing={4} alignItems="flex-start">
      <Grid container spacing={1} item xs={12} lg={4}>
        <Grid item xs={12}>
          <Typography gutterBottom variant='h5'>{t('powermonitorPage.settingsTab')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              fullWidth
              label={`${t('powermonitorPage.warningThreshold')} [kWh]`}
              value={warningThreshold}
              onChange={(e) => setWarningThreshold(e.target.value)}
              type="number"
            />
            <TextField
              fullWidth
              label={`${t('powermonitorPage.alarmThreshold')} [kWh]`}
              value={warningThreshold}
              onChange={(e) => setAlarmThreshold(e.target.value)}
              type="number"
            />
            <TextField
              fullWidth
              label={`${t('powermonitorPage.transformersLosses')} [kW]`}
              value={warningThreshold}
              onChange={(e) => setTransformerPowerLoss(e.target.value)}
              type="number"
            />
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={checkboxes.loadMonitorActive} onChange={handleChange} name="loadMonitorActive" />}
                label={t('powermonitorPage.loadMonitorActive')}
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={checkboxes.sendEventsActive} onChange={handleChange} name="sendEventsActive" />}
                label={t('powermonitorPage.sendEventsActive')}
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={checkboxes.sendEmailsActive} onChange={handleChange} name="sendEmailsActive" />}
                label={t('powermonitorPage.sendEmailsActive')}
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={checkboxes.notificationsActive} onChange={handleChange} name="notificationsActive" />}
                label={t('powermonitorPage.notificationsActive')}
              />
            </FormGroup>
          </form>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant='contained' color='primary'>{t('powermonitorPage.saveButton')}</Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant='contained' color='secondary'>{t('powermonitorPage.resetButton')}</Button>
        </Grid>
      </Grid>
      <Grid container spacing={1} item xs={12} lg={4}>
        <Grid item xs={12}>
          <Typography gutterBottom variant='h5'>{t('powermonitorPage.mailList')}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            {t('powermonitorPage.addAddressButton')}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1} item xs={12} lg={4}>
        <Grid item xs={12}>
          <Typography gutterBottom variant='h5'>{t('powermonitorPage.notifications')}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant='contained' color='primary'>{t('powermonitorPage.notificationsRegister')}</Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant='contained' color='secondary'>{t('powermonitorPage.notificationsDeregister')}</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}