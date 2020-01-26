import React from 'react';
import { Switch, Route } from "react-router-dom";
import HomePage from './views/HomePage'
import StatisticPage from './cmps/StatisticPage'
import ContactPage  from './views/ContactPage'
import SignUpPage  from './views/SignUpPage'
import ContactDetailsPage from './views/‏‏ContactDetailsPage'
import ContactEditPage from './views/ContactEditPage'

function Router() {
  return (
     <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignUpPage}></Route>
        <Route exact path="/contact" component={ContactPage}></Route>
        <Route exact path="/contact/edit/:id?" component={ContactEditPage}></Route>
        <Route exact path="/contact/:id" component={ContactDetailsPage}></Route>
        <Route exact path="/statistic" component={StatisticPage}></Route>
     </Switch>
  );
}

export default Router;
