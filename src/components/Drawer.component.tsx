import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LanguageIcon from "@material-ui/icons/Language";
import { Link, useLocation } from "react-router-dom";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DrawerRoutes from '../routes/Drawer.routes';
import { useTranslation } from 'react-i18next';
import StorageIcon from '@material-ui/icons/Storage';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import BarChartIcon from '@material-ui/icons/BarChart';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguageDialogOpen } from '../actions/LanguageDialog.action';
import siemensLogoPetrol from '../assets/sie-logo-petrol-rgb.svg';
import siemensLogoWhite from '../assets/sie-logo-white-rgb.svg';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { RootState } from '../reducers/Root.reducer';
import createWorker from "workerize-loader!../workers/TimeseriesData.worker"; //eslint-disable-line import/no-webpack-loader-syntax
import * as Worker from "../workers/TimeseriesData.worker";
import { setAssetData } from '../actions/SystemTopologyData.action';
import { setDeviceDataDialog } from '../actions/deviceDataDialogElevationDataSource.action';
import { fetchMe } from '../services/CustomAPI.service';
import { setCircuitDiagram } from '../actions/Overview.action';
import { setElevation } from '../actions/Elevation.action';
import { setReports, setReportsPowerDemand } from '../actions/Reports.action';
import { setUserData } from '../actions/Userdata.action';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      [`${theme.breakpoints.down('sm')} and (orientation: portrait)`]: {
        display: 'none'
      },
      [`${theme.breakpoints.down('sm')} and (orientation: landscape)`]: {
        display: 'flex'
      },
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
    },
    content: {
      flexGrow: 1,
      width: `calc(100% - ${drawerWidth}px)`,
      padding: theme.spacing(3),
      [`${theme.breakpoints.down('sm')} and (orientation: portrait)`]: {
        paddingBottom: theme.spacing(10),
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
      },
    },
    bottomNavi: {
      position: 'fixed',
      marginTop: '50px',
      bottom: 0,
      width: '100%',
      borderTop: '1px solid rgba(0, 0, 0, 0.12)',
      [`${theme.breakpoints.down('sm')} and (orientation: portrait)`]: {
        display: 'flex'
      },
      [`${theme.breakpoints.down('sm')} and (orientation: landscape)`]: {
        display: 'none'
      },
      [`${theme.breakpoints.up('md')}`]: {
        display: 'none'
      },
      textAlign: 'center',
    },
    bottomNaviElement: {
      minWidth: '0px'
    },
    siemensLogo: {
      height: '17px',
      verticalAlign: 'middle',
      marginLeft: theme.spacing(2)
    },
    expandDrawerArrow: {
      minWidth: '56px'
    }
  }));

interface IDrawer {
  onThemeChange(): void
}

const TimeseriesWorker = createWorker<typeof Worker>();

