// universal tabs component with tabpanels, only horizontal
//pass required prop 'tabs' to it with [{label: yourlabeltext, content: yourcontent}, ...]
// prop required 'name' required for redux active tab index storage

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { setUniversalTabsNameIndex } from '../actions/UniversalTabs.action';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers/Root.reducer';

interface ITabPanelProps {
  children?: React.ReactNode,
  value: number,
  index: number,
  other?: any,
}

const TabPanel: React.FC<ITabPanelProps> = ({ children, value, index, other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`
      }
      {...other}
    >
      { value === index && (
        <Box p={1}>
          {children}
        </Box>
      )}
    </div >
  );
}

const a11yProps = (index: number) => {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& > * + *': {
      paddingTop: theme.spacing(2),
    },
  },
}));

interface IUniversalTabsProps {
  name: string,
  tabs: Array<{ label: string; content: React.ReactNode; }>
}

export const UniversalTabs: React.FC<IUniversalTabsProps> = ({ name, tabs }) => {
  const classes = useStyles();
  const tabsInstance = useSelector((state: RootState) => state.universalTabs)
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={tabsInstance[name] || 0} //currently selected tab
          onChange={(event, value) => dispatch(setUniversalTabsNameIndex(name, value))}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="scrollable force tabs"
        >
          {tabs.map((tab, i) => {
            return <Tab key={`tab-${i}`} label={tab.label} {...a11yProps(i)} />
          })}
        </Tabs>
      </AppBar>
      {tabs.map((tab, i) => {
        return <TabPanel key={`tabpanel-${i}`} value={tabsInstance[name] || 0} index={i}>
          {tab.content}
        </TabPanel>
      })}
    </div>
  );
}
