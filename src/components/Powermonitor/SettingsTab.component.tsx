import React, { useState, useEffect, useCallback } from 'react';
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
import { UniversalTable } from '../UniversalTable.component';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { modifyPowerMonitorConfig, subscribeToNotification, unsubscribeToNotification, checkSubscribed } from '../../services/CustomAPI.service';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/Root.reducer';
import { setPowermonitorConfig } from '../../actions/Powermonitor.action';
import Divider from '@material-ui/core/Divider';
import { setBackdropOpen } from '../../actions/Backdrop.action';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
    },
    divider: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    }
  }),
);

export const PowermonitorSettingsTab = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const powermonitorConfig = useSelector((state: RootState) => state.powermonitor);
  const userPlantData = useSelector((state: RootState) => state.userData);;
  const [warningThreshold, setWarningThreshold] = useState<string>("0")
  const [alarmThreshold, setAlarmThreshold] = useState<string>("0")
  const [transformerPowerLoss, setTransformerPowerLoss] = useState<string>("0")
  const [subscribed, setSubscribed] = useState<boolean>(false)

  const [checkboxes, setCheckboxes] = useState({
    loadMonitorActive: false,
  });
  const [mailList, setMailList] = useState<Array<{
    email: string,
    language: string
  }>>()
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formEmailAddress, setFormEmailAddress] = useState<string>('')

  useEffect(() => {
    if (powermonitorConfig) {
      setWarningThreshold(`${powermonitorConfig.warningLimit}`)
      setAlarmThreshold(`${powermonitorConfig.alertLimit}`)
      setTransformerPowerLoss(`${powermonitorConfig.powerLosses}`)
      setCheckboxes(c => ({
        ...c,
        loadMonitorActive: powermonitorConfig.enabled
      }))
      setMailList(powermonitorConfig.mailingList)
    }
  }, [setWarningThreshold, setAlarmThreshold, setTransformerPowerLoss, setCheckboxes, powermonitorConfig])

  useEffect(() => {
    navigator.serviceWorker.ready
      .then(function (registration) {
        return registration.pushManager.getSubscription();
      }).then(function (subscription) {
        const body = {
          language: i18n.language,
          userId: userPlantData.userId,
          subscriptionData: subscription
        }
        if (subscription) {
          checkSubscribed(powermonitorConfig.plantId, powermonitorConfig.id, body).then((res) => {
            if(res==="true") {
              setSubscribed(true)
            }
          })
          console.log('Already subscribed', subscription.endpoint);
        } else {
          checkSubscribed(powermonitorConfig.plantId, powermonitorConfig.id, body).then((res) => {
            if(res==="false") {
              setSubscribed(false)
            }
          })
        }
      });
  }, [i18n.language, powermonitorConfig.id, powermonitorConfig.plantId, userPlantData.userId])

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+") //eslint-disable-line
      .replace(/_/g, "/"); //eslint-disable-line

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  const subscribe = () => {
    navigator.serviceWorker.ready
      .then(async function (registration) {

        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array("BNko5cJqNEYyTIBl3ydohj-XUhk3qg74Rq_ELD4p1vlY4aj5Wl4X45yHR4YUhBnHL7BKdg3cDrMOWzu7eadIIhU")
        });
      }).then(function (subscription) {
        console.log('Subscribed', subscription);
        const body = {
          language: i18n.language,
          userId: userPlantData.userId,
          subscriptionData: subscription
        }
        subscribeToNotification(powermonitorConfig.plantId, powermonitorConfig.id, body).then(() => {
          setSubscribed(true)
        })
      });
  }

  const unsubscribe = () => {
    navigator.serviceWorker.ready
      .then(function (registration) {
        return registration.pushManager.getSubscription();
      }).then(function (subscription) {
        if (subscription) {
          return subscription.unsubscribe()
            .then(function () {
              console.log('Unsubscribed', subscription.endpoint);
              const body = {
                language: i18n.language,
                userId: userPlantData.userId,
                subscriptionData: subscription
              }
              unsubscribeToNotification(powermonitorConfig.plantId, powermonitorConfig.id, body).then(() => {
                setSubscribed(false)
              })
            });
        }
      });
  }

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxes({ ...checkboxes, [event.target.name]: event.target.checked });
  };

  const handleReset = useCallback(() => {
    setWarningThreshold(`${powermonitorConfig.warningLimit}`)
    setAlarmThreshold(`${powermonitorConfig.alertLimit}`)
    setTransformerPowerLoss(`${powermonitorConfig.powerLosses}`)
    setCheckboxes(c => ({
      ...c,
      loadMonitorActive: powermonitorConfig.enabled
    }))
    setMailList(powermonitorConfig.mailingList)
  }, [setWarningThreshold, setAlarmThreshold, setTransformerPowerLoss, setCheckboxes, setMailList, powermonitorConfig])

  const handleChangePowermonitorConfig = () => {
    if (powermonitorConfig.assetIds.length > 0) {
      dispatch(setBackdropOpen(true))
      modifyPowerMonitorConfig(powermonitorConfig.plantId, powermonitorConfig.id, {
        ...powermonitorConfig,
        warningLimit: parseFloat(warningThreshold),
        alertLimit: parseFloat(alarmThreshold),
        powerLosses: parseFloat(transformerPowerLoss),
        enabled: checkboxes.loadMonitorActive,
        mailingList: mailList

      }).then((res: any) => {
        dispatch(setBackdropOpen(false))
        if (res.response.config) {
          dispatch(setPowermonitorConfig(res.response.config))
        }
      })
    }
  }

  const addEmail = () => {
    if (mailList && formEmailAddress) {
      const added = mailList.concat({ email: formEmailAddress, language: i18n.language })
      setMailList(added)
      setDialogOpen(false)
      setFormEmailAddress('')
    }
  }

  const removeEmail = (toRemove: string) => {
    if (mailList) {
      const withRemoved = mailList.filter(el => el.email !== toRemove)
      setMailList(withRemoved)
      setDialogOpen(false)
    }
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('powermonitorPage.addEmailLabel')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            value={formEmailAddress}
            onChange={(e) => setFormEmailAddress(e.target.value)}
            label={t('powermonitorPage.emailAddress')}
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => addEmail()} color="primary" disabled={formEmailAddress ? !validateEmail(formEmailAddress) : true}>
            {t('powermonitorPage.confirm')}
          </Button>
          <Button onClick={() => setDialogOpen(false)} color="primary" autoFocus>
            {t('powermonitorPage.cancel')}
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={4} alignItems="flex-start">
        {powermonitorConfig ?
          <React.Fragment>
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
                    value={alarmThreshold}
                    onChange={(e) => setAlarmThreshold(e.target.value)}
                    type="number"
                  />
                  <TextField
                    fullWidth
                    label={`${t('powermonitorPage.transformersLosses')} [kW]`}
                    value={transformerPowerLoss}
                    onChange={(e) => setTransformerPowerLoss(e.target.value)}
                    type="number"
                  />
                  <FormGroup row>
                    <FormControlLabel
                      control={<Checkbox checked={checkboxes.loadMonitorActive} onChange={handleChange} name="loadMonitorActive" />}
                      label={t('powermonitorPage.loadMonitorActive')}
                    />
                  </FormGroup>
                </form>
              </Grid>
            </Grid>
            {mailList ?
              <Grid container spacing={1} item xs={12} lg={4}>
                <Grid item xs={12}>
                  <Typography gutterBottom variant='h5'>{t('powermonitorPage.mailList')}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <UniversalTable
                    columns={[t('powermonitorPage.emailAddress'), t('powermonitorPage.language'), '']}
                    rows={mailList.map(email => {
                      return [email.email, email.language, <IconButton onClick={() => removeEmail(email.email)} aria-label="delete"><DeleteIcon /></IconButton>]
                    })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setDialogOpen(true)}
                  >
                    {t('powermonitorPage.addAddressButton')}
                  </Button>
                </Grid>
              </Grid>
              : null}
            <Grid container spacing={1} item xs={12} lg={4}>
              <Grid item xs={12}>
                <Typography gutterBottom variant='h5'>{t('powermonitorPage.notifications')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button onClick={() => subscribed ? unsubscribe() : subscribe()} fullWidth variant='contained' color={subscribed ? 'secondary' : 'primary'}>{subscribed ? t('powermonitorPage.notificationsDeregister') : t('powermonitorPage.notificationsRegister')}</Button>
              </Grid>
              {/* <Grid item xs={6}>
                <Button onClick={() => unsubscribe()} fullWidth variant='contained' color='secondary'>{t('powermonitorPage.notificationsDeregister')}</Button>
              </Grid> */}
            </Grid>
            <Grid container spacing={1} item xs={12}>
              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={6} md={3}>
                <Button onClick={() => handleChangePowermonitorConfig()} fullWidth variant='contained' color='primary'>{t('powermonitorPage.saveButton')}</Button>
              </Grid>
              <Grid item xs={6} md={3}>
                <Button onClick={() => handleReset()} fullWidth variant='contained' color='secondary'>{t('powermonitorPage.resetButton')}</Button>
              </Grid>
            </Grid>
          </React.Fragment>
          : null}
      </Grid>
    </React.Fragment>
  )
}