export const MiniDrawer: React.FC<IDrawer> = ({ onThemeChange }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const [bottomNaviValue, setBottomNaviValue] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const overview = useSelector((state: RootState) => state.overview);

  useEffect(() => {
    setBottomNaviValue(location.pathname)
  }, [location])

  useEffect(() => {
    //initialize frontend structure from backend
    fetchMe().then((res: {
      appData: object,
      plantsData: {
        [key: string]: {
          data: object,
          config: {
            overview: Array<object>,
            elevation: Array<object>,
            reports: Array<object>,
            reportsPowerDemand: object
          },
          appId: string
        }
      },
      userData: {
        appId: string,
        userId: string
      }
    }) => {
      dispatch(setCircuitDiagram(Object.values(res.plantsData)[0].config.overview))
      dispatch(setElevation(Object.values(res.plantsData)[0].config.elevation))
      dispatch(setReports(Object.values(res.plantsData)[0].config.reports))
      dispatch(setReportsPowerDemand(Object.values(res.plantsData)[0].config.reportsPowerDemand))
      dispatch(setUserData(res.userData.appId, res.userData.userId, Object.keys(res.plantsData)[0]))
    })
  }, [dispatch])

  useEffect(() => {
    const handleSetAssetData = (message: MessageEvent) => {
      if (message.data.length > 0) {
        message.data.forEach((device: any) => {
          dispatch(setAssetData(device.assetID, device))
        })
      }
    }
    TimeseriesWorker.addEventListener("message", handleSetAssetData)
    return () => {
      TimeseriesWorker.removeEventListener("message", handleSetAssetData)
      TimeseriesWorker.terminate()
    }
  }, [dispatch])

  useEffect(() => {
    const deviceData: Array<{
      assetID: string,
      breakerName: string,
      deviceName: string,
      deviceType: string,
      sectionName: string
    }> = []
    overview.diagrams.forEach((diagram) => {
      diagram.sections.forEach((section) => {
        section.infeeds?.forEach((infeed) => {
          if (infeed.breaker.assetID !== '') {
            deviceData.push(
              {
                assetID: infeed.breaker.assetID,
                breakerName: infeed.breaker.name,
                deviceName: infeed.tableName,
                deviceType: infeed.breaker.type,
                sectionName: section.name
              })
          }
        })
        section.breakers?.forEach((breaker) => {
          deviceData.push(
            {
              assetID: breaker.assetID,
              breakerName: breaker.name,
              deviceName: breaker.tableName,
              deviceType: breaker.type,
              sectionName: section.name
            })
        })
        if (section.coupling) {
          deviceData.push(
            {
              assetID: section.coupling.assetID,
              breakerName: section.coupling.name,
              deviceName: '',
              deviceType: section.coupling.type,
              sectionName: section.name
            })
        }
      })
    })
    TimeseriesWorker.postMessage({ deviceData })
  }, [overview.diagrams, dispatch])

  //initialize diagram structure
  useEffect(() => {
    overview.diagrams.forEach((diagram) => {
      diagram.sections.forEach((section) => {
        section.infeeds?.forEach((infeed) => {
          dispatch(setDeviceDataDialog(`${diagram.name}-${infeed.breaker.assetID}`, {
            infeedName: infeed.name,
            infeedTableName: infeed.tableName,
            infeedType: infeed.type,
            breakerName: infeed.breaker.name,
            breakerType: infeed.breaker.type,
            breakerAssetID: infeed.breaker.assetID,
            sectionName: section.name,
            switchboardName: diagram.name
          }))
        })
        section.breakers?.forEach((breaker) => {
          dispatch(setDeviceDataDialog(`${diagram.name}-${breaker.assetID}`, {
            breakerName: breaker.name,
            breakerType: breaker.type,
            breakerAssetID: breaker.assetID,
            breakerTableName: breaker.tableName,
            sectionName: section.name,
            switchboardName: diagram.name
          }))
        })
        if (section.coupling) {
          dispatch(setDeviceDataDialog(`${diagram.name}-${section.coupling.assetID}`, {
            breakerName: section.coupling.name,
            breakerType: section.coupling.type,
            breakerAssetID: section.coupling.assetID,
            sectionName: section.name,
            switchboardName: diagram.name
          }))
        }
      }) //diagram loop end
    }) //diagrams loop end
  }, [dispatch, overview.diagrams])

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleThemeChange = () => {
    onThemeChange()
  }

  return (
    <div className={classes.root}>
      <React.Fragment>
        <CssBaseline />
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen,
            }),
          }}
        >
          <div>
            <IconButton onClick={drawerOpen ? handleDrawerClose : handleDrawerOpen} className={classes.expandDrawerArrow}>
              {!drawerOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
            <img src={theme.palette.type === 'dark' ? siemensLogoWhite : siemensLogoPetrol} alt='siemens logo' className={classes.siemensLogo} />
          </div>
          <Divider />
          <List>
            <ListItem button component={Link} to="/" selected={location.pathname === "/"} >
              <ListItemIcon>
                <AccountTreeIcon />
              </ListItemIcon>
              <ListItemText primary={t('drawer.overviewRouteName')} />
            </ListItem>
            <ListItem button component={Link} to="/elevation" selected={location.pathname === "/elevation"} >
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText primary={t('drawer.elevationRouteName')} />
            </ListItem>
            <ListItem button component={Link} to="/events" selected={location.pathname === "/events"} >
              <ListItemIcon>
                <EventNoteIcon />
              </ListItemIcon>
              <ListItemText primary={t('drawer.eventsRouteName')} />
            </ListItem>
            <ListItem button component={Link} to="/powermonitor" selected={location.pathname === "/powermonitor"} >
              <ListItemIcon>
                <MultilineChartIcon />
              </ListItemIcon>
              <ListItemText primary={t('drawer.powermonitorRouteName')} />
            </ListItem>
            <ListItem button component={Link} to="/reports" selected={location.pathname === "/reports"} >
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary={t('drawer.reportsRouteName')} />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => dispatch(setLanguageDialogOpen(true))}>
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText primary={t('drawer.languageSelectionName')} />
            </ListItem>
            <ListItem button onClick={() => handleThemeChange()}>
              <ListItemIcon>
                {theme.palette.type === 'dark' ? <Brightness7Icon /> : <Brightness2Icon />}
              </ListItemIcon>
              <ListItemText primary={theme.palette.type === 'dark' ? t('drawer.toggleLightMode') : t('drawer.toggleDarkMode')} />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <DrawerRoutes />
        </main>
        <BottomNavigation
          showLabels={false}
          className={classes.bottomNavi}
          value={bottomNaviValue}
        >
          <BottomNavigationAction className={classes.bottomNaviElement} value="/" icon={<AccountTreeIcon />} component={Link} to="/" />
          <BottomNavigationAction className={classes.bottomNaviElement} value="/elevation" icon={<StorageIcon />} component={Link} to="/elevation" />
          <BottomNavigationAction className={classes.bottomNaviElement} value="/events" icon={<EventNoteIcon />} component={Link} to="/events" />
          <BottomNavigationAction className={classes.bottomNaviElement} value="/powermonitor" icon={<MultilineChartIcon />} component={Link} to="/powermonitor" />
          <BottomNavigationAction className={classes.bottomNaviElement} value="/reports" icon={<BarChartIcon />} component={Link} to="/reports" />
          <BottomNavigationAction className={classes.bottomNaviElement} icon={<LanguageIcon />} onClick={() => dispatch(setLanguageDialogOpen(true))} />
        </BottomNavigation>
      </React.Fragment>
    </div>
  );
}