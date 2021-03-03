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
import { useDispatch } from 'react-redux';
import { setLanguageDialogOpen } from '../actions/LanguageDialog.action';
import siemensLogoPetrol from '../assets/sie-logo-petrol-rgb.svg';
import siemensLogoWhite from '../assets/sie-logo-white-rgb.svg';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';

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

export const MiniDrawer: React.FC<IDrawer> = ({ onThemeChange }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const [bottomNaviValue, setBottomNaviValue] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    setBottomNaviValue(location.pathname)
  }, [location])

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
                {theme.palette.type === 'dark' ? <Brightness7Icon/> : <Brightness2Icon />}
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