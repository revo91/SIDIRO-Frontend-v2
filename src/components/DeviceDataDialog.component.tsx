import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers/Root.reducer';
import { setDeviceDataDialogOpen } from '../actions/DeviceDataDialog.action';
import { TransformerDevice } from './DeviceDataDialog/TransformerDevice.component';
import { DeviceTypes } from '../utilities/DeviceTypes.utility';
import { useTranslation } from 'react-i18next';
import { exportPDF } from '../utilities/ExportPDF.utility';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DeviceDataDialog: React.FC = () => {
  const classes = useStyles();
  const open = useSelector((state: RootState) => state.deviceDataDialog.open);
  const deviceName = useSelector((state: RootState) => state.deviceDataDialog.deviceName);
  const deviceType = useSelector((state: RootState) => state.deviceDataDialog.deviceType);
  const breakerName = useSelector((state: RootState) => state.deviceDataDialog.breakerName);
  const sectionName = useSelector((state: RootState) => state.deviceDataDialog.sectionName);
  const assetID = useSelector((state: RootState) => state.deviceDataDialog.assetID);
  const switchboardAssetID = useSelector((state: RootState) => state.deviceDataDialog.switchboardAssetID);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const showTabsAccordingToDeviceType = () => {
    switch (deviceType) {
      case DeviceTypes.circuitBreaker:
      case DeviceTypes.infeedBreaker:
      case DeviceTypes.couplingBreaker:
        return <TransformerDevice />
      case DeviceTypes.generator:
      case DeviceTypes.transformer:
        return <TransformerDevice />
      default:
        return null
    }
  }  

  return (
    <Dialog fullScreen open={open} onClose={() => dispatch(setDeviceDataDialogOpen({
      open: false,
      deviceName: deviceName,
      deviceType: deviceType,
      breakerName: breakerName,
      sectionName: sectionName,
      assetID: assetID,
      switchboardAssetID: switchboardAssetID
    }))} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => dispatch(setDeviceDataDialogOpen({
            open: false,
            deviceName: deviceName,
            deviceType: deviceType,
            breakerName: breakerName,
            sectionName: sectionName,
            assetID: assetID,
            switchboardAssetID: switchboardAssetID
          }))} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {deviceType === DeviceTypes.circuitBreaker || deviceType === DeviceTypes.infeedBreaker || deviceType === DeviceTypes.couplingBreaker ?
              `${t('deviceDataDialog.circuitBreaker')} ${breakerName}`
              : deviceName}
          </Typography>
          <IconButton
            aria-label="export to file"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => exportPDF()}
            color="inherit"
          >
            <PictureAsPdfIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {showTabsAccordingToDeviceType()}
    </Dialog>
  );
}