import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Booking from "./pages/Booking/Booking";

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducer";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();
const store = createStore(reducer, persistedState);

store.subscribe(() => {
  saveState(store.getState());
});

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header></Header>
          <Switch>
            <Route component={Home} exact={true} path="/" />
            <Route component={Details} exact={true} path="/movie/:id" />
            <Route component={Booking} exact={true} path="/book" />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
