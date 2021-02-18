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
import { BreakerDevice } from './DeviceDataDialog/BreakerDevice.component';

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
  const dispatch = useDispatch();

  return (
    <Dialog fullScreen open={open} onClose={() => dispatch(setDeviceDataDialogOpen(false))} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => dispatch(setDeviceDataDialogOpen(false))} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Device name
            </Typography>
        </Toolbar>
      </AppBar>
      <BreakerDevice/>
    </Dialog>
  );
}