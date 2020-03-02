import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Booking from "./pages/Booking/Booking";

function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>
        <Switch>
          <Route component={Home} exact={true} path="/" />
          <Route component={Details} exact={true} path="/movie/:id" />
          <Route
            component={Booking}
            exact={true}
            path="/theatre/:name/:id/:slot"
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
