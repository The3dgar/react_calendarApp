import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { LoginScreen } from "../components/auth/LoginScreen";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={CalendarScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Redirect to="/"/>
        </Switch>
      </div>
    </Router>
  );
};
