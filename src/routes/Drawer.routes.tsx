import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Overview } from '../components/Overview.component';
import { Powermonitor } from '../components/Powermonitor.component';
import { Events } from '../components/Events.component';
import { Elevation } from '../components/Elevation.component';
import { Reports } from '../components/Reports.component';

export default function DrawerRoutes() {
  return (
    <Switch>
      <Route path="/reports"><Reports /></Route>
      <Route path="/events"><Events /></Route>
      <Route path="/powermonitor"><Powermonitor /></Route>
      <Route path="/elevation"><Elevation /></Route>
      <Route path="/"><Overview /></Route>
    </Switch>
  )
}